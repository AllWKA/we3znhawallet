<template>
  <div class="account-bank-container">
    <h1>Account bank list</h1>
    <p id="info">{{ info }}</p>
    <Accordion :accountList="accountList" :content="content" ></Accordion>
  </div>
</template>

<script>
import Accordion from "@/components/accordion/Accordion.vue"

export default {
  name: "AccountBankList",
  components: {
    Accordion
  },
  data() {
    return {
      info: null,
      content: "content test",
      accountList: [
        {
          id: "1",
          lastFourCardNumber: "2020",
          currentBalance: "10",
        },
        {
          id: "2",
          lastFourCardNumber: "1415",
          currentBalance: "200",
        },
      ],
    }
  },
  async created() {
    try {
      const response = await this.$axios.get("/account")
      this.accountList = response.data
      this.info = "Petición recogida correctamente "
    } catch (error) {
      console.log("GET error: ", error)
      this.info = "Oops, algo ha fallado owo "
    }
  },
}
</script>

<style scoped>
.account-bank-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
#info {
  color: white;
}
</style>
