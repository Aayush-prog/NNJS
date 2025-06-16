import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import login from "../assets/login.webp";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({ email: "", password: "", general: "" });

    if (!email) {
      setErrors((prev) => ({ ...prev, email: "Email is required." }));
      return;
    }
    if (!password) {
      setErrors((prev) => ({ ...prev, password: "Password is required." }));
      return;
    }
  };

  return (
    <div>
      <Nav />
      <div className="min-h-screen flex items-center justify-center bg-primary px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-xl overflow-hidden w-full max-w-5xl">
          {/* Form Section */}
          <div className="flex items-center justify-center p-6 sm:p-10 font-secondary">
            <form className="w-full max-w-[400px]" onSubmit={handleSubmit}>
              <h2 className="text-3xl font-extrabold text-primary py-6">
                Admin Login
              </h2>

              {/* Email */}
              <div className="mb-6">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  className={`border text-sm mt-2 pl-3 w-full h-9 rounded-md focus:outline-none ${
                    errors.email
                      ? "border-red-600"
                      : "border-gray-400 focus:border-blue-500 focus:border-2"
                  } text-gray-600`}
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <p className="text-red-600 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="mb-6">
                <label htmlFor="pw" className="text-base">
                  Password
                </label>
                <div className="relative mt-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="pw"
                    className={`border text-sm pl-3 pr-10 w-full h-9 rounded-md focus:outline-none ${
                      errors.password
                        ? "border-red-600"
                        : "border-gray-400 focus:border-blue-500 focus:border-2"
                    } text-gray-600`}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-600 focus:outline-none"
                  >
                    {showPassword ? (
                      <FaEye size={18} />
                    ) : (
                      <FaEyeSlash size={24} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-600 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {/* General Error */}
              {errors.general && (
                <p className="text-red-600 text-xs mb-4">{errors.general}</p>
              )}

              {/* Submit */}
              <button
                className="px-4 py-2 w-full rounded-md mt-10 bg-primary text-white hover:bg-blue-800"
                type="submit"
              >
                Login
              </button>
            </form>
          </div>

          {/* Image Section */}
          <div className="hidden md:block">
            <img
              src={login}
              alt="login pic"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
