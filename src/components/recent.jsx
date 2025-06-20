import { Check, AlertTriangle, Camera } from 'lucide-react';

// StatusBadge component
const StatusBadge = ({ status }) => {
  if (status === 'completed') {
    return (
      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
        Completed
      </span>
    );
  }

  return (
    <span className="px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-full">
      Missed
    </span>
  );
};

// MedicationEntry component
const MedicationEntry = ({ date, time, status, hasPhoto }) => {
  const getIcon = () => {
    if (status === 'completed') {
      return (
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <Check className="w-6 h-6 text-green-600" />
        </div>
      );
    }
    
    return (
      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
        <AlertTriangle className="w-6 h-6 text-red-600" />
      </div>
    );
  };

  const getDescription = () => {
    if (status === 'completed' && time) {
      return `Taken at ${time}`;
    }
    if (status === 'missed') {
      return 'Medication missed';
    }
    return '';
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg hover:shadow-md transition-shadow duration-200 border border-gray-100">
      <div className="flex items-center space-x-4">
        {getIcon()}
        <div>
          <h3 className="font-semibold text-gray-900">{date}</h3>
          <p className="text-gray-600 text-sm">{getDescription()}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        {hasPhoto && (
          <div className="flex items-center space-x-1 text-gray-500">
            <Camera className="w-4 h-4" />
            <span className="text-sm">Photo</span>
          </div>
        )}
        <StatusBadge status={status} />
      </div>
    </div>
  );
};

// Main Recent component
const Recent = () => {
  const medicationData = [
    {
      id: 1,
      date: 'Monday, June 10',
      time: '8:30 AM',
      status: 'completed',
      hasPhoto: true,
    },
    {
      id: 2,
      date: 'Sunday, June 9',
      time: '8:15 AM',
      status: 'completed',
      hasPhoto: false,
    },
    {
      id: 3,
      date: 'Saturday, June 8',
      status: 'missed',
      hasPhoto: false,
    },
    {
      id: 4,
      date: 'Friday, June 7',
      time: '8:45 AM',
      status: 'completed',
      hasPhoto: true,
    },
    {
      id: 5,
      date: 'Thursday, June 6',
      time: '8:20 AM',
      status: 'completed',
      hasPhoto: false,
    },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="w-full mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">
            Recent Medication Activity
          </h1>
          
          <div className="space-y-4">
            {medicationData.map((entry) => (
              <MedicationEntry
                key={entry.id}
                date={entry.date}
                time={entry.time}
                status={entry.status}
                hasPhoto={entry.hasPhoto}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recent;
