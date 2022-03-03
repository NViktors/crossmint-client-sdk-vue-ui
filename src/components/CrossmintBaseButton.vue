<template>
  <button :class="classList" class="crossmint-btn">
    <img
      alt="Crossmint logo"
      src="https://www.crossmint.io/assets/crossmint/logo.png"
    />
    <slot />
  </button>
</template>

<script setup lang="ts">
  import { computed, ComputedRef, PropType } from 'vue';
  import { ThemeVariant } from '../types';

  const props = defineProps({
    theme: {
      type: String as PropType<ThemeVariant>,
      default: ThemeVariant.DARK,
    },
  });

  const classList: ComputedRef<string[]> = computed<string[]>((): string[] => {
    return props.theme === ThemeVariant.DARK ? ['is-dark'] : [];
  });
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@900&display=swap');

  button.crossmint-btn {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;

    border: none;
    outline: none;
    border-radius: 0.5rem;
    padding: 0.875rem 0.875rem;
    transition: opacity ease-in-out 0.25s;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);

    font-weight: 900;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

    color: #1e1e1e;
    background: #fff;

    &.is-dark {
      color: #fff;
      background: #1e1e1e;
    }

    &:hover:enabled {
      opacity: 0.6;
      cursor: pointer;
    }

    > img {
      width: 21px;
      height: 21px;
      margin-right: 0.875rem;
    }
  }
</style>
