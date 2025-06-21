import { useState } from 'react'
import { toast } from 'react-toastify'
import Input from './Input'
import { useMutation } from '@tanstack/react-query'
import { signup } from '../api'

const SignupForm = ({ setMode }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      setLoading(false)
      toast.success('Signup successful! Please login.')
      setMode('login')
    },
    onError: () => {
      setLoading(false)
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
    setLoading(true)
    mutation.mutate(form)
  }

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-white/70 z-50 flex items-center justify-center">
          <div className="h-12 w-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold mb-6">Create an account</h2>

        <Input label="Name" name="name" type="text" value={form.name} onChange={handleChange} />
        <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
        <Input label="Password" name="password" type="password" value={form.password} onChange={handleChange} />

        <button
          type="submit"
          disabled={loading}
          className="w-full hover:cursor-pointer py-3 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 text-white font-medium hover:opacity-90 transition"
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
    </>
  )
}

export default SignupForm
