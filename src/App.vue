<template>
  <router-view />
</template>
<script>
import { onMounted } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const { getters, dispatch } = useStore(); // 获取store 实例
    onMounted(() => {
      document.title = getters.title;
      dispatch("setTitle", "app-test").then(() => {
        document.title = getters.title;
      });
    });
  },
};
</script>
