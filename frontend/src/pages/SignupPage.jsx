import SignupForm from "../components/SignupForm";
import IllustrationPanel from "../components/IllustrationPanel";

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex bg-white rounded-3xl shadow-xl w-[80%] max-w-5xl h-[800px] overflow-hidden">


        
        {/* LEFT SIDE */}
        <div className="w-1/2 p-12">
          <SignupForm />
        </div>

        {/* RIGHT SIDE */}
        <div className="w-1/2">
          <IllustrationPanel />
        </div>
      </div>
    </div>
  );
}
