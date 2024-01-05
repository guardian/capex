import moment from 'moment';
import type { Content } from '@guardian/content-api-models/v1/content';
import { Query, QueryData } from "./Query"
import './SearchQuery.css'
import { ConfigContext } from '../context/Config'
import { ReactElement, useContext } from 'react';
import { ContentFields } from '@guardian/content-api-models/v1/contentFields';
import { CapiDateTime } from '@guardian/content-api-models/v1/capiDateTime';

interface SearchQueryData {
  initialQueryString: string
}

interface FieldRendererData {
  cf?: ContentFields
}

function FieldStandfirst({ cf }: FieldRendererData) {
  return (
    cf?.standfirst ? <div className="result-standfirst" dangerouslySetInnerHTML={{ __html: cf.standfirst }} /> : null
  )
}

function webPublicationDate(capiDateTime?: CapiDateTime) {
  /**
   * this is a bit of a hack because we are using the thrift model
   * without actually using the specialised thrift decoders (because
   * we just using the json response from capi), so the definition of
   * webPublicationDate doesn't quite match up. It's actually a string
   * so we need to force it.
   */
  if(typeof capiDateTime !== "string") return null
  let date = moment(capiDateTime)
  return <div className="result-publication-date">{date.format("MMMM Do YYYY")} ({date.fromNow()})</div>
}

function searchResultRenderer(result: Content) {
  let config = useContext(ConfigContext)
  let pillarClass = result.pillarName ? `result--${result.pillarName}` : "" // result.pillarName
  let apiKeyParam = config.apiKey ? `?api-key=${config.apiKey}` : ""
  return (
    <div key={result.id} className={`result ${pillarClass}`}>
      <h1><a href={result.webUrl}>{result.webTitle}</a> <a href={`${result.apiUrl}${apiKeyParam}`}>🛠</a></h1>
      {webPublicationDate(result.webPublicationDate)}
      <FieldStandfirst cf={result.fields} />
    </div>
  )
}

export default function SearchQuery(props: SearchQueryData) {
  return <Query {...props} capiPath="search" resultRenderer={searchResultRenderer} />
}
