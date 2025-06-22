
import { BrowserRouter, Routes, Route,Navigate  } from 'react-router-dom';

import RoleSelection from './pages/RoleSelection';
import Toaster from './components/Toaster';
import { useState } from 'react';
import AuthPage from './pages/AuthPage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/role-selection" element={
            isAuthenticated ? (
              <RoleSelection onLogout={() => setIsAuthenticated(false)} />
            ) : (
              <Navigate to="/" />
            )
          } />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  )
}

export default App
