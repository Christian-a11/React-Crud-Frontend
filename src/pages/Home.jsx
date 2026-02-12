import { useContext, useEffect, useState } from "react";
import { AppContext, API_BASE_URL } from "../Context/AppContext.jsx";
import { Link } from "react-router-dom";
export default function Home() {
  const { theme } = useContext(AppContext);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  async function fetchPosts(page = 1) {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/posts?page=${page}`, {
        headers: {
          Accept: "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setPosts(data.data);
        setCurrentPage(data.current_page);
        setLastPage(data.last_page);
        setTotal(data.total);
      } else {
        console.error("Failed to fetch posts");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts(1);
  }, []);
  return (
    <div
      className={`min-h-screen py-12 ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 tracking-tight">
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Latest Posts
            </span>
          </h1>
          <p
            className={`text-lg ${theme === "dark" ? "text-gray-400" : "text-gray-900"}`}
          >
            Explore insights and stories from our community.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <div
              className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}
            >
              <span className="text-4xl">📭</span>
            </div>
            <p
              className={`text-2xl font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-800"}`}
            >
              No Posts Found
            </p>
            <p
              className={`max-w-md mx-auto ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
            >
              It seems there are no posts available at the moment. Why not be
              the first to share something amazing?
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <div
                key={post.id}
                className={`p-6 sm:p-8 group cursor-pointer rounded-xl border transition-all duration-300 ${theme === "dark" ? "bg-gray-800/50 border-gray-700 hover:bg-gray-800 hover:border-indigo-500" : "bg-white border-gray-200 hover:shadow-lg hover:border-indigo-300"}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h2
                      className={`text-2xl sm:text-3xl font-bold mb-3 transition-colors line-clamp-2 ${theme === "dark" ? "text-white group-hover:text-indigo-400" : "text-black group-hover:text-indigo-600"}`}
                    >
                      {post.title}
                    </h2>

                    <div
                      className={`flex flex-wrap items-center gap-3 text-sm mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">👤</span>
                        <span
                          className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-800"}`}
                        >
                          {post.user.name}
                        </span>
                      </div>
                      <span
                        className={
                          theme === "dark" ? "text-gray-500" : "text-gray-400"
                        }
                      >
                        •
                      </span>
                      <time
                        className={
                          theme === "dark" ? "text-slate-100" : "text-black"
                        }
                      >
                        {new Date(post.created_at).toLocaleDateString([], {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                    </div>

                    <p
                      className={`leading-relaxed line-clamp-3 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
                    >
                      {post.body}
                    </p>
                  </div>

                  <Link
                    to={`/posts/${post.id}`}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-white font-semibold shadow-md transition-all duration-200 whitespace-nowrap flex-shrink-0 mt-4 sm:mt-0 ${theme === "dark" ? "bg-indigo-600 hover:bg-indigo-500" : "bg-indigo-600 hover:bg-indigo-700"} transform sm:group-hover:translate-x-2`}
                  >
                    Read More
                    <span className="transition-transform">→</span>
                  </Link>
                </div>
              </div>
            ))}

            {/* Pagination Controls - Floating Modal */}
            {lastPage > 1 && (
              <div
                className={`fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-wrap items-center justify-center gap-2 py-5 px-6 rounded-2xl backdrop-blur-lg shadow-2xl border ${theme === "dark" ? "bg-gray-800/60 border-gray-700/50 shadow-gray-900/50" : "bg-white/60 border-gray-200/50 shadow-gray-400/50"}`}
              >
                <button
                  onClick={() => fetchPosts(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    currentPage === 1
                      ? theme === "dark"
                        ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : theme === "dark"
                        ? "bg-indigo-600 text-white hover:bg-indigo-500"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                >
                  ← Previous
                </button>

                <div className="flex flex-wrap justify-center gap-1">
                  {Array.from({ length: lastPage }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => fetchPosts(page)}
                        className={`px-3 py-2 rounded-lg font-semibold transition-all ${
                          currentPage === page
                            ? theme === "dark"
                              ? "bg-indigo-600 text-white"
                              : "bg-indigo-600 text-white"
                            : theme === "dark"
                              ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}
                </div>

                <button
                  onClick={() => fetchPosts(currentPage + 1)}
                  disabled={currentPage === lastPage}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    currentPage === lastPage
                      ? theme === "dark"
                        ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : theme === "dark"
                        ? "bg-indigo-600 text-white hover:bg-indigo-500"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
