<template>
  <Modal :show-content="showContent">
    <div class="main-container">
      <div style="display: flex; justify-content: center; align-items: center">
        <h2 style="text-align: center; width: 100%">{{ createMode ? 'Crear' : 'Editar' }} Cuenta</h2>

        <span class="close" @click="closeModal">
          <img src="../../assets/icons/close.svg" alt="close-icon">
        </span>
      </div>

      <form class="account-form-content" id="card-form">
        <input
            type="number"
            v-model="cardNumbers"
            maxlength="4"
            minlength="4"
            placeholder="últimos 4 números de la cuenta"
            required
            style="width: 90%"
            min="0000"
            max="9999"
        />

        <input
            type="number"
            v-model="currentBalance"
            placeholder="saldo actual de la cuenta"
            required
            style="width: 90%"
        />

        <button :disabled="validateSubmitPin" @click="submit">{{ createMode ? 'Crear' : 'Editar' }}</button>
      </form>
    </div>
  </Modal>
</template>

<script>
import Modal from '@/components/modal/Modal'

export default {
  name: "ModalCreateEditAccount",
  components: {
    Modal
  },
  props: {
    showContent: Boolean,
    account: Object
  },
  data() {
    return {
      cardNumbers: '',
      currentBalance: 0,
      createMode: false
    }
  },
  methods: {
    closeModal() {
      this.$emit("close")

      this.resetForm()
    },
    submit(e) {
      e.preventDefault()

      this.$emit('submit', {
        method: this.createMode ? 'POST' : 'PUT',
        account: {
          cardNumbers: this.cardNumbers,
          currentBalance: this.currentBalance
        }
      })

      this.resetForm()

      this.$emit("close")
    },
    resetForm(){
      if (this.account) {
        this.cardNumbers = this.account.cardNumbers
        this.currentBalance = this.account.currentAccountBalance
      } else {
        this.cardNumbers = ''
        this.currentBalance = 0
        this.createMode = true
      }
    }
  },
  computed: {
    validateSubmitPin() {
      return this.cardNumbers.length === 0
    }
  },
  mounted() {
    if (this.account) {
      this.cardNumbers = this.account.cardNumbers
      this.currentBalance = this.account.currentAccountBalance
    } else {
      this.createMode = true
    }
  }
}
</script>

<style scoped>
.main-container {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 30%;
  height: 30%;
}

.account-form-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 50%;
}
</style>
