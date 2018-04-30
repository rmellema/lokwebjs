<template>
  <a v-bind:href="'.' + href" class="button" v-bind:class="{ active: isActive }" v-on:click="go" >
    <slot></slot>
  </a>
</template>

<script>
import routes from '../routes'
export default {
  props: {
    href: {
      type: String,
      required: true
    }
  },
  computed: {
    isActive () {
      return this.$root.appRoute.startsWith(this.href)
    }
  },
  methods: {
    go (event) {
      event.preventDefault()
      this.$root.currentRoute = this.$root.prefix + this.href
      window.history.pushState(
        null,
        routes[this.$root.prefix + this.href],
        this.$root.prefix + this.href
      )
    }
  }
}
</script>

<style scoped>
.active {
  color: black;
}

a {
  margin: auto;
  flex-grow: 1;
  flex-basis: 0;
}

a:hover {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
