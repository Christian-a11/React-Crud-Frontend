import {
  createContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

// Initialize theme immediately on page load (before React renders)
const initializeTheme = () => {
  const saved = localStorage.getItem("theme");
  let theme = saved;

  if (!theme) {
    // Check system preference
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      theme = "dark";
    } else {
      theme = "light";
    }
  }

  // Apply theme to DOM immediately
  const root = document.documentElement;
  root.classList.remove("dark", "light");
  root.classList.add(theme);

  return theme;
};

export const AppContext = createContext(null);

const getBaseUrl = () => {
  let base = import.meta.env.VITE_API_BASE_URL || "";
  // Remove trailing slash if present
  if (base.endsWith("/")) {
    base = base.slice(0, -1);
  }
  // Remove trailing /api if present (since we add it in the components)
  if (base.endsWith("/api")) {
    base = base.slice(0, -4);
  }
  return base;
};

export const API_BASE_URL = getBaseUrl();

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const [theme, setThemeState] = useState(() => {
    return initializeTheme();
  });

  const setTheme = useCallback((newTheme) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme, setTheme]);

  const fetchUserData = useCallback(async () => {
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/user`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Unauthorized");

      const data = await response.json();
      setUser(data);
    } catch {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
    }
  }, [token]);

  // Initialize theme on mount
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    if (token) {
      fetchUserData();
    } else {
      setUser(null);
    }
  }, [token]);

  const value = useMemo(
    () => ({ token, setToken, user, setUser, theme, setTheme, toggleTheme }),
    [token, user, theme, setTheme, toggleTheme],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
