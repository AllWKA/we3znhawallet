<template>
  <div class="accordion-container">
    <div class="accordion-header">
      <div class="account-header">
        <p>Cuenta</p>
      </div>

      <div class="account-header">
        <p>Saldo</p>
      </div>

      <div class="account-action-header">
        <span class="close" @click="closeModal">
          <img src="../../assets/icons/trash-can.svg" alt="close-icon">
        </span>

        <span class="close" @click="closeModal">
          <img src="../../assets/icons/plus-circle.svg" alt="close-icon">
        </span>
      </div>
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

<style scoped>
.accordion-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.accordion-header {
  display: flex;
  width: 100%;
  justify-content: space-around;
}

.account-header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
}

.account-action-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 30%;
}
</style>
