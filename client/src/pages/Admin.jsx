import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Navbar from "../components/Navbar";
import Cards from "../components/Cards";
import BookingForm from "../components/BookingForm";
import PatientList from "../components/PatientList";
import "../styles/admin.css";

const Admin = () => {
  const {
    upcomingPatients,
    visitedPatients,
    addPatient,
    nextPatient,
    resetAll,
    logoutAdmin,
  } = useContext(AppContext);
  
  const navigate = useNavigate();
  const [section, setSection] = useState("main");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data) => {
    setIsLoading(true);
    try {
      await addPatient(data);
      setSection("main");
    } catch (error) {
      console.error("Error adding patient:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    navigate("/");
  };

  return (
    
    <div className="admin-bg">
      <Navbar />
      
      <div className="admin-content">
        {/* Admin Header */}
        <header className="admin-header">
          <h1 className="admin-title">Admin Dashboard</h1>
          
          <div className="admin-actions">
            <button 
              className="btn btn-outline" 
              onClick={() => navigate("/")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Home
            </button>
            
            <button 
              className="btn btn-outline"
              onClick={resetAll}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"></path>
              </svg>
              Reset All
            </button>
            
            <button 
              className="btn btn-danger"
              onClick={handleLogout}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Logout
            </button>
          </div>
        </header>

        {/* MAIN ADMIN DASHBOARD */}
        {section === "main" && (
          <div className="admin-main">
            <Cards 
              completed={visitedPatients.length} 
              queue={upcomingPatients.length} 
              wait={upcomingPatients.length * 5} 
            />

            <div className="admin-nav-container">
              <div className="admin-nav-buttons">
                <button 
                  className="btn btn-primary"
                  onClick={() => setSection("form")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  New Patient
                </button>
                
                <button 
                  className="btn btn-outline"
                  onClick={() => setSection("upcoming")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                  Upcoming ({upcomingPatients.length})
                </button>
                
                <button 
                  className="btn btn-outline"
                  onClick={() => setSection("visited")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  Visited ({visitedPatients.length})
                </button>
              </div>
              
              <div className="next-patient-button">
                <button 
                  className="btn btn-primary"
                  onClick={nextPatient}
                  disabled={upcomingPatients.length === 0}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                  Next Patient
                </button>
              </div>
            </div>
          </div>
        )}

        {/* BOOKING FORM */}
        {section === "form" && (
          <div className="admin-section">
            <div className="list-container">
              <BookingForm
                onSubmit={handleSubmit}
                onBack={() => setSection("main")}
                isLoading={isLoading}
              />
            </div>
          </div>
        )}

        {/* UPCOMING LIST */}
        {section === "upcoming" && (
          <div className="admin-section">
            <div className="list-container">
              <div className="list-header">
                <h2 className="list-title">Upcoming Patients</h2>
                <span className="badge">{upcomingPatients.length} patients</span>
              </div>
              <PatientList list={upcomingPatients} />
            </div>
          </div>
        )}

        {/* VISITED LIST */}
        {section === "visited" && (
          <div className="admin-section">
            <div className="list-container">
              <div className="list-header">
                <h2 className="list-title">Visited Patients</h2>
                <span className="badge">{visitedPatients.length} patients</span>
              </div>
              <PatientList list={visitedPatients} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
