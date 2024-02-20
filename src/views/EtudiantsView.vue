<template>
    <div>
        <button class="add-student-button" @click="toggleAddStudentForm">Ajouter un étudiant</button>
        <button class="import-student-button" @click="triggerFileInput">Importer un fichier CSV</button>

        <input type="file" ref="fileInput" @change="handleFileUpload" style="display: none;" />

        <add-student-form v-if="isAddStudentFormVisible" @studentAdded="handleStudentAdded" />
        <update-student-form v-if="isUpdateStudentFormVisible && selectedStudentId" @studentUpdated="handleStudentUpdated"
            :studentId="selectedStudentId" :buttonText="Modifier" key="update-student-form-key" />

        <student-list-component v-if="students.length > 0" :students="students" @deleteStudent="handleDeleteStudent" @editStudent="editStudent" />
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
            teachers: [], 
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
                await this.getAllStudents();
                console.log('Étudiant supprimé avec succès');
            } catch (error) {
                console.error('Erreur lors de la suppression de l\'étudiant', error);
            }
        },
        editStudent(student) {
            this.selectedStudentId = student._id;
            this.isUpdateStudentFormVisible = true;
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
                    this.addStudentsFromCSV(formattedData);
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

                const student = {};

                const tutorName = data[4].trim();
                const tutor = this.teachers.find(teacher => `${teacher.surname} ${teacher.name}`.trim() === tutorName);
                const tutorId = tutor ? tutor._id : null;

                if (!tutorId) {
                    console.error(`Aucun tuteur trouvé pour: ${tutorName}`);
                    continue;
                }

                for (let j = 0; j < headers.length; j++) {
                    student[headers[j]] = data[j];
                }

                student.tutor = tutorId;

                formattedData.push(student);
            }

            return formattedData;
        },

        async addStudentsFromCSV(data) {
            try {
                for (let i = 0; i < data.length; i++) {
                    await this.addStudent(data[i]);
                }
            } finally {
                await this.getAllStudents();
            }
        },
        async addStudent(studentData) {
            try {
                await apiService.createStudent(studentData);
                console.log('Étudiant ajouté avec succès:', studentData);
            } catch (error) {
                console.error('Erreur lors de l\'ajout de l\'étudiant:', error);
            }
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
        this.getAllStudents();
        this.getAllTeachers();
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

.import-student-button {
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

.add-student-button:hover,
.import-student-button:hover {
    background-color: #2980b9;
}
</style>
