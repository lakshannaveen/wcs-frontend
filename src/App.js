
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








function App() {
  return (
    <Router>
      <div className="App">
        <CustomSNavbar />
        

        <Routes>
          <Route path="/" element={<CustomHome />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/contact" element={<Contactus />} />
          <Route path="/teamsandconditions" element={<Teamsandconditions />} />
          <Route path="/privacy" element={<Privacy />} />
          
          
        </Routes>
        

        <CustomFooter />
      </div>
    </Router>
  );
}

export default App;
