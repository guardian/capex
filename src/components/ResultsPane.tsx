import { ReactElement } from "react";
import "./ResultsPane.css"

interface ResultsPaneData<T> {
  results: T[]
  resultRenderer: (result: T) => ReactElement
}

export default function ResultsPane<T>({ results, resultRenderer }: ResultsPaneData<T>) {
  let resultElements = results.map(resultRenderer)
  return <div id="resultsPane" className="pane">{resultElements}</div>
}
