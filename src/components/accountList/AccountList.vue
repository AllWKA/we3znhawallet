<template>
  <div class="accordion-container">

    <div class="account-list-item-container">
      <AccountListItem v-for="accountData in accountList"
                       :key="accountData.cardNumbers"
                       :accountData="accountData"/>
    </div>

    <ModalCreateEditAccount :show-content="showModalCreateEditAccount"
                            @submit="submitAccount"
                            @close="showModalCreateEditAccount = false"/>
  </div>
</template>

<script>
import AccountListItem from "@/components/accountList/AccountListItem.vue"
import ModalCreateEditAccount from "@/components/modal/ModalCreateEditAccount"

export default {
  name: "AccountList",
  components: {
    AccountListItem,
    ModalCreateEditAccount
  },
  props: {
    content: String,
  },
  data() {
    return {
      isActive: false,
      showModalCreateEditAccount: false,
      accountList: [],
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

      await this.getAccounts()
    },
    async getAccounts() {
      try {
        const headers = {
          authorization: `Bearer ${sessionStorage['token']}`
        }

        const response = await this.$axios.get('/account', { headers })

        this.accountList = response.data
      } catch (error) {
        // TODO: show error modal
        console.log(error)
      }
    }
  },
  beforeMount() {
    this.getAccounts()
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

.account-list-item-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
