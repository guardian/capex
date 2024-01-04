import type { Content } from '@guardian/content-api-models/v1/content';
import { Query, QueryData } from "./Query"

interface SearchQueryData {
  initialQueryString: string
  apiKey: string
  baseUrl: string
}

function searchResultRenderer(result: Content) {
  return <div key={result.id}>{result.id}</div>
}

export default function SearchQuery(props: SearchQueryData) {
  return <Query {...props} capiPath="search" resultRenderer={searchResultRenderer} />
}
