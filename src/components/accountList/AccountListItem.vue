<template>
  <div style="width: 100%; height: 100%; border: 1px solid black">
    <div class="accordion-trigger"
         @click="toggleAccordionItem()"
         :aria-expanded="isActive"
         :aria-controls="`collapse${account.id}`">
      <div class="accordion-container">
        <div style="width: 50%; display: flex; justify-content: space-around; align-items: center">
          <p>Cuenta: {{ account.lastFourCardNumber }}</p>

          <p>Saldo: {{ account.currentBalance }} €</p>
        </div>

        <div style="width: 50%; display: flex; justify-content: space-around; align-items: center">
          <button>
            <span class="close">
              <img :src="addSubAccountIconPath" alt="close-icon">
            </span>
          </button>

          <button>
            <span class="close">
              <img :src="editAccountIconPath" alt="close-icon">
            </span>
          </button>

          <button>
            <span class="close">
              <img :src="deleteAccountIconPath" alt="close-icon">
            </span>
          </button>
        </div>
      </div>
    </div>

    <transition name="accordion-fade">
      <div v-show="isActive" :id="`collapse${account.id}`">
        <p>{{ content }}</p>
      </div>
    </transition>
  </div>
</template>

<script>
import resolveIconPath from '../../helpers/icon-resolver'

export default {
  name: "AccountListItem",
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
    }
  },
  computed: {
    addSubAccountIconPath(){
      return resolveIconPath('plus-circle')
    },
    editAccountIconPath(){
      return resolveIconPath('pencil')
    },
    deleteAccountIconPath(){
      return resolveIconPath('trash-can')
    }
  }
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
</style>
