<template>
    <div>{{ currentTime }}</div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentTime: ''
      };
    },
    created() {
      this.updateTime();
      setInterval(() => {
        this.updateTime();
      }, 1000);
    },
    methods: {
      updateTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        this.currentTime = `${hours}:${minutes}:${seconds}`;
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos do relógio aqui */
  </style>
  