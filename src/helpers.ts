import { validate } from 'uuid';
import { OVERLAY_ID } from './constants';

export function validateClientId(clientId: string) {
  try {
    return validate(clientId);
  } catch (e) {
    console.error('Invalid client ID: ', e);
    return false;
  }
}

export function createPopupString(): string {
  return `height=750,width=400,left=${window.innerWidth / 2 - 200},top=${
    window.innerHeight / 2 - 375
  },resizable=yes,scrollbars=yes,toolbar=yes,menubar=true,location=no,directories=no, status=yes`;
}

export function createLoadingOverlay(): void {
  if (document.getElementById(OVERLAY_ID)) {
    return console.warn(
      'Attempting to create overlay when existing one is active.'
    );
  }

  const overlayEl = document.createElement('div');
  overlayEl.setAttribute('id', OVERLAY_ID);

  Object.assign(overlayEl.style, {
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    'z-index': '99999999',
    'background-color': 'rgba(0, 0, 0, 0.5)',
  });

  document.body.appendChild(overlayEl);
}

export function removeLoadingOverlay(): void {
  const overlayEl = document.getElementById(OVERLAY_ID);
  if (overlayEl) overlayEl.remove();
}

export function isClientSide(): boolean {
  return typeof window !== 'undefined';
}
