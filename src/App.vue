<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <div id="app" class="app-container">
    <GridAnimation />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import GridAnimation from './components/Grid.vue';

export default {
  name: 'App',
  components: {
    GridAnimation
  }
};
</script>

<style>
#app {
  background-color: black; /* 设置背景颜色为黑色 */
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.app-container {
  background-color: black; /* 如果需要确保内部内容也是黑色背景 */
}
</style>
