<template>
  <div class="accordion-container">

    <div class="account-list-item-container">
      <AccountListItem v-for="accountData in accountList"
                       :key="accountData.cardNumbers"
                       :accountData="accountData"/>
    </div>
  </div>
</template>

<script>
import AccountListItem from "@/components/accountList/AccountListItem.vue"

export default {
  name: "AccountList",
  components: {
    AccountListItem
  },
  props: {
    accountList: Array,
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

</style>
