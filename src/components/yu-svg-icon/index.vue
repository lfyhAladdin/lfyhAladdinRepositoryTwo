<template>
  <svg :class="svgClass" fill="#fff" aria-hidden="true" @tap="tapEvent">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default { 
  name: 'yu-svg-icon',
  props: {
    type: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.type}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    }
  },
  methods: {
    tapEvent() {
      this.$emit('on-tap')
    }
  }
}
</script>
<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
