<template>
  <div class="progress-bar-container">
    <div :style="`text-align:center;background-color: ${progressColor};width:${progressPercentage}%;min-width:30%`">
      {{ progress }} € - {{ progressPercentage }}%
    </div>

    <div :style="`text-align:center;background-color: ${totalColor};width:${totalPercentageLeft}%;min-width:30%`">
      {{ total }} € - {{ totalPercentageLeft }}%
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    progressColor: String,
    totalColor: String,
    progress: Number,
    total: Number
  },
  computed: {
    progressPercentage() {
      if (this.progress === 0) {
        return 0
      }

      return Math.round(this.progress * 100 / this.total)
    },
    totalPercentageLeft() {
      if (this.progressPercentage === 0) {
        return 100
      }

      return Math.round(100 - this.progressPercentage)
    }
  }
}
</script>

<style scoped>

.progress-bar-container {
  display: flex;
  color: white;
  width: 100%;
}

</style>
