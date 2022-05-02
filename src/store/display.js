export default {
  state: {
    currentComponent: {
      name: "Home",
    },
  },
  mutations: {
    changeComponent(state, componentName) {
      state.currentComponent.name = componentName;
    },
  },
  getters: {
    componentName: (state) => state.currentComponent.name,
  },
};
