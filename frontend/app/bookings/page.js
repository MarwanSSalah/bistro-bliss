"use client";

import Link from "next/link";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001/api";

/* status → palette */
const STATUS = {
  PENDING:   { label: "Pending",   bg: "rgba(201,150,90,.12)",  color: "#8B5E2A", border: "rgba(201,150,90,.3)"  },
  CONFIRMED: { label: "Confirmed", bg: "rgba(29,158,117,.09)",  color: "#1a7a5e", border: "rgba(29,158,117,.28)" },
  CANCELLED: { label: "Cancelled", bg: "rgba(107,26,42,.08)",   color: "#6B1A2A", border: "rgba(107,26,42,.22)"  },
  COMPLETED: { label: "Completed", bg: "rgba(28,22,18,.06)",    color: "#8C7B6B", border: "rgba(28,22,18,.15)"   },
};
const getStatus = (s) => STATUS[s?.toUpperCase()] ?? { label: s, bg: "rgba(140,123,107,.1)", color: "#8C7B6B", border: "rgba(140,123,107,.25)" };

/* format date nicely */
const fmtDate = (dt) => {
  const d = new Date(dt);
  return {
    date: d.toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric", year: "numeric" }),
    time: d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
  };
};

export default function MyBookingsPage() {
  const [items,   setItems]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [unauth,  setUnauth]  = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");
      if (!token) { setUnauth(true); setLoading(false); return; }
      try {
        const res = await fetch(`${API_URL}/bookings`, {
          headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        });
        if (res.status === 401) { localStorage.removeItem("token"); setUnauth(true); return; }
        const data = await res.json();
        setItems(Array.isArray(data.data) ? data.data : data);
      } catch (err) {
        console.error("Failed to load bookings", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  /* ── Loading ── */
  if (loading) {
    return (
      <>
        <style>{css}</style>
        <main className="mb-centered mb-full">
          <div className="mb-spinner-wrap">
            <div className="mb-spinner" />
            <p className="mb-spinner-label">Loading your bookings…</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  /* ── Not logged in ── */
  if (unauth) {
    return (
      <>
        <style>{css}</style>
        <main className="mb-centered mb-full">
          <div className="mb-gate">
            <div className="mb-gate-icon">🔒</div>
            <h1 className="mb-gate-title">Sign In Required</h1>
            <p className="mb-gate-sub">Please log in to view your reservations.</p>
            <Link href="/login" className="mb-btn-gold">Sign In →</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  /* ── Main ── */
  return (
    <>
      <style>{css}</style>

      {/* hero */}
      <section className="mb-hero">
        <div className="mb-hero-pattern" />
        <div className="mb-hero-orb" />
        <div className="mb-hero-inner">
          <div className="mb-eyebrow">Your Account</div>
          <h1 className="mb-hero-title">My <em>Bookings</em></h1>
          <p className="mb-hero-sub">
            {items.length > 0
              ? `You have ${items.length} reservation${items.length > 1 ? "s" : ""} on record.`
              : "You have no reservations yet."}
          </p>
        </div>
      </section>

      <main className="mb-body">

        {/* empty state */}
        {items.length === 0 && (
          <div className="mb-empty">
            <div className="mb-empty-icon">🍽</div>
            <h2 className="mb-empty-title">No bookings yet</h2>
            <p className="mb-empty-sub">
              When you make a reservation it will appear here.
            </p>
            <Link href="/book-a-table" className="mb-btn-gold">
              Book a Table →
            </Link>
          </div>
        )}

        {/* booking list */}
        {items.length > 0 && (
          <div className="mb-list">
            {items.map((b) => {
              const { date, time } = fmtDate(b.date_time);
              const st = getStatus(b.status);
              return (
                <div key={b.id} className="mb-card">

                  {/* left: date block */}
                  <div className="mb-card-date-block">
                    <div className="mb-card-time">{time}</div>
                    <div className="mb-card-date">{date}</div>
                  </div>

                  {/* divider */}
                  <div className="mb-card-divider" />

                  {/* centre: details */}
                  <div className="mb-card-details">
                    <div className="mb-card-detail-row">
                      <span className="mb-detail-icon">👥</span>
                      <span className="mb-detail-text">
                        <strong>{b.guests}</strong> {b.guests === 1 ? "guest" : "guests"}
                      </span>
                    </div>
                    {b.notes && (
                      <div className="mb-card-detail-row">
                        <span className="mb-detail-icon">📝</span>
                        <span className="mb-detail-text mb-detail-notes">{b.notes}</span>
                      </div>
                    )}
                  </div>

                  {/* right: status pill */}
                  <div className="mb-card-status-wrap">
                    <div
                      className="mb-status-pill"
                      style={{ background: st.bg, color: st.color, borderColor: st.border }}
                    >
                      {st.label}
                    </div>
                    <div className="mb-booking-id">#{b.id}</div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* CTA at bottom */}
        {items.length > 0 && (
          <div className="mb-cta-row">
            <Link href="/book-a-table" className="mb-btn-gold">
              Make Another Booking →
            </Link>
          </div>
        )}

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

  /* utility states */
  .mb-full { min-height: 100vh; background: var(--charcoal); }
  .mb-centered { display: flex; align-items: center; justify-content: center; }

  /* spinner */
  .mb-spinner-wrap { text-align: center; }
  .mb-spinner {
    width: 48px; height: 48px; border-radius: 50%;
    border: 2px solid rgba(201,150,90,.15);
    border-top-color: var(--gold);
    animation: mbSpin .9s linear infinite;
    margin: 0 auto 1rem;
  }
  @keyframes mbSpin { to { transform: rotate(360deg); } }
  .mb-spinner-label {
    font-family: 'DM Sans', sans-serif;
    font-size: .78rem; font-weight: 300;
    letter-spacing: .1em; text-transform: uppercase;
    color: rgba(250,247,242,.35);
  }

  /* gate */
  .mb-gate {
    text-align: center; padding: 3rem 2rem;
    background: rgba(250,247,242,.03);
    border: 1px solid rgba(250,247,242,.08);
    border-radius: 20px; max-width: 380px; width: 100%;
    display: flex; flex-direction: column; align-items: center; gap: .6rem;
  }
  .mb-gate-icon { font-size: 2.5rem; }
  .mb-gate-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem; font-weight: 600; color: #FAF7F2;
  }
  .mb-gate-sub {
    font-family: 'DM Sans', sans-serif;
    font-size: .85rem; font-weight: 300;
    color: rgba(250,247,242,.4); line-height: 1.65;
    margin-bottom: .8rem;
  }

  /* gold button */
  .mb-btn-gold {
    display: inline-flex; align-items: center; justify-content: center;
    background: var(--gold); color: var(--charcoal);
    font-family: 'DM Sans', sans-serif; font-size: .8rem; font-weight: 500;
    letter-spacing: .06em; text-transform: uppercase;
    padding: .7rem 1.8rem; border-radius: 2rem; text-decoration: none;
    transition: background .25s, transform .2s, box-shadow .25s;
    box-shadow: 0 4px 16px rgba(201,150,90,.28);
  }
  .mb-btn-gold:hover { background: var(--gold-lt); transform: translateY(-1px); }

  /* hero */
  .mb-hero {
    background: var(--charcoal);
    padding: 7rem 1.5rem 3.5rem;
    position: relative; overflow: hidden;
  }
  .mb-hero::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, #1C1612 0%, #3D1A12 50%, #6B1A2A 100%);
    opacity: .96;
  }
  .mb-hero-pattern {
    position: absolute; inset: 0; opacity: .032;
    background-image: repeating-linear-gradient(45deg,#C9965A 0,#C9965A 1px,transparent 0,transparent 50%);
    background-size: 20px 20px; pointer-events: none;
  }
  .mb-hero-orb {
    position: absolute; width: 420px; height: 420px; border-radius: 50%;
    background: radial-gradient(circle,rgba(201,150,90,.12) 0%,transparent 70%);
    top: -70px; right: -50px; pointer-events: none;
  }
  .mb-hero-inner {
    position: relative; z-index: 1;
    max-width: 1100px; margin: 0 auto;
  }
  .mb-eyebrow {
    display: inline-flex; align-items: center; gap: .5rem;
    font-family: 'DM Sans', sans-serif;
    font-size: .68rem; font-weight: 500;
    letter-spacing: .2em; text-transform: uppercase;
    color: var(--gold); margin-bottom: .5rem;
  }
  .mb-eyebrow::before {
    content: ''; display: inline-block;
    width: 16px; height: 1px; background: var(--gold);
  }
  .mb-hero-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.2rem, 4vw, 3.2rem);
    font-weight: 300; line-height: 1.1; color: #FAF7F2; margin-bottom: .5rem;
  }
  .mb-hero-title em { font-style: italic; color: var(--gold-lt); }
  .mb-hero-sub {
    font-family: 'DM Sans', sans-serif;
    font-size: .9rem; font-weight: 300;
    color: rgba(250,247,242,.45); line-height: 1.7;
  }

  /* body */
  .mb-body {
    background: var(--cream2);
    padding: 3.5rem 1.5rem 5rem;
    max-width: 900px; margin: 0 auto;
  }

  /* empty state */
  .mb-empty {
    text-align: center; padding: 4rem 2rem;
    background: var(--card-bg);
    border: 1px solid rgba(107,26,42,.08);
    border-radius: 20px;
    display: flex; flex-direction: column; align-items: center; gap: .75rem;
  }
  .mb-empty-icon { font-size: 2.8rem; }
  .mb-empty-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem; font-weight: 600; color: var(--charcoal);
  }
  .mb-empty-sub {
    font-family: 'DM Sans', sans-serif;
    font-size: .84rem; font-weight: 300; color: var(--warm-gray);
    line-height: 1.65; max-width: 320px; margin-bottom: .5rem;
  }

  /* booking list */
  .mb-list { display: flex; flex-direction: column; gap: 1rem; }

  /* booking card */
  .mb-card {
    background: var(--card-bg);
    border: 1px solid rgba(107,26,42,.08);
    border-radius: 16px;
    display: flex; align-items: center; gap: 0;
    overflow: hidden;
    transition: transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s, border-color .3s;
  }
  .mb-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 14px 40px rgba(107,26,42,.1);
    border-color: rgba(107,26,42,.16);
  }

  /* date block */
  .mb-card-date-block {
    background: var(--charcoal);
    padding: 1.4rem 1.6rem;
    flex-shrink: 0; min-width: 160px;
    text-align: center;
    position: relative;
    align-self: stretch;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
  }
  .mb-card-date-block::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg,#1C1612,#3D1A12);
    opacity: .95;
  }
  .mb-card-time {
    position: relative; z-index: 1;
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem; font-weight: 600;
    color: var(--gold-lt); line-height: 1;
    margin-bottom: .3rem;
  }
  .mb-card-date {
    position: relative; z-index: 1;
    font-family: 'DM Sans', sans-serif;
    font-size: .7rem; font-weight: 300;
    color: rgba(250,247,242,.5); line-height: 1.4;
  }

  /* divider */
  .mb-card-divider {
    width: 1px; align-self: stretch;
    background: rgba(107,26,42,.08); flex-shrink: 0;
  }

  /* details */
  .mb-card-details {
    flex: 1; padding: 1.2rem 1.5rem;
    display: flex; flex-direction: column; gap: .5rem;
  }
  .mb-card-detail-row {
    display: flex; align-items: flex-start; gap: .65rem;
  }
  .mb-detail-icon { font-size: .9rem; flex-shrink: 0; margin-top: .05rem; }
  .mb-detail-text {
    font-family: 'DM Sans', sans-serif;
    font-size: .84rem; font-weight: 300; color: var(--charcoal); line-height: 1.5;
  }
  .mb-detail-text strong { font-weight: 500; }
  .mb-detail-notes { color: var(--warm-gray); font-style: italic; }

  /* status */
  .mb-card-status-wrap {
    padding: 1.2rem 1.4rem;
    display: flex; flex-direction: column;
    align-items: flex-end; justify-content: center;
    gap: .5rem; flex-shrink: 0;
  }
  .mb-status-pill {
    font-family: 'DM Sans', sans-serif;
    font-size: .68rem; font-weight: 500;
    letter-spacing: .1em; text-transform: uppercase;
    padding: .25rem .8rem; border-radius: 2rem;
    border: 1px solid;
    white-space: nowrap;
  }
  .mb-booking-id {
    font-family: 'DM Sans', sans-serif;
    font-size: .68rem; color: rgba(140,123,107,.45);
    letter-spacing: .05em;
  }

  /* bottom cta */
  .mb-cta-row {
    display: flex; justify-content: center;
    margin-top: 2.5rem;
  }

  @media (max-width: 640px) {
    .mb-card { flex-direction: column; align-items: stretch; }
    .mb-card-date-block { min-width: unset; flex-direction: row; gap: 1rem; padding: 1rem 1.4rem; }
    .mb-card-divider { width: 100%; height: 1px; }
    .mb-card-status-wrap { flex-direction: row; align-items: center; padding: .8rem 1.4rem; border-top: 1px solid rgba(107,26,42,.06); }
  }
`;