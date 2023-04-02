import { defineStore } from 'pinia'

export const useSocketStore = defineStore({
  id: 'socket',
  state: () => ({
    connected: false
  }),
  getters: {
    connected: (state) => {
      return state.connected
    }
  },
  actions: {
    changeConnected(newValue: boolean) {
      this.$patch({ connected: newValue })
    }
  }
})
