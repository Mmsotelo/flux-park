<template>
  <v-container fluid class="container-custom">
    <v-combobox label="Tipo" :items="['Moto', 'Carro', 'Grande']" v-model="infosVeiculo.tipoVeiculo" variant="underlined"
      class="custom-combobox"></v-combobox>
    <v-combobox label="Modelo" :items="['Fusca', 'Civic', 'Siena']" v-model="infosVeiculo.modeloVeiculo"
      variant="underlined" class="custom-combobox"></v-combobox>
    <v-combobox label="Cor" :items="['Branco', 'Cinza', 'Prata', 'Preto']" v-model="infosVeiculo.corVeiculo"
      variant="underlined" class="custom-combobox"></v-combobox>
    <v-text-field label="Placa" v-model="infosVeiculo.placaVeiculo" variant="underlined"
      class="custom-combobox"></v-text-field>

    <p id="relogio" class="customRelogio">{{ infosVeiculo.horarioEntrada }}</p>

    <v-btn class="botaoEntrada" @click="salvar" label="horarioEntrada" block>
      Confirmar Entrada
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'Home',

  data() {
    return {
      infosVeiculo: {
        tipoVeiculo: '',
        modeloVeiculo: '',
        corVeiculo: '',
        placaVeiculo: '',
        horarioEntrada: '',
      },
    }
  },
  methods: {
    obterHorarioEntrada() {
      let dataAtual = new Date();
      let hora = dataAtual.getHours();
      let minutos = dataAtual.getMinutes();
      let segundos = dataAtual.getSeconds();
      hora = (hora < 10) ? '0' + hora : hora;
      minutos = (minutos < 10) ? '0' + minutos : minutos;
      segundos = (segundos < 10) ? '0' + segundos : segundos;
      return `${hora}:${minutos}:${segundos}`;
    },
    salvar() {
      if (this.validarEntrada()) {
        let veiculosPatio = JSON.parse(localStorage.getItem('veiculosPatio')) || [];
        veiculosPatio.push({ ...this.infosVeiculo, horarioEntrada: this.horarioEntrada });
        localStorage.setItem('veiculosPatio', JSON.stringify(veiculosPatio));
      } else {
        console.log('Preencha todos os campos corretamente.');
      }
    },
    validarEntrada() {
      return (
        this.infosVeiculo.tipoVeiculo &&
        this.infosVeiculo.modeloVeiculo &&
        this.infosVeiculo.corVeiculo &&
        this.infosVeiculo.placaVeiculo &&
        this.infosVeiculo.horarioEntrada
      );
    },
  },
  mounted() {
    setInterval(() => {
      this.infosVeiculo.horarioEntrada = this.obterHorarioEntrada();
    }, 1000);
  },
};
</script>

<style scoped>
.container-custom {
  width: 100% !important;
  padding: 2rem 0;
}

.boxCustom {
  background-color: rgb(230, 253, 253);
  margin-top: 4px;
  margin-bottom: 10px;
  font-size: bold 20pt;
  width: 100%;
}

.custom-combobox .v-select__slot {
  margin-left: 5px;
}

.botaoEntrada {
  display: flex;
  background-color: rgb(251, 237, 224);
  border-color: black;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-top: 5px;
  margin-bottom: 5px;
}

.customRelogio {
  background-color: black;
  color: rgb(230, 253, 253);
  text-align: center;
  gap: 15px;
}
</style>
