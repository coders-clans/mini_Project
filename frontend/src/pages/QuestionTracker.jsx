import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextSpeech from '../components/Speech';
import { useNavigate } from 'react-router-dom';
import CongratulationsWithStyles from '../components/Congratulations';

const QuestionTracker = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [completedQuestions, setCompletedQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [answers, setAnswers] = useState({});
    const[visible ,setVisible] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const response = await axios.get(`https://skill-craft-backend-di79.vercel.app/api/questions/questions/${userId}`);
    
                let questionsList = response.data.data.questions;
    
                if (typeof questionsList === 'string') {
                    questionsList = questionsList
                        .split(/[.\n]/)
                        .map(q => q.trim())
                        .filter(q => q.length > 1);
                }
    
                setQuestions(questionsList);
                setCompletedQuestions(new Array(questionsList.length).fill(false));
                setAnswers(Object.fromEntries(questionsList.map((_, index) => [index, ""])));
                setLoading(false);
            } catch (err) {
                console.error('Error fetching questions:', err);
                setError('No questions found');
                setLoading(false);
            }
        };
    
        fetchQuestions();
    }, []);

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setAnswers(prev => ({
                ...prev,
                [currentQuestionIndex + 1]: { text: "", feedback: null } // Clear the next question's answer box
            }));
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };
    
    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const toggleCompletion = (index) => {
        setCompletedQuestions(prev => {
            const newCompleted = [...prev];
            newCompleted[index] = !newCompleted[index];
            return newCompleted;
        });
    };

    const handleTranscriptChange = (transcript, feedback = null) => {
        setAnswers(prev => ({
            ...prev,
            [currentQuestionIndex]: {
                text: transcript,
                feedback: feedback
            }
        }));
    };

    const allCompleted = completedQuestions.every(Boolean);

    const handleEnd = async () => {
        try {
            const userId = localStorage.getItem('userId');
    
            if (!userId) {
                console.error('No userId found in localStorage');
                return;
            }
    
            await axios.delete(`https://skill-craft-backend-di79.vercel.app/api/questions/delete/${userId}`);
    
            // Remove saved questions from localStorage
            localStorage.removeItem('savedQuestions');
    
            setVisible(true)
            // navigate('/home');
        } catch (error) {
            console.error('Error deleting questions:', error);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                <p className="text-lg text-gray-700">Loading questions...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                {/* <div className="text-red-500 text-xl font-semibold mb-2">Start Now</div> */}
                <p className="text-gray-700">{error}</p>
                <button 
                    onClick={() => navigate('/upload')} 
                    className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors"
                >
                    Start Now!
                </button>
            </div>
        </div>
    );

    if (!questions || questions.length === 0) return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
                <div className="text-amber-500 text-xl font-semibold mb-2">No Questions Found</div>
                <p className="text-gray-700">There are no questions available to practice.</p>
                <button 
                    onClick={() => navigate('/upload')} 
                    className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors"
                >
                    Upload Questions
                </button>
            </div>
        </div>
    );

    const completedCount = completedQuestions.filter(Boolean).length;
    const progressPercentage = (completedCount / questions.length) * 100;

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex flex-col">
            {/* Header with progress bar */}
            <div className="bg-white shadow-md py-4 px-6 fixed top-0 left-0 right-0 z-10">
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center justify-between mb-2">
                        <h1 className="text-xl font-bold text-gray-800">Interview Practice</h1>
                        <div className="text-sm font-medium text-gray-600">
                            {completedCount} of {questions.length} completed
                        </div>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="max-w-5xl mx-auto w-full flex-grow pt-24 pb-20 px-6">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Question header */}
                    <div className="bg-indigo-600 px-6 py-4 text-white">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold">Question {currentQuestionIndex + 1} of {questions.length}</h2>
                            <div className="flex items-center">
                                <label className="inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={completedQuestions[currentQuestionIndex]}
                                        onChange={() => toggleCompletion(currentQuestionIndex)}
                                        className="form-checkbox h-5 w-5 text-white border-white rounded focus:ring-0 focus:ring-offset-0"
                                    />
                                    <span className="ml-2 text-sm">Mark as completed</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Question content */}
                    <div className="p-6">
                        <div className="text-lg font-medium text-gray-800 mb-6">
                            {questions[currentQuestionIndex]}
                        </div>

                        {/* Speech component */}
                        <div className="mb-6">
                            <TextSpeech
                                currentQuestion={questions[currentQuestionIndex]}
                                onTranscriptChange={handleTranscriptChange}
                            />
                        </div>

                        {/* Answer display */}
                        {answers[currentQuestionIndex] && (
                            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <h3 className="font-semibold text-gray-800 mb-2">Your Answer:</h3>
                                <p className="text-gray-700">{answers[currentQuestionIndex].text}</p>
                                
                                {answers[currentQuestionIndex].feedback && (
                                    <div className="mt-6 bg-white rounded-lg border border-gray-200 p-4">
                                        <h3 className="font-semibold text-gray-800 mb-4 pb-2 border-b">AI Feedback</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center">
                                                <span className="font-medium mr-2 text-gray-700">Score:</span>
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                    answers[currentQuestionIndex].feedback.score >= 8 ? 'bg-green-100 text-green-800' :
                                                    answers[currentQuestionIndex].feedback.score >= 6 ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                    {answers[currentQuestionIndex].feedback.score}/10
                                                </span>
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-700 mb-1">Analysis:</h4>
                                                <p className="text-gray-600">{answers[currentQuestionIndex].feedback.feedback}</p>
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-700 mb-1">Strengths:</h4>
                                                <p className="text-gray-600">{answers[currentQuestionIndex].feedback.strengths}</p>
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-700 mb-1">Areas to Improve:</h4>
                                                <p className="text-gray-600">{answers[currentQuestionIndex].feedback.improvement_areas}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Navigation footer */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
                        <button 
                            onClick={handlePrevious}
                            disabled={currentQuestionIndex === 0}
                            className={`px-5 py-2 rounded-md font-medium ${
                                currentQuestionIndex === 0 
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                                    : 'bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50 transition-colors'
                            }`}
                        >
                            Previous
                        </button>
                        <button 
                            onClick={handleNext}
                            disabled={currentQuestionIndex === questions.length - 1}
                            className={`px-5 py-2 rounded-md font-medium ${
                                currentQuestionIndex === questions.length - 1 
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                                    : 'bg-indigo-600 text-white hover:bg-indigo-700 transition-colors'
                            }`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Fixed button at bottom of page when all questions completed */}
            {allCompleted && (
                <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4">
                    <div className="max-w-5xl mx-auto">
                        <button 
                            onClick={handleEnd}
                            className="w-full bg-green-600 text-white py-3 rounded-md font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Complete Practice Session
                        </button>
                    </div>
                </div>
            )}
            {
                visible ? (<CongratulationsWithStyles/>):(null)
            }
        </div>
    );
};

export default QuestionTracker;