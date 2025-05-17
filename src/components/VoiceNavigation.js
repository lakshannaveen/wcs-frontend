import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VoiceNavigation = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("Your browser does not support voice commands.");
      setFeedback("Voice commands are not supported in this browser.");
      setError(true);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    const smoothNavigate = (path, isExternal = false) => {
      setFeedback(`Navigating to ${path.replace('/', '').replace(/-/g, ' ') || 'home'}...`);
      setError(false);
      setTimeout(() => {
        if (isExternal) {
          window.open(path, '_blank');
        } else {
          navigate(path);
        }
        setIsProcessing(false);
      }, 500);
    };

    recognition.onresult = (event) => {
      if (isProcessing) return;

      const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
      console.log("Heard:", transcript);

      setIsProcessing(true);
      setError(false);

      const commands = {
        'go to home': () => smoothNavigate('/'),
        'go to about': () => smoothNavigate('/aboutus'),
        'go to contact': () => smoothNavigate('/contact'),
        'go to feedback': () => smoothNavigate('/feedback'),
        'go to terms': () => smoothNavigate('/teamsandconditions'),
        'go to privacy': () => smoothNavigate('/privacy'),
        'go to profile': () => smoothNavigate('/customprofile'),
        'go to subscription plans': () => smoothNavigate('/customsubscription'),
        'go to facebook': () => smoothNavigate('https://www.facebook.com/profile.php?id=61567165493241&mibextid=ZbWKwL', true),
        'go to youtube': () => smoothNavigate('https://youtube.com/@wcs-x3?si=lRB3Qz9z4pqeObtO', true),
        'go to instagram': () => smoothNavigate('https://www.instagram.com/wcs_08/profilecard/?igsh=MWpmbHh1NTcxb3ZqOA==', true),
        'go to tik tok': () => smoothNavigate('https://tiktok.com/@WCS_08', true),
        'go to tiktok': () => smoothNavigate('https://tiktok.com/@WCS_08', true)
      };

      const commandKey = Object.keys(commands).find(key => transcript.includes(key));

      if (commandKey) {
        commands[commandKey]();
      } else {
        setFeedback("Command not recognized. Please try again.");
        setError(true);
        setIsProcessing(false);
      }

      // Auto-clear feedback
      setTimeout(() => {
        setFeedback("");
        setError(false);
      }, 4000);
    };

    recognition.onerror = (err) => {
      console.error("Speech recognition error:", err);
      if (!isProcessing) {
        setFeedback("An error occurred. Please try again.");
        setError(true);
      }
      setIsProcessing(false);
    };

    try {
      recognition.start();
    } catch (error) {
      console.error("Recognition start failed:", error);
      setFeedback("Failed to start voice recognition.");
      setError(true);
    }

    return () => {
      recognition.stop();
    };
  }, [navigate, isProcessing]);

  return (
    <div>
      {feedback && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "20px",
            background: error ? "#c0392b" : "#2ecc71",
            color: "#fff",
            padding: "15px",
            borderRadius: "8px",
            fontSize: "16px",
            zIndex: 1000,
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            animation: "fadeIn 0.3s ease-in-out",
            maxWidth: "300px",
            wordWrap: "break-word"
          }}
        >
          {feedback}
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default VoiceNavigation;
