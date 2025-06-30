import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWallet } from '../context/WalletContext';
import deployments from '../contracts/deployments.json';

// Contract ABIs (simplified for demo - in production, these would be generated from compiled contracts)
const FACTORY_ABI = [
  "function createJobEscrow(address _freelancer, string memory _ipfsHash) external payable returns (uint256 jobId, address jobContract)",
  "function getJobInfo(uint256 _jobId) external view returns (tuple(address jobContract, address client, address freelancer, uint256 amount, string ipfsHash, bool isActive, uint256 createdAt))",
  "function getClientJobs(address _client) external view returns (uint256[] memory)",
  "function getFreelancerJobs(address _freelancer) external view returns (uint256[] memory)",
  "function getAllActiveJobs() external view returns (uint256[] memory)",
  "function getContractCreationFee() external view returns (uint256)",
  "function completeJob(uint256 _jobId) external",
  "event JobCreated(uint256 indexed jobId, address indexed jobContract, address indexed client, address freelancer, uint256 amount, string ipfsHash)"
];

const JOB_ESCROW_ABI = [
  "function acceptJob() external",
  "function startWork() external", 
  "function submitWork(string memory _workHash) external",
  "function approveWork() external",
  "function raiseDispute() external",
  "function getJobDetails() external view returns (tuple(address client, address freelancer, uint256 amount, uint8 status, string ipfsHash, string workSubmissionHash, uint256 createdAt, uint256 completedAt, bool fundsReleased))",
  "function getBalance() external view returns (uint256)",
  "event JobAccepted(address indexed freelancer, uint256 timestamp)",
  "event WorkSubmitted(string workHash, uint256 timestamp)",
  "event JobCompleted(uint256 timestamp)",
  "event FundsReleased(address indexed freelancer, uint256 amount)"
];

export const useContract = () => {
  const { provider, signer } = useWallet();
  const [factoryContract, setFactoryContract] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (provider && deployments.factoryAddress) {
      const contract = new ethers.Contract(
        deployments.factoryAddress,
        FACTORY_ABI,
        provider
      );
      setFactoryContract(contract);
    }
  }, [provider]);

  const createJob = async (freelancerAddress, ipfsHash, jobAmount) => {
    if (!factoryContract || !signer) throw new Error('Contract not initialized');
    
    setIsLoading(true);
    try {
      const contractWithSigner = factoryContract.connect(signer);
      const creationFee = await contractWithSigner.getContractCreationFee();
      const totalAmount = ethers.parseEther(jobAmount);
      const valueToSend = totalAmount + creationFee;
      
      const tx = await contractWithSigner.createJobEscrow(
        freelancerAddress,
        ipfsHash,
        { value: valueToSend }
      );
      
      const receipt = await tx.wait();
      
      // Parse the JobCreated event
      const event = receipt.logs.find((log) => {
        try {
          const parsed = contractWithSigner.interface.parseLog(log);
          return parsed?.name === 'JobCreated';
        } catch {
          return false;
        }
      });
      
      if (event) {
        const parsed = contractWithSigner.interface.parseLog(event);
        return {
          jobId: parsed.args.jobId.toString(),
          jobContract: parsed.args.jobContract,
          transactionHash: receipt.hash
        };
      }
      
      throw new Error('JobCreated event not found');
    } finally {
      setIsLoading(false);
    }
  };

  const getJobContract = (jobContractAddress) => {
    if (!provider) throw new Error('Provider not initialized');
    
    return new ethers.Contract(
      jobContractAddress,
      JOB_ESCROW_ABI,
      provider
    );
  };

  const getJobInfo = async (jobId) => {
    if (!factoryContract) throw new Error('Factory contract not initialized');
    
    try {
      const jobInfo = await factoryContract.getJobInfo(jobId);
      return {
        jobContract: jobInfo.jobContract,
        client: jobInfo.client,
        freelancer: jobInfo.freelancer,
        amount: ethers.formatEther(jobInfo.amount),
        ipfsHash: jobInfo.ipfsHash,
        isActive: jobInfo.isActive,
        createdAt: new Date(Number(jobInfo.createdAt) * 1000)
      };
    } catch (error) {
      console.error('Error getting job info:', error);
      throw error;
    }
  };

  const getClientJobs = async (clientAddress) => {
    if (!factoryContract) throw new Error('Factory contract not initialized');
    
    try {
      const jobIds = await factoryContract.getClientJobs(clientAddress);
      return jobIds.map((id) => id.toString());
    } catch (error) {
      console.error('Error getting client jobs:', error);
      throw error;
    }
  };

  const getFreelancerJobs = async (freelancerAddress) => {
    if (!factoryContract) throw new Error('Factory contract not initialized');
    
    try {
      const jobIds = await factoryContract.getFreelancerJobs(freelancerAddress);
      return jobIds.map((id) => id.toString());
    } catch (error) {
      console.error('Error getting freelancer jobs:', error);
      throw error;
    }
  };

  const acceptJob = async (jobContractAddress) => {
    if (!signer) throw new Error('Signer not available');
    
    setIsLoading(true);
    try {
      const jobContract = getJobContract(jobContractAddress).connect(signer);
      const tx = await jobContract.acceptJob();
      await tx.wait();
      return tx.hash;
    } finally {
      setIsLoading(false);
    }
  };

  const startWork = async (jobContractAddress) => {
    if (!signer) throw new Error('Signer not available');
    
    setIsLoading(true);
    try {
      const jobContract = getJobContract(jobContractAddress).connect(signer);
      const tx = await jobContract.startWork();
      await tx.wait();
      return tx.hash;
    } finally {
      setIsLoading(false);
    }
  };

  const submitWork = async (jobContractAddress, workHash) => {
    if (!signer) throw new Error('Signer not available');
    
    setIsLoading(true);
    try {
      const jobContract = getJobContract(jobContractAddress).connect(signer);
      const tx = await jobContract.submitWork(workHash);
      await tx.wait();
      return tx.hash;
    } finally {
      setIsLoading(false);
    }
  };

  const approveWork = async (jobId) => {
    if (!factoryContract || !signer) throw new Error('Contract not initialized');
    
    setIsLoading(true);
    try {
      const contractWithSigner = factoryContract.connect(signer);
      const tx = await contractWithSigner.completeJob(jobId);
      await tx.wait();
      return tx.hash;
    } finally {
      setIsLoading(false);
    }
  };

  const getContractCreationFee = async () => {
    if (!factoryContract) throw new Error('Factory contract not initialized');
    
    try {
      const fee = await factoryContract.getContractCreationFee();
      return ethers.formatEther(fee);
    } catch (error) {
      console.error('Error getting creation fee:', error);
      throw error;
    }
  };

  return {
    factoryContract,
    createJob,
    getJobInfo,
    getClientJobs,
    getFreelancerJobs,
    acceptJob,
    startWork,
    submitWork,
    approveWork,
    getContractCreationFee,
    getJobContract,
    isLoading
  };
};