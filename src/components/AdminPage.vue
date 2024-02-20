<template>
  <div class="profile-section" @click="toggleDropdown">
    <img src="../assets/defaut-profile-picture.jpg" alt="Admin Profile">
    <span>admin</span>
    <ul v-if="showDropdown" class="dropdown-menu">
      <li @click="logout">Déconnexion</li>
    </ul>
  </div>

  <div>
    <nav>
      <ul class="category-list">
        <li @click="selectCategory('Agenda')" :class="{ 'selected-category': selectedCategory === 'Agenda' }">Agenda</li>
        <li @click="selectCategory('Soutenances')" :class="{ 'selected-category': selectedCategory === 'Soutenances' }">
          Soutenances</li>
        <li @click="selectCategory('Enseignants')" :class="{ 'selected-category': selectedCategory === 'Enseignants' }">
          Enseignants</li>
        <li @click="selectCategory('Etudiants')" :class="{ 'selected-category': selectedCategory === 'Etudiants' }">
          Etudiants</li>
      </ul>
    </nav>


    <CalendarView v-if="selectedCategory === 'Agenda'" :events="eventsData" :config="configData" />
    <EnseignantsView v-if="selectedCategory === 'Enseignants'" />
    <EtudiantsView v-if="selectedCategory === 'Etudiants'" />
    <SoutenancesView v-if="selectedCategory === 'Soutenances'" />
  </div>
</template>

<script>
import CalendarView from '@/views/CalendarView.vue';
import EnseignantsView from '@/views/EnseignantsView.vue';
import EtudiantsView from '@/views/EtudiantsView.vue';
import SoutenancesView from '@/views/SoutenancesView.vue';
import router from '@/router';

export default {
  components: {
    CalendarView,
    EnseignantsView,
    EtudiantsView,
    SoutenancesView
  },
  data() {
    return {
      selectedCategory: 'Agenda',
      showDropdown: false
    };
  },
  methods: {
    selectCategory(category) {
      this.selectedCategory = category;
    },
    logout() {
      router.push('/');
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    selectedCategoryComponent() {
      switch (this.selectedCategory) {
        case 'Agenda':
          return 'calendar-view';
        case 'Enseignants':
          return 'enseignants-view';
        case 'Etudiant':
          return 'etudiants-view'
        case 'Soutenances':
          return 'soutenances-view'
        default:
          return null;
      }
    },
  },
};
</script>

<style>
h1 {
  color: #3498db;
}

.day-timeline__hour-text {
  text-align: left !important;
}

.category-list {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
}

.category-list li {
  margin-right: 20px;
  cursor: pointer;
  font-weight: bold;
  color: #333;
  transition: color 0.3s ease;
  padding: 10px;
  border-radius: 5px;
}

.category-list li:hover {
  color: #3498db;
}

.selected-category {
  background-color: #3498db;
  color: #fff;
}

button {
  background-color: #e74c3c;
  color: #fff;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #c0392b;
}

.profile-section {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 20px;
  cursor: pointer;
  position: relative;
}

.profile-section img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.profile-section span {
  font-weight: bold;
}

.dropdown-menu {
  position: absolute;
  top: 60px;
  right: 0;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-menu li {
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.dropdown-menu li:hover {
  background-color: #f4f4f4;
}
</style>
