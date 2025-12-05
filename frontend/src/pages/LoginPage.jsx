import LoginForm from "../components/LoginForm";
import IllustrationPanel from "../components/IllustrationPanel";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex bg-white rounded-3xl shadow-xl w-[80%] max-w-5xl overflow-hidden h-[80%]">
        
        {/* LEFT SIDE */}
        <div className="w-1/2 p-12">
          <LoginForm />
        </div>

        {/* RIGHT SIDE */}
        <div className="w-1/2">
          <IllustrationPanel />
        </div>
      </div>
    </div>
  );
}
