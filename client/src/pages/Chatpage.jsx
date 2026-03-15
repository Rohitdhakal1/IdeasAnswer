import React, { useState } from "react";

function ChatPage() {
  const [question, SetQuestion] = useState("");
  const [answer, SetAnswer] = useState("");
  const [loading, SetLoading] = useState(false);

  const handleask = async (e) => {
    e.preventDefault();
    SetLoading(true);
    try {
      const response = await fetch("http://localhost:3000/ai/query-notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ question }),
      });

      const data = await response.json();
      SetAnswer(data.finalAnswer);
    } catch (error) {
      console.error("AI error:", error);
      setAnswer("Something went wrong.");
    }
    SetLoading(false);
  };
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <div className="container-sketchy" style={{ marginBottom: "20px" }}>
        <h2 style={{ marginBottom: "20px" }}>Ask a question:</h2>
        <form onSubmit={handleask} style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            className="input-sketchy"
            style={{ flex: 1 }}
            placeholder="How does JWT work internally?"
            value={question}
            onChange={(e) => {
              SetQuestion(e.target.value);
            }}
          />

          <button type="submit" className="btn-sketchy btn-primary" style={{ padding: "8px 25px" }}>
            Ask
          </button>
        </form>
      </div>

      {loading && (
        <p style={{ textAlign: "center", fontStyle: "italic", marginTop: "20px" }}>
          Thinking....
        </p>
      )}

      {answer && (
        <div style={{ marginTop: "30px" }}>
          <h2 style={{ marginBottom: "15px" }}>AI Answer</h2>
          <div className="container-sketchy" style={{ borderRadius: "10px", padding: "20px" }}>
            <div style={{ whiteSpace: "pre-wrap" }}>
              {answer}
            </div>
            <div 
              style={{ 
                marginTop: "20px", 
                textAlign: "center", 
                fontSize: "0.8rem", 
                color: "#999",
                borderTop: "1px solid #eee",
                paddingTop: "10px"
              }}
            >
              Answer based on your notes
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatPage;
