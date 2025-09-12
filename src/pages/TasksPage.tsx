import { FormEvent, useEffect, useState } from "react";
import { createTask, deleteTask, getTasks, toggleDone, type TaskItem } from "../lib/tasks";
import { getProjects, type Project } from "../lib/projects";
import { errMessage } from "../lib/errors";

export default function TasksPage() {
  const [items, setItems] = useState<TaskItem[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState<number>(0);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    setErr(null);
    try {
      const [t, p] = await Promise.all([getTasks(), getProjects()]);
      setItems(t);
      setProjects(p);
      if (p.length && !projectId) setProjectId(p[0].id);
    } catch (e) {
      setErr(errMessage(e, "Failed to load tasks/projects"));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    try {
      const created = await createTask({ title, projectId });
      setItems((prev) => [created, ...prev]);
      setTitle("");
    } catch (e) {
      setErr(errMessage(e, "Create failed"));
    }
  }

  async function onToggle(t: TaskItem) {
    try {
      const updated = await toggleDone(t.id, !t.isDone);
      setItems((prev) => prev.map((x) => (x.id === t.id ? updated : x)));
    } catch (e) {
      setErr(errMessage(e, "Update failed"));
    }
  }

  async function onDelete(id: number) {
    try {
      await deleteTask(id);
      setItems((prev) => prev.filter((x) => x.id !== id));
    } catch (e) {
      setErr(errMessage(e, "Delete failed"));
    }
  }

  if (loading) return <p className="p-4">Loading…</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl mb-3">Tasks</h1>

      <form onSubmit={onCreate} className="flex gap-2 mb-3">
        <input
          className="border p-2 rounded"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <select
          className="border p-2 rounded"
          value={projectId}
          onChange={(e) => setProjectId(Number(e.target.value))}
        >
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <button className="border rounded px-3">Add</button>
      </form>

      {err && <div className="text-red-600 mb-3">{err}</div>}

      <ul className="grid gap-2">
        {items.map((t) => (
          <li
            key={t.id}
            className="border p-2 rounded flex justify-between items-center"
          >
            <span>
              <input
                type="checkbox"
                className="mr-2"
                checked={t.isDone}
                onChange={() => void onToggle(t)}
              />
              {t.title}
            </span>
            <button className="border rounded px-3" onClick={() => void onDelete(t.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
