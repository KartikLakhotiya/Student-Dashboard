import './App.css'
import { ModeToggle } from './components/mode-toggle'
import Navbar from './components/navbar'
import { Button } from './components/ui/button'
import { ThemeProvider } from "@/components/theme-provider"

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar/>
    </ThemeProvider>
  )
}

export default App
