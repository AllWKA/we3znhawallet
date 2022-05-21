<template>
  <div class="link" @click="navigate" :class="{ active: isActive }">
    <span style="margin-left: 5%">{{ name }}</span>
  </div>
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
  methods: {
    navigate() {
      this.$router.push(this.to)
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

<style scoped>
.link {
  display: flex;
  align-items: center;
  color: black;
  cursor: pointer;
  border-radius: 0.25em;
  height: 35px;
  width: 99%;
}

.link:hover {
  background-color: var(--menu-nav-bar-item-hover);
}

.link.active {
  background-color: var(--menu-nav-bar-item-active);
}
</style>
