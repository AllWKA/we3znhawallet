<template>
  <div>
    Bank component request
    <form>
      <div>{{ info }}</div>
      <input
        v-model="lastFourCardNumber"
        type="number"
        id="lastFourCardNumber"
        name="lastFourCardNumber"
        required
        min="0000"
        max="9999"
      />
      <div>{{ lastFourCardNumber }}</div>
      <input
        v-model="currentBalance"
        type="number"
        id="currentBalance"
        name="currentBalance"
        required
      />
      <div>{{ currentBalance }}</div>
      <button type="submit" @click="submitAccountBankForm">Send form</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "BankAccountForm",
  data() {
    return {
      info: null,
      lastFourCardNumber: null,
      currentBalance: null,
    }
  },
  methods: {
    async submitAccountBankForm() {
      const resultForm = {
        lastFourCardNumber: this.lastFourCardNumber,
        currentBalance: this.currentBalance,
      }
      try {
        await this.$axios.post("/account", resultForm)
        this.info = "Petición enviada correctamente"
      } catch (error) {
        console.log("POST error: ", error)
        this.info = "Oops, algo ha fallado uwu"
      }
    },
  },
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
