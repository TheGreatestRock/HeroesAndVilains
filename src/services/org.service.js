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

async function addTeamToOrganisation(orgId, teamId, secret){
    try {
        const answer = await axios.post(`https://apidemo.iut-bm.univ-fcomte.fr/herocorp/orgs/addteam?org-secret=${secret}`, {
            idTeam: teamId,
            idOrg: orgId
        });
        return answer.data
    } catch (err) {
        return {error: 1, status: 404, data: 'unexpected error'}
    }

}

async function removeTeamFromOrganisation(orgId, teamId, secret){
    try {
        const answer = await axios.post(`https://apidemo.iut-bm.univ-fcomte.fr/herocorp/orgs/removeteam?org-secret=${secret}`, {
            idTeam: teamId,
            idOrg: orgId
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
    removeTeamFromOrganisation
}