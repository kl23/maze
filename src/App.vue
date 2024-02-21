<script setup>
import graph from './content.js'
import { ref } from 'vue'

const startAreaNumber = ref(1)
const destAreaNumber = ref(16)
const output = ref('')
const depth = ref('')

const onClick = () =>
{
  let fromArea = graph.filter(area => area.areaId == startAreaNumber.value)[0];
  let targetArea = graph.filter(area => area.areaId == destAreaNumber.value)[0];
  if (!targetArea) {
    output.value = "Invalid Area!"
    return false
  }

  let result = searchPath(fromArea, targetArea, [], 1)

  if (result.error) {
    output.value = result.error
  } else {
    output.value = result.path.join(' → ')
    depth.value = result.path.length
  }

  // console.log('END', result)

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
        path: [fromArea.areaId, targetArea.areaId]
      }
    }
  }

  // get the next layer
  filter = [...filter, ...fd.map(dest => dest.targetAreaId)]
  let results = fd.map(dest => {
    let result = searchPath(dest.area, targetArea, filter, depth + 1)
    if (result.success) {
      result.path.unshift(fromArea.areaId)
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

</script>

<template>
  <form @submit.prevent="">
    <label>
      <strong>Start Area#</strong>
      <input type="text" v-model="startAreaNumber" />
    </label>
    <label>
      <strong>Destination Area#</strong>
      <input type="text" v-model="destAreaNumber" />
    </label>
    <button @click="onClick">Search!</button>
    <div>Path: {{ output }}</div>
    <div>Depth: {{ depth }}</div>
  </form>
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
