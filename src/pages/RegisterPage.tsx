import { FormEvent, useState } from "react";
import { register, login } from "../lib/auth";
import { errMessage } from "../lib/errors";

export default function RegisterPage({ onRegistered }: { onRegistered: () => void }) {
  const [userName, setUser] = useState("");
  const [password, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    if (password !== confirm) {
      setErr("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await register({ userName, password });
      // Auto-login so the user lands authenticated
      await login({ userName, password });
      onRegistered();
    } catch (e) {
      setErr(errMessage(e, "Registration failed"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-10">
      <h1 className="text-xl mb-4">Create Account</h1>
      <form onSubmit={onSubmit} className="grid gap-2">
        <input
          placeholder="UserName"
          value={userName}
          onChange={(e) => setUser(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPass(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          placeholder="Confirm password"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button className="border rounded p-2" disabled={loading}>
          {loading ? "Creating…" : "Register"}
        </button>
        {err && <div className="text-red-600">{err}</div>}
      </form>
    </div>
  );
}
