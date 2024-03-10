<template>
  <div class="app-container">
    <template v-if="!appStarted">
      <!-- Tela de boas-vindas -->
      <Login @start-app="startApp" />
    </template>

    <template v-else>
      <!-- Conteúdo principal do aplicativo -->
      <div class="menu-container">
        <nav class="buttons-container">
          <div class="menu-buttons">
            <button @click="changeTab('home')" :class="{ 'text-white font-bold': tab === 'home' }"
              class="home-button">Entrada</button>
            <button @click="changeTab('patio')" :class="{ 'text-white font-bold': tab === 'patio' }"
              class="patio-button">Pátio</button>
            <button @click="changeTab('config')" :class="{ 'text-white font-bold': tab === 'config' }"
              class="config-button">Configurações</button>
          </div>
        </nav>

        <div class="menuCurrent-container">
          <component :is="currentTabComponent"></component>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import Home from './components/Home.vue';
import Patio from './components/Patio.vue';
import Config from './components/Config.vue';
import Login from './components/Login.vue';

export default {
  name: 'App',

  components: {
    Home,
    Patio,
    Config,
    Login
  },
  data() {
    return {
      tab: 'home',
      appStarted: false,
    };
  },

  computed: {
    currentTabComponent() {
      if (this.tab === 'home') return Home;
      if (this.tab === 'patio') return Patio;
      if (this.tab === 'config') return Config;
      return null;
    }
  },

  methods: {
    startApp() {
      // Defina a variável appStarted como true para mostrar o conteúdo principal do aplicativo
      this.appStarted = true;
    },
    changeTab(newTab) {
      this.tab = newTab;
    },
  },
};
</script>

<style scoped>
.app-container {
  width: 100%;
  height: 100vh;
  background-color: rgb(63, 63, 63);
}

.menu-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(63, 63, 63);
  width: 100%;
  height: fit-content;
}

.buttons-container {
  width: 100%;
}

.home-button,
.patio-button,
.config-button {
  width: 33.33%;
  height: 42px;
  background-color: rgb(47, 47, 47);
  color: white;
  font-size: large;
}

.home-button:hover,
.patio-button:hover,
.config-button:hover {
  background-color: antiquewhite;
  color: black;
}

.home-button:focus,
.patio-button:focus,
.config-button:focus {
  border-bottom: 2px solid rgb(254, 1, 195);
}

.menuCurrent-container {
  width: 100%;

}
</style>
