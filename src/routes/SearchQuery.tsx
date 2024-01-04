import type { Content } from '@guardian/content-api-models/v1/content';
import { Query, QueryData } from "./Query"
import './SearchQuery.css'
import { ConfigContext } from '../context/Config'
import { useContext } from 'react';

interface SearchQueryData {
  initialQueryString: string
}

function searchResultRenderer(result: Content) {
  let config = useContext(ConfigContext)
  let pillarClass = result.pillarName ? `result--${result.pillarName}` : "" // result.pillarName
  let apiKeyParam = config.apiKey ? `?api-key=${config.apiKey}` : ""
  return (
    <div key={result.id} className={`result ${pillarClass}`}>
      <h1><a href={result.webUrl}>{result.webTitle}</a> <a href={`${result.apiUrl}${apiKeyParam}`}>🛠</a></h1>
    </div>
  )
}

export default function SearchQuery(props: SearchQueryData) {
  return <Query {...props} capiPath="search" resultRenderer={searchResultRenderer} />
}
