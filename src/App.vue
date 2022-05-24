<template>
  <div class="app">
    <div style="width: 25%; height: 100%">
      <MenuNavBar/>
    </div>
    <div style="width: 75%; height: 100%">
      <router-view/>
    </div>
    <RequestErrorModal :show="showRequestErrorModal"
                       :error-message="requestErrorMessage"
                       @close="showRequestErrorModal = false"/>
  </div>
</template>
<script>
import MenuNavBar from '@/components/menu-nav-bar/MenuNavBar.vue'
import RequestErrorModal from '@/components/RequestErrorModal'

export default {
  components: {
    MenuNavBar,
    RequestErrorModal
  },
  data() {
    return {
      showRequestErrorModal: false,
      requestErrorMessage: ''
    }
  },
  mounted() {
    this.$axios.interceptors.response.use(response => response, (error) => {
      this.showRequestErrorModal = true

      this.requestErrorMessage = error.message

      return Promise.reject(error)
    })
  }
}
</script>
<style>
:root {
  --menu-nav-bar-bg-color: #2a832a;
  --menu-nav-bar-item-hover: #329a32;
  --menu-nav-bar-item-active: #1f601f;
}

html, body {
  height: 100vh;
  width: 100vw;
  margin: 0;
  overflow: hidden;
}

.error-message {
  color: red;
}
</style>

<style scoped>
.app {
  display: flex;
  height: 100%;
  width: 100%;
  overflow: auto;
}
</style>
