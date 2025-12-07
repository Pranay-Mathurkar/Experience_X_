import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import ShareExperienceForm from "./pages/ShareExperienceForm";
import AboutPage from "./pages/AboutPage";
import SignupPage from "./pages/SignupPage";
import { AuthProvider } from "./contexts/AuthContext";
import Company from "./pages/company";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/home" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/share-experience" element={<ShareExperienceForm />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/company/:companyName" element={<Company />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
