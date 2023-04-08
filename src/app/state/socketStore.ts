import { defineStore } from 'pinia'

export const useSocketStore = defineStore('socketStore', {
  state: () => ({ connected: false }),
  getters: {
    getConnected: (state) => state.connected
  },
  actions: {
    setConnected(newValue: boolean) {
      this.connected = newValue
    }
  }
})
