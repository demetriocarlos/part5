import { useState, useRef } from "react";
import { Togglable } from "./Togglable";
export const CreateBlogForm = ({ addBlog, handleLogout }) => {
  const [blogData, setBlogData] = useState({
    title: "",
    author: "",
    url: "",
    likes: 0,
  });

  const togglableRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    addBlog(blogData);

    setBlogData({
      title: "",
      author: "",
      url: "",
    });

    togglableRef.current.toggleVisibility();
  };

  return (
    <Togglable buttonLabel="new blog" ref={togglableRef}>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <span>Title</span>
            <input
              type="text"
              value={blogData.title}
              name="title"
              onChange={handleChange}
              placeholder="Title"
            />
          </div>

          <div>
            <span>Author</span>
            <input
              type="text"
              value={blogData.author}
              name="author"
              onChange={handleChange}
              placeholder="Author"
            />
          </div>

          <div>
            <span>Url</span>
            <input
              type="text"
              value={blogData.url}
              name="url"
              onChange={handleChange}
              placeholder="Url"
            />
          </div>

          <div>
            <button type="submit">add</button>
          </div>

          <div>
            <button type="button" onClick={handleLogout}>
              cerrar sesion
            </button>
          </div>
        </form>
      </div>
    </Togglable>
  );
};
