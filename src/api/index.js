
import axios from 'axios'

export const signup = async (formData) => {
  const res = await axios.post('http://localhost:5000/api/auth/signup', formData)
  return res.data
}

export const Login = async (formData) => {
  const res = await axios.post('http://localhost:5000/api/auth/login', formData)
  return res.data
}
