<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-4">Factures</h1>

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

    <!-- No Invoices Found -->
    <div
      v-if="!loadingStore.loading && invoices.length === 0"
      class="text-center"
    >
      <p>Pas de donnée</p>
    </div>

    <!-- Invoices Table -->
    <div
      v-if="!loadingStore.loading && invoices.length > 0"
      class="overflow-x-auto"
    >
      <!-- Export to CSV Button -->
      <div
        v-if="!loadingStore.loading && invoices.length > 0"
        class="mt-4 text-right"
      >
        <button @click="exportToCSV" class="btn btn-primary">
          Export to CSV
        </button>
      </div>

      <table class="table w-full">
        <thead>
          <tr>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Somme</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="invoice in invoices" :key="invoice.id">
            <td>{{ invoice.firstname }}</td>
            <td>{{ invoice.lastname }}</td>
            <td>{{ invoice.paymentamount }}</td>
            <td>{{ invoice.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useLoadingStore } from "../stores/loading.ts";
import { useAlertStore } from "../stores/alert.ts";
import supabase from "../plugins/supabase/supabaseClient.ts";

const loadingStore = useLoadingStore();
const alertStore = useAlertStore();
const invoices = ref();

loadingStore.setLoading(true);

// Function to fetch invoices from Supabase
const fetchInvoices = async () => {
  const { data, error } = await supabase.from("payments").select();

  loadingStore.$reset();

  if (error) {
    alertStore.setAlert("Error fetching invoices", "alert-error");
  } else {
    invoices.value = data;
  }
};

// Export invoices to CSV with alert messages
const exportToCSV = () => {
  try {
    const headers = ["Prenom", "Nom", "Somme", "Date"];
    const rows = invoices.value.map(
      (invoice: {
        firstname: any;
        lastname: any;
        paymentamount: any;
        date: any;
      }) => [
        invoice.firstname,
        invoice.lastname,
        invoice.paymentamount,
        invoice.date,
      ]
    );

    const csvContent = [
      headers.join(","),
      ...rows.map((row: any[]) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "invoices.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alertStore.setAlert("Invoices exported successfully!", "alert-success");
  } catch (error) {
    alertStore.setAlert("Failed to export invoices.", "alert-error");
  } finally {
    setTimeout(() => {
      loadingStore.$reset();
      alertStore.$reset();
    }, 2000);
  }
};

// Fetch invoices when the component is mounted
onMounted(() => {
  fetchInvoices();
});
</script>

<style scoped>
/* Custom styles if necessary */
</style>
