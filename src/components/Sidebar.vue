<template>
  <div class="min-h-screen flex flex-col text-center w-auto bg-base-200 p-4">
    <h2 class="text-2xl font-bold mb-4">Navigation</h2>
    <ul class="menu bg-base-200 rounded-box w-56">
      <li class="m-2">
        <RouterLink to="/" class="btn btn-link"
          ><button class="btn btn-outline btn-primary">Home</button></RouterLink
        >
      </li>
      <li class="m-2">
        <RouterLink to="/allinvoice" class="btn btn-link"
          ><button class="btn btn-outline btn-primary">Payements</button></RouterLink
        >
      </li>
      <li class="m-2">
        <RouterLink to="/suggestion" class="btn btn-link"
          ><button class="btn btn-outline btn-primary">Suggestion</button></RouterLink
        >
      </li>
    </ul>
  </div>
</template>

<script></script>
