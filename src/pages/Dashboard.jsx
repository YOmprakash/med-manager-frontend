import CaretakerView from '../components/CaretakerView'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import PatientView from '../components/PatientView'

const Dashboard = () => {
  const [role, setRole] = useState('')

  const toggleRole = () => {
    setRole(prev => (prev === 'Caretaker' ? 'Patient' : 'Caretaker'))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Navbar currentRole={role} onSwitchRole={toggleRole} />
      {role === 'Caretaker' ? <CaretakerView /> : <PatientView />}
    </div>
  )
}

export default Dashboard
