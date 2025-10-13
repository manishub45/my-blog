import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast"; // ✅ add this import

function EditPost() {
  const [post, setPosts] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPosts(post);
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  // ✅ toast on update
  const handlePostUpdated = () => {
    toast.success("Post updated successfully! ✅");
  };

  // design wrapper + loading state (no logic change)
  return post ? (
    <div className="py-8 bg-gray-50 min-h-[calc(100vh-80px)]">
      <Container>
        <div
          className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6 md:p-8"
          role="region"
          aria-labelledby="edit-post-heading"
        >
          <h1
            id="edit-post-heading"
            className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2"
          >
            Edit Post
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            Update your post content, change image, or edit slug and metadata.
            Changes will overwrite the existing post.
          </p>

          {/* pass post & success handler */}
          <PostForm post={post} onSuccess={handlePostUpdated} />
        </div>
      </Container>
    </div>
  ) : (
    <div className="w-full py-20 flex items-center justify-center bg-gray-50 min-h-[calc(100vh-80px)]">
      <div className="text-center text-gray-600">
        <div className="mb-3" role="status" aria-live="polite">
          Loading post…
        </div>
        <div className="text-sm">
          If this takes too long, check your network or try reloading.
        </div>
      </div>
    </div>
  );
}

export default EditPost;
