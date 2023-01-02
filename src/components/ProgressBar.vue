<template>
  <div style="display: flex; width: 100%">
    <div :style="`text-align:center;background-color: ${progressColor};width:${progressPercentage}%`">
      {{ progressPercentage }}% - {{ progress }}€
    </div>

    <div :style="`text-align:center;background-color: ${totalColor};width:${totalPercentageLeft}%; min-width: 30%`">
      {{ totalPercentageLeft }}% - {{ total }}€
    </div>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",
  props: {
    progressColor: String,
    totalColor: String,
    progress: Number,
    total: Number
  },
  data() {
    return {
      progressPercentage: 0,
      totalPercentageLeft: 0
    }
  },
  beforeMount() {
    this.progressPercentage = this.progress * 100 / this.total

    this.totalPercentageLeft = 100 - this.progressPercentage
  }
}
</script>

<style scoped>
</style>
