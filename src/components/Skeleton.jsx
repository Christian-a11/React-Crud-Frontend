import { useContext } from "react";
import { AppContext } from "../Context/AppContext";

export const PostSkeleton = () => {
  const { theme } = useContext(AppContext);
  const isDark = theme === "dark";

  return (
    <div
      className={`p-6 sm:p-8 rounded-xl border animate-pulse ${
        isDark ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Title skeleton */}
          <div
            className={`h-8 w-3/4 rounded-lg mb-4 ${
              isDark ? "bg-gray-700" : "bg-gray-200"
            }`}
          ></div>

          {/* Metadata skeleton */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className={`w-6 h-6 rounded-full ${
                isDark ? "bg-gray-700" : "bg-gray-200"
              }`}
            ></div>
            <div
              className={`h-4 w-24 rounded ${
                isDark ? "bg-gray-700" : "bg-gray-200"
              }`}
            ></div>
            <div
              className={`h-4 w-4 rounded-full ${
                isDark ? "bg-gray-700" : "bg-gray-200"
              }`}
            ></div>
            <div
              className={`h-4 w-32 rounded ${
                isDark ? "bg-gray-700" : "bg-gray-200"
              }`}
            ></div>
          </div>

          {/* Body skeleton */}
          <div className="space-y-3">
            <div
              className={`h-4 w-full rounded ${
                isDark ? "bg-gray-700" : "bg-gray-200"
              }`}
            ></div>
            <div
              className={`h-4 w-full rounded ${
                isDark ? "bg-gray-700" : "bg-gray-200"
              }`}
            ></div>
            <div
              className={`h-4 w-2/3 rounded ${
                isDark ? "bg-gray-700" : "bg-gray-200"
              }`}
            ></div>
          </div>
        </div>

        {/* Button skeleton */}
        <div
          className={`h-11 w-32 rounded-lg mt-4 sm:mt-0 ${
            isDark ? "bg-gray-700" : "bg-gray-200"
          }`}
        ></div>
      </div>
    </div>
  );
};

export const PostDetailSkeleton = () => {
  const { theme } = useContext(AppContext);
  const isDark = theme === "dark";

  return (
    <div
      className={`overflow-hidden rounded-2xl border animate-pulse ${
        isDark ? "bg-gray-800/50 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <div className="p-8 sm:p-12">
        <div className="mb-8">
          {/* Main Title */}
          <div
            className={`h-12 w-4/5 rounded-xl mb-6 ${
              isDark ? "bg-gray-700" : "bg-gray-200"
            }`}
          ></div>

          <div
            className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b ${
              isDark ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div
                className={`w-12 h-12 rounded-full ${
                  isDark ? "bg-gray-700" : "bg-gray-200"
                }`}
              ></div>
              <div className="space-y-2">
                {/* Author Name */}
                <div
                  className={`h-5 w-32 rounded ${
                    isDark ? "bg-gray-700" : "bg-gray-200"
                  }`}
                ></div>
                {/* Date */}
                <div
                  className={`h-4 w-40 rounded ${
                    isDark ? "bg-gray-700" : "bg-gray-200"
                  }`}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Post content skeleton */}
        <div className="space-y-4 mb-8">
          <div
            className={`h-5 w-full rounded ${
              isDark ? "bg-gray-700" : "bg-gray-200"
            }`}
          ></div>
          <div
            className={`h-5 w-5/6 rounded ${
              isDark ? "bg-gray-700" : "bg-gray-200"
            }`}
          ></div>
          <div
            className={`h-5 w-full rounded ${
              isDark ? "bg-gray-700" : "bg-gray-200"
            }`}
          ></div>
          <div
            className={`h-5 w-4/5 rounded ${
              isDark ? "bg-gray-700" : "bg-gray-200"
            }`}
          ></div>
          <div
            className={`h-5 w-full rounded ${
              isDark ? "bg-gray-700" : "bg-gray-200"
                }`}
          ></div>
        </div>
      </div>

      <div
        className={`px-8 sm:px-12 py-6 border-t ${
          isDark ? "bg-gray-800/50 border-gray-700" : "bg-gray-50 border-gray-200"
        }`}
      >
        <div
          className={`h-6 w-32 rounded ${
            isDark ? "bg-gray-700" : "bg-gray-200"
          }`}
        ></div>
      </div>
    </div>
  );
};
