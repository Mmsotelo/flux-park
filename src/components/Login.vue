<template>
  <!-- <v-app> -->
    <v-container fluid class="d-flex">
      <v-card class="w-50">
        <v-tabs v-model="tab" bg-color="black">
          <v-tab value="one">Login</v-tab>
          <v-tab value="two">Registrar</v-tab>
        </v-tabs>

        <v-card-text>
          <v-window v-model="tab">
            <v-window-item value="one">
              <v-text-field label="Login" variant="outlined" v-model="login"></v-text-field>
              <v-text-field label="Senha" variant="outlined" v-model="senha" type="password"></v-text-field>
              <v-btn @click="fazerLogin" color="black">
                Login
              </v-btn>
            </v-window-item>

            <v-window-item value="two">
              <v-text-field label="Login" variant="outlined" v-model="novoLogin"></v-text-field>
              <v-text-field label="Senha" variant="outlined" v-model="novaSenha" type="password"></v-text-field>
              <v-text-field label="Confirme a Senha" variant="outlined" v-model="confirmarSenha" type="password"></v-text-field>
              <v-btn @click="registrar" color="black">
                Registrar
              </v-btn>
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
    </v-container>
  <!-- </v-app> -->
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Login',
  setup() {
    const tab = ref(null);
    const login = ref('');
    const senha = ref('');
    const novoLogin = ref('');
    const novaSenha = ref('');
    const confirmarSenha = ref('');

    const fazerLogin = () => {
      if (this.loginExistente(this.login, this.senha)) {
        window.alert('Login bem-sucedido!');
        localStorage.setItem('usuarioLogado', JSON.stringify({ login: this.login }));
        
        this.$router.push('/home');
      } else {
        window.alert('Dados inválidos. Tente novamente.');
      }
    };

    const registrar = () => {
      if (this.novoLogin && this.novaSenha && this.novaSenha === this.confirmarSenha) {
        if (!this.loginExistente(this.novoLogin)) {
          const novoUsuario = { login: this.novoLogin, senha: this.novaSenha };
          const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];
          usuariosRegistrados.push(novoUsuario);
          localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));

          window.alert('Usuário registrado com sucesso!');
          
          this.$router.push('/home');
        } else {
          window.alert('Este login já existe. Escolha outro login.');
        }
      } else {
        window.alert('Preencha todos os campos corretamente.');
      }
    };

    const loginExistente = (login, senha) => {
      const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];

      return usuariosRegistrados.some((usuario) => usuario.login === login && usuario.senha === senha);
    };

    return {
      tab,
      login,
      senha,
      novoLogin,
      novaSenha,
      confirmarSenha,
      fazerLogin,
      registrar,
      loginExistente,
    };
  },
};
</script>

<style scoped>
.app {
  display: none;
}
</style>