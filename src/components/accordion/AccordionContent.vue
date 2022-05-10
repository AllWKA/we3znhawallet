<template>
  <div>
    <button
      class="accordion-trigger"
      @click="toggleAccordionItem()"
      :aria-expanded="isActive"
      :aria-controls="`collapse${account.id}`"
    >
      <div class="accordion-container">
        <p>{{ account.lastFourCardNumber }}</p>
        <p>{{ account.currentBalance }} €</p>
      </div>
    </button>
    <button @click="addChildAccountBank(account)">Añadir sub-cuenta</button>
    <button @click="editAccountBank(account)">Editar</button>
    <button @click="deleteAccountBank(account)">Borrar</button>
    <transition name="accordion-fade">
      <div v-show="isActive" :id="`collapse${account.id}`">
        <p>{{ content }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "AccordionContent",
  props: {
    account: Object,
    content: String,
  },
  data() {
    return {
      isActive: false,
    }
  },
  methods: {
    toggleAccordionItem() {
      this.isActive = !this.isActive
    },
    async addChildAccountBank(account) {
      console.log(
        "button add new account bank pressed: ",
        "lastFourCardNumber -> " + account.lastFourCardNumber,
        "currentBalance -> " + account.currentBalance
      )
    },
    async editAccountBank(account) {
      console.log(
        "button edit pressed: ",
        "lastFourCardNumber -> " + account.lastFourCardNumber,
        "currentBalance -> " + account.currentBalance
      )
    },
    async deleteAccountBank(account) {
      console.log(
        "button delete pressed: ",
        "lastFourCardNumber -> " + account.lastFourCardNumber,
        "currentBalance -> " + account.currentBalance
      )
    },
  },
}
</script>

<style>
.accordion-trigger {
  width: 100%;
}
.accordion-container {
  display: flex;
  width: 100%;
  justify-content: space-around;
}
.accordion-fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.accordion-fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
