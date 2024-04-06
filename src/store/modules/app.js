import AppService from '../../services/app.service';

export default {
    namespace: true,
    state: () => ({
        organisationsPassword: null,
        organisations: [],
        currentOrganisation: null,
        teams: [],
        currentTeam: null,
        heroes: [],
        currentHero: null
    }),
    getters: {
        getOrganisationsPassword: state => state.organisationsPassword,
        getOrganisations: state => state.organisations,
        getCurrentOrganisation: state => state.currentOrganisation,
        getTeams: state => state.teams,
        getCurrentTeam: state => state.currentTeam,
        getHeroes: state => state.heroes,
        getCurrentHero: state => state.currentHero,
        isAuthenticated: state => !!state.organisationsPassword && !!state.currentOrganisation
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
        },
        removeHeroCurrentTeam(state, data) {
            state.currentTeam.members = state.currentTeam.members.filter(member => member._id !== data._id)
        },
        updateHeroes(state, data) {
            state.heroes = data
        },
        updateCurrentHero(state, data) {
            state.currentHero = data
        }
    },
    actions: {
        async getOrganisationsData({commit}) {
            const organisations = await AppService.getOrganisations()

            if (organisations.error === 0) {
                commit('updateOrganisationsNames', organisations.data)
            } else
                console.log(organisations.data)

            return organisations
        },
        async getOrganisationById({commit}) {
            if (!this.getters.getCurrentOrganisation) return
            const organisation = await AppService.getOrganisationById(this.getters.getCurrentOrganisation._id, this.getters.getOrganisationsPassword)
            if (organisation.error === 0) {
                commit('updateCurrentOrganisation', organisation.data[0])
            } else
                console.log(organisation.data)

            return organisation
        },
        async addTeamToOrganisation(context, idTeam) {
            const organisation = await AppService.addTeamToOrganisation(idTeam, this.getters.getOrganisationsPassword)
            if (organisation.error !== 0) {
                console.log(organisation.data)
            }
            return organisation
        },
        async removeTeamFromOrganisation(context, idTeam) {
            const organisation = await AppService.removeTeamFromOrganisation(idTeam, this.getters.getOrganisationsPassword)
            if (organisation.error !== 0) {
                console.log(organisation.data)
            }
            return organisation
        },
        async createOrganisation({commit}, organisation) {
            const newOrganisation = await AppService.createOrganisation(organisation)
            if (newOrganisation.error === 0) {
                commit('updateOrganisationsNames', newOrganisation.data)
            } else
                console.log(newOrganisation.data)
            return newOrganisation
        },
        async setOrganisationsPassword({commit}, password) {
            commit('updateOrganisationsPassword', password)
        },
        async getTeamsData({commit}) {
            const teams = await AppService.getTeams()

            if (teams.error === 0) {
                commit('updateTeams', teams.data)
            } else
                console.log(teams.data)

            return teams
        },
        async setCurrentTeam({commit}, data) {
            if (!data) {
              commit('updateCurrentTeam', null)
              return
            }
            console.log(data)
            const teamMembers = await Promise.all(data.members.map(async memberId => {
              const res = await AppService.getHeroById(memberId, this.getters.getOrganisationsPassword)
              if (res.error === 0)
                return res.data[0]
              else
                console.log(res)
            }));
            console.log('teamMembers:', teamMembers);
            data.members = teamMembers.filter(Boolean);
            commit('updateCurrentTeam', data)
          },
        async createTeam({commit}, team) {
            const answer = await AppService.createTeam(team)
            if (answer.error === 0) {
                commit('updateTeams', [...this.getters.getTeams, answer.data])
            } else
                console.log(answer.data)
            return answer
        },
        async addHeroToTeam({commit}, data) {
            const answer = await AppService.addHeroToTeam(this.getters.getCurrentTeam._id, data)
            if (answer.error === 0) {
                commit('addHeroTeam', answer.data)
                commit('addMemberToCurrentTeam', data);
            } else
                console.log(answer.data)
            return answer
        },
        async removeHeroFromTeam({commit}, data) {
            const answer = await AppService.removeHeroFromTeam(this.getters.getCurrentTeam._id, [data._id], this.getters.getOrganisationsPassword)
            if (answer.error === 0) {
                commit('removeHeroTeam', answer.data)
                commit('removeHeroCurrentTeam', data)
            } else
                console.log(answer.data)
            return answer
        },
        async getTeamById({commit}){
            if (!this.getters.getCurrentTeam) return
            const teamMembers = await AppService.getTeamMembers(this.getters.getCurrentTeam._id)
            if (teamMembers.error === 0) {
                commit('updateCurrentOrganisation', teamMembers.data[0])
            } else
                console.log(teamMembers.data)

            return teamMembers
        },
        async createHero(context, hero) {
            const answer = await AppService.createHero(hero)
            return answer
        },
        async getHeroesData({commit}) {
            const answer = await AppService.getHeroes()
            if (answer.error === 0)
                commit('updateHeroes', answer.data)
            else
                console.log(answer)
        },
         async setCurrentHero({commit}, data){
            commit('updateCurrentHero', data)
         }
    },
}
