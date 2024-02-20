<template>
    <div>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <input type="datetime-local" v-model="formData.date" required />
            </div>

            <div class="form-group">
                <input type="text" v-model="formData.classroom" required placeholder="Salle" />
            </div>

            <div class="form-group">
                <select v-model="formData.student" required>
                    <option :value="null" disabled selected hidden>Choisissez un étudiant</option>
                    <option v-for="student in students" :key="student._id" :value="student._id">
                        {{ student.surname }} {{ student.name }}
                    </option>
                </select>
            </div>

            <div class="form-group">
                <select v-model="formData.tutor" required>
                    <option :value="null" disabled selected hidden>Choisissez un tuteur</option>
                    <option v-for="teacher in teachers" :key="teacher._id" :value="teacher._id">
                        {{ teacher.surname }} {{ teacher.name }}
                    </option>
                </select>
            </div>

            <div class="form-group">
                <select v-model="formData.candid" required>
                    <option :value="null" disabled selected hidden>Choisissez un candide</option>
                    <option v-for="teacher in teachers" :key="teacher._id" :value="teacher._id">
                        {{ teacher.surname }} {{ teacher.name }}
                    </option>
                </select>
            </div>

            <button class="blue-button" type="submit">Ajouter</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formData: {
                date: null,
                classroom: '',
                student: null,
                tutor: null,
                candid: null,
            },
        };
    },
    methods: {
        submitForm() {
            this.$emit('defenseAdded', this.formData);
            this.resetForm();
        },
        resetForm() {
            this.formData = {
                date: null,
                classroom: '',
                student: null,
                tutor: null,
                candid: null,
            };
        },
    },
    props: {
        students: {
            type: Array,
            default: () => [],
        },
        teachers: {
            type: Array,
            default: () => [],
        },
    },
};
</script>

<style scoped>
.form-group {
    margin-top: 10px;
    max-width: 300px;
}

input,
select {
    width: 100%;
    padding: 8px;
    border: 2px solid #000000;
    border-radius: 5px;
    box-sizing: border-box;
}


select:focus,
input:focus {
    outline: none;
    border-color: #3498db;
}



option {
    padding: 8px;
    background-color: #f8f9fa;
    color: #333;
}

option:hover {
    background-color: #3498db;
    color: white;
}

.blue-button {
    background-color: #3498db;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 15px;
    cursor: pointer;
}
</style>
