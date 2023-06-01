<template>
  <div class="sidebar">
    <div class="menu-navigation">
      <MenuNavBarLink to="/home" icon="bank-outline" :tooltip-text="'Cuentas'"/>

      <MenuNavBarLink to="/test" icon="tools" :tooltip-text="'Vista para pruebas'"/>
    </div>

    <div class="menu-footer">
      <button class="logout-button">
        <span class="close" @click="logOut">
          <img src="../../assets/icons/exit-to-app.svg" alt="close-icon">
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import MenuNavBarLink from '../menu-nav-bar/MenuNavBarLink.vue'

export default {
  name: 'MenuNavBar',
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
  border-right: 1px solid black;
  height: 100%;
  width: 100%;
  padding-left: 1%;
  padding-right: 1%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-surface);
  color: var(--color-on-surface);
}

.menu-navigation {
  display: flex;
  flex-direction: column;
  padding-top: 20%;
  padding-left: 1%;
  height: 70%;
}

.menu-footer {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-bottom: 1%;
  padding-right: 1%;
}

.logout-button {
  margin-right: 2%;
  border: none;
  background-color: var(--color-surface);
}
</style>
