import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomSNavbar from './components/Navbar';
import CustomFooter from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomHome from './pages/Home';
import Aboutus from './pages/Aboutus';
import Contactus from './pages/Contactus';
import Feedback from './pages/Feedback';
import Teamsandconditions from './pages/Teamsandconditions';
import Privacy from './pages/Privacy';
import Scrolltop from './components/Scrolltop';
import Customprofile from './components/Profile';
import VoiceNavigation from './components/VoiceNavigation';



function App() {
  return (
    <Router>
      <Scrolltop />
      <div className="App">
        <CustomSNavbar />
        <VoiceNavigation />
        <Routes>
          <Route path="/" element={<CustomHome />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/contact" element={<Contactus />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/teamsandconditions" element={<Teamsandconditions />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/customprofile" element={<Customprofile />} />
        </Routes>
        <CustomFooter />
      </div>
    </Router>
  );
}

export default App;
