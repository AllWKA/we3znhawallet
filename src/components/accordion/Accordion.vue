<template>
  <div>
    <div class="accordion-header">
      <p>Cuenta</p>
      <p>Saldo</p>
    </div>
    <AccordionContent
      :account="account"
      :content="content"
      v-for="account in accountList"
      :key="account.lastFourCardNumber"
    />
  </div>
</template>

<script>
import AccordionContent from "@/components/accordion/AccordionContent.vue"

export default {
  name: "Accordion",
  components: {
    AccordionContent,
  },
  props: {
    accountList: Array,
    content: String,
  },
  data() {
    return {
      isActive: false,
    }
  },
  methods: {
    async accordionPanel() {
      this.isActive = !this.isActive
    },
    async addChildAccountBank(account) {
      console.log(
        "button add new account bank pressed: ",
        "lastFourCardNumber -> " + account.lastFourCardNumber,
        "currentBalance -> " + account.currentBalance
      )
    },
    async editAccountBank(account) {
      console.log(
        "button edit pressed: ",
        "lastFourCardNumber -> " + account.lastFourCardNumber,
        "currentBalance -> " + account.currentBalance
      )
    },
    async deleteAccountBank(account) {
      console.log(
        "button delete pressed: ",
        "lastFourCardNumber -> " + account.lastFourCardNumber,
        "currentBalance -> " + account.currentBalance
      )
    },
  },
}
</script>

<style>
.accordion-header {
  display: flex;
  width: 100%;
  justify-content: space-around;
}
</style>
