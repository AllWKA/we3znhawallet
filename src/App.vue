<template>
  <div class="app">
    <MenuNavBar />
    <router-view />
  </div>
</template>
<script>
import MenuNavBar from "@/components/menu-nav-bar/MenuNavBar.vue"

export default {
  components:{
    MenuNavBar
  }
}
</script>
<style>
:root{
  --menu-nav-bar-bg-color: #2a832a;
  --menu-nav-bar-item-hover: #329a32;
  --menu-nav-bar-item-active: #1f601f;
}
html, body {
  height: 100vh;
  margin: 0;
  overflow: hidden;
}

.app{
  display: flex;
  height: 100vh;
}

.error-message {
  color: red;
}
</style>
