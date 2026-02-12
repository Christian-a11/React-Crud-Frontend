import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AppContext, API_BASE_URL } from "../../Context/AppContext";
export default function Show() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const { user, token, theme } = useContext(AppContext);
  const navigate = useNavigate();

  async function fetchPost() {
    const response = await fetch(`${API_BASE_URL}/api/posts/${id}`, {
      headers: {
        Accept: "application/json",
      },
    });
    const data = await response.json();
    if (response.ok) {
      setPost(data.post || data);
    } else {
      console.error("Failed to fetch post");
    }
  }
  useEffect(() => {
    fetchPost();
  }, [id]);

  async function handleDelete(e) {
    e.preventDefault();

    // Show confirmation dialog
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    if (!post) return;
    if (user?.id === post.user_id) {
      const response = await fetch(`${API_BASE_URL}/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        navigate("/");
      } else {
        console.error("Failed to delete post", data);
      }
    }
  }
  return (
    <div
      className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
    >
      <div className="max-w-4xl mx-auto">
        {post ? (
          <div
            className={`overflow-hidden rounded-2xl border ${theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}
          >
            <div className="p-8 sm:p-12">
              <div className="mb-8">
                <h1
                  className={`text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                >
                  {post.title}
                </h1>
                <div
                  className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                      {post.user?.name?.charAt(0)?.toUpperCase()}
                    </div>
                    <div>
                      <p
                        className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                      >
                        {post.user?.name || "Unknown"}
                      </p>
                      <p
                        className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
                      >
                        {new Date(post.created_at).toLocaleDateString([], {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  {user?.id === post.user_id && (
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/posts/${post.id}/update`}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 text-sm ${theme === "dark" ? "bg-indigo-600 hover:bg-indigo-500" : "bg-indigo-600 hover:bg-indigo-700"}`}
                      >
                        ✏️ Edit
                      </Link>
                      <form onSubmit={handleDelete}>
                        <button
                          type="submit"
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 text-sm ${theme === "dark" ? "bg-red-600 hover:bg-red-700" : "bg-red-500 hover:bg-red-600"}`}
                        >
                          🗑️ Delete
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </div>

              <div
                className={`max-w-none prose prose-lg lg:prose-xl mb-8 ${theme === "dark" ? "prose-invert" : ""} prose-slate`}
              >
                <p
                  className={`text-lg leading-relaxed whitespace-pre-wrap ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                >
                  {post.body}
                </p>
              </div>
            </div>

            <div
              className={`px-8 sm:px-12 py-6 border-t ${theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-gray-50 border-gray-200"}`}
            >
              <Link
                to="/"
                className={`inline-flex items-center gap-2 font-semibold transition-colors group ${theme === "dark" ? "text-indigo-400 hover:text-indigo-300" : "text-indigo-600 hover:text-indigo-700"}`}
              >
                <span className="group-hover:-translate-x-1 transition-transform">
                  ←
                </span>
                Back to Posts
              </Link>
            </div>
          </div>
        ) : (
          <div
            className={`text-center py-20 px-8 rounded-2xl border ${theme === "dark" ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"}`}
          >
            <div
              className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}
            >
              <span className="text-4xl">🤷</span>
            </div>
            <p
              className={`text-3xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              Post Not Found
            </p>
            <p
              className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"} mb-8 max-w-md mx-auto`}
            >
              Sorry, we couldn't find the post you're looking for. It might have
              been moved or deleted.
            </p>
            <Link
              to="/"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 ${
                theme === "dark"
                  ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
            >
              ← Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
