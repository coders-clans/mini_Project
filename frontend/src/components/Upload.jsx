import React, { useState } from "react";
import axios from "axios";
// import "./Upload.css";
import { useNavigate } from 'react-router-dom';

const Upload = () => {
    const [file, setFile] = useState(null);
    const [skills, setSkills] = useState("");
    const [questions, setQuestions] = useState("");
    const [noskill, setnoSkill] = useState(false);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [daysUntilInterview, setDaysUntilInterview] = useState("");
    const [interviewDateSubmitted, setInterviewDateSubmitted] = useState(false);
    const navigate = useNavigate();
    
    const cleanAIResponse = (text) => {
        return text
            .replace(/\*/g, "")
            .replace(/\n\s*\n/g, "\n")
            .replace(/^- /gm, "")
            .trim();
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleDaysInputChange = (e) => {
        setDaysUntilInterview(e.target.value);
    };

    const handleDaysSubmit = (e) => {
        e.preventDefault();
        if (daysUntilInterview) {
            setInterviewDateSubmitted(true);
            // You could also store this in localStorage if needed
            localStorage.setItem('daysUntilInterview', daysUntilInterview);
        } else {
            alert("Please enter the number of days until your interview");
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please upload a resume first!");
            return;
        }

     
        setLoading(true);

        const formData = new FormData();
        formData.append("resume", file);

        try {
            const response = await axios.post("http://localhost:5001/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setSkills(response.data.skills);
            setQuestions(cleanAIResponse(response.data.questions));

            if (response.data.questions.message === "No questions generated due to lack of skills.") {
                setnoSkill(true);
            }

        } catch (error) {
            console.error("Error uploading file:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveQuestions = async () => {
        console.log(questions)
        const userId = localStorage.getItem('userId');
        if (!userId) {
            alert("Please login first!");
            return;
        }

        setSaving(true);
        try {
            const response = await axios.post('http://localhost:5001/api/questions/save', {
                userId,
                questions,
                daysUntilInterview // Include interview countdown when saving
            });

            if (response.status === 201) {
                localStorage.setItem('savedQuestions', true);
                localStorage.setItem('daysRemaining',daysUntilInterview);
                navigate('/tracker')
            }

        } catch (error) {
            console.error('Error saving questions:', error);
            alert("Failed to save questions. Please try again.");
        } finally {
            setSaving(false);
        }
    };
    function getRandomColor(index) {
        const colors = [
            '#4F46E5', '#7C3AED', '#2563EB', '#4338CA', 
            '#8B5CF6', '#6366F1', '#3B82F6', '#6D28D9'
        ];
        return colors[index % colors.length];
    }
    
    function getRandomColorShade(index) {
        const colors = [
            '#6366F1', '#8B5CF6', '#60A5FA', '#6D28D9', 
            '#A78BFA', '#818CF8', '#93C5FD', '#8B5CF6'
        ];
        return colors[index % colors.length];
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    Resume Analyzer
                </h1>
                <p className="mt-2 text-xl text-gray-600">Upload your resume and get personalized interview questions</p>
            </div>
            
            {/* Main Content - Side by Side Layout */}
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Column - Upload Section */}
                <div className="lg:w-5/12 bg-white rounded-2xl shadow-xl overflow-hidden transform transition duration-500 hover:scale-[1.01]">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-6 px-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-white flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Upload Resume
                            </h2>
                            <div className="bg-white/20 px-3 py-1 rounded-full text-white text-sm font-medium">
                                AI Powered
                            </div>
                        </div>
                    </div>
    
                    <div className="p-6">
                        {/* File Upload Section */}
                        <div className="file-upload mb-6">
                            <div className="border-3 border-dashed border-indigo-200 rounded-xl p-8 bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 hover:from-indigo-100 hover:via-purple-100 hover:to-blue-100 transition-all duration-300 cursor-pointer transform hover:scale-[1.01] shadow-md">
                                <input 
                                    type="file" 
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="resume-file"
                                />
                                <label htmlFor="resume-file" className="flex flex-col items-center justify-center cursor-pointer">
                                    <div className="rounded-full bg-white p-4 mb-4 shadow-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <div className="text-center">
                                        {file ? (
                                            <div className="animate-pulse">
                                                <p className="font-bold text-indigo-600 text-lg">{file.name}</p>
                                                <p className="text-sm text-indigo-500 mt-1">File selected and ready to analyze</p>
                                            </div>
                                        ) : (
                                            <>
                                                <p className="font-medium text-gray-700 text-lg">Drag and drop your resume here</p>
                                                <p className="text-gray-500 mt-2">- or -</p>
                                                <p className="mt-2 inline-block bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full font-medium">Browse files</p>
                                            </>
                                        )}
                                        <p className="text-xs text-gray-500 mt-4 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Accepts PDF, DOCX or TXT formats
                                        </p>
                                    </div>
                                </label>
                            </div>
                            
                            <button 
                                onClick={handleUpload} 
                                disabled={loading}
                                className={`${loading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transform hover:translate-y-[-2px]'} w-full mt-4 text-white py-3 px-6 rounded-lg transition-all duration-300 shadow-lg flex items-center justify-center font-medium`}
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Analyzing Resume...
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Analyze Resume
                                    </>
                                )}
                            </button>
                        </div>
    
                        {/* Enhanced Loading Animation - Only shows in left column when loading */}
                        {loading && (
                            <div className="loading-animation flex flex-col items-center justify-center py-6 my-2">
                                <div className="relative w-20 h-20">
                                    <div className="absolute inset-0 border-4 border-indigo-200 rounded-full"></div>
                                    <div className="absolute inset-0 border-4 border-t-indigo-600 rounded-full animate-spin"></div>
                                    <div className="absolute inset-0 border-4 border-transparent border-l-purple-600 rounded-full animate-spin-slow"></div>
                                </div>
                                <p className="text-lg font-bold mt-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Analyzing your resume...</p>
                                <div className="mt-2 space-y-1 text-center">
                                    <p className="text-sm text-gray-600">Extracting skills and experience</p>
                                    <p className="text-sm text-gray-600">Generating interview questions</p>
                                </div>
                            </div>
                        )}
    
                        {/* Added Features Section */}
                        {!loading && (
                            <div className="mt-6 space-y-4">
                                <h3 className="text-lg font-bold text-gray-800 mb-2">Key Features</h3>
                                
                                <div className="flex items-start">
                                    <div className="bg-indigo-100 p-2 rounded-full mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-800">AI Skill Extraction</h4>
                                        <p className="text-gray-600 text-sm">Our AI analyzes your resume and identifies key skills</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start">
                                    <div className="bg-purple-100 p-2 rounded-full mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-800">Personalized Questions</h4>
                                        <p className="text-gray-600 text-sm">Get interview questions tailored to your experience</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start">
                                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-800">Secure Processing</h4>
                                        <p className="text-gray-600 text-sm">Your data is processed securely and not stored permanently</p>
                                    </div>
                                </div>
                            </div>
                        )}
    
        
                    </div>
    
                    <div className="bg-gradient-to-r from-gray-50 to-indigo-50 py-4 px-6 border-t border-indigo-100 text-center text-gray-500 text-xs">
                        <div className="flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <p>Privacy Notice: Your resume data is processed securely and not stored permanently</p>
                        </div>
                    </div>
                </div>
                
                {/* Right Column - Results Section */}
                <div className="lg:w-7/12 bg-white rounded-2xl shadow-xl overflow-hidden transform transition duration-500 hover:scale-[1.01]">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-6 px-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-white flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                                Analysis Results
                            </h2>
                            {skills && (
                                <div className="bg-green-500/20 px-3 py-1 rounded-full text-green-100 text-sm font-medium">
                                    Analysis Complete
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="p-6">
                        {/* Initial state when no results */}
                        {!skills && !loading && !noskill && (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <div className="bg-indigo-100 p-5 rounded-full mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Ready to Analyze Your Resume</h3>
                                <p className="text-gray-600 max-w-md">Upload your resume on the left and click "Analyze Resume" to get personalized interview questions and skill analysis.</p>
                                
                                <div className="mt-8 flex flex-col md:flex-row gap-4 text-center">
                                    <div className="bg-indigo-50 p-4 rounded-lg">
                                        <div className="inline-block bg-indigo-100 p-3 rounded-full mb-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <h4 className="text-md font-semibold">Step 1</h4>
                                        <p className="text-sm text-gray-600">Upload your resume in PDF, DOCX, or TXT format</p>
                                    </div>
                                    
                                    <div className="bg-purple-50 p-4 rounded-lg">
                                        <div className="inline-block bg-purple-100 p-3 rounded-full mb-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                        </div>
                                        <h4 className="text-md font-semibold">Step 2</h4>
                                        <p className="text-sm text-gray-600">Click the analyze button and wait for results</p>
                                    </div>
                                    
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <div className="inline-block bg-blue-100 p-3 rounded-full mb-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <h4 className="text-md font-semibold">Step 3</h4>
                                        <p className="text-sm text-gray-600">Get personalized interview questions based on your skills</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        

{/* Skills Section */}
{skills && (
    <div className="skills-section mb-8 bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-md transition-all duration-500 animate-fadeIn transform hover:scale-[1.01]">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Skills
        </h3>
        <div className="skills-list flex flex-wrap gap-2">
            {skills.split(", ").map((skill, index) => (
                <span
                    key={index}
                    className="skill-badge inline-block px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    style={{
                        background: `linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)`,
                        border: '1px solid #d1d5db'
                    }}
                >
                    {skill}
                </span>
            ))}
        </div>
    </div>
)}
                        
                        {/* Questions Section */}
                        {questions && !noskill && (
    <div className="questions-section bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 p-6 rounded-xl border border-indigo-100 shadow-lg transition-all duration-500 animate-fadeIn">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Interview Questions Tailored For You
        </h3>
        <div className="questions-scroll-container max-h-[300px] overflow-y-auto space-y-4 mb-6 pr-2">
            {questions.split("\n").map((question, index) => (
                <div 
                    key={index} 
                    className="bg-white p-5 rounded-lg border-l-4 border-purple-500 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                    <div className="flex items-start">
                        <div className="flex-shrink-0 mr-4">
                            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-sm shadow-md">
                                {index + 1}
                            </div>
                        </div>
                        <div className="text-gray-800 font-medium">
                            {question.trim()}
                        </div>
                    </div>
                </div>
            ))}
        </div>
        
        <button 
            className={`${saving ? 'bg-green-400 cursor-wait' : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700'} text-white py-4 px-6 rounded-lg transition-all duration-300 shadow-lg w-full flex items-center justify-center font-bold text-lg transform hover:translate-y-[-2px]`}
            onClick={handleSaveQuestions}
            disabled={saving}
        >
            {saving ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving Questions...
                </>
            ) : (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                    </svg>
                    Start Practicing Answers
                </>
            )}
        </button>
    </div>
)}
                {/* Enhanced No Skills Message */}
                {noskill && (
                    <div className="no-skills-message bg-amber-50 border border-amber-200 text-amber-800 px-6 py-5 rounded-lg mb-6 flex items-center shadow-md">
                        <div className="bg-amber-100 p-3 rounded-full mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-bold text-amber-800">No skills detected</p>
                            <p className="text-sm mt-1">We couldn't extract any skills from your resume. Please try uploading a different resume or add more skill details to your current one.</p>
                        </div>
                    </div>
                )}
            </div>
    
            {/* <div className="bg-gradient-to-r from-gray-50 to-indigo-50 py-5 px-6 border-t border-indigo-100 text-center text-gray-500 text-sm">
                <div className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <p>Privacy Notice: Your resume data is processed securely and not stored permanently</p>
                </div>
            </div> */}
        </div>
        </div>
        </div>
    </div>
    
    );
};

export default Upload;