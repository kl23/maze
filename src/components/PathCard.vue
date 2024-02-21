<script setup>
import { defineProps } from 'vue'
const props = defineProps(['value'])

</script>

<template>
  <span :class="value.color"> → {{ value.areaId }} <span v-if="value.color">({{value.color}})</span></span>
</template>

<style scoped>
.blue {
  color: skyblue;
}

.green {
  color: #3cff3c;
}

.pink {
  color: #f48cff;
}

</style>