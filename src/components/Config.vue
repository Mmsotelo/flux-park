<template>
  <div class="container-config">
    <div class="tabs-config">
      <ul>
        <li :class="{ 'active': tab === 'configPrecos' }" @click="changeTab('configPrecos')">Preços
        </li>
        <li :class="{ 'active': tab === 'cadastroClientes' }" @click="changeTab('cadastroClientes')">
          Clientes</li>
          <li :class="{ 'active': tab === 'veiculosRelatorios' }" @click="changeTab('veiculosMeuEstacionamento')">
            Meu Estacionamento
          </li>
        <li :class="{ 'active': tab === 'cadastroUsuarios' }" @click="changeTab('cadastroUsuarios')">Usuários
        </li>
      </ul>
    </div>

    <div class="container-precos" v-if="tab === 'configPrecos'">
      <div>
        <label class="label-tempo">Tempo (em minutos)</label>
        <input class="input-tempo" label="Tempo (minutos)" v-model="config.tempo" type="number" variant="outlined">
        <label class="label-tolerancia">Tolerância (em minutos)</label>
        <input class="input-tolerancia" label="Tolerância (minutos)" v-model="config.tolerancia" type="number"
          variant="outlined">
        <label class="label-precoMoto">Preço Moto</label>
        <input class="input-precoMoto" label="Preço Moto" v-model="config.precoMoto" @input="formatarMoeda('precoMoto')"
          variant="outlined">
        <label class="label-precoCarro">Preço Carro</label>
        <input class="input-precoCarro" label="Preço Carro" v-model="config.precoCarro"
          @input="formatarMoeda('precoCarro')" variant="outlined">
        <label class="label-precoGrande">Preço Grande</label>
        <input class="input-precoGrande" label="Preço Grande" v-model="config.precoGrande"
          @input="formatarMoeda('precoGrande')" variant="outlined">
      </div>
      <div class="salvar-preco">
        <img src="../assets/salvar.png">
        <button class="botaoSalvar-preco" @click="salvarConfiguracao" variant="outlined">Salvar</button>
      </div>
    </div>
    <div class="container-clientes" v-if="tab === 'cadastroClientes'">
      <div class="conj-cpf">
        <label class="label-cpf">CPF</label>
        <input class="input-cpf" v-model="cliente.cpf" @input="validarCPF" :error-messages="cpfError"
          variant="outlined" />
      </div>
      <div class="conj-nome">
        <label class="label-nome">Nome</label>
        <input class="input-nome" v-model="cliente.nome" />
      </div>
      <div class="conj-nascimento">
        <label class="label-nascimento">Data de Nascimento</label>
        <input class="input-nascimento" v-model="cliente.nascimento" />
      </div>
      <div class="conj-cep">
        <label class="label-cep">CEP</label>
        <input class="input-cep" v-model="cliente.cep" type="string" />
      </div>
      <div class="conj-rua">
        <label class="label-rua">Rua</label>
        <input class="input-rua" v-model="cliente.rua" type="string" />
      </div>
      <div class="conj-numero">
        <label class="label-numero">Número</label>
        <input class="input-numero" v-model="cliente.numero" />
      </div>
      <div class="conj-complemento">
        <label class="label-complemento">Complemento</label>
        <input class="input-complemento" v-model="cliente.complemento" />
      </div>
      <div class="conj-bairro">
        <label class="label-bairro">Bairro</label>
        <input class="input-bairro" v-model="cliente.bairro" />
      </div>
      <div class="conj-cidade">
        <label class="label-cidade">Cidade</label>
        <input class="input-cidade" v-model="cliente.cidade" />
      </div>
      <div class="conj-uf">
        <label class="label-uf">UF</label>
        <input class="input-uf" v-model="cliente.uf" />
      </div>
      <div class="container-botao">
        <div class="botao-salvar">
          <img src="../assets/salvar.png">
          <button class="botaoSalvar-clientes" @click="salvaClientes" variant="outlined"> Salvar </button>
        </div>
        <div class="botao-editar">
          <img src="../assets/editar.png">
          <button class="botaoEditar-clientes" @click="salvaClientes" variant="outlined"> Editar </button>
        </div>
        <div class="botao-excluir">
          <img src="../assets/excluir.png">
          <button class="botaoExcluir-clientes" @click="salvaClientes" variant="outlined"> Excluir </button>
        </div>
        <div class="botao-buscar">
          <img src="../assets/procurar.png">
          <button class="botaoBuscar-clientes" @click="salvaClientes" variant="outlined"> Buscar </button>
        </div>
      </div>
    </div>
  </div>
  <div class="container-user" v-if="tab === 'cadastroUsuarios'">
    <div class="conj-cpf-user">
      <label class="label-cpf-user">CPF</label>
      <input class="input-cpf-user" v-model="cliente.cpf" @input="validarCPF" :error-messages="cpfError"
        variant="outlined" />
    </div>
    <div class="conj-nome-user">
      <label class="label-nome-user">Nome</label>
      <input class="input-nome-user" v-model="cliente.nome" />
    </div>
    <div class="conj-nascimento-user">
      <label class="label-nascimento-user">Data de Nascimento</label>
      <input class="input-nascimento-user" v-model="cliente.nascimento" />
    </div>
    <div class="conj-cep-user">
      <label class="label-cep-user">CEP</label>
      <input class="input-cep-user" v-model="cliente.cep" type="string" />
    </div>
    <div class="conj-rua-user">
      <label class="label-rua-user">Rua</label>
      <input class="input-rua-user" v-model="cliente.rua" type="string" />
    </div>
    <div class="conj-numero-user">
      <label class="label-numero-user">Número</label>
      <input class="input-numero-user" v-model="cliente.numero" />
    </div>
    <div class="conj-complemento-user">
      <label class="label-complemento-user">Complemento</label>
      <input class="input-complemento-user" v-model="cliente.complemento" />
    </div>
    <div class="conj-bairro-user">
      <label class="label-bairro-user">Bairro</label>
      <input class="input-bairro-user" v-model="cliente.bairro" />
    </div>
    <div class="conj-cidade-user">
      <label class="label-cidade-user">Cidade</label>
      <input class="input-cidade-user" v-model="cliente.cidade" />
    </div>
    <div class="conj-uf-user">
      <label class="label-uf-user">UF</label>
      <input class="input-uf-user" v-model="cliente.uf" />
    </div>
    <div class="conj-user-login">
      <label class="label-user-login">Login</label>
      <input class="input-user-login" v-model="cliente.uf" />
    </div>
    <div class="conj-user-senha">
      <label class="label-user-senha">Senha</label>
      <input class="input-user-senha" v-model="cliente.uf" />
    </div>
    <div class="container-botao-user">
      <div class="botao-salvar-user">
        <img src="../assets/salvar.png">
        <button class="botaoSalvar-user" @click="salvaClientes" variant="outlined"> Salvar </button>
      </div>
      <div class="botao-editar-user">
        <img src="../assets/editar.png">
        <button class="botaoEditar-user" @click="salvaClientes" variant="outlined"> Editar </button>
      </div>
      <div class="botao-excluir-user">
        <img src="../assets/excluir.png">
        <button class="botaoExcluir-user" @click="salvaClientes" variant="outlined"> Excluir </button>
      </div>
      <div class="botao-buscar-user">
        <img src="../assets/procurar.png">
        <button class="botaoBuscar-user" @click="salvaClientes" variant="outlined"> Buscar </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
