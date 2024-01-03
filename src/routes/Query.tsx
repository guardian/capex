import { ParamPane } from '../components/ParamPane'
import ResultsPane from '../components/ResultsPane'
import { ShowQuery } from '../components/ShowQuery'
import { ReactElement, useState } from 'react'

export interface QueryData<R> {
  initialQueryString: string,
  capiPath: string,
  resultRenderer: (result: R) => ReactElement,
  apiKey: string,
  baseUrl: string
}

type CapiResponse<T> = { response: T }

async function submitQuery<ResponseT>(baseUrl: string, params: URLSearchParams, capiPath: string, apiKey: string): Promise<ResponseT> {
  let paramsWithApiKey = new URLSearchParams(params)
  paramsWithApiKey.set("api-key", apiKey)
  let url = `${baseUrl}/${capiPath}?${paramsWithApiKey}`
  let res = await fetch(url)
  let body = await res.json() as CapiResponse<ResponseT>
  return body.response
}

export function Query<Response extends { results: Result[] }, Result>({ initialQueryString, capiPath, resultRenderer, baseUrl, apiKey }: QueryData<Result>) {
  let [params, updateParamsState] = useState(new URLSearchParams(initialQueryString))
  let [results, updateResults] = useState<Result[]>([])

  function updateParams(newParams: URLSearchParams) {
    updateParamsState(newParams)
  }

  // submitQuery<Response>(baseUrl, params, capiPath, apiKey).then(res => updateResults(res.results))

  return (
    <div className="App">
      <ShowQuery capiPath={capiPath} params={ params } />
      <ParamPane collapsed={true} params={ params } updateParams={updateParams}/>
      <ResultsPane results={results} resultRenderer={resultRenderer} />
    </div>
  )
}
