import { createRouter, createWebHistory } from 'vue-router';
import LoginComponent from './components/LoginComponent.vue';
import AdminPage from './components/AdminPage.vue';
import DisponibiliteView from './views/DisponibiliteView.vue';

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
  {
    path: '/guest',
    name:'guest',
    component: DisponibiliteView,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
