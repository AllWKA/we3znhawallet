<template>
  <div class="home">
    <h1>Cuentas bancarias</h1>
    <AccountList/>
  </div>
</template>

<script>
import AccountList from "@/components/accountList/AccountList.vue"

export default {
  name: "Home",
  components: {
    AccountList
  },
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
