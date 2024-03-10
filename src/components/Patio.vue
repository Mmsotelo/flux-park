<template>
  <div class="page-background">
    <div class="container-custom">
      <div>
        <ul class="tabs">
          <li :class="{ 'active': tab === 'veiculosEstacionados' }" @click="changeTab('veiculosEstacionados')">
            Estacionados
          </li>
          <li :class="{ 'active': tab === 'veiculosHistorico' }" @click="changeTab('veiculosHistorico')">
            Histórico
          </li>

          <li :class="{ 'active': tab === 'veiculosRelatorios' }" @click="changeTab('veiculosRelatorios')">
            Relatórios
          </li>
        </ul>
      </div>
      <div v-if="tab === 'veiculosEstacionados'">
        <div class="cols-12">
          <ul class="list-custom">
            <li class="card-custom" @click="mostrarPagamento(veiculo)" v-for="veiculo in veiculosEstacionados"
              :key="veiculo.id">
              <div class="card-item">
                <div class="container-modeloCor">
                  <div class="text-modelo">{{ veiculo.modeloVeiculo }}</div>
                  <div class="text-cor">{{ veiculo.corVeiculo }}</div>
                </div>
                <div class="text-placa">{{ veiculo.placaVeiculo }}</div>
                <div class="container-horarios">
                  <div class="text-hora-entrada">{{ veiculo.horarioEntrada }}</div>
                  <div class="text-tempo-decorrido">{{ veiculo.tempoDecorrido }}</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div v-if="tab === 'veiculosHistorico'">
        <div class="cols-12">
          <ul class="list-custom">
            <li class="card-custom-historico" v-for="historico in veiculosHistorico" :key="historico.id">
              <div class="card-item">
                <div class="container-modeloCor">
                  <div class="text-modelo">{{ historico.modeloVeiculo }}</div>
                  <div class="text-cor">{{ historico.corVeiculo }}</div>
                </div>
                <div class="text-placa">{{ historico.placaVeiculo }}</div>
                <div class="historico-veiculo">
                  <div class="mostrar-pagamento">
                    <span>FP{{ infosVeiculo.formaPagamento }}</span>
                  </div>
                  <div class="mostrar-tempo">
                    <span>TD {{ infosVeiculo.tempoDecorrido }}</span>
                  </div>
                  <div class="mostrar-valor">
                    <span>R$ {{ infosVeiculo.valorAPagar }}</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div v-if="tab === 'veiculosRelatorios'">
        <div class="chart-horarios">
          Grafico por Horário
        </div>
        <div class="chart-tipos">
          Gráfico por tipo

        </div>
        <div class="chart-tempo">
          Gráfico tempo por tipo

        </div>
      </div>
    </div>
  </div>

  <div class="container-valorAPagar">
    <div id="myModal" ref="modal" class="container-formaPagamento">
      <div class="icone-fechar" @click="fecharModal()">
        <img src="../assets/cancel_icon.png ">
      </div>
      <div class="modal-informacoes">
        <span class="modal-tempo">Total a pagar: R$ {{ infosVeiculo.valorAPagar }}</span>
        <span class="modal-tempo">Tempo: {{ infosVeiculo.tempoDecorrido }}</span>
        <span class="modal-placa">Placa: {{ infosVeiculo.placaVeiculo }}</span>
      </div>
      <div class="forma-pagamento">
        <div class="formaPagamento">
          <div ref="dinheiro" class="dinheiro" :class="{ 'selecionado': formaPagamentoSelecionada === 'Dinheiro' }">
            <span class="dinheiro">Dinheiro</span>
            <img src="../assets/notadedolar.png ">
          </div>
          <div ref="debito" class="debito" :class="{ 'selecionado': formaPagamentoSelecionada === 'Débito' }">
            <span class="debito">Débito</span>
            <img src="../assets/cartao.png ">
          </div>
          <div ref="credito" class="credito" :class="{ 'selecionado': formaPagamentoSelecionada === 'Crédito' }">
            <span class="credito">Crédito</span>
            <img src="../assets/cartao.png ">
          </div>
          <div ref="pix" class="pix" :class="{ 'selecionado': formaPagamentoSelecionada === 'Pix' }">
            <span class="pix">Pix</span>
            <img src="../assets/pix.png ">
          </div>
          <div ref="carteira" class="carteira" :class="{ 'selecionado': formaPagamentoSelecionada === 'Carteira' }">
            <span class="carteira">Carteira</span>
            <img src="../assets/carteira.png ">
          </div>
        </div>
        <div class="recibo">
          <input type="checkbox" id="meuCheckbox" name="meuCheckbox" value="valorDoCheckbox">
          <label for="meuCheckbox">Imprimir Recibo</label>
        </div>
        <div class="botao-pagar">
          <button class="botaoPagar" @click="handleSaida(infosVeiculo)">Efetuar Pagamento</button>
        </div>
      </div>
    </div>
  </div>
  <div id="overlay" ref="overlay"></div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Patio',
  data() {
    return {
      infosVeiculo: {
        tipoVeiculo: '',
        modeloVeiculo: '',
        corVeiculo: '',
        placaVeiculo: '',
        horarioEntrada: '',
        valorAPagar: '',
        tempoDecorrido: '',
        formaPagamento: '',
        horarioSaida: ''
      },
      formaPagamentoSelecionada: '',
      tab: 'veiculosEstacionados',
      veiculosEstacionados: [],
      veiculosHistorico: [],
      modal: null,
      overlay: null,
      span: null,
      veiculo: '',
      intervalId: '',
      intervalIdDois: ''
    };
  },
  methods: {
    changeTab(tabName) {
      this.tab = tabName;
    },
    async handleSaida(elemento) {
      const index = this.veiculosEstacionados.findIndex(veiculo => veiculo.placaVeiculo === elemento.placaVeiculo);
      console.log("?", elemento)
      if (index !== -1) {
        const veiculoRemovido = this.veiculosEstacionados.splice(index, 1)[0];
        this.infosVeiculo.placaVeiculo = veiculoRemovido.placaVeiculo; // Define a placa do veículo
        this.infosVeiculo.tempoDecorrido = veiculoRemovido.tempoDecorrido; // Define o tempo decorrido
        const result = this.funcao(veiculoRemovido.tempoDecorrido);
        console.log("teset", result)

        // Fecha o modal após o pagamento
        this.fecharModal();

        // Adiciona o veículo removido à lista de histórico
        this.veiculosHistorico.push(veiculoRemovido);

        // Salva as alterações nos dados persistentes
        // try {
        //   await axios.put(`http://localhost:3000/veiculosEstacionados/${veiculoRemovido.id}`, veiculoRemovido);
        //   await axios.post('http://localhost:3000/veiculosHistorico', veiculoRemovido);
        //   localStorage.setItem('veiculosEstacionados', JSON.stringify(this.veiculosEstacionados));
        //   localStorage.setItem('veiculosHistorico', JSON.stringify(this.veiculosHistorico));
        //   alert('Saída registrada com sucesso.');
        // } catch (error) {
        //   console.error('Erro ao registrar saída:', error);
        //   alert('Erro ao registrar saída. Por favor, tente novamente.');
        // }

        // Chama a função para registrar a saída na API
        // await this.registrarSaida(veiculoRemovido);
      }
    },
    fecharModal() {
      const modal = document.getElementById("myModal");
      const overlay = document.getElementById("overlay");
      if (modal && overlay) {
        modal.style.display = "none";
        overlay.style.display = "none";
      } else {
        console.error("Não foi possível encontrar modal, overlay ou span.");
      }
    },

    atualizarVeiculosEstacionados() {
      this.getVeiculos();
      // setInterval(async () => {
      //   try {
      //   } catch (error) {
      //     console.error('Erro ao atualizar veículos estacionados:', error);
      //   }
      // }, 3000); // A cada 3 segundos
    },
    async obterConfiguracoesPreco() {
      try {
        const response = await axios.get('/configuracoesPreco/1');
        return response.data; // Retorna os dados obtidos da API
      } catch (error) {
        console.error('Erro ao obter as configurações de preço:', error);
        // Trate o erro de acordo com a necessidade do seu aplicativo
        return null; // Ou retorne um valor padrão, como null
      }
    },
    atualizarValorAPagar() {
      const horarioAtual = new Date();
      this.veiculosEstacionados.forEach(veiculo => {
        const horarioEntradaDate = new Date(veiculo.horarioEntrada);
        const diferencaEmMilissegundos = horarioAtual - horarioEntradaDate;
        const diferencaMinutos = Math.floor(diferencaEmMilissegundos / (1000 * 60)); // Diferença em minutos
        veiculo.tempoDecorrido = diferencaMinutos; // Atualizando o tempo decorrido do veículo
        // Aqui você pode realizar o cálculo do valor a pagar com base no tempo decorrido
        veiculo.valorAPagar = this.calcularValorAPagar(veiculo);
      });
    },
    calcularValorAPagar(infosVeiculo) {
      const configuracoesPreco = this.obterConfiguracoesPreco(); // Função para obter as configurações de preço
      const tempo = configuracoesPreco.tempo;
      const tolerancia = configuracoesPreco.tolerancia;
      let valorAPagar = 0;
      const precoBase = infosVeiculo.preco; // Usando o preço base do veículo
      // Verifica progressivamente em cada intervalo de tempo
      for (let i = 1; i <= 3; i++) {
        // Verifica se o tempo decorrido está dentro do intervalo atual
        if (infosVeiculo.tempoDecorrido >= (tempo * i + tolerancia) && infosVeiculo.tempoDecorrido <= (tempo * (i + 1) + tolerancia)) {
          valorAPagar = precoBase * (i + 1);
          break; // Sai do loop quando encontrar o intervalo correto
        }
      }
      // Se valorAPagar ainda for zero, significa que o tempo excede todos os intervalos configurados
      if (valorAPagar === 0) {
        // Aqui você pode definir um valor padrão ou fazer outra ação, como exibir uma mensagem de erro
      }
    },
    tempoDecorrido(veiculo) {
      const horarioEntrada = new Date(veiculo.horarioEntrada);
      const horarioSaida = new Date(); // Supondo que horarioSaida seja o horário atual

      const diferenca = horarioSaida - horarioEntrada; // Diferença em milissegundos
      const tempoDecorrido = Math.floor(diferenca / 1000); // Convertendo para segundos

      return tempoDecorrido;
    },
    // Função para selecionar a forma de pagamento
    selecionarFormaPagamento(formaPagamento) {
      this.formaPagamentoSelecionada = formaPagamento;
    },
    // Função para obter a forma de pagamento selecionada
    obterFormaPagamento() {
      return this.formaPagamentoSelecionada;
    },
    obterHorarioSaida() {
      const horarioSaida = new Date(); // Obtém o horário atual
      const horas = String(horarioSaida.getHours()).padStart(2, '0'); // Obtém as horas com zero à esquerda se necessário
      const minutos = String(horarioSaida.getMinutes()).padStart(2, '0'); // Obtém os minutos com zero à esquerda se necessário
      const segundos = String(horarioSaida.getSeconds()).padStart(2, '0'); // Obtém os segundos com zero à esquerda se necessário
      return `${horas}:${minutos}:${segundos}`; // Retorna o horário formatado
    },
    async registrarSaida(veiculo) {
      // Defina os valores de "valorAPagar", "tempoDecorrido", "formaPagamento" e "horarioSaida"
      veiculo.valorAPagar = this.calcularValorAPagar(veiculo);
      veiculo.tempoDecorrido = this.calcularTempoDecorrido(veiculo);
      veiculo.formaPagamento = this.obterFormaPagamento();
      veiculo.horarioSaida = this.obterHorarioSaida();
      // Faça uma requisição para a API para salvar os dados do veículo
      try {
        await axios.put(`http://localhost:3000/infosVeiculo/${veiculo.id}`, veiculo);
        alert('Saída registrada com sucesso.');
      } catch (error) {
        console.error('Erro ao registrar saída:', error);
        alert('Erro ao registrar saída. Por favor, tente novamente.');
      }
    },
    async funcao(totalMinutos) {
      const config = await axios.get(`http://localhost:3000/configuracoesPreco`);
      const tempoResultanteModulo = totalMinutos % config.tempo;
      let inteiros = Math.floor(totalMinutos / config.tempo);
      if (totalMinutos < config.tempo + config.tolerancia) {
        inteiros = 1;
      } else {
        if (tempoResultanteModulo > config.tolerancia) {
          inteiros++
        }
      }
      return inteiros;
    },
    calcularTempoEstacionado(horarioEntrada) {
      if (horarioEntrada === undefined || horarioEntrada === null) {
        return '00:00:00';
      }
      const horarioAtual = new Date();
      const horarioEntradaDate = new Date();
      const horaMinutoSegundo = horarioEntrada.split(':');
      if (horaMinutoSegundo.length !== 3) {
        return '00:00:00';
      }
      horarioEntradaDate.setHours(horaMinutoSegundo[0]);
      horarioEntradaDate.setMinutes(horaMinutoSegundo[1]);
      horarioEntradaDate.setSeconds(horaMinutoSegundo[2]);

      const diferencaEmMilissegundos = horarioAtual - horarioEntradaDate;
      const diferencaSegundos = Math.floor(diferencaEmMilissegundos / 1000);
      const horas = Math.floor(diferencaSegundos / 3600);
      const minutos = Math.floor((diferencaSegundos % 3600) / 60);
      const segundos = diferencaSegundos % 60;
      const tempoFormatado = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
      console.log("tempo estacionada", tempoFormatado)
      return tempoFormatado;
    },
    async getVeiculos() {
      try {
        const responseEstacionados = await axios.get('http://localhost:3000/veiculosEstacionados');
        const responseHistorico = await axios.get('http://localhost:3000/veiculosHistorico');
        // Atribua os dados recebidos às variáveis veiculosEstacionados e veiculosHistorico
        this.veiculosEstacionados = responseEstacionados.data;
        this.veiculosHistorico = responseHistorico.data;
        // Para cada veículo estacionado, você pode calcular o tempo decorrido
        this.veiculosEstacionados.forEach(veiculo => {
          if (veiculo.horarioEntrada) {
            veiculo.tempoDecorrido = this.calcularTempoEstacionado(veiculo.horarioEntrada);
          } else {
            veiculo.tempoDecorrido = ''; // Ou outra manipulação apropriada
          }
        });
      } catch (error) {
        console.error('Erro ao obter os veículos:', error);
        // Trate o erro de acordo com a necessidade do seu aplicativo
      }
    },
    mostrarPagamento(veiculo) {
      this.infosVeiculo = veiculo;
      if (this.$refs.modal && this.$refs.overlay) {
        this.$refs.modal.style.display = "block";
        this.$refs.overlay.style.display = "block";
      } else {
        console.error("Não foi possível encontrar o modal ou overlay.");
      }
    },
  },
  mounted() {
    this.$refs.dinheiro.addEventListener('click', () => this.selecionarFormaPagamento('Dinheiro'));
    this.$refs.debito.addEventListener('click', () => this.selecionarFormaPagamento('Débito'));
    this.$refs.credito.addEventListener('click', () => this.selecionarFormaPagamento('Crédito'));
    this.$refs.pix.addEventListener('click', () => this.selecionarFormaPagamento('Pix'));
    this.$refs.carteira.addEventListener('click', () => this.selecionarFormaPagamento('Carteira'));
    this.getVeiculos();
    this.atualizarValorAPagar();
    this.atualizarVeiculosEstacionados();
    this.intervalId = setInterval(() => {
      this.atualizarValorAPagar();
    }, 60000);
    this.intervalIdDois = setInterval(() => {
      this.getVeiculos();
    }, 1000);
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
    clearInterval(this.intervalIdDois);
  },
}

