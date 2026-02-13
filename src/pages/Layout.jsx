import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext, API_BASE_URL } from "../Context/AppContext.jsx";
export default function Layout() {
  const { user, token, setToken, setUser, theme, toggleTheme } =
    useContext(AppContext);
  const navigate = useNavigate();
  async function handleLogout(e) {
    e.preventDefault();
    const response = await fetch(`${API_BASE_URL}/api/logout`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
      navigate("/");
    } else {
      const data = await response.json().catch(() => ({}));
      console.error("Logout failed:", {
        status: response.status,
        data: data,
      });
    }
  }
  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b backdrop-blur-md ${theme === "dark" ? "bg-gray-900/80 border-gray-700" : "bg-white/80 border-gray-200"}`}
      >
        <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                📝
              </span>
              <span
                className={`text-xl font-bold transition-colors ${
                  theme === "dark"
                    ? "text-white hover:text-indigo-400"
                    : "text-gray-900 hover:text-indigo-600"
                }`}
              >
                Postify
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            {user ? (
              <div className="flex items-center gap-2 sm:gap-6">
                <div className="hidden md:block">
                  <p
                    className={`text-xs ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Welcome back,
                  </p>
                  <p
                    className={`text-sm font-semibold ${
                      theme === "dark" ? "text-slate-100" : "text-slate-900"
                    }`}
                  >
                    {user.name}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    to={"/create"}
                    className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 text-sm active:scale-95 hover:brightness-110 ${
                      theme === "dark"
                        ? "bg-gradient-to-r from-indigo-600 to-violet-600"
                        : "bg-gradient-to-r from-indigo-600 to-indigo-700"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                    <span className="hidden xs:inline">New Post</span>
                  </Link>
                  <form onSubmit={handleLogout}>
                    <button
                      className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 text-sm active:scale-95 hover:brightness-110 ${
                        theme === "dark"
                          ? "bg-gradient-to-r from-red-600 to-rose-700"
                          : "bg-gradient-to-r from-red-500 to-red-600"
                      }`}
                      type="submit"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                        />
                      </svg>
                      <span className="hidden xs:inline">Logout</span>
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="flex gap-1.5 sm:gap-3">
                <Link
                  to={"/login"}
                  className={`px-2.5 py-2 rounded-lg font-medium transition-colors text-sm ${
                    theme === "dark"
                      ? "text-gray-300 hover:bg-gray-800"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Login
                </Link>
                <Link
                  to={"/register"}
                  className={`px-2.5 py-2 rounded-lg text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 text-sm ${
                    theme === "dark"
                      ? "bg-indigo-600 hover:bg-indigo-500"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                >
                  Register
                </Link>
              </div>
            )}
            <div
              className={`h-6 w-px hidden md:block ${
                theme === "dark" ? "bg-slate-700" : "bg-slate-200"
              }`}
            ></div>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg font-semibold transition-all duration-200 hover:scale-110 ${
                theme === "dark"
                  ? "bg-gray-800 hover:bg-gray-700 text-yellow-300"
                  : "bg-gray-100 hover:bg-gray-200 text-indigo-600"
              }`}
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "🌙" : "☀️"}
            </button>
          </div>
        </nav>
      </header>
      <main
        className={`transition-colors duration-300 min-h-[calc(100vh-65px)] ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <Outlet />
      </main>
    </>
  );
}
