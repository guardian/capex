import { ParamPane } from '../components/ParamPane'
import ResultsPane from '../components/ResultsPane'
import { ShowQuery } from '../components/ShowQuery'
import { ReactElement, useEffect, useState } from 'react'

export interface QueryData<R> {
  initialQueryString: string,
  capiPath: string,
  resultRenderer: (result: R) => ReactElement,
  apiKey: string,
  baseUrl: string
}

type CapiResponse<T> = { response: T }

export function Query<Response extends { results: Result[] }, Result>({ initialQueryString, capiPath, resultRenderer, baseUrl, apiKey }: QueryData<Result>) {
  let [params, updateParamsState] = useState(new URLSearchParams(initialQueryString))
  let [results, updateResults] = useState<Result[]>([])

  function updateParams(newParams: URLSearchParams) {
    updateParamsState(newParams)
  }

  useEffect(() => {

    // this abortcontroller stuff is how to signal to a fetch request to stop
    const controller = new AbortController()
    const signal = controller.signal

    async function submitQuery<ResponseT>(): Promise<ResponseT> {
      let paramsWithApiKey = new URLSearchParams(params)
      paramsWithApiKey.set("api-key", apiKey)
      let url = `${baseUrl}/${capiPath}?${paramsWithApiKey}`
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
  }, [params])

  return (
    <div className="App">
      <ShowQuery capiPath={capiPath} params={ params } />
      <ParamPane collapsed={true} params={ params } updateParams={updateParams}/>
      <ResultsPane results={results} resultRenderer={resultRenderer} />
    </div>
  )
}
