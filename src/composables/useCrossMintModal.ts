import { Ref, ref } from 'vue';

import { PayButtonConfig, SDKBaseUrl } from '../types';
import { LIB_NAME, LIB_VERSION } from './../constants';

import {
  createPopupString,
  createLoadingOverlay,
  removeLoadingOverlay,
} from '../helpers';

type MintQueryParams = {
  clientId: string;
  closeOnSuccess: string;
  collectionTitle?: string;
  collectionDescription?: string;
  collectionPhoto?: string;
  mintTo?: string;
  emailTo?: string;
  listingId?: string;
  clientName: string;
  clientVersion: string;
  mintConfig: string;
};

interface IConnectProps {
  collectionTitle: string;
  collectionDescription?: string;
  collectionPhoto?: string;
  mintTo?: string;
  emailTo?: string;
  listingId?: string;
  mintConfig?: PayButtonConfig;
}

interface IProps {
  clientId: string;
  development: boolean;
  showOverlay: boolean;
}

interface IReturn {
  connecting: Ref<boolean>;
  connect: (settings: IConnectProps) => void;
}

export default function useCrossmintModal({
  clientId,
  showOverlay = false,
  development = false,
}: IProps): IReturn {
  const connecting = ref<boolean>(false);

  function registerPopupListeners(popup: Window) {
    const timer = setInterval(() => {
      if (!popup.closed) return;

      clearInterval(timer);
      connecting.value = false;

      if (showOverlay) {
        removeLoadingOverlay();
      }
    }, 500);
  }

  const connect = (params: IConnectProps) => {
    function buildQueryString(): string {
      const mintQueryParams: MintQueryParams = {
        clientId,
        closeOnSuccess: 'false',
        clientName: LIB_NAME,
        clientVersion: LIB_VERSION,
        mintConfig: JSON.stringify(params.mintConfig),
      };

      if (params.collectionTitle) {
        mintQueryParams.collectionTitle = params.collectionTitle;
      }

      if (params.collectionDescription) {
        mintQueryParams.collectionDescription = params.collectionDescription;
      }

      if (params.collectionPhoto) {
        mintQueryParams.collectionPhoto = params.collectionPhoto;
      }

      if (params.mintTo) {
        mintQueryParams.mintTo = params.mintTo;
      }

      if (params.emailTo) {
        mintQueryParams.emailTo = params.emailTo;
      }

      if (params.listingId) {
        mintQueryParams.listingId = params.listingId;
      }

      return new URLSearchParams(mintQueryParams).toString();
    }

    const baseUrl = development ? SDKBaseUrl.DEV : SDKBaseUrl.PROD;

    const popupUrl = `${baseUrl}/signin?callbackUrl=${encodeURIComponent(
      `${baseUrl}/checkout/mint?${buildQueryString()}`
    )}`;

    connecting.value = true;

    const popup = window.open(popupUrl, 'popUpWindow', createPopupString());

    if (!popup) {
      connecting.value = false;
      console.error('Failed to open popup window');
      return;
    }

    registerPopupListeners(popup);

    if (showOverlay) {
      createLoadingOverlay();
    }
  };

  return { connecting, connect };
}
