"use client";

import { useState, useMemo, useEffect } from "react";

export default function BookingForm() {
  const [form, setForm] = useState({
    date: "", time: "", name: "", phone: "", guests: 1, notes: "",
  });
  const [user,        setUser]        = useState(null);
  const [submitting,  setSubmitting]  = useState(false);
  const [submitted,   setSubmitted]   = useState(false);
  const [errorMsg,    setErrorMsg]    = useState("");

  /* ── auth ── */
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await fetch("http://localhost:8001/api/me", {
          headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        });
        if (!res.ok) { localStorage.removeItem("token"); return; }
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error("BookingForm auth check failed", err);
      }
    };
    fetchUser();
  }, []);

  /* ── time slots: 2 PM → 2 AM in 15-min steps ── */
  const timeSlots = useMemo(() => {
    const slots = [];
    const fmt = (h, m) => {
      const p = h >= 12 ? "PM" : "AM";
      const dh = h === 0 ? 12 : h > 12 ? h - 12 : h;
      return `${dh}:${String(m).padStart(2, "0")} ${p}`;
    };
    for (let h = 14; h <= 23; h++)
      for (let m = 0; m < 60; m += 15)
        slots.push({ value: `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`, display: fmt(h, m) });
    for (let h = 0; h <= 2; h++)
      for (let m = 0; m < 60; m += 15) {
        if (h === 2 && m > 0) break;
        slots.push({ value: `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}`, display: fmt(h, m) });
      }
    return slots;
  }, []);

  const getTomorrow = () => {
    const d = new Date(); d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  };
  const validateDate = (d) => {
    const today = new Date(); today.setHours(0,0,0,0);
    const tom = new Date(today); tom.setDate(tom.getDate() + 1);
    const sel = new Date(d); sel.setHours(0,0,0,0);
    return sel >= tom;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    setErrorMsg("");
  };

  /* ── submit ── */
  async function onSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    if (!user)                    { setErrorMsg("Please log in to book a table."); return; }
    if (!validateDate(form.date)) { setErrorMsg("Booking date must be at least tomorrow."); return; }
    if (!form.time)               { setErrorMsg("Please select a booking time."); return; }

    setSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8001/api/bookings", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          date_time: `${form.date} ${form.time}:00`,
          guests: Number(form.guests),
          notes: form.notes,
          status: "PENDING",
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        setErrorMsg(err.message || "Booking failed. Please check your inputs.");
        return;
      }

      setSubmitted(true);
      setForm({ date: "", time: "", name: "", phone: "", guests: 1, notes: "" });
    } catch (err) {
      console.error("Booking error:", err);
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  /* ─────────────────────────────────────────
     SUCCESS STATE
  ───────────────────────────────────────── */
  if (submitted) {
    return (
      <>
        <style>{formCSS}</style>
        <div className="bf-card bf-success-card">
          <div className="bf-success-icon">✓</div>
          <h3 className="bf-success-title">Reservation Confirmed!</h3>
          <p className="bf-success-sub">
            We've received your booking request and will confirm shortly.
            Check your email for details.
          </p>
          <button className="bf-btn-primary" onClick={() => setSubmitted(false)}>
            Make Another Booking →
          </button>
        </div>
      </>
    );
  }

  /* ─────────────────────────────────────────
     MAIN FORM
  ───────────────────────────────────────── */
  return (
    <>
      <style>{formCSS}</style>

      <form onSubmit={onSubmit} className="bf-card">

        {/* header */}
        <div className="bf-form-header">
          <div className="bf-form-eyebrow">Reserve Your Seat</div>
          <h2 className="bf-form-title">Book <em>A Table</em></h2>
          <p className="bf-form-sub">Available daily · 2:00 PM – 2:00 AM</p>
        </div>

        {/* error banner */}
        {errorMsg && (
          <div className="bf-error-banner">
            <span className="bf-error-icon">!</span>
            {errorMsg}
          </div>
        )}

        {/* not logged in notice */}
        {!user && (
          <div className="bf-notice">
            <span className="bf-notice-dot" />
            You must be <a href="/login" className="bf-notice-link">logged in</a> to complete a booking.
          </div>
        )}

        {/* ── Row 1: Date / Time ── */}
        <div className="bf-row">
          <div className="bf-field">
            <label className="bf-label">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              min={getTomorrow()}
              className="bf-input"
              required
            />
          </div>
          <div className="bf-field">
            <label className="bf-label">Time</label>
            <select
              name="time"
              value={form.time}
              onChange={handleChange}
              className="bf-input"
              required
            >
              <option value="">Select a time</option>
              {timeSlots.map(s => (
                <option key={s.value} value={s.value}>{s.display}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Row 2: Name / Phone ── */}
        <div className="bf-row">
          <div className="bf-field">
            <label className="bf-label">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              className="bf-input"
            />
          </div>
          <div className="bf-field">
            <label className="bf-label">Phone</label>
            <input
              type="tel"
              name="phone"
              placeholder="+1 (000) 000-0000"
              value={form.phone}
              onChange={handleChange}
              className="bf-input"
            />
          </div>
        </div>

        {/* ── Row 3: Guests ── */}
        <div className="bf-field">
          <label className="bf-label">Number of Guests</label>
          <input
            type="number"
            name="guests"
            min={1}
            max={20}
            value={form.guests}
            onChange={handleChange}
            placeholder="1"
            className="bf-input"
            required
          />
        </div>

        {/* ── Row 4: Notes ── */}
        <div className="bf-field">
          <label className="bf-label">Special Requests <span className="bf-label-opt">(optional)</span></label>
          <textarea
            name="notes"
            rows={3}
            placeholder="Allergies, occasion, seating preference…"
            value={form.notes}
            onChange={handleChange}
            className="bf-input bf-textarea"
          />
        </div>

        {/* submit */}
        <button
          type="submit"
          className={`bf-btn-primary${submitting ? " bf-btn-loading" : ""}`}
          disabled={submitting}
        >
          {submitting ? (
            <span className="bf-spinner" />
          ) : (
            "Confirm Reservation →"
          )}
        </button>

        <p className="bf-footer-note">
          By booking you agree to our cancellation policy. Confirmations are sent by email.
        </p>
      </form>
    </>
  );
}

/* ─────────────────────────────────────────
   STYLES
───────────────────────────────────────── */
const formCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --cream:       #FAF7F2;
    --cream2:      #F2EDE4;
    --burgundy:    #6B1A2A;
    --burgundy-lt: #8B2A3E;
    --gold:        #C9965A;
    --gold-lt:     #E8B87A;
    --charcoal:    #1C1612;
    --warm-gray:   #8C7B6B;
  }

  /* card shell */
  .bf-card {
    width: 100%;
    background: rgba(250,247,242,.97);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(201,150,90,.18);
    border-radius: 24px;
    padding: 2.5rem 2.2rem;
    box-shadow: 0 32px 80px rgba(28,22,18,.2), 0 2px 0 rgba(201,150,90,.15) inset;
    display: flex; flex-direction: column; gap: 1.1rem;
  }

  /* header */
  .bf-form-header { margin-bottom: .2rem; }
  .bf-form-eyebrow {
    display: inline-flex; align-items: center; gap: .5rem;
    font-family: 'DM Sans', sans-serif;
    font-size: .68rem; font-weight: 500;
    letter-spacing: .2em; text-transform: uppercase;
    color: var(--gold); margin-bottom: .5rem;
  }
  .bf-form-eyebrow::before {
    content: ''; display: inline-block;
    width: 16px; height: 1px; background: var(--gold);
  }
  .bf-form-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.9rem; font-weight: 400; line-height: 1.1;
    color: var(--charcoal); margin: 0 0 .3rem;
  }
  .bf-form-title em { font-style: italic; color: var(--burgundy); }
  .bf-form-sub {
    font-family: 'DM Sans', sans-serif;
    font-size: .75rem; font-weight: 300; color: var(--warm-gray);
  }

  /* error banner */
  .bf-error-banner {
    display: flex; align-items: center; gap: .65rem;
    background: rgba(107,26,42,.06);
    border: 1px solid rgba(107,26,42,.2);
    border-radius: 10px; padding: .75rem 1rem;
    font-family: 'DM Sans', sans-serif;
    font-size: .82rem; color: var(--burgundy);
  }
  .bf-error-icon {
    width: 20px; height: 20px; border-radius: 50%;
    background: var(--burgundy); color: #FAF7F2;
    display: flex; align-items: center; justify-content: center;
    font-size: .72rem; font-weight: 700; flex-shrink: 0;
  }

  /* not-logged-in notice */
  .bf-notice {
    display: flex; align-items: center; gap: .6rem;
    background: rgba(201,150,90,.07);
    border: 1px solid rgba(201,150,90,.2);
    border-radius: 10px; padding: .7rem 1rem;
    font-family: 'DM Sans', sans-serif;
    font-size: .8rem; font-weight: 300; color: var(--warm-gray);
  }
  .bf-notice-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: var(--gold); flex-shrink: 0;
  }
  .bf-notice-link {
    color: var(--burgundy); font-weight: 500; text-decoration: none;
    border-bottom: 1px solid rgba(107,26,42,.3);
    transition: border-color .2s;
  }
  .bf-notice-link:hover { border-color: var(--burgundy); }

  /* layout rows */
  .bf-row {
    display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;
  }

  /* field + label */
  .bf-field { display: flex; flex-direction: column; gap: .35rem; }
  .bf-label {
    font-family: 'DM Sans', sans-serif;
    font-size: .74rem; font-weight: 500;
    letter-spacing: .06em; text-transform: uppercase;
    color: var(--warm-gray);
  }
  .bf-label-opt {
    font-weight: 300; text-transform: none;
    letter-spacing: 0; opacity: .7;
  }

  /* inputs */
  .bf-input {
    width: 100%;
    height: 48px;
    border-radius: 12px;
    border: 1px solid rgba(107,26,42,.14);
    background: var(--cream);
    padding: 0 1rem;
    font-family: 'DM Sans', sans-serif;
    font-size: .88rem; font-weight: 300;
    color: var(--charcoal);
    outline: none;
    transition: border-color .25s, box-shadow .25s, background .25s;
    appearance: none;
    -webkit-appearance: none;
  }
  .bf-input:focus {
    border-color: var(--gold);
    box-shadow: 0 0 0 3px rgba(201,150,90,.12);
    background: #FFFCF8;
  }
  .bf-input::placeholder { color: rgba(140,123,107,.55); }
  .bf-input option { background: #FFFCF8; color: var(--charcoal); }

  /* date input calendar icon colour fix */
  .bf-input[type="date"]::-webkit-calendar-picker-indicator {
    opacity: .4; cursor: pointer;
    filter: invert(30%) sepia(60%) saturate(400%) hue-rotate(330deg);
  }

  .bf-textarea {
    height: auto; padding: .75rem 1rem; resize: vertical; border-radius: 12px;
  }

  /* submit button */
  .bf-btn-primary {
    width: 100%; height: 52px;
    background: var(--gold); color: var(--charcoal);
    border: none; border-radius: 2rem;
    font-family: 'DM Sans', sans-serif;
    font-size: .85rem; font-weight: 500;
    letter-spacing: .06em; text-transform: uppercase;
    cursor: pointer; margin-top: .3rem;
    display: flex; align-items: center; justify-content: center; gap: .5rem;
    transition: background .25s, transform .2s, box-shadow .25s;
    box-shadow: 0 4px 20px rgba(201,150,90,.3);
  }
  .bf-btn-primary:hover:not(:disabled) {
    background: var(--gold-lt);
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(201,150,90,.4);
  }
  .bf-btn-primary:active:not(:disabled) { transform: scale(.98); }
  .bf-btn-primary:disabled { opacity: .7; cursor: not-allowed; }
  .bf-btn-loading { pointer-events: none; }

  /* spinner inside button */
  .bf-spinner {
    width: 20px; height: 20px; border-radius: 50%;
    border: 2px solid rgba(28,22,18,.2);
    border-top-color: var(--charcoal);
    animation: bfSpin .8s linear infinite;
  }
  @keyframes bfSpin { to { transform: rotate(360deg); } }

  /* footer note */
  .bf-footer-note {
    font-family: 'DM Sans', sans-serif;
    font-size: .72rem; font-weight: 300;
    color: rgba(140,123,107,.6);
    text-align: center; line-height: 1.5;
  }

  /* success state */
  .bf-success-card {
    text-align: center; align-items: center; padding: 3.5rem 2.5rem;
  }
  .bf-success-icon {
    width: 60px; height: 60px; border-radius: 50%;
    background: linear-gradient(135deg, var(--gold), var(--burgundy-lt));
    color: #FAF7F2; font-size: 1.5rem; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1.2rem;
    box-shadow: 0 8px 24px rgba(201,150,90,.35);
  }
  .bf-success-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem; font-weight: 600;
    color: var(--charcoal); margin-bottom: .5rem;
  }
  .bf-success-sub {
    font-family: 'DM Sans', sans-serif;
    font-size: .85rem; font-weight: 300;
    color: var(--warm-gray); line-height: 1.7;
    max-width: 380px; margin-bottom: 2rem;
  }

  @media (max-width: 560px) {
    .bf-row { grid-template-columns: 1fr; }
    .bf-card { padding: 1.8rem 1.4rem; }
  }
`;