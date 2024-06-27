import './App.css'
import { AddStudent } from './components/AddStudent'
import Navbar from './components/navbar'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from './components/ui/toaster'

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />
      <AddStudent />
      <Toaster/>
    </ThemeProvider>
  )
}

export default App
