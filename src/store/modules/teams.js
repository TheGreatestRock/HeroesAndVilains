import TeamService from '../../services/team.service'

export default {
    namespace: true,
    state: () => ({
        teams: [],
        currentTeam: null
    }),
    getters: {
        getTeams: state => state.teams,
        getCurrentTeam: state => state.currentTeam
    },
    mutations: {
        updateTeams(state, teams) {
            state.teams = teams
        },
        updateCurrentTeam(state, team) {
            state.currentTeam = team
        },
        addHeroTeam(state, data) {
            state.teams = state.teams.map(team => {
                if (team.id === data.id) {
                    return data
                }
                return team
            })
        },
        removeHeroTeam(state, data) {
            state.teams = state.teams.map(team => {
                if (team.id === data.id) {
                    return data
                }
                return team
            })
        }
    },
    actions: {
        async getTeamsData({commit}) {
            const teams = await TeamService.getTeams()

            if (teams.error === 0) {
                commit('updateTeams', teams.data)
            } else
                console.log(teams.data)

            return teams
        },
        async setCurrentTeam({commit}, data) {
            commit('updateCurrentTeam', data)
        },
        async createTeam({commit}, team) {
            const answer = await TeamService.createTeam(team)
            if (answer.error === 0) {
                commit('updateTeams', [...this.getters.getTeams, answer.data])
            } else
                console.log(answer.data)
            return answer
        },
        async addHeroToTeam({commit}, data) {
            const answer = await TeamService.addHeroToTeam(data.id, data.heroesId)
            if (answer.error === 0) {
                commit('addHeroTeam', answer.data)
            } else
                console.log(answer.data)
            return answer
        },
        async removeHeroFromTeam({commit}, data) {
            const answer = await TeamService.removeHeroFromTeam(data.id, data.heroesId)
            if (answer.error === 0) {
                commit('removeHeroTeam', answer.data)
            } else
                console.log(answer.data)
            return answer
        }
    }
}