// import store from '@/store';

export default {
  components: {
  },
  data() {
    return {
      cpfError: '',
      tab: 'configPrecos',
      config: {
        tempo: '',
        tolerancia: '',
        precoMoto: '',
        precoCarro: '',
        precoGrande: '',
      },
      cliente: {
        cpf: '',
        nome: '',
        nascimento: '',
        cep: '',
        rua: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        uf: '',
      },
    }
  },
  methods: {
    changeTab(newTab) {
      this.tab = newTab;
    },
    async salvarConfiguracao() {
      try {
        // Lógica para salvar os dados na API
        await axios.put('http://localhost:3000/configuracoesPreco', this.config);
        // Limpar os campos após salvar os dados
        this.config = {
          tempo: '',
          tolerancia: '',
          precoMoto: '',
          precoCarro: '',
          precoGrande: '',
        };
        // Exibir mensagem de sucesso ou realizar outras ações necessárias
        console.log('Configurações de preço salvas com sucesso!');
      } catch (error) {
        console.error('Erro ao salvar as configurações de preço:', error);
        // Trate o erro de acordo com a necessidade do seu aplicativo
      }
    },

    formatarMoeda(campo) {
      // Atualiza o valor no modelo sem formatação
      this.config[campo] = this.config[campo].replace(/[^\d.,]/g, '');
    },
    converterParaNumero(valor) {
      // Converte o valor para número
      return parseFloat(valor.replace(',', '.')) || 0;
    },

    validarCPF(cpf) {
      if (typeof cpf !== 'string') {
        return false;
      }
      const cpfLimpo = cpf.replace(/[^\d]/g, ''); // Remover caracteres não numéricos
      if (cpfLimpo.length !== 11) {
        return false;
      }
      // Verificar se todos os dígitos são iguais
      if (/^(\d)\1+$/.test(cpfLimpo)) {
        return false;
      }
      let sum = 0;
      let remainder;

      for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpfLimpo[i - 1]) * (11 - i);
      }
      remainder = (sum * 10) % 11;
      if (remainder === 10 || remainder === 11) {
        remainder = 0;
      }
      if (remainder !== parseInt(cpfLimpo[9])) {
        return false;
      }
      sum = 0;
      for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpfLimpo[i - 1]) * (12 - i);
      }
      remainder = (sum * 10) % 11;
      if (remainder === 10 || remainder === 11) {
        remainder = 0;
      }
      return remainder === parseInt(cpfLimpo[10]);
    },
    salvaClientes() {
      if (!this.validarCPF(this.cliente.cpf)) {
        window.alert('CPF inválido. Por favor, verifique e tente novamente.');
        return;
      }
      const clientesRegistrados = JSON.parse(localStorage.getItem('clientes')) || [];
      clientesRegistrados.push({ ...this.cliente });
      localStorage.setItem('clientes', JSON.stringify(clientesRegistrados));
      this.cliente = {
        cpf: '',
        nome: '',
        nascimento: '',
        cep: '',
        rua: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        uf: '',
      };
      window.alert('Cliente salvo com sucesso!');
    },
    mounted() {
      this.carregarConfiguracoes();
    },
  }
};
</script>

