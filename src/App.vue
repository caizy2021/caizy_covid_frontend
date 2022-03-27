<template>
  <div class="container" :style="{ background: `url(${bg})` }">
    <div class="container-left"></div>
    <div class="container-center"></div>
    <div class="container-right"></div>
  </div>
</template>

<script setup lang="ts">
import bg from "./assets/bg.jpg";
import { useCounterStore } from "./stores/counter";

const store = useCounterStore();
store.getList();//调用方法获取疫情数据
</script>

<style lang="less">
* {
  padding: 0;
  margin: 0;
}
html,
body,
#app {
  height: 100%;
  overflow: hidden;
}
.container {
  height: 100%;
  display: flex;
  overflow: hidden;
  &-left {
    width: 400px;
  }
  &-center {
    flex: 1;
  }
  &-right {
    width: 400px;
  }
}
</style>
