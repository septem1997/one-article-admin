<template>
  <overlay-scrollbars class="homePage">
    <div class="card" v-for="item in list" :key="item.title">
      <div>{{item.content}}</div>
    </div>
  </overlay-scrollbars>
</template>

<script>
import {reactive} from 'vue'
export default {
  setup(){
    const list = reactive([])
    for (let i = 0;i<10;i++){
      list.push({
        title:'文章标题'+i,
        content:'文本'.repeat(100)
      })
    }
    return {
      list
    }
  }
}
</script>

<style scoped>
.homePage{
  height: calc(100vh - 100px);
  overflow: auto;
}
</style>
