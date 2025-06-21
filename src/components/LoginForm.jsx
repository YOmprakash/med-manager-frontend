
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Input from './Input'
import { useMutation } from '@tanstack/react-query'
import { Login } from '../api'
const LoginForm = ({onLogin}) => {
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate()
 const mutation = useMutation({
    mutationFn:Login ,
    onSuccess: () => {
      toast.success('Login successful!')
      onLogin() // Call the onLogin prop to update authentication state
      navigate('/role-selection')
    },
    onError: () => {
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

    mutation.mutate(form)

  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-1">Welcome back</h2>
      <p className="text-gray-500 mb-6">Enter your credentials to access your account</p>

      <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
      <Input label="Password" name="password" type="password" value={form.password} onChange={handleChange} />

      <button
        type="submit"
        disabled={mutation.isLoading}
        className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-green-400 text-white font-medium hover:opacity-90 transition"
      >
        {mutation.isLoading ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  )
}

export default LoginForm
