
import { useState } from 'react'
import { toast } from 'react-toastify'
import Input from './Input'
import { useMutation } from '@tanstack/react-query'
import { signup } from '../api'
const SignupForm = ({ setMode }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success('Signup successful! Please login.')
      setMode('login')
    },
    onError: (error) => {
      toast.error('Signup failed')
    },
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { name, email, password } = form
    if (!name || !email || !password) {
      toast.error('All fields are required')
      return
    }
    mutation.mutate(form)
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
        disabled={mutation.isLoading}
      >
        {mutation.isLoading ? 'Signing up...' : 'Sign Up'}
      </button>
    </form>
  )
}

export default SignupForm
