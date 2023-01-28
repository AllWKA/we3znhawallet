<template>
  <div class="home">
    <div style="display: flex;width: 100%; justify-content: center; align-items: center">
      <h1 style="margin-right: 2%">Cuentas bancarias</h1>

      <span style="display: flex; justify-content: center; align-items: center"
            @click="showModalCreateEditAccount = true">
        <img src="../assets/icons/plus-circle.svg" alt="añadir cuenta" style="width: 24px; height: 24px">
        <!-- TODO: 2 Types, account and credit card, right now works just for credit card -->
      </span>
    </div>

    <div class="account-list-item-container">
      <AccountListItem v-for="account in accountList"
                       :key="account.cardNumbers"
                       :account="account"
                       @delete="deleteAccount"/>
    </div>

    <ModalCreateEditAccount :show-content="showModalCreateEditAccount"
                            @submit="submitAccount"
                            @close="showModalCreateEditAccount = false"/>

    <RequestErrorModal :show="showRequestErrorModal"
                       @close="showRequestErrorModal = false"
    />
  </div>
</template>

<script>
import AccountListItem from "../components/AccountListItem.vue";
import ModalCreateEditAccount from "../components/modal/ModalCreateAccount";
import RequestErrorModal from "../components/modal/RequestErrorModal";

export default {
  name: "Home",
  components: {
    AccountListItem,
    ModalCreateEditAccount,
    RequestErrorModal
  },
  data() {
    return {
      showModalCreateEditAccount: false,
      showRequestErrorModal: false,
      accountList: []
    }
  },
  methods: {
    async submitAccount(submitConfig) {
      if (submitConfig.method === 'POST') {
        await this.$axios.post('/account', submitConfig.account)
      } else {
        await this.$axios.put('/account', submitConfig.account)
      }

      this.showModalCreateEditAccount = false

      await this.getAccounts()
    },

    async getAccounts() {
      try {
        const response = await this.$axios.get('/account')

        this.accountList = response.data
      } catch (error) {
        this.showRequestErrorModal = true
      }
    },

    async deleteAccount(account) {
      // TODO: use UUID for account id

      await this.$axios.delete(`/account/${account.id}`)

      await this.getAccounts()
    }
  },
  beforeMount() {
    this.getAccounts()
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

.account-list-item-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
