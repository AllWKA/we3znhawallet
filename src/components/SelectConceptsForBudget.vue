<template>
  <div class="select-concept-container" style="height: 95%">
    <div class="select-concept-section" style="padding-left: 2%">
      <h2>Conceptos disponibles en la cuenta:</h2>

      <div class="all-concept-container">
        <span v-for="concept in allConcepts" :key="concept" @click="$emit('addConceptToAssociated', concept)">
          {{ concept }}
        </span>
      </div>
    </div>

    <div class="select-concept-section" style="padding-left: 3%">
      <h2>Conceptos asociados al presupuesto:</h2>

      <div class="associated-concept-container">
        <div v-for="associatedConcept in associatedConcepts" :key="associatedConcept" class="associated-concept">
          <p style="width: 93%">{{ associatedConcept }}</p>

          <span class="delete-icon" @click="$emit('removeConceptToAssociated', associatedConcept)">
            <img :src="iconPath('trash-can')" alt="budget-icon" style="width: 24px; height: 24px">
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import resolveIconPath from '../helpers/icon-resolver'

export default {
  name: 'SelectConceptsForBudget',
  props: {
    associatedConcepts: Array,
    allConcepts: Array
  },
  methods: {
    iconPath(iconName) {
      return resolveIconPath(iconName)
    }
  }
}
</script>

<style scoped>
.select-concept-container {
  display: flex;
  width: 100%;
  justify-content: space-around;
}

.select-concept-section {
  height: 100%;
  width: 49%;
}

.all-concept-container {
  height: 90%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  overflow: auto;
}

.associated-concept {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.delete-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