<style scoped>
.container-config {
  display: flex;
  justify-content: center;
  width: 100%;
  height: auto;
  flex-direction: column;
}

.container-precos {
  display: flex;
  margin: 20px auto 0 auto;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 35%;
  height: auto;
}

.container-clientes {
  display: flex;
  margin: 20px auto;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  width: 75%;
  box-sizing: border-box;
  gap: 8px;
}

.container-user {
  display: flex;
  margin: 20px auto;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  width: 90%;
  height: auto;
  box-sizing: border-box;
  gap: 8px;
}

.conj-cpf,
.conj-nome,
.conj-nascimento,
.conj-cep,
.conj-rua,
.conj-numero,
.conj-complemento,
.conj-bairro,
.conj-cidade,
.conj-uf {
  display: flex;
  flex-direction: column;
}

.conj-cpf-user,
.conj-nome-user,
.conj-nascimento-user,
.conj-cep-user,
.conj-rua-user,
.conj-numero-user,
.conj-complemento-user,
.conj-bairro-user,
.conj-cidade-user,
.conj-uf-user,
.conj-user-login,
.conj-user-senha {
  display: flex;
  flex-direction: column;
}

.label-cpf,
.label-nome,
.label-nascimento,
.label-cep,
.label-rua,
.label-numero,
.label-complemento,
.label-bairro,
.label-cidade,
.label-uf {
  margin-bottom: 5px;
  margin-left: 12px;
  color: antiquewhite;

}

