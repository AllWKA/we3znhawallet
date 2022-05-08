<template>
  <div class="modal-container" v-if="show">
    <div class="modal-content-container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    show: Boolean
  }
}
</script>

<style scoped>

.modal-container {
  position: fixed;
  color: red;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
}

.modal-content-container {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.64);
}
</style>
