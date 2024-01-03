import { ReactElement } from "react";

interface ResultsPaneData<T> {
  resultRenderer: (result: T) => ReactElement
}

export default function ResultsPane<T>({ resultRenderer }: ResultsPaneData<T>) {
  return <div>Results pane</div>
}
