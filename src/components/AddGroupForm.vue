<template>
    <div>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <input type="text" v-model="groupData.name" required placeholder="Nom du groupe" />
        </div>
  
        <div class="form-group">
          <input type="number" v-model="groupData.length" required placeholder="Durée du créneau (en minutes)" />
        </div>
  
        <button class="blue-button" type="submit">{{ buttonText }}</button>
      </form>
    </div>
  </template>
  
  <script>
  import apiService from '../../services/apiService';
  
  export default {
    data() {
      return {
        groupData: {
          name: '',
          length: null,
        },
      };
    },
    props: {
      buttonText: {
        type: String,
        default: 'Ajouter',
      },
    },
    methods: {
      async submitForm() {
        try {
          await apiService.createGroup(this.groupData);
          console.log('Groupe ajouté avec succès');
          this.$emit('groupAdded');
        } catch (error) {
          console.error('Erreur lors de l\'ajout du groupe', error);
        } finally {
          this.resetForm();
        }
      },
      resetForm() {
        this.groupData = { name: '', length: null };
      },
    },
  };
  </script>
  
  <style scoped>
  .form-group {
    margin-top: 10px;
    max-width: 300px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    border: 2px solid #000000;
    border-radius: 5px;
    box-sizing: border-box;
  }
  
  input:focus {
    outline: none;
    border-color: #3498db;
  }
  
  .blue-button {
    background-color: #3498db;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 15px;
    cursor: pointer;
  }
  </style>
  