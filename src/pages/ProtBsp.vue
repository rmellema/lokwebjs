<template>
  <div>
    <GUI :protocolBuilder="protBBuilder" :secondPath="true">
      <v-link href="/protB">Default</v-link>
      <v-link href="/protBsp">With Second Path</v-link>
      <v-link href="/protBn4">Without Step 4</v-link>
      <v-link href="/protBnc">Without Colours</v-link>
    </GUI>
  </div>
</template>

<script>
import ProtocolB from '../ProtocolB'
import GUI from '../components/GUI'
import VLink from '../components/VLink'

export default {
  name: 'ProtB',
  components: {GUI, VLink},
  data () {
    return {
      protBBuilder (tape, emit) {
        return new ProtocolB(tape, emit)
      }
    }
  }
}
</script>
