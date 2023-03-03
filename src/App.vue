<template>
  <div class="app background-color on-background">
    <div style="height: 100%;width: 80px" v-if="showLeftMenu">
      <MenuNavBar/>
    </div>

    <div style="width: 95%; height: 100%">
      <router-view/>
    </div>

    <RequestErrorModal
        :show="showRequestErrorModal"
        :error-message="requestErrorMessage"
        @close="showRequestErrorModal = false"
    />
  </div>
</template>
<script>
import MenuNavBar from './components/menu-nav-bar/MenuNavBar.vue'
import RequestErrorModal from './components/modal/RequestErrorModal'

export default {
  components: {
    MenuNavBar,
    RequestErrorModal,
  },
  data() {
    return {
      showRequestErrorModal: false,
      requestErrorMessage: '',
    }
  },
  mounted() {
    this.$axios.interceptors.response.use(
        (response) => response,
        (error) => {
          this.showRequestErrorModal = true

          this.requestErrorMessage = error.message

          return Promise.reject(error)
        }
    )
  },
  computed: {
    showLeftMenu() {
      return this.$route.path !== '/' && this.$route.path !== '/signin'
    }
  }
}
</script>
<style>
html,
body {
  height: 100vh;
  width: 100vw;
  margin: 0;
  overflow: hidden;
}

:root {
  --color-error-message: #f86060;
  --color-background: #121212;
  --color-surface: #332F2E;
  --color-on-background: #adc1c2;
  --color-on-surface: #adc1c2;
}

::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: var(--color-on-surface)
}

input {
  background-color: var(--color-surface);
  color: var(--color-on-surface)
}

input:focus {
  outline: none;
}

button {
  border: none;
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
