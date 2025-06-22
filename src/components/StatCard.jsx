const StatCard = ({ title, value }) => (
  <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
    <div className="text-2xl font-bold">{value}</div>
    <div className="text-white/80">{title}</div>
  </div>
);

export default StatCard