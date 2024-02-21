<template>
    <div class="students-list">
        <h2>Liste des étudiants</h2>
        <table>
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Classe</th>
                    <th>Email</th>
                    <th>Tuteur</th>
                    <th>Disponibilités</th> <!-- Ajout de la colonne Disponibilités -->
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="student in students" :key="student._id">
                    <td>{{ student.surname }}</td>
                    <td>{{ student.name }}</td>
                    <td>{{ student.class }}</td>
                    <td>{{ student.mail }}</td>
                    <td>{{ student.tutor ? `${student.tutor.name} ${student.tutor.surname}` : 'Aucun tuteur' }}</td>
                    <td>
                        <ul v-if="student.availabilities.length > 0" class="availability-list">
                            <li v-for="(availability, index) in student.availabilities" :key="index">{{ formatDate(availability) }}</li>
                        </ul>
                        <span v-else>Non renseignées</span>
                    </td>
                    <td>
                        <button @click="editStudent(student)" class="edit-button">Modifier</button>
                        <button @click="deleteStudent(student._id)" class="delete-button">Supprimer</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
<script>
export default {
    props: {
        students: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
        deleteStudent(studentId) {
            this.$emit('deleteStudent', studentId);
        },
        editStudent(student) {
            this.$emit('editStudent', student);
        },
        formatDate(dateTime) {
            const date = new Date(dateTime);
            const formattedDate = `${this.formatNumber(date.getDate())}/${this.formatNumber(date.getMonth() + 1)}/${date.getFullYear()}`;
            const formattedTime = `${this.formatNumber(date.getHours())}:${this.formatNumber(date.getMinutes())}`;
            return `${formattedDate} ${formattedTime}`;
        },
        formatNumber(num) {
            return num.toString().padStart(2, '0');
        }
    },
};
</script>
  
<style scoped>
.students-list {
    margin-top: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
}

thead {
    background-color: #6AD1A1;
    color: white;
}

th,
td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
}

.delete-button {
    background-color: #e74c3c;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 12px;
    margin-left: 10px;
    transition: background-color 0.3s ease;
}

.delete-button:hover {
    background-color: #c0392b;
}

.edit-button {
    background-color: #2ecc71;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 12px;
    margin-left: 5px;
    transition: background-color 0.3s ease;
}

.edit-button:hover {
    background-color: #27ae60;
}

.availability-list {
    list-style-type: none;
    padding-left: 0;
}

.availability-list li {
    margin-bottom: 5px;
}
</style>
