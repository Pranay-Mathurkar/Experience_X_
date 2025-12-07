import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import AddReviewPage from "./components/mainPage/AddReviewPage";
import CompanyDetailsPage from "./components/mainPage/CompanyDetailsPage";
import FeaturesPage from "./pages/FeaturesPage";
import PricingPage from "./pages/PricingPage";
import AboutPage from "./pages/AboutPage";
import SignupPage from "./pages/SignupPage";
import ShareExperiencePage from "./pages/ShareExperiencePage";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/add-review" element={<AddReviewPage />} />
          <Route path="/share-experience" element={<ShareExperiencePage />} />
          <Route path="/company/:id" element={<CompanyDetailsPage />} />
          <Route path="/features" element={<FeaturesPage />} /> 
          <Route path="/pricing" element={<PricingPage/>} />
          <Route path="/about" element={<AboutPage/>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}