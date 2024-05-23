<template>
    <div>
        <button class="add-defense-button" @click="toggleAddDefenseForm">Ajouter une soutenance</button>

        <button class="import-defense-button" @click="triggerFileInput">Importation CSV ⬆️</button>

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
                    this.addDefensesFromCSV(formattedData);
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

                if (data.length === 1 && !data[0].trim()) {
                    continue;
                }

                const defense = {};

                for (let j = 0; j < headers.length; j++) {
                    defense[headers[j]] = data[j];
                }

                formattedData.push(defense);
            }

            return formattedData;
        },
        async addDefensesFromCSV(data) {
            try {
                for (let i = 0; i < data.length; i++) {
                    await this.processDefense(data[i]);
                }
            } finally {
                await this.getAllDefenses();
            }
        },
        async processDefense(defenseData) {
            const student = await this.findOrCreateStudent(defenseData);
            const tutor = await this.findOrCreateTeacher({
                surname: defenseData.tutor_surname,
                name: defenseData.tutor_name,
                isProgrammer: defenseData.tutor_isProgrammer,
                mail: defenseData.tutor_mail,
                availabilities: defenseData.tutor_availabilities
            });
            const candid = await this.findOrCreateTeacher({
                surname: defenseData.candid_surname,
                name: defenseData.candid_name,
                isProgrammer: defenseData.candid_isProgrammer,
                mail: defenseData.candid_mail,
                availabilities: defenseData.candid_availabilities
            });

            const defense = {
                date: defenseData.date,
                classroom: defenseData.classroom,
                student: student._id,
                tutor: tutor._id,
                candid: candid._id
            };

            await apiService.createDefense(defense);
        },
        async findOrCreateStudent(defenseData) {
            try {
                let student = (await apiService.findStudentByMail(defenseData.student_mail)).data;
                if (!student) {
                    student = {
                        surname: defenseData.student_surname,
                        name: defenseData.student_name,
                        class: defenseData.student_class,
                        mail: defenseData.student_mail,
                        tutor: null
                    };
                    const tutor = await this.findOrCreateTeacher({
                        surname: defenseData.tutor_surname,
                        name: defenseData.tutor_name,
                        isProgrammer: defenseData.tutor_isProgrammer,
                        mail: defenseData.tutor_mail,
                        availabilities: defenseData.tutor_availabilities
                    });
                    student.tutor = tutor._id;
                    student = (await apiService.createStudent(student)).data;
                }
                return student;
            } catch (error) {
                console.error('Erreur lors de la recherche ou de la création de l\'étudiant', error);
            }
        },
        async findOrCreateTeacher(teacherData) {
            try {
                let teacher = (await apiService.findTeacherByMail(teacherData.mail)).data;
                if (!teacher) {
                    teacher = {
                        surname: teacherData.surname,
                        name: teacherData.name,
                        isProgrammer: teacherData.isProgrammer,
                        mail: teacherData.mail,
                        availabilities: teacherData.availabilities
                    };
                    teacher = (await apiService.createTeacher(teacher)).data;
                }
                return teacher;
            } catch (error) {
                console.error('Erreur lors de la recherche ou de la création de l\'enseignant', error);
            }
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

.import-defense-button {
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

.import-defense-button:hover {
    background-color: rgb(228, 154, 15);
}
</style>
