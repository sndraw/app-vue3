<template>
  <div class="click-btn">
    <button @click="increment">点击（{{ state.count }}）</button>
    <div>双倍计数：{{ double }}</div>
  </div>
</template>
<script>
import { onBeforeMount, onMounted, reactive, computed, watchEffect } from "vue";
import { useStore } from "vuex";
import TestService from "@/service/TestService";
const testService = new TestService();
export default {
  name: "Test",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    console.log(testService.getInfo());
    const { getters, dispatch } = useStore(); // 获取store 实例
    document.title = getters.title;
    dispatch("setTitle", "app-test").then(() => {
      document.title = getters.title;
    });
    const state = reactive({
      count: 0,
    });
    const double = computed(() => state.count * 2);
    const increment = () => {
      state.count++;
    };
    watchEffect(() => {
      console.log(double.value);
    });
    onBeforeMount(() => {});
    onMounted(() => {
      console.log("app-test-title:", props.title);
    });
    return {
      state,
      double,
      increment,
    };
  },
};
</script>
