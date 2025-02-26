import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  // Mock interview questions for personality development
  const interviewQuestions = [
    {
      id: 1,
      question: "Tell me about yourself",
      tips: "Focus on professional background, key achievements, and relevance to the role."
    },
    {
      id: 2,
      question: "What are your greatest strengths?",
      tips: "Highlight 2-3 strengths with concrete examples that relate to the job."
    },
    {
      id: 3,
      question: "How do you handle stress and pressure?",
      tips: "Describe specific strategies and provide an example of overcoming a stressful situation."
    }
  ];

  const [isold,setisOld] = useState(false);
  useEffect(() => {
    const fetchQuestions = async () => {
        try {
            const userId = localStorage.getItem('userId');
            const response = await axios.get(`http://localhost:5001/api/questions/questions/${userId}`);

            let questionsList = response.data.data.questions;
            if(questionsList){
                setisOld(true);
            }
        } catch (err) {
            console.error('Error fetching questions:', err);
        }
    };
    fetchQuestions();
}, []);

  // Body language tips with image placeholders
  const bodyLanguageTips = [
    {
      id: 1,
      title: "Maintain Eye Contact",
      description: "Establish trust and confidence by maintaining appropriate eye contact. Look at the interviewer when speaking and listening, but avoid staring.",
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      title: "Open Posture",
      description: "Keep arms uncrossed and shoulders relaxed to appear approachable. Lean slightly forward to show engagement and interest in the conversation.",
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      title: "Confident Handshake",
      description: "A firm handshake conveys confidence and professionalism. Practice a medium-grip handshake that's neither too limp nor too forceful.",
      image: "/api/placeholder/300/200"
    }
  ];



const handletracker  = ()=>{
  navigate('/tracker')
}
 
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold">CareerBoost</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="#" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500 transition">Home</a>
              <a href="#" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500 transition">About</a>
              <button onClick={handletracker} className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500 transition">Track</button>
              <a href="#" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500 transition">Contact</a>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md hover:bg-blue-500 focus:outline-none"
              >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-500">Home</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-500">About</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-500">Services</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-500">Contact</a>
            </div>
          </div>
        )}
      </nav>
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                Boost Your Career Success
              </h1>
              <p className="mt-4 text-xl text-gray-600">
                Prepare for your dream job with expert interview tips, personality development resources, and career guidance.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                {/* <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition shadow-lg">
                  Get Started
                </button> */}
                
                {/* Resume Upload Button */}
                <label className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition shadow-lg flex items-center justify-center" onClick={isold? (()=>navigate('/tracker')):(()=>navigate('/upload'))}>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Upload Resume
                </label>
              </div>
            </div>
            <div className="flex justify-center">
              <img src="/api/placeholder/500/400" alt="Career Success" className="rounded-lg shadow-xl" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Interview Preparation Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Ace Your Interview
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Prepare for common personality development questions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {interviewQuestions.map((question) => (
              <div key={question.id} className="bg-blue-50 rounded-lg p-6 shadow-md hover:shadow-lg transition">
                <h3 className="text-xl font-bold text-blue-800 mb-3">{question.question}</h3>
                <p className="text-gray-700">{question.tips}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition">
              View More Questions
            </button>
          </div>
        </div>
      </div>
      
      {/* Body Language Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Master Your Body Language
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Non-verbal communication matters just as much as what you say
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {bodyLanguageTips.map((tip) => (
              <div key={tip.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition">
                <img src={tip.image} alt={tip.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{tip.title}</h3>
                  <p className="text-gray-700">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl mb-6">
            Ready to level up your career?
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Join thousands of professionals who have enhanced their interview skills and landed their dream jobs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
           {
            userId ? (null):(<button className="bg-white text-blue-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition shadow-lg">
                Sign Up Now
              </button>)
           } 
            <button className="bg-transparent hover:bg-blue-700 border-2 border-white font-bold py-3 px-8 rounded-lg transition">
              Learn More
            </button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">CareerBoost</h3>
              <p className="text-gray-400">Helping you succeed in your professional journey.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Services</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Interview Tips</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Resume Templates</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Career Advice</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"></path></svg>
                </a>
              </div>
              <div className="mt-4">
                <h4 className="font-bold mb-2">Subscribe to our newsletter</h4>
                <div className="flex">
                  <input type="email" placeholder="Your email" className="px-4 py-2 w-full rounded-l-lg text-gray-900" />
                  <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg transition">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-gray-400 text-sm text-center">
            <p>&copy; {new Date().getFullYear()} CareerBoost. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;