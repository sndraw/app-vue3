import * as THREE from "three";

import "./theme";
export default {
  install(app) {
    // app.config.globalProperties.$THREE = THREE;
    app.provide("THREE", THREE);
  },
};
