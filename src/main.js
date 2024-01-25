import { createApp } from 'vue';
import App from './App.vue';
// import { createRouter, createWebHistory } from 'vue-router';
// import LoginComponent from './components/Login.vue';
// import HomeComponent from './components/Home.vue';
// import PatioComponent from './components/Patio.vue';
// import ConfigComponent from './components/Config.vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/dist/vuetify.min.css';

const app = createApp(App);

// const routes = [
//   // { path: '/', redirect: '/login' },
//   // { path: '/login', component: LoginComponent },
//   { path: '/home', component: HomeComponent },
//   { path: '/patio', component: PatioComponent },
//   { path: '/config', component: ConfigComponent },
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });
const vuetify = createVuetify({
  components,
  directives,
})

// app.use(router);
app.use(vuetify);

app.mount('#app');
