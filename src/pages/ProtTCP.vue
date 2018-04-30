<template>
  <div>
    <GUI :protocolBuilder="protTCPBuilder" :secondPath="true"/>
  </div>
</template>

<script>
import ProtocolTCP from '../ProtocolTCP'
import GUI from '../components/GUI'

export default {
  name: 'ProtTCP',
  components: {GUI},
  data () {
    return {
      protTCPBuilder (tape, emit) {
        return new ProtocolTCP(tape, emit)
      }
    }
  }
}
</script>
