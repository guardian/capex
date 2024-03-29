import { useContext } from "react"
import "./ShowQuery.css"
import { ConfigContext } from "../context/Config"

interface ShowQueryData {
  params: URLSearchParams
  capiPath: String
}

export function ShowQuery({ params, capiPath }: ShowQueryData) {
  let config = useContext(ConfigContext)
  const paramsWithApiKey = new URLSearchParams(params)
  if(config.apiKey) paramsWithApiKey.set("api-key", config.apiKey)
  return (
    <div id="showQuery" className="pane">{capiPath}?{params.toString()} <a href={`${config.baseUrl}${capiPath}?${paramsWithApiKey.toString()}`}>🛠</a></div>
  )
}
