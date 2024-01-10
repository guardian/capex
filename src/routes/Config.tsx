import { Button, TextInput } from "@guardian/source-react-components"

import { useNavigate, useSearchParams } from "react-router-dom"
import { CapexConfig, ConfigContext } from "../context/Config"
import { useContext } from "react"

interface ConfigData {
  updateConfig: (newCfg: CapexConfig) => void
}

export default function Config({ updateConfig }: ConfigData) {

  let navigateTo = useNavigate()

  let [params, _] = useSearchParams()
  let returnTo = params.get("redirect") || "/"
  let config = useContext(ConfigContext)

  const updateApiKey = (newKey: string) => {
    updateConfig({ ...config, apiKey: newKey })
    window.localStorage.setItem("capex-api-key", newKey)
  }

  return (
    <div>
      <div><TextInput label="API key" width={30} defaultValue={config.apiKey || ""} onChange={(ev) => updateApiKey(ev.target.value) }/></div>
      <div>
	<Button
	  onClick={() => navigateTo(returnTo)}>OK</Button>
      </div>
    </div>
  )
}
