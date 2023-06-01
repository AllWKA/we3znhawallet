<template>
  <div class="account-list-container">
    <div class="account-item-header">
      <div class="account-info-container">
        <AccountNumber :card-numbers="account.cardNumbers" :type="account.type"/>
      </div>

      <div class="current-balance-container">
        <p>Saldo: {{ account.currentBalance }} €</p>
      </div>
    </div>

    <div class="extra-info">
      <div class="account-budgets-container">
        <h2>Presupuestos</h2>
        <AccountBudgetHorizontalList :budget-list="account.budgets"/>
      </div>

      <div class="account-budgets-container">
        <h2>Cuentas Ahorro</h2>
        <AccountBudgetHorizontalList :budget-list="account.budgets"/>
      </div>
    </div>

    <div class="controllers">
      <button @click="navigateTo(`/account/${account.id}`)" class="account-controller">
            <span>
              <img :src="openDetailIconPath" alt="open-detail-icon" style="width: 24px; height: 20px">
            </span>
      </button>

      <button @click="sendControllerEvent($event,'delete')" class="account-controller">
            <span>
              <img :src="deleteAccountIconPath" alt="close-icon" style="width: 24px; height: 20px">
            </span>
      </button>
    </div>
  </div>
</template>

<script>
import resolveIconPath from '../helpers/icon-resolver'
import AccountBudgetHorizontalList from '../components/accountBudgetHorizontal/AccountBudgetHorizontalList'
import AccountNumber from './AccountInfo/AccountNumber'

export default {
  name: 'AccountListItem',
  components: {
    AccountBudgetHorizontalList,
    AccountNumber
  },
  props: {
    account: Object
  },
  data() {
    return {
      budgetList: []
    }
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path)
    },
    sendControllerEvent(event, eventName) {
      event.preventDefault()

      this.$emit(eventName, this.account)
    }
  },
  computed: {
    deleteAccountIconPath() {
      return resolveIconPath('trash-can')
    },
    openDetailIconPath() {
      return resolveIconPath('eye-arrow-right')
    }
  }
}
</script>

<style scoped>
img {
  width: 25px;
  height: 25px;
}

.current-balance-container {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 30%;
  height: 100%;
  font-size: 23px;
}

.account-list-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border: 1px solid var(--color-on-background);
  background-color: var(--color-surface);
  color: var(--color-on-surface);
}

.account-info-container {
  width: 30%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.account-budgets-container {
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #2c2927;
}

.controllers {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1%;
}

.account-controller {
  background-color: var(--color-surface);
}

.account-item-header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-left: 1%;
}

.extra-info {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
</style>
