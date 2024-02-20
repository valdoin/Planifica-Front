<template>
    <div>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <input type="datetime-local" v-model="updatedDefenseData.date" required />
            </div>

            <div class="form-group">
                <input type="text" v-model="updatedDefenseData.classroom" required placeholder="Salle" />
            </div>

            <div class="form-group">
                <select v-model="updatedDefenseData.student" required>
                    <option value="" disabled selected hidden>Choisissez un étudiant</option>
                    <option v-for="student in students" :key="student._id" :value="student._id">
                        {{ student.surname }} {{ student.name }}
                    </option>
                </select>
            </div>

            <div class="form-group">
                <select v-model="updatedDefenseData.tutor" required>
                    <option value="" disabled selected hidden>Choisissez un tuteur</option>
                    <option v-for="teacher in uniqueTeachers" :key="teacher._id" :value="teacher._id">
                        {{ teacher.surname }} {{ teacher.name }}
                    </option>
                </select>
            </div>

            <div class="form-group">
                <select v-model="updatedDefenseData.candid" required>
                    <option value="" disabled selected hidden>Choisissez un candide</option>
                    <option v-for="teacher in uniqueTeachers" :key="teacher._id" :value="teacher._id">
                        {{ teacher.surname }} {{ teacher.name }}
                    </option>
                </select>
            </div>

            <button class="green-button" type="submit">Modifier</button>
        </form>
    </div>
</template>
  
<script>
export default {
    props: {
        defenseId: {
            type: String,
            required: true,
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
    data() {
        return {
            updatedDefenseData: {
                date: null,
                classroom: '',
                student: '',
                tutor: '',
                candid: '',
            },
        };
    },
    computed: {
        uniqueTeachers() {
            const uniqueTeachers = [...new Set(this.teachers)];
            return uniqueTeachers;
        },
    },
    methods: {
        submitForm() {
            this.$emit('defenseUpdated', this.updatedDefenseData);
            this.updatedDefenseData = {
                date: null,
                classroom: '',
                student: '',
                tutor: '',
                candid: '',
            };
        },
    },
};
</script>
  
<style scoped>
.form-group {
    margin-top: 10px;
    max-width: 300px;
}

input, select {
    width: 100%;
    padding: 8px; 
}

.green-button {
    background-color: #2ecc71;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 15px;
    cursor: pointer;
}
</style>
