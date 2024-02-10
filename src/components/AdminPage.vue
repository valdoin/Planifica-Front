<template>
  <div>
    <nav>
      <ul class="category-list">
        <li @click="selectCategory('Agenda')" :class="{ 'selected-category': selectedCategory === 'Agenda' }">Agenda</li>
        <li @click="selectCategory('Soutenances')" :class="{ 'selected-category': selectedCategory === 'Soutenances' }">Soutenances</li>
        <li @click="selectCategory('Enseignants')" :class="{ 'selected-category': selectedCategory === 'Enseignants' }">Enseignants</li>
        <li @click="selectCategory('Etudiants')" :class="{ 'selected-category': selectedCategory === 'Etudiants' }">Etudiants</li>
      </ul>
    </nav>

    <qalendar v-if="selectedCategory === 'Agenda'" :events="events" :config="config" />
  </div>
</template>

<script>
import {Qalendar} from 'qalendar';
import 'qalendar/dist/style.css';

export default {
  components: {
    Qalendar,
  },
  data() {
    return {
      selectedCategory: 'Agenda',
      events: [
        {
          title: 'Événement 1',
          time: { start: "2022-05-16 12:05", end: "2022-05-16 13:35" },
        },
        {
          title: 'Événement 2',
          time: { start: "2022-05-10", end: "2022-05-22" },
        },
        
      ],
      config: {
        week : {
        startsOn: 'sunday',
        nDays:5,
        },
        dayBoundaries: {
          start :8,
          end:18
        },
        dayIntervals: {
          length:60
        }
      }
    };
  },
  methods: {
    selectCategory(category) {
      this.selectedCategory = category;
    },
    logout() {
      // Méthode de déconnexion
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
</style>
