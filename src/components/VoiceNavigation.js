import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VoiceNavigation = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState(""); // State to show feedback messages
  const [isProcessing, setIsProcessing] = useState(false); // State to debounce commands

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

    recognition.start();

    recognition.onresult = (event) => {
      if (isProcessing) return; // Skip if already processing a command

      const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
      console.log("Heard:", transcript);

      setIsProcessing(true); // Prevent further commands
      if (transcript.includes("go to home")) {
        setFeedback("Navigating to Home...");
        navigate('/');
      } else if (transcript.includes("go to about")) {
        setFeedback("Navigating to About Page...");
        navigate('/aboutus');
      } else if (transcript.includes("go to contact")) {
        setFeedback("Navigating to Contact Page...");
        navigate('/contact');
      } else if (transcript.includes("go to feedback")) {
        setFeedback("Navigating to Feedback Page...");
        navigate('/feedback');
      } else if (transcript.includes("go to terms")) {
        setFeedback("Navigating to Terms and Conditions...");
        navigate('/teamsandconditions');
      } else if (transcript.includes("go to privacy")) {
        setFeedback("Navigating to Privacy Page...");
        navigate('/privacy');
      } else if (transcript.includes("go to profile")) {
        setFeedback("Navigating to Profile...");
        navigate('/customprofile');
      }  else if (transcript.includes("go to subscription plans")) {
        setFeedback("Navigating to subscription plans...");
        navigate('/customsubscription');
      } 
      // Navigate to external links
      else if (transcript.includes("go to facebook")) {
        setFeedback("Opening Facebook...");
        window.open("https://www.facebook.com/profile.php?id=61567165493241&mibextid=ZbWKwL");
      } else if (transcript.includes("go to youtube")) {
        setFeedback("Opening YouTube...");
        window.open("https://youtube.com/@wcs-x3?si=lRB3Qz9z4pqeObtO");
      } else if (transcript.includes("go to instagram")) {
        setFeedback("Opening Instagram...");
        window.open("https://www.instagram.com/wcs_08/profilecard/?igsh=MWpmbHh1NTcxb3ZqOA==");
      } else if (transcript.includes("go to tik tok")) {
        setFeedback("Opening TikTok...");
        window.open("https://tiktok.com/@WCS_08");
      } else {
        setFeedback("Command not recognized. Please try again.");
      }

      // Clear feedback and reset processing state after 3 seconds
      setTimeout(() => {
        setFeedback("");
        setIsProcessing(false);
      }, 3000);
    };

    recognition.onerror = (error) => {
      console.error("Error with voice commands:", error);
      setFeedback("An error occurred. Please try again.");
    };

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
            background: "#333",
            color: "#fff",
            padding: "10px",
            borderRadius: "5px",
            fontSize: "14px",
            zIndex: 1000,
          }}
        >
          {feedback}
        </div>
      )}
    </div>
  );
};

export default VoiceNavigation;
