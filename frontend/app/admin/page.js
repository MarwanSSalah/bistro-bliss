"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001/api";

/* ─────────────────────────────────────────
  STAT CARD
───────────────────────────────────────── */
function StatCard({ label, value, href, icon, trend }) {
  const router = useRouter();
  return (
    <div className="adm-stat-card" onClick={() => router.push(href)}>
      <div className="adm-stat-icon">{icon}</div>
      <div className="adm-stat-label">{label}</div>
      <div className="adm-stat-value">
        {value ?? <span className="adm-stat-loading">—</span>}
      </div>
      {trend && <div className="adm-stat-trend">{trend}</div>}
      <div className="adm-stat-cta">View details →</div>
    </div>
  );
}

/* ─────────────────────────────────────────
  PAGE
───────────────────────────────────────── */
export default function AdminPage() {
  const [user,    setUser]    = useState(null);
  const [stats,   setStats]   = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  /* auth */
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) { setLoading(false); return; }
      try {
        const res = await fetch(`${API_URL}/me`, {
          headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        });
        if (!res.ok) { localStorage.removeItem("token"); setLoading(false); return; }
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error("Admin auth check failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  /* stats */
  useEffect(() => {
    if (!user || user?.role !== "ADMIN") return;
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}/admin/stats`, {
          headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
        });
        if (!res.ok) throw new Error("Failed to fetch admin stats");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Admin stats error:", err);
      }
    };
    fetchStats();
  }, [user]);

  /* ── Loading ── */
  if (loading || (!user && loading !== false)) {
    return (
      <>
        <style>{css}</style>
        <main className="adm-centered adm-full">
          <div className="adm-spinner-wrap">
            <div className="adm-spinner" />
            <p className="adm-spinner-label">Authenticating…</p>
          </div>
        </main>
      </>
    );
  }

  /* ── Access denied ── */
  if (!user || user?.role !== "ADMIN") {
    return (
      <>
        <style>{css}</style>
        <main className="adm-centered adm-full">
          <div className="adm-denied">
            <div className="adm-denied-icon">🔒</div>
            <h1 className="adm-denied-title">Access Denied</h1>
            <p className="adm-denied-sub">
              You don&apos;t have permission to view this page.
            </p>
            <button className="adm-denied-btn" onClick={() => router.push("/login")}>
              Back to Login →
            </button>
          </div>
        </main>
      </>
    );
  }

  /* ── Dashboard ── */
  return (
    <>
      <style>{css}</style>

      <main className="adm-page">

        {/* ── top bar ── */}
        <div className="adm-topbar">
          <div className="adm-topbar-inner">
            <div>
              <div className="adm-eyebrow">Admin Panel</div>
              <h1 className="adm-page-title">
                Dashboard <em>Overview</em>
              </h1>
            </div>
            <div className="adm-welcome">
              <div className="adm-welcome-avatar">
                {user.name?.[0]?.toUpperCase() ?? "A"}
              </div>
              <div>
                <div className="adm-welcome-name">Welcome back, {user.name}</div>
                <div className="adm-welcome-role">Administrator</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── main content ── */}
        <div className="adm-content">

          {/* stat cards */}
          <div className="adm-stat-grid">
            <StatCard
              label="Total Bookings"
              value={stats?.totalBookings}
              href="/admin/bookings"
              icon="📅"
              trend="Manage reservations"
            />
            <StatCard
              label="Total Users"
              value={stats?.totalUsers}
              href="/admin/users"
              icon="👥"
              trend="View all accounts"
            />
            <StatCard
              label="Menu Items"
              value={stats?.totalMenuItems}
              href="/admin/menu-items"
              icon="🍽"
              trend="Edit your menu"
            />
          </div>

          {/* quick nav */}
          <div className="adm-section-label">Quick Actions</div>
          <div className="adm-quick-grid">
            {[
              { label: "Manage Bookings",   href: "/admin/bookings",   desc: "View, confirm, or cancel reservations"  },
              { label: "Manage Users",       href: "/admin/users",      desc: "Edit roles, disable accounts"           },
              { label: "Edit Menu Items",    href: "/admin/menu-items", desc: "Add, update, or remove dishes"          },
              { label: "Back to Site",       href: "/",                 desc: "Return to the public-facing website"    },
            ].map(({ label, href, desc }) => (
              <div key={href} className="adm-quick-card" onClick={() => router.push(href)}>
                <div className="adm-quick-label">{label}</div>
                <div className="adm-quick-desc">{desc}</div>
                <div className="adm-quick-arrow">→</div>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}

/* ─────────────────────────────────────────
   STYLES
───────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --cream:       #FAF7F2;
    --cream2:      #F2EDE4;
    --burgundy:    #6B1A2A;
    --burgundy-lt: #8B2A3E;
    --gold:        #C9965A;
    --gold-lt:     #E8B87A;
    --charcoal:    #1C1612;
    --warm-gray:   #8C7B6B;
    --card-bg:     #FFFCF8;
  }

  /* ── full-screen states ── */
  .adm-full {
    min-height: 100vh;
    background: var(--charcoal);
  }
  .adm-centered {
    display: flex; align-items: center; justify-content: center;
  }

  /* spinner */
  .adm-spinner-wrap { text-align: center; }
  .adm-spinner {
    width: 48px; height: 48px;
    border-radius: 50%;
    border: 2px solid rgba(201,150,90,.15);
    border-top-color: var(--gold);
    animation: admSpin .9s linear infinite;
    margin: 0 auto 1rem;
  }
  @keyframes admSpin { to { transform: rotate(360deg); } }
  .adm-spinner-label {
    font-family: 'DM Sans', sans-serif;
    font-size: .8rem; font-weight: 300;
    letter-spacing: .1em; text-transform: uppercase;
    color: rgba(250,247,242,.35);
  }

  /* denied */
  .adm-denied {
    text-align: center; padding: 3rem 2rem;
    background: rgba(250,247,242,.03);
    border: 1px solid rgba(250,247,242,.08);
    border-radius: 20px;
    max-width: 400px; width: 100%;
  }
  .adm-denied-icon { font-size: 2.5rem; margin-bottom: 1rem; }
  .adm-denied-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem; font-weight: 600;
    color: #FAF7F2; margin-bottom: .5rem;
  }
  .adm-denied-sub {
    font-family: 'DM Sans', sans-serif;
    font-size: .85rem; font-weight: 300;
    color: rgba(250,247,242,.4); margin-bottom: 1.8rem;
    line-height: 1.6;
  }
  .adm-denied-btn {
    font-family: 'DM Sans', sans-serif;
    font-size: .78rem; font-weight: 500;
    letter-spacing: .08em; text-transform: uppercase;
    background: var(--gold); color: var(--charcoal);
    border: none; padding: .7rem 1.8rem;
    border-radius: 2rem; cursor: pointer;
    transition: background .25s, transform .2s;
  }
  .adm-denied-btn:hover { background: var(--gold-lt); transform: translateY(-1px); }

  /* ── page shell ── */
  .adm-page {
    min-height: 100vh;
    background: var(--cream2);
  }

  /* ── top bar ── */
  .adm-topbar {
    background: var(--charcoal);
    padding: 6rem 1.5rem 3rem;
    position: relative;
    overflow: hidden;
  }
  .adm-topbar::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg,#1C1612 0%,#3D1A12 55%,#6B1A2A 100%);
    opacity: .96;
  }
  .adm-topbar::after {
    content: '';
    position: absolute; inset: 0;
    opacity: .03;
    background-image: repeating-linear-gradient(45deg,#C9965A 0,#C9965A 1px,transparent 0,transparent 50%);
    background-size: 20px 20px;
    pointer-events: none;
  }
  .adm-topbar-inner {
    position: relative; z-index: 1;
    max-width: 1100px; margin: 0 auto;
    display: flex; align-items: flex-end;
    justify-content: space-between; gap: 2rem;
    flex-wrap: wrap;
  }
  .adm-eyebrow {
    display: inline-flex; align-items: center; gap: .5rem;
    font-family: 'DM Sans', sans-serif;
    font-size: .7rem; font-weight: 500;
    letter-spacing: .2em; text-transform: uppercase;
    color: var(--gold); margin-bottom: .6rem;
  }
  .adm-eyebrow::before {
    content: '';
    display: inline-block; width: 18px; height: 1px;
    background: var(--gold);
  }
  .adm-page-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 300; line-height: 1.1;
    color: #FAF7F2; margin: 0;
  }
  .adm-page-title em { font-style: italic; color: var(--gold-lt); }

  /* welcome badge */
  .adm-welcome {
    display: flex; align-items: center; gap: .85rem;
    background: rgba(250,247,242,.05);
    border: 1px solid rgba(250,247,242,.1);
    border-radius: 14px; padding: .9rem 1.2rem;
    backdrop-filter: blur(8px);
  }
  .adm-welcome-avatar {
    width: 40px; height: 40px; border-radius: 50%;
    background: linear-gradient(135deg,var(--gold),var(--burgundy-lt));
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.2rem; font-weight: 600; color: #FAF7F2;
    flex-shrink: 0; border: 2px solid rgba(201,150,90,.3);
  }
  .adm-welcome-name {
    font-family: 'DM Sans', sans-serif;
    font-size: .85rem; font-weight: 500; color: #FAF7F2;
  }
  .adm-welcome-role {
    font-family: 'DM Sans', sans-serif;
    font-size: .7rem; font-weight: 400;
    letter-spacing: .1em; text-transform: uppercase;
    color: var(--gold); margin-top: .15rem;
  }

  /* ── content area ── */
  .adm-content {
    max-width: 1100px; margin: 0 auto;
    padding: 3rem 1.5rem 5rem;
  }

  /* ── stat cards ── */
  .adm-stat-grid {
    display: grid; grid-template-columns: repeat(3,1fr);
    gap: 1.4rem; margin-bottom: 3rem;
  }
  .adm-stat-card {
    background: var(--card-bg);
    border: 1px solid rgba(107,26,42,.08);
    border-radius: 16px; padding: 2rem 1.6rem;
    cursor: pointer;
    transition: transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s, border-color .3s;
    position: relative; overflow: hidden;
  }
  .adm-stat-card::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg,rgba(107,26,42,.02),rgba(201,150,90,.03));
    opacity: 0; transition: opacity .35s;
  }
  .adm-stat-card:hover::before { opacity: 1; }
  .adm-stat-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 55px rgba(107,26,42,.13);
    border-color: rgba(107,26,42,.18);
  }
  .adm-stat-icon {
    font-size: 1.6rem; margin-bottom: 1rem;
    transition: transform .3s;
  }
  .adm-stat-card:hover .adm-stat-icon { transform: scale(1.15) rotate(-5deg); }
  .adm-stat-label {
    font-family: 'DM Sans', sans-serif;
    font-size: .72rem; font-weight: 500;
    letter-spacing: .12em; text-transform: uppercase;
    color: var(--warm-gray); margin-bottom: .5rem;
  }
  .adm-stat-value {
    font-family: 'Cormorant Garamond', serif;
    font-size: 3rem; font-weight: 600;
    color: var(--charcoal); line-height: 1;
    margin-bottom: .4rem;
    transition: color .25s;
  }
  .adm-stat-card:hover .adm-stat-value { color: var(--burgundy); }
  .adm-stat-loading {
    font-family: 'DM Sans', sans-serif;
    font-size: 1.8rem; color: var(--warm-gray); opacity: .4;
  }
  .adm-stat-trend {
    font-family: 'DM Sans', sans-serif;
    font-size: .76rem; font-weight: 300;
    color: var(--warm-gray); margin-bottom: .9rem;
    line-height: 1.5;
  }
  .adm-stat-cta {
    font-family: 'DM Sans', sans-serif;
    font-size: .7rem; font-weight: 500;
    letter-spacing: .08em; text-transform: uppercase;
    color: var(--burgundy);
    border-bottom: 1px solid transparent;
    display: inline-block;
    transition: border-color .2s, color .2s;
    padding-bottom: .1rem;
  }
  .adm-stat-card:hover .adm-stat-cta {
    border-color: var(--burgundy);
    color: var(--burgundy-lt);
  }

  /* ── section label ── */
  .adm-section-label {
    font-family: 'DM Sans', sans-serif;
    font-size: .7rem; font-weight: 500;
    letter-spacing: .18em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 1.2rem;
    display: flex; align-items: center; gap: .5rem;
  }
  .adm-section-label::before {
    content: '';
    display: inline-block; width: 18px; height: 1px;
    background: var(--gold);
  }

  /* ── quick action cards ── */
  .adm-quick-grid {
    display: grid; grid-template-columns: repeat(4,1fr);
    gap: 1rem;
  }
  .adm-quick-card {
    background: var(--card-bg);
    border: 1px solid rgba(107,26,42,.08);
    border-radius: 14px; padding: 1.4rem 1.3rem;
    cursor: pointer; position: relative;
    transition: transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s, border-color .3s;
  }
  .adm-quick-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 14px 40px rgba(107,26,42,.1);
    border-color: rgba(107,26,42,.18);
  }
  .adm-quick-label {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem; font-weight: 600;
    color: var(--charcoal); margin-bottom: .35rem;
    transition: color .25s;
  }
  .adm-quick-card:hover .adm-quick-label { color: var(--burgundy); }
  .adm-quick-desc {
    font-family: 'DM Sans', sans-serif;
    font-size: .76rem; font-weight: 300;
    color: var(--warm-gray); line-height: 1.55;
    margin-bottom: 1rem;
  }
  .adm-quick-arrow {
    font-family: 'DM Sans', sans-serif;
    font-size: .75rem; font-weight: 500;
    color: var(--gold); opacity: 0;
    transform: translateX(-6px);
    transition: opacity .25s, transform .25s;
  }
  .adm-quick-card:hover .adm-quick-arrow { opacity: 1; transform: translateX(0); }

  /* responsive */
  @media (max-width: 900px) {
    .adm-stat-grid  { grid-template-columns: 1fr 1fr; }
    .adm-quick-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 560px) {
    .adm-stat-grid  { grid-template-columns: 1fr; }
    .adm-quick-grid { grid-template-columns: 1fr; }
    .adm-topbar-inner { flex-direction: column; align-items: flex-start; }
  }
`;