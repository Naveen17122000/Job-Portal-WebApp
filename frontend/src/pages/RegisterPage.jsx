import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth.jsx";
import { getErrorMessage } from "../services/api";

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    role: "seeker",
    phone: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signUp } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    try {
      localStorage.setItem("lastRole", form.role);
      await signUp(form);
      navigate("/login");
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    }
  }

  return (
    <main className="auth-screen">
      <section className="auth-panel wide">
        <div className="brand auth-brand">
          <span className="brand-mark">TB</span>
          <span>TalentBridge</span>
        </div>
        <h1>Create your account</h1>
        <form className="form-grid two-col" onSubmit={handleSubmit}>
          <label>
            First name
            <input value={form.first_name} onChange={(event) => setForm({ ...form, first_name: event.target.value })} />
          </label>
          <label>
            Last name
            <input value={form.last_name} onChange={(event) => setForm({ ...form, last_name: event.target.value })} />
          </label>
          <label>
            Username
            <input required value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })} />
          </label>
          <label>
            Email
            <input type="email" required value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
          </label>
          <label>
            Password
            <input type="password" minLength={8} required value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
          </label>
          <label>
            Role
            <select value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })}>
              <option value="seeker">Job seeker</option>
              <option value="recruiter">Recruiter</option>
            </select>
          </label>
          <label className="full-span">
            Phone
            <input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} />
          </label>
          {error && <p className="form-error full-span">{error}</p>}
          <button className="primary-button full-span" type="submit">Create account</button>
        </form>
        <p className="auth-link">
          Already registered? <Link to="/login">Sign in</Link>
        </p>
      </section>
    </main>
  );
}
