import React, { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000", // Replace with your Django server URL
});

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fetch all posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts/");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  // Create a new post
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/posts/", { title, content });
      setPosts([...posts, response.data]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  // Delete a post
  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}/delete/`);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Blog Posts</h1>

        <form onSubmit={handleCreate} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Create Post</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create
          </button>
        </form>

        <h2 className="text-2xl font-semibold mb-4">All Posts</h2>
        {posts.map((post) => (
          <div
            key={post.id}
            className="mb-4 p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md"
          >
            <h3 className="text-xl font-semibold">{post.title}</h3>
            <p className="text-gray-600 mb-4">{post.content}</p>
            <button
              onClick={() => handleDelete(post.id)}
              className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
