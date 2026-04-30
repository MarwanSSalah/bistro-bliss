"use client";

import Footer from "@/components/Footer";
import Input from "@/components/Input";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/Providers/AuthProvider";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001/api";

export default function LoginPage() {
  const [email,     setEmail]     = useState("");
  const [password,  setPassword]  = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error,     setError]     = useState("");
  const router = useRouter();
  const { login } = useAuth();

  async function submit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid credentials");

      login(data); // stores token + user in localStorage and context
      router.push("/");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

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

        /* ── split layout ── */
        .lg-page {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        /* ── left panel: dark atmospheric side ── */
        .lg-left {
          background: var(--charcoal);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 4rem;
          min-height: 100vh;
        }
        .lg-left::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(145deg, #1C1612 0%, #3D1A12 45%, #6B1A2A 100%);
          opacity: .95;
        }
        .lg-left-pattern {
          position: absolute; inset: 0;
          opacity: .03;
          background-image: repeating-linear-gradient(45deg,#C9965A 0,#C9965A 1px,transparent 0,transparent 50%);
          background-size: 20px 20px;
          pointer-events: none;
        }
        .lg-left-orb {
          position: absolute;
          width: 480px; height: 480px; border-radius: 50%;
          background: radial-gradient(circle,rgba(201,150,90,.15) 0%,transparent 70%);
          top: -80px; right: -80px; pointer-events: none;
        }
        .lg-left-orb2 {
          position: absolute;
          width: 300px; height: 300px; border-radius: 50%;
          background: radial-gradient(circle,rgba(107,26,42,.4) 0%,transparent 70%);
          bottom: 80px; left: -60px; pointer-events: none;
        }
        .lg-left-content {
          position: relative; z-index: 1;
        }
        .lg-left-eyebrow {
          display: inline-flex; align-items: center; gap: .5rem;
          font-family: 'DM Sans', sans-serif;
          font-size: .68rem; font-weight: 500;
          letter-spacing: .2em; text-transform: uppercase;
          color: var(--gold); margin-bottom: .8rem;
        }
        .lg-left-eyebrow::before {
          content: ''; display: inline-block;
          width: 18px; height: 1px; background: var(--gold);
        }
        .lg-left-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.2rem, 3.5vw, 3.4rem);
          font-weight: 300; line-height: 1.1;
          color: #FAF7F2; margin-bottom: 1rem;
        }
        .lg-left-title em { font-style: italic; color: var(--gold-lt); }
        .lg-left-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: .88rem; font-weight: 300;
          color: rgba(250,247,242,.45);
          line-height: 1.75; max-width: 340px;
          margin-bottom: 2.5rem;
        }

        /* testimonial quote on left */
        .lg-quote {
          background: rgba(250,247,242,.05);
          border: 1px solid rgba(250,247,242,.1);
          border-radius: 14px; padding: 1.4rem 1.6rem;
          position: relative;
        }
        .lg-quote::before {
          content: '\u201C';
          font-family: 'Cormorant Garamond', serif;
          font-size: 5rem; color: rgba(201,150,90,.15);
          position: absolute; top: -18px; left: 1rem;
          line-height: 1; pointer-events: none;
        }
        .lg-quote-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem; font-style: italic;
          color: rgba(250,247,242,.65); line-height: 1.55;
          margin-bottom: .9rem;
        }
        .lg-quote-author {
          display: flex; align-items: center; gap: .7rem;
        }
        .lg-quote-avatar {
          width: 34px; height: 34px; border-radius: 50%;
          background: linear-gradient(135deg,var(--gold),var(--burgundy-lt));
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem; font-weight: 600; color: #FAF7F2;
          border: 1px solid rgba(201,150,90,.3); flex-shrink: 0;
        }
        .lg-quote-name {
          font-family: 'DM Sans', sans-serif;
          font-size: .8rem; font-weight: 500; color: rgba(250,247,242,.7);
        }
        .lg-quote-loc {
          font-family: 'DM Sans', sans-serif;
          font-size: .7rem; color: rgba(250,247,242,.35); margin-top: .1rem;
        }

        /* ── right panel: form side ── */
        .lg-right {
          background: var(--cream);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem 3rem;
          position: relative;
        }
        .lg-right-inner {
          width: 100%; max-width: 400px;
        }

        /* brand mark at top */
        .lg-brand {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem; font-weight: 600;
          color: var(--charcoal); letter-spacing: .02em;
          margin-bottom: 2.5rem; display: block;
          text-decoration: none;
        }
        .lg-brand em { font-style: normal; color: var(--gold); }

        .lg-form-eyebrow {
          display: inline-flex; align-items: center; gap: .5rem;
          font-family: 'DM Sans', sans-serif;
          font-size: .68rem; font-weight: 500;
          letter-spacing: .2em; text-transform: uppercase;
          color: var(--gold); margin-bottom: .55rem;
        }
        .lg-form-eyebrow::before {
          content: ''; display: inline-block;
          width: 16px; height: 1px; background: var(--gold);
        }
        .lg-form-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.2rem; font-weight: 400; line-height: 1.1;
          color: var(--charcoal); margin-bottom: .4rem;
        }
        .lg-form-title em { font-style: italic; color: var(--burgundy); }
        .lg-form-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: .82rem; font-weight: 300;
          color: var(--warm-gray); margin-bottom: 2rem;
        }

        /* error */
        .lg-error {
          display: flex; align-items: center; gap: .6rem;
          background: rgba(107,26,42,.06);
          border: 1px solid rgba(107,26,42,.18);
          border-radius: 10px; padding: .7rem 1rem;
          font-family: 'DM Sans', sans-serif;
          font-size: .82rem; color: var(--burgundy);
          margin-bottom: 1.2rem;
        }
        .lg-error-icon {
          width: 20px; height: 20px; border-radius: 50%;
          background: var(--burgundy); color: #FAF7F2;
          display: flex; align-items: center; justify-content: center;
          font-size: .7rem; font-weight: 700; flex-shrink: 0;
        }

        /* fields */
        .lg-fields { display: flex; flex-direction: column; gap: 1rem; }
        .lg-field { display: flex; flex-direction: column; gap: .35rem; }
        .lg-label {
          font-family: 'DM Sans', sans-serif;
          font-size: .72rem; font-weight: 500;
          letter-spacing: .07em; text-transform: uppercase;
          color: var(--warm-gray);
        }
        .lg-input {
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
        .lg-input:focus {
          border-color: var(--gold);
          box-shadow: 0 0 0 3px rgba(201,150,90,.12);
        }
        .lg-input::placeholder { color: rgba(140,123,107,.5); }

        /* submit */
        .lg-submit {
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
        .lg-submit:hover:not(:disabled) {
          background: var(--gold-lt);
          transform: translateY(-2px);
          box-shadow: 0 8px 26px rgba(201,150,90,.38);
        }
        .lg-submit:disabled { opacity: .65; cursor: not-allowed; }
        .lg-spinner {
          width: 18px; height: 18px; border-radius: 50%;
          border: 2px solid rgba(28,22,18,.2);
          border-top-color: var(--charcoal);
          animation: lgSpin .8s linear infinite;
        }
        @keyframes lgSpin { to { transform: rotate(360deg); } }

        /* footer link */
        .lg-foot {
          margin-top: 1.6rem; text-align: center;
          font-family: 'DM Sans', sans-serif;
          font-size: .8rem; font-weight: 300; color: var(--warm-gray);
        }
        .lg-foot a {
          color: var(--burgundy); font-weight: 500;
          text-decoration: none;
          border-bottom: 1px solid rgba(107,26,42,.25);
          padding-bottom: .1rem;
          transition: border-color .2s;
        }
        .lg-foot a:hover { border-color: var(--burgundy); }

        /* divider */
        .lg-divider {
          display: flex; align-items: center; gap: .75rem;
          margin: 1.5rem 0;
        }
        .lg-divider-line {
          flex: 1; height: 1px; background: rgba(107,26,42,.08);
        }
        .lg-divider-text {
          font-family: 'DM Sans', sans-serif;
          font-size: .7rem; color: rgba(140,123,107,.5);
          letter-spacing: .06em; text-transform: uppercase;
        }

        /* responsive */
        @media (max-width: 860px) {
          .lg-page { grid-template-columns: 1fr; }
          .lg-left { min-height: 320px; padding: 3rem 2rem; justify-content: center; }
          .lg-left-title { font-size: 2rem; }
          .lg-right { padding: 3rem 1.5rem; }
          .lg-quote { display: none; }
        }
      `}</style>

      <div className="lg-page">

        {/* ── LEFT: atmospheric brand panel ── */}
        <div className="lg-left">
          <div className="lg-left-pattern" />
          <div className="lg-left-orb" />
          <div className="lg-left-orb2" />
          <div className="lg-left-content">
            <div className="lg-left-eyebrow">Happy Tummy</div>
            <h2 className="lg-left-title">
              A table awaits<br /><em>your return.</em>
            </h2>
            <p className="lg-left-sub">
              Sign back in and pick up where you left off — reserve your next
              unforgettable dining experience in seconds.
            </p>

            {/* testimonial quote */}
            <div className="lg-quote">
              <p className="lg-quote-text">
                Every visit feels like coming home. The food, the people, the
                atmosphere — nothing else comes close.
              </p>
              <div className="lg-quote-author">
                <div className="lg-quote-avatar">SR</div>
                <div>
                  <div className="lg-quote-name">Sophie Robson</div>
                  <div className="lg-quote-loc">Los Angeles, CA</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: form panel ── */}
        <div className="lg-right">
          <div className="lg-right-inner">

            {/* brand */}
            <Link href="/" className="lg-brand">
              Happy <em>Tummy</em>
            </Link>

            {/* heading */}
            <div className="lg-form-eyebrow">Member Login</div>
            <h1 className="lg-form-title">
              Welcome <em>back</em>
            </h1>
            <p className="lg-form-sub">Sign in to your account to continue</p>

            {/* error */}
            {error && (
              <div className="lg-error">
                <div className="lg-error-icon">!</div>
                {error}
              </div>
            )}

            {/* form */}
            <form onSubmit={submit}>
              <div className="lg-fields">
                <div className="lg-field">
                  <label className="lg-label">Email Address</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="lg-input"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="lg-field">
                  <label className="lg-label">Password</label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="lg-input"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button type="submit" disabled={isLoading} className="lg-submit">
                {isLoading
                  ? <><span className="lg-spinner" /> Signing In…</>
                  : "Sign In →"
                }
              </button>
            </form>

            <div className="lg-divider">
              <span className="lg-divider-line" />
              <span className="lg-divider-text">New here?</span>
              <span className="lg-divider-line" />
            </div>

            <p className="lg-foot">
              Don&apos;t have an account?{" "}
              <Link href="/register">Create one here</Link>
            </p>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}