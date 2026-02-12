import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext, API_BASE_URL } from "../../Context/AppContext";

export default function Create() {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });
  const { token, theme } = useContext(AppContext);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch(`${API_BASE_URL}/api/posts`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("Post Creation Error:", {
        status: response.status,
        data: data,
      });
      if (data.errors) {
        setErrors(data.errors);
      }
      return;
    } else {
      navigate("/");
      setFormData({
        title: "",
        body: "",
      });
    }
    console.log(data);
  }
  return (
    <div
      className={`min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-3">
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Create a New Post
            </span>
          </h1>
          <p
            className={`text-base sm:text-lg ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
          >
            Let your voice be heard.
          </p>
        </div>

        <form
          className={`p-6 sm:p-10 space-y-6 sm:space-y-8 rounded-2xl border ${theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200 shadow-sm"}`}
          onSubmit={handleSubmit}
        >
          <div>
            <label
              className={`block text-sm font-semibold mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
              htmlFor="title"
            >
              Title
            </label>
            <input
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm sm:text-base ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-offset-gray-900" : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-offset-gray-50"}`}
              type="text"
              id="title"
              name="title"
              placeholder="Enter an engaging title..."
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            {errors.title && (
              <p
                className={`text-xs sm:text-sm font-medium mt-1.5 ${theme === "dark" ? "text-red-400" : "text-red-600"}`}
              >
                {errors.title}
              </p>
            )}
          </div>

          <div>
            <label
              className={`block text-sm font-semibold mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
              htmlFor="body"
            >
              Content
            </label>
            <textarea
              id="body"
              rows="8"
              placeholder="Write your post content here..."
              value={formData.body}
              onChange={(e) =>
                setFormData({ ...formData, body: e.target.value })
              }
              className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm sm:text-base ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-offset-gray-900" : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-offset-gray-50"}`}
            ></textarea>
            {errors.body && (
              <p
                className={`text-xs sm:text-sm font-medium mt-1.5 ${theme === "dark" ? "text-red-400" : "text-red-600"}`}
              >
                {errors.body}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
            <button
              type="submit"
              className="px-6 py-3 rounded-lg font-semibold text-white shadow-md hover:shadow-lg transition-all duration-200 bg-indigo-600 hover:bg-indigo-700 text-sm sm:text-base order-1 sm:order-2 flex-1"
            >
              Publish Post
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className={`px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 text-sm sm:text-base order-2 sm:order-1 flex-1 ${theme === "dark" ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-800"}`}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
