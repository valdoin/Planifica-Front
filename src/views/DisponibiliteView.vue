<template>
    <div class="availability-collection-page">
      <h1>Collecte des disponibilités des enseignants</h1>
      <form @submit.prevent="submitAvailability">
        <div class="form-group">
          <label for="teacherEmail">Email de l'enseignant:</label>
          <input type="email" id="teacherEmail" v-model="teacherEmail" required>
        </div>
        <div class="form-group">
          <label for="monday">Lundi:</label>
          <input type="datetime-local" id="monday" v-model="availabilities.monday" required>
        </div>
        <div class="form-group">
          <label for="tuesday">Mardi:</label>
          <input type="datetime-local" id="tuesday" v-model="availabilities.tuesday" required>
        </div>
        <div class="form-group">
          <label for="wednesday">Mercredi:</label>
          <input type="datetime-local" id="wednesday" v-model="availabilities.wednesday" required>
        </div>
        <div class="form-group">
          <label for="thursday">Jeudi:</label>
          <input type="datetime-local" id="thursday" v-model="availabilities.thursday" required>
        </div>
        <div class="form-group">
          <label for="friday">Vendredi:</label>
          <input type="datetime-local" id="friday" v-model="availabilities.friday" required>
        </div>
        <button type="submit">Soumettre</button>
      </form>
    </div>
  </template>
  
  <script>
  import apiService from '../../services/apiService';
  
  export default {
    data() {
      return {
        teacherEmail: '',
        availabilities: {
          monday: '',
          tuesday: '',
          wednesday: '',
          thursday: '',
          friday: ''
        }
      };
    },
    methods: {
      async submitAvailability() {
        try {
          const response = await apiService.updateTeacher(this.teacherEmail, { availabilities: this.availabilities });
          console.log('Disponibilités mises à jour avec succès', response.data);
          // Vous pouvez rediriger l'utilisateur vers une autre page après la soumission réussie si nécessaire
        } catch (error) {
          console.error('Erreur lors de la mise à jour des disponibilités', error);
        }
      }
    }
  };
  </script>
  
  <style>
  .availability-collection-page {
    max-width: 600px;
    margin: auto;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    font-weight: bold;
  }
  
  input[type="email"],
  input[type="datetime-local"] {
    width: 100%;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }
  
  button {
    background-color: #3498db;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #2980b9;
  }
  </style>
  