<template>
  <div>
    <h1>{{ account.cardNumbers }}</h1>
    <h3>{{ account.currentBalance }} €</h3>
  </div>
</template>

<script>
export default {
  name: "Account",
  data() {
    return {
      account: Object
    }
  },
  async beforeMount() {
    const accountInfo = (await this.$axios.get(`/account/${this.$route.params.accountId}`)).data

    this.account = accountInfo.account
  }
}
</script>

<style scoped>

</style>
