<template>
  <div class="login-container">
    <h1>Bienvenue sur le planificateur de soutenances de Lyon 1.</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <input type="text" v-model="username" placeholder="Nom d'utilisateur" required>
      </div>

      <div class="form-group">
        <input type="password" v-model="password" placeholder= "Mot de passe" required>
      </div>

      <button type="submit" class="login-button">Connexion</button>

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import router from '../router.js'
import apiService from '/services/apiService';

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await apiService.login({
          username: this.username,
          password: this.password,
        });

        console.log(response.data);

        this.errorMessage = '';
        
        router.replace('/admin');

      } catch (error) {

        console.error('Erreur lors de la connexion', error);

        this.errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect.';
      }
    },
  },
};
</script>

<style>
.login-container {
  text-align: center;
  margin-top: 20px;
}

form {
  max-width: 300px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
}

h1 {
  color:black !important;
  font-style: italic;
}
input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.login-button {
  background-color: #4caf50;
  color: #fff;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #45a049;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
