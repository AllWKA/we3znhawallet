<template>
  <div class="login-container">
    <h1>We3znha Wallet</h1>

    <form class="login-form" @submit="submitLogin">
      <input type="password"
             v-model="pin"
             maxlength="4"
             minlength="4"
             placeholder="pin"
             required
             style="border: 0"
      >

      <button :disabled="pin.length !== 4" class="login-button">Entrar</button>

      <p class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      pin: '',
      errorMessage: ''
    }
  },
  methods: {
    async submitLogin(event) {
      event.preventDefault()

      if (isNaN(this.pin) || (this.pin.length !== 0 && this.pin.length < 4)) {
        return
      }

      try {
        const response = await this.$axios.post('/login', {pin: this.pin})

        if (response.data) {
          sessionStorage['token'] = response.data
          await this.$router.push('/home')
        } else {
          this.errorMessage = !response ? 'Pin incorrecto' : ''
        }
      } catch (e) {
        this.errorMessage = `Hubo un error al entrar: ${e.message}`
      }
    },
    async checkIfIsSignedIn() {
      try {
        const isSignedIn = await this.$axios.get('/isSignedIn')

        if (!isSignedIn.data) {
          await this.$router.push('/signin')
        }
      } catch (e) {
        console.log(e)
      }
    }
  },
  watch: {
    pin() {
      if (isNaN(this.pin)) {
        this.errorMessage = 'Solo se aceptan números'
        return
      }

      if (this.pin.length !== 0 && this.pin.length < 4) {
        this.errorMessage = 'El pin tiene que tener 4 dígitos'
        return
      }

      this.errorMessage = ''
    }
  },
  beforeMount() {
    this.checkIfIsSignedIn()
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  background-color: var(--color-background);
  color: var(--color-on-background);
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
  color: var(--color-error-message);
}

.login-button {
  background-color: var(--color-surface);
  color: var(--color-on-surface);
  margin-top: 3%;
}
</style>
