// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import routes from './routes'

Vue.config.productionTip = false

const app = new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      const matchingView = routes[this.currentRoute]
      console.log('Mounting ' + matchingView)
      return matchingView
        ? require('./pages/' + matchingView + '.vue').default
        : require('./pages/Index.vue').default
    }
  },
  render (h) {
    console.log('Calling render')
    console.log(this.ViewComponent)
    return h(this.ViewComponent)
  }
})

window.addEventListener('popstate', () => {
  app.currentRoute = window.location.pathname
})
