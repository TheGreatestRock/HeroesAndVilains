import axios from "axios";

async function getOrganisations(secret) {
    try {
        const config = {
            headers: {
                'org-secret': secret
            }
        };
        const answer = await axios.get('https://apidemo.iut-bm.univ-fcomte.fr/herocorp/orgs/get', config);
        return answer.data;
    } catch (err) {
        return {error: 1, status: 404, data: 'unexpected error'};
    }
}

async function getOrganisationById(id, secret) {
    try {
        const config = {
            headers: {
                'org-secret': secret
            }
        };
        const answer = await axios.get(`https://apidemo.iut-bm.univ-fcomte.fr/herocorp/orgs/getbyid/${id}`, config);
        const organisation = answer.data;
        return organisation;
    } catch (err) {
        return {error: 1, status: 404, data: 'unexpected error'};
    }
}

async function createOrganisation(organisation, secret) {
    try {
        const config = {
            headers: {
                'org-secret': secret
            }
        };
        const answer = await axios.post('https://apidemo.iut-bm.univ-fcomte.fr/herocorp/orgs/create', organisation, config);
        return answer.data;
    } catch (err) {
        return {error: 1, status: 404, data: 'unexpected error'};
    }
}

async function addTeamToOrganisation(teamId, secret){
    try {
        const config = {
            headers: {
                'org-secret': secret
            }
        };
        const answer = await axios.patch(`https://apidemo.iut-bm.univ-fcomte.fr/herocorp/orgs/addteam`, {
            idTeam: teamId
        }, config);
        return answer.data;
    } catch (err) {
        console.log(err);
        return {error: 1, status: 404, data: 'unexpected error'};
    }
}

async function removeTeamFromOrganisation(teamId, secret){
    try {
        const config = {
            headers: {
                'org-secret': secret
            }
        };
        const answer = await axios.patch(`https://apidemo.iut-bm.univ-fcomte.fr/herocorp/orgs/removeteam`, {
            idTeam: teamId
        }, config);
        return answer.data;
    } catch (err) {
        return {error: 1, status: 404, data: 'unexpected error'};
    }
}

async function getTeams(secret) {
    try {
        const config = {
            headers: {
                'org-secret': secret
            }
        };
        const answer = await axios.get('https://apidemo.iut-bm.univ-fcomte.fr/herocorp/teams/get', config);
        return answer.data;
    } catch (err) {
        return {error: 1, status: 404, data: 'unexpected error'};
    }
}

async function getTeamMembers(teamId, secret) {
    try {
        const config = {
            headers: {
                'org-secret': secret
            }
        };
        const answer = await axios.get(`https://apidemo.iut-bm.univ-fcomte.fr/herocorp/teams/get/${teamId}`, config);
        return answer.data.members;
    } catch (err) {
        return [];
    }
}

async function createTeam(team, secret) {
    try {
        const config = {
            headers: {
                'org-secret': secret
            }
        };
        const answer = await axios.post('https://apidemo.iut-bm.univ-fcomte.fr/herocorp/teams/create', team, config);
        return answer.data;
    } catch (err) {
        return {error: 1, status: 404, data: 'unexpected error'};
    }
}

async function addHeroToTeam(teamId, heroesId, secret){
    try {
        const config = {
            headers: {
                'org-secret': secret
            }
        };
        const answer = await axios.patch(`https://apidemo.iut-bm.univ-fcomte.fr/herocorp/teams/addheroes`, {
            idHeroes: heroesId, 
            idTeam: teamId
        }, config);
        return answer.data;
    } catch (err) {
        return {error: 1, status: 404, data: 'unexpected error'};
    }
}

async function removeHeroFromTeam(teamId, heroesId, secret){
    try {
        const config = {
            headers: {
                'org-secret': secret
            }
        };
        const answer = await axios.patch(`https://apidemo.iut-bm.univ-fcomte.fr/herocorp/teams/removeheroes`, {
            idHeroes: heroesId,
            idTeam: teamId
        }, config);
        return answer.data;
    } catch (err) {
        console.log(err)
        return {error: 1, status: 404, data: 'unexpected error'};
    }
}

async function getHeroById(heroId, orgSecret) {
    try {
        const answer = await axios.get('https://apidemo.iut-bm.univ-fcomte.fr/herocorp/heroes/getbyid/' + heroId + '?org-secret=' + orgSecret)
        return answer.data
    } catch (e) {
        return {error: 1, status: 404, data: 'unexpected error'}
    }
}

async function createHero(hero){
    try {
        const answer = await axios.post('https://apidemo.iut-bm.univ-fcomte.fr/herocorp/heroes/create', hero)
        return answer.data
    } catch (e) {
        console.log(e)
        return {error: 1, status: 404, data: 'unexpected error'}
    }
}

async function getHeroes() {
    try {
        const answer = await axios.get('https://apidemo.iut-bm.univ-fcomte.fr/herocorp/heroes/getaliases')
        return answer.data
    } catch (e) {
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
    removeHeroFromTeam,
    getHeroById,
    createHero,
    getHeroes
}
