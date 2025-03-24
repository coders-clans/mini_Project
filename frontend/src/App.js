import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Upload from './components/Upload';
import Auth from './pages/Auth';
import Login from './pages/Login';
import QuestionTracker from './pages/QuestionTracker';
import TextSpeech from './components/Speech';
import { Home } from 'lucide-react';
import HomePage from './pages/Home';
import ResumeBuilder from './pages/ResumeBuilder'
import About from './pages/About';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/upload" element={<Upload />} />
        <Route path="/" element={<Auth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tracker" element={<QuestionTracker />} />
        <Route path="/speech" element={<TextSpeech />} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/resume-builder" element={<ResumeBuilder/>} />
        <Route path="/about" element={<About/>} />

      </Routes>
    </Router>
  );
}

export default App;