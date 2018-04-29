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
             width="6%" :height="box_height/2" :text="packetText(packet)"
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
    tweenComplete (pack) {
      let idx = this.packets.indexOf(pack)
      if (!pack.failed) {
        this.$emit(pack.origin + '-arrived', pack)
      }
      if (idx > -1) {
        this.packets.splice(idx, 1)
      }
    },
    stop () {
      TWEEN.removeAll()
    },
    clear () {
      this.stop()
      this.packets = []
    },

    restart () {
      for (var packet of this.packets) {
        var tween = new TWEEN.Tween(packet)
        var toRemove = 0
        if (packet.to.x.constructor === Array) {
          for (var i = 0; i < packet.to.x.length - 1; i++) {
            var x = packet.to.x[i]
            var y = packet.to.y[i]
            if (packet.origin === 'sender') {
              if (x < packet.x) {
                toRemove++
                continue
              }
            } else {
              if (x > packet.x) {
                toRemove++
                continue
              }
            }
            if ((y < packet.y && packet.y < packet.to.y[i + 1]) ||
              (y > packet.y && packet.y > packet.to.y[i + 1])) {
              toRemove++
            }
          }
          packet.to.x.splice(0, toRemove)
          packet.to.y.splice(0, toRemove)
        }
        tween.to(packet.to, packet.time)
        tween.onComplete(this.tweenComplete)
        tween.start()
      }
    },

    packetText (packet) {
      if (packet.colour || packet.colour === 0) {
        return packet.msg + ', ' + packet.colour
      } else {
        return packet.msg
      }
    },

    addPacket (packet) {
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
        time *= 5
      } else if (rand >= 1) {
        if (fromSender) {
          to = {x: [27, 27, 42], y: [85, 125, 125]}
        } else {
          to = {x: [67, 67, 52], y: [85, 125, 125]}
        }
        packet.failed = true
        time *= 0.50
      }
      to.time = 0
      packet.to = to
      packet.time = time
      tween.to(to, time)
      tween.onComplete(this.tweenComplete)
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