.label-cpf-user,
.label-nome-user,
.label-nascimento-user,
.label-cep-user,
.label-rua-user,
.label-numero-user,
.label-complemento-user,
.label-bairro-user,
.label-cidade-user,
.label-uf-user,
.label-user-login,
.label-user-senha {
  margin-bottom: 5px;
  margin-left: 12px;
  color: antiquewhite;

}

.label-tempo,
.label-tolerancia,
.label-precoMoto,
.label-precoCarro,
.label-precoGrande {
  margin-bottom: 5px;
  margin-left: 12px;
  color: antiquewhite;
}

.conj-nome,
.conj-rua,
.conj-bairro,
.conj-cidade {
  width: 50%;
  flex-grow: 2;
}

.conj-nome-user,
.conj-rua-user,
.conj-bairro-user,
.conj-cidade-user,
.conj-user-login {
  width: 50%;
  flex-grow: 2;
}

.conj-cep,
.conj-numero,
.conj-complemento,
.conj-uf {
  flex-shrink: 1;
}

.conj-cep-user,
.conj-numero-user,
.conj-complemento-user,
.conj-uf-user,
.conj-user-senha {
  flex-shrink: 1;
}

.input-cpf,
.input-nome,
.input-nascimento,
.input-cep,
.input-rua,
.input-numero,
.input-complemento,
.input-bairro,
.input-cidade,
.input-uf {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #5b5b5b;
  box-sizing: border-box;
  position: relative;
}

.input-cpf-user,
.input-nome-user,
.input-nascimento-user,
.input-cep-user,
.input-rua-user,
.input-numero-user,
.input-complemento-user,
.input-bairro-user,
.input-cidade-user,
.input-uf-user,
.input-user-login,
.input-user-senha {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #5b5b5b;
  box-sizing: border-box;
  position: relative;
}

.input-tempo,
.input-tolerancia,
.input-precoMoto,
.input-precoCarro,
.input-precoGrande {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #5b5b5b;
  box-sizing: border-box;
  position: relative;
}

.tabs-config {
  display: flex;
  justify-content: center;
}

.tabs-config ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  width: 90%;
  justify-content: center;
}

.tabs-config li {
  width: 25%;
  text-align: center;
  border-radius: 0 0 8px 8px;
}

.tabs-config ul li {
  cursor: pointer;
  padding: 4px 20px;
  background-color: #3b3a3d;
  color: rgb(251, 213, 164);
}

.tabs-config ul li.active {
  border-bottom: solid 2px rgb(254, 1, 195);
}

.tabs-config ul li:hover {
  background-color: #413e45;
}

.container-botao {
  display: flex;
  width: 100%;
}

.container-botao-user {
  display: flex;
  width: 100%;
}

.botao-salvar:hover,
.botao-salvar-user:hover {
  background-color: green;
  color: white;
}

.botao-editar:hover,
.botao-editar-user:hover {
  background-color: rgb(255, 153, 0);
  color: white;
}

.botao-excluir:hover,
.botao-excluir-user:hover {
  background-color: red;
  color: white;
}

.botao-buscar:hover,
.botao-buscar-user:hover {
  background-color: blue;
  color: white;
}

.botao-salvar img,
.botao-salvar-user img,
.botao-editar img,
.botao-editar-user img,
.botao-excluir img,
.botao-excluir-user img,
.botao-buscar img,
.botao-buscar-user img {
  width: 20px;
  height: 20px;
  z-index: 1;
}

.botao-salvar,
.botao-salvar-user,
.botao-editar,
.botao-editar-user,
.botao-excluir,
.botao-excluir-user,
.botao-buscar,
.botao-buscar-user {
  width: 25%;
  padding: 10px;
  font-size: 22px;
  font-style: bold;
  text-align: center;
  color: rgb(0, 0, 0);
  margin-top: 24px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  border-radius: 4px;
  gap: 12px;
  align-items: center;
  flex-direction: row;
  box-shadow: 0 1px 2px 0 rgb(45, 45, 45);
}

.salvar-preco img {
  width: 20px;
  height: 20px;
}

.salvar-preco {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
  gap: 10px;
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

.salvar-preco:hover {
  background-color: green;
  color: white;
}</style>
