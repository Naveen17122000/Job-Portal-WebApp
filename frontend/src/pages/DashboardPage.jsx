import { BriefcaseBusiness, ClipboardCheck, UsersRound } from "lucide-react";

import { MetricCard } from "../components/ui/MetricCard.jsx";
import { StatusBadge } from "../components/ui/StatusBadge.jsx";
import { useApiResource } from "../hooks/useApiResource.js";
import { useAuth } from "../hooks/useAuth.jsx";

export default function DashboardPage() {
  const { user } = useAuth();
  const { data: jobs } = useApiResource("/jobs/?page_size=5");
  const { data: applications } = useApiResource("/applications/?page_size=5");

  return (
    <div className="page-grid">
      <section className="section-header">
        <div>
          <h2>Command center</h2>
          <p>Track the work that matters for your {user?.role} workspace.</p>
        </div>
      </section>

      <div className="metrics-row">
        <MetricCard label="Open jobs" value={jobs.length} tone="teal" />
        <MetricCard label="Applications" value={applications.length} tone="coral" />
        <MetricCard label="Role" value={user?.role || "-"} />
      </div>

      <div className="split-grid">
        <section className="panel">
          <div className="panel-title">
            <BriefcaseBusiness size={18} />
            <h3>Recent jobs</h3>
          </div>
          <div className="list-stack">
            {jobs.map((job) => (
              <article className="list-row" key={job.id}>
                <div>
                  <strong>{job.title}</strong>
                  <p>{job.company_name} · {job.location}</p>
                </div>
                <StatusBadge status={job.status} />
              </article>
            ))}
          </div>
        </section>
        <section className="panel">
          <div className="panel-title">
            {user?.role === "recruiter" ? <UsersRound size={18} /> : <ClipboardCheck size={18} />}
            <h3>Application movement</h3>
          </div>
          <div className="timeline">
            {applications.map((application) => (
              <article className="timeline-item" key={application.id}>
                <span />
                <div>
                  <strong>{application.job_title}</strong>
                  <p>{application.company_name || application.candidate_name}</p>
                </div>
                <StatusBadge status={application.status} />
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
