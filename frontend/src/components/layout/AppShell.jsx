import {
  BarChart3,
  BriefcaseBusiness,
  Building2,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Shield,
  UserRound
} from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth.jsx";

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, roles: ["seeker", "recruiter", "admin"] },
  { to: "/jobs", label: "Jobs", icon: BriefcaseBusiness, roles: ["seeker", "recruiter", "admin"] },
  { to: "/applications", label: "Applications", icon: ClipboardList, roles: ["seeker", "recruiter", "admin"] },
  { to: "/companies", label: "Companies", icon: Building2, roles: ["recruiter", "admin"] },
  { to: "/profile", label: "Profile", icon: UserRound, roles: ["seeker"] },
  { to: "/recruiter", label: "Recruiter", icon: BarChart3, roles: ["recruiter"] },
  { to: "/admin", label: "Admin", icon: Shield, roles: ["admin"] }
];

export function AppShell() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const visibleItems = NAV_ITEMS.filter((item) => item.roles.includes(user?.role));

  function handleLogout() {
    signOut();
    navigate("/login");
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">TB</span>
          <span>TalentBridge</span>
        </div>
        <nav className="nav-list" aria-label="Primary navigation">
          {visibleItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink key={item.to} to={item.to} end={item.to === "/"} className="nav-link">
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
        <button className="ghost-button sidebar-logout" type="button" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Sign out</span>
        </button>
      </aside>
      <main className="main-panel">
        <header className="topbar">
          <div>
            <p className="muted">Signed in as {user?.role}</p>
            <h1>{user?.username || "Workspace"}</h1>
          </div>
          <div className="status-chip">Platform Health</div>
        </header>
        <Outlet />
      </main>
    </div>
  );
}
