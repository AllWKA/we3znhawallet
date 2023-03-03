<template>
  <Modal :showContent="showModal">
    <div class="confirm-movement-container">
      <div class="movement-list-container">
        <h2>Movimientos repetidos</h2>

        <div class="header-container">
          <div style="width: 20%">Fecha</div>
          <div style="width: 20%">Tarjeta</div>
          <div style="width: 35%">Concepto</div>
          <div style="width: 20%">Importe</div>
          <div style="width: 5%">Divisa</div>
        </div>

        <div
            v-if="movementsProcessed &&
            movementsProcessed.repeatedMovement &&
            movementsProcessed.repeatedMovement.length"
            class="list-container"
        >
          <div v-for="(movement, i) in movementsProcessed.repeatedMovement" :key="i" class="list-row">
            <div style="width: 20%">{{ movement.Fecha }}</div>
            <div style="width: 20%">{{ movement.Tarjeta }}</div>
            <div style="width: 35%">{{ movement.Concepto }}</div>
            <div style="width: 20%">{{ movement.Importe }}</div>
            <div style="width: 5%">{{ movement.Divisa }}</div>
          </div>
        </div>

        <div v-else>No hubo movimientos repetidos</div>
      </div>

      <div class="movement-list-container">
        <h2>Movimientos a añadidos</h2>
        <div class="header-container">
          <div style="width: 20%">Fecha</div>
          <div style="width: 20%">Tarjeta</div>
          <div style="width: 35%">Concepto</div>
          <div style="width: 20%">Importe</div>
          <div style="width: 5%">Divisa</div>
        </div>

        <div v-if="movementsProcessed &&
            movementsProcessed.addedMovement &&
            movementsProcessed.addedMovement.length"
             class="list-container">
          <div v-for="(movement, i) in movementsProcessed.addedMovement" :key="i" class="list-row">
            <div style="width: 20%">{{ movement.Fecha }}</div>
            <div style="width: 20%">{{ movement.Tarjeta }}</div>
            <div style="width: 35%">{{ movement.Concepto }}</div>
            <div style="width: 20%">{{ movement.Importe }}</div>
            <div style="width: 5%">{{ movement.Divisa }}</div>
          </div>
        </div>

        <div v-else>No hubo movimientos nuevos encontrados</div>
      </div>

      <div style="display: flex; width: 90%; justify-content: flex-end">
        <button style="margin-right: 3%" @click="sendMovementsToAdd">Añadir</button>
        <button @click="closeModal">Descartar</button>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from './Modal'

export default {
  name: "ConfirmMovementsToAdd",
  components: {
    Modal
  },
  props: {
    showModal: Boolean,
    accountId: String,
    movementsProcessed: Object
  },
  methods: {
    async sendMovementsToAdd() {
      await this.$axios.post(`/account/movements/add/${this.accountId}`, this.movementsProcessed.addedMovement)

      this.closeModal()
    },
    closeModal() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>

.confirm-movement-container {
  background-color: var(--color-background);
  width: 70vw;
  height: 80vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.movement-list-container {
  width: 90%;
  max-height: 50%;
}

.header-container {
  display: flex;
  width: 100%;
  text-align: center;
}

.list-container {
  display: flex;
  width: 101%;
  height: 95%;
  overflow: auto;
  flex-direction: column;
  background-color: var(--color-surface);
}

.list-row {
  display: flex;
  width: 100%;
  text-align: center;
  background-color: #3d3837;
}

.list-row:nth-child(even) {
  background-color: #494442;
}
</style>
