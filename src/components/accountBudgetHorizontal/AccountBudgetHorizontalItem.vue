<template>
  <div class="account-budget-horizontal-item-container">
    <h3>{{ budget.name }}</h3>

    <ProgressBar
        :progress="budget.currentSpent"
        :total="budget.maxExpense"
        progress-color="#4C7040"
        total-color="#4C6B8A"
    />
  </div>
</template>

<script>
import ProgressBar from '../ProgressBar'

export default {
  name: 'AccountBudgetHorizontalItem',
  components: {
    ProgressBar
  },
  props: {
    budget: Object
  }
}
</script>

<style scoped>

.account-budget-horizontal-item-container {
  display: flex;
  flex-direction: column;
  margin-left: 3%;
  margin-right: 3%;
  min-width: 280px;
  justify-content: center;
  align-items: center;
}

</style>
