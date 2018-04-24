<template>
  <div id="app">
    <div class="nav">
      <a href="/protA.html" class="button">Protocol A</a>
      <a href="/protB.html" class="button">Protocol B</a>
      <a href="/protTCP.html" class="button">Protocol TCP</a>
    </div>
    <h1>{{ protocol.name }}</h1>
    <CommLine ref="CommLine"
              v-on:sender-arrived="$refs.Receiver.accept($event)"
              v-on:receiver-arrived="$refs.Sender.accept($event)"
              :second-path="secondPath"
              />
    <div class="row">
      <Stepper class="sender" ref="Sender" name="Sender"
              :stepper="protocol.sender"/>
      <Stepper class="receiver" ref="Receiver" name="Receiver"
              :stepper="protocol.receiver"/>
    </div>
    <div class="row">
      <button class="button" v-on:click="start" :disabled="timerId !== undefined">Start</button>
      <button class="button" v-on:click="pauze" :disabled="timerId === undefined">Stop</button>
    </div>
  </div>
</template>

<script>
import CommLine from './components/CommLine'
import Stepper from './components/Stepper'

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
    },
    emit (msg) {
      this.$refs.CommLine.addPacket(msg)
    }
  },
  props: {
    secondPath: {
      required: true,
      default: false
    },
    protocolBuilder: {
      required: true
    }
  },
  data () {
    var vm = this
    return {
      protocol: this.protocolBuilder('FDKEIKDOEKDKEEIZMXVEOOQQ', function (msg) {
        vm.emit(msg)
      }),
      timerId: undefined
    }
  }
}
</script>

<style lang="scss">
$sender-color: #00bab3;
$receiver-color: #faff2e;
$button-color: #00BAB3;

body {
  margin: 0px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1 {
  margin: 0px;
}

.nav {
  display: flex;
  justify-content: space-evenly;
  background-color: $button-color;
  padding: 5px;
}

.button {
  color: inherit;
  border: none;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.15);
  text-decoration: none;
  font-weight: bold;
}

button.button {
  font-size: 20px;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.15) $button-color;
}

a:hover {
  background-color: rgba(0, 0, 0, 0.3);
}

.row {
  display: flex;
  justify-content: center;
  align-items: flex;
  margin-left: 5px;
  margin-right: 5px;
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
