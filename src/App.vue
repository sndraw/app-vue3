<template>
  <router-view />
  <div class="link-list">
    <router-link :class="['link-item']" to="/">Index</router-link>
    <router-link :class="['link-item']" to="home">Home</router-link>
    <router-link :class="['link-item']" to="webgl">WebGL</router-link>
    <router-link :class="['link-item']" to="db">DB</router-link>
    <router-link :class="['link-item']" to="wechat">wechat</router-link>
  </div>
</template>
<script>
// import { computed } from "vue";
// import router from "./router";
// import { useRoute } from "vue-router";

export default {
  name: "App",
  setup() {
    // const currentRoute = ctx.$router.currentRoute.value;
    // console.log(currentRoute);
    // const currentRoute = computed(() => {
    //   return ctx.$router.currentRoute.value;
    // });
    // const route = useRoute();
    // const currentRoute = computed(() => {
    //   console.log(route.path);
    //   return route.path;
    // });
    // return {
    //   currentRoute,
    // };
  },
};
</script>

<style lang="scss" scroped>
.link-list {
  width: 100%;
  position: fixed;
  bottom: 10px;
  left: 0;
  .link-item {
    margin: 0 20px;
    color: #555555;
    font-size: 20px;
    border-bottom: 1px solid transparent;
    &:hover,
    &:active {
      border-bottom: 1px solid #555555;
    }
    &:visited {
      color: #555555;
    }
    &.router-link-active {
      border-bottom: 1px solid #555555;
    }
  }
}
</style>
