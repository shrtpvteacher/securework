import React, { useState } from 'react';
import { X, Upload, DollarSign, User, FileText, Loader } from 'lucide-react';
import { useJobs } from '../context/JobContext';
import { useWallet } from '../context/WalletContext';

const CreateJobModal = ({ onClose }) => {
  const { addJob } = useJobs();
  const { account } = useWallet();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    freelancerAddress: '',
    requirements: [''],
    deliverables: ['']
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleCreateJob = async () => {
    setIsLoading(true);
    
    // Simulate IPFS upload and contract creation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newJob = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      price: formData.price,
      clientAddress: account,
      freelancerAddress: formData.freelancerAddress,
      status: 'created',
      createdAt: new Date(),
      ipfsHash: `QmHash${Date.now()}`,
      contractAddress: `0x${Math.random().toString(16).substr(2, 40)}`
    };

    addJob(newJob);
    setIsLoading(false);
    onClose();
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.title && formData.description && formData.price;
      case 2:
        return formData.freelancerAddress && formData.requirements.some(r => r.trim());
      case 3:
        return formData.deliverables.some(d => d.trim());
      default:
        return false;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Create New Job</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNum 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 4 && (
                  <div className={`h-0.5 w-8 mx-2 ${
                    step > stepNum ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Step {step} of 4: {
              step === 1 ? 'Basic Information' :
              step === 2 ? 'Requirements' :
              step === 3 ? 'Deliverables' :
              'Review & Create'
            }
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Build a React Dashboard"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the project in detail..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (ETH) *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Freelancer Wallet Address *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    value={formData.freelancerAddress}
                    onChange={(e) => handleInputChange('freelancerAddress', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0x..."
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Project Requirements *
                </label>
                {formData.requirements.map((req, index) => (
                  <div key={index} className="flex space-x-2 mb-3">
                    <input
                      type="text"
                      value={req}
                      onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={`Requirement ${index + 1}`}
                    />
                    {formData.requirements.length > 1 && (
                      <button
                        onClick={() => removeArrayItem('requirements', index)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem('requirements')}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  + Add Requirement
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Expected Deliverables *
                </label>
                {formData.deliverables.map((deliverable, index) => (
                  <div key={index} className="flex space-x-2 mb-3">
                    <input
                      type="text"
                      value={deliverable}
                      onChange={(e) => handleArrayChange('deliverables', index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={`Deliverable ${index + 1}`}
                    />
                    {formData.deliverables.length > 1 && (
                      <button
                        onClick={() => removeArrayItem('deliverables', index)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem('deliverables')}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  + Add Deliverable
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Summary</h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-700">Title:</span>
                    <span className="ml-2 text-gray-900">{formData.title}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Price:</span>
                    <span className="ml-2 text-gray-900">{formData.price} ETH</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Freelancer:</span>
                    <span className="ml-2 text-gray-900 font-mono text-sm">{formData.freelancerAddress}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 text-blue-800">
                  <FileText className="h-5 w-5" />
                  <span className="font-medium">Next Steps</span>
                </div>
                <ul className="mt-2 text-sm text-blue-700 space-y-1">
                  <li>• Metadata will be uploaded to IPFS</li>
                  <li>• Smart contract will be deployed</li>
                  <li>• NFTs will be minted for both parties</li>
                  <li>• Freelancer will be notified via email</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t border-gray-200">
          <button
            onClick={step === 1 ? onClose : () => setStep(step - 1)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
            disabled={isLoading}
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </button>

          <button
            onClick={step === 4 ? handleCreateJob : () => setStep(step + 1)}
            disabled={!isStepValid() || isLoading}
            className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <Loader className="h-4 w-4 animate-spin" />
                <span>Creating...</span>
              </>
            ) : (
              <span>{step === 4 ? 'Create Job' : 'Next'}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateJobModal;