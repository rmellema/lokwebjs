<template>
  <svg width="100%" :height="height + 'px'">
    <TextBox x="10%" :y="height/2 - box_height/2"
             width="10%" :height="box_height" class="sender"
             text="Sender"/>
    <TextBox x="80%" :y="height/2 - box_height/2"
             width="10%" :height="box_height" class="receiver"
             text="Receiver"/>
    <line x1="20%" y1="50%" x2="80%" y2="50%"/>
    <g v-if="secondPath">
      <line x1="30%" y1="50%" x2="30%" y2="30%"/>
      <line x1="30%" y1="30%" x2="70%" y2="30%"/>
      <line x1="70%" y1="30%" x2="70%" y2="50%"/>
    </g>
    <g>
      <line x1="30%" y1="50%" x2="30%" y2="70%"/>
      <line x1="30%" y1="70%" x2="45%" y2="70%"/>
      <line x1="55%" y1="70%" x2="70%" y2="70%"/>
      <line x1="70%" y1="70%" x2="70%" y2="50%"/>
    </g>
    <TextBox v-for="(packet, idx) in packets"
             :x="packet.x + '%'" :y="packet.y + 'px'"
             width="6%" :height="box_height/2" :text="packet.msg"
             :class="packet.origin"
             :key="packet.msg + idx" />
  </svg>
</template>

<script>
import TextBox from './TextBox'
import TWEEN from 'TWEEN'

export default {
  name: 'CommLine',
  components: {
    TextBox
  },
  props: {
    secondPath: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      packets: [],
      height: 200,
      box_height: 60
    }
  },
  methods: {
    addPacket (packet) {
      var vm = this
      var fromSender = packet.origin === 'sender'
      function animate () {
        if (TWEEN.update()) {
          requestAnimationFrame(animate)
        }
      }
      if (fromSender) {
        packet.x = 17
        packet.y = 85
      } else {
        packet.x = 77
        packet.y = 85
      }
      var tween = new TWEEN.Tween(packet)
      var to = {x: fromSender ? 77 : 17}
      var time = 10000
      var rand = Math.random() * (this.secondPath ? 3 : 2)
      if (rand >= 2) {
        if (fromSender) {
          to = {x: [27, 27, 67, 67, 77], y: [85, 45, 45, 85, 85]}
        } else {
          to = {x: [67, 67, 27, 27, 17], y: [85, 45, 45, 85, 85]}
        }
        time *= 1.8
      } else if (rand >= 1) {
        if (fromSender) {
          to = {x: [27, 27, 42], y: [85, 125, 125]}
        } else {
          to = {x: [67, 67, 52], y: [85, 125, 125]}
        }
        packet.failed = true
        time *= 0.50
      }
      tween.to(to, time)
      tween.onComplete(function (pack) {
        let idx = vm.packets.indexOf(pack)
        if (!pack.failed) {
          vm.$emit(pack.origin + '-arrived', pack)
        }
        if (idx > -1) {
          vm.packets.splice(idx, 1)
        }
      })
      tween.start()
      this.packets.push(packet)
      animate()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
line {
  stroke: black;
}
</style>
