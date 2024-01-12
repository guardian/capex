import { createContext } from "react"

const configParamName = "capex-config"

export interface CapexConfig {
    apiKey: string | null
    baseUrl: string
}

const defaultConfig: CapexConfig = {
  apiKey: null,
  baseUrl: "https://content.guardianapis.com/"
}

export const readConfig = (): CapexConfig => {
  let storedConfig = window.localStorage.getItem(configParamName)
  if(storedConfig) {
    return JSON.parse(storedConfig)
  } else {
    return defaultConfig
  }
}

export const storeConfig = (config: CapexConfig) => {
  window.localStorage.setItem(configParamName, JSON.stringify(config))
}

export const ConfigContext = createContext(readConfig())
