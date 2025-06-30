import React from 'react';
import { Shield, Zap, Users, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Blue to Green Gradient */}
      <div className="bg-gradient-to-r from-blue-600 to-emerald-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About SecureWork
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Revolutionizing freelance work through blockchain security and AI-powered verification
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Story Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Story</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              <strong className="text-blue-600">SecureWork</strong> was born during the world's largest hackathon hosted by Devpost on June 11, 2025. 
              Built using the revolutionary <strong>Bolt.new</strong> platform, our project represents the perfect fusion of rapid development 
              and thoughtful engineering.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              What started as a hackathon project quickly evolved into something much more significant. We recognized that the freelance 
              economy needed a solution that could eliminate the trust barriers between clients and freelancers while ensuring fair 
              compensation for quality work.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              Our team didn't just build a prototype—we crafted a production-ready platform with enhanced security features, 
              including one-time funding logic, fallback mechanisms for rejected work, and timeout-based payout options to ensure 
              funds are never stuck in limbo.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">What Makes Us Different</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Blockchain Security</h3>
              <p className="text-gray-700">
                Smart contracts ensure funds are protected with immutable escrow logic and automated release mechanisms.
              </p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered Verification</h3>
              <p className="text-gray-700">
                Advanced AI reviews work submissions to ensure quality standards are met before payment release.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Fair for Everyone</h3>
              <p className="text-gray-700">
                Built-in protections for both clients and freelancers with dispute resolution and timeout mechanisms.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Production Ready</h3>
              <p className="text-gray-700">
                Enhanced beyond the hackathon with real-world security features and edge case handling.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-gray-50 rounded-3xl p-12 mb-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            To create a world where freelancers and clients can work together with complete trust, 
            knowing that quality work will always be fairly compensated and funds will never be at risk.
          </p>
        </div>

        {/* Technology Stack */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Built With Excellence</h2>
          <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl p-8 text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <h3 className="text-lg font-semibold mb-2">Smart Contracts</h3>
                <p className="text-blue-100">Solidity, OpenZeppelin, Hardhat</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Frontend</h3>
                <p className="text-blue-100">React, Tailwind CSS, Ethers.js</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Infrastructure</h3>
                <p className="text-blue-100">IPFS, AI Verification, Web3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bolt.new Badge */}
        <div className="text-center">
          <a
            href="https://bolt.new"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block group"
          >
            <div className="bg-gradient-to-r from-blue-600 to-emerald-600 p-6 rounded-2xl transform group-hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-xl">
              <img
                src="https://raw.githubusercontent.com/openbolt/bolt-badge/main/seal-light.svg"
                alt="Bolt.new badge"
                className="h-12 mx-auto mb-3"
              />
              <div className="text-white font-semibold text-lg">
                Proudly Built with Bolt.new
              </div>
              <div className="text-blue-100 text-sm mt-1">
                Rapid development meets thoughtful engineering
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;