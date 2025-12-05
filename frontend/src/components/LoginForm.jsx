// src/components/LoginForm.jsx
import { useState } from "react";
import { Link } from "react-router-dom";



export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function validate() {
    if (!email) return "Email required";
    // simple regex just for basic check
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) return "Enter a valid email";
    if (!password) return "Password required";
    if (password.length < 6) return "Password must be at least 6 chars";
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
    try {
      // example API call — change URL to your backend
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      // on success: save token (use HttpOnly cookie ideally)
      // localStorage.setItem("token", data.token); // less secure
      // redirect user
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-4xl font-bold">Holla, <br/> Welcome Back</h2>
      <p className="text-gray-500">Enter your credentials to access your account.</p>

      {error && <div role="alert" className="text-sm text-red-600">{error}</div>}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="you@example.com"
          aria-required="true"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Enter your password"
          aria-required="true"
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="h-4 w-4" />
          Remember me
        </label>
        <a href="/forgot" className="text-purple-600">Forgot password?</a>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-xl font-semibold ${loading ? 'opacity-60' : 'bg-purple-600 text-white'}`}
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>

      <button
    type="button"
    // onClick={handleGoogleLogin}
    className="w-full flex items-center justify-center gap-3 p-3 border rounded-xl hover:bg-gray-100 transition"
    >
    <img
    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
    alt="Google logo"
    className="w-5 h-5"
    />
  <span className="font-semibold">Sign in with Google</span>
</button>


      <p className="text-center text-sm">
        Don't have an account? <Link to="/signup" href="/signup" className="text-purple-600">Sign up</Link>
      </p>
    </form>
  );
}
