<template>
  <div class="account-number-container">
    <span class="account-number">Cuenta: ****{{ cardNumbers }}</span>
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
  margin-left: 3%;
}
</style>
