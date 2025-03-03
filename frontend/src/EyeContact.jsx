import React from 'react';
import { Link } from 'react-router-dom';

const EyeContactMasteryPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative">
        <div className="h-96 w-full object-cover">
          <img 
            src="/images/eye-contact-hero.jpg" 
            alt="People making meaningful eye contact" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <Link to="/" className="text-sm font-medium text-indigo-300 hover:text-indigo-200">
              Home
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to="/body-language-tips" className="text-sm font-medium text-indigo-300 hover:text-indigo-200">
              Body Language Tips
            </Link>
            <h1 className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight">Eye Contact Mastery</h1>
            <p className="mt-4 text-xl text-gray-200 max-w-3xl">
              The power of connection through purposeful gaze
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <div className="prose prose-lg prose-indigo max-w-none">
              <h2>The Science Behind Eye Contact</h2>
              <p>
                Eye contact is one of the most powerful forms of nonverbal communication we possess. When we look someone in the eyes, we trigger a cascade of neural connections that build trust, establish dominance, show interest, or communicate emotions - all without saying a word.
              </p>
              <p>
                Studies show that maintaining appropriate eye contact increases your perceived confidence by up to 40% and dramatically improves how trustworthy you appear to others. But there's a fine line between effective eye contact and staring, which can create discomfort.
              </p>

              <h2>The 60-70% Rule</h2>
              <p>
                The ideal amount of eye contact in Western cultures is approximately 60-70% of the conversation. This means you should be looking at the other person's eyes for slightly more than half the time you're speaking, and 80-90% of the time when you're listening.
              </p>
              <p>
                This balanced approach shows attentiveness without appearing intimidating. Remember to break eye contact occasionally by looking briefly to the side (not down, which signals submission or insecurity).
              </p>

              <div className="bg-indigo-50 p-6 rounded-lg my-8">
                <h3 className="text-xl font-semibold text-indigo-800 mb-4">Try this exercise</h3>
                <p className="text-gray-800">
                  During your next three conversations, consciously track your eye contact. Set a mental goal to maintain eye contact for 7 seconds before briefly breaking away. Notice how this affects the quality of your interaction and how engaged the other person becomes.
                </p>
              </div>

              <h2>Eye Contact Across Different Situations</h2>
              <h3>In Professional Settings</h3>
              <p>
                In job interviews and business meetings, confident eye contact demonstrates competence and trustworthiness. Make eye contact with everyone when speaking to a group, spending 3-5 seconds with each person before moving to another.
              </p>

              <h3>In Personal Relationships</h3>
              <p>
                Deeper, more sustained eye contact is appropriate in intimate conversations. Research shows that prolonged eye contact between partners releases oxytocin, strengthening emotional bonds and creating a sense of connection.
              </p>

              <h3>In Public Speaking</h3>
              <p>
                When addressing an audience, divide the room into sections and make deliberate eye contact with one person in each section for 3-5 seconds before moving on. This creates the impression that you're connecting with everyone.
              </p>

              <h2>Common Eye Contact Mistakes</h2>
              <ul>
                <li><strong>Darting eyes:</strong> Constantly shifting your gaze makes you appear nervous or untrustworthy.</li>
                <li><strong>Staring:</strong> Unblinking, intense eye contact can feel aggressive or uncomfortable.</li>
                <li><strong>Looking at other parts of the face:</strong> In many cultures, looking at someone's lips or forehead instead of their eyes can signal romantic interest or create discomfort.</li>
                <li><strong>Screen barrier:</strong> Looking at your phone or computer during conversations dramatically reduces connection quality.</li>
              </ul>

              <h2>Cultural Considerations</h2>
              <p>
                Eye contact norms vary significantly across cultures. In many East Asian cultures, extended eye contact with superiors may be considered disrespectful. Middle Eastern cultures often embrace longer eye contact than Western norms. Always research cultural expectations before important cross-cultural interactions.
              </p>

              <div className="bg-gray-100 p-6 rounded-lg my-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Eye Contact Mastery Checklist</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Maintain eye contact for 60-70% of conversations</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Break contact naturally by looking to the side, not down</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Adjust eye contact based on cultural context</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Practice "triangular gazing" (alternating between both eyes)</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Eliminate distractions during important conversations</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Author section */}
            <div className="mt-12 pt-10 border-t border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img className="h-12 w-12 rounded-full" src="/images/author-avatar.jpg" alt="Author" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-gray-900">Dr. Sarah Johnson</h4>
                  <p className="text-base text-gray-500">Body Language Expert & Communication Coach</p>
                </div>
              </div>
              <p className="mt-4 text-gray-600">
                Dr. Johnson has coached executives and public speakers on nonverbal communication for over 15 years, with a focus on how subtle body language cues impact professional success.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="mt-12 lg:mt-0 lg:col-span-4">
            <div className="sticky top-6">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Related Body Language Tips</h3>
                  <ul className="space-y-4">
                    <li>
                      <Link to="/tips/power-posture" className="text-indigo-600 hover:text-indigo-800 font-medium">
                        Power Posture
                      </Link>
                      <p className="text-sm text-gray-600 mt-1">How to stand tall and project confidence</p>
                    </li>
                    <li>
                      <Link to="/tips/facial-expressions" className="text-indigo-600 hover:text-indigo-800 font-medium">
                        Facial Expressions
                      </Link>
                      <p className="text-sm text-gray-600 mt-1">Master the subtle cues your face reveals</p>
                    </li>
                    <li>
                      <Link to="/tips/strategic-mirroring" className="text-indigo-600 hover:text-indigo-800 font-medium">
                        Strategic Mirroring
                      </Link>
                      <p className="text-sm text-gray-600 mt-1">Build rapport through subtle mimicry</p>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Call to action box */}
              <div className="mt-6 bg-indigo-700 shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Master All Body Language Skills</h3>
                  <p className="text-indigo-100 mb-4">
                    Get access to our complete body language training program with video tutorials, exercises, and personalized feedback.
                  </p>
                  <Link 
                    to="/body-language-training" 
                    className="block w-full px-4 py-2 text-center font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 transition-colors duration-300"
                  >
                    Join the Program
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related tips section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">More Body Language Tips</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Power Posture Card */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
              <div className="h-48 overflow-hidden">
                <img src="/images/posture.jpg" alt="Power posture" className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Power Posture</h3>
                <p className="text-gray-700 mb-4">Stand tall with shoulders back and head high. Good posture signals confidence and helps you appear more authoritative.</p>
                <Link 
                  to="/tips/power-posture" 
                  className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
                >
                  Learn more
                  <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Facial Expressions Card */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
              <div className="h-48 overflow-hidden">
                <img src="/images/facial-expressions.jpg" alt="Facial expressions" className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Facial Expressions</h3>
                <p className="text-gray-700 mb-4">Be mindful of your expressions as they reveal emotions. A genuine smile engages your eyes and creates instant connection.</p>
                <Link 
                  to="/tips/facial-expressions" 
                  className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
                >
                  Learn more
                  <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Purposeful Gestures Card */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
              <div className="h-48 overflow-hidden">
                <img src="/images/gestures.jpg" alt="Hand gestures" className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Purposeful Gestures</h3>
                <p className="text-gray-700 mb-4">Use deliberate hand movements to emphasize points. Open palms suggest honesty while pointing can appear aggressive.</p>
                <Link 
                  to="/tips/purposeful-gestures" 
                  className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
                >
                  Learn more
                  <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer CTA */}
      <div className="bg-indigo-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to master body language?</span>
            <span className="block text-indigo-200">Join our comprehensive training program today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/body-language-training"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
              >
                Get Started
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EyeContactMasteryPage;