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
    <div>
      <h1>Blog Posts</h1>
      
      <form onSubmit={handleCreate}>
        <h2>Create Post</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>

      <h2>All Posts</h2>
      {posts.map((post) => (
        <div key={post.id} style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
          <h3>{post.title}</h3>
          <p>Content: {post.content}</p>
          <button onClick={() => handleDelete(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
