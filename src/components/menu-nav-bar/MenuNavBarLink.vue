<template>
  <router-link class="link" :to="to" :class="{ active: isActive }">
    <div>{{ name }}</div>
  </router-link>
</template>

<script>
export default {
  name: "MenuNavBarLink",
  props: {
    to: String,
    name: String,
  },
  data() {
    return {
      isActive: false,
    }
  },
  watch: {
    '$route': {
      deep: true,
      immediate: true,
      handler(newValue) {
        this.isActive = newValue.path === this.to
      },
    },
  },
}
</script>

<style>
.link {
  color: black;
  cursor: pointer;
  margin: 0.1em 0;
  padding: 0.4em;
  border-radius: 0.25em;
  height: 1.5em;
  text-decoration: none;
}
.link:hover {
  background-color: var(--menu-nav-bar-item-hover);
}
.link:active {
  background-color: var(--menu-nav-bar-item-active);
}
.link.active {
  background-color: var(--menu-nav-bar-item-active);
}
</style>
