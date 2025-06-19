
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Input from './Input'

const SignupForm = ({ setMode }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { name, email, password } = form
    if (!name || !email || !password) {
      toast.error('All fields are required')
      return
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', form)
      if (response.status === 201) {
        toast.success('Account created successfully! Please log in.')
        setMode('login')
      }
    } catch (err) {
      const error = err.response?.data?.error || 'Signup failed. Try again.'
      toast.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-6">Create an account</h2>

      <Input label="Name" name="name" type="text" value={form.name} onChange={handleChange} />
      <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
      <Input label="Password" name="password" type="password" value={form.password} onChange={handleChange} />

      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 text-white font-medium hover:opacity-90 transition"
      >
        Sign Up
      </button>
    </form>
  )
}

export default SignupForm
