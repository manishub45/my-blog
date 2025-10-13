import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import SearchBar from "../components/SearchBar";
import ConfirmModal from "../components/ConfirmModal";
import toast from "react-hot-toast";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Modal & delete state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Fetch posts once
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    appwriteService
      .getPosts()
      .then((res) => {
        if (!mounted) return;
        if (res && res.documents) setPosts(res.documents);
      })
      .catch((err) => {
        console.error("Failed to load posts:", err);
        toast.error("Failed to load posts");
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  // Filter logic (title + content)
  const filteredPosts = posts.filter((post) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    const title = (post.title || "").toLowerCase();
    const content = (post.content || "").toLowerCase();
    return title.includes(q) || content.includes(q);
  });

  // Called when PostCard's Delete button clicked
  const handleDeleteClick = (postId) => {
    setSelectedPostId(postId);
    setIsModalOpen(true);
  };

  // Confirm delete handler
  const handleConfirmDelete = async () => {
    if (!selectedPostId) return;
    setDeleteLoading(true);

    // optimistic update: remove locally first, keep copy to rollback if needed
    const previous = [...posts];
    setPosts((p) => p.filter((item) => item.$id !== selectedPostId));

    try {
      // call your appwrite service deletePost (adjust if function name differs)
      await appwriteService.deletePost(selectedPostId);

      // optional: if you also want to delete file from storage and your service has deleteFile:
      // await appwriteService.deleteFile(featuredImageId) -- you need to fetch that id before removal

      toast.success("Post deleted successfully");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete post");
      // rollback UI
      setPosts(previous);
    } finally {
      setDeleteLoading(false);
      setIsModalOpen(false);
      setSelectedPostId(null);
    }
  };

  return (
    <div className="w-full py-8 bg-gray-50 dark:bg-gray-900 min-h-[calc(100vh-80px)]">
      <Container>
        <section
          className="max-w-6xl mx-auto"
          role="region"
          aria-labelledby="all-posts-heading"
        >
          {/* Header + Search */}
          <div className="mb-6">
            <h2
              id="all-posts-heading"
              className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100"
            >
              All Posts
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              Browse recent posts. Click a card to read details, edit or delete (if you are the author).
            </p>

            <div className="mt-4">
              <SearchBar value={query} onChange={setQuery} />
            </div>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="text-center py-12 text-gray-600 dark:text-gray-300">Loading posts...</div>
          ) : (
            <>
              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredPosts.length === 0 ? (
                  <div className="col-span-full py-12 text-center text-gray-600 dark:text-gray-300">
                    No posts match your search.
                  </div>
                ) : (
                  filteredPosts.map((post) => (
                    <div key={post.$id} className="w-full">
                      <div className="p-2">
                        {/* Pass onDelete so PostCard will open modal instead of deleting directly */}
                        <PostCard {...post} onDelete={() => handleDeleteClick(post.$id)} />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </section>
      </Container>

      {/* Confirm modal */}
      <ConfirmModal
        open={isModalOpen}
        title="Delete post?"
        message="Are you sure you want to delete this post? This action cannot be undone."
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedPostId(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default AllPosts;
