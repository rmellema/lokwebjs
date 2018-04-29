<template>
  <nav>
  <div class="row">
    <v-link href="/protA">Protocol A</v-link>
    <v-link href="/protB">Protocol B</v-link>
    <v-link href="/protTCP">Protocol TCP</v-link>
  </div>
  <div class="row">
    <slot>
    </slot>
  </div>
  </nav>
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

<style scoped>
.row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 5px;
}

.button {
  margin: 5px;
}

div:empty {
  padding: 0px;
}
</style>
