import { TextInput } from "@guardian/source-react-components"

import { ConfigContext } from "../context/Config"
import { useContext } from "react"
import { Link } from "react-router-dom"

export default function Config() {

  let config = useContext(ConfigContext)

  const updateApiKey = (newKey: string) => {
    window.localStorage.setItem("capex-api-key", newKey)
  }

  return (
    <div>
      <TextInput label="API key" width={30} defaultValue={config.apiKey} onChange={(ev) => updateApiKey(ev.target.value) }/>
      <Link to={"/"}>Done</Link>
    </div>
  )
}
