import { StatusBadge } from "../components/ui/StatusBadge.jsx";
import { EmptyState } from "../components/ui/EmptyState.jsx";
import { useApiResource } from "../hooks/useApiResource.js";

export default function ApplicationsPage() {
  const { data: applications, loading, error } = useApiResource("/applications/");

  return (
    <div className="page-grid">
      <section className="section-header">
        <div>
          <h2>Applications</h2>
          <p>Follow application status from submission through recruiter review.</p>
        </div>
      </section>
      {error && <p className="form-error">{error}</p>}
      {loading ? (
        <p className="muted">Loading applications...</p>
      ) : applications.length ? (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Role</th>
                <th>Company</th>
                <th>Candidate</th>
                <th>Status</th>
                <th>Applied</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application.id}>
                  <td>{application.job_title}</td>
                  <td>{application.company_name}</td>
                  <td>{application.candidate_name || "You"}</td>
                  <td><StatusBadge status={application.status} /></td>
                  <td>{new Date(application.applied_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState title="No applications yet" description="Submitted applications will appear here." />
      )}
    </div>
  );
}
