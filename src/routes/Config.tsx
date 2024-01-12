import { Button, TextInput } from "@guardian/source-react-components"

import { useNavigate, useSearchParams } from "react-router-dom"
import { CapexConfig, ConfigContext } from "../context/Config"
import { useContext, useState } from "react"

interface ConfigData {
  updateConfig: (newCfg: CapexConfig) => void
}

export default function Config({ updateConfig }: ConfigData) {

  let navigateTo = useNavigate()

  let [params, _] = useSearchParams()
  let returnTo = params.get("redirect") || "/"
  let config = useContext(ConfigContext)

  let [editedConfig, updateEditedConfig] = useState(config)

  const updateApiKey = (newKey: string) => {
    updateEditedConfig((oldCfg) => ({ ...oldCfg, apiKey: newKey }))
  }

  const updateBaseUrl = (newUrl: string) => {
    updateEditedConfig((oldCfg) => ({ ...oldCfg, baseUrl: newUrl }))
  }

  return (
    <div>
      <div>
	<TextInput label="API key" width={30} defaultValue={config.apiKey || ""} onChange={(ev) => updateApiKey(ev.target.value) }/>
	<TextInput label="API url" width={30} defaultValue={config.baseUrl} onChange={(ev) => updateBaseUrl(ev.target.value) }/>
      </div>
      <div>
	<Button
	  onClick={() => { updateConfig(editedConfig); navigateTo(returnTo) } }>OK</Button>
      </div>
    </div>
  )
}
