import { createRouter, createWebHashHistory } from 'vue-router';
import GridAnimation from '../components/Grid.vue';

const routes = [
  {
    path: '/',
    name: 'GridAnimation',
    component: GridAnimation,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;