<template>
  <Modal :showContent="showContent">
    <div class="modal-content">
      <span class="close" @click="closeModal">
        <img src="../../assets/icons/close.svg" alt="close-icon">
      </span>
      <form class="pin-form-content" @submit="submitPin">
        <input
          type="password"
          v-model="originalPin"
          maxlength="4"
          minlength="4"
          placeholder="originalPin"
          required
        />
        <input
          type="password"
          v-model="newPin"
          maxlength="4"
          minlength="4"
          placeholder="newPin"
          required
        />
        <input
          type="password"
          v-model="newSecondPin"
          maxlength="4"
          minlength="4"
          placeholder="newSecondPin"
          required
        />
        <button :disabled="validateSubmitPin">Enviar</button>
        <p class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
  </Modal>
</template>
<script>
import Modal from "@/components/modal/Modal.vue"
import axios from 'axios'
export default {
  name: "ModalPin",
  components: {
    Modal,
  },
  props: {
    showModal: Boolean,
  },
  data() {
    return {
      showContent: this.showModal,
      originalPin: "",
      newPin: "",
      newSecondPin: "",
      errorMessage: "",
    }
  },
  computed: {
    validateSubmitPin() {
      return (
        this.newPin.length !== 4 ||
        this.newPin !== this.newSecondPin ||
        this.errorMessage !== ""
      )
    },
  },
  watch: {
    showModal(newValue) {
      this.showContent = newValue
      return this.showContent
    },
    originalPin() {
      if (this.originalPin.length === 4) {
        return this.checkPin()
      }
    },
  },
  methods: {
    closeModal() {
      this.showContent = false
      this.$emit("close-modal", this.showContent)
    },
    async submitPin(event) {
      event.preventDefault()
      try {
        const response = await this.axios.post("http://localhost:8090/pin", {
          newPin: this.newPin,
        })

        if (response.data) {
          await this.closeModal
        } else {
          this.errorMessage = !response ? "Pin incorrecto" : ""
        }
      } catch (e) {
        this.errorMessage = `Hubo un error al entrar: ${e.message}`
      }
    },
    async checkPin() {
      try {
        const response = await axios.post("http://localhost:8090/check-pin", {
          originalPin: this.originalPin,
        })

        if (response.data) {
          // await this.$router.push("/home")
          console.log("ok")
        } else {
          this.errorMessage = !response ? "Pin incorrecto" : ""
        }
      } catch (e) {
        this.errorMessage = `Hubo un error al entrar: ${e.message}`
      }
    },
  },
}
</script>
<style>
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  height: 80%;
}

/* The Close Button */
.close:hover,
.close:focus {
  opacity: 0.5;
  cursor: pointer;
}
.pin-form-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
