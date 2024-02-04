import axios from "axios";

async function getTeams() {
    try {
        const answer = await axios.get('https://apidemo.iut-bm.univ-fcomte.fr/herocorp/teams/get')
        return answer.data
    } catch (err) {
        return {error: 1, status: 404, data: 'unexpected error'}
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

export default {
    getTeams,
    createTeam
}