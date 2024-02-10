import { createRouter, createWebHistory } from 'vue-router';
import LoginComponent from './components/LoginComponent.vue';
import AdminPage from './components/AdminPage.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginComponent,
  },
  {
    path: '/admin',
    name : 'admin',
    component: AdminPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
