import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { LoginForm } from "./components/LoginForm";
import { CreateBlogForm } from "./components/CreateBlogForm";
import Notification from "./components/Notification";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  //const [notification, setNotification] = useState(null);
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });

  //const [likes, setLikes] = useState(blog.likes || 0);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAll();
        //esta línea de código ordena los blogs en orden descendente según la cantidad de “likes”.
        const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
        //
        setBlogs(sortedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    if (user) {
      fetchBlogs();
    }
  }, [user]);

  console.log(blogs);

  //
  const updateBlogList = (updatedBlog) => {
    const updatedBlogs = blogs.map((blog) =>
      blog.id === updatedBlog.id ? updatedBlog : blog
    );
    // Ordena los blogs nuevamente después de la actualización
    const sortedBlogs = updatedBlogs.sort((a, b) => b.likes - a.likes);
    setBlogs(sortedBlogs);
  };
  //

  useEffect(() => {
    // Mantener la sesión del usuario

    // Obtener los datos del usuario almacenados en el localStorage del navegador
    const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser");

    // Verificar si existen datos del usuario en el localStorage
    if (loggedUserJSON) {
      // Si existen, parsear los datos del usuario de formato JSON a objeto JavaScript
      const user = JSON.parse(loggedUserJSON);
      // Establecer el estado del usuario con los datos obtenidos
      setUser(user);
      // Establecer el token de autorización en el servicio de notas utilizando el token del usuario
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    blogService.setToken(user.token);
    window.localStorage.removeItem("loggedNoteAppUser");

    setNotification({ message: "Logout exitoso", type: "success" });
    setTimeout(() => {
      setNotification({ message: null, type: null });
    }, 5000);
  };

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs((prevBlog) => [...prevBlog, returnedBlog]);
      setNotification({
        message: "Blog agregado exitosamente",
        type: "success",
      });
      setTimeout(() => {
        setNotification({ message: null, type: null });
      }, 5000);
    } catch (error) {
      // Manejar errores aquí (por ejemplo, si la solicitud falla)
      console.error("Error al agregar blog:", error);

      setNotification({ message: "Error al agregar el blog", type: "error" });
      setTimeout(() => {
        setNotification({ message: null, type: null });
      }, 5000);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedNoteAppUser", JSON.stringify(user));

      blogService.setToken(user.token);

      setUser(user);
      setUsername("");
      setPassword("");

      setNotification({ message: "Login exitoso", type: "success" });
      setTimeout(() => {
        setNotification({ message: null, type: null });
      }, 5000);
    } catch (exception) {
      //setErrorMessage("Wrong credentials");
      setNotification({
        message: "Error en el inicio de sesión",
        type: "error",
      });
      setTimeout(() => {
        //setErrorMessage(null);
        setNotification({ message: null, type: null });
      }, 5000);
    }
  };

  const buttonLike = async (blog, setLikes, likes) => {
    try {
      const updatedBlog = {
        ...blog,
        likes: likes + 1,
      };
      const response = await blogService.update(blog.id, updatedBlog);
      updateBlogList(response);
      setLikes(likes + 1);
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("No se pudo actualizar el blog, asegúrate de estar autenticado.");
    }
  };

  return (
    <div>
      <h2>log in to application</h2>
      <Notification
        message={notification.message}
        type={notification.type}
      />{" "}
      {/* Mostrar notificación */}
      {user ? (
        <>
          <CreateBlogForm addBlog={addBlog} handleLogout={handleLogout} />
          <div>
            <h2>blogs</h2>
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                setBlogs={setBlogs}
                blogs={blogs}
                updateBlogList={updateBlogList}
                buttonLike={buttonLike}
                loggedUser={user}
              />
            ))}
          </div>
        </>
      ) : (
        <LoginForm
          handleLogin={handleLogin}
          setUsername={setUsername}
          username={username}
          setPassword={setPassword}
          password={password}
        />
      )}
    </div>
  );
};

export default App;
