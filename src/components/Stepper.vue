<template>
  <div id="stepper">
    <h1>{{ name }}</h1>
    <Tape :size="24" ref="Tape" :index="stepper.index"
                     :offset="stepper.offset"/>
    <ol>
      <li v-for="state in stepper.states" :key="state"
          :style="{ paddingLeft: 15 * indent(stepper.descriptions[state]) + 'px' }"
          :class="{ active: state === stepper.state }">
        {{ stepper.descriptions[state] }}
      </li>
    </ol>
  </div>
</template>

<script>
import Tape from './Tape'
export default {
  name: 'Stepper',
  components: {
    Tape
  },
  props: {
    name: {
      required: true,
      type: String
    },
    stepper: {
      required: true
    }
  },
  created () {
    var vm = this
    this.stepper.tapeCallback = function (letter) {
      vm.$refs.Tape.addLetter(letter)
    }
  },
  methods: {
    indent (str) {
      var i = 0
      for (; i < str.length; i++) {
        if (str.charAt(i) !== '\t') {
          return i
        }
      }
    },
    accept (packet) {
      this.stepper.onMessage(packet)
    },
    reset () {
      this.$refs.Tape.reset()
      this.stepper.reset()
    },
    step () {
      this.stepper.step()
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
#stepper {
  width: 50%;
  color: #000000;
  margin: 0px;
  float: left;
}

ol {
  text-align: left;
}

li.active {
  color: #FF0000;
}

li.indent {
  padding-left: 15px;
}

h1 {
  background-color: rgba(0,0,0, 0.2);
  margin: 0px;
}
</style>
