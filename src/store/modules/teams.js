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
        }
    },
    actions: {
        async getTeamsData({commit}) {
            const teams = await TeamService.getTeams()

            if (teams.error === 0) {
                commit('updateTeams', teams.data)
            }
            else
                console.log(teams.data)

            return teams
        }
    }
}