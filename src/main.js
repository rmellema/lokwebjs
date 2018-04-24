// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ProtocolA from './ProtocolA.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  data () {
    return {
      protA (tape, emit) {
        return new ProtocolA(tape, emit)
      }
    }
  },
  template: '<App :protocolBuilder="protA"/>'
})
