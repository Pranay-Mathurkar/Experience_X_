import { useState } from "react";
import { Link } from "react-router-dom";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function validate() {
    if (!isLogin && !name) return "Full name is required";
    if (!email) return "Email address is required";
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) return "Please enter a valid email address";
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setLoading(true);
   
    const endpoint = isLogin ? "/api/login" : "/api/signup";
    const payload = isLogin ? { email, password } : { name, email, password };

    try {
      
      console.log(`Submitting to ${endpoint}`, payload);
      
     
      await new Promise(resolve => setTimeout(resolve, 1500)); 

      
      window.location.href = "/dashboard";
      
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      
      
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-purple-600 transition-colors mb-8 group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
        Back to Home
      </Link>

      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
        
       
        <div className="p-2">
          <div className="relative flex w-full p-1 bg-slate-100 rounded-xl">
           
            <div 
              className={`absolute inset-y-1 w-[calc(50%-4px)] bg-white shadow-sm rounded-lg transition-all duration-300 ease-out z-0
              ${isLogin ? 'left-1' : 'left-[calc(50%+2px)]'}`} 
            />
            
            <button 
              onClick={() => { setIsLogin(true); setError(null); }}
              className={`relative z-10 w-1/2 py-2.5 text-sm font-semibold transition-colors duration-300 ${isLogin ? 'text-slate-900' : 'text-slate-500'}`}
            >
              Log In
            </button>
            <button 
              onClick={() => { setIsLogin(false); setError(null); }}
              className={`relative z-10 w-1/2 py-2.5 text-sm font-semibold transition-colors duration-300 ${!isLogin ? 'text-slate-900' : 'text-slate-500'}`}
            >
              Sign Up
            </button>
          </div>
        </div>

        <div className="px-8 pb-8 pt-4">
          
          
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900">
              {isLogin ? "Welcome back" : "Create an account"}
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              {isLogin ? "Enter your details to access your account." : "Join us to start your interview preparation."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-700 font-medium hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-[0.98]"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
              <span>{isLogin ? "Sign in" : "Sign up"} with Google</span>
            </button>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink-0 mx-4 text-xs text-slate-400 font-medium uppercase">Or continue with</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg animate-fadeIn">
                {error}
              </div>
            )}


            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isLogin ? 'max-h-0 opacity-0' : 'max-h-24 opacity-100'}`}>
              <div className="space-y-1.5 pb-4">
                <label className="block text-sm font-semibold text-slate-700">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            </div>


            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-700">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-700">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
            </div>

          
        

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 rounded-xl font-semibold text-white shadow-lg shadow-purple-500/30 transition-all duration-200 mt-2
                ${loading ? 'bg-purple-400 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-purple-500/40 hover:-translate-y-0.5 active:scale-[0.98]'}`}
            >
              {loading 
                ? (isLogin ? "Signing in..." : "Creating account...") 
                : (isLogin ? "Sign In" : "Create Account")
              }
            </button>

          </form>
        </div>
      </div>

      <p className="text-center text-sm text-slate-500 mt-8">
        {isLogin ? "New to the platform?" : "Already have an account?"}{" "}
        <button 
          onClick={() => setIsLogin(!isLogin)} 
          className="font-semibold text-purple-600 hover:text-purple-500 hover:underline transition-colors"
        >
          {isLogin ? "Create an account" : "Log in"}
        </button>
      </p>

      <style>{`
        .ease-spring { transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1); }
      `}</style>
    </div>
  );
}