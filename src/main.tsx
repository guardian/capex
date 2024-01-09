import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {createBrowserRouter, Navigate, redirect, RouterProvider} from "react-router-dom"
import Config from './routes/Config'
import SearchQuery from './routes/SearchQuery'
import { initialConfig } from './context/Config'

const commonQueryParams = {
  initialQueryString: window.location.search,
}

const defaultQuery = "/search"

const requiresApiKey = async () => {
  if(typeof initialConfig.apiKey !== "string") return redirect("/config")
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
