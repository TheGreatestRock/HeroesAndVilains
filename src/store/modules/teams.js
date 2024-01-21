export default {
    namespace: true,
    state: () => ({
        teams: [],
        currentTeam: null
    }),
    mutations: {
        updateTeams(state, teams) {
            state.teams = teams
        },
        updateCurrentTeam(state, team) {
            state.currentTeam = team
        }
    },
    actions: {},
    getters: {}
}