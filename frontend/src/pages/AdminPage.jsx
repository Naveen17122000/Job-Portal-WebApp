import { useEffect, useState } from "react";

import { MetricCard } from "../components/ui/MetricCard.jsx";
import { StatusBadge } from "../components/ui/StatusBadge.jsx";
import { api, getErrorMessage } from "../services/api";
import { useApiResource } from "../hooks/useApiResource.js";

export default function AdminPage() {
  const { data: users, refetch } = useApiResource("/users/");
  const [analytics, setAnalytics] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/analytics/").then((response) => setAnalytics(response.data.data)).catch(() => setAnalytics(null));
  }, []);

  async function deactivateUser(userId) {
    setMessage("");
    try {
      await api.delete(`/users/${userId}/`);
      setMessage("User deactivated.");
      refetch();
    } catch (requestError) {
      setMessage(getErrorMessage(requestError));
    }
  }

  return (
    <div className="page-grid">
      <section className="section-header">
        <div>
          <h2>Admin</h2>
          <p>Monitor platform health, users, roles, and job marketplace activity.</p>
        </div>
      </section>
      <div className="metrics-row">
        <MetricCard label="Total users" value={analytics?.users?.total ?? "-"} tone="teal" />
        <MetricCard label="Active jobs" value={analytics?.jobs?.active ?? "-"} tone="coral" />
        <MetricCard label="Applications" value={analytics?.applications?.total ?? "-"} />
      </div>
      {message && <p className="notice">{message}</p>}
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {users.map((account) => (
              <tr key={account.id}>
                <td>{account.username}</td>
                <td>{account.email}</td>
                <td>{account.role}</td>
                <td><StatusBadge status={account.is_active ? "active" : "inactive"} /></td>
                <td><button className="ghost-button" type="button" onClick={() => deactivateUser(account.id)}>Deactivate</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
