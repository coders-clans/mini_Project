import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Upload from './components/Upload';
import Auth from './Auth';
import Login from './Login';
import QuestionTracker from './QuestionTracker';
import TextSpeech from './components/Speech';
import { Home } from 'lucide-react';
import HomePage from './Home';
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

      </Routes>
    </Router>
  );
}

export default App;