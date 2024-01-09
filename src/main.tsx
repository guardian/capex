import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {createBrowserRouter, Navigate, redirect, RouterProvider} from "react-router-dom"
import Config from './routes/Config'
import SearchQuery from './routes/SearchQuery'
import { readConfig } from './context/Config'

const commonQueryParams = {
  initialQueryString: window.location.search,
}

const defaultQuery = "/search"

const requiresApiKey = async () => {
  let cfg = readConfig()
  if(typeof cfg.apiKey !== "string") return redirect("/config" + window.location.search)
  return null
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={defaultQuery + window.location.search} replace={true} />
  },
  {
    path: "/search",
    element: <SearchQuery {...commonQueryParams} />,
    loader: requiresApiKey
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
