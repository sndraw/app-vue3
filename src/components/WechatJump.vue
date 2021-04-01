<template>
  <div class="wechat-jump">
    <div v-if="!isWeiXin" class="open-tip">请在微信客户端打开链接</div>
    <div v-if="isWeiXin && loading" class="loading-tip">Loading...</div>
    <div ref="launchBtn"></div>
    <!-- <wx-open-launch-weapp
      id="launch-btn"
      :username="weapp.username"
      :path="weapp.path"
    >
      <script type="text/wxtag-template">
        <button class="weapp-btn">打开小程序</button>
      </script>
    </wx-open-launch-weapp> -->
  </div>
</template>

<script>
import { onMounted, ref, readonly, computed } from "vue";
import wx from "weixin-js-sdk";
import WechatService from "@/service/WechatService";
// 微信相关配置
import wechatConf from "@/config/wechat.conf";
const wechatService = new WechatService();

export default {
  name: "WechatJump",
  components: {},
  setup() {
    // 公众号数据
    const officialAccount = readonly({
      hash: wechatConf.officialAccount.hash,
    });
    // 小程序数据
    const weapp = readonly({
      username: wechatConf.weapp.username,
      path: wechatConf.weapp.path,
    });
    // 开发标签按钮
    const launchBtn = ref("launch-btn");
    // 是否loading
    const loading = ref(true);
    // 是否微信端
    const isWeiXin = computed(() => {
      const ua = window.navigator.userAgent.toLowerCase();
      // ua.indexOf('micromessenger')为真-微信端，如果为假，就是其他浏览器
      if (ua.indexOf("micromessenger") > -1) {
        return true; // 是微信端
      } else {
        return false;
      }
    });
    // 获取微信公众号jsSdk配置
    const getJsSdkConfig = () => {
      const params = {
        hash: officialAccount.hash,
        url: encodeURIComponent(location.href.split("#")[0]),
      };
      return wechatService.getJsSdkConfig(params);
    };
    // 初始化微信公众号事件
    const initWxEvent = (info) => {
      wx.config({
        debug: false,
        appId: info.appId,
        timestamp: info.timestamp,
        nonceStr: info.nonceStr,
        signature: info.signature,
        jsApiList: [
          "updateAppMessageShareData",
          "updateTimelineShareData",
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
          "checkJsApi",
          "scanQRCode",
          "onMenuShareQQ",
          "onMenuShareWeibo",
          "previewImage",
          "chooseImage",
          "uploadImage",
          "downloadImage",
          "hideOptionMenu",
          "hideMenuItems",
          "hideAllNonBaseMenuItem",
        ],
        openTagList: ["wx-open-launch-weapp"], //这里直接添加，什么都不用管
      });
      wx.ready(() => {
        const shareConfig = {
          title: "测试", // 分享标题
          desc: "测试测试", // 分享描述
          link: location.href.split("#")[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: "https://www.sndraw.com/logo.png", // 分享图标
          success: () => {
            // 设置成功
          },
        };
        // 分享微信朋友
        if (wx.onMenuShareAppMessage) {
          wx.onMenuShareAppMessage(shareConfig);
        } else {
          wx.updateAppMessageShareData(shareConfig);
        }
        // 分享微信朋友圈
        if (wx.onMenuShareTimeline) {
          wx.onMenuShareTimeline(shareConfig);
        } else {
          wx.updateTimelineShareData(shareConfig);
        }
      });
      wx.error((res) => {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，
        console.log("wx:err:", res);
      });
    };
    // 绑定小程序跳转开发标签
    const bindOpenLaunchWeapp = () => {
      const script = document.createElement("script"); // 创建script内容插槽 避免template标签冲突
      script.type = "text/wxtag-template"; // 使用script插槽 必须定义这个type
      script.text = `<button class="weapp-btn">打开小程序</button>`; // 自定义的html字符串内容
      const launchBtnEl = launchBtn.value;
      const html = `<wx-open-launch-weapp username="${weapp.appid}" path="${weapp.path}">${script.outerHTML}</wx-open-launch-weapp>`;
      launchBtnEl.innerHTML = html; // html字符串赋值
      launchBtnEl.addEventListener("launch", () => {
        console.log("success");
      });
      launchBtnEl.addEventListener("error", (e) => {
        console.log("fail", e.detail);
      });
    };
    onMounted(() => {
      // 如果是微信端
      if (!isWeiXin.value) {
        // 绑定小程序跳转开发标签
        bindOpenLaunchWeapp();
        // 初始化微信公众号事件
        getJsSdkConfig().then((data) => {
          loading.value = false;
          initWxEvent(data);
        });
      }
    });
    return {
      launchBtn,
      loading,
      isWeiXin,
    };
  },
};
</script>
