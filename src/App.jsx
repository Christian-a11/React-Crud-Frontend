import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import { useContext } from "react";
import { AppContext } from "./Context/AppContext.jsx";
import Create from "./pages/Posts/Create.jsx";
import Show from "./pages/Posts/Show.jsx";
import Update from "./pages/Posts/Update.jsx";

export default function App() {
  const { user } = useContext(AppContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/create" element={user ? <Create /> : <Login />} />
          <Route path="/posts/:id" element={<Show />} />
          <Route
            path="/posts/:id/update"
            element={user ? <Update /> : <Login />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
