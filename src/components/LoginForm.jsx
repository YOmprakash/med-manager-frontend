
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import Input from './Input'

const LoginForm = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', form)
      if (response.status === 200) {
        toast.success('Login successful!')
        navigate('/role-selection')
      }
    } catch (err) {
      toast.error('Invalid email or password. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-1">Welcome back</h2>
      <p className="text-gray-500 mb-6">Enter your credentials to access your account</p>

      <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
      <Input label="Password" name="password" type="password" value={form.password} onChange={handleChange} />

      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-green-400 text-white font-medium hover:opacity-90 transition"
      >
        Sign In
      </button>
    </form>
  )
}

export default LoginForm
