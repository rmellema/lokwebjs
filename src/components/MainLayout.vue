<template>
  <div id="main">
    <NavBar/>
    <slot/>
  </div>
</template>

<script>
import NavBar from './NavBar'

export default {
  name: 'MainLayout',
  components: {
    NavBar
  }
}
</script>

<style lang="scss">
$sender-color: #00bab3;
$receiver-color: #faff2e;
$button-color: #00BAB3;

body {
  margin: 0px;
}

#main {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1 {
  margin: 0px;
}

.nav {
  background-color: $button-color;
}

button.button {
  font-size: 20px;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.15) $button-color;
}

.sender {
  background-color: $sender-color;
  fill: $sender-color;
}

.receiver {
  background-color: $receiver-color;
  fill: $receiver-color;
}
</style>
