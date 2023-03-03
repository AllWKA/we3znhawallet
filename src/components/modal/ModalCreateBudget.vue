<template>
  <Modal :show-content="show">
    <div class="create-budget-container">
      <div style="display: flex; justify-content: space-between; width: 100%; align-items: center">
        <h1 style="width: 93%; text-align: center">Crea un nuevo modal</h1>

        <span class="close" @click="$emit('close')">
          <img src="../../assets/icons/close.svg" alt="close-icon">
        </span>
      </div>

      <!--      <div style="width: 100%;display: flex">-->
      <!--        <label for="icon" style="margin-right: 3%; width: 30%">Icono: </label>-->
      <!--        <input type="text" id="icon" v-model="icon" style="width: 40%">-->
      <!--      </div>-->

      <div style="width: 100%;display: flex">
        <label for="name" style="margin-right: 3%; width: 30%">Nombre del presupuesto: </label>
        <input type="text" id="name" v-model="name" style="width: 40%">
      </div>

      <div style="width: 100%;display: flex">
        <label for="maxExpense" style="margin-right: 3%; width: 30%">Cantidad máxima: </label>
        <input type="number" id="maxExpense" v-model="maxExpense" style="width: 40%">
      </div>

      <div style="width: 100%;display: flex">
        <label for="amountToSendWarning" style="margin-right: 3%; width: 30%">Cantidad para aviso:</label>
        <input type="number" id="amountToSendWarning" v-model="amountToSendWarning" style="width: 40%">
      </div>

      <SelectConceptsForBudget
          :all-concepts="localAllConcepts"
          :associated-concepts="associatedConcepts"
          @addConceptToAssociated="addConceptToAssociated"
          @removeConceptToAssociated="removeConceptToAssociated"
      />

      <div class="controllers-container">
        <button style="margin-right: 3%" @click="sendBudget">Crear</button>
        <button @click="$emit('close')">Cancelar</button>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from './Modal'
import SelectConceptsForBudget from '../SelectConceptsForBudget'

export default {
  name: 'ModalCreateBudget',
  components: {
    Modal,
    SelectConceptsForBudget
  },
  props: {
    show: Boolean,
    allConcepts: Array
  },
  data() {
    return {
      icon: 'bank-outline',
      name: 'Presupuesto 1',
      maxExpense: 0,
      amountToSendWarning: 0,
      associatedConcepts: [],
      localAllConcepts: []
    }
  },
  methods: {
    addConceptToAssociated(newConcept) {
      const repeatedConcept = this.associatedConcepts.find(associatedConcept => associatedConcept === newConcept)

      if (!repeatedConcept) {
        this.associatedConcepts.push(newConcept)

        this.localAllConcepts = this.localAllConcepts.filter(concept => concept !== newConcept)
      }
    },
    removeConceptToAssociated(concept) {
      const associatedConcept = this.associatedConcepts.find(associatedConcept => associatedConcept === concept)

      if (associatedConcept) {
        this.associatedConcepts = this.associatedConcepts.filter(conceptInArray => conceptInArray !== associatedConcept)

        this.localAllConcepts.push(concept)

        this.localAllConcepts.sort()
      }
    },
    sendBudget() {
      const budget = {
        icon: this.icon,
        name: this.name,
        maxExpense: Number.parseFloat(this.maxExpense),
        amountToSendWarning: Number.parseFloat(this.amountToSendWarning),
        associatedConcepts: this.associatedConcepts,
      }

      this.$emit('newBudget', budget)

      this.$emit('close')

      this.associatedConcepts = []

      this.maxExpense = 0

      this.amountToSendWarning = 0
    }
  },
  watch: {
    allConcepts(newAllConcepts) {
      this.localAllConcepts = newAllConcepts
    }
  }
}
</script>

<style scoped>
.create-budget-container {
  height: 70vh;
  width: 90vh;
  display: flex;
  flex-direction: column;
  padding: 3%;
  border: 1px solid #adc1c2;
  background-color: var(--color-background);
  color: var(--color-on-background);
}

.controllers-container {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>
