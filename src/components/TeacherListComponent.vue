<template>
    <div class="enseignants-list">
        <h2>Liste des enseignants</h2>
        <table>
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="teacher in teachers" :key="teacher._id">
                    <td>{{ teacher.surname }}</td>
                    <td>{{ teacher.name }}</td>
                    <td>{{ teacher.mail }}</td>
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
    background-color: #3498db;
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
    /* Couleur verte pour le bouton de modification */
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
</style>
  