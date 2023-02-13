<template>
  <div class="account-list-container surface">
    <div class="account-info-container">
      <div style="margin-right: 5%; display: flex;justify-content: center;align-items: center">
        <div v-if="account.type === 'account'">
          <img src="../assets/icons/piggy-bank-outline.svg" alt="type-icon">
        </div>

        <div v-else>
          <img src="../assets/icons/credit-card-outline.svg" alt="type-icon">
        </div>

        <span style="margin-right: 3%;margin-left: 3%; width: 60px">: {{ account.cardNumbers }}</span>
      </div>
    </div>

    <div class="current-balance-container">
      <p>Saldo: {{ account.currentBalance }} €</p>
    </div>

    <!--    <div class="account-budgets-container">-->
    <!--      <AccountBudgetHorizontalList :budget-list="account.budgets"/>-->
    <!--    </div>-->

    <div class="controllers">
      <button @click="navigateTo(`/account/${account.id}`)" class="surface">
            <span>
              <img :src="openDetailIconPath" alt="open-detail-icon" style="width: 24px; height: 20px">
            </span>
      </button>

      <button @click="sendControllerEvent($event,'delete')" class="surface">
            <span>
              <img :src="deleteAccountIconPath" alt="close-icon" style="width: 24px; height: 20px">
            </span>
      </button>
    </div>
  </div>
</template>

<script>
import resolveIconPath from '../helpers/icon-resolver'
// import AccountBudgetHorizontalList from '../components/accountBudgetHorizontal/AccountBudgetHorizontalList'

export default {
  name: 'AccountListItem',
  // components: {
  //   AccountBudgetHorizontalList
  // },
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

button {
  margin-left: 3%;
  margin-right: 3%;
}

.current-balance-container {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 30%;
  height: 100%;
}

.account-list-container {
  width: 100%;
  height: 95%;
  display: flex;
  justify-content: flex-start;
  border: 1px solid black;
}

.account-info-container {
  width: 30%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 5%;
}

.account-budgets-container {
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2c2927;
}

.controllers {
  width: 30%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
