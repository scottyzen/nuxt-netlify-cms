export const state = () => ({
    blogPosts: [],
    blogPostScrollPossiton: 0
  });
  
export const mutations = {
  setBlogPosts(state, list) {
    state.blogPosts = list;
  },
  updateScrollPossition (state, n) {
    state.blogPostScrollPossiton = n
  }
};
  
export const actions = {
  async nuxtServerInit({ commit }) {
    let files = await require.context('~/assets/content/blog/', false, /\.json$/);
    let blogPosts = files.keys().reverse().map(key => {
      let res = files(key);
      res.slug = key.slice(2, -5);
      return res;
    });
    await commit('setBlogPosts', blogPosts);
  },
};