import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ClientDashboard from './pages/ClientDashboard';
import FreelancerDashboard from './pages/FreelancerDashboard';
import JobDetails from './pages/JobDetails';
import { WalletProvider } from './context/WalletContext';
import { JobProvider } from './context/JobContext';

function App() {
  return (
    <WalletProvider>
      <JobProvider>
        <Router>
         <div className="min-h-screen bg-gradient-to-b from-slate-100 via-yellow-300 to-purple-800 text-gray-900">

            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/client-dashboard" element={<ClientDashboard />} />
              <Route path="/freelancer-dashboard" element={<FreelancerDashboard />} />
              <Route path="/job/:jobId" element={<JobDetails />} />
            </Routes>
          </div>
        </Router>
      </JobProvider>
    </WalletProvider>
  );
}

export default App;