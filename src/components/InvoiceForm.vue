<template>
  <div class="card w-full max-w-sm shadow-lg bg-base-100">
    <!-- Alert Message with Transition -->
    <transition name="fade">
      <div v-if="alertStore.message" :class="`alert ${alertStore.type}`">
        {{ alertStore.message }}
      </div>
    </transition>

    <!-- Loading Indicator with Transition -->
    <transition name="fade">
      <div v-if="loadingStore.loading" class="flex justify-center my-4">
        <span class="loading loading-spinner loading-lg"></span>
      </div>
    </transition>

    <div class="card-body">
      <h2 class="card-title">Information du payement</h2>

      <!-- First Name -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">Prenom</span>
        </label>
        <input
          v-model="firstName"
          type="text"
          placeholder="Enter your first name"
          class="input input-bordered"
          required
        />
      </div>

      <!-- Last Name -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">Nom</span>
        </label>
        <input
          v-model="lastName"
          type="text"
          placeholder="Enter your last name"
          class="input input-bordered"
          required
        />
      </div>

      <!-- Payment Amount -->
      <div class="form-control">
        <label class="label">
          <span class="label-text">Somme</span>
        </label>
        <input
          v-model="paymentAmount"
          type="number"
          placeholder="Enter the payment amount"
          class="input input-bordered"
          required
        />
      </div>

      <!-- Submit Button -->
      <div class="form-control mt-6">
        <button @click="submitInvoiceForm(firstName, lastName, paymentAmount)" class="btn btn-primary">Envoyer</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import submitInvoiceForm from "../plugins/configs/submitInvoiceForm.ts";

import { useLoadingStore } from "../stores/loading.ts";
import { useAlertStore } from "../stores/alert.ts";
import { ref } from "vue";

const loadingStore = useLoadingStore();
const alertStore = useAlertStore();

const firstName = ref("");
const lastName = ref("");
const paymentAmount = ref(0);

</script>

<style scoped>
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0; 
}
</style>
