<template>
  <div class="app">
    <div style="width: 25%; height: 100%" v-if="showLeftMenu">
      <MenuNavBar/>
    </div>
    <div style="width: 75%; height: 100%">
      <router-view/>
    </div>
  </div>
</template>
<script>
import MenuNavBar from "@/components/menu-nav-bar/MenuNavBar.vue"

export default {
  components: {
    MenuNavBar
  },
  computed:{
    showLeftMenu(){
      return this.$route.name !== 'Login' && this.$route.name !== 'Signin'
    }
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
