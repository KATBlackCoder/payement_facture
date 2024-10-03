import { defineStore } from "pinia";

export const useAlertStore = defineStore("alert", {
  state: () => {
    return {
      message: "",
      type: "",
    };
  },

  actions: {
    setAlert(message: string, type: string, time: number | null = null) {
      this.message = message;
      this.type = type;

      // If time is provided and greater than 0, set a timeout to clear the alert
      if (time !== null && time > 0) {
        setTimeout(() => {
          this.$reset();
        }, time);
      }
    },
    clearAlert() {
      this.message = "";
      this.type = "";
    },
  },
});
