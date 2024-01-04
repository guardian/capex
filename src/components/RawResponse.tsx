interface RawResponseData {
    response: object
}

export default function RawResponse({ response }: RawResponseData) {
  return (
    <div className="pane">
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  )
}
