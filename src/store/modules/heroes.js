export default {
    namespace: true,
    state: () => ({
        heroesAliases: [],
        currentHero: null
    }),
    mutations: {
        updateHeroesAliases(state, aliases) {
            state.heroesAliases = aliases
        },
        updateCurrentHero(state, hero) {
            state.currentHero = hero
        }
    },
    actions: {},
    getters: {}
}