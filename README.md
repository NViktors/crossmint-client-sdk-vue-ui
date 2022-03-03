# Crossmint.io Client SDK for Vue.js

The Crossmint SDK allows you to offer wallet-less credit card purchases on your NFT drop. It takes 5 lines of code and 5 min to integrate, and is free to use for the seller. You’ll get the sales proceeds in SOL/ETH as if the user was paying with their own wallet.

Supported chains:

- Solana
- Polygon (for docs: contact us at sales at crossmint.io)
- Ethereum L1 (end of March 2021)

To get started:

1. Fill out our form in https://www.crossmint.io/developers/onboarding (we'll review your project in under 24hr!)
2. Follow the instructions below to integrate with your code

## Demo of the user experience:

https://vimeo.com/671525311

---

## Quick Setup (Vue.js - Vite / Vue CLI)

### 1. Install

```shell
yarn add crossmint-client-sdk-vue-ui
```

### 2. Set up

Go to file where you want to integrate Crossmint button. For example, App.vue.

There, just import the Pay with `CrossmintPayButton`, and add it in the UI.

**Important**: If you have Candy Machine UI, be sure to test that the Crossmint button is visible even if a user didn't connect their wallet! Else, your users without wallets won't be able to use it.

```vue
<script>
  import { CrossmintPayButton } from 'crossmint-client-sdk-vue-ui';
</script>

<template>
  <CrossmintPayButton
    client-id="<YOUR_CLIENT_ID>"
    collection-title="<TITLE_FOR_YOUR_COLLECTION>"
    collection-description="<DESCRIPTION_OF_YOUR_COLLECTION>"
    collection-photo="<OPT_URL_TO_PHOTO_COVER>"
  />
</template>
```

Finally, make sure you replace the following values in the CrossmintPayButton component:

- `<TITLE_FOR_YOUR_COLLECTION>`: Example: "My NFT collection"
- `<DESCRIPTION_OF_YOUR_COLLECTION>`: Example: "The most fun community of 999 generative art monkeys in Solana"
- `<OPT_URL_TO_PHOTO_COVER>`: Full URL to an image for your collection. Example: "https://i.picsum.photos/id/542/200/300.jpg?hmac=qD8M4ejDPlEc69pGT21BzB7CDiWOcElb_Ke7V8POjm8"
- `<YOUR_CLIENT_ID>`: This is the clientId you received after filling in [the onboarding form](https://www.crossmint.io/developers/)

---

## Components

### `CrossmintPayButton` _required_

CrossmintPayButton is a button component that is used to trigger the opening of the CrossMint popup and modal overlay.

| propName              | default     | required | description                                                                                  |
| --------------------- | ----------- | -------- | -------------------------------------------------------------------------------------------- |
| clientId              | `undefined` | `true`   | Your client integration identifier                                                           |
| collectionTitle       | `undefined` | `false`  | This will be shown to the user during the checkout process. Max length: 120                  |
| collectionDescription | `undefined` | `false`  | This will be shown to the user during the checkout process. Max length: 24                   |
| collectionPhoto       | `undefined` | `false`  | This will be shown to the user during the checkout process. Preferred resolution: 200x200 px |
| theme                 | `dark`      | `false`  | Use this to specify one of our default themes. Can be `light`, `dark`                        |
| ...props              | `undefined` | `false`  | All valid html button props can be added to the button                                       |

### `CrossmintStatusButton`

CrossmintStatusButton is a button component that is used to display Crossmint onboarding status. Normally shouldn't be visible to page visitors.

| propName | default     | required | description                                                           |
| -------- | ----------- | -------- | --------------------------------------------------------------------- |
| clientId | `undefined` | `true`   | Your client integration identifier                                    |
| theme    | `dark`      | `false`  | Use this to specify one of our default themes. Can be `light`, `dark` |
| ...props | `undefined` | `false`  | All valid html button props can be added to the button                |

## Build from Source

1. Clone the project:

```shell
git clone https://github.com/NViktors/crossmint-client-sdk-vue-ui.git
```

2. Install dependencies:

```shell
cd crossmint-client-sdk-vue-ui
yarn install
```

3. Build all packages:

```shell
yarn build
```

4. Run demo locally for preview:

```shell
yarn demo
```

TODO: Tests..?
