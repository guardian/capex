import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom"
import Config from './routes/Config'
import SearchQuery from './routes/SearchQuery'

const commonQueryParams = {
  initialQueryString: window.location.search,
}

const defaultQuery = "/search"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={defaultQuery + window.location.search} replace={true} />
  },
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
