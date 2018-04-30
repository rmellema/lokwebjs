<template>
  <div>
    <GUI :protocolBuilder="protABuilder">
      <v-link href="/protAd">Default</v-link>
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
        var prot = new ProtocolA(tape, emit)
        var protoS = Object.getPrototypeOf(prot.sender)
        var protoR = Object.getPrototypeOf(prot.receiver)
        var sender = prot.sender
        var receiver = prot.receiver
        sender.states.splice(3, 1)
        sender.descriptions['Send'] = '\tSend (Xi)'
        sender.stateSend = function () {
          protoS.stateSend.call(this)
          return 'UpI'
        }
        receiver.states[0] = receiver.states[1]
        receiver.states[1] = receiver.startState
        receiver.startState = receiver.states[0]
        receiver.states.splice(3, 2)
        receiver.descriptions['Skip'] = '\t' + receiver.descriptions['Skip']
        receiver.stateWrite = function () {
          protoR.stateWrite.call(this)
          return 'UpI'
        }
        receiver.stateUpI = function () {
          protoR.stateUpI.call(this)
          return 'Skip'
        }
        return prot
      }
    }
  }
}
</script>
