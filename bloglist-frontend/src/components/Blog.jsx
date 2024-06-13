import { useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";
//import blogs from "../services/blogs";

const Blog = ({ blog, setBlogs, buttonLike, loggedUser }) => {
  const [Visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes || 0);

  const hideWhenVisible = { display: Visible ? "none" : "" };
  const showWhenVisible = { display: Visible ? "" : "none" };

  const buttonLikess = () => {
    buttonLike(blog, setLikes, likes);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const onDelete = (deletedId) => {
    // Filtrar la lista de blogs para excluir el blog eliminada
    setBlogs((prevBlog) => prevBlog.filter((blog) => blog.id !== deletedId));
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      // eslint-disable-next-line react/prop-types
      `Are you sure you want to delete: ${blog.author}?`
    );

    if (confirmDelete) {
      try {
        await blogService.deleteObject(blog.id);

        // eslint-disable-next-line react/prop-types
        onDelete(blog.id);
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  return (
    <div style={blogStyle} className="blog">
      <div style={hideWhenVisible} className="blog-summary">
        <span className="blog-title">{blog.title}</span>
        <span className="blog-author">{blog.author}</span>

        <button onClick={() => setVisible(true)}>view</button>
      </div>

      <div style={showWhenVisible} className="blog-details">
        {blog.user.map((user) => (
          <div key={user.id}>
            <h3>userName {user.username}</h3>
          </div>
        ))}

        <div>
          <span className="blog_title">{blog.title}</span>
          <button onClick={() => setVisible(false)}>hide</button>
          <p className="blog-url">{blog.url}</p>
          <p className="blog-author">author {blog.author}</p>
          <div>
            <button onClick={buttonLikess}>likes</button>

            <span className="blog-likes">likes {blog.likes}</span>
          </div>

          {loggedUser.username === blog.user[0].username && (
            <button onClick={handleDelete}>remove</button>
          )}
        </div>
      </div>
    </div>
  );
};

/*
Blog.propTypes = {
  blog: PropTypes.string.isRequired,
  setBlogs: PropTypes.string.isRequired,
  blogs: PropTypes.string.isRequired,
  updateBlogList: PropTypes.func.isRequired,
};*/
/*
Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
          .isRequired,
        username: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  setBlogs: PropTypes.func.isRequired,
  buttonLike: PropTypes.func.isRequired,
};
*/
export default Blog;
