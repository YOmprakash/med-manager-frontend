
export default function AdherenceProgress({ rate, takenDays, missedDays, remainingDays }) {
  return (
    <div className="rounded-lg  bg-white text-card-foreground shadow-sm p-6">
      <h3 className="text-2xl font-semibold mb-4">
        Monthly Adherence Progress
      </h3>
      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span>Overall Progress</span>
          <span>{rate}%</span>
        </div>
        <div className=" h-3 w-full bg-primary/20 rounded-full">
          <div
            className="h-full  bg-blue-600 transition-all"
            style={{ transform: `${100 - rate}%)` }}
          />
        </div>
        <div className="grid grid-cols-3 text-center text-sm gap-4">
          {[
            { value: `${takenDays} days`, label: "Taken" },
            { value: `${missedDays} days`, label: "Missed" },
            { value: `${remainingDays} days`, label: "Remaining" },
          ].map(({ value, label }) => (
            <div key={label}>
              <div className={`font-medium ${ label==="Taken"? "text-green-600": label==="Missed"? "text-red-600":"text-blue-600"}`}>
                {value}
              </div>
              <div className="text-gray-500">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
