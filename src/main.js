import { createApp } from 'vue'
import App from './App.vue'
import router from './router';


const app = createApp(App);
app.use(router); // 使用路由器

createApp(App).mount('#app')
