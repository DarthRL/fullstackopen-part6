import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'

import App from './App'
import { MessageContextProvider } from './components/MessageContextProvider'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <MessageContextProvider>
      <App />
    </MessageContextProvider>
  </QueryClientProvider>
)