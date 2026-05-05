'use client';

import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/Footer';
import { useState } from 'react';

/* ─────────────────────────────────────────
   MENU ITEM CARD
───────────────────────────────────────── */
function MenuCard({ item }) {
  return (
    <div className="ht-menu-card">
      <div className="ht-menu-card-img">
        <Image
          src={item.image || '/images/pizza.jpg'}
          alt={item.name || item.title}
          fill
          className="ht-menu-card-photo"
          unoptimized
        />
        <div className="ht-menu-card-overlay" />
        <div className="ht-menu-badge">${Number(item.price).toFixed(2)}</div>
      </div>
      <div className="ht-menu-card-body">
        <div className="ht-menu-card-name">{item.name || item.title}</div>
        <p className="ht-menu-card-desc">
          {item.description || 'Made with fresh, hand-selected ingredients by our kitchen team.'}
        </p>
        <button className="ht-menu-card-btn">Add to Order →</button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MENU GRID SECTION
───────────────────────────────────────── */
function MenuGrid({ title, items }) {
  const sectionId = title.toLowerCase().replace(/\s+/g, '-');
  return (
    <div id={sectionId} className="ht-menu-section">
      <div className="ht-menu-section-header">
        <span className="ht-eyebrow">{title}</span>
        <h2 className="ht-section-title">
          {title === 'All' ? <>Full <em>Menu</em></> : <em>{title}</em>}
        </h2>
      </div>
      <div className="ht-menu-grid">
        {items.map((item) => (
          <MenuCard key={item.id ?? item.name} item={item} />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function MenuPage() {
  const [activeSection, setActiveSection] = useState('all');

  const menuSections = [
    { label: 'All',         id: 'all'        },
    { label: 'Breakfast',   id: 'breakfast'  },
    { label: 'Main Dishes', id: 'main-dishes'},
    { label: 'Desserts',    id: 'desserts'   },
  ];

  const handleScroll = (id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: y, behavior: 'smooth' });
      history.replaceState(null, '', `#${id}`);
    }
  };

  const fallbackItems = [
    { id: 'fried-eggs',   name: 'Fried Eggs',          price: 9.99,  image: '/images/fried-eggs.jpg'         },
    { id: 'hawaiian',     name: 'Hawaiian Pizza',       price: 15.99, image: '/images/pizza.jpg'              },
    { id: 'martinis',     name: 'Martinez Cocktail',    price: 7.25,  image: '/images/martinis.jpg'           },
    { id: 'cake',         name: 'Butterscotch Cake',    price: 20.99, image: '/images/cheese-cake.jpg'        },
    { id: 'lemonade',     name: 'Mint Lemonade',        price: 5.89,  image: '/images/lemonade.jpg'           },
    { id: 'icecream',     name: 'Chocolate Icecream',   price: 18.05, image: '/images/chocolate-icecream.jpg' },
    { id: 'burger',       name: 'Cheese Burger',        price: 12.55, image: '/images/cheese-burger.jpg'      },
    { id: 'waffles',      name: 'Classic Waffles',      price: 12.99, image: '/images/waffles.jpg'            },
    { id: 'shrimp',       name: 'Garlic Shrimp',        price: 16.50, image: '/images/shrimp.jpg'             },
    { id: 'sushi',        name: 'Sushi Platter',        price: 22.00, image: '/images/sushi.jpg'              },
    { id: 'breakfast',    name: 'Hearty Breakfast',     price: 10.95, image: '/images/breakfast.jpg'          },
  ];

  const breakfastItems = fallbackItems.filter(i =>
    ['breakfast','egg','waffle'].some(w => i.name.toLowerCase().includes(w))
  );
  const mainDishes = fallbackItems.filter(i =>
    ['pizza','burger','shrimp','sushi'].some(w => i.name.toLowerCase().includes(w))
  );
  const desserts = fallbackItems.filter(i =>
    ['cake','icecream'].some(w => i.name.toLowerCase().includes(w))
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --cream:       #FAF7F2;
          --cream2:      #F2EDE4;
          --burgundy:    #6B1A2A;
          --burgundy-lt: #8B2A3E;
          --burgundy-dk: #4A1019;
          --gold:        #C9965A;
          --gold-lt:     #E8B87A;
          --charcoal:    #1C1612;
          --warm-gray:   #8C7B6B;
          --body-text:   #3D2E24;
          --card-bg:     #FFFCF8;
        }

        /* ── hero banner ── */
        .ht-menu-hero {
          background: var(--charcoal);
          padding: 9rem 1.5rem 5rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .ht-menu-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #1C1612 0%, #3D1A12 50%, #6B1A2A 100%);
          opacity: .95;
        }
        .ht-menu-hero-pattern {
          position: absolute;
          inset: 0;
          opacity: .035;
          background-image: repeating-linear-gradient(45deg, #C9965A 0, #C9965A 1px, transparent 0, transparent 50%);
          background-size: 20px 20px;
          pointer-events: none;
        }
        .ht-menu-hero-orb {
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,150,90,.12) 0%, transparent 70%);
          top: -140px; right: -100px;
          pointer-events: none;
        }
        .ht-menu-hero-content { position: relative; z-index: 1; }

        /* ── eyebrow ── */
        .ht-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: .55rem;
          font-family: 'DM Sans', sans-serif;
          font-size: .72rem;
          font-weight: 500;
          letter-spacing: .2em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: .65rem;
        }
        .ht-eyebrow::before {
          content: '';
          display: inline-block;
          width: 22px; height: 1px;
          background: var(--gold);
        }

        /* ── section title ── */
        .ht-section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.2rem, 4vw, 3.2rem);
          font-weight: 300;
          line-height: 1.1;
          color: #FAF7F2;
          margin-bottom: 0;
        }
        .ht-section-title em { font-style: italic; color: var(--gold-lt); }
        .ht-section-title.dark { color: var(--charcoal); }
        .ht-section-title.dark em { color: var(--burgundy); }

        /* ── filter pills ── */
        .ht-filters {
          display: flex;
          flex-wrap: wrap;
          gap: .6rem;
          justify-content: center;
          margin-top: 2.5rem;
        }
        .ht-filter-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: .78rem;
          font-weight: 500;
          letter-spacing: .08em;
          text-transform: uppercase;
          padding: .6rem 1.4rem;
          border-radius: 2rem;
          border: 1px solid rgba(250,247,242,.2);
          background: transparent;
          color: rgba(250,247,242,.6);
          cursor: pointer;
          transition: all .25s;
        }
        .ht-filter-btn:hover {
          border-color: var(--gold);
          color: var(--gold);
          background: rgba(201,150,90,.08);
        }
        .ht-filter-btn.active {
          background: var(--gold);
          border-color: var(--gold);
          color: var(--charcoal);
          box-shadow: 0 4px 16px rgba(201,150,90,.3);
        }

        /* ── menu sections wrapper ── */
        .ht-menu-body {
          background: var(--cream);
          padding: 1rem 0 4rem;
        }

        /* ── individual section ── */
        .ht-menu-section {
          max-width: 1100px;
          margin: 0 auto;
          padding: 4rem 1.5rem 0;
        }
        .ht-menu-section-header {
          margin-bottom: 2.5rem;
        }

        /* ── grid ── */
        .ht-menu-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.4rem;
        }

        /* ── card ── */
        .ht-menu-card {
          background: var(--card-bg);
          border: 1px solid rgba(107,26,42,.08);
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s, border-color .35s;
        }
        .ht-menu-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 55px rgba(107,26,42,.13);
          border-color: rgba(107,26,42,.18);
        }
        .ht-menu-card-img {
          position: relative;
          height: 170px;
          overflow: hidden;
        }
        .ht-menu-card-photo {
          object-fit: cover;
          transition: transform .5s cubic-bezier(.22,1,.36,1);
        }
        .ht-menu-card:hover .ht-menu-card-photo { transform: scale(1.08); }
        .ht-menu-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(28,22,18,.25) 0%, transparent 55%);
        }
        .ht-menu-badge {
          position: absolute;
          top: .75rem;
          right: .75rem;
          background: var(--gold);
          color: var(--charcoal);
          font-family: 'DM Sans', sans-serif;
          font-size: .78rem;
          font-weight: 500;
          padding: .28rem .75rem;
          border-radius: 2rem;
          letter-spacing: .04em;
          box-shadow: 0 2px 10px rgba(201,150,90,.4);
        }
        .ht-menu-card-body { padding: 1.1rem 1.2rem 1.3rem; }
        .ht-menu-card-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--charcoal);
          margin-bottom: .3rem;
          line-height: 1.25;
        }
        .ht-menu-card-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: .78rem;
          color: var(--warm-gray);
          line-height: 1.6;
          font-weight: 300;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          margin-bottom: .9rem;
        }
        .ht-menu-card-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: .72rem;
          font-weight: 500;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: var(--burgundy);
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          border-bottom: 1px solid transparent;
          transition: border-color .2s, color .2s, gap .2s;
        }
        .ht-menu-card:hover .ht-menu-card-btn {
          border-color: var(--burgundy);
          color: var(--burgundy-lt);
        }

        /* ── divider between sections ── */
        .ht-section-divider {
          max-width: 1100px;
          margin: 3rem auto 0;
          padding: 0 1.5rem;
          border: none;
          border-top: 1px solid rgba(107,26,42,.08);
        }

        /* ── delivery apps section ── */
        .ht-apps-section {
          background: var(--charcoal);
          padding: 5rem 1.5rem;
          position: relative;
          overflow: hidden;
        }
        .ht-apps-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(45deg, rgba(201,150,90,.025) 0, rgba(201,150,90,.025) 1px, transparent 0, transparent 50%);
          background-size: 28px 28px;
          pointer-events: none;
        }
        .ht-apps-inner {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 5rem;
          align-items: center;
        }
        .ht-apps-text .ht-section-title { color: #FAF7F2; }
        .ht-apps-text .ht-section-title em { color: var(--gold-lt); }
        .ht-apps-subtitle {
          font-family: 'DM Sans', sans-serif;
          font-size: .95rem;
          font-weight: 300;
          color: rgba(250,247,242,.5);
          line-height: 1.75;
          margin-top: .85rem;
          max-width: 380px;
        }
        .ht-apps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: .85rem;
        }
        .ht-app-tile {
          height: 72px;
          background: rgba(250,247,242,.04);
          border: 1px solid rgba(250,247,242,.08);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background .25s, border-color .25s, transform .25s;
        }
        .ht-app-tile:hover {
          background: rgba(201,150,90,.08);
          border-color: rgba(201,150,90,.3);
          transform: translateY(-3px);
        }

        /* responsive */
        @media (max-width: 1024px) {
          .ht-menu-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .ht-menu-grid { grid-template-columns: repeat(2, 1fr); }
          .ht-apps-inner { grid-template-columns: 1fr; gap: 3rem; }
          .ht-apps-text { text-align: center; }
          .ht-apps-subtitle { margin: .85rem auto 0; }
        }
        @media (max-width: 480px) {
          .ht-menu-grid { grid-template-columns: 1fr; }
          .ht-apps-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      {/* ─────────────────────────────────────────
          HERO BANNER
      ───────────────────────────────────────── */}
      <section className="ht-menu-hero">
        <div className="ht-menu-hero-pattern" />
        <div className="ht-menu-hero-orb" />
        <div className="ht-menu-hero-content">
          <div className="ht-eyebrow" style={{ justifyContent: 'center', color: 'var(--gold)' }}>
            Bistro Bliss
          </div>
          <h1 className="ht-section-title" style={{ marginBottom: '1rem' }}>
            Our <em>Menu</em>
          </h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '1rem',
            fontWeight: 300,
            color: 'rgba(250,247,242,.5)',
            maxWidth: 440,
            margin: '0 auto 2.5rem',
            lineHeight: 1.75,
          }}>
            Crafted with passion, plated with care — every dish tells a story
            of quality and flavour.
          </p>

          {/* Filter pills */}
          <div className="ht-filters">
            {menuSections.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => handleScroll(id)}
                className={`ht-filter-btn${activeSection === id ? ' active' : ''}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          MENU SECTIONS
      ───────────────────────────────────────── */}
      <div className="ht-menu-body">
        <div id="all">
          <MenuGrid title="All" items={fallbackItems} />
        </div>

        <hr className="ht-section-divider" />

        <div id="breakfast">
          <MenuGrid title="Breakfast" items={breakfastItems} />
        </div>

        <hr className="ht-section-divider" />

        <div id="main-dishes">
          <MenuGrid title="Main Dishes" items={mainDishes} />
        </div>

        <hr className="ht-section-divider" />

        <div id="desserts">
          <MenuGrid title="Desserts" items={desserts} />
        </div>
      </div>

      {/* ─────────────────────────────────────────
          DELIVERY APPS
      ───────────────────────────────────────── */}
      <section className="ht-apps-section">
        <div className="ht-apps-inner">
          <div className="ht-apps-text">
            <div className="ht-eyebrow" style={{ color: 'var(--gold-lt)' }}>
              <span style={{ display: 'inline-block', width: 22, height: 1, background: 'var(--gold-lt)', marginRight: '.55rem' }} />
              Order Online
            </div>
            <h2 className="ht-section-title">
              Order through<br /><em>your favourite app</em>
            </h2>
            <p className="ht-apps-subtitle">
              Hot, fresh food delivered right to your door — available on all
              major delivery platforms in your city.
            </p>
          </div>

          <div className="ht-apps-grid">
            {[
              'uber-eats.svg',
              'grubhub.svg',
              'postmates.svg',
              'doordash.svg',
              'foodpanda.svg',
              'deliveroo.svg',
              'instacart.svg',
              'just-eat.svg',
              'didi-food.svg',
            ].map((icon) => (
              <div key={icon} className="ht-app-tile">
                <Image
                  src={`/icons/${icon}`}
                  alt={icon.replace('.svg', '')}
                  width={90}
                  height={36}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}