import { User } from "lucide-react";
import StatCard from "./StatCard";

const WelcomeStats = ({ streak, isTodayTaken, takenDates }) => {

  const getGreeting = () => {
    const hour = new Date().getHours();
    return hour < 12 ? "Morning" : hour < 18 ? "Afternoon" : "Evening";
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl p-8 text-white">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
          <User className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Good {getGreeting()}!</h2>
          <p className="text-white/90 text-lg">Ready to stay on track with your medication?</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <StatCard title="Day Streak" value={streak} />
        <StatCard title="Today's Status" value={isTodayTaken ? "✓" : "○"} />
        <StatCard title="Monthly Rate" value={`${Math.round((takenDates.size / 30) * 100)}%`} />
      </div>
    </div>
  );
};



export default WelcomeStats;
