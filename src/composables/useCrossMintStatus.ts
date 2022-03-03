import { Ref, ref, watchEffect } from 'vue';

import { validateClientId } from './../helpers';
import { SDKBaseUrl, SDKHeaders } from './../types';
import { LIB_VERSION, LIB_NAME } from './../constants';

export enum OnboardingRequestStatusResponse {
  WAITING_SUBMISSION = 'waiting-submission',
  PENDING = 'pending',
  REJECTED = 'rejected',
  ACCEPTED = 'accepted',
  INVALID = 'invalid',
}

export interface CrossMintStatusContextState {
  clientId: string;
  auctionId?: string;
  hideMintOnInactiveClient: boolean;
  status: OnboardingRequestStatusResponse;
}

interface IProps {
  clientId: string;
  development: boolean;
}

export default function useCrossmintStatus({
  clientId,
  development,
}: IProps): Ref<OnboardingRequestStatusResponse> {
  const status = ref<OnboardingRequestStatusResponse>(
    OnboardingRequestStatusResponse.WAITING_SUBMISSION
  );

  async function fetchClientIntegration() {
    if (!clientId || clientId === '' || clientId === '<YOUR_CLIENT_ID>') {
      return console.error(
        'You must enter your own Crossmint client ID in <CrossmintPayButton clientId=XXX>'
      );
    }

    if (!validateClientId(clientId)) {
      console.error(
        'The clientId passed to is invalid. Make sure to pass the clientId \
        obtained from the crossmint team, with format XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXX'
      );
      return;
    }

    const baseUrl = development ? SDKBaseUrl.DEV : SDKBaseUrl.PROD;
    const statusUrl = `${baseUrl}/api/crossmint/onboardingRequests/${clientId}/status`;

    const res = await fetch(statusUrl, {
      headers: {
        [SDKHeaders.CLIENT_NAME]: LIB_NAME,
        [SDKHeaders.CLIENT_VERSION]: LIB_VERSION,
      },
    });

    if (res.status === 200) {
      const resData: {
        clientId: string;
        status: OnboardingRequestStatusResponse;
      } = await res.json();

      status.value = resData.status;
    } else {
      if (status.value !== OnboardingRequestStatusResponse.INVALID) {
        status.value = OnboardingRequestStatusResponse.INVALID;
      }
    }
  }

  watchEffect(async (onCleanup) => {
    await fetchClientIntegration();

    const interval: NodeJS.Timer = setInterval(() => {
      fetchClientIntegration();
    }, 60 * 1000);

    onCleanup(() => clearInterval(interval));
  });

  return status;
}
