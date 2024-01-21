import axios from "axios";

async function getOrganisations() {
    try {
        return await axios.get('https://apidemo.iut-bm.univ-fcomte.fr/herocorp/orgs/get')
    } catch (err) {
        return {error:1, status: 404, data: 'unexpected error'}
    }
}

export default {
    getOrganisations
}