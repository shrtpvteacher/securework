// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract JobEscrow is ERC721, Ownable {
    using Counters for Counters.Counter;
    
    enum JobStatus { Created, Funded, Accepted, InProgress, Submitted, Completed, Disputed }
    
    struct JobDetails {
        address client;
        address freelancer;
        uint256 amount;
        JobStatus status;
        string ipfsHash;
        string workSubmissionHash;
        uint256 createdAt;
        uint256 completedAt;
        bool fundsReleased;
    }
    
    JobDetails public jobDetails;
    address public aiVerifier;
    uint256 public jobId;
    Counters.Counter private _tokenIds;
    
    // NFT token IDs
    uint256 public clientTokenId;
    uint256 public freelancerTokenId;
    
    event JobAccepted(address indexed freelancer, uint256 timestamp);
    event WorkSubmitted(string workHash, uint256 timestamp);
    event JobCompleted(uint256 timestamp);
    event FundsReleased(address indexed freelancer, uint256 amount);
    event DisputeRaised(address indexed raiser, uint256 timestamp);
    
    modifier onlyClient() {
        require(msg.sender == jobDetails.client, "Only client can call this function");
        _;
    }
    
    modifier onlyFreelancer() {
        require(msg.sender == jobDetails.freelancer, "Only freelancer can call this function");
        _;
    }
    
    modifier onlyAiVerifier() {
        require(msg.sender == aiVerifier, "Only AI verifier can call this function");
        _;
    }
    
    modifier onlyParties() {
        require(
            msg.sender == jobDetails.client || msg.sender == jobDetails.freelancer,
            "Only job parties can call this function"
        );
        _;
    }
    
    constructor(
        address _client,
        address _freelancer,
        address _aiVerifier,
        string memory _ipfsHash,
        uint256 _jobId
    ) ERC721("JobEscrowNFT", "JENFT") {
        jobDetails = JobDetails({
            client: _client,
            freelancer: _freelancer,
            amount: 0, // Will be set when funded
            status: JobStatus.Created,
            ipfsHash: _ipfsHash,
            workSubmissionHash: "",
            createdAt: block.timestamp,
            completedAt: 0,
            fundsReleased: false
        });
        
        aiVerifier = _aiVerifier;
        jobId = _jobId;
        
        // Mint NFTs for both parties
        _mintJobNFTs();
        
        // Transfer ownership to client
        _transferOwnership(_client);
    }
    
    function _mintJobNFTs() private {
        _tokenIds.increment();
        clientTokenId = _tokenIds.current();
        _safeMint(jobDetails.client, clientTokenId);
        
        _tokenIds.increment();
        freelancerTokenId = _tokenIds.current();
        _safeMint(jobDetails.freelancer, freelancerTokenId);
    }
    
    // Receive function to accept funding
    receive() external payable {
        require(jobDetails.status == JobStatus.Created, "Job already funded");
        require(msg.value > 0, "Must send funds");
        
        jobDetails.amount = msg.value;
        jobDetails.status = JobStatus.Funded;
    }
    
    function acceptJob() external onlyFreelancer {
        require(jobDetails.status == JobStatus.Funded, "Job must be funded first");
        
        jobDetails.status = JobStatus.Accepted;
        emit JobAccepted(msg.sender, block.timestamp);
    }
    
    function startWork() external onlyFreelancer {
        require(jobDetails.status == JobStatus.Accepted, "Job must be accepted first");
        
        jobDetails.status = JobStatus.InProgress;
    }
    
    function submitWork(string memory _workHash) external onlyFreelancer {
        require(jobDetails.status == JobStatus.InProgress, "Job must be in progress");
        require(bytes(_workHash).length > 0, "Work hash cannot be empty");
        
        jobDetails.workSubmissionHash = _workHash;
        jobDetails.status = JobStatus.Submitted;
        
        emit WorkSubmitted(_workHash, block.timestamp);
    }
    
    function approveWork() external onlyAiVerifier {
        require(jobDetails.status == JobStatus.Submitted, "No work submitted");
        require(!jobDetails.fundsReleased, "Funds already released");
        
        jobDetails.status = JobStatus.Completed;
        jobDetails.completedAt = block.timestamp;
        jobDetails.fundsReleased = true;
        
        // Release funds to freelancer
        uint256 amount = jobDetails.amount;
        jobDetails.amount = 0;
        
        (bool success, ) = jobDetails.freelancer.call{value: amount}("");
        require(success, "Failed to release funds");
        
        emit JobCompleted(block.timestamp);
        emit FundsReleased(jobDetails.freelancer, amount);
    }
    
    function raiseDispute() external onlyParties {
        require(
            jobDetails.status == JobStatus.InProgress || 
            jobDetails.status == JobStatus.Submitted,
            "Cannot dispute at this stage"
        );
        
        jobDetails.status = JobStatus.Disputed;
        emit DisputeRaised(msg.sender, block.timestamp);
    }
    
    function resolveDispute(bool _approveWork) external onlyOwner {
        require(jobDetails.status == JobStatus.Disputed, "No active dispute");
        require(!jobDetails.fundsReleased, "Funds already released");
        
        jobDetails.fundsReleased = true;
        uint256 amount = jobDetails.amount;
        jobDetails.amount = 0;
        
        if (_approveWork) {
            jobDetails.status = JobStatus.Completed;
            jobDetails.completedAt = block.timestamp;
            
            (bool success, ) = jobDetails.freelancer.call{value: amount}("");
            require(success, "Failed to release funds to freelancer");
            
            emit FundsReleased(jobDetails.freelancer, amount);
        } else {
            // Refund to client
            (bool success, ) = jobDetails.client.call{value: amount}("");
            require(success, "Failed to refund client");
        }
        
        emit JobCompleted(block.timestamp);
    }
    
    function getJobDetails() external view returns (JobDetails memory) {
        return jobDetails;
    }
    
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
    
    // Override transfer functions to make NFTs non-transferable
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override {
        require(from == address(0), "Job NFTs are non-transferable");
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }
    
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        
        // Return IPFS hash for metadata
        return string(abi.encodePacked("ipfs://", jobDetails.ipfsHash));
    }
}