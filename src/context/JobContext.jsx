import React, { createContext, useContext, useState } from 'react';

const JobContext = createContext(undefined);

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([
    // Mock data for demonstration
    {
      id: '1',
      title: 'Build React Dashboard',
      description: 'Create a modern dashboard with charts and analytics',
      price: '2.5',
      clientAddress: '0x1234567890123456789012345678901234567890',
      freelancerAddress: '0x0987654321098765432109876543210987654321',
      status: 'in_progress',
      createdAt: new Date('2024-01-15'),
      ipfsHash: 'QmXyz123...',
      contractAddress: '0xabcd1234...'
    }
  ]);

  const addJob = (job) => {
    setJobs(prev => [...prev, job]);
  };

  const updateJob = (jobId, updates) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId ? { ...job, ...updates } : job
    ));
  };

  const getJobsByRole = (address, role) => {
    return jobs.filter(job => 
      role === 'client' 
        ? job.clientAddress.toLowerCase() === address.toLowerCase()
        : job.freelancerAddress.toLowerCase() === address.toLowerCase()
    );
  };

  const getJobById = (jobId) => {
    return jobs.find(job => job.id === jobId);
  };

  return (
    <JobContext.Provider value={{
      jobs,
      addJob,
      updateJob,
      getJobsByRole,
      getJobById
    }}>
      {children}
    </JobContext.Provider>
  );
};