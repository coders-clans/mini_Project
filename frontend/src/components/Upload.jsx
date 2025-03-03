import React, { useState } from "react";
import axios from "axios";
import "./Upload.css";
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

        if (!interviewDateSubmitted) {
            alert("Please enter how many days are remaining for your interview first!");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append("resume", file);
        formData.append("daysUntilInterview", daysUntilInterview); // Send days info to backend

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
   
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="upload-container max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="relative">
                    {/* Header with wave pattern */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-6 px-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-white">Resume Analyzer</h2>
                            
                        </div>
                    </div>
                    
                    {/* Wave divider */}
                    <div className="absolute -bottom-1 left-0 right-0 h-8 overflow-hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-8 text-white fill-current">
                            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" />
                            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" />
                            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" />
                        </svg>
                    </div>
                </div>

                <div className="p-8">
                    <div className="text-center mb-8">
                        <h3 className="text-xl font-semibold text-gray-700">Upload Your Resume</h3>
                        <p className="text-gray-500 mt-2">Get tailored interview questions based on your skills</p>
                    </div>

                    {/* Interview Days Countdown Input */}
                    {!interviewDateSubmitted ? (
                        <div className="interview-countdown mb-8">
                            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Interview Timeline
                                </h3>
                                <form onSubmit={handleDaysSubmit} className="space-y-4">
                                    <div>
                                        <label htmlFor="daysUntilInterview" className="block text-sm font-medium text-gray-700 mb-1">
                                            How many days are remaining for your interview?
                                        </label>
                                        <input
                                            type="number"
                                            id="daysUntilInterview"
                                            min="0"
                                            value={daysUntilInterview}
                                            onChange={handleDaysInputChange}
                                            placeholder="Enter number of days"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-300 shadow-md flex items-center justify-center font-medium"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Confirm
                                    </button>
                                </form>
                            </div>
                        </div>
                    ) : (
                        <div className="interview-countdown-display mb-8">
                            <div className="bg-green-50 p-4 rounded-xl border border-green-100 shadow-sm flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <div>
                                    <h3 className="font-medium text-gray-800">Interview Timeline</h3>
                                    <p className="text-green-700">
                                        {daysUntilInterview === "0" 
                                            ? "Your interview is today!" 
                                            : daysUntilInterview === "1" 
                                                ? "Your interview is tomorrow!" 
                                                : `${daysUntilInterview} days remaining until your interview`}
                                    </p>
                                </div>
                                <button 
                                    className="ml-auto text-blue-600 hover:text-blue-800"
                                    onClick={() => setInterviewDateSubmitted(false)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="file-upload mb-8">
                        <div className="border-2 border-dashed border-blue-200 rounded-xl p-6 bg-blue-50 hover:bg-blue-100 transition-all duration-300 cursor-pointer">
                            <input 
                                type="file" 
                                onChange={handleFileChange}
                                className="hidden"
                                id="resume-file"
                            />
                            <label htmlFor="resume-file" className="flex flex-col items-center justify-center cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <div className="text-sm text-gray-600">
                                    {file ? (
                                        <p className="font-medium text-blue-600">{file.name}</p>
                                    ) : (
                                        <p>Click to select or drag and drop your resume</p>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 mt-1">PDF, DOCX or TXT formats</p>
                            </label>
                        </div>
                        
                        <button 
                            onClick={handleUpload} 
                            disabled={loading}
                            className={`${loading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} w-full mt-4 text-white py-3 px-6 rounded-lg transition-colors duration-300 shadow-md flex items-center justify-center font-medium`}
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
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Analyze Resume
                                </>
                            )}
                        </button>
                    </div>

                    {loading && (
                        <div className="loading-animation flex flex-col items-center justify-center py-8">
                            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                            <p className="text-blue-600 font-medium">Analyzing your resume...</p>
                            <p className="text-gray-500 text-sm mt-2">Extracting skills and generating relevant questions</p>
                        </div>
                    )}

                    {skills && (
                        <div className="skills-section mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 shadow-sm transition-all duration-500 animate-fadeIn">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                Extracted Skills
                            </h3>
                            <div className="skills-list flex flex-wrap gap-2">
                                {skills.split(", ").map((skill, index) => (
                                    <span 
                                        key={index} 
                                        className="skill-badge inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200 shadow-sm hover:bg-blue-200 transition-colors duration-200"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {questions && !noskill && (
                        <div className="questions-section bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 shadow-sm transition-all duration-500 animate-fadeIn">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Interview Questions
                            </h3>
                            <div className="space-y-4 mb-6">
                                {questions.split("\n").map((question, index) => (
                                    <div 
                                        key={index} 
                                        className="bg-white p-5 rounded-lg border-l-4 border-indigo-500 shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                                    >
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0 mr-4">
                                                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-semibold text-sm shadow-md">
                                                    {index + 1}
                                                </div>
                                            </div>
                                            <div className="text-gray-700 font-medium">
                                                {question.trim()}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button 
                                className={`${saving ? 'bg-green-400 cursor-wait' : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'} text-white py-3 px-6 rounded-lg transition-all duration-300 shadow-md w-full flex items-center justify-center font-medium`}
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
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                                        </svg>
                                        Start Practicing Answers
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                    {noskill && (
                        <div className="no-skills-message bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-5 rounded-lg mb-6 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <div>
                                <p className="font-medium">No skills detected</p>
                                <p className="text-sm mt-1">We couldn't extract any skills from your resume. Please try uploading a different resume or add more skill details to your current one.</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="bg-gray-50 py-4 px-6 border-t border-gray-100 text-center text-gray-500 text-xs">
                    <p>Privacy Notice: Your resume data is processed securely and not stored permanently.</p>
                </div>
            </div>
        </div>
    );
};

export default Upload;