import wechatApi from "@/api/wechat";
class SiteService {
  constructor() {}
  async getJsSdkConfig(params) {
    const result = await wechatApi.getJsSdkConfig(params).then((res) => {
      return res.data || {};
    });
    return result;
  }
}

export default SiteService;
