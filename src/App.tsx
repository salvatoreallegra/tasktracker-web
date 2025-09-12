import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProjectsPage from "./pages/ProjectsPage";
import TasksPage from "./pages/TasksPage";
import { useState } from "react";
import { logout } from "./lib/auth";

export default function App() {
  const [authed, setAuthed] = useState(false);

  return (
    <BrowserRouter>
      <nav className="p-2 flex gap-3 border-b">
        <Link to="/projects">Projects</Link>
        <Link to="/tasks">Tasks</Link>
        {authed ? (
          <button
            onClick={async () => {
              await logout();
              setAuthed(false);
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/projects" />} />
        <Route path="/login" element={<LoginPage onLoggedIn={() => setAuthed(true)} />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/tasks" element={<TasksPage />} />
      </Routes>
    </BrowserRouter>
  );
}
