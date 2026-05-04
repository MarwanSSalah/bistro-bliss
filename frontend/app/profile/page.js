"use client";

import Footer from "@/components/Footer";
import Input from "@/components/Input";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001/api";

export default function ProfilePage() {
  const [user,      setUser]      = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) { setIsLoading(false); setUser(null); return; }
      try {
        const res = await fetch(`${API_URL}/me`, {
          headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        });
        if (!res.ok) { localStorage.removeItem("token"); setUser(null); return; }
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  /* ── Loading ── */
  if (isLoading) {
    return (
      <>
        <style>{css}</style>
        <main className="pf-centered pf-full">
          <div className="pf-spinner-wrap">
            <div className="pf-spinner" />
            <p className="pf-spinner-label">Loading your profile…</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  /* ── Not logged in ── */
  if (!user) {
    return (
      <>
        <style>{css}</style>
        <main className="pf-centered pf-full" style={{ background: "var(--charcoal)" }}>
          <div className="pf-access-card">
            <div className="pf-access-icon">🔐</div>
            <h1 className="pf-access-title">Access Required</h1>
            <p className="pf-access-sub">
              Please sign in to view your profile and manage your account.
            </p>
            <div className="pf-access-btns">
              <Link href="/login"    className="pf-btn-gold">Sign In →</Link>
              <Link href="/register" className="pf-btn-ghost">Create Account</Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  /* ── Profile ── */
  const initials = user.name
    ? user.name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase()
    : "HT";
  const isAdmin = user.role === "ADMIN";

  return (
    <>
      <style>{css}</style>

      {/* ── HERO BANNER ── */}
      <section className="pf-hero">
        <div className="pf-hero-pattern" />
        <div className="pf-hero-orb" />
        <div className="pf-hero-inner">
          <div className="pf-avatar">{initials}</div>
          <div className="pf-hero-text">
            <div className="pf-eyebrow">My Account</div>
            <h1 className="pf-hero-title">
              {user.name ?? "Welcome"}<em>.</em>
            </h1>
            <div className="pf-role-badge" data-admin={isAdmin}>
              {isAdmin ? "Administrator" : "Member"}
            </div>
          </div>
        </div>
      </section>

      {/* ── BODY ── */}
      <main className="pf-body">
        <div className="pf-grid">

          {/* ── Account info card ── */}
          <div className="pf-card pf-info-card">
            <div className="pf-card-header">
              <div className="pf-eyebrow pf-eyebrow-dark">Account Details</div>
              <h2 className="pf-card-title">Your <em>Information</em></h2>
            </div>

            <div className="pf-fields">
              <div className="pf-field">
                <div className="pf-field-label">Full Name</div>
                <div className="pf-field-value">{user.name ?? "—"}</div>
              </div>
              <div className="pf-field-divider" />
              <div className="pf-field">
                <div className="pf-field-label">Email Address</div>
                <div className="pf-field-value">{user.email}</div>
              </div>
              <div className="pf-field-divider" />
              <div className="pf-field">
                <div className="pf-field-label">Account Type</div>
                <div className="pf-field-value">
                  {isAdmin ? "Administrator" : "Customer"}
                </div>
              </div>
              <div className="pf-field-divider" />
              <div className="pf-field">
                <div className="pf-field-label">Member Since</div>
                <div className="pf-field-value">
                  {user.created_at
                    ? new Date(user.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
                    : "—"}
                </div>
              </div>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="pf-sidebar">

            {/* quick actions */}
            <div className="pf-card">
              <div className="pf-eyebrow pf-eyebrow-dark">Navigate</div>
              <h3 className="pf-card-title" style={{ fontSize: "1.3rem" }}>
                Quick <em>Actions</em>
              </h3>
              <div className="pf-actions">
                {[
                  { href: "/bookings",     label: "View My Bookings",  icon: "📅" },
                  { href: "/book-a-table", label: "Reserve a Table",   icon: "🍽" },
                  { href: "/menu",         label: "Browse the Menu",   icon: "📖" },
                ].map(({ href, label, icon }) => (
                  <Link key={href} href={href} className="pf-action-item">
                    <span className="pf-action-icon">{icon}</span>
                    <span className="pf-action-label">{label}</span>
                    <span className="pf-action-arrow">→</span>
                  </Link>
                ))}

                {isAdmin && (
                  <Link href="/admin" className="pf-action-item pf-action-admin">
                    <span className="pf-action-icon">⚙️</span>
                    <span className="pf-action-label">Admin Dashboard</span>
                    <span className="pf-action-arrow">→</span>
                  </Link>
                )}
              </div>
            </div>

            {/* logout */}
            <div className="pf-card pf-logout-card">
              <p className="pf-logout-text">
                Done for now? Sign out of your account securely.
              </p>
              <button
                className="pf-btn-logout"
                onClick={() => {
                  localStorage.removeItem("token");
                  router.push("/login");
                }}
              >
                Sign Out
              </button>
            </div>

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
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

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
  .pf-full { min-height: 100vh; background: var(--charcoal); }
  .pf-centered { display: flex; align-items: center; justify-content: center; }

  /* spinner */
  .pf-spinner-wrap { text-align: center; }
  .pf-spinner {
    width: 48px; height: 48px; border-radius: 50%;
    border: 2px solid rgba(201,150,90,.15);
    border-top-color: var(--gold);
    animation: pfSpin .9s linear infinite;
    margin: 0 auto 1rem;
  }
  @keyframes pfSpin { to { transform: rotate(360deg); } }
  .pf-spinner-label {
    font-family: 'DM Sans', sans-serif;
    font-size: .8rem; font-weight: 300;
    letter-spacing: .1em; text-transform: uppercase;
    color: rgba(250,247,242,.35);
  }

  /* access denied */
  .pf-access-card {
    text-align: center; padding: 3rem 2rem;
    background: rgba(250,247,242,.04);
    border: 1px solid rgba(250,247,242,.08);
    border-radius: 20px; max-width: 400px; width: 100%;
  }
  .pf-access-icon { font-size: 2.5rem; margin-bottom: 1rem; }
  .pf-access-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem; font-weight: 600;
    color: #FAF7F2; margin-bottom: .5rem;
  }
  .pf-access-sub {
    font-family: 'DM Sans', sans-serif;
    font-size: .85rem; font-weight: 300;
    color: rgba(250,247,242,.4); line-height: 1.7; margin-bottom: 2rem;
  }
  .pf-access-btns { display: flex; flex-direction: column; gap: .75rem; }
  .pf-btn-gold {
    display: flex; align-items: center; justify-content: center;
    background: var(--gold); color: var(--charcoal);
    font-family: 'DM Sans', sans-serif; font-size: .82rem; font-weight: 500;
    letter-spacing: .06em; text-transform: uppercase;
    padding: .75rem 1.5rem; border-radius: 2rem; text-decoration: none;
    transition: background .25s, transform .2s;
    box-shadow: 0 4px 16px rgba(201,150,90,.3);
  }
  .pf-btn-gold:hover { background: var(--gold-lt); transform: translateY(-2px); }
  .pf-btn-ghost {
    display: flex; align-items: center; justify-content: center;
    background: transparent; color: rgba(250,247,242,.6);
    border: 1px solid rgba(250,247,242,.18);
    font-family: 'DM Sans', sans-serif; font-size: .82rem; font-weight: 400;
    padding: .75rem 1.5rem; border-radius: 2rem; text-decoration: none;
    transition: border-color .25s, color .25s;
  }
  .pf-btn-ghost:hover { border-color: var(--gold); color: var(--gold); }

  /* ── hero ── */
  .pf-hero {
    background: var(--charcoal);
    padding: 8rem 1.5rem 4rem;
    position: relative; overflow: hidden;
  }
  .pf-hero::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, #1C1612 0%, #3D1A12 50%, #6B1A2A 100%);
    opacity: .96;
  }
  .pf-hero-pattern {
    position: absolute; inset: 0; pointer-events: none;
    opacity: .032;
    background-image: repeating-linear-gradient(45deg,#C9965A 0,#C9965A 1px,transparent 0,transparent 50%);
    background-size: 20px 20px;
  }
  .pf-hero-orb {
    position: absolute;
    width: 460px; height: 460px; border-radius: 50%;
    background: radial-gradient(circle,rgba(201,150,90,.13) 0%,transparent 70%);
    top: -80px; right: -60px; pointer-events: none;
  }
  .pf-hero-inner {
    position: relative; z-index: 1;
    max-width: 1100px; margin: 0 auto;
    display: flex; align-items: center; gap: 2rem;
  }

  /* avatar circle */
  .pf-avatar {
    width: 88px; height: 88px; border-radius: 50%; flex-shrink: 0;
    background: linear-gradient(135deg, var(--gold), var(--burgundy-lt));
    border: 3px solid rgba(201,150,90,.35);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.2rem; font-weight: 600; color: #FAF7F2;
    box-shadow: 0 8px 28px rgba(201,150,90,.25);
  }
  .pf-hero-text { flex: 1; }
  .pf-eyebrow {
    display: inline-flex; align-items: center; gap: .5rem;
    font-family: 'DM Sans', sans-serif;
    font-size: .7rem; font-weight: 500;
    letter-spacing: .2em; text-transform: uppercase;
    color: var(--gold); margin-bottom: .45rem;
  }
  .pf-eyebrow::before {
    content: ''; display: inline-block;
    width: 18px; height: 1px; background: var(--gold);
  }
  .pf-hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 4vw, 3.2rem);
    font-weight: 400; line-height: 1.05; color: #FAF7F2; margin-bottom: .6rem;
  }
  .pf-hero-title em { font-style: normal; color: var(--gold-lt); }
  .pf-role-badge {
    display: inline-block;
    font-family: 'DM Sans', sans-serif;
    font-size: .7rem; font-weight: 500;
    letter-spacing: .12em; text-transform: uppercase;
    background: rgba(201,150,90,.12);
    border: 1px solid rgba(201,150,90,.25);
    color: var(--gold); padding: .28rem .85rem; border-radius: 2rem;
  }
  .pf-role-badge[data-admin="true"] {
    background: rgba(107,26,42,.2);
    border-color: rgba(107,26,42,.4);
    color: var(--gold-lt);
  }

  /* ── body ── */
  .pf-body {
    background: var(--cream2);
    padding: 3.5rem 1.5rem 5rem;
  }
  .pf-grid {
    max-width: 1100px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 340px;
    gap: 1.5rem; align-items: start;
  }

  /* ── cards ── */
  .pf-card {
    background: var(--card-bg);
    border: 1px solid rgba(107,26,42,.08);
    border-radius: 18px; padding: 2rem 2.2rem;
  }
  .pf-card-header { margin-bottom: 1.8rem; }
  .pf-eyebrow-dark { color: var(--gold); }
  .pf-eyebrow-dark::before { background: var(--gold); }
  .pf-card-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.65rem; font-weight: 400;
    color: var(--charcoal); line-height: 1.1; margin: 0;
  }
  .pf-card-title em { font-style: italic; color: var(--burgundy); }

  /* info fields */
  .pf-fields { display: flex; flex-direction: column; }
  .pf-field { padding: 1rem 0; }
  .pf-field-label {
    font-family: 'DM Sans', sans-serif;
    font-size: .7rem; font-weight: 500;
    letter-spacing: .12em; text-transform: uppercase;
    color: var(--warm-gray); margin-bottom: .3rem;
  }
  .pf-field-value {
    font-family: 'DM Sans', sans-serif;
    font-size: .95rem; font-weight: 400; color: var(--charcoal);
  }
  .pf-field-divider {
    height: 1px; background: rgba(107,26,42,.06);
  }

  /* sidebar */
  .pf-sidebar { display: flex; flex-direction: column; gap: 1.2rem; }

  /* quick actions */
  .pf-actions { display: flex; flex-direction: column; gap: .6rem; margin-top: 1.2rem; }
  .pf-action-item {
    display: flex; align-items: center; gap: .85rem;
    padding: .85rem 1rem; border-radius: 12px;
    background: var(--cream2);
    border: 1px solid rgba(107,26,42,.07);
    text-decoration: none;
    transition: background .25s, border-color .25s, transform .25s;
    cursor: pointer;
  }
  .pf-action-item:hover {
    background: rgba(201,150,90,.07);
    border-color: rgba(201,150,90,.22);
    transform: translateX(3px);
  }
  .pf-action-icon {
    width: 34px; height: 34px; border-radius: 9px; flex-shrink: 0;
    background: rgba(107,26,42,.06);
    border: 1px solid rgba(107,26,42,.1);
    display: flex; align-items: center; justify-content: center;
    font-size: .95rem;
    transition: transform .25s;
  }
  .pf-action-item:hover .pf-action-icon { transform: scale(1.1) rotate(-4deg); }
  .pf-action-label {
    flex: 1; font-family: 'DM Sans', sans-serif;
    font-size: .84rem; font-weight: 400; color: var(--charcoal);
  }
  .pf-action-arrow {
    font-family: 'DM Sans', sans-serif;
    font-size: .78rem; color: var(--warm-gray);
    opacity: 0; transform: translateX(-4px);
    transition: opacity .2s, transform .2s;
  }
  .pf-action-item:hover .pf-action-arrow { opacity: 1; transform: translateX(0); }

  /* admin action variant */
  .pf-action-admin {
    background: rgba(107,26,42,.06);
    border-color: rgba(107,26,42,.14);
  }
  .pf-action-admin .pf-action-label { color: var(--burgundy); font-weight: 500; }
  .pf-action-admin:hover {
    background: rgba(107,26,42,.1);
    border-color: rgba(107,26,42,.25);
  }

  /* logout card */
  .pf-logout-card { text-align: center; padding: 1.6rem; }
  .pf-logout-text {
    font-family: 'DM Sans', sans-serif;
    font-size: .8rem; font-weight: 300;
    color: var(--warm-gray); line-height: 1.6; margin-bottom: 1rem;
  }
  .pf-btn-logout {
    width: 100%; padding: .65rem 1rem;
    background: transparent;
    border: 1px solid rgba(107,26,42,.2);
    border-radius: 2rem; cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    font-size: .78rem; font-weight: 500;
    letter-spacing: .07em; text-transform: uppercase;
    color: var(--burgundy);
    transition: background .25s, border-color .25s, transform .2s;
  }
  .pf-btn-logout:hover {
    background: rgba(107,26,42,.06);
    border-color: var(--burgundy);
    transform: translateY(-1px);
  }

  @media (max-width: 860px) {
    .pf-grid { grid-template-columns: 1fr; }
    .pf-hero-inner { flex-direction: column; align-items: flex-start; }
    .pf-avatar { width: 68px; height: 68px; font-size: 1.6rem; }
    .pf-hero { padding: 7rem 1.5rem 3rem; }
  }
`;