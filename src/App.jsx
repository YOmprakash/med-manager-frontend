
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/authPage.';

const App = () => {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
