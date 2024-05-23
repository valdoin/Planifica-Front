<template>
    <div>
        <button class="add-defense-button" @click="toggleAddDefenseForm">Ajouter une soutenance</button>
        <button class="add-group-button" @click="toggleAddGroupForm">Ajouter un groupe</button>

        <add-defense-form v-if="isAddDefenseFormVisible" @defenseAdded="handleDefenseAdded" :students="students"
            :teachers="teachers" :groups="groups" />

        <add-group-form v-if="isAddGroupFormVisible" @groupAdded="handleGroupAdded" :buttonText="'Ajouter un groupe'" />

        <div class="group-dossiers">
            <div v-for="group in groups" :key="group._id" class="group-dossier">
                <button class="delete-group-icon" @click="deleteGroup(group._id)">❌</button>
                <h2>{{ group.name }}</h2>
                <defense-list-component v-if="getDefensesForGroup(group._id).length > 0"
                    :defenses="getDefensesForGroup(group._id)" @deleteDefense="handleDeleteDefense"
                    @editDefense="handleEditDefense" />
                <p v-else>Aucune soutenance dans ce groupe !</p>
            </div>
        </div>

        <p v-if="!groups || groups.length === 0">Aucun groupe trouvé.</p>
    </div>
</template>

<script>
import AddGroupForm from '@/components/AddGroupForm.vue';
import AddDefenseForm from '@/components/AddDefenseForm.vue';
import DefenseListComponent from '@/components/DefenseListComponent.vue';
import apiService from '../../services/apiService';

export default {
    components: {
        AddGroupForm,
        AddDefenseForm,
        DefenseListComponent,
    },
    data() {
        return {
            isAddDefenseFormVisible: false,
            isAddGroupFormVisible: false,
            defenses: [],
            students: [],
            teachers: [],
            groups: [],
        };
    },
    methods: {
        toggleAddDefenseForm() {
            this.isAddDefenseFormVisible = !this.isAddDefenseFormVisible;
            this.isAddGroupFormVisible = false;
        },
        toggleAddGroupForm() {
            this.isAddGroupFormVisible = !this.isAddGroupFormVisible;
            this.isAddDefenseFormVisible = false;
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
        async handleGroupAdded(groupData) {
            console.log('Événement: Groupe ajouté', groupData);
            try {
                apiService.createGroup(groupData);
                this.toggleAddGroupForm();
                console.log('Groupe ajouté avec succès');
                this.loadGroups();
            } catch (error) {
                console.error('Erreur lors de l\'ajout du groupe', error);
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
            this.isAddDefenseFormVisible = true;
            this.isAddGroupFormVisible = false;
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
        async loadGroups() {
            try {
                const response = await apiService.getAllGroups();
                this.groups = response.data;
            } catch (error) {
                console.error('Erreur lors du chargement des groupes', error);
            }
        },
        getDefensesForGroup(groupId) {
            return this.defenses.filter(defense => defense.group && defense.group._id === groupId);
        },
        async deleteGroup(groupId) {
            if (confirm("Voulez-vous vraiment supprimer ce groupe et toutes ses soutenances ?")) {
                try {
                    const defenses = this.defenses.filter(defense => defense.group && defense.group._id === groupId);
                    await Promise.all(defenses.map(defense => apiService.deleteDefense(defense._id)));
                    await apiService.deleteGroup(groupId);
                    await this.loadGroups();
                } catch (error) {
                    console.error('Erreur lors de la suppression du groupe', error);
                }
            }
        }
    },
    created() {
        this.loadStudentsAndTeachers();
        this.getAllDefenses();
        this.loadGroups();
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

.add-group-button {
    background-color: rgb(214, 211, 19);
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-left: 10px;
    transition: background-color 0.3s ease;
}

.add-group-button:hover {
    background-color: rgb(207, 185, 17);
}

.group-dossiers {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    margin-top: 10px;
}

.group-dossier {
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 20px;
    width: 700px;
}

.group-dossier h2 {
    font-size: 20px;
    margin-bottom: 10px;
}

.delete-group-icon {
    cursor: pointer;
    background-color: transparent;
    margin-left:95%;
}
</style>
