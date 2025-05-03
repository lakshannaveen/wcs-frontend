import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from './components/Navbar';
import CustomFooter from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomHome from './components/Home';
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
import ContactInquiries from './components/admin components/ContactInquiries';
import ChangePassword from './components/ChnagePassword';
import FeedbackMessage from './components/admin components/FeedbackMessage';
import OrderHistory from './components/OrderHistory';
import Bill from './pages/Bill';
import AdminOrders from './components/admin components/AdminOrder';
import AdminMap from './components/admin components/AdminMap';
import Update from './pages/Update';
import StripePayment from './components/payment';
import AdminRegister from './components/admin components/AdminResgister';
import Admin from './components/admin components/Admin';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

function Layout({ children, toggleDrawer }) {
  return (
    <>
      <CustomNavbar toggleDrawer={toggleDrawer} />
      <VoiceNavigation />
      {children}
      <CustomFooter />
    </>
  );
}

function App() {
  const { user, loading } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="App">
          <Router>
            <Scrolltop />
            
            <Routes>
              {/* Public Route: Accessible without authentication */}
              <Route
                path="/"
                element={
                  <Layout toggleDrawer={toggleDrawer}>
                    <CustomHome />
                  </Layout>
                }
              />

              {/* Public Routes (Accessible without authentication) */}
              <Route
                path="/aboutus"
                element={
                  <Layout toggleDrawer={toggleDrawer}>
                    <Aboutus />
                  </Layout>
                }
              />
              <Route
                path="/teamsandconditions"
                element={
                  <Teamsandconditions />
                }
              />
              <Route
                path="/privacy"
                element={
                  <Layout toggleDrawer={toggleDrawer}>
                    <Privacy />
                  </Layout>
                }
              />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute isAuthenticated={!!user} />}>
                <Route
                  path="/contact"
                  element={
                    <Layout toggleDrawer={toggleDrawer}>
                      <Contactus />
                    </Layout>
                  }
                />
                <Route
                  path="/orderhistory"
                  element={
                    <OrderHistory/>
                  }
                />
                <Route
                  path="/payment"
                  element={
                    <StripePayment/>
                  }
                />
                <Route
                  path="/update/:checkoutId" 
                  element={<Update />}
                />
                <Route
                  path="/feedback"
                  element={
                    <Layout toggleDrawer={toggleDrawer}>
                      <Feedback />
                    </Layout>
                  }
                />
                <Route
                  path="/customprofile"
                  element={
                    <Layout toggleDrawer={toggleDrawer}>
                      <Customprofile />
                    </Layout>
                  }
                />
                <Route
                  path="/map"
                  element={
                    <Layout toggleDrawer={toggleDrawer}>
                      <MapPage />
                    </Layout>
                  }
                />
                <Route
                  path="/search"
                  element={
                    <Layout toggleDrawer={toggleDrawer}>
                      <Search />
                    </Layout>
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <Checkout />
                  }
                />
                <Route
                  path="/bill"
                  element={
                    <Bill />
                  }
                />
                <Route
                  path="/changepassword"
                  element={
                    <ChangePassword />
                  }
                />
              </Route>

              {/* Pages without Navbar and Footer */}
              <Route path="/login" element={<CustomLogin />} />
              <Route path="/register" element={<CustomRegister />} />
              <Route path="/customsubscription" element={<CustomSubscription />} />
              <Route path="/customguidance" element={<Customguidance />} />

              {/* Admin Routes */}
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route
                path="/admindashbord"
                element={
                  <AdminProtectedRoute>
                    <AdminDashboard />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="/contactinquiries"
                element={
                  <AdminProtectedRoute>
                    <ContactInquiries />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="/adminregister"
                element={
                  <AdminProtectedRoute>
                    <AdminRegister />
                  </AdminProtectedRoute>
                }/>
              <Route
                path="/admin"
                element={
                  <AdminProtectedRoute>
                    <Admin />
                  </AdminProtectedRoute>
                }/>
              <Route
                path="/orders"
                element={
                  <AdminProtectedRoute>
                    <AdminOrders />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="/adminmap"
                element={
                  <AdminProtectedRoute>
                    <AdminMap />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="/feedbackmessage"
                element={
                  <AdminProtectedRoute>
                    <FeedbackMessage />
                  </AdminProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;