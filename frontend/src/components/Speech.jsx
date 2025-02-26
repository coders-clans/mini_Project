import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mic, MicOff, Send } from 'lucide-react';

const TextSpeechInput = ({ currentQuestion, onTranscriptChange }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [transcriptText, setTranscriptText] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

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
    console.log(transcriptText)
    try {
        const response = await axios.post('http://localhost:5001/api/questions/submit-answer', {
            question: currentQuestion,
            answer: transcriptText,
            userId: localStorage.getItem('userId')
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


  return (
    <div className="relative space-y-4">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleListening}
          className={`p-3 rounded-full transition-colors ${
            isListening 
              ? 'bg-red-100 hover:bg-red-200' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
          title={isListening ? 'Stop recording' : 'Start recording'}
        >
          {isListening ? (
            <MicOff className="w-6 h-6 text-red-500" />
          ) : (
            <Mic className="w-6 h-6 text-gray-600" />
          )}
        </button>
        {isListening && (
          <span className="text-sm text-gray-500 animate-pulse">
            Listening...
          </span>
        )}
      </div>

      <div className="relative">
        <textarea
          value={transcriptText}
          onChange={handleTextChange}
          className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
          placeholder="Start speaking or type your answer here..."
          rows={4}
        />
        {interimTranscript && (
          <div className="absolute bottom-0 left-0 w-full p-4 text-gray-500 bg-transparent pointer-events-none italic">
            {interimTranscript}
          </div>
        )}
      </div>
      
      {error && (
        <div className="text-red-500 text-sm">
          {error}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={isSubmitting || !transcriptText.trim()}
        className={`w-full px-4 py-2 rounded-lg flex items-center justify-center gap-2 ${
          isSubmitting || !transcriptText.trim()
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'
        } text-white transition-colors`}
      >
        <Send className="w-4 h-4" />
        {isSubmitting ? 'Submitting...' : 'Submit Answer'}
      </button>
    </div>
  );
};

export default TextSpeechInput;