<template>
  <div class="account-container">
    <div style="display: flex">
      <h1 style="text-align: center; width: 30%">Account: {{ account.cardNumbers }}</h1>

      <h1 style="text-align: center; width: 30%">Saldo: {{ account.currentBalance }} €</h1>

      <div style="display:flex;justify-content: center; align-items: center;width: 30%">
        <button @click="importFile"
                style="display: flex; justify-content: center; align-items: center;width: 35%; height: 35%">
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

      <input type="file" style="display: none" id="importInput" @change="importFileChanged">
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

    <div style="height: 70%; overflow: auto">
      <!-- TODO: use divs -->
      <table style="width:100%">
        <tr style="text-align: center">
          <th>Fecha</th>
          <th>Concepto</th>
          <th>Importe</th>
          <th>Disponible</th>
        </tr>

        <tr v-for="(movement, i) in movements" :key="i" style="text-align: center">
          <td>{{ movement.Fecha }}</td>
          <td style="text-align: justify">{{ movement.Concepto }}</td>
          <td>{{ movement.Importe }} {{ movement.Divisa }}</td>
          <td>{{ movement.Disponible }}  {{ movement.Divisa }}</td>
        </tr>
      </table>
    </div>

    <ConfirmMovementsToAdd
        :showModal="showConfirmMovements"
        :movementsProcessed="movementsProcessed"
        :account-id="accountId.toString()"
        @close="closeConfirmMovementsModal"/>
  </div>
</template>

<script>
import AccountBudgetHorizontalList from "@/components/accountBudgetHorizontal/AccountBudgetHorizontalList";
import ConfirmMovementsToAdd from "@/components/modal/ConfirmMovementsToAdd";

export default {
  name: "Account",
  components: {
    AccountBudgetHorizontalList,
    ConfirmMovementsToAdd
  },
  data() {
    return {
      account: {},
      accountId: '',
      movements: [],
      chart: {},
      movementsProcessed: {},
      budgetList: [],
      showConfirmMovements: false
    }
  },
  methods: {
    importFile() {
      const input = document.getElementById('importInput')

      input.click()
    },
    async importFileChanged(e) {
      const file = e.target.files[0];

      const formData = new FormData();

      formData.append("image", file);

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
    },
    closeConfirmMovementsModal() {
      this.updateAccountInfo()

      this.showConfirmMovements = false
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
