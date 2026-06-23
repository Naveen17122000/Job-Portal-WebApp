import { useState } from "react";

import { EmptyState } from "../components/ui/EmptyState.jsx";
import { api, getErrorMessage } from "../services/api";
import { useApiResource } from "../hooks/useApiResource.js";
import { useAuth } from "../hooks/useAuth.jsx";

export default function CompaniesPage() {
  const { user } = useAuth();
  const { data: companies, loading, error, refetch } = useApiResource("/companies/");
  const [form, setForm] = useState({ name: "", website: "", location: "", industry: "", description: "" });
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    try {
      await api.post("/companies/", form);
      setForm({ name: "", website: "", location: "", industry: "", description: "" });
      setMessage("Company saved.");
      refetch();
    } catch (requestError) {
      setMessage(getErrorMessage(requestError));
    }
  }

  return (
    <div className="page-grid">
      <section className="section-header">
        <div>
          <h2>Companies</h2>
          <p>Recruiters manage company profiles before publishing jobs.</p>
        </div>
      </section>
      {user?.role === "recruiter" && (
        <form className="panel form-grid two-col" onSubmit={handleSubmit}>
          <label>Company name<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label>
          <label>Website<input value={form.website} onChange={(event) => setForm({ ...form, website: event.target.value })} /></label>
          <label>Location<input value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} /></label>
          <label>Industry<input value={form.industry} onChange={(event) => setForm({ ...form, industry: event.target.value })} /></label>
          <label className="full-span">Description<textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} /></label>
          <button className="primary-button full-span" type="submit">Save company</button>
        </form>
      )}
      {message && <p className="notice">{message}</p>}
      {error && <p className="form-error">{error}</p>}
      {loading ? <p className="muted">Loading companies...</p> : companies.length ? (
        <div className="cards-grid">
          {companies.map((company) => (
            <article className="company-card" key={company.id}>
              <h3>{company.name}</h3>
              <p>{company.industry || "Industry pending"} · {company.location || "Remote"}</p>
              <p>{company.description || "No description yet."}</p>
            </article>
          ))}
        </div>
      ) : <EmptyState title="No companies found" description="Create the first company profile." />}
    </div>
  );
}
