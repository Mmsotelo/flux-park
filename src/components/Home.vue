<template>
  <div class="home-container">
    <div class="comb-tipo">
      <label for="tipo" class="label-tipo">Tipo</label>
      <div class="custom-select">
        <select id="tipo" name="tipo" v-model="infosVeiculo.tipoVeiculo">
          <option class="options-tipo" value="Moto">Moto</option>
          <option class="options-tipo" value="Carro">Carro</option>
          <option class="options-tipo" value="Grande">Grande</option>
        </select>
      </div>
    </div>
    <div class="comb-modelo">
      <label for="modelo" class="label-modelo">Modelo</label>
      <div class="custom-input">
        <input type="text" v-model="infosVeiculo.modeloVeiculo" @input="filterModelos"
          @keydown.down.prevent="nextModeloOption" @keydown.up.prevent="prevModeloOption"
          @keydown.enter.prevent="selectCurrentModelo" @keydown.esc.prevent="isModeloDropdownOpen = false" placeholder="Digite para buscar" class="input-modelo">
        <ul v-if="isModeloDropdownOpen && modelosFiltrados.length" class="filter-modelo">
          <li v-for="(modelo, index) in modelosFiltrados" :key="index" @click="selectModelo(modelo)" class="select-modelo">{{ modelo.nome }}</li>
        </ul>
      </div>
    </div>

    <div class="comb-cor">
      <label for="cor" class="label-cor">Cor</label>
      <div class="custom-input">
        <input type="text" v-model="infosVeiculo.corVeiculo" @input="filterCores"
          @keydown.down.prevent="nextCorOption" @keydown.up.prevent="prevCorOption"
          @keydown.enter.prevent="selectCurrentCor" @keydown.esc.prevent="isCorDropdownOpen = false" placeholder="Digite para buscar" class="input-cor">
        <ul v-if="isCorDropdownOpen && coresFiltradas.length" class="filter-cor">
          <li v-for="(cor, index) in coresFiltradas" :key="index" @click="selectCor(cor)" class="select-cor">{{ cor.nome }}</li>
        </ul>
      </div>
    </div>

    <div class="input-placa">
      <label for="placa" class="label-placa">Placa</label>
      <input type="text" v-model="infosVeiculo.placaVeiculo" @input="formatPlaca" class="model-placa">
    </div>
    <div class="relogio">
      <Relogio />
    </div>
    <div class="container-button-entrada">
      <img src="../assets/dentro.png">
      <button @click="salvar" class="button-entrada">Confirmar Entrada</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Relogio from './Relogio.vue';

