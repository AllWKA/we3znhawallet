<template>
  <div class="modal-container" v-if="show">
    <div class="modal-background-container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    showContent: Boolean,
  },
  data() {
    return {
      show: this.showContent,
    }
  },
  watch: {
    showContent(newValue) {
      this.show = newValue
      return this.show
    },
  },
}
</script>

<style scoped>
.modal-container {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
}

.modal-background-container {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.64);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  height: 80%;
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
