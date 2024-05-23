<template>
  <div>
    <button class="add-teacher-button" @click="toggleAddTeacherForm">Ajouter un enseignant</button>

    <button class="import-teacher-button" @click="triggerFileInput">Importation CSV ⬆️</button>
    <input type="file" ref="fileInput" @change="handleFileUpload" style="display: none;" />

    <button class="availability-collection-button" @click="confirmAvailabilityCollection">Collecte des disponibilités</button>

    <add-teacher-form v-if="isAddTeacherFormVisible && !selectedTeacher" @submit="handleAddTeacher" />

    <update-teacher-form v-if="isAddTeacherFormVisible && selectedTeacher" @submit="handleUpdateTeacher" :teacherData="selectedTeacher" buttonText="Modifier" />

    <teacher-list-component v-if="teachers.length > 0" :teachers="teachers" @deleteTeacher="handleDeleteTeacher" @editTeacher="editTeacher" />
    <p v-else>Vous n'avez ajouté aucun enseignant pour le moment !</p>
  </div>
</template>

<script>
import AddTeacherForm from '@/components/AddTeacherForm.vue';
import TeacherListComponent from '@/components/TeacherListComponent.vue';
import UpdateTeacherForm from '@/components/UpdateTeacherForm.vue';
import apiService from '../../services/apiService';

export default {
  components: {
    AddTeacherForm,
    TeacherListComponent,
    UpdateTeacherForm
  },
  data() {
    return {
      isAddTeacherFormVisible: false,
      teachers: [],
      selectedTeacher: null,
    };
  },
  methods: {
    toggleAddTeacherForm() {
      this.isAddTeacherFormVisible = !this.isAddTeacherFormVisible;
      this.selectedTeacher = null;
    },
    async handleAddTeacher(teacherData) {
      try {
        await apiService.createTeacher(teacherData);
        this.getAllTeachers();
        console.log('Enseignant ajouté avec succès');
      } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'enseignant', error);
      } finally {
        this.isAddTeacherFormVisible = false;
      }
    },
    async handleUpdateTeacher(teacherData) {
      try {
        const teacherId = this.selectedTeacher._id;
        await apiService.updateTeacher(teacherId, teacherData);
        this.getAllTeachers();
        console.log('Enseignant modifié avec succès');
      } catch (error) {
        console.error('Erreur lors de la modification de l\'enseignant', error);
      } finally {
        this.isAddTeacherFormVisible = false;
        this.selectedTeacher = null;
      }
    },
    async handleDeleteTeacher(teacherId) {
      try {
        await apiService.deleteTeacher(teacherId);
        this.getAllTeachers();
        console.log('Enseignant supprimé avec succès');
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'enseignant', error);
      }
    },
    editTeacher(teacher) {
      this.selectedTeacher = { ...teacher };
      this.isAddTeacherFormVisible = true;
    },
    async getAllTeachers() {
      try {
        const response = await apiService.getAllTeachers();
        this.teachers = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des enseignants', error);
      }
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const csv = e.target.result;
          const formattedData = this.formatCSVData(csv);
          this.addTeachersFromCSV(formattedData);
        };
        reader.readAsText(file);
      }
    },
    formatCSVData(csv) {
      const lines = csv.split('\n');
      const headers = lines[0].split(';');
      const formattedData = [];

      for (let i = 1; i < lines.length; i++) {
        const data = lines[i].split(';');
        const teacher = {};

        for (let j = 0; j < headers.length; j++) {
          if (headers[j] === 'isProgrammer') {
            teacher[headers[j]] = data[j] === 'true';
          } else {
            teacher[headers[j]] = data[j];
          }
        }

        formattedData.push(teacher);
      }
      console.log(formattedData);
      return formattedData;
    },
    async addTeachersFromCSV(data) {
      try {
        for (let i = 0; i < data.length; i++) {
          try {
            await apiService.createTeacher(data[i]);
            console.log('Enseignant ajouté avec succès:', data[i]);
          } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'enseignant:', error);
          }
        }
      } finally {

        this.getAllTeachers();
      }
    },
    confirmAvailabilityCollection() {
      if (confirm("Êtes-vous sûr de vouloir envoyer des e-mails pour collecter les disponibilités des enseignants ?")) {
        this.sendAvailabilityCollectionEmails();
      }
    },
    async sendAvailabilityCollectionEmails() {
      try {
        await apiService.sendMailToTeachers();
        alert('E-mails de collecte de disponibilités envoyés avec succès !');
      } catch (error) {
        console.error('Erreur lors de l\'envoi des e-mails de collecte de disponibilités', error);
        alert('Une erreur est survenue lors de l\'envoi des e-mails de collecte de disponibilités.');
      }
    },


  },
  created() {
    this.getAllTeachers();
  },
};
</script>

<style scoped>
.add-teacher-button {
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.import-teacher-button {
  background-color: orange;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-left: 10px;
  transition: background-color 0.3s ease;
}

.add-teacher-button:hover {
  background-color: #2980b9;
}

.import-teacher-button:hover {
  background-color: rgb(228, 154, 15);
}

.availability-collection-button {
  background-color: #8a2be2;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-left: 10px;
  transition: background-color 0.3s ease;
}

.availability-collection-button:hover {
  background-color: #7a249e;
}
</style>