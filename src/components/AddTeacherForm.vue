<template>
  <div>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <input type="text" v-model="localTeacherData.surname" @input="updateLocalData" required placeholder="Nom" />
      </div>

      <div class="form-group">
        <input type="text" v-model="localTeacherData.name" @input="updateLocalData" required placeholder="Prénom" />
      </div>

      <div class="form-group">
        <input type="email" v-model="localTeacherData.mail" @input="updateLocalData" required placeholder="E-mail" />
      </div>

      <button class="blue-button" type="submit">✓</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      localTeacherData: {
        surname: '',
        name: '',
        mail: '',
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
      }),
    },
    buttonText: {
      type: String,
      default: 'Ajouter',
    },
  },
  methods: {
    submitForm() {
      this.$emit('submit', { ...this.localTeacherData });
      this.resetForm();
    },
    resetForm() {
      this.localTeacherData = {
        surname: '',
        name: '',
        mail: '',
      };
    },
    updateLocalData() {
      this.localTeacherData = { ...this.localTeacherData, ...this.teacherData };
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