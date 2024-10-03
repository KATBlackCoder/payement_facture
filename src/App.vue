<template>
  <div class="flex">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content Area -->
    <div class="flex-1 p-4">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue'

</script>

<style>
/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
