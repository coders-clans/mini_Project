import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mic, MicOff, Send, Code } from 'lucide-react';

const TextSpeechInput = ({ currentQuestion, onTranscriptChange }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [transcriptText, setTranscriptText] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
const [code,setCode] = useState('//Write your code here');
  const [showCompiler, setShowCompiler] = useState(false);
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = "en-US";

      // Increase these values for better recognition
      recognitionInstance.maxAlternatives = 3;
      recognitionInstance.interimResults = true;

      setRecognition(recognitionInstance);
    }
  }, []);

  useEffect(() => {
    if (!recognition) return;

    recognition.onstart = () => {
      setIsListening(true);
      setError('');
    };

    recognition.onresult = (event) => {
      let interimText = '';
      let finalText = transcriptText;

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        
        if (event.results[i].isFinal) {
          // Append new text to existing text instead of replacing
          finalText = finalText ? `${finalText} ${transcript}` : transcript;
          setTranscriptText(finalText.trim());
          onTranscriptChange(finalText.trim());
        } else {
          interimText = transcript;
        }
      }
      
      setInterimTranscript(interimText);
    };

    recognition.onend = () => {
      setIsListening(false);
      // Don't clear interim transcript immediately
      setTimeout(() => {
        setInterimTranscript('');
      }, 1000);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setError(`Speech recognition error: ${event.error}. Please try again.`);
      setIsListening(false);
    };

    // Add this to handle cases where recognition stops unexpectedly
    recognition.onnomatch = () => {
      setError('Could not recognize speech. Please try speaking more clearly.');
    };

    return () => {
      if (isListening) {
        recognition.stop();
      }
    };
  }, [recognition, onTranscriptChange, transcriptText, isListening]);

  const toggleListening = () => {
    if (!recognition) {
      setError('Speech recognition is not supported in your browser');
      return;
    }
    
    if (isListening) {
      recognition.stop();
    } else {
      setError('');
      // Clear interim transcript but keep main transcript
      setInterimTranscript('');
      recognition.start();
    }
  };
  //  const x = localStorage.getItem('daysRemaining');
  const handleTextChange = (e) => {
    setTranscriptText(e.target.value);
    onTranscriptChange(e.target.value);
  };
  useEffect(() => {
    setTranscriptText('');
    setInterimTranscript('');
  }, [currentQuestion]);
  const handleSubmit = async () => {
    if (!transcriptText.trim()) {
        setError('Please provide an answer before submitting');
        return;
    }

    setIsSubmitting(true);
    setError('');
    console.log(currentQuestion);
    console.log(transcriptText + code);
    try {
        const response = await axios.post('http://localhost:5001/api/questions/submit-answer', {
            question: currentQuestion,
            answer: transcriptText + code,
            userId: localStorage.getItem('userId'),
      
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 30000 // 30 second timeout for AI processing
        });

        if (response.data.success) {
            const { feedback } = response.data.data;
            onTranscriptChange(transcriptText, feedback);
        } else {
            setError(response.data.error || 'Failed to submit answer. Please try again.');
        }
    } catch (err) {
        let errorMessage = 'Error submitting answer. Please try again.';
        if (err.response) {
            errorMessage = err.response.data.error || errorMessage;
        } else if (err.request) {
            errorMessage = 'Network error. Please check your connection.';
        }
        setError(errorMessage);
        console.error('Submit error:', err);
    } finally {
        setIsSubmitting(false);
    }
  };

  // Toggle compiler visibility
  const toggleCompiler = () => {
    setShowCompiler(!showCompiler);
  };

 

  return (
    <div className="h-auto bg-gradient-to-br from-gray-50 to-blue-50 p-6">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Interactive Assistant</h2>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Input/Question Area */}
        <div className="flex-1 bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={toggleListening}
                className={`p-3 rounded-full transition-all duration-200 flex items-center ${
                  isListening
                    ? 'bg-red-100 hover:bg-red-200 text-red-500'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
                title={isListening ? 'Stop recording' : 'Start recording'}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                <span className="ml-2 text-sm font-medium">
                  {isListening ? 'Stop' : 'Record'}
                </span>
              </button>
              
              {isListening && (
                <span className="text-sm text-gray-500 animate-pulse ml-2">
                  Listening...
                </span>
              )}
            </div>
            
            <button
              onClick={toggleCompiler}
              className={`p-2 rounded-lg transition-colors duration-200 flex items-center ${
                showCompiler
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title={showCompiler ? "Close Compiler" : "Open Compiler"}
            >
              <Code className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">
                {showCompiler ? 'Hide Code Editor' : 'Show Code Editor'}
              </span>
            </button>
          </div>
          
          <div className="relative mb-4">
            <textarea
              value={transcriptText}
              onChange={handleTextChange}
              className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 min-h-[180px] bg-gray-50 text-gray-800"
              placeholder="Start speaking or type your question here..."
              rows={6}
            />
            
            {interimTranscript && (
              <div className="absolute bottom-4 left-4 right-4 text-gray-500 bg-transparent pointer-events-none italic">
                {interimTranscript}
              </div>
            )}
          </div>
          
          {error && (
            <div className="text-red-500 text-sm p-2 mb-3 bg-red-50 rounded-lg">
              {error}
            </div>
          )}
          
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !transcriptText.trim()}
            className={`w-full px-4 py-3 rounded-lg flex items-center justify-center gap-2 ${
              isSubmitting || !transcriptText.trim()
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
            } text-white transition-colors shadow-sm font-medium`}
          >
            <Send className="w-4 h-4" />
            {isSubmitting ? 'Processing...' : 'Submit'}
          </button>
        </div>
        
        {/* Code Compiler Area - Always shown but conditionally expanded */}
        <div className={`${showCompiler ? 'lg:w-1/2' : 'lg:w-0'} transition-all duration-300 ease-in-out overflow-hidden`}>
          {showCompiler && (
            <div className="h-full bg-white rounded-xl shadow-md border border-gray-200 flex flex-col">
              <div className="border-b border-gray-200 p-4 flex justify-between items-center bg-gray-50 rounded-t-xl">
                <h3 className="font-medium text-gray-800 flex items-center">
                  <Code className="w-4 h-4 mr-2 text-blue-500" />
                  Code Writer
                </h3>
                <div className="flex space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-400"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                  <div className="h-3 w-3 rounded-full bg-green-400"></div>
                </div>
              </div>
              
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 p-4 font-mono text-sm bg-gray-50 border-0 focus:ring-0 resize-none"
                placeholder="// Write your code here..."
              />
           
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
  );
};

export default TextSpeechInput;