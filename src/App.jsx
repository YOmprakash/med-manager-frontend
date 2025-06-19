
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/authPage';
import RoleSelection from './pages/RoleSelection';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/dashboard" element={<Dashboard />} />
      
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default App
