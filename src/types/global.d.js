// Global type definitions for JavaScript project
// This file helps with IDE intellisense and documentation

/**
 * @typedef {Object} Window
 * @property {Object} [ethereum] - MetaMask ethereum object
 * @property {Function} ethereum.request - Request method for MetaMask
 * @property {Function} ethereum.on - Event listener for MetaMask
 * @property {Function} ethereum.removeAllListeners - Remove event listeners
 * @property {string} [ethereum.selectedAddress] - Currently selected address
 */

/**
 * @typedef {Object} Job
 * @property {string} id - Unique job identifier
 * @property {string} title - Job title
 * @property {string} description - Job description
 * @property {string} price - Job price in ETH
 * @property {string} clientAddress - Client wallet address
 * @property {string} freelancerAddress - Freelancer wallet address
 * @property {'created'|'funded'|'accepted'|'in_progress'|'submitted'|'reviewing'|'completed'|'disputed'} status - Job status
 * @property {Date} createdAt - Creation date
 * @property {string} [ipfsHash] - IPFS hash for metadata
 * @property {string} [contractAddress] - Smart contract address
 * @property {string} [workSubmissionHash] - IPFS hash for submitted work
 * @property {Object} [aiReviewResult] - AI review results
 * @property {boolean} aiReviewResult.passed - Whether AI review passed
 * @property {string} aiReviewResult.feedback - AI feedback
 * @property {number} aiReviewResult.score - AI score (0-100)
 */

/**
 * @typedef {Object} JobMetadata
 * @property {string} title - Job title
 * @property {string} description - Job description
 * @property {string[]} requirements - Job requirements
 * @property {string[]} deliverables - Expected deliverables
 * @property {string} price - Job price in ETH
 * @property {string} clientAddress - Client wallet address
 * @property {string} freelancerAddress - Freelancer wallet address
 * @property {string} createdAt - Creation timestamp
 * @property {string} [jobId] - Job ID
 */

export {};