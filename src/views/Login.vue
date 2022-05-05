<template>
  <div class="main-container">
    <h1>We3znha Wallet</h1>
    <form class="login-form" @submit="submitLogin">
      <input type="password" v-model="pin" maxlength="4" minlength="4">
      <button>Entrar</button>
      <p class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "Login",
  data() {
    return {
      pin: '',
      errorMessage: ''
    }
  },
  methods: {
    async submitLogin(event) {
      event.preventDefault()

      try {
        const response = await axios.post('http://localhost:8090/login', {pin: this.pin})

        if (response.data) {
          await this.$router.push('/home')
        } else {
          this.errorMessage = !response ? 'Pin incorrecto' : ''
        }
      } catch (e) {
        this.errorMessage = `Hubo un error al entrar: ${e.message}`
      }
    }
  }
}
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  justify-content: flex-start;
  align-items: center;
}

.login-form {
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: flex-end;
  margin-top: 5%;
}

.error-message {
  color: red;
}
</style>
