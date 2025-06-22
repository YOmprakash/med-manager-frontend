const Legend = ({ color, label }) => (
  <div className="flex items-center gap-2">
    <div className={`w-3 h-3 bg-${color} rounded-full`}></div>
    <span>{label}</span>
  </div>
);

export default Legend;