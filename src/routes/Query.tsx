import { ParamPane } from '../components/ParamPane'
import ResultsPane from '../components/ResultsPane'
import { ShowQuery } from '../components/ShowQuery'
import { ReactElement, useState } from 'react'

interface QueryData<R> {
  initialQueryString: string,
  capiPath: string,
  resultRenderer: (result: R) => ReactElement
}

function Query<R>({ initialQueryString, capiPath, resultRenderer }: QueryData<R>) {
  let [params, updateParamsState] = useState(new URLSearchParams(initialQueryString))
  let [results, updateResults] = useState<R[]>([])

  function updateParams(newParams: URLSearchParams) {
    updateParamsState(newParams)
  }

  return (
    <div className="App">
      <ShowQuery capiPath={capiPath} params={ params } />
      <ParamPane collapsed={true} params={ params } updateParams={updateParams}/>
      <ResultsPane resultRenderer={resultRenderer} />
    </div>
  )
}

export default Query
