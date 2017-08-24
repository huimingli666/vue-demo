import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import modules from './modules'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
const store = new Vuex.Store({
  actions,
  modules,
  strict: false,	//debug
  plugins: debug ? [createLogger()] : []
})

export default store
