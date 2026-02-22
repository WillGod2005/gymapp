import { useState } from "react";
import { useNavigate } from "react-router-dom";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

async function onSubmit(e) {
  e.preventDefault();

  if (password1 !== password2) {
    alert("Passwords do not match");
    return;
  }

  await fetch("/api/csrf/", { credentials: "include" });

  const csrftoken = getCookie("csrftoken");

  const resp = await fetch("/api/auth/register/", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
    },
    body: JSON.stringify({ username, email, password: password1 }),
  });

  if (!resp.ok) {
    const data = await resp.json().catch(() => ({}));
    console.error(data);
    alert("Register failed");
    return;
  }

  navigate("/dashboard", { replace: true });
}


  return (
    <div>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 10, maxWidth: 320 }}>
        <h2>Register</h2>

        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />

        <input
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
          placeholder="password"
          type="password"
        />

        <input
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          placeholder="repeat password"
          type="password"
        />

        <button type="submit">Create account</button>
      </form>
    </div>
  );
}
