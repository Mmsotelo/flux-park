<template>
  <v-app>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12">
          <v-card class="cabecalho">
            <v-tabs v-model="tab" grow class="v-tabs-no-padding">
              <v-tab value="one">Home</v-tab>
              <v-tab value="two">Pátio</v-tab>
              <v-tab value="three">Config</v-tab>
            </v-tabs>
          </v-card>
        </v-col>
      </v-row>

      <v-window v-model="tab">
        <v-window-item value='one'>
          <Home />
        </v-window-item>
        <v-window-item value='two'>
          <Patio />
        </v-window-item>
        <v-window-item value='three'>
          <Config />
        </v-window-item>
      </v-window>

    </v-container>
  </v-app>
</template>

<script>
import Home from './components/Home.vue';
import Patio from './components/Patio.vue';
import Config from './components/Config.vue';

export default {
  name: 'App',

  components: {
    Home,
    Patio,
    Config,
  },
  data() {
    return {
      tab: null,
    };
  },
  methods: {
    changeTab(newTab) {
      this.tab = newTab;
    },
  },
};
</script>

<style scoped>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #001428;

}
.cabecalho {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.v-tabs-no-padding {
  padding-top: 0;
}
</style>
