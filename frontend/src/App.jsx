import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Dahboard'
import FormComponent from './pages/InputDetail'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path='/add'
          element={
            <ProtectedRoute>
              <FormComponent />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
