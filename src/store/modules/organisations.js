import OrganisationsService from '../../services/org.service'

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
    actions: {
        async getOrganisations({commit}) {
            const organisations = OrganisationsService.getOrganisations()

            if (organisations.error === 0)
                commit.updateOrganisationsNames(organisations.data)
            else
                console.log(organisations.data)

            return organisations
        }
    },
    getters: {}
}