export default {
    namespace: true,
    state: () => ({
        heroesAliases: [],
        currentHero: null
    }),
    getters: {
        getHeroesAliases: state => state.heroesAliases,
        getCurrentHero: state => state.currentHero
    },
    mutations: {
        updateHeroesAliases(state, aliases) {
            state.heroesAliases = aliases
        },
        updateCurrentHero(state, hero) {
            state.currentHero = hero
        }
    },
    actions: {
    //     TODO
    },
}