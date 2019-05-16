import React, {useState} from 'react'
import PropTypes from 'prop-types'

const Blog = ({blog, user, onLikeBlog, onDeleteBlog}) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return showDetails ? (
    <div style={blogStyle} onClick={() => setShowDetails(false)}>
      <p>{blog.title} {blog.author}</p>
      <p>{blog.url}</p>
      <p>
        {blog.likes} likes
        <button onClick={() => onLikeBlog(blog)}>like</button>
      </p>
      <p>added by {blog.user.name}</p>
      {user.username === blog.user.username ? <button onClick={() => onDeleteBlog(blog)}>remove</button> : null}
    </div>
  ) : (
    <div style={blogStyle} onClick={() => setShowDetails(true)}>
      {blog.title} {blog.author}
    </div>
  )
}

Blog.protoTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  onLikeBlog: PropTypes.func.isRequired,
  onDeleteBlog: PropTypes.func.isRequired
}

export default Blog