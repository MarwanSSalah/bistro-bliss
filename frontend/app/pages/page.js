// app/pages/page.js
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import { articles } from "./articles";

export default function PagesSection() {
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

        /* ── hero ── */
        .bp-hero {
          background: var(--charcoal);
          padding: 9rem 1.5rem 5rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .bp-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #1C1612 0%, #3D1A12 55%, #6B1A2A 100%);
          opacity: .96;
        }
        .bp-hero-pattern {
          position: absolute;
          inset: 0;
          opacity: .032;
          background-image: repeating-linear-gradient(45deg, #C9965A 0, #C9965A 1px, transparent 0, transparent 50%);
          background-size: 20px 20px;
          pointer-events: none;
        }
        .bp-hero-orb {
          position: absolute;
          width: 480px; height: 480px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,150,90,.12) 0%, transparent 70%);
          top: -120px; right: -80px;
          pointer-events: none;
        }
        .bp-hero-orb2 {
          position: absolute;
          width: 320px; height: 320px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(107,26,42,.35) 0%, transparent 70%);
          bottom: -60px; left: -60px;
          pointer-events: none;
        }
        .bp-hero-inner { position: relative; z-index: 1; }

        /* ── eyebrow ── */
        .bp-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: .55rem;
          font-family: 'DM Sans', sans-serif;
          font-size: .72rem;
          font-weight: 500;
          letter-spacing: .2em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: .7rem;
        }
        .bp-eyebrow::before, .bp-eyebrow::after {
          content: '';
          display: inline-block;
          width: 22px; height: 1px;
          background: var(--gold);
          opacity: .65;
        }

        /* ── hero title ── */
        .bp-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.6rem, 5vw, 4.2rem);
          font-weight: 300;
          line-height: 1.08;
          color: #FAF7F2;
          margin-bottom: .9rem;
        }
        .bp-hero-title em { font-style: italic; color: var(--gold-lt); }
        .bp-hero-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          font-weight: 300;
          color: rgba(250,247,242,.48);
          max-width: 420px;
          margin: 0 auto;
          line-height: 1.75;
        }

        /* ── stats strip ── */
        .bp-stats {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 3rem;
          margin-top: 2.8rem;
          flex-wrap: wrap;
        }
        .bp-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 600;
          color: #FAF7F2;
          line-height: 1;
        }
        .bp-stat-label {
          font-family: 'DM Sans', sans-serif;
          font-size: .68rem;
          font-weight: 400;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: rgba(250,247,242,.4);
          margin-top: .2rem;
          text-align: center;
        }
        .bp-stat-divider {
          width: 1px; height: 36px;
          background: rgba(250,247,242,.1);
        }

        /* ── body / grid wrapper ── */
        .bp-body {
          background: var(--cream2);
          padding: 5rem 1.5rem 6rem;
        }
        .bp-body-inner {
          max-width: 1100px;
          margin: 0 auto;
        }

        /* ── section label row ── */
        .bp-label-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 2.8rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .bp-section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.9rem, 3vw, 2.6rem);
          font-weight: 400;
          color: var(--charcoal);
          line-height: 1.1;
        }
        .bp-section-title em { font-style: italic; color: var(--burgundy); }
        .bp-count {
          font-family: 'DM Sans', sans-serif;
          font-size: .8rem;
          font-weight: 400;
          color: var(--warm-gray);
          letter-spacing: .04em;
        }

        /* ── featured first card ── */
        .bp-featured {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          background: var(--card-bg);
          border: 1px solid rgba(107,26,42,.08);
          border-radius: 20px;
          overflow: hidden;
          margin-bottom: 1.5rem;
          text-decoration: none;
          transition: transform .4s cubic-bezier(.22,1,.36,1), box-shadow .4s;
        }
        .bp-featured:hover {
          transform: translateY(-5px);
          box-shadow: 0 24px 65px rgba(107,26,42,.14);
        }
        .bp-featured-img {
          position: relative;
          min-height: 300px;
          overflow: hidden;
        }
        .bp-featured-img img {
          transition: transform .55s cubic-bezier(.22,1,.36,1) !important;
        }
        .bp-featured:hover .bp-featured-img img { transform: scale(1.06) !important; }
        .bp-featured-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(28,22,18,.12) 0%, transparent 60%);
        }
        .bp-featured-body {
          padding: 2.5rem 2.2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .bp-feat-tag {
          display: inline-block;
          font-family: 'DM Sans', sans-serif;
          font-size: .68rem;
          font-weight: 500;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: var(--gold);
          background: rgba(201,150,90,.1);
          border: 1px solid rgba(201,150,90,.22);
          border-radius: 20px;
          padding: .22rem .75rem;
          margin-bottom: .9rem;
          width: fit-content;
        }
        .bp-feat-date {
          font-family: 'DM Sans', sans-serif;
          font-size: .75rem;
          color: var(--warm-gray);
          margin-bottom: .55rem;
        }
        .bp-feat-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.65rem;
          font-weight: 600;
          color: var(--charcoal);
          line-height: 1.3;
          margin-bottom: .8rem;
          transition: color .25s;
        }
        .bp-featured:hover .bp-feat-title { color: var(--burgundy); }
        .bp-feat-excerpt {
          font-family: 'DM Sans', sans-serif;
          font-size: .85rem;
          color: var(--warm-gray);
          line-height: 1.7;
          font-weight: 300;
          margin-bottom: 1.5rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .bp-read-link {
          font-family: 'DM Sans', sans-serif;
          font-size: .75rem;
          font-weight: 500;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: var(--burgundy);
          border-bottom: 1px solid transparent;
          padding-bottom: .15rem;
          transition: border-color .2s, color .2s;
          width: fit-content;
        }
        .bp-featured:hover .bp-read-link { border-color: var(--burgundy); }

        /* ── regular card grid ── */
        .bp-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.3rem;
        }
        .bp-card {
          background: var(--card-bg);
          border: 1px solid rgba(107,26,42,.08);
          border-radius: 16px;
          overflow: hidden;
          display: block;
          text-decoration: none;
          transition: transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s, border-color .3s;
        }
        .bp-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 18px 50px rgba(107,26,42,.12);
          border-color: rgba(107,26,42,.16);
        }
        .bp-card-img {
          position: relative;
          height: 150px;
          overflow: hidden;
        }
        .bp-card-img img {
          transition: transform .5s cubic-bezier(.22,1,.36,1) !important;
        }
        .bp-card:hover .bp-card-img img { transform: scale(1.08) !important; }
        .bp-card-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(28,22,18,.18) 0%, transparent 55%);
        }
        .bp-card-body { padding: 1.1rem 1.15rem 1.3rem; }
        .bp-card-date {
          font-family: 'DM Sans', sans-serif;
          font-size: .72rem;
          color: var(--warm-gray);
          margin-bottom: .35rem;
        }
        .bp-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--charcoal);
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color .25s;
        }
        .bp-card:hover .bp-card-title { color: var(--burgundy); }
        .bp-card-arrow {
          display: inline-block;
          margin-top: .65rem;
          font-family: 'DM Sans', sans-serif;
          font-size: .7rem;
          font-weight: 500;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: var(--gold);
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity .25s, transform .25s;
        }
        .bp-card:hover .bp-card-arrow { opacity: 1; transform: translateX(0); }

        /* responsive */
        @media (max-width: 1024px) { .bp-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px) {
          .bp-featured { grid-template-columns: 1fr; }
          .bp-featured-img { min-height: 220px; }
          .bp-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) { .bp-grid { grid-template-columns: 1fr; } }
      `}</style>

      {/* ─────────────────────────────────────────
          HERO
      ───────────────────────────────────────── */}
      <section className="bp-hero">
        <div className="bp-hero-pattern" />
        <div className="bp-hero-orb" />
        <div className="bp-hero-orb2" />
        <div className="bp-hero-inner">
          <div className="bp-eyebrow">From the Kitchen</div>
          <h1 className="bp-hero-title">
            Our Blog &amp;<br /><em>Articles</em>
          </h1>
          <p className="bp-hero-sub">
            Stories, recipes, and culinary insights straight from our kitchen
            — curated for the curious palate.
          </p>

          {/* stats strip */}
          <div className="bp-stats">
            <div>
              <div className="bp-stat-num">{articles.length}+</div>
              <div className="bp-stat-label">Articles</div>
            </div>
            <div className="bp-stat-divider" />
            <div>
              <div className="bp-stat-num">6</div>
              <div className="bp-stat-label">Categories</div>
            </div>
            <div className="bp-stat-divider" />
            <div>
              <div className="bp-stat-num">Weekly</div>
              <div className="bp-stat-label">New Posts</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          ARTICLES GRID
      ───────────────────────────────────────── */}
      <section className="bp-body">
        <div className="bp-body-inner">

          {/* label row */}
          <div className="bp-label-row">
            <div>
              <div className="bp-eyebrow" style={{ justifyContent: 'flex-start' }}>
                <span style={{ display: 'inline-block', width: 22, height: 1, background: 'var(--gold)', marginRight: '.55rem' }} />
                Latest Posts
              </div>
              <h2 className="bp-section-title">All <em>Articles</em></h2>
            </div>
            <span className="bp-count">{articles.length} articles published</span>
          </div>

          {/* Featured first article */}
          {articles.length > 0 && (() => {
            const [featured, ...rest] = articles;
            return (
              <>
                <Link href={`/pages/${featured.slug}`} className="bp-featured">
                  <div className="bp-featured-img">
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 55vw, 100vw"
                      priority
                    />
                    <div className="bp-featured-img-overlay" />
                  </div>
                  <div className="bp-featured-body">
                    <span className="bp-feat-tag">Featured</span>
                    <div className="bp-feat-date">{featured.date}</div>
                    <div className="bp-feat-title">{featured.title}</div>
                    {featured.excerpt && (
                      <p className="bp-feat-excerpt">{featured.excerpt}</p>
                    )}
                    <span className="bp-read-link">Read Article →</span>
                  </div>
                </Link>

                {/* remaining cards */}
                <div className="bp-grid">
                  {rest.map((a) => (
                    <Link key={a.slug} href={`/pages/${a.slug}`} className="bp-card">
                      <div className="bp-card-img">
                        <Image
                          src={a.image}
                          alt={a.title}
                          fill
                          className="object-cover"
                          sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                        />
                        <div className="bp-card-img-overlay" />
                      </div>
                      <div className="bp-card-body">
                        <div className="bp-card-date">{a.date}</div>
                        <div className="bp-card-title">{a.title}</div>
                        <span className="bp-card-arrow">Read →</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            );
          })()}

        </div>
      </section>

      <Footer />
    </>
  );
}