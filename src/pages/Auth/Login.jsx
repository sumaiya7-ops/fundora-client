import { motion } from "framer-motion";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useState } from "react";
import { auth } from "../../firebase/firebase.config";
import { Link, useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  const form = e.target;
  const email = form.email.value.trim();
  const password = form.password.value;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    setError("Please enter a valid email address.");
    return;
  }

  if (!password) {
    setError("Please enter your password.");
    return;
  }

  try {
    setLoading(true);

    const result = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    console.log("Logged in user:", result.user);

    navigate("/dashboard");
  } catch (err) {
    console.log("Login error:", err.code);

    if (
      err.code === "auth/invalid-credential" ||
      err.code === "auth/wrong-password" ||
      err.code === "auth/user-not-found"
    ) {
      setError("Incorrect email or password.");
    } else {
      setError("Login failed. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};

const handleGoogleLogin = async () => {
  setError("");

  try {
    setLoading(true);

    const result = await signInWithPopup(auth, googleProvider);

   const googleUserInfo = {
  name: result.user.displayName,
  email: result.user.email,
  photoURL: result.user.photoURL,
  role: "supporter",
};

const response = await fetch("http://localhost:5000/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(googleUserInfo),
});

const userData = await response.json();

if (!response.ok) {
  throw new Error(userData.message || "Failed to save Google user.");
}

console.log("Google MongoDB user:", userData);

navigate("/dashboard");

  } catch (err) {
    console.log("Google login error:", err.code);

    if (err.code === "auth/popup-closed-by-user") {
      setError("Google sign-in popup was closed.");
    } else {
      setError("Google sign-in failed. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <section className="min-h-[calc(100vh-80px)] bg-[#FBFAF7] px-5 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="mx-auto max-w-lg"
      >
        <div className="rounded-[24px] border border-[#E9E7E1] bg-white p-6 shadow-[0_20px_60px_rgba(16,24,40,0.07)] sm:p-10">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8F5EE] text-[#008A5A]">
              <LogIn size={25} />
            </div>

            <h1 className="mt-5 text-3xl font-bold tracking-[-0.035em] text-[#101828]">
              Welcome back
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#667085]">
              Login to continue your Fundora journey.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div>
              <label className="text-sm font-semibold text-[#344054]">
                Email address
              </label>

              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="mt-2 w-full rounded-xl border border-[#DCDAD4] bg-[#FBFAF7] px-4 py-3.5 text-sm text-[#101828] outline-none transition focus:border-[#008A5A] focus:ring-4 focus:ring-[#E8F5EE]"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-[#344054]">
                Password
              </label>

              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-[#DCDAD4] bg-[#FBFAF7] px-4 py-3.5 pr-12 text-sm text-[#101828] outline-none transition focus:border-[#008A5A] focus:ring-4 focus:ring-[#E8F5EE]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#667085] transition hover:text-[#008A5A]"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
              >
                {error}
              </motion.p>
            )}

            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#008A5A] px-5 py-3.5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(0,138,90,0.20)] transition hover:bg-[#007A50]"
            >
              {loading ? "Logging in..." : "Login"}
            </motion.button>
          </form>

          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#E9E7E1]" />
            <span className="text-xs font-medium text-[#98A2B3]">
              OR CONTINUE WITH
            </span>
            <div className="h-px flex-1 bg-[#E9E7E1]" />
          </div>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#DCDAD4] bg-white px-5 py-3.5 text-sm font-bold text-[#344054] transition hover:border-[#008A5A] hover:bg-[#F7FCF9]"
          >
            <svg
  viewBox="0 0 24 24"
  className="h-5 w-5"
  aria-hidden="true"
>
  <path
    fill="#4285F4"
    d="M21.6 12.23c0-.71-.06-1.4-.18-2.06H12v3.9h5.38a4.6 4.6 0 0 1-2 3.02v2.53h3.24c1.9-1.75 2.98-4.33 2.98-7.39Z"
  />
  <path
    fill="#34A853"
    d="M12 22c2.7 0 4.97-.9 6.62-2.38l-3.24-2.53c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.76-5.59-4.12H3.06v2.61A10 10 0 0 0 12 22Z"
  />
  <path
    fill="#FBBC05"
    d="M6.41 13.93A6 6 0 0 1 6.1 12c0-.67.12-1.32.31-1.93V7.46H3.06A10 10 0 0 0 2 12c0 1.61.39 3.14 1.06 4.54l3.35-2.61Z"
  />
  <path
    fill="#EA4335"
    d="M12 5.95c1.47 0 2.79.51 3.83 1.5l2.87-2.87A9.64 9.64 0 0 0 12 2a10 10 0 0 0-8.94 5.46l3.35 2.61C7.2 7.71 9.4 5.95 12 5.95Z"
  />
</svg>
            Continue with Google
          </motion.button>

          <p className="mt-7 text-center text-sm text-[#667085]">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-[#008A5A] hover:underline"
            >
              Create account
            </Link>
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default Login;