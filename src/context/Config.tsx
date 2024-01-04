import { createContext } from "react"

interface Config {
    apiKey?: string
    baseUrl: string
}

let defaultApiKey = window.localStorage.getItem("capex-api-key")

export const ConfigContext = createContext<Config>({
    apiKey: defaultApiKey == null ? undefined : defaultApiKey,
    baseUrl: "https://content.guardianapis.com/"
})
