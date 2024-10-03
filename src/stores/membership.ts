import { defineStore } from "pinia";

export const useMembershipStore = defineStore("membership", {
  state: () => ({
    firstName: "",
    lastName: "",
    paymentAmount: 0,
  }),

  getters: {
    // Checks if all fields are correctly filled
    isComplete(state): boolean {
      return state.firstName !== "" && state.lastName !== "" && state.paymentAmount > 0;
    },

    // Checks if the first and last name are valid using a regex
    isCorrectName(state): boolean {
      const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+([ '-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
      return (
        nameRegex.test(state.firstName) && nameRegex.test(state.lastName)
      );
    },
  },
});

