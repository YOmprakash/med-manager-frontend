
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/authPage';
import RoleSelection from './pages/RoleSelection';
import Toaster from './components/Toaster';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/role-selection" element={<RoleSelection />} />
        </Routes>
      </BrowserRouter>
      
    <Toaster />
    </>
  )
}

export default App
