<template>
  <div>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <input type="text" v-model="studentData.surname" required placeholder="Nom" />
      </div>

      <div class="form-group">
        <input type="text" v-model="studentData.name" required placeholder="Prénom" />
      </div>

      <div class="form-group">
        <input type="text" v-model="studentData.class" required placeholder="Classe" />
      </div>

      <div class="form-group">
        <input type="email" v-model="studentData.mail" required placeholder="E-mail" />
      </div>

      <div class="form-group">
        <select v-model="studentData.tutor" required>
          <option value="" disabled selected hidden>Choisissez un tuteur</option>
          <option v-for="teacher in teachers" :key="teacher._id" :value="teacher._id">
            {{ teacher.surname }} {{ teacher.name }}
          </option>
        </select>
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
      studentData: {
        surname: '',
        name: '',
        class: '',
        mail: '',
        tutor: '',
      },
      teachers: [],
    };
  },
  props: {
    buttonText: {
      type: String,
      default: 'Ajouter',
    },
  },
  async created() {
    try {
      const response = await apiService.getAllTeachers();
      this.teachers = response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des enseignants', error);
    }
  },
  methods: {
    async submitForm() {
      try {
        await apiService.createStudent(this.studentData);
        console.log('Étudiant ajouté avec succès');
        this.$emit('studentAdded');
      } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'étudiant', error);
      } finally {
        this.resetForm();
      }
    },
    resetForm() {
      this.studentData = { surname: '', name: '', class: '', mail: '', tutor: '' };
    },
  },
};
</script>
  
<style scoped>
.form-group {
  margin-top: 10px;
  max-width: 300px;
}

input,
select {
  width: 100%;
  padding: 8px;
  border: 2px solid #000000;
  border-radius: 5px;
  box-sizing: border-box;
}


select:focus,
input:focus {
  outline: none;
  border-color: #3498db;
}



option {
  padding: 8px;
  background-color: #f8f9fa;
  color: #333;
}

option:hover {
  background-color: #3498db;
  color: white;
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
  