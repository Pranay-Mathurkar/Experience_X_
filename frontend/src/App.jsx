import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import AddReviewPage from "./components/mainPage/AddReviewPage";
import CompanyDetailsPage from "./components/mainPage/CompanyDetailsPage";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/add-review" element={<AddReviewPage />} />
        <Route path="/company/:id" element={<CompanyDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
