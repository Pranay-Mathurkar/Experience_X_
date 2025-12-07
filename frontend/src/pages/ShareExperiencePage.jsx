// src/pages/ShareExperience/ShareExperiencePage.jsx
import React from "react";
import { Navbar } from "../../components/common/Navbar";
import { Footer } from "../../components/common/Footer";
import ShareExperienceForm from "../../components/interview/ShareExperienceForm";

const ShareExperiencePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-blue-50 to-white">
      {/* Top navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1 flex justify-center px-4 md:px-8 py-10 md:py-14">
        <div className="w-full max-w-4xl">
          <ShareExperienceForm />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ShareExperiencePage;
