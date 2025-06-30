import { create } from 'ipfs-http-client';
import { config } from '../config/env';

// IPFS client configuration for Pinata
const ipfsClient = create({
  host: 'api.pinata.cloud',
  port: 443,
  protocol: 'https',
  headers: {
    authorization: `Bearer ${config.pinataJWT}`
  }
});

export const uploadJobMetadata = async (metadata) => {
  try {
    if (!config.pinataJWT) {
      throw new Error('Pinata JWT not configured');
    }

    const metadataWithTimestamp = {
      ...metadata,
      createdAt: new Date().toISOString(),
      version: '1.0'
    };

    // Upload to IPFS via Pinata
    const result = await ipfsClient.add(JSON.stringify(metadataWithTimestamp, null, 2));
    
    console.log('Metadata uploaded to IPFS:', result.path);
    return result.path;
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw new Error('Failed to upload metadata to IPFS');
  }
};

export const getJobMetadata = async (ipfsHash) => {
  try {
    const response = await fetch(`https://gateway.pinata.cloud/ipfs/${ipfsHash}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch metadata from IPFS');
    }
    
    const metadata = await response.json();
    return metadata;
  } catch (error) {
    console.error('Error fetching from IPFS:', error);
    throw new Error('Failed to fetch metadata from IPFS');
  }
};

export const uploadWorkFiles = async (files) => {
  try {
    if (!config.pinataJWT) {
      throw new Error('Pinata JWT not configured');
    }

    // For multiple files, create a directory structure
    const fileData = new FormData();
    
    files.forEach((file, index) => {
      fileData.append('file', file, `work-files/${file.name}`);
    });

    // Upload via Pinata API
    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.pinataJWT}`
      },
      body: fileData
    });

    if (!response.ok) {
      throw new Error('Failed to upload files to IPFS');
    }

    const result = await response.json();
    console.log('Work files uploaded to IPFS:', result.IpfsHash);
    
    return result.IpfsHash;
  } catch (error) {
    console.error('Error uploading work files:', error);
    throw new Error('Failed to upload work files to IPFS');
  }
};