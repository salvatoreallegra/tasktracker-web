import { FormEvent, useState } from "react";
import { login } from "../lib/auth";
import { errMessage } from "../lib/errors";

export default function LoginPage({ onLoggedIn }: { onLoggedIn: () => void }) {
  const [userName, setUser] = useState("");
  const [password, setPass] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      await login({ userName, password });
      onLoggedIn();
    } catch (e) {
      setErr(errMessage(e, "Login failed"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-10">
      <h1 className="text-xl mb-4">Login</h1>
      <form onSubmit={onSubmit} className="grid gap-2">
        <input
          placeholder="UserName"
          value={userName}
          onChange={(e) => setUser(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPass(e.target.value)}
          className="border p-2 rounded"
        />
        <button className="border rounded p-2" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        {err && <div className="text-red-600">{err}</div>}
      </form>
    </div>
  );
}
