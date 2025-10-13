import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast"; // ✅ add this import

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

  // ✅ updated deletePost function
  const deletePost = async () => {
    try {
      const status = await appwriteService.deletePost(post.$id);
      if (status) {
        await appwriteService.deleteFile(post.featuredImage);
        toast.success("Post deleted successfully! ✅"); // 🔥 toast added
        navigate("/");
      } else {
        toast.error("Failed to delete post ❌");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Something went wrong while deleting ❌");
    }
  };

  return post ? (
    <div className="py-10 bg-gray-50 min-h-[calc(100vh-80px)]">
      <Container>
        <article className="max-w-4xl mx-auto" aria-labelledby="post-title" role="article">
          {/* Header / meta */}
          <div className="mb-4 flex items-center justify-between gap-4">
            <Link to="/" className="text-sm text-gray-600 hover:underline">
              ← Back to posts
            </Link>
            <div className="text-sm text-gray-500">
              {post.userName && <span className="mr-3">By {post.userName}</span>}
              {post.$createdAt && <span>{new Date(post.$createdAt).toLocaleDateString()}</span>}
            </div>
          </div>

          {/* Featured image + buttons */}
          <div className="relative mb-6 bg-white rounded-xl overflow-hidden shadow-sm">
            <img
              src={appwriteService.getFileView(post.featuredImage)}
              alt={post.title || "Featured image"}
              className="w-full max-h-[500px] object-cover"
            />

            {isAuthor && (
              <div className="absolute right-4 top-4 flex items-center space-x-2">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-green-500" className="px-3 py-1 text-sm rounded-md hover:bg-green-600">
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
          <div className="prose max-w-none text-gray-800 leading-7">{parse(String(post.content))}</div>
        </article>
      </Container>
    </div>
  ) : null;
}