export default {
  name: 'Home',
  data() {
    return {
      isModeloDropdownOpen: false,
      isCorDropdownOpen: false,
      modelosFiltrados: [],
      coresFiltradas: [],
      infosVeiculo: {
        tipoVeiculo: '',
        modeloVeiculo: '',
        corVeiculo: '',
        placaVeiculo: '',
        horarioEntrada: '',
        valorAPagar: "",
        tempoDecorrido: "",
        formaPagamento: "",
        horarioSaida: ""
      }
    };
  },
  computed: {
    tiposVeiculo() {
      return ['Moto', 'Carro', 'Grande'];
    }
  },
  async mounted() {
    try {
      const modelosResponse = await this.fetchModelos();
      this.modelos = modelosResponse.map(modelo => ({ id: modelo.id, nome: modelo.nome }));
      console.log('Modelos obtidos:', this.modelos);
    } catch (error) {
      console.error('Erro ao obter modelos:', error);
    }

    try {
      const coresResponse = await this.fetchCores();
      this.cores = coresResponse.map(cor => ({ id: cor.id, nome: cor.nome }));
      console.log('Cores obtidas:', this.cores);
    } catch (error) {
      console.error('Erro ao obter cores:', error);
    }

    this.atualizarRelogio();
    setInterval(async () => {
      await this.atualizarRelogio();
    }, 1000);
  },
  methods: {
    async fetchModelos() {
      try {
        const response = await axios.get('http://localhost:3000/modelos');
        return response.data;
      } catch (error) {
        console.error('Erro ao obter modelos:', error);
        return [];
      }
    },
    async fetchCores() {
      try {
        const response = await axios.get('http://localhost:3000/cores');
        return response.data;
      } catch (error) {
        console.error('Erro ao obter cores:', error);
        return [];
      }
    },
    async salvar() {
      if (this.validarEntrada()) {
        const veiculo = {
          tipoVeiculo: this.infosVeiculo.tipoVeiculo,
          modeloVeiculo: this.infosVeiculo.modeloVeiculo,
          corVeiculo: this.infosVeiculo.corVeiculo,
          placaVeiculo: this.infosVeiculo.placaVeiculo,
          horarioEntrada: this.obterHorarioEntrada()
        };

        try {
          const response1 = await fetch('http://localhost:3000/veiculosEstacionados', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(veiculo)
          });

          if (!response1.ok) {
            throw new Error('Erro ao adicionar o veículo.');
          }

          const response2 = await fetch('http://localhost:3000/infosVeiculo', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(veiculo)
          });

          if (!response2.ok) {
            throw new Error('Erro ao adicionar o veículo.');
          }

          this.infosVeiculo = {
            tipoVeiculo: '',
            modeloVeiculo: '',
            corVeiculo: '',
            placaVeiculo: '',
            horarioEntrada: '',
            valorAPagar: "",
            tempoDecorrido: "",
            formaPagamento: "",
            horarioSaida: ""
          };

          alert('Veículo adicionado com sucesso!');
        } catch (error) {
          console.error('Erro ao adicionar o veículo:', error);
          alert('Erro ao adicionar o veículo. Por favor, tente novamente mais tarde.');
        }
      }
    },
    async atualizarRelogio() {
      const now = new Date();
      const hora = String(now.getHours()).padStart(2, '0');
      const minutos = String(now.getMinutes()).padStart(2, '0');
      const segundos = String(now.getSeconds()).padStart(2, '0');
      this.horario = `${hora}:${minutos}:${segundos}`;
    },
    formatPlaca() {
      let placa = this.infosVeiculo.placaVeiculo.toUpperCase();
      placa = placa.replace(/[^a-zA-Z0-9]/g, '');
      this.infosVeiculo.placaVeiculo = placa.substring(0, 7);
    },
    async filterModelos() {
      if (!this.infosVeiculo.modeloVeiculo) {
        this.modelosFiltrados = [];
        return;
      }

      this.modelosFiltrados = this.modelos.filter(modelo =>
        modelo.nome.toLowerCase().includes(this.infosVeiculo.modeloVeiculo.toLowerCase())
      );
      this.isModeloDropdownOpen = true;
    },
    async filterCores() {
      if (!this.infosVeiculo.corVeiculo) {
        this.coresFiltradas = [];
        return;
      }

      this.coresFiltradas = this.cores.filter(cor =>
        cor.nome.toLowerCase().includes(this.infosVeiculo.corVeiculo.toLowerCase())
      );
      this.isCorDropdownOpen = true;
    },
    selectModelo(modelo) {
      this.infosVeiculo.modeloVeiculo = modelo.nome;
      this.isModeloDropdownOpen = false;
    },
    selectCor(cor) {
      this.infosVeiculo.corVeiculo = cor.nome;
      this.isCorDropdownOpen = false;
    },
    nextModeloOption() {
      const currentIndex = this.modelosFiltrados.findIndex(modelo =>
        modelo.nome.toLowerCase() === this.infosVeiculo.modeloVeiculo.toLowerCase()
      );
      if (currentIndex < this.modelosFiltrados.length - 1) {
        this.infosVeiculo.modeloVeiculo = this.modelosFiltrados[currentIndex + 1].nome;
      }
    },
    prevModeloOption() {
      const currentIndex = this.modelosFiltrados.findIndex(modelo =>
        modelo.nome.toLowerCase() === this.infosVeiculo.modeloVeiculo.toLowerCase()
      );
      if (currentIndex > 0) {
        this.infosVeiculo.modeloVeiculo = this.modelosFiltrados[currentIndex - 1].nome;
      }
    },
    selectCurrentModelo() {
      if (this.modelosFiltrados.length === 1) {
        this.infosVeiculo.modeloVeiculo = this.modelosFiltrados[0].nome;
      }
      this.isModeloDropdownOpen = false;
    },
    nextCorOption() {
      const currentIndex = this.coresFiltradas.findIndex(cor =>
        cor.nome.toLowerCase() === this.infosVeiculo.corVeiculo.toLowerCase()
      );
      if (currentIndex < this.coresFiltradas.length - 1) {
        this.infosVeiculo.corVeiculo = this.coresFiltradas[currentIndex + 1].nome;
      }
    },
    prevCorOption() {
      const currentIndex = this.coresFiltradas.findIndex(cor =>
        cor.nome.toLowerCase() === this.infosVeiculo.corVeiculo.toLowerCase()
      );
      if (currentIndex > 0) {
        this.infosVeiculo.corVeiculo = this.coresFiltradas[currentIndex - 1].nome;
      }
    },
    selectCurrentCor() {
      if (this.coresFiltradas.length === 1) {
        this.infosVeiculo.corVeiculo = this.coresFiltradas[0].nome;
      }
      this.isCorDropdownOpen = false;
    },
    validarEntrada() {
      if (!this.infosVeiculo.tipoVeiculo || !this.infosVeiculo.modeloVeiculo || !this.infosVeiculo.corVeiculo || !this.infosVeiculo.placaVeiculo) {
        alert('Por favor, preencha todos os campos.');
        return false;
      }
      return true;
    },
    obterHorarioEntrada() {
      const now = new Date();
      const hora = String(now.getHours()).padStart(2, '0');
      const minutos = String(now.getMinutes()).padStart(2, '0');
      return `${hora}:${minutos}`;
    }
  },
  components: {
    Relogio
  }
};
</script>

