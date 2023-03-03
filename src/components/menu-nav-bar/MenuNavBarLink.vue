<template>
  <div @click="navigate" class="container on-surface">
    <span style="display: flex; justify-content: center; align-items: center">
      <img :src="iconPath" :alt="`${icon}-icon`" style="width: 24px; height: 24px">
    </span>
    <!-- TODO: show it -->
    <span style="width: 100%; text-align: center">{{ tooltipText }}</span>
  </div>
</template>

<script>
import resolveIconPath from '../../helpers/icon-resolver'

export default {
  name: "MenuNavBarLink",
  props: {
    to: String,
    icon: String,
    tooltipText: String
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
  justify-content: center;
  align-items: center;
  text-wrap: none;
  margin-bottom: 20px;
}
</style>
