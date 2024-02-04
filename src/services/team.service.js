import axios from "axios";

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
    getTeams,
    createTeam,
    getTeamMembers,
    addHeroToTeam,
    removeHeroFromTeam
}