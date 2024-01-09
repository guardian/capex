import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {createHashRouter, Navigate, redirect, RouterProvider } from "react-router-dom"
import Config from './routes/Config'
import SearchQuery from './routes/SearchQuery'
import { ConfigContext, readConfig } from './context/Config'

// if you go straight to '/' it will forward you here
const defaultQuery = "/search"

// if you don't have an api key configured, you will be taken to the
// config page instead to add one.
const requiresApiKey = async () => {
  let cfg = readConfig()
  if(typeof cfg.apiKey !== "string") return redirect("/config" + window.location.search)
  return null
}

const MainApp = () => {
  const [config, updateConfig] = useState(readConfig())

  const router = createHashRouter([
    {
      path: "/",
      element: <Navigate to={defaultQuery + window.location.search} replace={true} />
    },
    {
      path: "/search",
      element: <SearchQuery />,
      loader: requiresApiKey
    },
    {
      path: "/config",
      element: <Config updateConfig={updateConfig}/>
    }
  ])

  return (
    <ConfigContext.Provider value={config}>
      <RouterProvider router={router} />
    </ConfigContext.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
)
