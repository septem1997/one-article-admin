<template>
  <div class="background" />
  <div class="fixed left-0 bottom-0">
    <big-title>首页</big-title>
  </div>
  <weather-widget class="fixed right-0 top-0" />
  <div class="content z-10">
    <router-view></router-view>
  </div>
</template>
<script>
import WeatherWidget from "./components/WeatherDateWidget.vue";
import NavigateMenu from "./components/NavigateMenu.vue";
import GradientBG from "./components/GradientBG.vue";
import BigTitle from "./components/common/BigTitle.vue";
export default {
  name: "test",
  components: {BigTitle, GradientBG, NavigateMenu, WeatherWidget}
}
</script>

<style scoped>
.background{
  @apply fixed right-0 top-0 w-screen h-screen z-0;
  background: url("https://septem1997-blog.oss-cn-beijing.aliyuncs.com/bg2.jpg") no-repeat;
  background-size: 100%;
}
.blog-title{
  position: absolute;
  left: 48px;
  top: 48px;
  font-size: 32px;
}
.content{
  width: 1024px;
  margin: 0 auto;
  padding: 48px 0;
  color: black;
  font-size: 48px;
  position: relative;
}
</style>
