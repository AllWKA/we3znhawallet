<template>
  <div>
    <button @click="openModal">
      {{ showContent }}
      open confirm changes modal
    </button>
    <ModalConfirmChanges 
    :showModal="showContent" 
    @close-modal="closeModal"
    :caption="'test caption'"
    :message="'test message'" />
  </div>
</template>

<script>
import ModalConfirmChanges from "@/components/modal/ModalConfirmChanges.vue"

export default {
  name: "Test",
  components: {
    ModalConfirmChanges,
  },
  data() {
    return {
      showContent: false,
    }
  },
  methods: {
    openModal() {
      this.showContent = true
    },
    closeModal() {
      this.showContent = false
    },
  },
}
</script>

<style></style>
