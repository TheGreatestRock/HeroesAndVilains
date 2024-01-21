import axios from "axios";

async function getOrganisations() {
    try {
        const answer = await axios.get('https://apidemo.iut-bm.univ-fcomte.fr/herocorp/orgs/get')
        return answer.data
    } catch (err) {
        return {error: 1, status: 404, data: 'unexpected error'}
    }
}

export default {
    getOrganisations
}