<template>
  <div style="display: flex; flex-direction: column; height: 100%; width: 100%">
    <div style="min-height: 15%">
      <h1 style="text-align: center; width: 100%">Account: {{ account.cardNumbers }}</h1>
      <h2 style="text-align: center; width: 100%">Saldo: {{ account.currentBalance }} €</h2>
    </div>

    <div style="display: flex; justify-content: space-around; width: 100%">
      <div style="display: flex; flex-direction: column; width: 30%">
        <h3>Presupuesto 1</h3>
        <ProgressBar :progress="30" :total="100" progress-color="red" total-color="yellow"/>
      </div>

      <div style="display: flex; flex-direction: column; width: 30%">
        <h3>Presupuesto 2</h3>
        <ProgressBar :progress="45" :total="100" progress-color="red" total-color="yellow"/>
      </div>

      <div style="display: flex; flex-direction: column; width: 30%">
        <h3>Presupuesto 3</h3>
        <ProgressBar :progress="97" :total="100" progress-color="red" total-color="yellow"/>
      </div>
    </div>

    <div style="min-height: 60%"></div>
  </div>
</template>

<script>
import ProgressBar from "@/components/ProgressBar";

export default {
  name: "Account",
  components: {
    ProgressBar
  },
  data() {
    return {
      account: Object,
      chart: Object
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
