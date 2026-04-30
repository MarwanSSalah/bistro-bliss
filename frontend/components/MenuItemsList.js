'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import phpApi from '../lib/php-api';

/* category → gold/burgundy palette pill */
const CATEGORY_STYLES = {
  BREAKFAST:  { label: 'Breakfast',  bg: 'rgba(201,150,90,.12)',  color: '#8B5E2A', border: 'rgba(201,150,90,.3)'  },
  MAIN_DISH:  { label: 'Main Dish',  bg: 'rgba(107,26,42,.08)',   color: '#6B1A2A', border: 'rgba(107,26,42,.22)' },
  DRINK:      { label: 'Drink',      bg: 'rgba(28,22,18,.07)',    color: '#3D2E24', border: 'rgba(28,22,18,.18)'  },
  DESSERT:    { label: 'Dessert',    bg: 'rgba(232,184,122,.15)', color: '#7A4A10', border: 'rgba(232,184,122,.4)' },
};
const defaultCat = { label: '', bg: 'rgba(140,123,107,.1)', color: '#8C7B6B', border: 'rgba(140,123,107,.25)' };

export default function MenuItemsList() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        const response = await phpApi.getMenuItems();
        if (response.success) {
          setMenuItems(response.data);
        } else {
          setError(response.message || 'Failed to fetch menu items');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMenuItems();
  }, []);

  /* ── Loading state ── */
  if (loading) {
    return (
      <>
        <style>{skeletonCSS}</style>
        <div className="mil-loading">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="mil-skeleton-card">
              <div className="mil-skeleton mil-sk-img" />
              <div className="mil-skeleton-body">
                <div className="mil-skeleton mil-sk-title" />
                <div className="mil-skeleton mil-sk-line" />
                <div className="mil-skeleton mil-sk-line mil-sk-short" />
                <div className="mil-skeleton mil-sk-footer" />
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  /* ── Error state ── */
  if (error) {
    return (
      <>
        <style>{baseCSS}</style>
        <div className="mil-error">
          <div className="mil-error-icon">!</div>
          <div className="mil-error-title">Something went wrong</div>
          <p className="mil-error-msg">{error}</p>
          <button className="mil-error-btn" onClick={() => window.location.reload()}>
            Try Again →
          </button>
        </div>
      </>
    );
  }

  /* ── Main render ── */
  return (
    <>
      <style>{baseCSS}</style>

      <div className="mil-wrapper">
        {/* header row */}
        <div className="mil-header">
          <div>
            <div className="mil-eyebrow">Our Kitchen</div>
            <h2 className="mil-title">Menu <em>Items</em></h2>
          </div>
          <div className="mil-count">
            <span className="mil-count-num">{menuItems.length}</span>
            <span className="mil-count-label">dishes available</span>
          </div>
        </div>

        {/* grid */}
        <div className="mil-grid">
          {menuItems.map((item) => {
            const cat = CATEGORY_STYLES[item.category] ?? { ...defaultCat, label: item.category?.replace('_', ' ') ?? '' };
            return (
              <div key={item.id} className="mil-card">
                {/* image */}
                <div className="mil-card-img">
                  <Image
                    src={item.image || '/images/placeholder-food.jpg'}
                    alt={item.name}
                    fill
                    className="mil-card-photo"
                    unoptimized
                    onError={(e) => { e.currentTarget.src = '/images/placeholder-food.jpg'; }}
                  />
                  <div className="mil-card-overlay" />

                  {/* price badge */}
                  <div className="mil-price-badge">
                    ${Number(item.price).toFixed(2)}
                  </div>

                  {/* category pill */}
                  <div
                    className="mil-cat-pill"
                    style={{ background: cat.bg, color: cat.color, border: `1px solid ${cat.border}` }}
                  >
                    {cat.label || item.category?.replace('_', ' ')}
                  </div>
                </div>

                {/* body */}
                <div className="mil-card-body">
                  <div className="mil-card-name">{item.name}</div>
                  <p className="mil-card-desc">
                    {item.description || 'Made with fresh, hand-selected ingredients by our kitchen team.'}
                  </p>
                  <div className="mil-card-footer">
                    <button className="mil-card-cta">Add to Order →</button>
                    <div className="mil-dots">
                      <span className="mil-dot" /><span className="mil-dot" /><span className="mil-dot" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* footer tally */}
        {menuItems.length > 0 && (
          <div className="mil-footer-bar">
            <span className="mil-footer-text">
              Showing all <strong>{menuItems.length}</strong> menu items
            </span>
            <div className="mil-footer-line" />
          </div>
        )}
      </div>
    </>
  );
}

/* ─────────────────────────────────────────
   STYLES
───────────────────────────────────────── */
const baseCSS = `
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

  .mil-wrapper {
    background: var(--cream2);
    border-radius: 20px;
    padding: 2.5rem 2rem 2rem;
    border: 1px solid rgba(107,26,42,.07);
  }

  /* header */
  .mil-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 2.2rem;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .mil-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: .5rem;
    font-family: 'DM Sans', sans-serif;
    font-size: .7rem;
    font-weight: 500;
    letter-spacing: .2em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: .5rem;
  }
  .mil-eyebrow::before {
    content: '';
    display: inline-block;
    width: 18px; height: 1px;
    background: var(--gold);
  }
  .mil-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.8rem, 3vw, 2.4rem);
    font-weight: 400;
    color: var(--charcoal);
    line-height: 1.1;
    margin: 0;
  }
  .mil-title em { font-style: italic; color: var(--burgundy); }
  .mil-count { text-align: right; }
  .mil-count-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.2rem;
    font-weight: 600;
    color: var(--charcoal);
    line-height: 1;
    display: block;
  }
  .mil-count-label {
    font-family: 'DM Sans', sans-serif;
    font-size: .68rem;
    font-weight: 400;
    letter-spacing: .1em;
    text-transform: uppercase;
    color: var(--warm-gray);
  }

  /* grid */
  .mil-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.3rem;
  }

  /* card */
  .mil-card {
    background: var(--card-bg);
    border: 1px solid rgba(107,26,42,.08);
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    transition: transform .35s cubic-bezier(.22,1,.36,1),
                box-shadow .35s, border-color .3s;
  }
  .mil-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 55px rgba(107,26,42,.13);
    border-color: rgba(107,26,42,.18);
  }

  /* card image */
  .mil-card-img {
    position: relative;
    height: 175px;
    overflow: hidden;
  }
  .mil-card-photo {
    object-fit: cover;
    transition: transform .5s cubic-bezier(.22,1,.36,1) !important;
  }
  .mil-card:hover .mil-card-photo { transform: scale(1.08) !important; }
  .mil-card-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(28,22,18,.22) 0%, transparent 55%);
    pointer-events: none;
  }

  /* badges */
  .mil-price-badge {
    position: absolute;
    top: .7rem; right: .7rem;
    background: var(--gold);
    color: var(--charcoal);
    font-family: 'DM Sans', sans-serif;
    font-size: .76rem;
    font-weight: 500;
    letter-spacing: .04em;
    padding: .26rem .75rem;
    border-radius: 2rem;
    box-shadow: 0 2px 10px rgba(201,150,90,.4);
    z-index: 1;
  }
  .mil-cat-pill {
    position: absolute;
    bottom: .7rem; left: .7rem;
    font-family: 'DM Sans', sans-serif;
    font-size: .65rem;
    font-weight: 500;
    letter-spacing: .1em;
    text-transform: uppercase;
    padding: .2rem .65rem;
    border-radius: 2rem;
    z-index: 1;
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
  }

  /* card body */
  .mil-card-body { padding: 1.05rem 1.15rem 1.2rem; }
  .mil-card-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.12rem;
    font-weight: 600;
    color: var(--charcoal);
    line-height: 1.25;
    margin-bottom: .3rem;
    transition: color .25s;
  }
  .mil-card:hover .mil-card-name { color: var(--burgundy); }
  .mil-card-desc {
    font-family: 'DM Sans', sans-serif;
    font-size: .77rem;
    font-weight: 300;
    color: var(--warm-gray);
    line-height: 1.6;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: .85rem;
  }
  .mil-card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid rgba(107,26,42,.06);
    padding-top: .8rem;
  }
  .mil-card-cta {
    font-family: 'DM Sans', sans-serif;
    font-size: .7rem;
    font-weight: 500;
    letter-spacing: .08em;
    text-transform: uppercase;
    color: var(--burgundy);
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    border-bottom: 1px solid transparent;
    transition: border-color .2s, color .2s;
  }
  .mil-card:hover .mil-card-cta {
    border-color: var(--burgundy);
    color: var(--burgundy-lt);
  }
  .mil-dots { display: flex; gap: 3px; }
  .mil-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: rgba(201,150,90,.28);
    transition: background .25s;
  }
  .mil-card:hover .mil-dot { background: var(--gold); }

  /* footer bar */
  .mil-footer-bar {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(107,26,42,.07);
  }
  .mil-footer-text {
    font-family: 'DM Sans', sans-serif;
    font-size: .78rem;
    color: var(--warm-gray);
    white-space: nowrap;
  }
  .mil-footer-text strong { color: var(--charcoal); font-weight: 500; }
  .mil-footer-line {
    flex: 1; height: 1px;
    background: rgba(107,26,42,.07);
  }

  /* error */
  .mil-error {
    text-align: center;
    padding: 4rem 2rem;
    background: var(--cream2);
    border-radius: 20px;
    border: 1px solid rgba(107,26,42,.1);
  }
  .mil-error-icon {
    width: 52px; height: 52px;
    border-radius: 50%;
    background: rgba(107,26,42,.08);
    border: 1px solid rgba(107,26,42,.18);
    color: var(--burgundy);
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.6rem;
    font-weight: 600;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 1rem;
  }
  .mil-error-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--charcoal);
    margin-bottom: .5rem;
  }
  .mil-error-msg {
    font-family: 'DM Sans', sans-serif;
    font-size: .85rem;
    color: var(--warm-gray);
    margin-bottom: 1.5rem;
    font-weight: 300;
  }
  .mil-error-btn {
    font-family: 'DM Sans', sans-serif;
    font-size: .78rem;
    font-weight: 500;
    letter-spacing: .08em;
    text-transform: uppercase;
    background: var(--gold);
    color: var(--charcoal);
    border: none;
    padding: .65rem 1.6rem;
    border-radius: 2rem;
    cursor: pointer;
    transition: background .25s, transform .2s;
  }
  .mil-error-btn:hover { background: var(--gold-lt); transform: translateY(-1px); }

  @media (max-width: 900px) { .mil-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 560px) { .mil-grid { grid-template-columns: 1fr; } }
`;

const skeletonCSS = baseCSS + `
  .mil-loading {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.3rem;
    padding: 2rem;
    background: var(--cream2);
    border-radius: 20px;
  }
  .mil-skeleton-card {
    background: var(--card-bg);
    border: 1px solid rgba(107,26,42,.07);
    border-radius: 16px;
    overflow: hidden;
  }
  .mil-skeleton-body { padding: 1rem 1.1rem 1.2rem; }
  .mil-skeleton {
    background: linear-gradient(90deg,
      rgba(107,26,42,.05) 25%,
      rgba(107,26,42,.1)  50%,
      rgba(107,26,42,.05) 75%
    );
    background-size: 200% 100%;
    animation: milShimmer 1.6s ease-in-out infinite;
    border-radius: 8px;
  }
  @keyframes milShimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  .mil-sk-img    { height: 175px; border-radius: 0; }
  .mil-sk-title  { height: 18px; width: 70%; margin-bottom: .6rem; }
  .mil-sk-line   { height: 12px; width: 100%; margin-bottom: .4rem; }
  .mil-sk-short  { width: 55%; }
  .mil-sk-footer { height: 12px; width: 40%; margin-top: .8rem; }

  @media (max-width: 900px) { .mil-loading { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 560px) { .mil-loading { grid-template-columns: 1fr; } }
`;