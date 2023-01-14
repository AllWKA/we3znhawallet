<template>
  <div class="account-container">
    <div style="display: flex">
      <h1 style="text-align: center; width: 30%">Account: {{ account.cardNumbers }}</h1>

      <h1 style="text-align: center; width: 30%">Saldo: {{ account.currentBalance }} €</h1>

      <div style="display:flex;justify-content: center; align-items: center;width: 30%">
        <button style="display: flex; justify-content: center; align-items: center;width: 35%; height: 35%">
          <span style="display: flex; justify-content: center; align-items: center"
                @click="showModalCreateEditAccount = true">
            <img src="../assets/icons/file-download-outline.svg" alt="importar_excel" style="width: 24px; height: 24px">
          </span>
          <span>Importar</span>
        </button>

        <button style="display: flex; justify-content: center; align-items: center;width: 35%; height: 35%">
          <span style="display: flex; justify-content: center; align-items: center"
                @click="showModalCreateEditAccount = true">
            <img src="../assets/icons/file-upload-outline.svg" alt="exportar_excel" style="width: 24px; height: 24px">
          </span>
          <span>Exportar</span>
        </button>

        <button style="display: flex; justify-content: center; align-items: center;width: 35%; height: 35%">
          <span style="display: flex; justify-content: center; align-items: center"
                @click="showModalCreateEditAccount = true">
            <img src="../assets/icons/cog-outline.svg" alt="exportar_excel" style="width: 24px; height: 24px">
          </span>
          <span>Configuración</span>
        </button>
      </div>
    </div>

    <div class="budget-container">
      <AccountBudgetHorizontalList :budget-list="budgetList"/>
    </div>

    <div class="date-filter-container">
      <div style="display: flex">
        <p>De: </p>
        <input type="date">
        <p>Hasta: </p>
        <input type="date">
      </div>
    </div>

    <div style="border: 1px solid red; height: 70%">
      <table style="width:100%">
        <tr>
          <th>Fecha</th>
          <th>Concepto</th>
          <th>Importe</th>
          <th>Saldo</th>
        </tr>
        <tr>
          <td>12/02/1988</td>
          <td>Maria Anders</td>
          <td>13</td>
          <td>13</td>
        </tr>
        <tr>
          <td>12/02/1988</td>
          <td>Maria Anders</td>
          <td>13</td>
          <td>13</td>
        </tr>
        <tr>
          <td>12/02/1988</td>
          <td>Maria Anders</td>
          <td>13</td>
          <td>13</td>
        </tr>
        <tr>
          <td>12/02/1988</td>
          <td>Maria Anders</td>
          <td>13</td>
          <td>13</td>
        </tr>
        <tr>
          <td>12/02/1988</td>
          <td>Maria Anders</td>
          <td>13</td>
          <td>13</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import AccountBudgetHorizontalList from "@/components/accountBudgetHorizontal/AccountBudgetHorizontalList";

export default {
  name: "Account",
  components: {
    AccountBudgetHorizontalList
  },
  data() {
    return {
      account: Object,
      chart: Object,
      budgetList: []
    }
  },
  async beforeMount() {
    const accountInfo = (await this.$axios.get(`/account/${this.$route.params.accountId}`)).data

    this.account = accountInfo.account
  }
}
</script>

<style scoped>

.account-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: space-around;
}

.budget-container {
  display: flex;
  justify-content: center;
  overflow-x: auto;
  width: 100%;
}

.date-filter-container {
  display: flex;
  width: 100%;
  justify-content: flex-start;
}
</style>
