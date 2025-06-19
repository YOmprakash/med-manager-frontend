
import { Users } from 'lucide-react'

const stats = [
  { label: 'Adherence Rate', value: '85%' },
  { label: 'Current Streak', value: '5' },
  { label: 'Missed This Month', value: '3' },
  { label: 'Taken This Week', value: '4' },
]

const CaretakerDashboardCard = () => {
  return (
    <div className="bg-gradient-to-r from-green-400 via-teal-400 to-blue-500 text-white rounded-2xl p-6 shadow-md">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="bg-white/20 p-3 rounded-xl">
          <Users className="text-white w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Caretaker Dashboard</h2>
          <p className="text-sm opacity-90">Monitoring Eleanor Thompson&apos;s medication adherence</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((item, index) => (
          <div key={index} className="bg-white/10 rounded-xl p-4 text-center">
            <div className="text-xl font-semibold">{item.value}</div>
            <div className="text-sm opacity-80">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CaretakerDashboardCard
