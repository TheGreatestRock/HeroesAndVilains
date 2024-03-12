import axios from "axios";

async function getOrganisations() {
    try {
        const answer = await axios.get('https://apidemo.iut-bm.univ-fcomte.fr/herocorp/orgs/get')
        return answer.data
    } catch (err) {
        return {error: 1, status: 404, data: 'unexpected error'}
    }
}

async function getOrganisationById(id, secret) {
    try {
        const answer = await axios.get(`https://apidemo.iut-bm.univ-fcomte.fr/herocorp/orgs/getbyid/${id}?org-secret=${secret}`)
        const organisation = answer.data
        return organisation
    } catch (err) {
        return {error: 1, status: 404, data: 'unexpected error'}
    }
}

async function createOrganisation(organisation) {
    try {
        const answer = await axios.post('https://apidemo.iut-bm.univ-fcomte.fr/herocorp/orgs/create', organisation)
        return answer.data
    } catch (err) {
        return {error: 1, status: 404, data: 'unexpected error'}
    }
}

async function addTeamToOrganisation(teamId, secret){
    try {
        const answer = await axios.patch(`https://apidemo.iut-bm.univ-fcomte.fr/herocorp/orgs/addteam?org-secret=${secret}`, {
            idTeam: teamId
        });
        return answer.data
    } catch (err) {
        console.log(err)
        return {error: 1, status: 404, data: 'unexpected error'}
    }

}

async function removeTeamFromOrganisation(teamId, secret){
    try {
        const answer = await axios.patch(`https://apidemo.iut-bm.univ-fcomte.fr/herocorp/orgs/removeteam?org-secret=${secret}`, {
            idTeam: teamId
        });
        return answer.data
    } catch (err) {
        return {error: 1, status: 404, data: 'unexpected error'}
    }

}

async function getTeams() {
    try {
        const answer = await axios.get('https://apidemo.iut-bm.univ-fcomte.fr/herocorp/teams/get')
        return answer.data
    } catch (err) {
        return {error: 1, status: 404, data: 'unexpected error'}
    }
}

async function getTeamMembers(teamId) {
    try {
        const answer = await axios.get(`https://apidemo.iut-bm.univ-fcomte.fr/herocorp/teams/get/${teamId}`)
        return answer.data.members
    } catch (err) {
        return []
    }
}

async function createTeam(team) {
    try {
        const answer = await axios.post('https://apidemo.iut-bm.univ-fcomte.fr/herocorp/teams/create', team)
        return answer.data
    } catch (err) {
        return {error: 1, status: 404, data: 'unexpected error'}
    }
}

async function addHeroToTeam(teamId, heroesId){
    try {
        const answer = await axios.post(`https://apidemo.iut-bm.univ-fcomte.fr/herocorp/teams/addheroes`, {
            idHeroes: heroesId, // Array of heroes id
            idTeam: teamId
        });
        return answer.data
    } catch (err) {
        return {error: 1, status: 404, data: 'unexpected error'}
    }

}

async function removeHeroFromTeam(teamId, heroesId){
    try {
        const answer = await axios.post(`https://apidemo.iut-bm.univ-fcomte.fr/herocorp/teams/removeheroes`, {
            idHeroes: heroesId, // Array of heroes id
            idTeam: teamId
        });
        return answer.data
    } catch (err) {
        return {error: 1, status: 404, data: 'unexpected error'}
    }
}


export default {
    getOrganisations,
    createOrganisation,
    getOrganisationById,
    addTeamToOrganisation,
    removeTeamFromOrganisation,
    getTeams,
    createTeam,
    getTeamMembers,
    addHeroToTeam,
    removeHeroFromTeam
}