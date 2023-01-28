<template>
  <Modal :show-content="showContent">
    <div class="create-edit-container">
      <div style="display: flex; justify-content: center; align-items: center">
        <h2 style="text-align: center; width: 100%">{{ createMode ? 'Crear' : 'Editar' }} Cuenta</h2>

        <span class="close" @click="closeModal">
          <img src="../../assets/icons/close.svg" alt="close-icon">
        </span>
      </div>

      <div
          style="display: flex; flex-direction: column; justify-content: space-around;align-items: center;height: 90%; width: 100%">
        <div style="display: flex; width: 80%;">
          <label style="margin-right: 3%">Tipo</label>

          <select name="type" v-model="type">
            <option value="account">Cuenta</option>
            <!--<option value="card">Tarjeta</option>-->
          </select>
        </div>

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
        <!--TODO: import movements directly and use this just to create account-->
        <button :disabled="validateSubmitPin" @click="submit">{{ createMode ? 'Crear' : 'Editar' }}</button>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from '@/components/modal/Modal'

export default {
  name: 'ModalCreateEditAccount',
  components: {
    Modal
  },
  props: {
    showContent: Boolean,
    account: Object
  },
  data() {
    return {
      cardNumbers: '0000',
      createMode: false,
      type: 'account'
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')

      this.resetForm()
    },
    submit(e) {
      e.preventDefault()

      this.$emit('submit', {
        method: this.createMode ? 'POST' : 'PUT',
        account: {
          cardNumbers: this.cardNumbers,
          type: this.type
        }
      })

      this.resetForm()

      this.$emit('close')
    },
    resetForm() {
      if (this.account) {
        this.cardNumbers = this.account.cardNumbers
      } else {
        this.cardNumbers = ''
        this.createMode = true
      }
    }
  },
  computed: {
    validateSubmitPin() {
      if (!this.cardNumbers) {
        return false
      }
      return this.cardNumbers.length === 0
    }
  },
  beforeMount() {
    if (this.account) {
      this.cardNumbers = this.account.cardNumbers
    } else {
      this.createMode = true
    }
  }
}
</script>

<style scoped>
.create-edit-container {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 30%;
  height: 30%;
}
</style>
