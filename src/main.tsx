import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import './index.css'
import App from './App.tsx'
import { Toaster } from 'sonner'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Results from './componensts/results.tsx'
const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster richColors />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
