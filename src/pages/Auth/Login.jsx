import { useState, useContext } from "react";
import { AppContext, API_BASE_URL } from "../../Context/AppContext";
import { useNavigate, Link } from "react-router-dom";
export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { setToken, theme } = useContext(AppContext);

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch(`${API_BASE_URL}/api/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (data.errors) {
      setErrors(data.errors);
      return;
    } else {
      localStorage.setItem("token", data.token);
      //navigate("/");
      setToken(data.token);
    }
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
    >
      <div className="w-full max-w-md">
        <div
          className={`p-8 sm:p-10 rounded-2xl border ${theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200 shadow-sm"}`}
        >
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-6">
              <span className="text-5xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                📝
              </span>
            </Link>
            <h1
              className={`text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              Sign in to Postify
            </h1>
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
              Enter your credentials to continue.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                className={`block text-sm font-semibold mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-offset-gray-900" : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-offset-gray-50"}`}
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
                <p className="error">{errors.email?.[0] ?? errors.email}</p>
              )}
            </div>

            <div>
              <label
                className={`block text-sm font-semibold mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                htmlFor="password"
              >
                Password
              </label>
              <input
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-offset-gray-900" : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-offset-gray-50"}`}
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
                <p className="error">
                  {errors.password?.[0] ?? errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 rounded-lg font-semibold text-white shadow-md hover:shadow-lg transition-all duration-200 bg-indigo-600 hover:bg-indigo-700"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center">
            <p
              className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
            >
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-indigo-500 hover:text-indigo-400"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
