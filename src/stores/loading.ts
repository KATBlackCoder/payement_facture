import { defineStore } from "pinia";

export const useLoadingStore = defineStore("loading", {
  state: () => {
    return {
      loading: false,
    };
  },

  actions: {
    setLoading(value: boolean) {
      this.loading = value;
    },
  },

});
