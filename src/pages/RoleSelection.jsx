import { useState } from "react";

import Onboarding from "../components/Onboarding";
import PatientDashboard from "../components/PatientDashboard";
import CaretakerDashboard from "../components/CaretakerDashboard";
import Header from "../components/Navbar";

const Home = () => {
  const [userRole, setUserRole] = useState(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  const handleOnboardingComplete = (role) => {
    setUserRole(role);
    setHasCompletedOnboarding(true);
  };

  const toggleUserRole = () => {
    setUserRole((prevRole) => (prevRole === "patient" ? "caretaker" : "patient"));
  };

  if (!hasCompletedOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Header userRole={userRole} toggleUserRole={toggleUserRole} />
      <main className="max-w-6xl mx-auto p-6">
        {userRole === "patient" ? <PatientDashboard /> : <CaretakerDashboard />}
      </main>
    </div>
  );
};

export default Home;
