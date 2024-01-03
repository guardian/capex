import "./ShowQuery.css"

interface ShowQueryData {
  params: URLSearchParams
  capiPath: String
}

export function ShowQuery({ params, capiPath }: ShowQueryData) {
  console.log("ShowQuery", params)
  const qs = params.toString()
  return (
    <div id="showQuery" className="pane">{capiPath}?{qs}</div>
  )
}
