// store.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    veiculosEstacionados: [], // Inicializado como um array vazio
  },
  mutations: {
    // Esta mutação pode ser removida, pois os modelos e cores agora são gerenciados pelo JSON Server
    // Você também pode remover a lógica relacionada a modelos e cores nas mutações alterarModelo e alterarCor
    inicializarStore(state) {
      state.inicializada = true;
    },
    // Mutação para adicionar um veículo estacionado
    adicionarVeiculoEstacionado(state, veiculo) {
      state.veiculosEstacionados.push(veiculo);
    },
  },
  actions: {
    async inicializarStore({ commit }) {
      try {
        commit('inicializarStore');
      } catch (error) {
        console.error('Erro ao inicializar a store:', error);
        throw error;
      }
    },
    // Ação para adicionar um veículo estacionado
    async adicionarVeiculoEstacionado({ commit }, veiculo) {
      try {
        commit('adicionarVeiculoEstacionado', veiculo);
      } catch (error) {
        console.error('Erro ao adicionar veículo estacionado:', error);
        throw error;
      }
    },
    // As outras ações relacionadas a modelos e cores podem ser removidas
  },
  getters: {
    inicializada: state => state.inicializada,
    veiculosEstacionados: state => state.veiculosEstacionados || [],
    // Os getters para modelos e cores podem ser removidos, pois esses dados agora são obtidos do JSON Server
  },
});
