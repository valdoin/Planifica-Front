<template>
  <div id="app">
    <img :class="{ 'small-logo': isAdminPage }" alt="Vue logo" src="./assets/logo2.png">

    <!-- Utilisation dynamique des composants en fonction de l'état d'authentification -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isAdminPage: false,
    };
  },
  watch: {
    $route(to) {
      this.isAdminPage = to.name === 'admin';
    },
  },
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

img {
  width: 420px;
}

.small-logo {
  width: 200px; /* Ajustez la taille selon vos besoins */
}
</style>
