
import { useState } from 'react'
import { Heart } from 'lucide-react'
import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'

const AuthPage = () => {
  const [mode, setMode] = useState('login')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-green-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">MedsBuddy</h1>
          <p className="text-gray-600">Your medication management companion</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          {['login', 'signup'].map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-2 text-center font-medium ${
                mode === tab
                  ? `text-black border-b-4 ${
                      tab === 'login' ? 'border-blue-500' : 'border-green-400'
                    }`
                  : 'text-gray-500'
              }`}
              onClick={() => setMode(tab)}
            >
              {tab === 'login' ? 'Login' : 'Sign Up'}
            </button>
          ))}
        </div>

        {mode === 'login' ? <LoginForm /> : <SignupForm setMode={setMode} />}
      </div>
    </div>
  )
}

export default AuthPage
