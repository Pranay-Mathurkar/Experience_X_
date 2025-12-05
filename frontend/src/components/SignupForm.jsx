import { useState } from "react";
import { Link } from "react-router-dom";


export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function validate() {
    if (!name) return "Name required";
    if (!email) return "Email required";

    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) return "Enter a valid email";

    if (!password) return "Password required";
    if (password.length < 6) return "Password must be at least 6 characters";

    if (password !== confirmPassword) return "Passwords do not match";

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
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignup() {
    try {
      window.location.href = "/api/auth/google"; 
    } catch {
      setError("Google signup failed");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-4xl font-bold">Create Account</h2>
      <p className="text-gray-500">Join us and explore the experience.</p>

      {error && <div className="text-sm text-red-600">{error}</div>}

      <div>
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-400"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-400"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-400"
          placeholder="Enter password"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mt-1 block w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-400"
          placeholder="Re-enter password"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-xl font-semibold ${
          loading ? "opacity-60" : "bg-purple-600 text-white"
        }`}
      >
        {loading ? "Creating..." : "Create Account"}
      </button>

      {/* OR separator */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="text-gray-400 text-sm">OR</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      {/* Google Button */}
      <button
        type="button"
        onClick={handleGoogleSignup}
        className="w-full flex items-center justify-center gap-3 p-3 border rounded-xl hover:bg-gray-100 transition"
      >
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google"
          className="w-5 h-5"
        />
        <span>Sign up with Google</span>
      </button>

      <p className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-purple-600">Log in</Link>
      </p>
    </form>
  );
}
