<script setup>
import PathCard from './components/PathCard.vue'
import graph from './content.js'
import { ref } from 'vue'

import { permutator } from './permutator.js'

const startAreaNumber = ref(1)
const destAreaNumber = ref(16)
const output = ref('')
const path = ref([])
const depth = ref('')


const allDest_str = ref('2,9,12,14')

const getArea = (tid) =>
{
  return graph.filter(area => area.areaId == tid)[0]
}

const onClickSingle = () =>
{
  let fromArea = getArea(startAreaNumber.value);
  let targetArea = getArea(destAreaNumber.value);
  if (!targetArea) {
    output.value = "Invalid Area!"
    return false
  }

  let result = searchPath(fromArea, targetArea, [], 1)

  if (result.error) {
    output.value = result.error
    path.value = []
    depth.value = ''
  } else {
    output.value = ''
    path.value = result.path
    depth.value = result.path.length
  }

  // console.log('END', result)

}

const onClickRound = () =>
{
  let destIds = parseDestStr()
  if (destIds.length <= 0)
  {
    output.value = 'Error: failed to parse detinations'
    depth.value = ''
    path.value = []
    return false
  }

  let areas = destIds.map(destId => getArea(destId))

  if (areas.length > 5) {
    output.value = 'Cannot calc more than 4 destinations'
    depth.value = ''
    path.value = []
    return false
  }

  let result = searchRoundTrip(areas)

  if (result.error) {
    output.value = result.error
    path.value = []
    depth.value = ''
  } else {
    output.value = ''
    path.value = result.path
    depth.value = result.path.length
  }
}

const parseDestStr = () =>
{
  try
  {
    return allDest_str.value.split(',').map(x => parseInt(x.trim()))
  }
  catch
  {
    return []
  }
}

const searchPath = (fromArea, targetArea, filter, depth) =>
{
  if (depth > graph.length) {
    return {
      error: "Exceeded depth limit",
      depth: Infinity
    }
  }

  // filter out loops
  const fd = [...fromArea.destinations].filter(dest =>
    filter.indexOf(dest.targetAreaId) < 0
  )

  // console.log(`@${depth} searching from ${fromArea.areaId} with path#: ${fd.length}`)
  // console.log('posible:', fd.map(f => f.targetAreaId))
  // console.log('filtered:', filter)

  if (fd.length <= 0) {
    return {
      error: "Path not exist",
      depth: Infinity
    }
  }

  // bingo
  for (let i = 0; i < fd.length; i++)
  {
    if (fd[i].targetAreaId == targetArea.areaId) {
      return {
        success: true, depth,
        path: [{ areaId: fromArea.areaId, color: null },
               { areaId: fd[i].targetAreaId, color: String(fd[i].color).toLowerCase() } ]
      }
    }
  }

  // get the next layer
  filter = [...filter, ...fd.map(dest => dest.targetAreaId)]
  let results = fd.map(dest => {
    let result = searchPath(dest.area, targetArea, filter, depth + 1)
    if (result.success) {
      result.path[0].color = String(dest.color).toLowerCase()
      result.path.unshift({ areaId: fromArea.areaId, color: null })
    }
    return result
  })

  results.sort((a, b) => {
    if (a.depth > b.depth) return  1
    if (a.depth < b.depth) return -1
    return 0
  })

  return results[0]

}

const searchRoundTrip = (areas) =>
{
  let firstArea = getArea(1)
  const routes = permutator(areas).map(route => [firstArea, ...route])

  let results = routes.map(route =>
  {
    let routeResult = {
      depth: 0,
      path: []
    }

    for (let i = 1; i < route.length; i++)
    {
      let result = searchPath(route[i-1], route[i], [], 1)
      routeResult.depth += result.depth
      routeResult.path = [...routeResult.path, ...result.path.slice(1)]
    }

    routeResult.path.unshift(firstArea)
    return routeResult
  })

  results.sort((a,b) => {
    if (a.depth > b.depth) return  1
    if (a.depth < b.depth) return -1
    return 0
  })

  return results[0]
}

</script>

<template>
  <div>
    <div class="result">
      <h3>Result</h3>
      <div>Output: {{ output }}</div>
      <div>
        <span>Path:</span>
        <PathCard v-for="p in path" :key="p.areaId" :value="p"/>
      </div>
      <div>Depth: {{ depth }}</div>
    </div>

    <table>
      <tr>
        <th>Single Route</th>
        <th>Round Trip</th>
      </tr>
      <tr>
        <td>
          <form @submit.prevent="">
            <label>
              <strong>Start Area#</strong>
              <input type="text" v-model="startAreaNumber" />
            </label>
            <label>
              <strong>Destination Area#</strong>
              <input type="text" v-model="destAreaNumber" />
            </label>
            <button @click="onClickSingle">Search!</button>
          </form>
        </td>
        <td>
          
          <form @submit.prevent="">
            <label>
              <strong>Destinations #</strong>
              <input type="text" v-model="allDest_str" />
            </label>
            <button @click="onClickRound">Search!</button>
          </form>
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
label {
  display: block;
}

label > strong {
  display: block;
}
  
button {
  margin: 8px 0;
  padding: 6px 12px;
  background-color: #777;
  color: white;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(100,100,100,.3);
  cursor: pointer;
}

button:hover {
  background-color: #666;
}
</style>
