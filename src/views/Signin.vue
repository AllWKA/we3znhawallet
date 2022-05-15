<template>
  <div class="container">
    <h1>Establece tu Pin</h1>

    <input type="text" v-model="pin" maxlength="4" minlength="4" placeholder="pin" required>

    <p class="error-message">{{ errorMessage }}</p>
    <br>

    <button @click="signin">Establecer</button>

    <p style="text-align: center">
      Solo se admiten números
      <br>
      Debe tener una longitud de 4 dígitos
    </p>
  </div>
</template>

<script>
export default {
  name: "Signin",
  data() {
    return {
      pin: '',
      errorMessage: ''
    }
  },
  methods: {
    async signin(event) {
      event.preventDefault()

      if (isNaN(this.pin) || (this.pin.length !== 0 && this.pin.length < 4)) {
        return
      }

      try {
        await this.$axios.post('/signin', { pin: this.pin })

        await this.$router.push('/')
      } catch (e) {
        this.errorMessage = `Hubo un error al registrar el Pin: ${e.message}`
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
  }
}
</script>

<style scoped>

.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 1%;
  width: 100%;
}

</style>
