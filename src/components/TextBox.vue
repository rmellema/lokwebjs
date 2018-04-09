<template>
  <svg :width="width" :height="height">
    <rect x="0" y="0" width="100%" height="100%"
          :stroke="stroke" stroke-width="2px"/>
    <text x="50%" y="50%" fill="black" text-anchor="middle" alignment-baseline="middle">
      {{ text }}
    </text>
  </svg>
</template>

<script>
export default {
  name: 'TextBox',
  props: {
    text: { type: String, required: true },
    width: [String, Number],
    height: [String, Number],
    stroke: {type: String, default: 'black'}
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
</style>
