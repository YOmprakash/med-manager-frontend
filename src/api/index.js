
import Axios from './axios'

export const signup = async (formData) => {
  const res = await Axios.post('/auth/signup', formData)
  return res.data
}

export const Login = async (formData) => {
  const res = await Axios.post('/auth/login', formData)
  return res.data
}

export const markAsTaken = async (medicationId, date, image) => {
  const res = await Axios.post('/medTaken/medications/taken', {
    medication_id: medicationId,
    date,
    proof_image: image || null,
  });
  return res.data;
};

export const addMedication = async (formData) => {
  const res = await Axios.post('/med/medications/add', formData);
  return res.data;
};

export const getAllMedications = async () => {
  const res = await Axios.get('/med/medications/list');
  return res.data;
};
