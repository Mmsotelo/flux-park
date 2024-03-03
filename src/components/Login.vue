<template>
  <div class="container-login">
    <div class="container-modal">
      <div class="container-conect">
        <h1>Bem-vindo ao FluxPark!</h1>
        <img class="botao-welcome" src="../assets/conect.png" @click="startApp">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    startApp() {
      this.$emit('start-app');
    }
  }
}

</script>

<style scoped>
.container-login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-image: url("../assets/saopaulo.jpg");
  opacity: 70%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.container-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 60%;
  border-top: solid 2px rgb(255, 255, 255);
  border-left: solid 2px rgb(255,255,255);
  border-bottom: solid 2px rgb(41, 41, 41);
  border-right: solid 2px rgb(41, 41, 41);
  border-radius: 8px;
  backdrop-filter: blur(30);
  background-color:rgba( 255,255,255,0.3);
  box-shadow: 0 5px 7px 0 rgb(51, 51, 51);
}

.container-conect h1 {
  font-size: 24pt;
  font-weight: bold;
  padding: 16px;
}

.container-conect img {
  width: 100px;
  height: 100px;
border-radius: 26px;
margin-top: 16px;
box-shadow: 0 7px 10px 0 rgb(51, 51, 51);

}

.container-conect {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
 
  }

.botao-welcome {
  width: 100px;
  height: 32px;
  background-color: rgb(0, 255, 72);
  cursor: pointer;
}</style>

