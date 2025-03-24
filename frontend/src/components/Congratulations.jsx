import React, { useState, useEffect } from 'react';
import { CheckCircle, Award, Sparkles, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CongratulationsOverlay = () => {
  const [visible, setVisible] = useState(true);
  const [confetti, setConfetti] = useState([]);
    const navigate = useNavigate();

  // Generate random confetti pieces
  useEffect(() => {
    const colors = ['bg-pink-500', 'bg-blue-500', 'bg-yellow-400', 'bg-green-500', 'bg-purple-500'];
    const newConfetti = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: `${Math.random() * 0.5 + 0.5}rem`,
      animationDuration: `${Math.random() * 3 + 2}s`,
      animationDelay: `${Math.random() * 2}s`,
    }));
    setConfetti(newConfetti);
  }, []);

  const handleClose = () => {
    setVisible(false);
    navigate('/home');
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      {/* Confetti */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className={`absolute ${piece.color} rounded-full animate-fall`}
          style={{
            left: piece.left,
            top: piece.top,
            width: piece.size,
            height: piece.size,
            animationDuration: piece.animationDuration,
            animationDelay: piece.animationDelay,
          }}
        />
      ))}

      {/* Card */}
      <div className="relative bg-white rounded-lg shadow-2xl p-8 m-4 max-w-lg w-full animate-bounce-in text-center">
        {/* <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X size={24} />
        </button> */}

        <div className="mb-6 flex justify-center">
          <div className="relative">
            <CheckCircle size={64} className="text-green-500" />
            <Sparkles size={24} className="text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-2">Congratulations!</h2>
        <p className="text-xl text-gray-600 mb-6">You've successfully completed all interview questions!</p>

        <div className="flex justify-center mb-6">
          <Award size={40} className="text-yellow-500 animate-pulse" />
        </div>

        <p className="text-gray-700 mb-8">
          Hope you do well in your interviews. Thank you for using SkillCraft.
        </p>

        <button
          onClick={handleClose}
          className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105 focus:outline-none"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

// Add keyframe animations
const styles = `
@keyframes fall {
  0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
}

@keyframes bounce-in {
  0% { transform: scale(0.5); opacity: 0; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}

.animate-fall {
  animation-name: fall;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

.animate-bounce-in {
  animation: bounce-in 0.6s ease-out forwards;
}
`;

const CongratulationsWithStyles = () => (
  <>
    <style>{styles}</style>
    <CongratulationsOverlay />
  </>
);

export default CongratulationsWithStyles;