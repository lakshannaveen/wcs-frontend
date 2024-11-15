import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VoiceNavigation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("Your browser does not support voice commands.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
      console.log("Heard:", transcript);

      // Navigation within your app
      if (transcript.includes("go to home")) {
        navigate('/');
      } else if (transcript.includes("go to about")) {
        navigate('/aboutus');
      } else if (transcript.includes("go to contact")) {
        navigate('/contact');
      } else if (transcript.includes("go to feedback")) {
        navigate('/feedback');
      } else if (transcript.includes("go to terms")) {
        navigate('/teamsandconditions');
      } else if (transcript.includes("go to privacy")) {
        navigate('/privacy');
      } else if (transcript.includes("go to profile")) { 
        navigate('/customprofile');
      }

      // navigate to social media pages
      else if (transcript.includes("go to facebook")) {
        window.open("https://www.facebook.com/profile.php?id=61567165493241&mibextid=ZbWKwL");
      } else if (transcript.includes("go to youtube")) {
        window.open("https://youtube.com/@wcs-x3?si=lRB3Qz9z4pqeObtO");
      } else if (transcript.includes("go to instagram")) {
        window.open("https://www.instagram.com/wcs_08/profilecard/?igsh=MWpmbHh1NTcxb3ZqOA==");
      } else if (transcript.includes("go to tiktok")) {
        window.open("https://tiktok.com/@WCS_08");
      }
    };

    recognition.onerror = (error) => {
      console.error("Error with voice commands:", error);
    };

    return () => {
      recognition.stop();
    };
  }, [navigate]);

  return null;
};

export default VoiceNavigation;
