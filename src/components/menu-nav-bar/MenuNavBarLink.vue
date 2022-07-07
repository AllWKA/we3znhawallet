<template>
  <div @click="navigate" class="container">
    <span>
      <img :src="iconPath" :alt="`${icon}-icon`">
    </span>
    <span>{{ subText }}</span>
  </div>
</template>

<script>
import resolveIconPath from '../../helpers/icon-resolver'

export default {
  name: "MenuNavBarLink",
  props: {
    to: String,
    icon: String,
    subText: String
  },
  data() {
    return {
      isActive: false,
    }
  },
  methods: {
    navigate() {
      if (!this.to) {
        return
      }

      this.$router.push(this.to)
    }
  },
  watch: {
    '$route': {
      deep: true,
      immediate: true,
      handler(newValue) {
        if (!this.to) {
          return
        }

        this.isActive = newValue.path === this.to
      }
    }
  },
  computed: {
    iconPath() {
      return resolveIconPath(this.icon)
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  color: black;
  justify-content: center;
  align-items: center;
  text-wrap: none;
}
</style>
