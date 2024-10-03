<!-- src/components/SuggestionForm.vue -->
<template>
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
    <div v-else class="suggestion-form card shadow-lg bg-base-100 p-6">
      <h2 class="card-title mb-4">Suggestion d'Amélioration</h2>
      <form @submit.prevent="submitSuggestion">
        <div class="form-group mb-4">
          <label for="title" class="label">
            <span class="label-text">Titre de la Suggestion</span>
          </label>
          <input
            type="text"
            v-model="title"
            id="title"
            required
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-group mb-4">
          <label for="description" class="label">
            <span class="label-text">Description</span>
          </label>
          <textarea
            v-model="description"
            id="description"
            required
            class="textarea textarea-bordered w-full"
          ></textarea>
        </div>
        <button type="submit" class="btn btn-primary" :disabled="loadingStore.loading">
          Soumettre
        </button>
      </form>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { useLoadingStore } from "../stores/loading.ts";
import { useAlertStore } from "../stores/alert.ts";
import { ref } from "vue";
import supabase from "../plugins/supabase/supabaseClient.ts";

const loadingStore = useLoadingStore();
const alertStore = useAlertStore();

const title = ref("");
const description = ref("");

const submitSuggestion = async () => {
  loadingStore.setLoading(true);

  const { error } = await supabase
    .from("todos")
    .insert([{ titre: title.value, suggestion: description.value }]);

  if (error) {
    loadingStore.$reset();
    alertStore.setAlert("Erreur lors de l'insertion", "alert-error");
  } else {
    alertStore.setAlert("Suggestion soumise avec succès !", "alert-success");
    title.value = "";
    description.value = "";
    setTimeout(() => {
      loadingStore.$reset();
      alertStore.$reset();
    }, 2000);
  }
};
</script>

