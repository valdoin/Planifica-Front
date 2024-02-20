<!-- SoutenancesView.vue -->

<template>
    <div>
        <button class="add-defense-button" @click="toggleAddDefenseForm">Ajouter une soutenance</button>

        <add-defense-form v-if="isAddDefenseFormVisible" @defenseAdded="handleDefenseAdded" :students="students"
            :teachers="teachers" />

        <update-defense-form v-if="isUpdateDefenseFormVisible && selectedDefenseId" @defenseUpdated="handleDefenseUpdated"
            :defenseId="selectedDefenseId" :students="students" :teachers="teachers" />

        <defense-list-component v-if="defenses && defenses.length > 0" :defenses="defenses"
            @deleteDefense="handleDeleteDefense" @editDefense="handleEditDefense" />
        <p v-else>Vous n'avez ajouté aucune soutenance pour le moment !</p>
    </div>
</template>

<script>
import AddDefenseForm from '@/components/AddDefenseForm.vue';
import UpdateDefenseForm from '@/components/UpdateDefenseForm.vue';
import DefenseListComponent from '@/components/DefenseListComponent.vue';
import apiService from '../../services/apiService';

export default {
    components: {
        AddDefenseForm,
        UpdateDefenseForm,
        DefenseListComponent,
    },
    data() {
        return {
            isAddDefenseFormVisible: false,
            isUpdateDefenseFormVisible: false,
            selectedDefenseId: null,
            defenses: [],
            students: [],
            teachers: [],
        };
    },
    methods: {
        toggleAddDefenseForm() {
            this.isAddDefenseFormVisible = !this.isAddDefenseFormVisible;

            this.isUpdateDefenseFormVisible = false;
            this.selectedDefenseId = null;
        },
        async handleDefenseAdded(defenseData) {
            console.log('Événement: Soutenance ajoutée', defenseData);
            try {
                await apiService.createDefense(defenseData);
                this.toggleAddDefenseForm();
                await this.getAllDefenses();
            } catch (error) {
                console.error('Erreur lors de l\'ajout de la soutenance', error);
            }
        },
        async handleDefenseUpdated(defenseData) {
            console.log('Événement: Soutenance modifiée', defenseData);
            try {
                await apiService.updateDefense(this.selectedDefenseId, defenseData);
                this.toggleAddDefenseForm();
                await this.getAllDefenses();
            } catch (error) {
                console.error('Erreur lors de la modification de la soutenance', error);
            }
        },
        async getAllDefenses() {
            try {
                const response = await apiService.getAllDefenses();
                this.defenses = response.data;
            } catch (error) {
                console.error('Erreur lors de la récupération des soutenances', error);
            }
        },
        async handleDeleteDefense(defenseId) {
            try {
                await apiService.deleteDefense(defenseId);
                await this.getAllDefenses();
            } catch (error) {
                console.error('Erreur lors de la suppression de la soutenance', error);
            }
        },
        handleEditDefense(defense) {
            this.isAddDefenseFormVisible = false;
            this.isUpdateDefenseFormVisible = true;
            this.selectedDefenseId = defense._id;
        },
        async loadStudentsAndTeachers() {
            try {
                const studentsResponse = await apiService.getAllStudents();
                const teachersResponse = await apiService.getAllTeachers();

                this.students = studentsResponse.data;
                this.teachers = teachersResponse.data;
            } catch (error) {
                console.error('Erreur lors du chargement des étudiants et enseignants', error);
            }
        },
    },
    created() {
        this.loadStudentsAndTeachers();
        this.getAllDefenses();
    },
};
</script>

<style scoped>
.add-defense-button {
    background-color: #3498db;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
}

.add-defense-button:hover {
    background-color: #2980b9;
}
</style>
