import Navbar from "../components/Navbar";
import Cards from "../components/Cards";
import BookingForm from "../components/BookingForm";
import "../styles/home.css";

import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { addPatient, adminLogged, visitedPatients, upcomingPatients } = useContext(AppContext);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await addPatient(data);
      setShowForm(false);
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  };

  return (
    <div className="home-container">
      <Navbar />

      <main className="home-content">
        {!showForm ? (
          <div className="home-hero">
            <div className="stats-container">
              <Cards 
                completed={visitedPatients.length} 
                queue={upcomingPatients.length} 
                wait={upcomingPatients.length * 5} 
              />
            </div>

            <div className="action-buttons">
              <button 
                className="patient-btn"
                onClick={() => setShowForm(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                New Patient Booking
              </button>

              <button 
                className="login-btn"
                onClick={() => navigate(adminLogged ? "/admin" : "/login")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                  <polyline points="10 17 15 12 10 7"></polyline>
                  <line x1="15" y1="12" x2="3" y2="12"></line>
                </svg>
                {adminLogged ? 'Admin Dashboard' : 'Admin Login'}
              </button>
            </div>
          </div>
        ) : (
          <div className="booking-form-container">
            <BookingForm
              onSubmit={handleSubmit}
              onBack={() => setShowForm(false)}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
