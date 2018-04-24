<template>
  <div>
    <GUI :protocolBuilder="protABuilder"/>
  </div>
</template>

<script>
import ProtocolA from '../ProtocolA'
import GUI from '../components/GUI'

export default {
  name: 'ProtA',
  components: {GUI},
  data () {
    return {
      protABuilder (tape, emit) {
        return new ProtocolA(tape, emit)
      }
    }
  }
}
</script>
