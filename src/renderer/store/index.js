import Vue from 'vue'
import Vuex from 'vuex'
import Counter from './modules/Counter'
import Silder from './modules/Silder'


Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    Counter,
    Silder
  }
})

