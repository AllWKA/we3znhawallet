<template>
  <div class="account-container">
    <div class="account-header-container">
      <h1 class="account-header-text">Account: {{ account.cardNumbers }}</h1>

      <h1 class="account-header-text">Saldo: {{ account.currentBalance }} €</h1>

      <div class="account-header-controllers-container">
        <button @click="importFile" class="button-controller">
          <span style="display: flex; justify-content: center; align-items: center">
            <img src="../assets/icons/file-download-outline.svg" alt="importar_excel" style="width: 24px; height: 24px">
          </span>
        </button>

        <button class="button-controller">
          <span style="display: flex; justify-content: center; align-items: center">
            <img src="../assets/icons/file-upload-outline.svg" alt="exportar_excel" style="width: 24px; height: 24px">
          </span>
        </button>

        <button class="button-controller" @click="showAccountSettings=true">
          <span style="display: flex; justify-content: center; align-items: center">
            <img src="../assets/icons/cog-outline.svg" alt="exportar_excel" style="width: 24px; height: 24px">
          </span>
        </button>
      </div>

      <input type="file" style="display: none" id="importInput" @change="importFileChanged">
    </div>

    <div class="budget-container">
      <AccountBudgetHorizontalList :budget-list="budgetList"/>
    </div>

    <!--    <div class="date-filter-container">-->
    <!--      <div style="display: flex; width: 40%; justify-content: space-around">-->
    <!--        <p>De: </p>-->
    <!--        <input type="date">-->
    <!--        <p>Hasta: </p>-->
    <!--        <input type="date">-->
    <!--      </div>-->
    <!--    </div>-->

    <div class="account-movements-table-container">
      <div class="table-header-container">
        <div style="width: 18%">Fecha</div>

        <div style="width: 33%">Concepto</div>

        <div style="width: 18%">Importe</div>

        <div style="width: 18%">Disponible</div>
      </div>

      <div class="rows-container">
        <div v-for="(movement, i) in movements" :key="i" class="table-row">
          <div style="width: 18%">{{ movement.date }}</div>

          <div style="width: 33%;text-align: justify">
            {{ movement.concept }}
          </div>

          <div style="width: 18%;text-align: justify">
            {{ movement.amount }} {{ movement.currency }}
          </div>

          <div style="width: 18%">{{ movement.available }}
            {{ movement.currency }}
          </div>
        </div>
      </div>
    </div>

    <ConfirmMovementsToAdd
        :showModal="showConfirmMovements"
        :movementsProcessed="movementsProcessed"
        :account-id="accountId.toString()"
        @close="closeConfirmMovementsModal"/>

    <AccountSettingsModal
        :show="showAccountSettings"
        @close="closeAccountSettingsModal"
    />
  </div>
</template>

<script>
import AccountBudgetHorizontalList from '../components/accountBudgetHorizontal/AccountBudgetHorizontalList'
import ConfirmMovementsToAdd from '../components/modal/ConfirmMovementsToAdd'
import AccountSettingsModal from "../components/modal/AccountSettingsModal"

export default {
  name: 'Account',
  components: {
    AccountBudgetHorizontalList,
    ConfirmMovementsToAdd,
    AccountSettingsModal
  },
  data() {
    return {
      account: {},
      accountId: '',
      movements: [],
      chart: {},
      movementsProcessed: {},
      budgetList: [],
      showConfirmMovements: false,
      showAccountSettings: false
    }
  },
  methods: {
    importFile() {
      const input = document.getElementById('importInput')

      input.click()
    },
    async importFileChanged(e) {
      const file = e.target.files[0]

      const formData = new FormData()

      formData.append('image', file)

      this.movementsProcessed = (await this.$axios.post(
              `/account/movements/process/${this.accountId}`,
              { filePath: file.path })
      ).data

      this.showConfirmMovements = true
    },
    async updateAccountInfo() {
      const account = (await this.$axios.get(`/account/${this.$route.params.accountId}`)).data

      this.account = account

      this.accountId = account.id

      this.movements = account.movements

      this.budgetList = account.budgets
    },
    closeConfirmMovementsModal() {
      this.updateAccountInfo()

      this.showConfirmMovements = false
    },
    closeAccountSettingsModal() {
      this.updateAccountInfo()

      this.showAccountSettings = false
    }
  },
  beforeMount() {
    this.updateAccountInfo()
  }
}
</script>

<style scoped>
.account-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  background-color: var(--color-background);
  color: var(--color-on-background);
}

.account-header-container {
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
}

.account-header-controllers-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 10%;
}

.account-header-text {
  text-align: center;
}

.account-movements-table-container {
  height: 65%;
  background-color: #332F2E;
  width: 90%;
  padding-top: 1%;
}

.budget-container {
  display: flex;
  justify-content: center;
  overflow-x: auto;
  margin-bottom: 3%;
  width: 100%;
}

.date-filter-container {
  display: flex;
  width: 90%;
  justify-content: flex-start;
  margin-left: 5%;
  margin-right: 5%;
  border-bottom: 1px solid black;
  border-top: 1px solid black;
}

.button-controller {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
  background-color: var(--color-surface);
}

.table-header-container {
  text-align: center;
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 2%;
}

.rows-container {
  height: 90%;
  overflow: auto;
  text-align: center;
  width: 100%;
}

.table-row {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  border-bottom: 1px solid #adc1c2;
}
</style>
