"use client";

import Footer from "@/components/Footer";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user,      setUser]      = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) { setIsLoading(false); setUser(null); return; }
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001/api";
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
        <main className="pf-centered pf-full">
          <div className="pf-gate">
            <div className="pf-gate-icon">🔒</div>
            <h1 className="pf-gate-title">Members Only</h1>
            <p className="pf-gate-sub">
              Please sign in to view your profile and manage your account.
            </p>
            <div className="pf-gate-actions">
              <Link href="/login"    className="pf-btn-gold">Sign In →</Link>
              <Link href="/register" className="pf-btn-ghost">Create Account</Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const initials = user.name
    ? user.name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase()
    : "HT";
  const isAdmin = user.role === "ADMIN";

  /* ── Profile ── */
  return (
    <>
      <style>{css}</style>

      {/* hero banner */}
      <section className="pf-hero">
        <div className="pf-hero-pattern" />
        <div className="pf-hero-orb" />
        <div className="pf-hero-inner">
          <div className="pf-avatar">{initials}</div>
          <div>
            <div className="pf-eyebrow">My Account</div>
            <h1 className="pf-hero-title">
              Welcome back, <em>{user.name?.split(" ")[0]}</em>
            </h1>
            <div
              className="pf-role-pill"
              style={{
                background:   isAdmin ? "rgba(201,150,90,.15)"    : "rgba(250,247,242,.08)",
                borderColor:  isAdmin ? "rgba(201,150,90,.35)"    : "rgba(250,247,242,.15)",
                color:        isAdmin ? "var(--gold-lt)"           : "rgba(250,247,242,.55)",
              }}
            >
              {isAdmin ? "★ Administrator" : "Member"}
            </div>
          </div>
        </div>
      </section>

      {/* content */}
      <main className="pf-body">
        <div className="pf-grid">

          {/* account info */}
          <div className="pf-card pf-info-card">
            <div className="pf-card-header">
              <div className="pf-eyebrow-dark">Account Details</div>
              <h2 className="pf-card-title">Your <em>Information</em></h2>
            </div>
            <div className="pf-fields">
              {[
                { label: "Full Name",     value: user.name ?? "—" },
                { label: "Email Address", value: user.email },
                { label: "Account Type",  value: isAdmin ? "Administrator" : "Customer", admin: isAdmin },
                {
                  label: "Member Since",
                  value: user.created_at
                    ? new Date(user.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long" })
                    : "Happy Tummy Member",
                },
              ].map(({ label, value, admin }) => (
                <div key={label} className="pf-field">
                  <div className="pf-field-label">{label}</div>
                  <div className="pf-field-value">
                    {value}
                    {admin && <span className="pf-admin-tag">Admin</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* sidebar */}
          <div className="pf-sidebar">
            <div className="pf-card">
              <div className="pf-eyebrow-dark" style={{ marginBottom: ".9rem" }}>Quick Actions</div>
              <div className="pf-actions">
                {[
                  { href: "/bookings",     label: "View My Bookings", icon: "📅" },
                  { href: "/book-a-table", label: "Book a Table",      icon: "🍽"  },
                  { href: "/menu",         label: "Browse the Menu",   icon: "📋" },
                ].map(({ href, label, icon }) => (
                  <Link key={href} href={href} className="pf-action-btn">
                    <span className="pf-action-icon">{icon}</span>
                    <span className="pf-action-label">{label}</span>
                    <span className="pf-action-arrow">→</span>
                  </Link>
                ))}

                {isAdmin && (
                  <Link href="/admin" className="pf-action-btn pf-action-admin">
                    <span className="pf-action-icon">⚙️</span>
                    <span className="pf-action-label">Admin Dashboard</span>
                    <span className="pf-action-arrow">→</span>
                  </Link>
                )}
              </div>
            </div>

            <button
              className="pf-logout-btn"
              onClick={() => { localStorage.removeItem("token"); router.push("/login"); }}
            >
              Sign Out
            </button>
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

  /* full-screen utility states */
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
    font-size: .78rem; font-weight: 300;
    letter-spacing: .1em; text-transform: uppercase;
    color: rgba(250,247,242,.35);
  }

  /* gate */
  .pf-gate {
    text-align: center; padding: 3rem 2rem;
    background: rgba(250,247,242,.03);
    border: 1px solid rgba(250,247,242,.08);
    border-radius: 20px; max-width: 400px; width: 100%;
  }
  .pf-gate-icon { font-size: 2.5rem; margin-bottom: 1rem; }
  .pf-gate-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem; font-weight: 600; color: #FAF7F2; margin-bottom: .5rem;
  }
  .pf-gate-sub {
    font-family: 'DM Sans', sans-serif;
    font-size: .85rem; font-weight: 300;
    color: rgba(250,247,242,.4); line-height: 1.65; margin-bottom: 1.8rem;
  }
  .pf-gate-actions { display: flex; flex-direction: column; gap: .75rem; }
  .pf-btn-gold {
    display: flex; align-items: center; justify-content: center;
    background: var(--gold); color: var(--charcoal);
    font-family: 'DM Sans', sans-serif; font-size: .82rem; font-weight: 500;
    letter-spacing: .06em; text-transform: uppercase;
    padding: .75rem 1.5rem; border-radius: 2rem; text-decoration: none;
    transition: background .25s, transform .2s;
    box-shadow: 0 4px 18px rgba(201,150,90,.3);
  }
  .pf-btn-gold:hover { background: var(--gold-lt); transform: translateY(-1px); }
  .pf-btn-ghost {
    display: flex; align-items: center; justify-content: center;
    background: transparent; color: rgba(250,247,242,.6);
    border: 1px solid rgba(250,247,242,.15);
    font-family: 'DM Sans', sans-serif; font-size: .82rem; font-weight: 400;
    padding: .75rem 1.5rem; border-radius: 2rem; text-decoration: none;
    transition: border-color .25s, color .25s;
  }
  .pf-btn-ghost:hover { border-color: rgba(250,247,242,.4); color: #FAF7F2; }

  /* hero */
  .pf-hero {
    background: var(--charcoal);
    padding: 7rem 1.5rem 3.5rem;
    position: relative; overflow: hidden;
  }
  .pf-hero::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, #1C1612 0%, #3D1A12 50%, #6B1A2A 100%);
    opacity: .96;
  }
  .pf-hero-pattern {
    position: absolute; inset: 0; opacity: .032;
    background-image: repeating-linear-gradient(45deg,#C9965A 0,#C9965A 1px,transparent 0,transparent 50%);
    background-size: 20px 20px; pointer-events: none;
  }
  .pf-hero-orb {
    position: absolute; width: 450px; height: 450px; border-radius: 50%;
    background: radial-gradient(circle,rgba(201,150,90,.12) 0%,transparent 70%);
    top: -80px; right: -60px; pointer-events: none;
  }
  .pf-hero-inner {
    position: relative; z-index: 1;
    max-width: 1100px; margin: 0 auto;
    display: flex; align-items: center; gap: 2rem; flex-wrap: wrap;
  }
  .pf-avatar {
    width: 80px; height: 80px; border-radius: 50%;
    background: linear-gradient(135deg, var(--gold), var(--burgundy-lt));
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem; font-weight: 600; color: #FAF7F2;
    border: 3px solid rgba(201,150,90,.3); flex-shrink: 0;
    box-shadow: 0 8px 28px rgba(0,0,0,.3);
  }
  .pf-eyebrow {
    display: inline-flex; align-items: center; gap: .5rem;
    font-family: 'DM Sans', sans-serif;
    font-size: .68rem; font-weight: 500;
    letter-spacing: .2em; text-transform: uppercase;
    color: var(--gold); margin-bottom: .45rem;
  }
  .pf-eyebrow::before {
    content: ''; display: inline-block; width: 16px; height: 1px; background: var(--gold);
  }
  .pf-hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.8rem, 3.5vw, 2.8rem);
    font-weight: 300; line-height: 1.1; color: #FAF7F2; margin-bottom: .6rem;
  }
  .pf-hero-title em { font-style: italic; color: var(--gold-lt); }
  .pf-role-pill {
    display: inline-flex; align-items: center;
    font-family: 'DM Sans', sans-serif;
    font-size: .7rem; font-weight: 500;
    letter-spacing: .1em; text-transform: uppercase;
    padding: .28rem .85rem; border-radius: 2rem; border: 1px solid;
  }

  /* body */
  .pf-body { background: var(--cream2); padding: 3.5rem 1.5rem 5rem; }
  .pf-grid {
    max-width: 1100px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 320px;
    gap: 1.5rem; align-items: start;
  }

  /* cards */
  .pf-card {
    background: var(--card-bg);
    border: 1px solid rgba(107,26,42,.08);
    border-radius: 18px; padding: 2rem;
  }
  .pf-card-header { margin-bottom: 1.6rem; }
  .pf-eyebrow-dark {
    display: inline-flex; align-items: center; gap: .5rem;
    font-family: 'DM Sans', sans-serif;
    font-size: .68rem; font-weight: 500;
    letter-spacing: .2em; text-transform: uppercase; color: var(--gold);
  }
  .pf-eyebrow-dark::before {
    content: ''; display: inline-block; width: 14px; height: 1px; background: var(--gold);
  }
  .pf-card-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.7rem; font-weight: 400; line-height: 1.1;
    color: var(--charcoal); margin-top: .35rem;
  }
  .pf-card-title em { font-style: italic; color: var(--burgundy); }

  /* fields */
  .pf-fields { display: flex; flex-direction: column; }
  .pf-field {
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.1rem 0; border-bottom: 1px solid rgba(107,26,42,.06); gap: 1rem;
  }
  .pf-field:last-child { border-bottom: none; }
  .pf-field-label {
    font-family: 'DM Sans', sans-serif; font-size: .73rem; font-weight: 500;
    letter-spacing: .07em; text-transform: uppercase;
    color: var(--warm-gray); flex-shrink: 0;
  }
  .pf-field-value {
    font-family: 'DM Sans', sans-serif; font-size: .9rem; font-weight: 400;
    color: var(--charcoal); text-align: right;
    display: flex; align-items: center; gap: .6rem;
  }
  .pf-admin-tag {
    font-size: .65rem; font-weight: 500; letter-spacing: .1em; text-transform: uppercase;
    color: var(--gold); background: rgba(201,150,90,.1);
    border: 1px solid rgba(201,150,90,.22); border-radius: 20px; padding: .15rem .6rem;
  }

  /* sidebar */
  .pf-sidebar { display: flex; flex-direction: column; gap: 1rem; }
  .pf-actions { display: flex; flex-direction: column; gap: .6rem; }
  .pf-action-btn {
    display: flex; align-items: center; gap: .85rem;
    padding: .85rem 1rem;
    background: var(--cream2); border: 1px solid rgba(107,26,42,.07);
    border-radius: 12px; text-decoration: none;
    transition: border-color .25s, background .25s, transform .2s;
  }
  .pf-action-btn:hover {
    border-color: rgba(107,26,42,.18); background: var(--cream);
    transform: translateX(3px);
  }
  .pf-action-icon {
    width: 34px; height: 34px; border-radius: 9px;
    background: linear-gradient(135deg,rgba(107,26,42,.06),rgba(201,150,90,.08));
    border: 1px solid rgba(201,150,90,.18);
    display: flex; align-items: center; justify-content: center;
    font-size: .95rem; flex-shrink: 0;
    transition: transform .25s;
  }
  .pf-action-btn:hover .pf-action-icon { transform: scale(1.1) rotate(-3deg); }
  .pf-action-label {
    font-family: 'DM Sans', sans-serif; font-size: .84rem; font-weight: 400;
    color: var(--charcoal); flex: 1;
  }
  .pf-action-arrow {
    font-size: .78rem; color: var(--gold); opacity: 0;
    transform: translateX(-4px); transition: opacity .2s, transform .2s;
  }
  .pf-action-btn:hover .pf-action-arrow { opacity: 1; transform: none; }
  .pf-action-admin { background: rgba(107,26,42,.04); border-color: rgba(107,26,42,.12); }
  .pf-action-admin .pf-action-label { color: var(--burgundy); font-weight: 500; }
  .pf-action-admin:hover { background: rgba(107,26,42,.08); }

  /* logout */
  .pf-logout-btn {
    width: 100%;
    font-family: 'DM Sans', sans-serif; font-size: .78rem; font-weight: 500;
    letter-spacing: .08em; text-transform: uppercase;
    color: var(--warm-gray); background: var(--card-bg);
    border: 1px solid rgba(107,26,42,.1); border-radius: 12px;
    padding: .85rem; cursor: pointer;
    transition: color .25s, border-color .25s, background .25s;
  }
  .pf-logout-btn:hover {
    color: var(--burgundy); border-color: rgba(107,26,42,.25);
    background: rgba(107,26,42,.04);
  }

  @media (max-width: 860px) {
    .pf-grid { grid-template-columns: 1fr; }
    .pf-avatar { width: 64px; height: 64px; font-size: 1.5rem; }
  }
`;