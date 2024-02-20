<template>
  <div>
    <button class="add-teacher-button" @click="toggleAddTeacherForm">Ajouter un enseignant</button>

    <add-teacher-form v-if="isAddTeacherFormVisible && !selectedTeacher" @submit="handleAddTeacher" />

    <update-teacher-form v-if="isAddTeacherFormVisible && selectedTeacher" @submit="handleUpdateTeacher"
      :teacherData="selectedTeacher" buttonText="Modifier" />


    <teacher-list-component v-if="teachers.length > 0" :teachers="teachers" @deleteTeacher="handleDeleteTeacher"
      @editTeacher="editTeacher" />
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
    UpdateTeacherForm,
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
        console.log(teacherData);
        const teacherId = this.selectedTeacher._id;
        console.log(teacherId);
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
