import { useMemo, useState } from "react";

import { StatusBadge } from "../components/ui/StatusBadge.jsx";
import { api, getErrorMessage } from "../services/api";
import { useApiResource } from "../hooks/useApiResource.js";

const STATUS_OPTIONS = ["review", "shortlisted", "rejected", "hired"];

export default function RecruiterPage() {
  const { data: companies } = useApiResource("/companies/");
  const { data: jobs, refetch: refetchJobs } = useApiResource("/jobs/");
  const { data: applications, refetch: refetchApplications } = useApiResource("/applications/");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    company: "",
    title: "",
    category: "",
    location: "",
    description: "",
    salary_min: "",
    salary_max: "",
    required_skills: "",
    status: "active"
  });

  const companyOptions = useMemo(() => companies.map((company) => ({ id: company.id, name: company.name })), [companies]);

  async function createJob(event) {
    event.preventDefault();
    setMessage("");
    try {
      await api.post("/jobs/", {
        ...form,
        company: Number(form.company),
        salary_min: form.salary_min ? Number(form.salary_min) : null,
        salary_max: form.salary_max ? Number(form.salary_max) : null,
        required_skills: form.required_skills.split(",").map((skill) => skill.trim()).filter(Boolean)
      });
      setForm({ ...form, title: "", category: "", location: "", description: "", salary_min: "", salary_max: "", required_skills: "" });
      setMessage("Job posted.");
      refetchJobs();
    } catch (requestError) {
      setMessage(getErrorMessage(requestError));
    }
  }

  async function updateStatus(applicationId, status) {
    setMessage("");
    try {
      await api.patch(`/applications/${applicationId}/status/`, { status });
      setMessage("Application status updated.");
      refetchApplications();
    } catch (requestError) {
      setMessage(getErrorMessage(requestError));
    }
  }

  return (
    <div className="page-grid">
      <section className="section-header">
        <div>
          <h2>Recruiter dashboard</h2>
          <p>Post roles, manage active listings, and review candidates.</p>
        </div>
      </section>
      <form className="panel form-grid two-col" onSubmit={createJob}>
        <label>Company<select required value={form.company} onChange={(event) => setForm({ ...form, company: event.target.value })}>
          <option value="">Select company</option>
          {companyOptions.map((company) => <option key={company.id} value={company.id}>{company.name}</option>)}
        </select></label>
        <label>Title<input required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} /></label>
        <label>Category<input required value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} /></label>
        <label>Location<input required value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} /></label>
        <label>Salary min<input type="number" value={form.salary_min} onChange={(event) => setForm({ ...form, salary_min: event.target.value })} /></label>
        <label>Salary max<input type="number" value={form.salary_max} onChange={(event) => setForm({ ...form, salary_max: event.target.value })} /></label>
        <label className="full-span">Required skills<input value={form.required_skills} onChange={(event) => setForm({ ...form, required_skills: event.target.value })} /></label>
        <label className="full-span">Description<textarea required value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} /></label>
        <button className="primary-button full-span" type="submit">Post job</button>
      </form>
      {message && <p className="notice">{message}</p>}
      <div className="split-grid">
        <section className="panel">
          <h3>Active listings</h3>
          <div className="list-stack">
            {jobs.map((job) => (
              <article className="list-row" key={job.id}>
                <div><strong>{job.title}</strong><p>{job.application_count || 0} applications</p></div>
                <StatusBadge status={job.status} />
              </article>
            ))}
          </div>
        </section>
        <section className="panel">
          <h3>Candidate review</h3>
          <div className="list-stack">
            {applications.map((application) => (
              <article className="candidate-row" key={application.id}>
                <div>
                  <strong>{application.candidate_name || "Candidate"}</strong>
                  <p>{application.job_title}</p>
                </div>
                <StatusBadge status={application.status} />
                <select value={application.status} onChange={(event) => updateStatus(application.id, event.target.value)}>
                  <option value={application.status}>Move to...</option>
                  {STATUS_OPTIONS.map((status) => <option key={status} value={status}>{status}</option>)}
                </select>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
