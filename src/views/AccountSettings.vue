<template>
  <div class="account-settings-container">
    <h1 style="text-align: center">{{ account.cardNumbers }} - {{ account.currentBalance }} €</h1>

    <div class="budgets-list-container">
      <div v-for="budget in account.budgets" :key="budget.id" class="budget" @click="selectBudget(budget)">

        <span style="display: flex; justify-content: center; align-items: center">
          <img :src="iconPath(budget.icon)" alt="budget-icon" style="width: 24px; height: 24px">
        </span>

        <p>{{ budget.name }}</p>

        <p>{{ percentageUsed(budget.maxExpense, budget.currentSpent) }} %</p>

        <button @click="deleteBudget(budget)">Borrar</button>
      </div>
    </div>

    <div class="budget-list-controllers">
      <button style="margin-left: 3%" @click="showCreateBudgetModal = true">Crear nuevo presupuesto</button>
    </div>

    <div class="budget-config-container">
      <div style="height: 100%; width: 100%" v-if="currentBudget">
        <div style="margin-left: 3%">
          <h3>{{ currentBudget.name }}</h3>
        </div>

        <div class="select-concept-container">
          <label for="icon">Icono: </label>

          <input type="text" v-model="currentBudget.icon" id="icon">

          <label for="name">Nombre: </label>

          <input type="text" v-model="currentBudget.name" id="name">

          <label for="maxExpense">Gasto máximo: </label>

          <input type="number" v-model="currentBudget.maxExpense" id="maxExpense">

          <label for="amountToSendAlarm">Cantidad para alarma: </label>

          <input type="number" v-model="currentBudget.amountToSendAlarm" id="amountToSendAlarm">
        </div>

        <div class="select-concept-container">
          <SelectConceptsForBudget
              :all-concepts="allConcepts"
              :associated-concepts="currentBudget.associatedConcepts"
              @addConceptToAssociated="addConceptToAssociated"
              @removeConceptToAssociated="removeConceptToAssociated"
          />
        </div>

        <div style="margin: 3% 0 3% 1%;">
          <button @click="updateBudget">Guardar</button>
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
import SelectConceptsForBudget from '../components/SelectConceptsForBudget'

export default {
  name: 'AccountSettings',
  components: {
    ModalCreateBudget,
    SelectConceptsForBudget
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
    addConceptToAssociated(newConcept) {
      const repeatedConcept = this.currentBudget.associatedConcepts.find(associatedConcept => associatedConcept === newConcept)

      if (!repeatedConcept) {
        this.currentBudget.associatedConcepts.push(newConcept)

        this.allConcepts = this.allConcepts.filter(concept => concept !== newConcept)
      }
    },
    removeConceptToAssociated(concept) {
      const associatedConcept = this.currentBudget.associatedConcepts.find(associatedConcept => associatedConcept === concept)

      if (associatedConcept) {
        this.currentBudget.associatedConcepts = this.currentBudget.associatedConcepts.filter(conceptInArray => conceptInArray !== associatedConcept)

        this.localAllConcepts.push(concept)

        this.localAllConcepts.sort()
      }
    },
    async createBudget(budget) {
      // TODO: add backend, catch
      await this.$axios.post(`/account/budget/${this.account.id}`, budget)

      await this.getAccountInfo()
    },
    async getAccountInfo() {
      this.account = {}

      this.currentBudget = null

      this.allConcepts = []

      this.account = (await this.$axios.get(`/account/${this.$route.params.accountId}`)).data

      // TODO: add this in update account
      const setMovements = new Set(this.account.movements.map(concept => concept.Concepto))

      this.allConcepts = Array.from(setMovements)
    },
    async deleteBudget(budget) {
      await this.$axios.post(`/account/budget/delete/${this.account.id}`, budget)

      await this.getAccountInfo()
    },
    selectBudget(budget) {
      this.currentBudget = budget
    },
    updateBudget() {
      const budget = {
        ...this.currentBudget,
        maxExpense: Number.parseFloat(this.currentBudget.maxExpense),
        amountToSendAlarm: Number.parseFloat(this.currentBudget.amountToSendAlarm)
      }

      this.$axios.put(`/account/budget/${this.account.id}`, budget)
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
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: var(--color-background);
  color: var(--color-on-background);
}

.budgets-list-container {
  display: flex;
  overflow: auto;
  width: 95%;
  background-color: var(--color-surface);
  color: var(--color-on-surface);
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
  background-color: #403B36;
}

.budget-config-container {
  width: 96%;
  margin-top: 3%;
  background-color: var(--color-surface);
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

.budget-list-controllers {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin: 1% 0;
}
</style>
