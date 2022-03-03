<template>
  <div class="demo-wrapper">
    <div class="col">
      <h2>Purchase button example:</h2>
      <p>Button with light theme</p>

      <CrossmintPayButton
        collection-title="My collection title"
        collection-description="My collection description"
        client-id="xxxxxxxx-xxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
      />
    </div>

    <div class="col">
      <h2>Status button example:</h2>
      <p>Button with dark theme</p>

      <CrossmintStatusButton
        :theme="themeLight"
        client-id="xxxxxxxx-xxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ThemeVariant } from '../src/types';
  import CrossmintPayButton from '../src/components/CrossmintPayButton.vue';
  import CrossmintStatusButton from '../src/components/CrossmintStatusButton.vue';

  const themeLight = ThemeVariant.LIGHT;
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;900&display=swap');

  html,
  body {
    margin: 0;
    padding: 0;
  }

  .demo-wrapper {
    display: flex;
    row-gap: 2rem;
    column-gap: 2rem;
    min-height: 100vh;
    align-items: center;
    background: #e2e2e2;
    flex-direction: column;
    justify-content: center;
    text-align: center;

    @media screen and (min-width: 768px) {
      flex-direction: row;
    }

    .col {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
    }

    p {
      margin: 0.5rem 0;
      font-weight: 300;
      font-size: 0.8rem;
      font-weight: 400;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI',
        Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
        sans-serif;
    }

    h2 {
      font-size: 1rem;
      font-weight: bold;
      margin-bottom: 0rem;
      font-weight: 900;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI',
        Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
        sans-serif;
    }

    button {
      margin: 1rem 0;
    }
  }
</style>
