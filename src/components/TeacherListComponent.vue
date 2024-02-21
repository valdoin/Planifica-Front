<template>
    <div class="enseignants-list">
        <h2>Liste des enseignants</h2>
        <table>
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Email</th>
                    <th>Programmeur</th>
                    <th>Disponibilités</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="teacher in teachers" :key="teacher._id">
                    <td>{{ teacher.surname }}</td>
                    <td>{{ teacher.name }}</td>
                    <td>{{ teacher.mail }}</td>
                    <td>{{ teacher.isProgrammer ? 'Oui' : 'Non' }}</td>
                    <td>
                        <ul v-if="teacher.availabilities.length > 0" class="availability-list">
                            <li v-for="(availability, index) in teacher.availabilities" :key="index">{{ formatDate(availability) }}</li>
                        </ul>
                        <span v-else>Pas renseignées</span>
                    </td>
                    <td>
                        <button @click="editTeacher(teacher)" class="edit-button">Modifier</button>
                        <button @click="deleteTeacher(teacher._id)" class="delete-button">Supprimer</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
<script>
export default {
    props: {
        teachers: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
        deleteTeacher(teacherId) {
            this.$emit('deleteTeacher', teacherId);
        },
        editTeacher(teacher) {
            this.$emit('editTeacher', teacher);
        },
        formatDate(dateTime) { // Méthode pour formater la date
            const date = new Date(dateTime);
            const day = ('0' + date.getDate()).slice(-2);
            const month = ('0' + (date.getMonth() + 1)).slice(-2);
            const year = date.getFullYear();
            const hours = ('0' + date.getHours()).slice(-2);
            const minutes = ('0' + date.getMinutes()).slice(-2);
            return `${day}/${month}/${year} ${hours}:${minutes}`;
        }
    },
};
</script>
  
<style scoped>
.enseignants-list {
    margin-top: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
}

thead {
    background-color: #55B7BB;
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
