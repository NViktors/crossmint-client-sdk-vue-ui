<template>
  <CrossmintBaseButton v-if="isVisible" :theme="theme" @click="onClick">
    {{ content }}
  </CrossmintBaseButton>
</template>

<script setup lang="ts">
  import { computed, ComputedRef, PropType } from 'vue';

  import CrossmintBaseButton from './CrossmintBaseButton.vue';
  import useCrossmintModal from '../composables/useCrossMintModal';
  import { MintingContractType, PayButtonConfig, ThemeVariant } from '../types';

  import useCrossmintStatus, {
    OnboardingRequestStatusResponse,
  } from '../composables/useCrossMintStatus';

  const props = defineProps({
    // Mandatory props
    clientId: {
      type: String,
      required: true,
    },
    collectionTitle: {
      type: String,
      required: true,
    },

    // Optional props
    collectionDescription: {
      type: String,
      default: undefined,
    },
    collectionPhoto: {
      type: String,
      default: undefined,
    },
    theme: {
      type: String as PropType<ThemeVariant>,
      default: ThemeVariant.LIGHT,
    },
    mintTo: {
      type: String,
      default: undefined,
    },
    emailTo: {
      type: String,
      default: undefined,
    },
    listingId: {
      type: String,
      default: undefined,
    },
    development: {
      type: Boolean,
      default: false,
    },
    showOverlay: {
      type: Boolean,
      default: true,
    },
    payText: {
      type: String,
      default: 'Buy with credit card',
    },
    connectingText: {
      type: String,
      default: 'Connecting ...',
    },
    mintConfig: {
      type: Object as PropType<PayButtonConfig>,
      default: () => ({
        type: MintingContractType.CANDY_MACHINE,
      }),
    },
    hideMintOnInactiveClient: {
      type: Boolean,
      default: false,
    },
  });

  const status = useCrossmintStatus({ ...props });
  const { connecting, connect } = useCrossmintModal({ ...props });

  const content: ComputedRef<string> = computed<string>((): string => {
    return connecting.value ? props.connectingText : props.payText;
  });

  const isVisible: ComputedRef<boolean> = computed<boolean>((): boolean => {
    if (!props.hideMintOnInactiveClient) return true;
    return status.value === OnboardingRequestStatusResponse.ACCEPTED;
  });

  function onClick(): void {
    if (connecting.value) {
      return;
    }

    if (props.collectionTitle === '<TITLE_FOR_YOUR_COLLECTION>') {
      throw new Error(
        'No collection title specified. Please add a collection \
        title to your <CrossmintPayButton />'
      );
    }

    if (props.collectionDescription === '<DESCRIPTION_OF_YOUR_COLLECTION>') {
      throw new Error(
        'No collection description specified. Please add a collection \
         description to your <CrossmintPayButton />'
      );
    }

    if (props.collectionPhoto === '<OPT_URL_TO_PHOTO_COVER>') {
      throw new Error(
        'No collection photo specified. Please add a collection \
        photo to your <CrossmintPayButton />'
      );
    }

    connect({ ...props });
  }
</script>
