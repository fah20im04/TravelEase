import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthContext";
import axiosInstance from "../../Api/axiosInstance";
import axiosPrivate from "../../Api/AxiosPrivate";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle } =
    useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // Validate required fields
    if (!email || !password || !name) {
      setError("Please fill in all required fields.");
      return;
    }

    // Password validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Password must include at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError("Password must include at least one lowercase letter.");
      return;
    }

    try {
      // 1️⃣ Create Firebase user
      const result = await createUser(email, password);
      await updateUserProfile(name, photo);
      const user = result.user;

      // 2️⃣ Save user to backend
      const userData = {
        name,
        email,
        photo,
        createdAt: new Date(),
      };

      const userRes = await axiosPrivate.post("/users", userData);
      console.log("Backend response:", userRes.data);

      // 3️⃣ Request JWT from backend
      const tokenRes = await axiosPrivate.post("/login", { email: user.email });
      const token = tokenRes.data.token;

      if (!token) throw new Error("JWT not received from backend");

      localStorage.setItem("accessToken", token);
      console.log("JWT stored:", token);

      // 4️⃣ Redirect
      navigate("/");
    } catch (err) {
      console.error("Registration error:", err);

      // Handle Firebase email-in-use separately
      if (err.code === "auth/email-already-in-use") {
        setError("Email already in use. Try logging in instead.");
      } else if (err.response?.status === 401) {
        setError("Backend login failed. Make sure the user is saved first.");
      } else {
        setError(err.message || "Registration failed. Try again.");
      }
    }
  };

  // Google sign-in
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      const userData = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        createdAt: new Date(),
      };
      await axiosInstance.post("/users", userData);

      const tokenRes = await axiosInstance.post("/login", {
        email: user.email,
      });
      const token = tokenRes.data.token;
      localStorage.setItem("accessToken", token);

      console.log("Google user saved to MongoDB & JWT stored");
      navigate("/");
    } catch (err) {
      console.error("Google sign-in error:", err);
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center mt-32 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-2">
          Welcome to TravelEase..
        </h2>
        <p className="text-gray-500 text-center mb-6">Create your account</p>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            />

            <label className="block text-sm font-medium text-gray-700 mb-1 mt-3">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            />

            <label className="block text-sm font-medium text-gray-700 mb-1 mt-3">
              Photo URL
            </label>
            <input
              type="text"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              placeholder="Your photo URL"
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2.5 rounded-xl font-medium hover:bg-yellow-600 transition"
          >
            Register
          </button>

          <div className="flex items-center justify-center mt-4">
            <span className="text-gray-400 text-sm">or</span>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center border border-gray-300 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Continue with Google
          </button>

          <p className="text-center text-sm text-gray-600 mt-5">
            Have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Login...
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
