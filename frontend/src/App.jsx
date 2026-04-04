import { useState } from "react";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import UploadPage from "./pages/UploadPage";
import DashboardPage from "./pages/DashboardPage";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentPage("upload");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("login");
    alert("Logged out successfully");
  };

  return (
    <div className="app-container">
      <div className="main-card">
        <h1 className="app-title">Expense Classification App</h1>
        <p className="app-subtitle">
          Upload bank statement CSV files, classify expenses, and view summaries
        </p>

        {isLoggedIn && (
          <div className="nav-buttons">
            <button
              className={currentPage === "upload" ? "active" : ""}
              onClick={() => setCurrentPage("upload")}
            >
              Upload CSV
            </button>
            <button
              className={currentPage === "dashboard" ? "active" : ""}
              onClick={() => setCurrentPage("dashboard")}
            >
              Dashboard
            </button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}

        <div className="page-content">
          {!isLoggedIn && currentPage === "login" && (
            <LoginPage
              setCurrentPage={setCurrentPage}
              onLoginSuccess={handleLoginSuccess}
            />
          )}

          {!isLoggedIn && currentPage === "signup" && (
            <SignupPage setCurrentPage={setCurrentPage} />
          )}

          {isLoggedIn && currentPage === "upload" && <UploadPage />}

          {isLoggedIn && currentPage === "dashboard" && <DashboardPage />}
        </div>
      </div>
    </div>
  );
}

export default App;