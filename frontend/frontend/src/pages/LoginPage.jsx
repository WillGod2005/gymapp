import { useState } from "react";
import { useNavigate } from "react-router-dom";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  async function onSubmit(e) {
    e.preventDefault();

    await fetch("/api/csrf/", { credentials: "include" });
    const csrftoken = getCookie("csrftoken");

    const resp = await fetch("/api/auth/login/", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
    },
    body: JSON.stringify({ username, password: password }),
  });

    if (!resp.ok) {
      const data = await resp.json().catch(() => ({}));
      console.error(data);
      alert("login failed");
      return;
    }

    navigate("/dashboard", { replace: true });
  }

  return (
    <div>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 10, maxWidth: 320 }}>
        <h2>Login</h2>
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" type="password" />
        <button type="submit">Login</button>
      </form>

      <div>
        <button action= {navigate("/register", { replace: true })}>Sign Up</button>
      </div>
    </div>
  );
}
