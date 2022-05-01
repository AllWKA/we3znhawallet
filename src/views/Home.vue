<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <BankAccountForm/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import BankAccountForm from '@/components/BankAccountForm.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    BankAccountForm
  }
}
</script>
