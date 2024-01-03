import type { Content } from '@guardian/content-api-models/v1/content';
import Query from "./Query"

interface SearchQueryData {
  initialQueryString: string
}

function searchResultRenderer(result: Content) {
  return <div></div>
}

export default function SearchQuery({ initialQueryString }: SearchQueryData) {
  return <Query initialQueryString={initialQueryString} capiPath="search" resultRenderer={searchResultRenderer} />
}
