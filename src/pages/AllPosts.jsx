import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";

function AllPosts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    })
  }, [])

  return (
    // subtle bg so cards pop; ensure min height so footer placement stable
    <div className="w-full py-8 bg-gray-50 min-h-[calc(100vh-80px)]">
      <Container>
        <section
          className="max-w-6xl mx-auto"
          role="region"
          aria-labelledby="all-posts-heading"
        >
          <div className="mb-6">
            <h2 id="all-posts-heading" className="text-2xl md:text-3xl font-semibold text-gray-900">
              All Posts
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Browse recent posts. Click a card to read details, edit or delete (if you are the author).
            </p>
          </div>

          {/* grid layout for consistent responsive columns + gaps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {posts.length === 0 ? (
              <div className="col-span-full py-12 text-center text-gray-600">
                No posts yet — try creating one!
              </div>
            ) : (
              posts.map((post) => (
                <div key={post.$id} className="w-full">
                  {/* keep a small padding inside card wrapper so shadows don't cut off */}
                  <div className="p-2">
                    <PostCard {...post} />
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </Container>
    </div>
  )
}

export default AllPosts
