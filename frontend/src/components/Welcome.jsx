import React, { useState, useEffect } from 'react';

const Welcome = ({ username, onComplete, newUser }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [visible, setVisible] = useState(true);
  
  const steps = [
    {
      title: "Welcome to the Platform",
      description: "We're excited to have you join our interview preparation platform. Let's take a quick tour to help you get started."
    },
    {
      title: "Start the Journey",
      description: "Add a profile picture and update your bio to help recruiters get to know you better."
    },
    {
      title: "Accept the Challenge",
      description: "Discover all the tools and resources available to help you ace your interviews with our resume builder and voice recognition features."
    },
    // {
    //   title: "Connect with Others",
    //   description: "Start building your network by connecting with fellow job seekers and industry professionals."
    // }
  ];
  
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding and remove component
      setVisible(false);
      localStorage.removeItem('firstTime');

      if (onComplete) onComplete();
    }
  };
  
  const skipTour = () => {
    // Remove component
    setVisible(false);
    localStorage.removeItem('firstTime');
    if (onComplete) onComplete();
  };

  useEffect(() => {
    const render = () => {
      return (
        newUser === 'true' ? <Welcome /> : null 
      )
    }
    render();
  }, [newUser]);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-indigo-500 opacity-10"></div>
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500 opacity-10"></div>
        
        <div className="relative p-8">
          {/* Confetti illustrations */}
          <div className="absolute top-8 right-8">
            <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="22" cy="25" r="6" fill="#4F46E5" fillOpacity="0.2" />
              <circle cx="74" cy="30" r="4" fill="#8B5CF6" fillOpacity="0.2" />
              <circle cx="60" cy="70" r="8" fill="#EC4899" fillOpacity="0.2" />
              <circle cx="24" cy="80" r="5" fill="#3B82F6" fillOpacity="0.2" />
              <circle cx="80" cy="70" r="3" fill="#4F46E5" fillOpacity="0.2" />
              <rect x="40" y="25" width="10" height="10" transform="rotate(45 40 25)" fill="#8B5CF6" fillOpacity="0.2" />
              <rect x="85" y="40" width="8" height="8" transform="rotate(45 85 40)" fill="#3B82F6" fillOpacity="0.2" />
              <rect x="10" y="50" width="12" height="12" transform="rotate(45 10 50)" fill="#EC4899" fillOpacity="0.2" />
            </svg>
          </div>
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
              {currentStep === 0 ? `Hey ${username}! 👋` : steps[currentStep].title}
            </h1>
            <p className="text-lg text-gray-600 max-w-lg mx-auto">
              {steps[currentStep].description}
            </p>
          </div>
          
          {/* Progress Indicators */}
          <div className="flex justify-center mb-8">
            {steps.map((_, index) => (
              <div 
                key={index}
                className={`w-3 h-3 mx-1 rounded-full ${
                  index === currentStep 
                    ? 'bg-indigo-600' 
                    : index < currentStep 
                      ? 'bg-indigo-300' 
                      : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          {/* Content Area - Different for each step */}
          <div className="mb-8">
            {currentStep === 0 && (
              <div className="flex justify-center">
                <div className="bg-indigo-50 rounded-xl p-6 flex items-center">
                  <div className="w-16 h-16 flex items-center justify-center bg-indigo-100 rounded-full mr-6">
                    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">Create your Resume</h3>
                    <p className="text-gray-600">Our resume builder helps you craft standout resumes tailored for your target roles</p>
                  </div>
                </div>
              </div>
            )}
            
            {currentStep === 1 && (
              <div className="flex justify-center">
                <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
                  <div className="bg-blue-50 rounded-xl p-4 flex flex-col items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                    </div>
                    <h3 className="text-sm font-medium text-center">Upload your Resume</h3>
                  </div>
                  
                  <div className="bg-purple-50 rounded-xl p-4 flex flex-col items-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </div>
                    <h3 className="text-sm font-medium text-center">Extract Skills</h3>
                  </div>
                </div>
              </div>
            )}
            
            {currentStep === 2 && (
              <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                {[
                  { name: 'Resume Builder', desc: 'Create ATS-friendly resumes' },
                  { name: 'Mock Interviews', desc: 'Practice with voice recognition' },
                  { name: 'Answer Judging', desc: 'Get AI feedback on responses' }
                ].map((feature, i) => (
                  <div key={i} className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 border border-gray-200 flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                      i === 0 ? 'bg-blue-100 text-blue-600' : 
                      i === 1 ? 'bg-green-100 text-green-600' : 
                      'bg-amber-100 text-amber-600'
                    }`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        {i === 0 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>}
                        {i === 1 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>}
                        {i === 2 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>}
                      </svg>
                    </div>
                    <h3 className="text-base font-medium text-gray-900">{feature.name}</h3>
                    <p className="text-xs text-gray-500 text-center mt-1">{feature.desc}</p>
                  </div>
                ))}
              </div>
            )}
            
            {/* {currentStep === 3 && (
              <div className="bg-white rounded-xl p-6 max-w-xl mx-auto">
                <div className="flex justify-center space-x-4 mb-6">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center relative overflow-hidden">
                      <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                      </svg>
                      {num === 1 && (
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-center">
                  <button className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg font-medium flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                    </svg>
                    Read Articles
                  </button>
                </div>
              </div>
            )} */}
          </div>
          
          {/* Actions */}
          <div className="flex justify-between items-center">
            <button 
              onClick={skipTour} 
              className="text-gray-500 hover:text-gray-700 font-medium"
            >
              Skip tour
            </button>
            
            <button
              onClick={nextStep}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center"
            >
              {currentStep < steps.length - 1 ? (
                <>
                  Next
                  <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </>
              ) : (
                <>
                  Get Started
                  <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;