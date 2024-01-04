import { ParamPane } from '../components/ParamPane'
import ResultsPane from '../components/ResultsPane'
import { ShowQuery } from '../components/ShowQuery'
import { ReactElement, useContext, useEffect, useState } from 'react'
import { ConfigContext } from '../context/Config'

export interface QueryData<R> {
  initialQueryString: string,
  capiPath: string,
  resultRenderer: (result: R) => ReactElement,
}

type CapiResponse<T> = { response: T }

export function Query<Response extends { results: Result[] }, Result>({ initialQueryString, capiPath, resultRenderer }: QueryData<Result>) {
  let [params, updateParamsState] = useState(new URLSearchParams(initialQueryString))
  let [results, updateResults] = useState<Result[]>([])

  // we don't neccessarily want to keep submitting the query while it's being edited
  let [isComplete, updateIsComplete] = useState(true)

  let config = useContext(ConfigContext)

  function updateParams(newParams: URLSearchParams) {
    updateParamsState(newParams)
    window.history.pushState("", "", "?" + newParams.toString())
  }

  useEffect(() => {

    if(!isComplete) return

    // this abortcontroller stuff is how to signal to a fetch request to stop
    const controller = new AbortController()
    const signal = controller.signal

    async function submitQuery<ResponseT>(): Promise<ResponseT> {
      let paramsWithApiKey = new URLSearchParams(params)
      if(typeof config.apiKey == "string") {
	paramsWithApiKey.set("api-key", config.apiKey)
      } else {
	console.error("no api key")
      }
      let url = `${config.baseUrl}/${capiPath}?${paramsWithApiKey}`
      let res = await fetch(url, { signal })
      let body = await res.json() as CapiResponse<ResponseT>
      return body.response
    }

    console.log("submitting query")
    let p = submitQuery<Response>()
      .then(res => updateResults(res.results), (reason) => {if(reason != "aborted") throw reason })

    console.log("submitted", p)
    // this is the clean up function for the effect, returned to react
    return () => { console.log("cleaning up fetch()"); controller.abort("aborted") }
  }, [isComplete, params])

  return (
    <div className="App">
      <ShowQuery capiPath={capiPath} params={ params } />
      <ParamPane collapsed={true} params={ params } updateParams={updateParams} updateIsComplete={updateIsComplete}/>
      <ResultsPane results={results} resultRenderer={resultRenderer} />
    </div>
  )
}
