'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UpdateNameForm({ initialName }) {
  const r = useRouter();
  const [name,   setName]   = useState(initialName || '');
  const [msg,    setMsg]    = useState('');
  const [err,    setErr]    = useState('');
  const [saving, setSaving] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setMsg(''); setErr(''); setSaving(true);
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || 'Update failed');
      }
      setMsg('Name updated successfully.');
      r.refresh();
    } catch (e) {
      setErr(e.message || 'Something went wrong.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <style>{`
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
          --card-bg:     #FFFCF8;
        }

        .unf-wrap {
          display: flex;
          flex-direction: column;
          gap: .75rem;
        }

        /* feedback banners */
        .unf-success {
          display: flex; align-items: center; gap: .6rem;
          background: rgba(29,158,117,.07);
          border: 1px solid rgba(29,158,117,.22);
          border-radius: 10px; padding: .65rem 1rem;
          font-family: 'DM Sans', sans-serif;
          font-size: .81rem; color: #1a7a5e;
        }
        .unf-error {
          display: flex; align-items: center; gap: .6rem;
          background: rgba(107,26,42,.06);
          border: 1px solid rgba(107,26,42,.2);
          border-radius: 10px; padding: .65rem 1rem;
          font-family: 'DM Sans', sans-serif;
          font-size: .81rem; color: var(--burgundy);
        }
        .unf-banner-icon {
          width: 20px; height: 20px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: .7rem; font-weight: 700; flex-shrink: 0;
        }
        .unf-success .unf-banner-icon { background: #1D9E75; color: #fff; }
        .unf-error   .unf-banner-icon { background: var(--burgundy); color: #FAF7F2; }

        /* input */
        .unf-input {
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
        .unf-input:focus {
          border-color: var(--gold);
          box-shadow: 0 0 0 3px rgba(201,150,90,.12);
        }
        .unf-input::placeholder { color: rgba(140,123,107,.5); }

        /* button */
        .unf-btn {
          height: 46px;
          background: var(--gold); color: var(--charcoal);
          border: none; border-radius: 2rem;
          font-family: 'DM Sans', sans-serif;
          font-size: .8rem; font-weight: 500;
          letter-spacing: .07em; text-transform: uppercase;
          cursor: pointer; padding: 0 1.8rem;
          display: inline-flex; align-items: center; gap: .5rem;
          transition: background .25s, transform .2s, box-shadow .25s;
          box-shadow: 0 3px 14px rgba(201,150,90,.28);
          align-self: flex-start;
        }
        .unf-btn:hover:not(:disabled) {
          background: var(--gold-lt);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(201,150,90,.35);
        }
        .unf-btn:disabled { opacity: .65; cursor: not-allowed; }

        /* spinner */
        .unf-spinner {
          width: 15px; height: 15px; border-radius: 50%;
          border: 2px solid rgba(28,22,18,.2);
          border-top-color: var(--charcoal);
          animation: unfSpin .8s linear infinite;
        }
        @keyframes unfSpin { to { transform: rotate(360deg); } }
      `}</style>

      <form onSubmit={onSubmit} className="unf-wrap">

        {/* error */}
        {err && (
          <div className="unf-error">
            <div className="unf-banner-icon">!</div>
            {err}
          </div>
        )}

        {/* success */}
        {msg && (
          <div className="unf-success">
            <div className="unf-banner-icon">✓</div>
            {msg}
          </div>
        )}

        <input
          className="unf-input"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Your full name"
          required
        />

        <button className="unf-btn" disabled={saving}>
          {saving
            ? <><span className="unf-spinner" /> Saving…</>
            : 'Save Changes →'
          }
        </button>

      </form>
    </>
  );
}