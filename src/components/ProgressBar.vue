<template>
  <div class="progress-bar-container">
    <div :style="`text-align:center;background-color: ${progressColor};width:${progressPercentage}%;min-width:30%`">
      {{ progressPercentage }}% - {{ progress }}€
    </div>

    <div :style="`text-align:center;background-color: ${totalColor};width:${totalPercentageLeft}%;min-width:30%`">
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
    this.progressPercentage = Math.round(this.progress * 100 / this.total)

    this.totalPercentageLeft = Math.round(100 - this.progressPercentage)
  }
}
</script>

<style scoped>

.progress-bar-container {
  display: flex;
  color: white;
  width: 300px;
}

</style>
