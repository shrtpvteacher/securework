// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./JobEscrow.sol";

contract JobEscrowFactory {
    struct JobInfo {
        address jobContract;
        address client;
        address freelancer;
        uint256 amount;
        string ipfsHash;
        bool isActive;
        uint256 createdAt;
    }
    
    mapping(uint256 => JobInfo) public jobs;
    mapping(address => uint256[]) public clientJobs;
    mapping(address => uint256[]) public freelancerJobs;
    
    uint256 public jobCounter;
    uint256 public contractCreationFee = 0.001 ether; // Fee for creating new job contracts
    address public owner;
    address public aiVerifier; // Address that can verify work completion
    
    event JobCreated(
        uint256 indexed jobId,
        address indexed jobContract,
        address indexed client,
        address freelancer,
        uint256 amount,
        string ipfsHash
    );
    
    event JobCompleted(uint256 indexed jobId, address indexed jobContract);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    constructor(address _aiVerifier) {
        owner = msg.sender;
        aiVerifier = _aiVerifier;
    }
    
    function createJobEscrow(
        address _freelancer,
        string memory _ipfsHash
    ) external payable returns (uint256 jobId, address jobContract) {
        require(msg.value > contractCreationFee, "Insufficient funds for job creation");
        require(_freelancer != address(0), "Invalid freelancer address");
        require(_freelancer != msg.sender, "Client cannot be freelancer");
        
        jobId = jobCounter++;
        uint256 jobAmount = msg.value - contractCreationFee;
        
        // Deploy new JobEscrow contract
        JobEscrow newJob = new JobEscrow(
            msg.sender,
            _freelancer,
            aiVerifier,
            _ipfsHash,
            jobId
        );
        
        jobContract = address(newJob);
        
        // Transfer funds to the job contract
        (bool success, ) = jobContract.call{value: jobAmount}("");
        require(success, "Failed to fund job contract");
        
        // Store job information
        jobs[jobId] = JobInfo({
            jobContract: jobContract,
            client: msg.sender,
            freelancer: _freelancer,
            amount: jobAmount,
            ipfsHash: _ipfsHash,
            isActive: true,
            createdAt: block.timestamp
        });
        
        // Update mappings
        clientJobs[msg.sender].push(jobId);
        freelancerJobs[_freelancer].push(jobId);
        
        emit JobCreated(jobId, jobContract, msg.sender, _freelancer, jobAmount, _ipfsHash);
        
        return (jobId, jobContract);
    }
    
    function completeJob(uint256 _jobId) external {
        require(msg.sender == aiVerifier, "Only AI verifier can complete jobs");
        require(jobs[_jobId].isActive, "Job is not active");
        
        jobs[_jobId].isActive = false;
        emit JobCompleted(_jobId, jobs[_jobId].jobContract);
    }
    
    function getJobInfo(uint256 _jobId) external view returns (JobInfo memory) {
        return jobs[_jobId];
    }
    
    function getClientJobs(address _client) external view returns (uint256[] memory) {
        return clientJobs[_client];
    }
    
    function getFreelancerJobs(address _freelancer) external view returns (uint256[] memory) {
        return freelancerJobs[_freelancer];
    }
    
    function getAllActiveJobs() external view returns (uint256[] memory activeJobIds) {
        uint256 activeCount = 0;
        
        // Count active jobs
        for (uint256 i = 0; i < jobCounter; i++) {
            if (jobs[i].isActive) {
                activeCount++;
            }
        }
        
        // Create array of active job IDs
        activeJobIds = new uint256[](activeCount);
        uint256 index = 0;
        
        for (uint256 i = 0; i < jobCounter; i++) {
            if (jobs[i].isActive) {
                activeJobIds[index] = i;
                index++;
            }
        }
        
        return activeJobIds;
    }
    
    function updateContractCreationFee(uint256 _newFee) external onlyOwner {
        contractCreationFee = _newFee;
    }
    
    function updateAiVerifier(address _newAiVerifier) external onlyOwner {
        aiVerifier = _newAiVerifier;
    }
    
    function withdrawFees() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No fees to withdraw");
        
        (bool success, ) = owner.call{value: balance}("");
        require(success, "Failed to withdraw fees");
    }
    
    function getContractCreationFee() external view returns (uint256) {
        return contractCreationFee;
    }
}