<template>
  <Modal :show="show">
    <div class="main-container">
      <div class="title-container">
        <h2>Hubo un error en una petición</h2>
      </div>

      <div class="message-container">
        {{ errorMessage }}
      </div>

      <div class="button-container">
        <button @click="$emit('close')">Cerrar</button>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from '@/components/modal/Modal'

export default {
  name: "RequestErrorModal",
  components: {
    Modal
  },
  props: {
    errorMessage: String,
    show: Boolean
  }
}
</script>

<style scoped>
.main-container {
  background-color: white;
  height: 30%;
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.title-container {
  width: 100%;
  text-align: center;
}

.message-container {
  width: 95%;
  height: 100%;
  text-align: center;
  overflow: auto;
}

.button-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3%;
}
</style>
