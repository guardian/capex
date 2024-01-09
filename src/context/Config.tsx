import { createContext } from "react"

export interface CapexConfig {
    apiKey: string | null
    baseUrl: string
}

export const readConfig = (): CapexConfig => {
  return {
    apiKey: window.localStorage.getItem("capex-api-key"),
    baseUrl: "https://content.guardianapis.com/"
  }
}

export const ConfigContext = createContext(readConfig())
