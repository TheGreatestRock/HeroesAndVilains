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
        },
        addCurrentOrganisationTeams(state, teams) {
            state.currentOrganisation.teams = [...state.currentOrganisation.teams, ...teams]
        },
        removeCurrentOrganisationTeams(state, teams) {
            state.currentOrganisation.teams = state.currentOrganisation.teams.filter(team => !teams.includes(team))
        }
    },
    actions: {
        async getOrganisationsData({commit}) {
            const organisations = await OrganisationsService.getOrganisations()

            if (organisations.error === 0) {
                commit('updateOrganisationsNames', organisations.data)
            } else
                console.log(organisations.data)

            return organisations
        },
        async getOrganisationById({commit}) {
            if (!this.getters.getCurrentOrganisation) return
            const organisation = await OrganisationsService.getOrganisationById(this.getters.getCurrentOrganisation._id, this.getters.getOrganisationsPassword)
            if (organisation.error === 0) {
                commit('updateCurrentOrganisation', organisation.data[0])
            } else
                console.log(organisation.data)

            return organisation
        },
        async addTeamToOrganisation({commit}, idTeam) {
            console.log(this.getters.getCurrentOrganisation.id, idTeam, this.getters.getOrganisationsPassword)
            const organisation = await OrganisationsService.addTeamToOrganisation(idTeam, this.getters.getOrganisationsPassword)
            if (organisation.error === 0) {
                commit('addCurrentOrganisationTeams', organisation.data)
            } else
                console.log(organisation.data)
            return organisation
        },
        async removeTeamFromOrganisation({commit}, idTeam) {
            const organisation = await OrganisationsService.removeTeamFromOrganisation(idTeam, this.getters.getOrganisationsPassword)
            if (organisation.error === 0) {
                commit('removeCurrentOrganisationTeams', organisation.data)
            } else
                console.log(organisation.data)
            return organisation
        },
        async createOrganisation({commit}, organisation) {
            const newOrganisation = await OrganisationsService.createOrganisation(organisation)
            if (newOrganisation.error === 0) {
                commit('updateOrganisationsNames', newOrganisation.data)
            } else
                console.log(newOrganisation.data)
            return newOrganisation
        },
        async setOrganisationsPassword({commit}, password) {
            commit('updateOrganisationsPassword', password)
        }
    },
}