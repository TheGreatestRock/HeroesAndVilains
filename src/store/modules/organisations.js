import OrganisationsService from '../../services/org.service'

export default {
    namespace: true,
    state: () => ({
        organisationsPassword: null,
        organisations: [],
        currentOrganisation: null
    }),
    getters: {
        getOrganisationsPassword: state => state.organisationsPassword,
        getOrganisations: state => state.organisations,
        getCurrentOrganisation: state => state.currentOrganisation
    },
    mutations: {
        updateOrganisationsPassword(state, password) {
            state.organisationsPassword = password
        },
        updateOrganisationsNames(state, names) {
            state.organisations = names
        },
        updateCurrentOrganisation(state, organisation) {
            state.currentOrganisation = organisation
        }
    },
    actions: {
        async getOrganisationsData({commit}) {
            const organisations = await OrganisationsService.getOrganisations()

            if (organisations.error === 0) {
                commit('updateOrganisationsNames', organisations.data)
            }
            else
                console.log(organisations.data)

            return organisations
        }

    },
}