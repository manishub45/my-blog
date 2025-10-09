import React from 'react'
import { Container, PostForm } from '../components'

function Addpost() {
  return (
    // add a soft bg + ensure page min-height so footer doesn't float up on short pages
    <div className="py-8 min-h-[calc(100vh-80px)] bg-gray-50">
      <Container>
        {/* center the form, give a white card, padding, and subtle shadow */}
        <div
          className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6 md:p-8"
          role="region"
          aria-labelledby="create-post-heading"
        >
          <h1 id="create-post-heading" className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
            Create New Post
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            Write your post — add a title, content and an image. Preview appears below the image input.
          </p>

          {/* actual form component (logic unchanged) */}
          <PostForm />
        </div>
      </Container>
    </div>
  )
}

export default Addpost
