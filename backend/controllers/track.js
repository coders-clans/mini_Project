const trackModel = require('../models/track');
const Question = require('../models/track');

const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
function cleanQuestions(questions) {
    if (typeof questions === 'string') {
        // Split by newlines and process each line
        return questions
            .split('\n')
            .map(question => question.trim())
            // Remove empty lines
            .filter(question => question.length > 0)
            // Remove numbering and bullets
            .map(question => question.replace(/^[\d\.\)\-\•\*\s]+/, ''))
            // Remove any remaining leading/trailing whitespace
            .map(question => question.trim())
            // Filter out non-questions and headers
            .filter(question => {
                // Check if it ends with a question mark or is a proper question
                return question.endsWith('?') || 
                       question.toLowerCase().startsWith('explain') ||
                       question.toLowerCase().startsWith('describe') ||
                       question.toLowerCase().startsWith('how') ||
                       question.toLowerCase().startsWith('what') ||
                       question.toLowerCase().startsWith('why') ||
                       question.toLowerCase().startsWith('when') ||
                       question.toLowerCase().startsWith('where') ||
                       question.toLowerCase().startsWith('which') ||
                       question.toLowerCase().startsWith('tell');
            });
    }
    return [];
}

const saveQuestions = async (req, res) => {
    try {
        const { questions, userId } = req.body;

        if (!questions || !userId) {
            return res.status(400).json({ error: "Questions and userId are required" });
        }

        // Clean and process the questions
        const cleanedQuestions = cleanQuestions(questions);

        // Only proceed if we have questions after cleaning
        if (cleanedQuestions.length === 0) {
            return res.status(400).json({ error: "No valid questions found after processing" });
        }

        // Save to database
        const newQuestions = new trackModel({
            userId: userId,
            questions: cleanedQuestions
        });

        await newQuestions.save();

        res.status(201).json({
            message: "Questions saved successfully",
            data: newQuestions
        });
    } catch (error) {
        console.error("Error saving questions:", error);
        res.status(500).json({ error: "Failed to save questions" });
    }
};

const getQuestions = async (req, res) => {
    try {
        const userId = req.params.userId;
        const questionsDoc = await trackModel.findOne({ userId });

        if (!questionsDoc || !questionsDoc.questions) {
            return res.status(404).json({ success: false, error: "No questions found for this user" });
        }

        let questionArray;

        if (Array.isArray(questionsDoc.questions)) {
            questionArray = questionsDoc.questions;
        } else if (typeof questionsDoc.questions === 'string') {
            questionArray = questionsDoc.questions
                .split('\n')
                .map(q => q.trim())
                .filter(q => q.length > 0);
        } else {
            return res.status(500).json({ success: false, error: "Invalid questions format" });
        }

        // Return only odd-numbered elements (1-based index → 0, 2, 4, ...)
        const filteredQuestions = questionArray;

        res.status(200).json({
            success: true,
            data: {
                questions: filteredQuestions
            }
        });

    } catch (error) {
        console.error("Error fetching questions:", error);
        res.status(500).json({ success: false, error: "Failed to fetch questions" });
    }
};

const evaluateAnswer = async (req, res) => {
    try {
        const { question, answer, userId } = req.body;
        
        // Input validation
        if (!question || !answer || !userId) {
            return res.status(400).json({
                success: false,
                error: "Question, answer and userId are required"
            });
        }
        
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        
        // Simplified prompt with clear structure
        const prompt =
            "You are an expert interviewer evaluating my answer. " + 
            "Provide a constructive and specific evaluation based on: clarity, technical accuracy, completeness, " + 
            `professional communication, and practical understanding.\n\n` + 
            `Question: ${question}\n` + 
            `Answer: ${answer}\n\n` + 
            "Format your response as ONLY a JSON object with these exact fields:\n" + 
            "{\n" + 
            "  \"score\": (a number between 1-10, or 0 if the answer is completely inadequate),\n" + 
            "  \"feedback\": \"overall feedback here\",\n" + 
            "  \"strengths\": \"key strengths here\",\n" + 
            "  \"improvement_areas\": \"areas to improve here\"\n" + // Fixed missing plus sign
            "}\n" + 
            "Ensure your response contains ONLY this JSON object with no additional text. If the answer is completely inadequate, give a score of 0.";
        
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        
        // Clean the response text before parsing
        const cleanedResponse = responseText
            .trim()
            .replace(/```json\s*|\s*```/g, '') // Removing markdown code blocks
            .replace(/^\s*{\s*/, '{')  // Clean up starting brackets
            .replace(/\s*}\s*$/, '}'); // Clean up ending brackets
        
        let feedback;
        try {
            feedback = JSON.parse(cleanedResponse);
            
            // Validate the feedback object structure
            const requiredFields = ['score', 'feedback', 'strengths', 'improvement_areas'];
            const missingFields = requiredFields.filter(field => !(field in feedback));
            
            if (missingFields.length > 0) {
                throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
            }
            
            // Validate score is a number between 0-10 (updated to include 0)
            if (typeof feedback.score !== 'number' || feedback.score < 0 || feedback.score > 10) {
                throw new Error('Score must be a number between 0 and 10');
            }
        
        } catch (parseError) {
            console.error("Response parsing error:", parseError);
            console.error("Raw response:", responseText);
            console.error("Cleaned response:", cleanedResponse);
            
            return res.status(500).json({
                success: false,
                error: "Failed to parse evaluation feedback",
                details: parseError.message
            });
        }
        
        // Success response
        return res.status(200).json({
            success: true,
            data: { feedback }
        });
        
    } catch (error) {
        console.error("Error evaluating answer:", error);
        return res.status(500).json({
            success: false,
            error: "Failed to evaluate answer",
            details: error.message
        });
    }
};



async function deleteQuestions(req, res){
    try {
        const { userId } = req.params;

        // Delete all questions for the given userId
        const result = await trackModel.deleteMany({ userId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'No questions found for this user' });
        }

        res.json({ message: 'Questions deleted successfully' });
    } catch (error) {
        console.error('Error deleting questions:', error);
        res.status(500).json({ message: 'Server error' });
    }
};




module.exports = {
    saveQuestions,getQuestions,evaluateAnswer,deleteQuestions
};