import React from 'react';

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

      {/* Row 1 - White Background */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
      </div>

      {/* Row 2 - Gray Background */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What Makes Us Different</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Unlike traditional freelance platforms that rely on centralized dispute resolution and manual verification processes, 
              SecureWork leverages cutting-edge blockchain technology and artificial intelligence to create a truly autonomous 
              and trustworthy ecosystem.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Our smart contracts provide immutable escrow protection, ensuring that funds are only released when work meets 
              the agreed-upon standards. The AI verification system reviews submissions against original requirements, 
              providing objective quality assessment that eliminates bias and reduces disputes.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              We've also implemented sophisticated fallback mechanisms that protect both parties: if AI rejects work, 
              clients can override the decision, and if no action is taken within 30 days, freelancers can claim their payment. 
              This ensures fairness and prevents funds from being permanently locked.
            </p>
          </div>
        </div>
      </div>

      {/* Row 3 - Blue to Green Gradient Background */}
      <div className="bg-gradient-to-r from-blue-600 to-emerald-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Mission</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-blue-100 leading-relaxed mb-6">
              To create a world where freelancers and clients can work together with complete trust, knowing that quality work 
              will always be fairly compensated and funds will never be at risk. We believe that technology should eliminate 
              friction, not create it.
            </p>
            
            <p className="text-lg text-blue-100 leading-relaxed mb-6">
              Our vision extends beyond just payments and escrow. We're building a comprehensive ecosystem that includes 
              reputation systems, skill verification, and automated project management tools that make freelancing more 
              efficient and rewarding for everyone involved.
            </p>
            
            <p className="text-lg text-blue-100 leading-relaxed">
              By combining the transparency of blockchain with the intelligence of AI, we're not just solving today's problems—
              we're creating the foundation for the future of work itself.
            </p>
          </div>
        </div>
      </div>

      {/* Row 4 - White Background */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Built With Excellence</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              SecureWork is built on a foundation of proven technologies and innovative approaches. Our smart contracts 
              are written in Solidity using OpenZeppelin's battle-tested libraries, ensuring maximum security and reliability. 
              The frontend leverages React and modern web technologies for a seamless user experience.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              We use IPFS for decentralized storage of job metadata and work submissions, ensuring that important project 
              information remains accessible and tamper-proof. Our AI verification system is powered by advanced language 
              models that can understand and evaluate complex project requirements.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Every component has been carefully selected and integrated to create a platform that is not only functional 
              but also scalable, secure, and user-friendly. We've gone beyond the typical hackathon project to create 
              something truly production-ready.
            </p>

            {/* Official Bolt.new Badge */}
            <div className="text-center">
              <a
                href="https://bolt.new"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block group"
              >
                <div className="bg-gradient-to-r from-blue-600 to-emerald-600 p-8 rounded-2xl transform group-hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto mb-4"
                  >
                    <circle cx="50" cy="50" r="50" fill="white"/>
                    <path
                      d="M30 35L45 20L70 45L55 60L45 50L35 60L30 35Z"
                      fill="#3B82F6"
                    />
                    <path
                      d="M45 50L55 40L70 55L55 70L45 60L55 50L45 50Z"
                      fill="#10B981"
                    />
                    <circle cx="50" cy="50" r="3" fill="#1F2937"/>
                  </svg>
                  <div className="text-white font-bold text-xl mb-2">
                    Built with Bolt.new
                  </div>
                  <div className="text-blue-100 text-sm">
                    Rapid development meets thoughtful engineering
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;