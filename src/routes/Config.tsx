import { Button, TextInput } from "@guardian/source-react-components"

import { ConfigContext } from "../context/Config"
import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function Config() {

  let config = useContext(ConfigContext)

  let navigateTo = useNavigate()

  const updateApiKey = (newKey: string) => {
    window.localStorage.setItem("capex-api-key", newKey)
  }

  return (
    <div>
      <p><TextInput label="API key" width={30} defaultValue={config.apiKey} onChange={(ev) => updateApiKey(ev.target.value) }/></p>
      <p><Button onClick={() => navigateTo("/")}>OK</Button></p>
    </div>
  )
}
