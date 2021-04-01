import wechatApi from "@/api/wechat";
class WechatService {
  constructor() {}
  async getJsSdkConfig(params) {
    const result = await wechatApi.getJsSdkConfig(params).then((res) => {
      return res.data || {};
    });
    return result;
  }
}

export default WechatService;
