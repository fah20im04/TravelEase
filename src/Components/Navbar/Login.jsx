import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext";
import axiosPrivate from "../../Api/AxiosPrivate";
import axiosInstance from "../../Api/axiosInstance";

const Login = () => {
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  /* =====================
     STATE
  ====================== */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* =====================
     LOGIN HANDLER
  ====================== */
  const handleLogin = async (e) => {
    e?.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn(email, password);

      const tokenRes = await axiosPrivate.post("/login", {
        email: result.user.email,
      });

      localStorage.setItem("accessToken", tokenRes.data.token);
      navigate("/");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  /* =====================
     DEMO AUTO-FILL + LOGIN
  ====================== */
  /* =====================
    DEMO AUTO-FILL ONLY
====================== */
  const handleDemoLogin = (role) => {
    const demoCredentials = {
      user: {
        email: "demo@user.com",
        password: "DemoUser1!",
      },
    };

    const demo = demoCredentials[role];

    setError("");

    setEmail(demo.email);
    setPassword(demo.password);
  };

  /* =====================
     GOOGLE LOGIN
  ====================== */
  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const result = await signInWithGoogle();
      const user = result.user;

      await axiosInstance.post("/users", {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        createdAt: new Date(),
      });

      const tokenRes = await axiosInstance.post("/login", {
        email: user.email,
      });

      localStorage.setItem("accessToken", tokenRes.data.token);
      navigate("/");
    } catch {
      setError("Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  /* =====================
     UI
  ====================== */
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-darkBg">
      <div className="w-full max-w-md bg-white dark:bg-darkCard rounded-2xl shadow-xl p-8">
        {/* Header */}
        <h2 className="text-3xl font-bold text-center text-blue-700">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mt-1 mb-8">
          Login to continue to{" "}
          <span className="font-bold text-blue-800">TravelEase</span>
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-700 bg-white text-blue-700"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-700 bg-white text-blue-700"
          />

          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Demo Section */}
        <div className="mt-6">
          <p className="text-center text-sm text-gray-500 mb-3">
            Try with demo credentials
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => handleDemoLogin("user")}
              className="w-full border py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Demo User
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

        {/* Google */}
        <button
          onClick={handleGoogleLogin}
          className="w-full border py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5"
          />
          Continue with Google
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-primary font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
