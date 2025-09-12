import { useEffect, useState } from "react";
import { getProjects, type Project } from "../lib/projects";
import { errMessage } from "../lib/errors";

export default function ProjectsPage() {
  const [items, setItems] = useState<Project[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setItems(await getProjects());
      } catch (e) {
        setErr(errMessage(e, "Failed to load projects"));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p className="p-4">Loading…</p>;
  if (err) return <p className="p-4 text-red-600">{err}</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl mb-2">Projects</h1>
      <ul className="list-disc ml-5">
        {items.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}
