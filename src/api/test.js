// 接口汇总
import http from "@/common/http";
import urlConf from "@/config/url.conf";
// import stringify from "@/utils/stringify";
const httpApi = {
  // 获取jsSdk配置信息
  getInfo: (params) => {
    const url = urlConf.baseApi + "/api/test";
    // post下参数序列化
    // params = stringify(params);
    return http.get(url, { params: params });
  },
};
export default httpApi;
