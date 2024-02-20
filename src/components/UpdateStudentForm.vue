<template>
  <div>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <input type="text" v-model="newStudentData.surname" placeholder="Nom" />
      </div>

      <div class="form-group">
        <input type="text" v-model="newStudentData.name" placeholder="Prénom" />
      </div>

      <div class="form-group">
        <input type="text" v-model="newStudentData.class" placeholder="Classe" />
      </div>

      <div class="form-group">
        <input type="email" v-model="newStudentData.mail" placeholder="E-mail" />
      </div>

      <div class="form-group">
        <select v-model="newStudentData.tutor" required>
          <option value="" disabled selected hidden>Choisissez un tuteur</option>
          <option v-for="teacher in teachers" :key="teacher._id" :value="teacher._id">
            {{ teacher.surname }} {{ teacher.name }}
          </option>
        </select>
      </div>

      <button class="green-button" type="submit">{{ buttonText }}</button>
    </form>
  </div>
</template>

<script>
import apiService from '../../services/apiService';

export default {
  data() {
    return {
      newStudentData: {
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
    studentId: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      default: 'Modifier',
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
        await apiService.updateStudent(this.studentId, this.newStudentData);
        console.log('Étudiant modifié avec succès');
        this.$emit('studentUpdated');
      } catch (error) {
        console.error('Erreur lors de la modification de l\'étudiant', error);
      } finally {
        this.resetForm();
      }
    },
    resetForm() {
      this.newStudentData = { surname: '', name: '', class: '', mail: '', tutor: '' };
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
}

.green-button {
  background-color: #2ecc71;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
}
</style>
