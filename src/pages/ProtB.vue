<template>
  <div>
    <GUI :protocolBuilder="protBBuilder"/>
  </div>
</template>

<script>
import ProtocolB from '../ProtocolB'
import GUI from '../components/GUI'

export default {
  name: 'ProtB',
  components: {GUI},
  data () {
    return {
      protBBuilder (tape, emit) {
        return new ProtocolB(tape, emit)
      }
    }
  }
}
</script>
