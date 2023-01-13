<template>
  <div class="account-list-container">
    <div class="accordion-container">
      <div class="account-info-container">
        <p style="margin-right: 10%">Cuenta: {{ accountData.account.cardNumbers }}</p>

        <p>Saldo: {{ accountData.account.currentBalance }} €</p>
      </div>

      <div style=" width: 45%;overflow-x: scroll;">
        <AccountBudgetHorizontalList :budget-list="budgetList"/>
      </div>

      <div class="controllers">
        <button @click="sendControllerEvent($event,'edit')">
            <span>
              <img :src="editAccountIconPath" alt="close-icon">
            </span>
        </button>

        <button @click="sendControllerEvent($event,'delete')">
            <span>
              <img :src="deleteAccountIconPath" alt="close-icon">
            </span>
        </button>

        <button @click="navigateTo(`/accountData/${accountData.id}`) ">
            <span>
              <img :src="openDetailIconPath" alt="open-detail-icon">
            </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import resolveIconPath from '../../helpers/icon-resolver';
import AccountBudgetHorizontalList from "@/components/accountBudgetHorizontal/AccountBudgetHorizontalList";

export default {
  name: "AccountListItem",
  components: {
    AccountBudgetHorizontalList
  },
  props: {
    accountData: Object
  },
  data() {
    return {
      budgetList: [
        {
          "id": 1,
          "icon": "multi-tasking",
          "name": "Duobam",
          "maxExpense": 893.2,
          "amountToSendAlarm": 220.4,
          "amountSpent": 100
        }, {
          "id": 2,
          "icon": "approach",
          "name": "Domainer",
          "maxExpense": 557.36,
          "amountToSendAlarm": 455.05,
          "amountSpent": 100
        },
        {
          "id": 3,
          "icon": "Re-engineered",
          "name": "Ronstring",
          "maxExpense": 980.17,
          "amountToSendAlarm": 452.22,
          "amountSpent": 100
        },
        {
          "id": 4,
          "icon": "function",
          "name": "Matsoft",
          "maxExpense": 322.18,
          "amountToSendAlarm": 67.03,
          "amountSpent": 100
        },
        {
          "id": 5,
          "icon": "application",
          "name": "Quo Lux",
          "maxExpense": 153.3,
          "amountToSendAlarm": 313.97,
          "amountSpent": 100
        }
      ]
    }
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path)
    },
    sendControllerEvent(event, eventName) {
      event.preventDefault()

      this.$emit(eventName, this.accountData)
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
