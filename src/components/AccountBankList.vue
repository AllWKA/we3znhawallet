<template>
  <div class="account-bank-container">
    <h1>Account bank list</h1>
    <p id="info">{{ info }}</p>
    <AccountList :content="content"/>
  </div>
</template>

<script>
import AccountList from "@/components/accountList/AccountList.vue"

export default {
  name: "AccountBankList",
  components: {
    AccountList
  },
  data() {
    return {
      info: null,
      content: "content test"
    }
  }
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
