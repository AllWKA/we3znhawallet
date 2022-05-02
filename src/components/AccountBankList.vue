<template>
  <div>
    <h1>Account bank list</h1>
    <p id="info">{{ info }}</p>
    <Accordion :accountList="accountList" :content="content" ></Accordion>
  </div>
</template>

<script>
import axios from "axios"
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
      const response = await axios.get("http://localhost:8090/account")
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
#info {
  color: white;
}
</style>
