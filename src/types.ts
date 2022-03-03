export enum ThemeVariant {
  DARK = 'dark',
  LIGHT = 'light',
}

export enum MintingContractType {
  ERC_721 = 'erc-721',
  CANDY_MACHINE = 'candy-machine',
  SOLANA_AUCTION = 'solana-auction',
}

export enum SDKHeaders {
  CLIENT_NAME = 'X-Client-Name',
  CLIENT_VERSION = 'X-Client-Version',
}

export enum SDKBaseUrl {
  DEV = 'http://localhost:3001',
  PROD = 'https://www.crossmint.io',
}

export interface PayButtonConfig {
  type: MintingContractType;
}
