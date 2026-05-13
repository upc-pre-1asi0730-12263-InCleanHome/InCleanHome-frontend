<script setup>
</script>
<template>
  <div class="container">
    <div class="card">
      <h1>Select Account Type</h1>

      <div class="form-actions" style="grid-template-columns: 1fr;">
        <router-link to="/register-client" style="margin-bottom: 0.5rem;">
          <button class="btn btn-primary" style="margin-top: 0;">Client Account</button>
        </router-link>

        <router-link to="/register-worker">
          <button class="btn btn-primary" style="margin-top: 0;">Worker Account</button>
        </router-link>
      </div>
      <router-link to="/"><button type="button" class="btn btn-secondary">Back</button></router-link>
    </div>
  </div>

</template>