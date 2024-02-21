<template>
  <div>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <input type="text" v-model="teacherData.surname" required placeholder="Nom" />
      </div>

      <div class="form-group">
        <input type="text" v-model="teacherData.name" required placeholder="Prénom" />
      </div>

      <div class="form-group">
        <input class ="mail-input" type="email" v-model="teacherData.mail" required placeholder="E-mail" />
      </div>

      <div class="form-group">
        <label for="isProgrammer">Programmeur ?</label>
        <input type="checkbox" id="isProgrammer" v-model="teacherData.isProgrammer" />
      </div>

      <button class="blue-button" type="submit">{{ buttonText }}</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      teacherData: {
        surname: '',
        name: '',
        mail: '',
        isProgrammer: false,
      },
    };
  },
  props: {
    buttonText: {
      type: String,
      default: 'Ajouter',
    },
  },
  methods: {
    submitForm() {
      this.$emit('submit', this.teacherData);
      console.log(this.teacherData);
      this.resetForm();
    },
    resetForm() {
      this.teacherData = { surname: '', name: '', mail: '', isProgrammer: false };
    },
  },
  created() {
    this.resetForm();
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
  border-color: #3498db;
}

.mail-input {
  width: 100%;
  padding: 8px;
  border: 2px solid #000000;
  border-radius: 5px;
  box-sizing: border-box;
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
