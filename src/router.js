import { createRouter, createWebHistory } from 'vue-router';
import LoginComponent from './components/LoginComponent.vue';
import AdminPage from './components/AdminPage.vue';
import DisponibilitesEnseignantsView from './views/DisponibilitesEnseignantsView.vue';
import DisponibilitesEtudiantsView from './views/DisponibilitesEtudiantsView.vue';

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
    path: '/teacherGuest',
    name:'teacherGuest',
    component: DisponibilitesEnseignantsView,
  },
  {
    path: '/studentGuest',
    name: 'studentGuest',
    component: DisponibilitesEtudiantsView,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
