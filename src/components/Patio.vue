<template>
  <v-container fluid class="container-custom">
    <v-list class="list-custom">
      <v-card class="card-custom" variant="outlined" v-for="elementos in veiculos" :key="elementos.placaVeiculo">
        <v-card-item>
          <div class="text-subtitle-1 mb-1">{{ elementos.modeloVeiculo }} {{ elementos.corVeiculo }}</div>
          <div class="text-h3 mb-1">{{ elementos.placaVeiculo }}</div>
          <div class="text-subtitle-2">{{ elementos.horarioEntrada }}</div>
          <v-card-actions>
            <v-btn class="botaoSaida" variant="elevated" block>
              <strong>Saída</strong>
            </v-btn>
          </v-card-actions>
        </v-card-item>
      </v-card>
    </v-list>
  </v-container>
</template>

<script>
export default {
  name: 'Patio',

  data() {
    return {
      veiculos: [],
    }
  },
  mounted() {
    this.getVeiculos();
  },
  methods: {
    getVeiculos() {
      this.veiculos = JSON.parse(localStorage.getItem('veiculosPatio')) || [];
    },
  },
};
</script>

<style scoped>
.list-custom {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.card-custom {
  width: 100%;
  max-width: 300px;
  margin: 0.5rem;
  background-color: rgb(1, 193, 132);
}

.text-subtitle-1,
.text-subtitle-2,
.text-h3 {
  display: flex;
  font-family: Arial, Helvetica, sans-serif;
  justify-content: center;
}

.botaoSaida {
  background-color: rgb(193, 155, 1);
  justify-content: center;
}

.container-custom {
  width: 100% !important;
  padding: 0;
}
</style>
