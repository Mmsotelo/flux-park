import { createApp } from 'vue';
import App from './App.vue';
import store from './store';  
import 'tailwindcss/tailwind.css'

const app = createApp(App);


app.use(store);

//Dispatch para inicializar o store e montar a aplicação após a resolução
store.dispatch('inicializarStore').then(() => {
  app.mount('#app');
});
