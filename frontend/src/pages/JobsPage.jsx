import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { EmptyState } from "../components/ui/EmptyState.jsx";
import { StatusBadge } from "../components/ui/StatusBadge.jsx";
import { api, getErrorMessage } from "../services/api";
import { useApiResource } from "../hooks/useApiResource.js";
import { useAuth } from "../hooks/useAuth.jsx";

export default function JobsPage() {
  const { user } = useAuth();
  const [filters, setFilters] = useState({ category: "", location: "", salary_min: "", salary_max: "" });
  const [message, setMessage] = useState("");
  const query = useMemo(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    return params.toString() ? `?${params.toString()}` : "";
  }, [filters]);
  const { data: jobs, loading, error, refetch } = useApiResource("/jobs/", { query });

  async function applyToJob(jobId) {
    setMessage("");
    try {
      await api.post("/applications/", { job: jobId, cover_letter: "I am interested in this role." });
      setMessage("Application submitted.");
    } catch (requestError) {
      setMessage(getErrorMessage(requestError));
    }
  }

  return (
    <div className="page-grid">
      <section className="section-header">
        <div>
          <h2>Jobs</h2>
          <p>Search roles by category, location, and salary range.</p>
        </div>
      </section>
      <form className="filter-bar" onSubmit={(event) => { event.preventDefault(); refetch(query); }}>
        <Search size={18} />
        <input placeholder="Category" value={filters.category} onChange={(event) => setFilters({ ...filters, category: event.target.value })} />
        <input placeholder="Location" value={filters.location} onChange={(event) => setFilters({ ...filters, location: event.target.value })} />
        <input type="number" placeholder="Min salary" value={filters.salary_min} onChange={(event) => setFilters({ ...filters, salary_min: event.target.value })} />
        <input type="number" placeholder="Max salary" value={filters.salary_max} onChange={(event) => setFilters({ ...filters, salary_max: event.target.value })} />
        <button className="primary-button compact" type="submit">Filter</button>
      </form>
      {message && <p className="notice">{message}</p>}
      {error && <p className="form-error">{error}</p>}
      {loading ? (
        <p className="muted">Loading jobs...</p>
      ) : jobs.length ? (
        <div className="job-list">
          {jobs.map((job) => (
            <article className="job-row" key={job.id}>
              <div>
                <h3>{job.title}</h3>
                <p>{job.company_name} · {job.location} · {job.category}</p>
                <p>{job.description}</p>
                <div className="tag-row">
                  {(job.required_skills || []).map((skill) => <span key={skill}>{skill}</span>)}
                </div>
              </div>
              <div className="row-actions">
                <StatusBadge status={job.status} />
                <strong>{job.salary_min && job.salary_max ? `$${job.salary_min} - $${job.salary_max}` : "Salary open"}</strong>
                {user?.role === "seeker" && <button className="secondary-button" onClick={() => applyToJob(job.id)}>Apply</button>}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <EmptyState title="No jobs found" description="Try widening your search filters." />
      )}
    </div>
  );
}
