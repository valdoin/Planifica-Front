<template>
    <div>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <input type="text" v-model="newTeacherData.surname" placeholder="Nom" />
            </div>

            <div class="form-group">
                <input type="text" v-model="newTeacherData.name" placeholder="Prénom" />
            </div>

            <div class="form-group">
                <input type="email" class="mail-input" v-model="newTeacherData.mail" placeholder="E-mail" />
            </div>

            <div class="form-group">
                <label for="isProgrammer">Programmeur ?</label>
                <input type="checkbox" id="isProgrammer" v-model="newTeacherData.isProgrammer" />
            </div>

            <button class="green-button" type="submit">{{ buttonText }}</button>
        </form>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            newTeacherData: {
                surname: '',
                name: '',
                mail: '',
                isProgrammer: false,
            },
        };
    },
    props: {
        teacherData: {
            type: Object,
            default: () => ({
                surname: '',
                name: '',
                mail: '',
                isProgrammer: false,
            }),
        },
        buttonText: {
            type: String,
            default: 'Modifier',
        },
    },
    methods: {
        submitForm() {
            this.$emit('submit', this.newTeacherData);
            this.resetForm();
        },
        resetForm() {
            this.newTeacherData = { surname: '', name: '', mail: '', isProgrammer: false };
        },
    },
};
</script>
  
<style scoped>
.form-group {
    margin-top: 10px;
    max-width: 300px;
}

input {
    width: 100%;
    padding: 8px;
    border: 2px solid #000000;
    border-radius: 5px;
    box-sizing: border-box;
}

input:focus {
    outline: none;
    border-color: #2ecc71;
}

.mail-input {
  width: 100%;
  padding: 8px;
  border: 2px solid #000000;
  border-radius: 5px;
  box-sizing: border-box;
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
