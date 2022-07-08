<template>
  <div>
    <button @click="showConfirmChanges = true">
      {{ showConfirmChanges }}
      open confirm changes modal
    </button>
    <ModalConfirmChanges 
    :showModal="showConfirmChanges" 
    @close-modal="showConfirmChanges = false"
    :caption="'test caption'"
    :message="'test message'" />
    <button @click="showPin = true">
      {{ showPin }}
      open pin modal
    </button>
    <ModalPin 
    :showModal="showPin" 
    @close-modal="showPin = false" />
  </div>
</template>

<script>
import ModalConfirmChanges from "@/components/modal/ModalConfirmChanges.vue"
import ModalPin from "@/components/modal/ModalPin.vue"

export default {
  name: "Test",
  components: {
    ModalConfirmChanges,
    ModalPin,
  },
  data() {
    return {
      showConfirmChanges: false,
      showPin: false
    }
  },
}
</script>

<style></style>
