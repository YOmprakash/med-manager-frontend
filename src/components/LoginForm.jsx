import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Input from './Input'
import { useMutation } from '@tanstack/react-query'
import { Login } from '../api'

const LoginForm = ({ onLogin }) => {
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const mutation = useMutation({
    mutationFn: Login,
    onSuccess: () => {
      setLoading(false)
      toast.success('Login successful!')
      onLogin()
      navigate('/role-selection')
    },
    onError: () => {
      setLoading(false)
      toast.error('Invalid email or password. Please try again.')
    },
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { email, password } = form
    if (!email || !password) {
      toast.error('All fields are required')
      return
    }
    setLoading(true)
    mutation.mutate(form)
  }

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-white/70 z-50 flex items-center justify-center">
          <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold mb-1">Welcome back</h2>
        <p className="text-gray-500 mb-6">Enter your credentials to access your account</p>

        <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
        <Input label="Password" name="password" type="password" value={form.password} onChange={handleChange} />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 hover:cursor-pointer rounded-lg bg-gradient-to-r from-blue-500 to-green-400 text-white font-medium hover:opacity-90 transition"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </>
  )
}

export default LoginForm
