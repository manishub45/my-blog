import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components'

function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    })
  }, [])

  // subtle page background + min height so footer placement stable
  if (posts.length === 0) {
    return (
      <div className="w-full py-12 bg-gray-50 min-h-[calc(100vh-80px)]">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              Welcome — Login to read posts
            </h1>
            <p className="text-sm text-gray-600 mb-6">
              Create an account or login to view and interact with posts.
            </p>

            {/* CTA to login (UI only) */}
            <div className="flex justify-center">
              <Link
                to="/login"
                className="inline-block px-5 py-2 rounded-lg bg-blue-600 text-white font-medium shadow-sm hover:bg-blue-700 transition"
              >
                Go to Login
              </Link>
            </div>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="w-full py-8 bg-gray-50 min-h-[calc(100vh-80px)]">
      <Container>
        <section className="max-w-6xl mx-auto" aria-labelledby="home-posts-heading">
          <div className="mb-6">
            <h2 id="home-posts-heading" className="text-2xl md:text-3xl font-semibold text-gray-900">
              Recent Posts
            </h2>
            <p className="text-sm text-gray-600 mt-1">Latest posts from the community — click any card to read more.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {posts.map((post) => (
              <div key={post.$id} className="w-full">
                <div className="p-2">
                  <PostCard {...post} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  )
}

export default Home
