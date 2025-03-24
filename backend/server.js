const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const cors = require("cors");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const userRoutes = require('./routes/user')
const questionRoutes = require('./routes/track')
const app = express();
const db = require('./db')
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET","DELETE"],
    allowedHeaders: ["Content-Type"]
}));
app.use(express.json());

// Multer storage for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// API Keys
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Function to extract text from PDF
async function extractTextFromPDF(buffer) {
    const data = await pdfParse(buffer);
    return data.text;
}

// Function to extract text from DOCX
async function extractTextFromDocx(buffer) {
    const { value } = await mammoth.extractRawText({ buffer: buffer });
    return value;
}

// Function to find and extract the skills section
function extractSkillsSection(text) {
    const regex = /skills?:?\s*(.*?)(?:\n\n|\r\n\r\n|$)/i;
    const match = text.match(regex);
    return match ? match[1] : text; // If no section is found, process the full text
}

// Function to extract skills using Gemini AI
async function extractSkillsUsingGemini(text) {
    try {
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const prompt = `Extract only the skills from the following resume text:\n\n"${text}".\n\nReturn a comma-separated list of skills.`;

        const response = await model.generateContent(prompt);
        const extractedSkills = response.response.candidates[0].content.parts[0].text;

        return extractedSkills || "No skills found";
    } catch (error) {
        console.error("\n❌ Error with Gemini API:", error);
        return "Failed to extract skills.";
    }
}

// Fallback: Extract skills using regex-based keyword matching
function extractSkillsLocally(text) {
    const skillsList = ["JavaScript", "Python", "React", "Node.js", "Machine Learning", "SQL", "CSS", "HTML", "AWS", "Docker", "Java", "C++"];
    const foundSkills = skillsList.filter(skill => text.toLowerCase().includes(skill.toLowerCase()));
    return foundSkills.length > 0 ? foundSkills.join(", ") : "No skills found";
}

// Function to generate interview questions using Gemini API
async function generateInterviewQuestions(skills) {
    try {
        if (skills === "No skills found") {
            return "No questions generated due to lack of skills.";
        }

        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        const prompt = `Generate 15 to 20 interview questions for a candidate skilled in ${skills}.
Follow these strict rules:

1. Return ONLY the questions, one per line
2. NO numbers/bullets before questions
3. NO topic headers or categories
4. NO explanations or additional text
5. Each line should be a complete question
6. Questions should be practical and commonly asked in interviews
7. Sort from basic to advanced difficulty

Example format:
What is your experience with X?
How would you handle Y in a professional setting?
Explain the concept of Z?
Write down the code for A.
dont give anything else except the questions.
`;

        const response = await model.generateContent(prompt);
        const questions = response.response.candidates[0].content.parts[0].text;

        return questions;
    } catch (error) {
        console.error("\n❌ Error with Gemini API:", error);
        return "Failed to generate interview questions.";
    }
}


// Upload and process resume
app.post("/upload", upload.single("resume"), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: "No file uploaded" });

        let text = "";
        if (req.file.mimetype === "application/pdf") {
            text = await extractTextFromPDF(req.file.buffer);
        } else if (
            req.file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
            text = await extractTextFromDocx(req.file.buffer);
        } else {
            return res.status(400).json({ error: "Invalid file format" });
        }

        // Extract skills section if available
        const skillsSection = extractSkillsSection(text);

        // Extract skills using Gemini AI
        let skills = await extractSkillsUsingGemini(skillsSection);

        // If Gemini fails, use regex-based extraction
        if (skills === "Failed to extract skills.") {
            skills = extractSkillsLocally(skillsSection);
        }

        // Generate interview questions
        const questions = await generateInterviewQuestions(skills);

        res.json({ skills, questions });
    } catch (error) {
        console.error("Processing error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});




app.use('/api/questions', questionRoutes);
app.use("/user",userRoutes);
// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
