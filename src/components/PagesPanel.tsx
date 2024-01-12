import "./PagesPane.css"

import type { CapiResponse } from '../model/CapiResponse'
import { Button } from "@guardian/source-react-components"

interface PagesPanelData<T> {
  response: CapiResponse<T>,
  updatePage: (offset: number) => void
}

export default function PagesPane<T>({ response, updatePage } : PagesPanelData<T> ) {
  return (
    <div id="pages-pane" className="pane">
      { response.currentPage > 1 ? <Button size="xsmall" priority="secondary" onClick={() => updatePage(-1)}>←</Button> : null }
      <div>{response.currentPage} / {response.pages}</div>
      { response.currentPage < response.pages ? <Button size="xsmall" priority="secondary" onClick={() => updatePage(1)}>→</Button> : null }
    </div>
  )
}
