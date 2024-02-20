<template>
    <div>
      <button class="add-student-button" @click="toggleAddStudentForm">Ajouter un étudiant</button>
  
      <add-student-form v-if="isAddStudentFormVisible" @studentAdded="handleStudentAdded" />
  
      <update-student-form v-if="isUpdateStudentFormVisible && selectedStudentId" @studentUpdated="handleStudentUpdated"
      :studentId="selectedStudentId" :buttonText="Modifier"
      key="update-student-form-key" />

  
      <student-list-component v-if="students.length > 0" :students="students" @deleteStudent="handleDeleteStudent"
        @editStudent="editStudent" />
      <p v-else>Vous n'avez ajouté aucun étudiant pour le moment !</p>
    </div>
  </template>
  
  <script>
  import AddStudentForm from '@/components/AddStudentForm.vue';
  import UpdateStudentForm from '@/components/UpdateStudentForm.vue';
  import StudentListComponent from '@/components/StudentListComponent.vue';
  import apiService from '../../services/apiService';
  
  export default {
    components: {
      AddStudentForm,
      UpdateStudentForm,
      StudentListComponent,
    },
    data() {
      return {
        isAddStudentFormVisible: false,
        isUpdateStudentFormVisible: false,
        selectedStudentId: null,
        students: [],
      };
    },
    methods: {
      toggleAddStudentForm() {
        this.isAddStudentFormVisible = !this.isAddStudentFormVisible;
        this.isUpdateStudentFormVisible = false;
        this.selectedStudentId = null;
      },
      async handleStudentAdded() {
        console.log('Événement: Étudiant ajouté');
        this.toggleAddStudentForm();
        await this.getAllStudents();
      },
      async handleStudentUpdated() {
        console.log('Événement: Étudiant modifié');
        this.toggleAddStudentForm();
        await this.getAllStudents();
      },
      async handleDeleteStudent(studentId) {
        try {
          await apiService.deleteStudent(studentId);
          this.getAllStudents();
          console.log('Étudiant supprimé avec succès');
        } catch (error) {
          console.error('Erreur lors de la suppression de l\'étudiant', error);
        }
      },
      editStudent(student) {
        this.selectedStudentId = student._id;
        this.isUpdateStudentFormVisible = true; // Mettre à true pour afficher le formulaire de modification
        this.isAddStudentFormVisible = false;
      },
      async getAllStudents() {
        try {
          const response = await apiService.getAllStudents();
          this.students = response.data;
        } catch (error) {
          console.error('Erreur lors de la récupération des étudiants', error);
        }
      },
    },
    created() {
      this.getAllStudents();
    },
  };
  </script>
  
  <style scoped>
  .add-student-button {
    background-color: #3498db;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
  }
  
  .add-student-button:hover {
    background-color: #2980b9;
  }
  </style>
  