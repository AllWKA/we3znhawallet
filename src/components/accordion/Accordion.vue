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
        <button>
          <span class="close">
            <img src="../../assets/icons/trash-can.svg" alt="close-icon">
          </span>
        </button>

        <button>
          <span class="close" @click="toggleModalCreateEditAccount">
            <img src="../../assets/icons/plus-circle.svg" alt="close-icon">
          </span>
        </button>
      </div>
    </div>

    <AccordionContent
        :account="account"
        :content="content"
        v-for="account in accountList"
        :key="account.lastFourCardNumber"
    />

    <ModalCreateEditAccount :show-content="showModalCreateEditAccount" @submit="submitAccount" @close="showModalCreateEditAccount = false"/>
  </div>
</template>

<script>
import AccordionContent from "@/components/accordion/AccordionContent.vue"
import ModalCreateEditAccount from "@/components/modal/ModalCreateEditAccount"

export default {
  name: "Accordion",
  components: {
    AccordionContent,
    ModalCreateEditAccount
  },
  props: {
    accountList: Array,
    content: String,
  },
  data() {
    return {
      isActive: false,
      showModalCreateEditAccount: false
    }
  },
  methods: {
    async accordionPanel() {
      this.isActive = !this.isActive
    },
    toggleModalCreateEditAccount() {
      this.showModalCreateEditAccount = !this.showModalCreateEditAccount
    },
    async submitAccount(account) {
      const headers = {
        authorization: `Bearer ${sessionStorage['token']}`
      }

      const payload = { account: account.account }

      if (account.method === 'POST') {
        await this.$axios.post('/account', payload, { headers })
      } else {
        await this.$axios.put('/account', payload, { headers })
      }

      this.showModalCreateEditAccount = false
    }
  }
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
