<template>
  <div class="account-settings-container">
    <h1 style="text-align: center">{{ account.cardNumbers }} - {{ account.currentBalance }} €</h1>

    <div class="budget-list-controllers">
      <button style="margin-left: 2%" @click="showCreateBudgetModal = true">Crear nuevo presupuesto</button>
    </div>

    <div class="budgets-list-container">
      <div v-for="budget in account.budgets" :key="budget.id" class="budget" @click="currentBudget = budget">

        <span style="display: flex; justify-content: center; align-items: center">
          <img :src="iconPath(budget.icon)" alt="budget-icon" style="width: 24px; height: 24px">
        </span>

        <p>{{ budget.name }}</p>

        <p>{{ percentageUsed(budget.maxExpense, budget.currentSpent) }} %</p>

        <button @click="deleteBudget(budget)">Borrar</button>
      </div>
    </div>

    <div class="budget-config-container">
      <div style="height: 100%; width: 100%;" v-if="currentBudget">
        <div class="select-concept-container" style="height:5%">
          <label for="icon">Icono: </label>

          <input type="text" v-model="currentBudget.icon" id="icon">

          <label for="name">Nombre: </label>

          <input type="text" v-model="currentBudget.name" id="name">

          <label for="maxExpense">Gasto máximo: </label>

          <input type="text" v-model="currentBudget.maxExpense" id="maxExpense">

          <label for="amountToSendAlarm">Cantidad para alarma: </label>

          <input type="text" v-model="currentBudget.amountToSendAlarm" id="amountToSendAlarm">
        </div>

        <!-- TODO: replace with component selectConcepts -->
        <div class="select-concept-container" style="height: 95%">
          <div style="height: 100%; width: 49%;padding-left: 3%">
            <h2>Conceptos disponibles en la cuenta:</h2>

            <div class="all-concept-container">
              <span v-for="concept in allConcepts" :key="concept">{{ concept }}</span>
            </div>
          </div>

          <div style="height: 100%; width: 49%;padding-left: 3%">
            <h2>Conceptos asociados al presupuesto:</h2>

            <div class="associated-concept-container">
              <span v-for="associatedConcept in currentBudget.associatedConcepts" :key="associatedConcept">
                {{ associatedConcept }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="no-budget-message-container">
        <p>Ningun presupuesto seleccionado</p>
      </div>
    </div>

    <ModalCreateBudget
        :show="showCreateBudgetModal"
        :all-concepts="allConcepts"
        @close="showCreateBudgetModal = false"
        @newBudget="createBudget"
    />
  </div>
</template>

<script>
import resolveIconPath from '../helpers/icon-resolver'
import ModalCreateBudget from '../components/modal/ModalCreateBudget'

export default {
  name: 'AccountSettings',
  components: {
    ModalCreateBudget
  },
  data() {
    return {
      account: {},
      currentBudget: null,
      allConcepts: [],
      showCreateBudgetModal: false
    }
  },
  methods: {
    iconPath(iconName) {
      return resolveIconPath(iconName)
    },
    percentageUsed(max, spent) {
      const percentage = spent * 100 / max

      return Math.round(percentage)
    },
    async createBudget(budget) {
      // TODO: add backend, catch
      await this.$axios.post(`/account/budget/${this.account.id}`, budget)

      await this.getAccountInfo()
    },
    async getAccountInfo() {
      this.account = (await this.$axios.get(`/account/${this.$route.params.accountId}`)).data

      // TODO: add this in update account
      const setMovements = new Set(this.account.movements.map(concept => concept.Concepto))

      this.allConcepts = Array.from(setMovements)
    },
    async deleteBudget(budget) {
      await this.$axios.post(`/account/budget/delete/${this.account.id}`, budget)

      await this.getAccountInfo()
    }
  },
  beforeMount() {
    this.getAccountInfo()
  }
}
</script>

<style scoped>

.account-settings-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.budgets-list-container {
  display: flex;
  overflow: auto;
  width: 100%;
  padding-bottom: 3%;
}

.budget {
  border: 1px solid #adc1c2;
  padding: 10px 20px 0 20px;
  margin: 0 2%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}

.budget-config-container {
  width: 100%;
  height: 70%;
}

.no-budget-message-container {
  width: 100%;
  height: 100%;
  text-align: center;
}

.select-concept-container {
  display: flex;
  width: 100%;
  justify-content: space-around;
}

.all-concept-container {
  height: 90%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  overflow: auto;
}

.associated-concept-container {
  height: 90%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  overflow: auto;
}

.budget-list-controllers {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin: 3% 0;
}
</style>
