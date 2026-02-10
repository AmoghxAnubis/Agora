# Agora - Real-Time Collaborative Code Editor

A browser-based collaborative code editor with an Apple-inspired "Cupertino Minimal" design aesthetic.

## Features

- 🚀 **Real-time Collaboration**: Instant code synchronization with Socket.io
- 🎨 **Beautiful Design**: Apple-inspired glassmorphism UI with dark mode
- 🔐 **Secure Authentication**: Powered by Supabase
- 💾 **Persistent Storage**: Save and load your code sessions
- 🎯 **Monaco Editor**: The same editor that powers VS Code
- 👥 **User Presence**: See who's online in real-time

## Tech Stack

**Frontend:**
- React + Vite
- Tailwind CSS
- Framer Motion
- Monaco Editor
- Socket.io Client
- Supabase JS Client

**Backend:**
- Node.js + Express
- Socket.io
- Supabase (PostgreSQL + Auth)

## Getting Started

### Prerequisites

- Node.js (v16+)
- A Supabase account (free tier works)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. Set up Supabase:

- Create a new project at [supabase.com](https://supabase.com)
- Run the SQL commands in the implementation plan to create tables
- Copy your project URL and anon key

4. Configure environment variables:

```bash
# client/.env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SOCKET_URL=http://localhost:3001

# server/.env
PORT=3001
CLIENT_URL=http://localhost:5173
```

### Running the App

1. Start the server:

```bash
cd server
npm run dev
```

2. Start the client (in a new terminal):

```bash
cd client
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

## Database Setup

To set up the database schema and Row Level Security (RLS) policies, please run the contents of the `db_setup.sql` file included in this repository.

1. Open `db_setup.sql`
2. Copy all contents
3. Paste and run in your Supabase project's SQL Editor

## Project Structure

```
/agora
  ├── /client (React)
  │     ├── /src
  │     │    ├── /components
  │     │    │     ├── AuthForm.jsx
  │     │    │     ├── GlassCard.jsx
  │     │    │     ├── Sidebar.jsx
  │     │    │     └── ThemeToggle.jsx
  │     │    ├── /pages
  │     │    │     ├── Dashboard.jsx
  │     │    │     ├── EditorPage.jsx
  │     │    │     └── Home.jsx
  │     │    ├── supabaseClient.js
  │     │    ├── socket.js
  │     │    └── App.tsx
  │     └── package.json
  ├── /server (Node.js)
  │     ├── server.js
  │     └── package.json
  └── README.md
```

## License

MIT
