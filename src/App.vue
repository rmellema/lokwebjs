<template>
  <div id="app">
    <CommLine ref="CommLine"
              v-on:sender-arrived="$refs.Receiver.accept($event)"
              v-on:receiver-arrived="$refs.Sender.accept($event)"
              :second-path="false"
              />
    <div class="row">
      <Stepper class="sender" ref="Sender" name="Sender"
              :stepper="protocol.sender"/>
      <Stepper class="receiver" ref="Receiver" name="Receiver"
              :stepper="protocol.receiver"/>
    </div>
    <div class="row">
      <button v-on:click="start" :disabled="timerId !== undefined">Start</button>
      <button v-on:click="pauze" :disabled="timerId === undefined">Stop</button>
      <button v-on:click="step">Step</button>
    </div>
  </div>
</template>

<script>
import CommLine from './components/CommLine'
import Stepper from './components/Stepper'

import ProtocolA from './ProtocolA'

export default {
  name: 'App',
  components: {
    CommLine,
    Stepper
  },
  methods: {
    start () {
      this.step()
      this.timerId = setInterval(this.step, 2000)
      this.$refs.CommLine.restart()
    },
    pauze () {
      clearInterval(this.timerId)
      this.timerId = undefined
      this.$refs.CommLine.stop()
    },
    step () {
      this.$refs.Sender.step()
      this.$refs.Receiver.step()
    }
  },
  data () {
    var vm = this
    function emit (msg) {
      vm.$refs.CommLine.addPacket(msg)
    }
    return {
      timerId: undefined,
      protocol: new ProtocolA('FDKEIKDOEKDKEEIZMXVEOOQQ', emit)
    }
  }
}
</script>

<style lang="scss">
$sender-color: #00bab3;
$receiver-color: #faff2e;

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.row {
  display: flex;
  justify-content: center;
  align-items: flex;
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
