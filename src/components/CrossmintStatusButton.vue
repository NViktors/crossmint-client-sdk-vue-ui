<template>
  <CrossmintBaseButton :theme="theme" :disabled="isDisabled" @click="onClick">
    {{ content }}
  </CrossmintBaseButton>
</template>

<script setup lang="ts">
  import { computed, ComputedRef, PropType } from 'vue';
  import { SDKBaseUrl, ThemeVariant } from '../types';

  import useCrossmintStatus, {
    OnboardingRequestStatusResponse,
  } from '../composables/useCrossMintStatus';
  import CrossmintBaseButton from './CrossmintBaseButton.vue';

  const props = defineProps({
    clientId: {
      type: String,
      required: true,
    },
    auctionId: {
      type: String,
      default: undefined,
    },
    development: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String as PropType<ThemeVariant>,
      default: ThemeVariant.DARK,
    },
  });

  const isDisabled: ComputedRef<boolean> = computed<boolean>((): boolean => {
    return status.value !== OnboardingRequestStatusResponse.WAITING_SUBMISSION;
  });

  const status = useCrossmintStatus({ ...props });

  const content: ComputedRef<string> = computed<string>((): string => {
    switch (status.value) {
      case OnboardingRequestStatusResponse.INVALID:
        return 'Invalid clientId';
      case OnboardingRequestStatusResponse.WAITING_SUBMISSION:
        return 'Click here to setup CrossMint';
      case OnboardingRequestStatusResponse.PENDING:
        return 'Your application is under review';
      case OnboardingRequestStatusResponse.ACCEPTED:
        return "You're good to go!";
      case OnboardingRequestStatusResponse.REJECTED:
        return 'Your application was rejected';
      default:
        throw new Error('Unknown status.');
    }
  });

  async function onClick() {
    if (status.value !== OnboardingRequestStatusResponse.WAITING_SUBMISSION) {
      return;
    }

    const baseUrl = props.development ? SDKBaseUrl.DEV : SDKBaseUrl.PROD;
    let params: { [key: string]: string } = {};

    if (props.clientId) params.clientId = props.clientId;
    if (props.auctionId) params.auctionId = props.auctionId;

    const qs = new URLSearchParams(params).toString();
    window.open(`${baseUrl}/developers/onboarding?${qs}`, '_blank');
  }
</script>
