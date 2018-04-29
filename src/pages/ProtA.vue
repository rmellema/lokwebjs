<template>
  <div>
    <GUI :protocolBuilder="protABuilder">
      <v-link href="/protA">Default</v-link>
      <v-link href="/protAnc">Without step 3 and 4 on S</v-link>
      <v-link href="/protAnrc">Without 4 on S</v-link>
    </GUI>
  </div>
</template>

<script>
import ProtocolA from '../ProtocolA'
import GUI from '../components/GUI'
import VLink from '../components/VLink'

export default {
  name: 'ProtA',
  components: {GUI, VLink},
  data () {
    return {
      protABuilder (tape, emit) {
        return new ProtocolA(tape, emit)
      }
    }
  }
}
</script>
