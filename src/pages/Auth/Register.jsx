import { motion } from "framer-motion";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);


const handleRegister = async (e) => {
  e.preventDefault();
  setError("");

  const form = e.target;

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const photoURL = form.photoURL.value.trim();
  const password = form.password.value;
  const role = form.role.value;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

  if (!emailRegex.test(email)) {
    setError("Please enter a valid email address.");
    return;
  }

  if (!role) {
    setError("Please select a role.");
    return;
  }

  if (!passwordRegex.test(password)) {
    setError(
      "Password must contain uppercase, lowercase, number and at least 6 characters."
    );
    return;
  }

  try {
    setLoading(true);

    const result = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

   await updateProfile(result.user, {
  displayName: name,
  photoURL,
});

const userInfo = {
  name,
  email,
  photoURL,
  role,
};

const response = await fetch("http://localhost:5000/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(userInfo),
});

const userData = await response.json();

if (!response.ok) {
  throw new Error(userData.message || "Failed to save user.");
}

console.log("MongoDB user:", userData);

form.reset();

} catch (err) {
  console.log("Firebase error code:", err.code);
  console.log("Firebase error message:", err.message);

  if (err.code === "auth/email-already-in-use") {
    setError("An account already exists with this email.");
  } else if (err.code === "auth/invalid-email") {
    setError("Please enter a valid email address.");
  } else {
    setError(err.message);
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
        className="mx-auto max-w-xl"
      >
        <div className="rounded-[24px] border border-[#E9E7E1] bg-white p-6 shadow-[0_20px_60px_rgba(16,24,40,0.07)] sm:p-10">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8F5EE] text-[#008A5A]">
              <UserPlus size={25} />
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

            <h1 className="mt-5 text-3xl font-bold tracking-[-0.035em] text-[#101828]">
              Create your account
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#667085]">
              Join Fundora and start supporting ideas that create impact.
            </p>
          </div>

          <form onSubmit={handleRegister} className="mt-8 space-y-5">
            <div>
              <label className="text-sm font-semibold text-[#344054]">
                Full name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                className="mt-2 w-full rounded-xl border border-[#DCDAD4] bg-[#FBFAF7] px-4 py-3.5 text-sm text-[#101828] outline-none transition focus:border-[#008A5A] focus:ring-4 focus:ring-[#E8F5EE]"
              />
            </div>

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
                Profile picture URL
              </label>

              <input
                type="url"
                name="photoURL"
                placeholder="https://example.com/profile.jpg"
                className="mt-2 w-full rounded-xl border border-[#DCDAD4] bg-[#FBFAF7] px-4 py-3.5 text-sm text-[#101828] outline-none transition focus:border-[#008A5A] focus:ring-4 focus:ring-[#E8F5EE]"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-[#344054]">
                Select role
              </label>

              <select
                name="role"
                defaultValue=""
                className="mt-2 w-full rounded-xl border border-[#DCDAD4] bg-[#FBFAF7] px-4 py-3.5 text-sm text-[#101828] outline-none transition focus:border-[#008A5A] focus:ring-4 focus:ring-[#E8F5EE]"
              >
                <option value="" disabled>
                  Choose your role
                </option>

                <option value="supporter">Supporter — 50 credits</option>
                <option value="creator">Creator — 20 credits</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-[#344054]">
                Password
              </label>

              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a strong password"
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

              <p className="mt-2 text-xs text-[#98A2B3]">
                Use at least 6 characters with uppercase, lowercase and a
                number.
              </p>
            </div>

            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#008A5A] px-5 py-3.5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(0,138,90,0.20)] transition hover:bg-[#007A50]"
            >
              {loading ? "Creating account..." : "Create account"}
            </motion.button>
          </form>

          <p className="mt-7 text-center text-sm text-[#667085]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-[#008A5A] hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default Register;