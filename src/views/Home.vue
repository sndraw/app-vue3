<template>
  <div class="home text-center">
    <img alt="Vue logo" src="../assets/img/logo.png" />
    <app-test :title="testTitle"></app-test>
  </div>
</template>

<script>
import { ref } from "vue";

import AppTest from "./../components/Test.vue";
export default {
  name: "Home",
  components: { AppTest },
  setup() {
    const testTitle = ref("app-test");
    return {
      testTitle,
    };
  },
};
</script>
