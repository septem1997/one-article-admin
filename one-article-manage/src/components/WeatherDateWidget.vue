<template>
<div class="wrapper">
  <navigate-menu v-model:visible="showMenu" />
  <div  class="rainbow-circle" @click="showMenu = !showMenu">
    <div class="c1"></div>
    <div class="c2"></div>
    <div class="c3"></div>
    <div class="c4"></div>
    <div class="c5"></div>
  </div>
  <div class="weather-box">
    <my-icon name="icon-sun" />
  </div>
  <div class="date">
    {{ date }}
  </div>
  <div class="hour">{{hour}}</div>
</div>
</template>

<script>
import NavigateMenu from "./NavigateMenu.vue";
import dayjs from 'dayjs'
import {ref} from 'vue'
export default {
  name: "WeatherWidget",
  components: {NavigateMenu},
  setup(){
    const now = dayjs()
    const showMenu = ref(false)
    let hour = now.hour()
    if (hour>=0&&hour<6){
      hour = '凌晨'
    }else if (hour>=6&&hour<8){
      hour = '早晨'
    }else if(hour>=8&&hour<12){
      hour = '上午'
    }else if (hour>=12&&hour<14){
      hour = '午间'
    }else if(hour>=14&&hour<17){
      hour = '下午'
    }else if (hour>=17&&hour<20){
      hour = '傍晚'
    }else {
      hour = '夜间'
    }
    return {
      hour:hour,
      date:now.format(`MM/DD ${['日','一','二','三','四','五','六'][now.day()]}`),
      showMenu
    }
  }
}
</script>

<style scoped>
.wrapper{
  width: 460px;
  height: 240px;
  overflow: hidden;
}
.c1{
  border-width: 54px;
  border-color: #f3ff1f;
  background-image: linear-gradient(rgba(255,255,255,0),rgba(255,255,255,0.8));
}
.c2{
  border-width: 38px;
  border-color: #f5ab2b;
}
.c3{
  border-width: 28px;
  border-color: #fdf7e3;
}
.c4{
  border-width: 20px;
  border-color: #cd570d;
}
.c5{
  border-width: 12px;
  border-color: #fdf58b;
}
.date{
  background: #29272c;
  padding: 0 64px;
  line-height: 32px;
  height: 28px;
  font-size: 28px;
  color: white;
  right: 120px;
  top: 24px;
  border-radius: 36px;
  position: absolute;
  font-weight: bold;
  letter-spacing: 8px;
  transform: scale(1,0.8);
}
.hour{
  right: 200px;
  top: 48px;
  position: absolute;
  color: white;
  font-size: 42px;
  font-weight: bold;
  -webkit-text-stroke: 2px #29272c;
}
.weather-box{
  border-radius: 50%;
  width: 82px;
  height: 82px;
  border: 6px solid currentColor;
  position: absolute;
  background: black;
  right: 52px;
  top: 138px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 56px;
  color: #f7f820;
}
.weather-box img{
  width: 80%;
  height: 80%;
}
.rainbow-circle{
  position: absolute;
  right: -28px;
  top: -28px;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.rainbow-circle div{
  position: absolute;
  border-radius: 50%;
  width: 260px;
  height: 260px;
  border-style: solid;
  box-sizing: content-box;
}
</style>
