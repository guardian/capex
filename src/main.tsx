import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {createBrowserRouter, RouterProvider} from "react-router-dom"
import { Config } from './routes/Config'
import SearchQuery from './routes/SearchQuery'

let commonQueryParams = {
  initialQueryString: window.location.search,
}

const router = createBrowserRouter([
  {
    path: "/search",
    element: <SearchQuery {...commonQueryParams} />
  },
  {
    path: "/config",
    element: <Config />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
