import SignupForm from "../components/SignupForm";
import IllustrationPanel from "../components/IllustrationPanel";
import { Navbar } from "../components/common/Navbar";
import { Footer } from "../components/common/Footer";

export default function SignupPage() {
  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-6 py-10 animate-fadeIn">
        <div className="flex w-[92%] max-w-6xl h-[750px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 transition-all duration-500 hover:shadow-purple-200 hover:-translate-y-1 hover:scale-[1.01]">
          <div className="w-1/2 p-12 flex flex-col justify-center bg-gradient-to-br from-white via-gray-50 to-gray-100 animate-slideUp">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-6 tracking-tight animate-slideRight">Create Your Account</h2>
            <p className="text-gray-500 mb-10 text-sm leading-relaxed max-w-sm animate-fadeInSlow">Join our community and explore authentic interview experiences from top companies around the world.</p>
            <div className="animate-slideUp delay-150">
              <SignupForm />
            </div>
          </div>

          <div className="w-1/2 bg-gradient-to-br pl-0 from-purple-600 to-indigo-600 text-white relative flex items-center justify-center animate-slideLeft">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-md" />
            <div className="relative z-10 w-full h-full flex items-center justify-center p-12 animate-fadeInSlow">
              <IllustrationPanel />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
