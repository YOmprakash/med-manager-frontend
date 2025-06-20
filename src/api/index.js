
import axios from 'axios'

export const signup = async (formData) => {
  const res = await axios.post('http://localhost:5000/api/auth/signup', formData)
  return res.data
}

export const Login = async (formData) => {
  const res = await axios.post('http://localhost:5000/api/auth/login', formData)
  return res.data
}

export const markAsTaken = async (medicationId, date, image) => {
  const res = await axios.post('http://localhost:5000/medications/taken', {
    medication_id: medicationId,
    date,
    proof_image: image || null,
  });
  return res.data;
};
