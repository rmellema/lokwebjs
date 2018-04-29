<template>
  <div>
    <GUI :protocolBuilder="protBBuilder">
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

const rgx = /, colour/g

function clearColour (stepper) {
  for (var state in stepper.descriptions) {
    stepper.descriptions[state] = stepper.descriptions[state].replace(rgx, '')
  }
}

export default {
  name: 'ProtB',
  components: {GUI, VLink},
  data () {
    return {
      protBBuilder (tape, emit) {
        var prot = new ProtocolB(tape, emit)
        var prototypeS = Object.getPrototypeOf(prot.sender)
        var prototypeR = Object.getPrototypeOf(prot.receiver)
        clearColour(prot.sender)
        clearColour(prot.receiver)
        prot.sender.step = function () {
          this.colour = undefined
          prototypeS.step.call(this)
          this.colour = undefined
        }
        prot.sender.onMessage = function (msg) {
          this.colour = undefined
          prototypeS.onMessage.call(this, msg)
          this.colour = undefined
        }
        prot.receiver.step = function () {
          this.colour = undefined
          prototypeR.step.call(this)
          this.colour = undefined
        }
        prot.receiver.onMessage = function (msg) {
          this.colour = undefined
          if (this.state === 'Send') {
            this.colour = ''
          }
          prototypeR.onMessage.call(this, msg)
          this.colour = undefined
        }
        return prot
      }
    }
  }
}
</script>
