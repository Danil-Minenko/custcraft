// src/stores/ui.js
import { defineStore } from 'pinia'

// defineStore создаёт “store” — глобальное состояние
export const useUiStore = defineStore('ui', {
  state: () => ({
    showNicknameModal: false,
    selectedProduct: null
  })
})