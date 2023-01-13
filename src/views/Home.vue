<template>
  <div class="home">
    <div style="display: flex;width: 100%; justify-content: center; align-items: center">
      <h1 style="margin-right: 2%">Cuentas bancarias</h1>
      <span style="display: flex; justify-content: center; align-items: center">
        <img src="../assets/icons/plus-circle.svg" alt="añadir cuenta" style="width: 24px; height: 24px">
      </span>
    </div>

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
