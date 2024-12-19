/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_STORE_NAME: string
  readonly VITE_CURRENCY: string
  readonly VITE_TAX_RATE: string
  readonly VITE_SHIPPING_COST: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