</script>

<style scoped>
.page-background {
  margin: 0;
  padding: 0;
}

.list-custom {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: flex-start;
  margin-left: 12px;
  margin-top: 12px;
}

.container-formaPagamento {
  display: none;
  position: fixed;
  padding: 4px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 101;
  flex-direction: column;
  background-color: rgb(63, 63, 63);
  border-top: solid 7px rgb(56, 56, 56);
  border-left: solid 7px rgb(56, 56, 56);
  border-bottom: solid 7px rgb(30, 30, 30);
  border-right: solid 7px rgb(30, 30, 30);
  border-radius: 12px;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.812);
  width: 50%;
  height: 70%;
}

#overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.modal-informacoes {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  color: black;
  font-size: medium;
  margin: 24px 0 24px 0;
}

.modal-informacoes span {
  font-size: medium;
  font-weight: 500;
  color: antiquewhite;
}

.forma-pagamento {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 16px;
}

.formaPagamento {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  width: 80%;
  column-gap: 16px;
}

.dinheiro img,
.debito img,
.credito img,
.pix img,
.carteira img {
  padding: 5px;
}

.dinheiro,
.debito,
.credito,
.pix,
.carteira {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 14px;
  font-weight: 300;
  color: rgb(0, 0, 0);
  box-sizing: border-box;
  border-radius: 4px;
  cursor: pointer;
}

