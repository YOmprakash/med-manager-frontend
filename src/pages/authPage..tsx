import { useState } from 'react'
import {  Heart } from 'lucide-react';

export default function AuthPage() {
  const [mode, setMode] = useState('login') 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-green-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
       <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">MedsBuddy</h1>
          <p className="text-gray-600">Your medication management companion</p>
        </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`flex-1 py-2 text-center font-medium ${
              mode === 'login'
                ? 'text-black border-b-4 border-blue-500'
                : 'text-gray-500'
            }`}
            onClick={() => setMode('login')}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 text-center font-medium ${
              mode === 'signup'
                ? 'text-black border-b-4 border-green-400'
                : 'text-gray-500'
            }`}
            onClick={() => setMode('signup')}
          >
            Sign Up
          </button>
        </div>

        {/* Forms */}
        {mode === 'login' ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  )
}

function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '' })

  const handleSubmit = e => {
    e.preventDefault()
    console.log('Login:', form)
    // TODO: integrate real login
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-1">Welcome back</h2>
      <p className="text-gray-500 mb-6">Enter your credentials to access your account</p>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Email</label>
        <input
          type="email"
          required
          placeholder="Enter your email"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-1">Password</label>
        <input
          type="password"
          required
          placeholder="Enter your password"
          value={form.password}
          onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-green-400 text-white font-medium hover:opacity-90 transition"
      >
        Sign In
      </button>
    </form>
  )
}

function SignupForm() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const handleSubmit = e => {
    e.preventDefault()
    console.log('SignUp:', form)
    // TODO: integrate real signup
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-6">Create an account</h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Name</label>
        <input
          type="text"
          required
          placeholder="Enter your name"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Email</label>
        <input
          type="email"
          required
          placeholder="Enter your email"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-1">Password</label>
        <input
          type="password"
          required
          placeholder="Enter your password"
          value={form.password}
          onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 text-white font-medium hover:opacity-90 transition"
      >
        Sign Up
      </button>
    </form>
  )
}
