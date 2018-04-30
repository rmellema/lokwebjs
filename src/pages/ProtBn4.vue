<template>
  <div>
    <GUI :protocolBuilder="protBBuilder">
      <v-link href="/protBd">Default</v-link>
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
        var prot = new ProtocolB(tape, emit)
        var prototype = Object.getPrototypeOf(prot.receiver)
        prot.receiver.descriptions['Skip'] = '\t' + prot.receiver.descriptions['Skip']
        prot.receiver.states[0] = prot.receiver.states[1]
        prot.receiver.states[1] = prot.receiver.startState
        prot.receiver.startState = prot.receiver.states[0]
        prot.receiver.state = prot.receiver.startState
        prot.receiver.states.splice(3, 1)
        prot.receiver.stateWrite = function () {
          prototype.stateWrite.call(this)
          return 'UpI'
        }
        prot.receiver.stateUpI = function () {
          prototype.stateUpI.call(this)
          return 'Skip'
        }
        return prot
      }
    }
  }
}
</script>
