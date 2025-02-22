import React, { useState } from "react";
import axios from "axios";
import "./Upload.css"; // Import the CSS file

const Upload = () => {
    const [file, setFile] = useState(null);
    const [skills, setSkills] = useState("");
    const [questions, setQuestions] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please upload a resume first!");
            return;
        }

        const formData = new FormData();
        formData.append("resume", file);

        try {
            const response = await axios.post("http://localhost:5001/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setSkills(response.data.skills);
            setQuestions(response.data.questions);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    return (
        <div className="upload-container">
            <h2>Upload Your Resume</h2>

            <div className="file-upload">
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload}>Upload</button>
            </div>

            {skills && (
                <div className="skills-section">
                    <h3>Extracted Skills:</h3>
                    <div className="skills-list">
                        {skills.split(", ").map((skill, index) => (
                            <span key={index} className="skill-badge">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {questions && (
                <div className="questions-section">
                    <h3>Interview Questions:</h3>
                    <ul>
                        {questions.split("\n").map((question, index) => (
                            <li key={index}>{question}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Upload;
