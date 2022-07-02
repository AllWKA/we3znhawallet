<template>
  <div @click="navigate" class="tooltip">
    <span>
      <img :src="iconPath" :alt="`${icon}-icon`">
    </span>
    <span class="tooltiptext">{{tooltipText}}</span>
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
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
  color: white;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
