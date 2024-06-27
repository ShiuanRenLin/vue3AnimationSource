<template>
  <div id="app" class="app-container">
    <GridAnimation />
  </div>
</template>

<script>
import GridAnimation from './components/Grid.vue';

export default {
  name: 'App',
  components: {
    GridAnimation
  }
};
</script>

<style scoped>
#app {
  width: 390px; /* 設置整個應用的寬度 */
  height: 844px; /* 設置整個應用的高度 */
  margin: 0 auto; /* 讓應用置中顯示 */
  background-color: black; /* 背景色為黑色 */
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden; /* 如果需要，隱藏溢出內容 */
}

.app-container {
  width: 100%;
  height: 100%;
  background-color: black; /* 確保內部容器也是黑色背景 */
}
</style>
