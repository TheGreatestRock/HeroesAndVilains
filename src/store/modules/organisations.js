export default {
    namespace: true,
    state: () => ({
        organisationsPassword: null,
        organisationsNames: [],
        currentOrganisation: null
    }),
    mutations: {
        updateOrganisationsPassword(state, password) {
            state.organisationsPassword = password
        },
        updateOrganisationsNames(state, names) {
            state.organisationsNames = names
        },
        updateCurrentOrganisation(state, organisation) {
            state.currentOrganisation = organisation
        }
    },
    actions: {},
    getters: {}
}