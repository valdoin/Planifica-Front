<template>
    <div>
        <h2>Liste des soutenances</h2>
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Salle</th>
                    <th>Étudiant</th>
                    <th>Tuteur</th>
                    <th>Candide</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="defense in defenses" :key="defense._id">
                    <td>{{ formatDate(defense.date) }}</td>
                    <td>{{ defense.classroom }}</td>
                    <td>{{ defense.student ? defense.student.surname + ' ' + defense.student.name : 'N/A' }}</td>
                    <td>{{ defense.tutor ? defense.tutor.surname + ' ' + defense.tutor.name : 'N/A' }}</td>
                    <td>{{ defense.candid ? defense.candid.surname + ' ' + defense.candid.name : 'N/A' }}</td>
                    <td>
                        <button @click="editDefense(defense)" class="edit-button">Modifier</button>
                        <button @click="deleteDefense(defense._id)" class="delete-button">Supprimer</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        defenses: {
            type: Array,
            default: () => [],
        },
        students: {
            type: Array,
            default: () => [],
        },
        teachers: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
        deleteDefense(defenseId) {
            this.$emit('deleteDefense', defenseId);
        },
        editDefense(defense) {
            this.$emit('editDefense', defense);
        },
        formatDate(dateTime) {
            const date = new Date(dateTime);
            const day = date.getDate();
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
    margin-left: 5px;
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
</style>
