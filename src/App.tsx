import './App.css'
import { AlertDialogDemo } from './components/alert-dialog'
import { CardWithForm } from './components/card'
import { CarouselSize } from './components/hero/carousel'
import Navbar from './components/navbar'
import { ThemeProvider } from "@/components/theme-provider"

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />
      <CarouselSize />
      <AlertDialogDemo />
      <CardWithForm />
    </ThemeProvider>
  )
}

export default App
