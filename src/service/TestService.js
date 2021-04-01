import testApi from "@/api/test";
class TestService {
  constructor() {}
  async getInfo(params) {
    const result = await testApi.getInfo(params).then((res) => {
      return res.data || {};
    });
    return result;
  }
}

export default TestService;
