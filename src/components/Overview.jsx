
import TodayStatusCard from "./TodayStatusCard";
import QuickActions from "./QuickActions";
import AdherenceProgress from "./AdherenceProgress";

export default function Overview({
  dailyMedication,
  onEmail,
  onConfigure,
  onViewCalendar,
  adherenceRate,
  takenDays,
  missedDays,
  remainingDays,
}) {
  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <TodayStatusCard medication={dailyMedication} />
        <QuickActions
          onEmail={onEmail}
          onConfigure={onConfigure}
          onViewCalendar={onViewCalendar}
        />
      </div>
      <AdherenceProgress
        rate={adherenceRate}
        takenDays={takenDays}
        missedDays={missedDays}
        remainingDays={remainingDays}
      />
    </div>
  );
}
