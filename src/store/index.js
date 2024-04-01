import Vue from 'vue'
import Vuex from 'vuex'
import heroes from './modules/heroes'
import app from './modules/app'
import auth from './modules/password'
import error from './modules/error'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        heroes,
        app,
        auth,
        error
    }
})