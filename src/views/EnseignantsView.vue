<template>
    <div>
      <button class="add-teacher-button" @click="toggleAddTeacherForm">Ajouter un enseignant</button>
  
      <add-teacher-form
        v-if="isAddTeacherFormVisible"
        @submit="handleAddOrUpdateTeacher"
        @cancel="cancelAddTeacherForm"
        :teacherData="selectedTeacher"
        :buttonText="selectedTeacher ? 'Modifier' : 'Ajouter'"
      />
  
      <teacher-list-component
        v-if="teachers.length > 0"
        :teachers="teachers"
        @deleteTeacher="handleDeleteTeacher"
        @editTeacher="editTeacher"
      />
      <p v-else>Vous n'avez ajouté aucun enseignant pour le moment !</p>
    </div>
  </template>
  
  <script>
  import AddTeacherForm from '@/components/AddTeacherForm.vue';
  import TeacherListComponent from '@/components/TeacherListComponent.vue';
  import apiService from '../../services/apiService';
  import cloneDeep from 'lodash/cloneDeep';
  
  export default {
    components: {
      AddTeacherForm,
      TeacherListComponent,
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
      handleAddOrUpdateTeacher(teacherData) {
        if (this.selectedTeacher) {
          this.updateTeacher(teacherData);
        } else {
          this.createTeacher(teacherData);
        }
      },
      createTeacher(teacherData) {
        apiService.createTeacher(teacherData)
          .then(() => {
            this.getAllTeachers();
            console.log('Enseignant ajouté avec succès');
          })
          .catch((error) => {
            console.error('Erreur lors de l\'ajout de l\'enseignant', error);
          })
          .finally(() => {
            this.isAddTeacherFormVisible = false;
          });
      },
      updateTeacher(teacherData) {
        const teacherId = this.selectedTeacher._id;
        apiService.updateTeacher(teacherId, teacherData)
          .then(() => {
            this.getAllTeachers();
            console.log('Enseignant modifié avec succès');
          })
          .catch((error) => {
            console.error('Erreur lors de la modification de l\'enseignant', error);
          })
          .finally(() => {
            this.isAddTeacherFormVisible = false;
            this.selectedTeacher = null;
          });
      },
      handleDeleteTeacher(teacherId) {
        apiService.deleteTeacher(teacherId)
          .then(() => {
            this.getAllTeachers();
            console.log('Enseignant supprimé avec succès');
          })
          .catch((error) => {
            console.error('Erreur lors de la suppression de l\'enseignant', error);
          });
      },
      editTeacher(teacher) {
        this.selectedTeacher = cloneDeep(teacher);
        this.isAddTeacherFormVisible = true;
      },
      getAllTeachers() {
        apiService.getAllTeachers()
          .then((response) => {
            this.teachers = response.data;
          })
          .catch((error) => {
            console.error('Erreur lors de la récupération des enseignants', error);
          });
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
  
  .add-teacher-button:hover {
    background-color: #2980b9;
  }
  </style>
  