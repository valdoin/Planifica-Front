<template>
  <div id="app">
    <img :class="{ 'small-logo': isAdminPage }" alt="Vue logo" src="./assets/logo2.png">
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
}

img {
  width: 420px;
}

.small-logo {
  width: 209px; 
}
</style>
