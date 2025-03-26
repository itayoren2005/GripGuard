import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import MapPage from "./pages/MapPage";
import CalenderPage from "./pages/CalenderPage";
import AdminPage from "./pages/AdminPage";
import TimeLinePage from "./pages/TimeLinePage";
import { DateProvider } from "./context/DateContext";
import { RoleProvider } from "./context/RoleContext";
import { setupAxiosInterceptors } from "./api/registerApi";

function App() {
  setupAxiosInterceptors();
  return (
    <RoleProvider>
      <DateProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/observer" element={<MapPage />} />
            <Route path="/investigator" element={<CalenderPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/timeline" element={<TimeLinePage />} />
            <Route path="/" element={<Navigate to="/home" replace />} />
          </Routes>
        </BrowserRouter>
      </DateProvider>
    </RoleProvider>
  );
}

export default App;
