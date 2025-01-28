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
import useAuth from './hooks/useAuth';
import AdminLogin from './components/admin components/AdminLogin';
import AdminDashboard from './components/admin components/AdminDashbord';
import AdminProtectedRoute from './components/AdminProtectRoute';

function Layout({ children }) {
  return (
    <>
      <CustomSNavbar />
      <VoiceNavigation />
      {children}
      <CustomFooter />
    </>
  );
}

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    // Show a loading spinner or placeholder while session is being verified
    return <div>Loading...</div>;
  }

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

          {/* Public Routes (Accessible without authentication) */}
          <Route
            path="/aboutus"
            element={
              <Layout>
                <Aboutus />
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

          {/* Protected Routes: These will require authentication */}
          <Route element={<ProtectedRoute isAuthenticated={!!user} />}>
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
              path="/customprofile"
              element={
                <Layout>
                  <Customprofile />
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
            <Route
              path="/checkout"
              element={
                <Layout>
                  <Checkout />
                </Layout>
              }
            />
          </Route>

          {/* Pages without Navbar and Footer (accessible without login) */}
          <Route path="/login" element={<CustomLogin />} />
          <Route path="/register" element={<CustomRegister />} />
          <Route path="/customsubscription" element={<CustomSubscription />} />
          <Route path="/customguidance" element={<Customguidance />} />

          {/* Hidden Route: Admin Login */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admindashbord" element={<AdminDashboard />} />
          {/* Admin Protected Routes */}
          <Route
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
