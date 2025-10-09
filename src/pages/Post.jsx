import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-10 bg-gray-50 min-h-[calc(100vh-80px)]">
      <Container>
        <article
          className="max-w-4xl mx-auto"
          aria-labelledby="post-title"
          role="article"
        >
          {/* Back link + meta row */}
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <Link
                to="/"
                className="text-sm text-gray-600 hover:underline"
                aria-label="Go back to home"
              >
                ← Back to posts
              </Link>
            </div>

            {/* optionally show author / date if present */}
            <div className="text-sm text-gray-500">
              {/* if post.userName or post.$createdAt exist, they will show; otherwise this stays empty */}
              {post.userName && <span className="mr-3">By {post.userName}</span>}
              {post.$createdAt && (
                <span>{new Date(post.$createdAt).toLocaleDateString()}</span>
              )}
            </div>
          </div>

          {/* Featured image */}
          <div className="relative mb-6 bg-white rounded-xl overflow-hidden shadow-sm">
            <img
              src={appwriteService.getFileView(post.featuredImage)}
              alt={post.title || "Featured image"}
              className="w-full max-h-[500px] object-cover"
            />

            {/* Author controls (Edit/Delete) — small, subtle */}
            {isAuthor && (
              <div className="absolute right-4 top-4 flex items-center space-x-2">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button
                    bgColor="bg-green-500"
                    className="px-3 py-1 text-sm rounded-md hover:bg-green-600"
                  >
                    Edit
                  </Button>
                </Link>
                <Button
                  bgColor="bg-red-500"
                  onClick={deletePost}
                  className="px-3 py-1 text-sm rounded-md hover:bg-red-600"
                >
                  Delete
                </Button>
              </div>
            )}
          </div>

          {/* Title */}
          <header className="mb-6 text-center">
            <h1 id="post-title" className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              {post.title}
            </h1>
          </header>

          {/* Content */}
          <div className="prose max-w-none text-gray-800 leading-7">
            {parse(String(post.content))}
          </div>
        </article>
      </Container>
    </div>
  ) : null;
}
