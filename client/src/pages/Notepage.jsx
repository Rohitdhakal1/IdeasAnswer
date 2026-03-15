import React, { useState, useEffect } from "react";

function Notepage() {
  const [notes, SetNotes] = useState([]);
  const [title, SetTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchNote();
  }, []);

  const fetchNote = async () => {
    try {
      const response = await fetch("http://localhost:3000/notes", {
        credentials: "include",
      });
      const data = await response.json();
      SetNotes(data);
    } catch (error) {
      console.error(" Error note not fetched ", error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title, content }),
      });

      const newNote = await response.json();
      SetNotes((prev) => [...prev, newNote]);
      SetTitle("");
      setContent("");
    } catch (error) {
      console.error("getting probelem in adding notes", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/notes/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        SetNotes((prev) => prev.filter((note) => note._id !== id));
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <div className="container-sketchy" style={{ marginBottom: "40px" }}>
        <h2 style={{ marginBottom: "20px" }}>Add New Note</h2>
        <form onSubmit={handleCreate}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="input-sketchy"
              placeholder="Title"
              value={title}
              onChange={(e) => SetTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Content</label>
            <textarea
              className="input-sketchy"
              style={{ minHeight: "150px", resize: "vertical" }}
              placeholder="Enter your notes here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1 }}>
              <span>Tags:</span>
              <input 
                type="text" 
                className="input-sketchy" 
                placeholder="Tags (optional)"
                style={{ padding: "5px 10px" }}
              />
            </div>
            <button type="submit" className="btn-sketchy btn-primary" style={{ padding: "8px 30px" }}>
              Save
            </button>
          </div>
        </form>
      </div>

      <hr style={{ border: "none", borderTop: "2px solid #333", margin: "40px 0" }} />

      <h2 style={{ marginBottom: "20px" }}>Your Notes</h2>
      <div className="container-sketchy" style={{ borderRadius: "5px" }}>
        {notes.length === 0 ? (
          <p style={{ textAlign: "center", padding: "20px" }}>No notes yet. Add one above!</p>
        ) : (
          notes.map((note) => (
            <div key={note._id} className="note-item">
              <h3 style={{ marginBottom: "10px", borderBottom: "1px solid #eee", paddingBottom: "5px" }}>
                {note.title}
              </h3>
              <p style={{ marginBottom: "15px", color: "#666" }}>{note.content}</p>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div className="tags-container">
                  <span className="tag-badge">note</span>
                  <span className="tag-badge">ideas</span>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button className="btn-sketchy" style={{ padding: "3px 15px", fontSize: "0.9rem" }}>
                    Edit
                  </button>
                  <button 
                    className="btn-sketchy" 
                    style={{ padding: "3px 15px", fontSize: "0.9rem" }}
                    onClick={() => handleDelete(note._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notepage;
