// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import routes from './routes'

Vue.config.productionTip = false
var prefix = '/lokwebjs'

const app = new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname,
    prefix: prefix
  },
  computed: {
    appRoute () {
      return this.currentRoute.replace(this.prefix, '')
    },
    ViewComponent () {
      const matchingView = routes[this.appRoute]
      return matchingView
        ? require('./pages/' + matchingView + '.vue').default
        : require('./pages/Index.vue').default
    }
  },
  render (h) {
    return h(this.ViewComponent)
  }
})

window.addEventListener('popstate', () => {
  app.currentRoute = window.location.pathname
})