<style scoped>
.home-container {
  display: flex;
  width: 50%;
  margin: 0 auto;
  flex-direction: column;
  background-color: rgb(63, 63, 63);
}

.comb-tipo {
  margin-bottom: 20px;
}

.custom-select select {
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #5b5b5b;
  appearance: none;
}

.comb-modelo,
.comb-cor,
.input-placa {
  margin-bottom: 20px;
}

.label-tipo {
  margin-top: 12px;
}

.label-tipo,
.label-modelo,
.label-cor,
.label-placa {
  display: block;
  margin-bottom: 5px;
  margin-left: 12px;
  color: antiquewhite;
}

.custom-input {
  position: relative;
}

.model-placa {
  display: block;
  width: 100%;
  padding: 8px;
  font-size: 18px;
  font-weight: 400;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #5b5b5b;
  box-sizing: border-box;
  text-align: center;
}

.custom-input input {
  display: block;
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #5b5b5b;
  box-sizing: border-box;
}

.custom-input input:focus {
  outline: none;
  border-color: rgb(215, 221, 247);
}

.filter-modelo,
.filter-cor {
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 16px;
  width: 50%;
  background-color: #888888;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 6px 6px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.filter-modelo li,
.filter-cor li {
  padding: 10px;
  cursor: pointer;
}

.filter-modelo li:hover,
.filter-cor li:hover {
  background-color: rgb(215, 221, 247);
}

.container-button-entrada {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-direction: row;
}

.container-button-entrada img {
  width: 20px;
  height: 20px;

}

.container-button-entrada {

  width: 100%;
  padding: 10px;
  font-size: 22px;
  font-style: bold;
  border-radius: 5px;
  border-top: 1px solid white;
  border-left: 1px solid white;
  border-right: 1px solid rgb(49, 49, 49);
  border-bottom: 1px solid rgb(49, 49, 49);
  text-align: center;
  color: rgb(0, 0, 0);
  box-shadow: 0 1px 2px 0 rgb(45, 45, 45);
}

.container-button-entrada:hover:hover {
  background-color: #006f20;
  color: white;
}

.relogio {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #303030;
  color: rgb(254, 1, 195);
  font-size: 18pt;
  padding: 6px;
  margin-bottom: 12px;
  border-radius: 5px;
  border: 1px solid #888888;
}</style>
