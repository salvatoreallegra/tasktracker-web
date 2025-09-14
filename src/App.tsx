import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProjectsPage from "./pages/ProjectsPage";
import TasksPage from "./pages/TasksPage";
import RegisterPage from "./pages/RegisterPage";
import { useState } from "react";
import { logout } from "./lib/auth";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  // Not persisted by design (tokens are in-memory). Page refresh => logged out.
  const [authed, setAuthed] = useState(false);

  return (
    <BrowserRouter>
      <nav className="p-2 flex gap-3 border-b">
        {authed && (
          <>
            <Link to="/projects">Projects</Link>
            <Link to="/tasks">Tasks</Link>
          </>
        )}
        {!authed ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button
            onClick={async () => {
              await logout();
              setAuthed(false);
              // ProtectedRoute will kick the user to /login on the next render
            }}
          >
            Logout
          </button>
        )}
      </nav>

      <Routes>
        {/* If not authed, land on /login; if authed, land on /projects */}
        <Route path="/" element={<Navigate to={authed ? "/projects" : "/login"} replace />} />

        <Route path="/login" element={<LoginPage onLoggedIn={() => setAuthed(true)} />} />
        <Route path="/register" element={<RegisterPage onRegistered={() => setAuthed(true)} />} />

        <Route
          path="/projects"
          element={
            <ProtectedRoute authed={authed}>
              <ProjectsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute authed={authed}>
              <TasksPage />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
