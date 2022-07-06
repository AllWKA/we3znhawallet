<template>
  <Modal :showContent="showContent">
    <div class="modal-content">
      <span class="close" @click="closeModal">
        <img src="../../assets/icons/close.svg" alt="close-icon" />
      </span>
      <h3>{{ caption }}</h3>
      <p>{{ message }}</p>
      <div class="group-buttons">
        <button>Aceptar</button>
        <button @click="closeModal">Cancelar</button>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue"

export default {
  name: "ModalConfirmChanges",
  components: {
    Modal,
  },
  props: {
    showModal: Boolean,
    caption: String,
    message: String,
  },
  data() {
    return {
      showContent: this.showModal,
    }
  },
  watch: {
    showModal(newValue) {
      this.showContent = newValue
      return this.showContent
    },
  },
  methods: {
    closeModal() {
      this.showContent = false
      this.$emit("close-modal", this.showContent)
    },
  },
}
</script>

<style scoped>
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
.group-buttons {
  display: flex;
  justify-content: center;
}
</style>
