/**
 * http配置
 */
// 引入axios
import axios from "axios";
// 超时时间
axios.defaults.timeout = 3600;
axios.defaults.withCredentials = true;
axios.defaults.responseType = "json";
// 请求状态标识，用于loading判定
export let loadingInstance = false;
// http请求拦截器
axios.interceptors.request.use(
  (config) => {
    loadingInstance = true;
    config.headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    config.params = Object.assign(
      {
        _t: new Date().getTime() + Math.random(),
      },
      config.params
    );
    return config;
  },
  (error) => {
    loadingInstance = false;
    console.error("Request Error");
    return Promise.reject(error);
  }
);

// http响应拦截器
axios.interceptors.response.use(
  (response) => {
    loadingInstance = false;
    const res = response.data;
    if (!res) {
      console.error("Response Result Error");
      return Promise.reject();
    }
    if (res.status !== 1) {
      console.error("Response Status Error");
      return Promise.reject();
    }
    return res;
  },
  (error) => {
    loadingInstance = false;
    console.error("Response Error");
    return Promise.reject(error.response);
  }
);

export default axios;
