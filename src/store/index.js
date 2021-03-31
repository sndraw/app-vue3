import { createStore } from "vuex";
import * as currentMutationTypes from "@/store/mutations-types";
import modules from "./modules";

const state = {
  title: "app-vue3",
  screenWidth: null,
  screenHeight: null,
};
const getters = {
  title: (state) => {
    return state.title;
  },
  screenWidth: (state) => {
    return state.screenWidth;
  },
  screenHeight: (state) => {
    return state.screenHeight;
  },
};

const mutations = {
  [currentMutationTypes.SET_TITLE](state, data) {
    state.title = data;
  },
  [currentMutationTypes.SET_SCREEN_WIDTH](state, data) {
    state.screenWidth = data;
  },
  [currentMutationTypes.SET_SCREEN_HEIGHT](state, data) {
    state.screenHeight = data;
  },
};
const actions = {
  setTitle({ commit }, data) {
    commit(currentMutationTypes.SET_TITLE, data);
  },
  setScreenWidth({ commit }, data) {
    commit(currentMutationTypes.SET_SCREEN_WIDTH, data);
  },
  setScreenHeight({ commit }, data) {
    commit(currentMutationTypes.SET_SCREEN_HEIGHT, data);
  },
};
export default createStore({
  state,
  mutations,
  getters,
  actions,
  modules,
});
