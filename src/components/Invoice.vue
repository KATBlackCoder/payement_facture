<template>
  <div
    id="invoice"
    class="max-w-md mx-auto p-6 bg-gray-900 text-white shadow-md rounded-lg"
  >
    <div class="flex justify-between items-center mb-4">
      <!-- Logo and Status -->
      <div class="flex items-center space-x-2">
        <!-- Placeholder for logo -->
        <div class="bg-orange-500 w-10 h-10 flex items-center justify-center">
          <span class="text-black font-bold text-xl">↑↓</span>
        </div>
        <h2 class="text-lg font-bold">Paiement enregistré !</h2>
      </div>
      <!-- Placeholder for another icon or logo -->
      <div class="bg-orange-500 w-8 h-8 flex items-center justify-center">
        <span class="text-black font-bold">_</span>
      </div>
    </div>

    <!-- Payment Details -->
    <div class="mb-4">
      <div class="flex justify-between mb-2">
        <span>Prenom</span>
        <span v-if="firstName" class="text-blue-400 font-bold">{{
          firstName
        }}</span>
      </div>
      <div class="flex justify-between mb-2">
        <span>Nom</span>
        <span v-if="lastName">{{ lastName }}</span>
      </div>
      <div class="flex justify-between font-bold">
        <span>Montant</span>
        <span v-if="paymentAmount">{{ formatCurrency(paymentAmount) }}</span>
      </div>
    </div>

    <!-- Beneficiary and Other Details -->
    <div class="mb-4">
      <div class="flex justify-between mb-2">
        <span>Date</span>
        <span>{{ new Date().toLocaleDateString("fr-ML") }}</span>
      </div>
      <div class="flex justify-between mb-2">
        <span>Référence</span>
        <span>{{ generateRandomReference() }}</span>
      </div>
    </div>
  </div>
  <!-- Alert Message with Transition -->
  <transition name="fade">
    <div v-if="alertStore.message" :class="`alert ${alertStore.type}`">
      {{ alertStore.message }}
    </div>
  </transition>
  <!-- Download PDF Button -->
  <div class="text-center mt-6">
    <button
      @click="downloadImage('invoice')"
      class="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
    >
      Télécharger le PDF
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import generateRandomReference from "../plugins/configs/generateRandomReference.ts";
import downloadImage from "../plugins/configs/downloadImage.ts";
import { useAlertStore } from "../stores/alert.ts";

const alertStore = useAlertStore();

const route = useRoute();

const firstName = route.query.firstname;
const lastName = route.query.lastname;
const paymentAmount = route.query.paymentamount;

function formatCurrency(value: any) {
  return new Intl.NumberFormat("fr-ML", {
    style: "currency",
    currency: "XOF",
  }).format(value);
}


</script>
