<template>
  <div class="account-number-container">
    <span class="account-number">{{ cardNumbers }}</span>

    <div v-if="type === 'account'" class="account-icon-container">
      <img src="../../assets/icons/piggy-bank-outline.svg" alt="type-icon">
    </div>

    <div v-else class="account-icon-container">
      <img src="../../assets/icons/credit-card-outline.svg" alt="type-icon">
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccountNumber',
  props: {
    cardNumbers: String,
    type: String
  }
}
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
}

.account-number-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.account-number {
  font-size: 23px
}

.account-icon-container {
  width: 30px;
  height: 30px;
}
</style>
