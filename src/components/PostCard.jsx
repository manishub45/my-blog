import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";

const FALLBACK_IMG = "/fallback.png"; // optional placeholder image

function PostCard({ $id, title, featuredImage, onDelete }) {
  const imgSrc = featuredImage
    ? appwriteService.getFileView(featuredImage)
    : FALLBACK_IMG;

  return (
    <article className="w-full relative group">
      <Link
        to={`/post/${$id}`}
        aria-label={`Open post: ${title}`}
        className="block"
      >
        <div className="w-full bg-white rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          {/* Image */}
          <div className="w-full mb-4 overflow-hidden rounded-xl h-40 bg-gray-100 flex items-center justify-center">
            <img
              src={imgSrc}
              alt={title || "Post image"}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Title */}
          <h2 className="text-lg md:text-xl text-center font-semibold text-gray-900 mb-3 leading-tight">
            {title}
          </h2>

          {/* Read More */}
          <div className="text-center mt-2">
            <span className="inline-block px-5 py-2 text-sm rounded-full bg-gray-200 text-gray-700 font-semibold group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
              Read More
            </span>
          </div>
        </div>
      </Link>

      {/* 🗑️ Delete Button (appears on hover or always visible) */}
      {onDelete && (
        <button
          onClick={(e) => {
            e.preventDefault(); // stop link navigation
            onDelete($id); // call parent delete function
          }}
          className="absolute top-3 right-3 bg-red-500 text-white text-sm px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600"
        >
          Delete
        </button>
      )}
    </article>
  );
}

export default PostCard;
