<template>
  <div class="account-list-container">
    <div class="accordion-container">
      <div class="account-info-container">
        <div style="margin-right: 10%; display: flex;justify-content: center;align-items: center">
          <div v-if="account.type === 'account'">
            <img src="../assets/icons/piggy-bank-outline.svg" alt="type-icon">
          </div>

          <div v-else>
            <img src="../assets/icons/credit-card-outline.svg" alt="type-icon">
          </div>

          <span style="margin-right: 3%;margin-left: 3%; width: 60px">: {{ account.cardNumbers }}</span>
        </div>
      </div>

      <p style="width: 130px;">Saldo: {{ account.currentBalance }} €</p>

      <div class="account-budgets-container">
        <AccountBudgetHorizontalList :budget-list="budgetList"/>
      </div>

      <div class="controllers">
        <button @click="navigateTo(`/accountData/${account.id}`) ">
            <span>
              <img :src="openDetailIconPath" alt="open-detail-icon" style="width: 24px; height: 20px">
            </span>
        </button>

        <button @click="sendControllerEvent($event,'delete')">
            <span>
              <img :src="deleteAccountIconPath" alt="close-icon" style="width: 24px; height: 20px">
            </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import resolveIconPath from '../helpers/icon-resolver';
import AccountBudgetHorizontalList from "@/components/accountBudgetHorizontal/AccountBudgetHorizontalList";

export default {
  name: "AccountListItem",
  components: {
    AccountBudgetHorizontalList
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
    addSubAccountIconPath() {
      return resolveIconPath('plus-circle')
    },
    editAccountIconPath() {
      return resolveIconPath('pencil')
    },
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

.account-list-container {
  width: 100%;
  height: 100%;
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
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.controllers {
  width: 30%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.accordion-container {
  display: flex;
  width: 100%;
  justify-content: flex-start;
}
</style>
