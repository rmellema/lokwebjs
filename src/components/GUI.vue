<template>
  <MainLayout>
    <template slot="navigation">
      <slot/>
    </template>
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
      <button class="button" v-on:click="reset" :disabled="timerId !==
        undefined">Reset</button>
      <button class="button" v-on:click="start" :disabled="timerId !== undefined">Start</button>
      <button class="button" v-on:click="pauze" :disabled="timerId === undefined">Stop</button>
    </div>
  </MainLayout>
</template>

<script>
import CommLine from './CommLine'
import MainLayout from './MainLayout'
import NavBar from './NavBar'
import Stepper from './Stepper'

export default {
  name: 'GUI',
  components: {
    CommLine,
    MainLayout,
    NavBar,
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
    reset () {
      this.pauze()
      this.$refs.CommLine.clear()
      this.$refs.Sender.reset()
      this.$refs.Receiver.reset()
    },
    emit (msg) {
      this.$refs.CommLine.addPacket(msg)
    }
  },
  props: {
    secondPath: {
      type: Boolean,
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
.row {
  display: flex;
  justify-content: center;
  align-items: flex;
  margin-left: 5px;
  margin-right: 5px;
}
</style>
