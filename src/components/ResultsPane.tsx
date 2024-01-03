import { ReactElement } from "react";

interface ResultsPaneData<T> {
  results: T[]
  resultRenderer: (result: T) => ReactElement
}

export default function ResultsPane<T>({ results, resultRenderer }: ResultsPaneData<T>) {
  let resultElements = results.map(resultRenderer)
  return <div className="resultsPane">{resultElements}</div>
}
