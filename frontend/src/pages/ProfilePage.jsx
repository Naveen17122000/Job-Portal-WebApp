import { useEffect, useState } from "react";

import { api, getErrorMessage } from "../services/api";
import { useApiResource } from "../hooks/useApiResource.js";

export default function ProfilePage() {
  const { data: profiles, loading, refetch } = useApiResource("/profiles/");
  const profile = profiles[0];
  const [form, setForm] = useState({ headline: "", location: "", skills: "", experience_years: 0, portfolio_url: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (profile) {
      setForm({
        headline: profile.headline || "",
        location: profile.location || "",
        skills: (profile.skills || []).join(", "),
        experience_years: profile.experience_years || 0,
        portfolio_url: profile.portfolio_url || ""
      });
    }
  }, [profile]);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    const payload = {
      ...form,
      experience_years: Number(form.experience_years),
      skills: form.skills.split(",").map((skill) => skill.trim()).filter(Boolean)
    };
    try {
      if (profile) {
        await api.patch(`/profiles/${profile.id}/`, payload);
      } else {
        await api.post("/profiles/", payload);
      }
      setMessage("Profile updated.");
      refetch();
    } catch (requestError) {
      setMessage(getErrorMessage(requestError));
    }
  }

  return (
    <div className="page-grid">
      <section className="section-header">
        <div>
          <h2>Profile</h2>
          <p>Maintain your candidate profile, skills, experience, and resume details.</p>
        </div>
      </section>
      {loading ? <p className="muted">Loading profile...</p> : (
        <form className="panel form-grid two-col" onSubmit={handleSubmit}>
          <label>Headline<input value={form.headline} onChange={(event) => setForm({ ...form, headline: event.target.value })} /></label>
          <label>Location<input value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} /></label>
          <label>Experience years<input type="number" min="0" value={form.experience_years} onChange={(event) => setForm({ ...form, experience_years: event.target.value })} /></label>
          <label>Portfolio URL<input value={form.portfolio_url} onChange={(event) => setForm({ ...form, portfolio_url: event.target.value })} /></label>
          <label className="full-span">Skills<input placeholder="React, Django, SQL" value={form.skills} onChange={(event) => setForm({ ...form, skills: event.target.value })} /></label>
          <button className="primary-button full-span" type="submit">Save profile</button>
        </form>
      )}
      {message && <p className="notice">{message}</p>}
    </div>
  );
}
