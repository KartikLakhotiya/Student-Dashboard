import './App.css'
import { AddStudent } from './pages/AddStudent'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from './components/ui/toaster'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FetchStudent } from './pages/FetchStudent'
import { Dashboard } from './pages/Dasboard'
import { AllStudents } from './pages/AllStudents'
import Sidebar from './components/Sidebar'
import { AddStudentAdmin } from './pages/AddStudentAdmin';
import { FetchStudentAdmin } from './pages/FetchStudentAdmin';

function App() {

  return (
      <Router>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/create' element={<AddStudent />} />
            <Route path='/fetch' element={<FetchStudent />} />
            <Route path='/allstudents' element={<AllStudents />} />
            <Route path='/admin' element={<Sidebar />} />
            <Route path='/createstudent' element={<AddStudentAdmin />} />
            <Route path='/fetchadmin' element={<FetchStudentAdmin />} />
          </Routes>
          <Toaster />
        </ThemeProvider>
      </Router>
  )
}

export default App
