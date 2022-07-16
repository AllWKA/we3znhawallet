<template>
  <div class="accordion-container">
    <div class="accordion-header">
      <div class="account-action-header">
        <button style="margin-right: 3%">
          <span class="close">
            <img src="../../assets/icons/trash-can.svg" alt="close-icon">
          </span>
        </button>

        <button style="margin-right: 3%">
          <span class="close" @click="toggleModalCreateEditAccount">
            <img src="../../assets/icons/plus-circle.svg" alt="close-icon">
          </span>
        </button>
      </div>
    </div>

    <div class="account-list-item-container">
      <AccountListItem v-for="accountData in accountList"
                       :key="accountData.cardNumbers"
                       :account="accountData.account"
                       :content="content"/>
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

.accordion-header {
  display: flex;
  width: 100%;
  justify-content: space-around;
}

.account-action-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin-bottom: 3%;
}

.account-list-item-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
