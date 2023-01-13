<template>
  <div class="account-budget-horizontal-list-container">
    <div v-if="budgetList !== undefined && budgetList.length" class="horizontal-list">
      <AccountBudgetHorizontalItem v-for="budget in budgetList" :key="budget.id" :budget="budget"/>
    </div>
    <div v-else>No hay presupuestos creados</div>
  </div>
</template>

<script>
import AccountBudgetHorizontalItem from "@/components/accountBudgetHorizontal/AccountBudgetHorizontalItem";

export default {
  name: "AccountBudgetHorizontalList",
  components: {
    AccountBudgetHorizontalItem
  },
  props: {
    budgetList: Array
  }
}
</script>

<style scoped>

.account-budget-horizontal-list-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.horizontal-list {
  display: flex;
  width: 95%;
  overflow-x: scroll;
}

</style>
