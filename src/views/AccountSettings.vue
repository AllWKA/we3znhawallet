<template>
  <div
      style="display: flex; flex-direction: column; width: 100%; height: 100%; justify-content: center; align-items: center">
    <h1 style="text-align: center">{{ account.cardNumbers }} - {{ account.currentBalance }} €</h1>

    <div style="display: flex; width: 100%; overflow: auto;padding-bottom: 3%">
      <div
          v-for="budget in account.budgets"
          :key="budget.id"
          style="border: 1px solid black; padding: 10px 20px 0 20px;margin-right:2%;margin-left:2%;text-align:center;display: flex; justify-content: center; align-content: center; flex-direction: column"
          @click="currentBudget = budget"
      >

        <span style="display: flex; justify-content: center; align-items: center">
          <img :src="iconPath(budget.icon)" alt="budget-icon" style="width: 24px; height: 24px">
        </span>

        <p>{{ budget.name }}</p>

        <p>{{ percentageUsed(budget.maxExpense, budget.currentSpent) }} %</p>
      </div>
    </div>

    <div style="width: 100%; height: 70%">
      <div style="height: 100%; width: 100%;" v-if="currentBudget">
        <div style="display: flex; width: 100%; height:5%;justify-content: space-around">
          <label for="icon">Icono: </label>

          <input type="text" v-model="currentBudget.icon" id="icon">

          <label for="name">Nombre: </label>

          <input type="text" v-model="currentBudget.name" id="name">

          <label for="maxExpense">Gasto máximo: </label>

          <input type="text" v-model="currentBudget.maxExpense" id="maxExpense">

          <label for="amountToSendAlarm">Cantidad para alarma: </label>

          <input type="text" v-model="currentBudget.amountToSendAlarm" id="amountToSendAlarm">
        </div>

        <div style="display: flex; width: 100%; height: 95%; justify-content: space-between">
          <div style="height: 100%; width: 49%;padding-left: 3%">
            <h2>Conceptos disponibles en la cuenta:</h2>

            <div
                style="height: 90%;width: 100%;display: flex;flex-direction: column;align-content: center;overflow: auto">
              <span v-for="concept in allConcepts" :key="concept">{{ concept }}</span>
            </div>
          </div>

          <div style="height: 100%; width: 49%;padding-left: 3%">
            <h2>Conceptos asociados al presupuesto:</h2>

            <div
                style="height: 90%;width: 100%;display: flex;flex-direction: column;align-content: center;overflow: auto">
              <span v-for="associatedConcept in currentBudget.associatedConcepts" :key="associatedConcept">
                {{ associatedConcept }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div v-else style="width: 100%;height: 100%;text-align: center"><p>Ningun presupuesto seleccionado</p></div>
    </div>
  </div>
</template>

<script>
import resolveIconPath from '../helpers/icon-resolver'

export default {
  name: 'AccountSettings',
  data() {
    return {
      account: {},
      currentBudget: null,
      allConcepts: []
    }
  },
  methods: {
    iconPath(iconName) {
      return resolveIconPath(iconName)
    },
    percentageUsed(max, spent) {
      const percentage = spent * 100 / max

      return Math.round(percentage)
    }
  },
  async beforeMount() {
    console.log(this.$route.params)
    this.account = (await this.$axios.get(`/account/${this.$route.params.accountId}`)).data
    console.log(this.account)
    // TODO: add this in update account
    this.allConcepts = new Set(this.account.movements.map(concept => concept.Concepto))
  }
}
</script>

<style scoped>

</style>
