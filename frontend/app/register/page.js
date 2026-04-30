"use client";

import Footer from "@/components/Footer";
import Input from "@/components/Input";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/Providers/AuthProvider";

export default function RegisterPage() {
  const [name,                 setName]                 = useState("");
  const [email,                setEmail]                = useState("");
  const [password,             setPassword]             = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isLoading,            setIsLoading]            = useState(false);
  const [error,                setError]                = useState("");

  const router = useRouter();
  const { login } = useAuth();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001/api";

  async function submit(e) {
    e.preventDefault();
    setError("");

    if (password !== passwordConfirmation) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name, email, password,
          password_confirmation: passwordConfirmation,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      // login() expects the full response object { user, access_token }
      login(data);
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  /* password strength indicator */
  const strength = !password ? 0
    : password.length < 6  ? 1
    : password.length < 10 ? 2
    : /[A-Z]/.test(password) && /[0-9]/.test(password) ? 4 : 3;
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "#E24B4A", "#EF9F27", "#639922", "#1D9E75"][strength];

  return (
    <>
      <style>{`
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

        /* ── split layout (mirrored: form left, brand right) ── */
        .rg-page {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        /* ── left: form panel ── */
        .rg-left {
          background: var(--cream);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem 3rem;
        }
        .rg-left-inner { width: 100%; max-width: 420px; }

        .rg-brand {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem; font-weight: 600;
          color: var(--charcoal); letter-spacing: .02em;
          margin-bottom: 2.5rem; display: block;
          text-decoration: none;
        }
        .rg-brand em { font-style: normal; color: var(--gold); }

        .rg-eyebrow {
          display: inline-flex; align-items: center; gap: .5rem;
          font-family: 'DM Sans', sans-serif;
          font-size: .68rem; font-weight: 500;
          letter-spacing: .2em; text-transform: uppercase;
          color: var(--gold); margin-bottom: .55rem;
        }
        .rg-eyebrow::before {
          content: ''; display: inline-block;
          width: 16px; height: 1px; background: var(--gold);
        }
        .rg-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.2rem; font-weight: 400; line-height: 1.1;
          color: var(--charcoal); margin-bottom: .4rem;
        }
        .rg-title em { font-style: italic; color: var(--burgundy); }
        .rg-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: .82rem; font-weight: 300;
          color: var(--warm-gray); margin-bottom: 2rem;
        }

        /* error */
        .rg-error {
          display: flex; align-items: center; gap: .6rem;
          background: rgba(107,26,42,.06);
          border: 1px solid rgba(107,26,42,.18);
          border-radius: 10px; padding: .7rem 1rem;
          font-family: 'DM Sans', sans-serif;
          font-size: .82rem; color: var(--burgundy);
          margin-bottom: 1.2rem;
        }
        .rg-error-icon {
          width: 20px; height: 20px; border-radius: 50%;
          background: var(--burgundy); color: #FAF7F2;
          display: flex; align-items: center; justify-content: center;
          font-size: .7rem; font-weight: 700; flex-shrink: 0;
        }

        /* fields */
        .rg-fields { display: flex; flex-direction: column; gap: .95rem; }
        .rg-field  { display: flex; flex-direction: column; gap: .32rem; }
        .rg-label {
          font-family: 'DM Sans', sans-serif;
          font-size: .72rem; font-weight: 500;
          letter-spacing: .07em; text-transform: uppercase;
          color: var(--warm-gray);
        }
        .rg-input {
          height: 48px; width: 100%;
          border-radius: 12px;
          border: 1px solid rgba(107,26,42,.14);
          background: var(--card-bg);
          padding: 0 1rem;
          font-family: 'DM Sans', sans-serif;
          font-size: .88rem; font-weight: 300;
          color: var(--charcoal); outline: none;
          transition: border-color .25s, box-shadow .25s;
        }
        .rg-input:focus {
          border-color: var(--gold);
          box-shadow: 0 0 0 3px rgba(201,150,90,.12);
        }
        .rg-input::placeholder { color: rgba(140,123,107,.5); }

        /* password strength bar */
        .rg-strength {
          margin-top: .35rem;
          display: flex; align-items: center; gap: .6rem;
        }
        .rg-strength-bars {
          display: flex; gap: 3px; flex: 1;
        }
        .rg-strength-bar {
          height: 3px; flex: 1; border-radius: 2px;
          background: rgba(107,26,42,.1);
          transition: background .35s;
        }
        .rg-strength-label {
          font-family: 'DM Sans', sans-serif;
          font-size: .68rem; font-weight: 500;
          min-width: 38px; text-align: right;
          transition: color .35s;
        }

        /* submit */
        .rg-submit {
          width: 100%; height: 50px;
          background: var(--gold); color: var(--charcoal);
          border: none; border-radius: 2rem;
          font-family: 'DM Sans', sans-serif;
          font-size: .84rem; font-weight: 500;
          letter-spacing: .06em; text-transform: uppercase;
          cursor: pointer; margin-top: 1.5rem;
          display: flex; align-items: center; justify-content: center; gap: .5rem;
          transition: background .25s, transform .2s, box-shadow .25s;
          box-shadow: 0 4px 18px rgba(201,150,90,.3);
        }
        .rg-submit:hover:not(:disabled) {
          background: var(--gold-lt);
          transform: translateY(-2px);
          box-shadow: 0 8px 26px rgba(201,150,90,.38);
        }
        .rg-submit:disabled { opacity: .65; cursor: not-allowed; }
        .rg-spinner {
          width: 18px; height: 18px; border-radius: 50%;
          border: 2px solid rgba(28,22,18,.2);
          border-top-color: var(--charcoal);
          animation: rgSpin .8s linear infinite;
        }
        @keyframes rgSpin { to { transform: rotate(360deg); } }

        /* divider + footer */
        .rg-divider {
          display: flex; align-items: center; gap: .75rem;
          margin: 1.5rem 0;
        }
        .rg-divider-line { flex: 1; height: 1px; background: rgba(107,26,42,.08); }
        .rg-divider-text {
          font-family: 'DM Sans', sans-serif;
          font-size: .7rem; color: rgba(140,123,107,.5);
          letter-spacing: .06em; text-transform: uppercase;
        }
        .rg-foot {
          text-align: center;
          font-family: 'DM Sans', sans-serif;
          font-size: .8rem; font-weight: 300; color: var(--warm-gray);
        }
        .rg-foot a {
          color: var(--burgundy); font-weight: 500;
          text-decoration: none;
          border-bottom: 1px solid rgba(107,26,42,.25);
          padding-bottom: .1rem;
          transition: border-color .2s;
        }
        .rg-foot a:hover { border-color: var(--burgundy); }

        /* ── right: brand panel ── */
        .rg-right {
          background: var(--charcoal);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 4rem;
        }
        .rg-right::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(145deg, #1C1612 0%, #3D1A12 45%, #6B1A2A 100%);
          opacity: .95;
        }
        .rg-right-pattern {
          position: absolute; inset: 0;
          opacity: .03;
          background-image: repeating-linear-gradient(45deg,#C9965A 0,#C9965A 1px,transparent 0,transparent 50%);
          background-size: 20px 20px; pointer-events: none;
        }
        .rg-right-orb {
          position: absolute;
          width: 420px; height: 420px; border-radius: 50%;
          background: radial-gradient(circle,rgba(201,150,90,.14) 0%,transparent 70%);
          bottom: -60px; right: -60px; pointer-events: none;
        }
        .rg-right-orb2 {
          position: absolute;
          width: 280px; height: 280px; border-radius: 50%;
          background: radial-gradient(circle,rgba(107,26,42,.4) 0%,transparent 70%);
          top: 40px; left: -50px; pointer-events: none;
        }
        .rg-right-content { position: relative; z-index: 1; }

        .rg-right-eyebrow {
          display: inline-flex; align-items: center; gap: .5rem;
          font-family: 'DM Sans', sans-serif;
          font-size: .68rem; font-weight: 500;
          letter-spacing: .2em; text-transform: uppercase;
          color: var(--gold); margin-bottom: .8rem;
        }
        .rg-right-eyebrow::before {
          content: ''; display: inline-block;
          width: 18px; height: 1px; background: var(--gold);
        }
        .rg-right-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 3.2vw, 3.2rem);
          font-weight: 300; line-height: 1.1;
          color: #FAF7F2; margin-bottom: 1rem;
        }
        .rg-right-title em { font-style: italic; color: var(--gold-lt); }
        .rg-right-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: .88rem; font-weight: 300;
          color: rgba(250,247,242,.45); line-height: 1.75;
          max-width: 340px; margin-bottom: 2.5rem;
        }

        /* perks list */
        .rg-perks { display: flex; flex-direction: column; gap: .85rem; }
        .rg-perk {
          display: flex; align-items: flex-start; gap: .9rem;
        }
        .rg-perk-icon {
          width: 36px; height: 36px; flex-shrink: 0;
          border-radius: 10px;
          background: rgba(201,150,90,.1);
          border: 1px solid rgba(201,150,90,.2);
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem;
          transition: background .25s, transform .25s;
        }
        .rg-perk:hover .rg-perk-icon {
          background: rgba(201,150,90,.18);
          transform: scale(1.08) rotate(-3deg);
        }
        .rg-perk-title {
          font-family: 'DM Sans', sans-serif;
          font-size: .84rem; font-weight: 500;
          color: rgba(250,247,242,.8); margin-bottom: .15rem;
        }
        .rg-perk-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: .76rem; font-weight: 300;
          color: rgba(250,247,242,.38); line-height: 1.5;
        }

        /* responsive */
        @media (max-width: 860px) {
          .rg-page { grid-template-columns: 1fr; }
          .rg-right { min-height: 300px; padding: 3rem 2rem; }
          .rg-right-title { font-size: 1.9rem; }
          .rg-left { padding: 3rem 1.5rem; }
          .rg-perks { display: none; }
        }
      `}</style>

      <div className="rg-page">

        {/* ── LEFT: form panel ── */}
        <div className="rg-left">
          <div className="rg-left-inner">

            <Link href="/" className="rg-brand">
              Happy <em>Tummy</em>
            </Link>

            <div className="rg-eyebrow">New Account</div>
            <h1 className="rg-title">
              Join <em>Happy Tummy</em>
            </h1>
            <p className="rg-sub">Create your account and start your culinary journey</p>

            {error && (
              <div className="rg-error">
                <div className="rg-error-icon">!</div>
                {error}
              </div>
            )}

            <form onSubmit={submit}>
              <div className="rg-fields">
                <div className="rg-field">
                  <label className="rg-label">Full Name</label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="rg-input"
                    placeholder="Your full name"
                  />
                </div>

                <div className="rg-field">
                  <label className="rg-label">Email Address</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="rg-input"
                    placeholder="you@example.com"
                  />
                </div>

                <div className="rg-field">
                  <label className="rg-label">Password</label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    className="rg-input"
                    placeholder="Min. 8 characters"
                  />
                  {/* strength meter */}
                  {password && (
                    <div className="rg-strength">
                      <div className="rg-strength-bars">
                        {[1,2,3,4].map(i => (
                          <div
                            key={i}
                            className="rg-strength-bar"
                            style={{ background: i <= strength ? strengthColor : undefined }}
                          />
                        ))}
                      </div>
                      <span className="rg-strength-label" style={{ color: strengthColor }}>
                        {strengthLabel}
                      </span>
                    </div>
                  )}
                </div>

                <div className="rg-field">
                  <label className="rg-label">Confirm Password</label>
                  <Input
                    type="password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    required
                    minLength={8}
                    className="rg-input"
                    placeholder="Repeat your password"
                  />
                </div>
              </div>

              <button type="submit" disabled={isLoading} className="rg-submit">
                {isLoading
                  ? <><span className="rg-spinner" /> Creating Account…</>
                  : "Create Account →"
                }
              </button>
            </form>

            <div className="rg-divider">
              <span className="rg-divider-line" />
              <span className="rg-divider-text">Have an account?</span>
              <span className="rg-divider-line" />
            </div>

            <p className="rg-foot">
              Already a member?{" "}
              <Link href="/login">Sign in here</Link>
            </p>

          </div>
        </div>

        {/* ── RIGHT: brand panel ── */}
        <div className="rg-right">
          <div className="rg-right-pattern" />
          <div className="rg-right-orb" />
          <div className="rg-right-orb2" />
          <div className="rg-right-content">
            <div className="rg-right-eyebrow">Happy Tummy</div>
            <h2 className="rg-right-title">
              Your seat at the<br /><em>table awaits.</em>
            </h2>
            <p className="rg-right-sub">
              Join thousands of food lovers wh&apos;ve made Happy Tummy their
              favourite dining destination in Los Angeles.
            </p>

            <div className="rg-perks">
              {[
                { icon: "📅", title: "Easy Reservations",   desc: "Book a table in seconds, any time of day." },
                { icon: "🎁", title: "Member Perks",        desc: "Exclusive offers and early access to seasonal menus." },
                { icon: "🍽",  title: "Order History",       desc: "Track your favourite dishes and past bookings." },
                { icon: "⭐",  title: "Priority Seating",    desc: "Members get first access to peak-time reservations." },
              ].map(p => (
                <div key={p.title} className="rg-perk">
                  <div className="rg-perk-icon">{p.icon}</div>
                  <div>
                    <div className="rg-perk-title">{p.title}</div>
                    <div className="rg-perk-desc">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </>
  );
}