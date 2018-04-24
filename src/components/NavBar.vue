<template>
<div class="nav">
  <v-link href="/protA">Protocol A</v-link>
  <v-link href="/protB">Protocol B</v-link>
  <v-link href="/protTCP">Protocol TCP</v-link>
</div>
</template>

<script>
import VLink from './VLink'

export default {
  name: 'NavBar',
  components: {
    VLink
  }
}
</script>

<style>
.nav {
  display: flex;
  justify-content: space-evenly;
  padding: 5px;
}
</style>
