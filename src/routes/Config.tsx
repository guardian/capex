import { Button, TextInput } from "@guardian/source-react-components"

import { useLoaderData, useNavigate } from "react-router-dom"
import { ConfigContext } from "../context/Config"
import { useContext } from "react"

export default function Config() {

  let navigateTo = useNavigate()

  let config = useContext(ConfigContext)

  const updateApiKey = (newKey: string) => {
    window.localStorage.setItem("capex-api-key", newKey)
  }

  return (
    <div>
      <div><TextInput label="API key" width={30} defaultValue={config.apiKey || ""} onChange={(ev) => updateApiKey(ev.target.value) }/></div>
      <div>
	<Button
	  onClick={() => navigateTo("/" + window.location.search)}>OK</Button>
      </div>
    </div>
  )
}
