import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createTheme, ThemeProvider } from '@mui/material'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={darkTheme}>
    <App />
  </ThemeProvider>
)

