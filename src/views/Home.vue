<template>
  <div class="home">
    <AccountBankList />
  </div>
</template>

<script>
import AccountBankList from "@/components/AccountBankList.vue"

export default {
  name: "Home",
  components: {
    AccountBankList
  }
}
</script>

<style>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
</style>
