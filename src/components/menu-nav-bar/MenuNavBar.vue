<template>
  <div class="sidebar">
    <div class="menu-navigation">
      <MenuNavBarLink to="/" name="Login"/>
      <MenuNavBarLink to="/home" name="Home"/>
    </div>

    <div class="menu-footer">
      <button>
        <span class="close" @click="logOut">
          <img src="../../assets/icons/exit-to-app.svg" alt="close-icon">
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import MenuNavBarLink from "@/components/menu-nav-bar/MenuNavBarLink.vue"

export default {
  name: "MenuNavBar",
  components: {
    MenuNavBarLink
  },
  methods: {
    logOut(event) {
      event.preventDefault()

      sessionStorage['token'] = null

      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.sidebar {
  background-color: var(--menu-nav-bar-bg-color);
  width: 100%;
  height: 100%;
  /* padding: 1%; ---> padding adds height somehow */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.menu-navigation {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 1%;
  padding-left: 1%;
}

.menu-footer {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-bottom: 1%;
  padding-right: 1%;
}
</style>
