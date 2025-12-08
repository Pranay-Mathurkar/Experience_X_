import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./contexts/AuthContext";

import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AboutPage from "./pages/AboutPage";
import FeaturesPage from "./pages/FeaturesPage";
import PricingPage from "./pages/PricingPage";
import ShareExperiencePage from "./pages/ShareExperiencePage";


import AddReviewPage from "./components/mainPage/AddReviewPage";
import CompanyDetailsPage from "./components/mainPage/CompanyDetailsPage";


import MyAccount from "./pages/myaccount";
import EditExperiencePage from "./pages/EditExperiencePage";
import ChatPage from "./pages/chatpage";
import ExperienceDetail from "./pages/detail";

export default function App() {
  return (
   
    <GoogleOAuthProvider clientId="381584583012-olmoapqkkp793s9f6kohca34lnks6m7t.apps.googleusercontent.com">
      <BrowserRouter>
        <AuthProvider>
          <Routes>

            <Route path="/" element={<MainPage />} />
            <Route path="/home" element={<MainPage />} /> {/* Added alias for safety */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            
            <Route path="/features" element={<FeaturesPage />} /> 
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/about" element={<AboutPage />} />

            <Route path="/add-review" element={<AddReviewPage />} />
            <Route path="/share-experience" element={<ShareExperiencePage />} />
            <Route path="/company/:id" element={<CompanyDetailsPage />} /> {/* Using the new Polished Page */}
            
            <Route path="/account" element={<MyAccount />} />
            <Route path="/edit/:id" element={<EditExperiencePage />} />
            <Route path="/experience/:id" element={<ExperienceDetail />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/chat/:userId" element={<ChatPage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}