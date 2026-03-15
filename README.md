# IdeasAnswer

A personal note-taking application with a unique **"Sketchy" UI** and powerful **AI-driven querying** capabilities.

## Features

*   **Premium Sketchy UI**: A bespoke, hand-drawn aesthetic using the "Architects Daughter" font and custom irregular borders.
*   **AI-Powered Search**: Ask questions about your notes and get intelligent answers powered by Ollama (Llama 3).
*   **Persistent Notes**: full CRUD (Create, Read, Update, Delete) functionality for notes stored in MongoDB.
*   **Smart Caching**: Uses Redis to cache AI responses for common questions, ensuring lightning-fast performance.
*   **Secure Auth**: JWT-based authentication with `httpOnly` cookies for maximum security.
*   **Mobile Friendly**: Responsive design with a clean, centered layout.

## Tech Stack

### Frontend
- **Framework**: [React](https://react.dev/) (Vite)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Styling**: Vanilla CSS (Hand-drawn theme)
- **Context API**: For global Authentication state.

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose ODM)
- **Cache**: [Redis](https://redis.io/)
- **AI Engine**: [Ollama](https://ollama.com/) (Llama 3)
- **Auth**: [JSON Web Tokens (JWT)](https://jwt.io/) & [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)

## Getting Started 

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or on Atlas)
- Redis server (v6+)
- [Ollama](https://ollama.com/) with `llama3` model pulled.

### Installation

1.  **Clone the project**
    ```bash
    git clone <your-repo-link>
    cd ideasanswer
    ```

2.  **Setup Backend**
    ```bash
    cd backend
    npm install
    ```
    Create a `.env` file in `backend/`:
    ```env
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/ideasanswer
    JWT_SECRET=your_super_secret_key
    REDIS_URL=redis://localhost:6379
    ```
    Start the server:
    ```bash
    npm run dev
    ```

3.  **Setup Frontend**
    ```bash
    cd ../client
    npm install
    npm run dev
    ```

## Project Structure

```text
ideasanswer/
├── backend/            # Express server & API logic
│   ├── src/
│   │   ├── config/      # DB & Redis configuration
│   │   ├── middleware/  # Auth & error handling
│   │   ├── models/      # Mongoose schemas
│   │   ├── routes/      # API endpoints (Auth, Notes, AI)
│   │   └── server.js    # Entry point
├── client/             # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page-level components
│   │   ├── Context.jsx/ # Global Auth state
│   │   ├── index.css    # Global "Sketchy" styles
│   │   └── main.jsx     # Entry point
└── README.md           # You are here!
```

## AI Querying
The app connects to a local Ollama instance. Ensure it's running and you have pulled the model:
```bash
ollama run llama3
```
The AI summarizes your notes to answer specific questions, and results are cached in Redis for one hour to reduce local CPU load.

## UI Design
The unique "Sketchy" design is built using custom CSS border-radius tricks:
```css
border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
```
This creates the imperfect, hand-drawn look seen across the application.

## Future Scope
- **Note Categorization**: Add actual backend support for tags and categories.
- **Rich Text Support**: Implement a sketchy-styled markdown editor for notes.
- **Voice Queries**: Add speech-to-text capabilities for asking questions.
- **Collaboration**: Allow sharing notes with other users.
- **Offline Support**: PWA capabilities for accessing notes without an internet connection.
