import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import Blog from "../components/Blog";
import { CreateBlogForm } from "../components/CreateBlogForm";
/*
describe("Blog component", () => {
  const blog = {
    title: "Test Blog",
    author: "Test Author",
    url: "http://test.com",
    likes: 10,
    user: [{ id: 1, username: "testuser" }],
  };

  const setBlogs = vi.fn();
  const updateBlogList = vi.fn();

  it("renders title and author, but not URL or likes by default", () => {
    render(
      <Blog blog={blog} setBlogs={setBlogs} updateBlogList={updateBlogList} />
    );

    // Verificar que el título y el autor están presentes
    const titleElement = screen.getByText("Test Blog");
    const authorElement = screen.getByText("Test Author");

    expect(titleElement).toBeDefined();
    expect(authorElement).toBeDefined();

    // Verificar que la URL y los likes no están presentes por defecto
    const urlElement = screen.getByText("http://test.com");
    const likesElement = screen.queryByText("10");

    expect(urlElement).toBeDefined();
    expect(likesElement).toBeDefined();
  });
});
*/

// piloto
/*
describe("Blog Component", () => {
  it("should display title and author, but not URL or likes by default", () => {
    const blog = {
      id: 1,
      title: "Sample Blog Title",
      author: "John Doe",
      url: "https://example.com/sample-blog",
      likes: 10,
    };

    const { getByText, queryByText } = render(<Blog blog={blog} />);

    // Verifica que el título y el autor estén presentes
    expect(getByText("Sample Blog Title")).toBeInTheDocument();
    expect(getByText("John Doe")).toBeInTheDocument();

    // Verifica que la URL y los likes no estén presentes
    expect(queryByText("https://example.com/sample-blogyy")).toBeNull();
    expect(queryByText("101")).toBeNull();
  });
});
*/

describe("Blog Component", () => {
  const blog = {
    id: 1,
    title: "Sample Blog Title",
    author: "John Doe",
    url: "https://example.com/sample-blog",
    likes: 10,
    user: [{ id: 1, username: "testuser" }],
  };

  const setBlogs = vi.fn();
  const updateBlogList = vi.fn();

  it("should display title and author, but not URL or likes by default", () => {
    render(
      <Blog blog={blog} setBlogs={setBlogs} updateBlogList={updateBlogList} />
    );

    // Verifica que el título y el autor estén presentes
    expect(screen.getByText("Sample Blog Title")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();

    // Verifica que la URL y los likes no estén visibles por defecto
    const urlElement = screen.getByText("https://example.com/sample-blog");
    const likesElement = screen.getByText(`likes ${10}`);

    expect(urlElement).not.toBeVisible();
    expect(likesElement).not.toBeVisible();
  });
});

describe("click mostrar detalles", () => {
  const blog = {
    id: 1,
    title: "Sample Blog Title",
    author: "John Doe",
    url: "https://example.com/sample-blog",
    likes: 10,
    user: [{ id: 1, username: "testuser" }],
  };

  const setBlogs = vi.fn();
  const updateBlogList = vi.fn();

  it("should display URL and likes when view button is clicked", async () => {
    render(
      <Blog blog={blog} setBlogs={setBlogs} updateBlogList={updateBlogList} />
    );

    const user = userEvent.setup();
    const viewButton = screen.getByText("view");

    // Simula el clic en el botón "view"
    await user.click(viewButton);

    // Verifica que la URL y los likes estén presentes después del clic
    expect(screen.getByText(blog.url)).toBeInTheDocument();
    expect(screen.getByText(`likes ${blog.likes}`)).toBeInTheDocument();
  });
});

describe("berificar dos clicks en el boton likes", () => {
  const blog = {
    id: 1,
    title: "Sample Blog Title",
    author: "John Doe",
    url: "https://example.com/sample-blog",
    likes: 10,
    user: [{ id: 1, username: "testuser" }],
  };

  const setBlogs = vi.fn();
  const updateBlogList = vi.fn();
  const buttonLike = vi.fn();

  it("should call the like button event handler twice when clicked twice", async () => {
    render(
      <Blog
        blog={blog}
        setBlogs={setBlogs}
        updateBlogList={updateBlogList}
        buttonLike={buttonLike}
      />
    );

    const user = userEvent.setup();
    const viewButton = screen.getByText("view");

    // Simula el clic en el botón "view" para mostrar los detalles
    await user.click(viewButton);

    const likeButton = screen.getByText("likes");

    // Simula dos clics en el botón "like"
    await user.click(likeButton);
    await user.click(likeButton);

    // Verifica que el controlador de eventos se haya llamado dos veces
    //expect(buttonLike).toHaveBeenCalledTimes(2);

    //Esta línea accede a la propiedad mock.calls del mock buttonLike y verifica que la longitud de esta matriz es 2
    expect(buttonLike.mock.calls).toHaveLength(2);
  });
});

/*
describe("formulario llama al controlador de eventos que recibió como props ", () => {
  test("calls addBlog with correct details when a new blog is created", async () => {
    const addBlog = vi.fn();
    const handleLogout = vi.fn();

    render(<CreateBlogForm addBlog={addBlog} handleLogout={handleLogout} />);
    const user = userEvent.setup();

    const titleInput = screen.getByText("Title");
    const authorInput = screen.getByText("Author");
    const urlInput = screen.getByText("Url");

    // Rellena el formulario con datos de prueba
    await user.type(titleInput, "Test Blog Title");
    await user.type(authorInput, "Test Blog Author");
    await user.type(urlInput, "https://testblog.com");

    // Simula el envío del formulario
    const submitButton = screen.getByText("add");
    await user.click(submitButton);

    // Verifica que addBlog se haya llamado con los detalles correctos
    expect(addBlog).toHaveBeenCalledWith({
      title: "Test Blog Title",
      author: "Test Blog Author",
      url: "https://testblog.com",
    });

    // Verifica que el formulario se haya restablecido después del envío
    expect(titleInput.value).toBe("");
    expect(authorInput.value).toBe("");
    expect(urlInput.value).toBe("");
  });
});
*/

test("<CreateBlogForm /> calls addBlog with correct details when a new blog is created", async () => {
  const addBlog = vi.fn();
  const handleLogout = vi.fn();

  render(<CreateBlogForm addBlog={addBlog} handleLogout={handleLogout} />);

  const user = userEvent.setup();

  // Rellenar el formulario con datos de prueba
  const titleInput = screen.getByPlaceholderText("Title");
  const authorInput = screen.getByPlaceholderText("Author");
  const urlInput = screen.getByPlaceholderText("Url");

  await user.type(titleInput, "Test Blog Title");
  await user.type(authorInput, "Test Blog Author");
  await user.type(urlInput, "https://testblog.com");

  // Simular el envío del formulario
  const sendButton = screen.getByText("add");
  await user.click(sendButton);

  // Verificar que addBlog se haya llamado una vez con los detalles correctos
  expect(addBlog.mock.calls).toHaveLength(1);
  expect(addBlog.mock.calls[0][0]).toEqual({
    title: "Test Blog Title",
    author: "Test Blog Author",
    url: "https://testblog.com",
    likes: 0,
  });

  // Verificar que el formulario se haya restablecido después del envío
  expect(titleInput.value).toBe("");
  expect(authorInput.value).toBe("");
  expect(urlInput.value).toBe("");
});
