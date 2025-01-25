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
import Customguidance from './components/Wasteguidance';
import MapPage from './pages/MapPage';
import Search from './components/Search';
import Checkout from './pages/Checkout';
import CustomLogin from './components/Login';
import CustomRegister from './components/Register';
import CustomSubscription from './components/Subscriptionplans';
import ProtectedRoute from './components/ProtectedRoute'; 

function Layout({ children }) {
  return (
    <>
      <CustomSNavbar /> {/* Every page content with these components */}
      <VoiceNavigation />
      {children}
      <CustomFooter />
    </>
  );
}

function App() {
  const isAuthenticated = true; // Replace with your actual authentication logic

  return (
    <div className="App">
      <Router>
        <Scrolltop />
        <Routes>
          {/* Public Route: Accessible without authentication */}
          <Route
            path="/"
            element={
              <Layout>
                <CustomHome />
              </Layout>
            }
          />

          {/* Protected Routes: These will require authentication */}
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route
              path="/aboutus"
              element={
                <Layout>
                  <Aboutus />
                </Layout>
              }
            />
            <Route
              path="/contact"
              element={
                <Layout>
                  <Contactus />
                </Layout>
              }
            />
            <Route
              path="/feedback"
              element={
                <Layout>
                  <Feedback />
                </Layout>
              }
            />
            <Route
              path="/teamsandconditions"
              element={
                <Layout>
                  <Teamsandconditions />
                </Layout>
              }
            />
            <Route
              path="/privacy"
              element={
                <Layout>
                  <Privacy />
                </Layout>
              }
            />
            <Route
              path="/customprofile"
              element={
                <Layout>
                  <Customprofile />
                </Layout>
              }
            />
            <Route
              path="/customguidance"
              element={
                <Layout>
                  <Customguidance />
                </Layout>
              }
            />
            <Route
              path="/map"
              element={
                <Layout>
                  <MapPage />
                </Layout>
              }
            />
            <Route
              path="/search"
              element={
                <Layout>
                  <Search />
                </Layout>
              }
            />
          </Route>

          {/* Pages without Navbar and Footer (accessible without login) */}
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<CustomLogin />} />
          <Route path="/register" element={<CustomRegister />} />
          <Route path="/customsubscription" element={<CustomSubscription />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
