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
        var prot = new ProtocolA(tape, emit)
        var protoS = Object.getPrototypeOf(prot.sender)
        var protoR = Object.getPrototypeOf(prot.receiver)
        var sender = prot.sender
        var receiver = prot.receiver
        sender.states.splice(3, 1)
        sender.handleMessage = function (msg) {
          var ret = protoS.handleMessage.call(this, msg)
          if (ret === 'SendK') {
            ret = 'UpI'
          }
          return ret
        }
        receiver.descriptions['Send'] =
          receiver.descriptions['Send'].replace('KrKsKr (Xi)', 'Kr (Xi + 1)')
        receiver.states.splice(4, 1)
        receiver.handleMessage = function (msg) {
          var ret = protoR.handleMessage.call(this, msg)
          if (this.state === 'Send') {
            this.letter = msg.msg
            ret = 'UpI'
          }
          return ret
        }
        return prot
      }
    }
  }
}
</script>
