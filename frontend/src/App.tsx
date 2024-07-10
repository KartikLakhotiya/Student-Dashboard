import './App.css'
import { AddStudent } from './pages/AddStudent'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from './components/ui/toaster'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FetchStudent } from './pages/FetchStudent'
import { Dashboard } from './pages/Dasboard'
import { AllStudents } from './pages/AllStudents'
import { motion } from "framer-motion";
import Sidebar from './components/Sidebar'

function App() {

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 2 }}
    >
      <Router>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/create' element={<AddStudent />} />
            <Route path='/fetch' element={<FetchStudent />} />
            <Route path='/allstudents' element={<AllStudents />} />
            <Route path='/admin' element={<Sidebar />} />

          </Routes>
          <Toaster />
        </ThemeProvider>
      </Router>
    </motion.div>
  )
}

export default App
