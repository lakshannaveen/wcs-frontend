import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VoiceNavigation = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("Your browser does not support voice commands.");
      setFeedback("Voice commands are not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    // Smooth navigation function
    const smoothNavigate = (path, isExternal = false) => {
      setFeedback(`Navigating to ${path}...`);
      setTimeout(() => {
        if (isExternal) {
          window.open(path, '_blank');
        } else {
          navigate(path);
        }
        setIsProcessing(false);
      }, 500); // Small delay for smoother transition
    };

    recognition.onresult = (event) => {
      if (isProcessing) return;

      const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
      console.log("Heard:", transcript);

      setIsProcessing(true);

      // Navigation commands mapping
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
        'go to tiktok': () => smoothNavigate('https://tiktok.com/@WCS_08', true) // Alternative command
      };

      // Find and execute the matching command
      const commandKey = Object.keys(commands).find(key => transcript.includes(key));
      if (commandKey) {
        commands[commandKey]();
      } else {
        setFeedback("Command not recognized. Please try again.");
        setIsProcessing(false);
      }

      // Clear feedback after 3 seconds if not already cleared by navigation
      setTimeout(() => {
        if (feedback) {
          setFeedback("");
        }
      }, 3000);
    };

    recognition.onerror = (error) => {
      console.error("Error with voice commands:", error);
      setFeedback("An error occurred. Please try again.");
      setIsProcessing(false);
    };

    // Start recognition with error handling
    try {
      recognition.start();
    } catch (error) {
      console.error("Failed to start voice recognition:", error);
      setFeedback("Failed to start voice recognition. Please refresh the page.");
    }

    return () => {
      recognition.stop();
    };
  }, [navigate, isProcessing, feedback]);

  return (
    <div>
      {feedback && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "20px",
            background: "#333",
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