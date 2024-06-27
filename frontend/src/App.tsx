import './App.css'
import { AddStudent } from './components/AddStudent'
import Navbar from './components/navbar'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from './components/ui/toaster'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FetchStudent } from './components/FetchStudent'
import { Dashboard } from './components/Dasboard'
import { AllStudents } from './components/AllStudents'

function App() {

  return (
    <Router>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/create' element={<AddStudent />} />
          <Route path='/fetch' element={<FetchStudent />} />
          <Route path='/allstudents' element={<AllStudents />} />
        </Routes>
        <Toaster />
      </ThemeProvider>
    </Router>
  )
}

export default App
