<template>
    <v-card class="cabecalho">
      <v-tabs v-model="tab">
        <v-tab v-for="(tab, index) in tabs" :key="index" :value="tab.value">
          {{ tab.label }}
        </v-tab>
      </v-tabs>
    </v-card>
  </template>
  
  <script>
  export default {
    props: {
      tabs: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        tab: null,
      };
    },
  };
  </script>
  
  <style scoped>
  .cabecalho {
    background-color: rgb(251, 237, 224);
    display: flex;
    font-family: Arial, Helvetica, sans-serif;
    font-style: bold 24px;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    column-gap: 33px;
    cursor: pointer;
  }
  </style>
  