import { useState, useContext } from "react";
import { AppContext, API_BASE_URL } from "../../Context/AppContext";
import { useNavigate, Link } from "react-router-dom";
export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { setToken, theme } = useContext(AppContext);

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch(`${API_BASE_URL}/api/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (!response.ok) {
      if (data.errors) {
        setErrors(data.errors);
      }
      return;
    } else {
      localStorage.setItem("token", data.token);
      navigate("/");
      setToken(data.token);
    }
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
    >
      <div className="w-full max-w-md">
        <div
          className={`p-6 sm:p-10 rounded-2xl border ${theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200 shadow-sm"}`}
        >
          <div className="text-center mb-6 sm:mb-8">
            <Link to="/" className="inline-block mb-4 sm:mb-6">
              <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                📝
              </span>
            </Link>
            <h1
              className={`text-2xl sm:text-4xl font-extrabold tracking-tight mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              Create your Account
            </h1>
            <p className={`text-sm sm:text-base ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              Join Postify and start sharing your stories.
            </p>
          </div>

          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                className={`block text-xs sm:text-sm font-semibold mb-1 sm:mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                htmlFor="name"
              >
                Full Name
              </label>
              <input
                className={`w-full px-4 py-2.5 sm:py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm sm:text-base ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-offset-gray-900" : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-offset-gray-50"}`}
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              {errors.name && (
                <p className="error text-xs mt-1">{errors.name?.[0] ?? errors.name}</p>
              )}
            </div>

            <div>
              <label
                className={`block text-xs sm:text-sm font-semibold mb-1 sm:mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                className={`w-full px-4 py-2.5 sm:py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm sm:text-base ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-offset-gray-900" : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-offset-gray-50"}`}
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              {errors.email && (
                <p className="error text-xs mt-1">{errors.email?.[0] ?? errors.email}</p>
              )}
            </div>

            <div>
              <label
                className={`block text-xs sm:text-sm font-semibold mb-1 sm:mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                htmlFor="password"
              >
                Password
              </label>
              <input
                className={`w-full px-4 py-2.5 sm:py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm sm:text-base ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-offset-gray-900" : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-offset-gray-50"}`}
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              {errors.password && (
                <p className="error text-xs mt-1">
                  {errors.password?.[0] ?? errors.password}
                </p>
              )}
            </div>

            <div>
              <label
                className={`block text-xs sm:text-sm font-semibold mb-1 sm:mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                htmlFor="password_confirmation"
              >
                Confirm Password
              </label>
              <input
                className={`w-full px-4 py-2.5 sm:py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm sm:text-base ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-offset-gray-900" : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-offset-gray-50"}`}
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                placeholder="••••••••"
                value={formData.password_confirmation}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password_confirmation: e.target.value,
                  })
                }
              />
              {errors.password_confirmation && (
                <p className="error text-xs mt-1">
                  {errors.password_confirmation?.[0] ??
                    errors.password_confirmation}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 rounded-lg font-semibold text-white shadow-md hover:shadow-lg transition-all duration-200 bg-indigo-600 hover:bg-indigo-700 text-sm sm:text-base mt-2"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 sm:mt-8 text-center">
            <p
              className={`text-xs sm:text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
            >
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-500 hover:text-indigo-400"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