.dinheiro:hover,
.debito:hover,
.credito:hover,
.pix:hover,
.carteira:hover {
  background-color: orange;
  border-radius: 6px;
  color: black;
}

.dinheiro.selecionado,
.debito.selecionado,
.credito.selecionado,
.pix.selecionado,
.carteira.selecionado {
  background-color: rgb(3, 189, 43);
}

.formaPagamento img {
  width: 36px;
  height: 36px;
}

.forma-pagamento span {
  margin-top: 12px;
  font-size: 18px;
  font-style: italic;
  font-weight: 700;
  color: white;
  margin-bottom: 8px;
}

.formaPagamento span {
  margin-top: 6px;
  font-size: 14px;
  font-style: italic;
  font-weight: 700;
  color: white;
}

.recibo {
  display: flex;
  justify-content: center;
  margin-top: 42px;
  gap: 12px;
  width: 100%;
}

.container-modeloCor {
  display: flex;
  justify-content: space-between;
  font-weight: 600;
}

.card-custom {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  background-color: rgba(1, 193, 132, 0.441);
  border-top: solid 7px rgb(56, 56, 56);
  border-left: solid 7px rgb(56, 56, 56);
  border-bottom: solid 7px rgb(30, 30, 30);
  border-right: solid 7px rgb(30, 30, 30);
  border-radius: 12px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.6);
  z-index: 10;
  cursor: pointer;
}

