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

Run these SQL commands in your Supabase SQL editor:

```sql
-- Profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Rooms table
CREATE TABLE rooms (
  room_id TEXT PRIMARY KEY,
  owner_id UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Saved code table
CREATE TABLE saved_code (
  id SERIAL PRIMARY KEY,
  room_id TEXT REFERENCES rooms(room_id) UNIQUE,
  code_content TEXT,
  language TEXT,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_code ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can create rooms" ON rooms
  FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Anyone can view rooms" ON rooms
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can save code" ON saved_code
  FOR ALL USING (true);
```

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
