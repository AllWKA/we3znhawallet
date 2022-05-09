<template>
  <div class="sidebar">
    <MenuNavBarLink to="/" name="Login" />
    <MenuNavBarLink to="/home" name="Home" />
  </div>
</template>

<script>
import MenuNavBarLink from "@/components/menu-nav-bar/MenuNavBarLink.vue"

export default {
  name: "MenuNavBar",
  components: {
    MenuNavBarLink,
  },
}
</script>

<style>
.sidebar {
  background-color: var(--menu-nav-bar-bg-color);
  width: 25%;
  height: 100%;
  overflow: hidden;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}
</style>