.card-custom-historico {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  background-color: rgba(255, 86, 86, 0.464);
  border-top: solid 7px rgb(56, 56, 56);
  border-left: solid 7px rgb(56, 56, 56);
  border-bottom: solid 7px rgb(30, 30, 30);
  border-right: solid 7px rgb(30, 30, 30);
  border-radius: 12px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.6);
  z-index: 10;
  cursor: pointer;
}

.container-horarios {
  display: flex;
  justify-content: space-between;
  font-weight: 400;
}

.text-placa {
  display: flex;
  font-family: Arial, Helvetica, sans-serif;
  justify-content: center;
  align-items: center;
  font-size: 26pt;
  font-weight: bold;
  margin: 0;
  padding: 0;
  letter-spacing: 5px;
}

.botao-pagar {
  display: flex;
  background-color: transparent;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 36px;
  border-top: solid 2px rgb(195, 194, 194);
  border-left: solid 2px rgb(195, 194, 194);
  border-right: solid 2px rgb(63, 63, 63);
  border-bottom: solid 2px rgb(63, 63, 63);
  margin-bottom: 8px;
  margin-top: 42px;
  border-radius: 6px;
  cursor: pointer;
  padding: 12px;
  box-shadow: 0 2px 4px rgba(34, 34, 34, 0.701);
}

.botao-pagar:hover {
  background-color: #006f20;
  color: white;
}

.historico-veiculo {
  display: flex;
  width: 100%;
  gap: 10px;
}

.mostrar-pagamento,
.mostrar-valor,
.mostrar-tempo {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
}

.tabs {
  display: flex;
  justify-content: center;
  width: 90%;
  margin: 0 auto;
}

.tabs ul {
  list-style-type: none;
  padding: 0;
  display: flex;

  justify-content: center;
}

.tabs li {
  width: 33.33%;
  text-align: center;
  border-radius: 0 0 8px 8px;
  cursor: pointer;
  padding: 4px 20px;
  background-color: #3b3a3d;
  color: rgb(251, 213, 164);
}

.tabs li.active {
  border-bottom: solid 2px rgb(254, 1, 195);
}

.tabs li:hover {
  background-color: #413e45;
}

.cols-12 {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.icone-fechar {
  height: 10px;
  height: 20px;
  width: 20px;
  margin: 4px 4px 0 auto;
}
</style>
