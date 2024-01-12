import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {createHashRouter, LoaderFunction, Navigate, redirect, RouterProvider } from "react-router-dom"
import Config from './routes/Config'
import SearchQuery from './routes/SearchQuery'
import { CapexConfig, ConfigContext, readConfig, storeConfig } from './context/Config'

// if you go straight to '/' it will forward you here
const defaultQuery = "/search"

const MainApp = () => {
  const [config, updateConfigState] = useState(readConfig())

  const updateConfig = (newConfig: CapexConfig) => {
    // normalise the url
    let normalisedConfig = { ...newConfig, baseUrl: new URL(newConfig.baseUrl).toString() }
    updateConfigState(normalisedConfig)
    storeConfig(normalisedConfig)
  }

  // if you don't have an api key configured, you will be taken to the
  // config page instead to add one.
  const requiresApiKey: LoaderFunction = async ({request}) => {
    if(typeof config.apiKey !== "string" || config.apiKey.length == 0) {
      let url = new URL(request.url)
      let redirectParams = new URLSearchParams({ "redirect" : url.pathname + url.search })
      return redirect("/config?" + redirectParams)
    } else {
      return null
    }
  }

  const router = createHashRouter([
    {
      path: "/",
      element: <Navigate to={defaultQuery} replace={true} />
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
