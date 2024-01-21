import Vue from 'vue'
import Vuex from 'vuex'
import heroes from './modules/heroes'
import organisations from './modules/organisations'
import teams from './modules/teams'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        heroes,
        organisations,
        teams
    }
})