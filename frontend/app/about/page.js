// app/about/page.js
import Link from "next/link";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function About() {
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

        /* ── shared ── */
        .ab-eyebrow {
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
        .ab-eyebrow::before {
          content: '';
          display: inline-block;
          width: 22px; height: 1px;
          background: var(--gold);
        }
        .ab-sec-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 400;
          line-height: 1.12;
          color: var(--charcoal);
        }
        .ab-sec-title em { font-style: italic; color: var(--burgundy); }
        .ab-body-text {
          font-family: 'DM Sans', sans-serif;
          font-size: .98rem;
          font-weight: 300;
          color: var(--warm-gray);
          line-height: 1.78;
        }
        .ab-btn-outline {
          display: inline-flex;
          align-items: center;
          gap: .4rem;
          margin-top: 2rem;
          font-family: 'DM Sans', sans-serif;
          font-size: .8rem;
          font-weight: 500;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: var(--burgundy);
          border: 1px solid rgba(107,26,42,.25);
          padding: .65rem 1.6rem;
          border-radius: 2rem;
          text-decoration: none;
          transition: border-color .25s, background .25s, transform .2s;
        }
        .ab-btn-outline:hover {
          border-color: var(--burgundy);
          background: rgba(107,26,42,.04);
          transform: translateY(-1px);
        }

        /* ─────────────────────────
           HERO INTRO SECTION
        ───────────────────────── */
        .ab-intro {
          background: var(--charcoal);
          padding: 9rem 1.5rem 6rem;
          position: relative;
          overflow: hidden;
        }
        .ab-intro::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #1C1612 0%, #3D1A12 50%, #6B1A2A 100%);
          opacity: .96;
        }
        .ab-intro-pattern {
          position: absolute; inset: 0;
          opacity: .032;
          background-image: repeating-linear-gradient(45deg,#C9965A 0,#C9965A 1px,transparent 0,transparent 50%);
          background-size: 20px 20px;
          pointer-events: none;
        }
        .ab-intro-orb {
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle,rgba(201,150,90,.12) 0%,transparent 70%);
          top: -100px; right: -80px;
          pointer-events: none;
        }
        .ab-intro-inner {
          position: relative; z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }

        /* image + contact float */
        .ab-img-wrap {
          position: relative;
          height: 480px;
          border-radius: 20px;
          overflow: hidden;
        }
        .ab-img-wrap img {
          transition: transform .7s cubic-bezier(.22,1,.36,1) !important;
        }
        .ab-img-wrap:hover img { transform: scale(1.05) !important; }
        .ab-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top,rgba(107,26,42,.35) 0%,transparent 55%);
          pointer-events: none;
        }
        .ab-contact-float {
          position: absolute;
          bottom: 1.5rem; left: 1.5rem;
          background: rgba(250,247,242,.95);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 16px;
          padding: 1.4rem 1.6rem;
          width: 255px;
          box-shadow: 0 20px 60px rgba(0,0,0,.3);
          border: 1px solid rgba(201,150,90,.2);
          transition: transform .35s, box-shadow .35s;
        }
        .ab-contact-float:hover {
          transform: translateY(-4px);
          box-shadow: 0 28px 72px rgba(0,0,0,.35);
        }
        .ab-contact-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem; font-weight: 600;
          color: var(--charcoal);
          margin-bottom: .85rem;
        }
        .ab-contact-row {
          display: flex; align-items: flex-start; gap: .65rem;
          margin-bottom: .6rem;
        }
        .ab-contact-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--gold);
          flex-shrink: 0; margin-top: .28rem;
        }
        .ab-contact-text {
          font-family: 'DM Sans', sans-serif;
          font-size: .76rem; color: var(--warm-gray); line-height: 1.5;
        }

        /* text col */
        .ab-intro-text .ab-eyebrow { color: var(--gold-lt); }
        .ab-intro-text .ab-eyebrow::before { background: var(--gold-lt); }
        .ab-intro-text .ab-sec-title { color: #FAF7F2; }
        .ab-intro-text .ab-sec-title em { color: var(--gold-lt); }
        .ab-intro-text .ab-body-text { color: rgba(250,247,242,.52); }
        .ab-btn-outline-lt {
          display: inline-flex;
          align-items: center;
          gap: .4rem;
          margin-top: 2rem;
          font-family: 'DM Sans', sans-serif;
          font-size: .78rem; font-weight: 500;
          letter-spacing: .08em; text-transform: uppercase;
          color: var(--gold);
          border-bottom: 1px solid rgba(201,150,90,.35);
          padding-bottom: .2rem;
          text-decoration: none;
          transition: border-color .2s, gap .25s;
        }
        .ab-btn-outline-lt:hover { border-color: var(--gold); gap: .75rem; }

        /* ─────────────────────────
          VIDEO BANNER
        ───────────────────────── */
        .ab-banner-wrap {
          background: var(--cream2);
          padding: 4rem 1.5rem;
        }
        .ab-banner {
          max-width: 1100px; margin: 0 auto;
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          height: 420px;
        }
        .ab-banner img {
          transition: transform .7s cubic-bezier(.22,1,.36,1) !important;
        }
        .ab-banner:hover img { transform: scale(1.03) !important; }
        .ab-banner-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top,rgba(28,22,18,.55) 0%,rgba(28,22,18,.18) 100%);
          pointer-events: none;
        }
        .ab-banner-content {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center; padding: 2rem;
          z-index: 1;
        }
        .ab-play-btn {
          width: 68px; height: 68px;
          border-radius: 50%;
          background: rgba(250,247,242,.15);
          border: 2px solid rgba(250,247,242,.4);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          margin-bottom: 1.6rem;
          font-size: 1.2rem; color: #FAF7F2;
          transition: background .3s, border-color .3s, transform .3s;
          position: relative;
        }
        .ab-play-btn::after {
          content: '';
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          border: 1px solid rgba(250,247,242,.2);
          animation: playRipple 2.5s ease-out infinite;
        }
        @keyframes playRipple {
          0%   { transform: scale(1); opacity: .6; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .ab-play-btn:hover {
          background: var(--gold);
          border-color: var(--gold);
          transform: scale(1.1);
        }
        .ab-banner-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3.5vw, 3rem);
          font-weight: 300;
          color: #FAF7F2;
          line-height: 1.2;
          max-width: 600px;
          text-shadow: 0 2px 20px rgba(0,0,0,.3);
        }
        .ab-banner-title em { font-style: italic; color: var(--gold-lt); }

        /* ─────────────────────────
           FEATURES ROW
        ───────────────────────── */
        .ab-features {
          background: var(--cream);
          padding: 4rem 1.5rem;
        }
        .ab-features-inner {
          max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(3,1fr);
          gap: 1.5rem;
        }
        .ab-feat-card {
          background: var(--card-bg);
          border: 1px solid rgba(107,26,42,.08);
          border-radius: 16px;
          padding: 2rem 1.6rem;
          display: flex; gap: 1.2rem;
          transition: transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s, border-color .3s;
          cursor: pointer;
        }
        .ab-feat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 18px 50px rgba(107,26,42,.1);
          border-color: rgba(107,26,42,.16);
        }
        .ab-feat-icon {
          width: 50px; height: 50px;
          flex-shrink: 0;
          border-radius: 12px;
          background: linear-gradient(135deg,rgba(107,26,42,.06),rgba(201,150,90,.1));
          border: 1px solid rgba(201,150,90,.2);
          display: flex; align-items: center; justify-content: center;
          transition: transform .3s, border-color .3s;
        }
        .ab-feat-card:hover .ab-feat-icon {
          transform: scale(1.1) rotate(-4deg);
          border-color: var(--gold);
        }
        .ab-feat-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem; font-weight: 600;
          color: var(--charcoal);
          margin-bottom: .35rem;
          transition: color .25s;
        }
        .ab-feat-card:hover .ab-feat-title { color: var(--burgundy); }
        .ab-feat-text {
          font-family: 'DM Sans', sans-serif;
          font-size: .81rem; font-weight: 300;
          color: var(--warm-gray); line-height: 1.65;
        }

        /* ─────────────────────────
           DETAILS / STATS
        ───────────────────────── */
        .ab-details {
          background: var(--charcoal);
          padding: 5rem 1.5rem;
          position: relative; overflow: hidden;
        }
        .ab-details::before {
          content: '';
          position: absolute; inset: 0;
          background-image: repeating-linear-gradient(45deg,rgba(201,150,90,.025) 0,rgba(201,150,90,.025) 1px,transparent 0,transparent 50%);
          background-size: 28px 28px;
          pointer-events: none;
        }
        .ab-details-inner {
          position: relative; z-index: 1;
          max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 6rem; align-items: center;
        }
        .ab-details-text .ab-eyebrow { color: var(--gold-lt); }
        .ab-details-text .ab-eyebrow::before { background: var(--gold-lt); }
        .ab-details-text .ab-sec-title { color: #FAF7F2; }
        .ab-details-text .ab-sec-title em { color: var(--gold-lt); }
        .ab-details-text .ab-body-text { color: rgba(250,247,242,.5); }

        /* stats grid */
        .ab-stats-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 1rem; margin-top: 2.5rem;
        }
        .ab-stat-card {
          background: rgba(250,247,242,.04);
          border: 1px solid rgba(250,247,242,.08);
          border-radius: 14px;
          padding: 1.5rem 1.2rem;
          text-align: center;
          transition: background .3s, border-color .3s, transform .3s;
          cursor: default;
        }
        .ab-stat-card:hover {
          background: rgba(201,150,90,.07);
          border-color: rgba(201,150,90,.25);
          transform: translateY(-3px);
        }
        .ab-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.2rem; font-weight: 600;
          color: var(--gold-lt); line-height: 1;
          margin-bottom: .3rem;
        }
        .ab-stat-label {
          font-family: 'DM Sans', sans-serif;
          font-size: .72rem; font-weight: 400;
          letter-spacing: .1em; text-transform: uppercase;
          color: rgba(250,247,242,.4);
        }

        /* details image */
        .ab-details-img {
          position: relative; height: 460px;
          border-radius: 20px; overflow: hidden;
        }
        .ab-details-img img {
          transition: transform .7s cubic-bezier(.22,1,.36,1) !important;
        }
        .ab-details-img:hover img { transform: scale(1.05) !important; }
        .ab-details-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top,rgba(107,26,42,.3) 0%,transparent 55%);
          pointer-events: none;
        }

        /* ─────────────────────────
          TESTIMONIALS
        ───────────────────────── */
        .ab-testi {
          background: var(--cream2);
          padding: 5rem 1.5rem;
        }
        .ab-testi-inner { max-width: 1100px; margin: 0 auto; }
        .ab-testi-header {
          text-align: center; margin-bottom: 3rem;
        }
        .ab-testi-grid {
          display: grid; grid-template-columns: repeat(3,1fr);
          gap: 1.4rem;
        }
        .ab-testi-card {
          background: var(--card-bg);
          border: 1px solid rgba(107,26,42,.08);
          border-radius: 16px; padding: 2rem;
          position: relative; overflow: hidden;
          cursor: pointer;
          transition: transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s, border-color .3s;
        }
        .ab-testi-card::before {
          content: '\u201C';
          position: absolute; top: -8px; right: 1.2rem;
          font-family: 'Cormorant Garamond', serif;
          font-size: 7rem; color: rgba(107,26,42,.06);
          line-height: 1; pointer-events: none;
        }
        .ab-testi-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 18px 50px rgba(107,26,42,.11);
          border-color: rgba(107,26,42,.16);
        }
        .ab-testi-stars { display: flex; gap: 3px; margin-bottom: .9rem; }
        .ab-star { color: var(--gold); font-size: .82rem; }
        .ab-testi-quote {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem; font-style: italic;
          color: var(--burgundy); margin-bottom: .8rem; line-height: 1.35;
        }
        .ab-testi-text {
          font-family: 'DM Sans', sans-serif;
          font-size: .82rem; font-weight: 300;
          color: var(--warm-gray); line-height: 1.72;
          margin-bottom: 1.4rem;
        }
        .ab-testi-author {
          display: flex; align-items: center; gap: .85rem;
          border-top: 1px solid rgba(107,26,42,.07);
          padding-top: 1.1rem;
        }
        .ab-testi-avatar {
          width: 42px; height: 42px;
          border-radius: 50%; overflow: hidden; flex-shrink: 0;
          border: 2px solid rgba(201,150,90,.25);
        }
        .ab-testi-name {
          font-family: 'DM Sans', sans-serif;
          font-size: .86rem; font-weight: 500; color: var(--charcoal);
        }
        .ab-testi-loc {
          font-family: 'DM Sans', sans-serif;
          font-size: .73rem; color: var(--warm-gray); margin-top: .1rem;
        }

        /* responsive */
        @media (max-width: 900px) {
          .ab-intro-inner, .ab-details-inner { grid-template-columns: 1fr; gap: 3rem; }
          .ab-intro { padding: 7rem 1.5rem 4rem; }
          .ab-features-inner { grid-template-columns: 1fr; }
          .ab-testi-grid { grid-template-columns: 1fr; }
          .ab-img-wrap { height: 340px; }
          .ab-contact-float { position: static; width: 100%; margin-top: 1rem; }
        }
        @media (max-width: 640px) {
          .ab-stats-grid { grid-template-columns: 1fr 1fr; }
          .ab-testi-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ─────────────────────────────────────────
          HERO INTRO
      ───────────────────────────────────────── */}
      <section className="ab-intro">
        <div className="ab-intro-pattern" />
        <div className="ab-intro-orb" />
        <div className="ab-intro-inner">

          {/* image + contact float */}
          <div>
            <div className="ab-img-wrap">
              <Image
                src="/images/steak-and-eggs.jpg"
                alt="About us"
                fill
                className="object-cover"
                priority
              />
              <div className="ab-img-overlay" />
              <div className="ab-contact-float">
                <div className="ab-contact-title">Come &amp; Visit Us</div>
                {[
                  "(414) 857 – 0107",
                  "Bistrobliss@restaurant.com",
                  "837 W. Marshall Lane, Los Angeles",
                ].map((info) => (
                  <div key={info} className="ab-contact-row">
                    <span className="ab-contact-dot" />
                    <span className="ab-contact-text">{info}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* text */}
          <div className="ab-intro-text">
            <div className="ab-eyebrow">Our Story</div>
            <h1 className="ab-sec-title">
              We provide <em>healthy food</em><br />for your family.
            </h1>
            <p className="ab-body-text" style={{ marginTop: '1rem' }}>
              Our story began with a vision to create a unique dining experience
              that merges fine dining, exceptional service, and a vibrant
              ambiance. Rooted in the city&apos;s rich culinary culture, we honour
              our local roots while infusing a global palate. At Bistro Bliss,
              dining is not just about food — it&apos;s about the whole experience.
            </p>
            <a href="#about-details" className="ab-btn-outline-lt">
              More About Us →
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          VIDEO BANNER
      ───────────────────────────────────────── */}
      <div className="ab-banner-wrap">
        <div className="ab-banner">
          <Image
            src="/images/bistro-interior-vid.jpg"
            alt="Bistro interior"
            fill
            className="object-cover"
            priority
          />
          <div className="ab-banner-overlay" />
          <div className="ab-banner-content">
            <button type="button" aria-label="Play video" className="ab-play-btn">▶</button>
            <h2 className="ab-banner-title">
              Feel the <em>authentic</em> &amp; original<br />taste from us
            </h2>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────
          FEATURES ROW
      ───────────────────────────────────────── */}
      <section className="ab-features">
        <div className="ab-features-inner">
          {[
            { t: "Multi Cuisine",  icon: "/icons/menu.svg",      desc: "A world of flavours on a single menu — from intimate small plates to grand seasonal feasts." },
            { t: "Easy To Order",  icon: "/icons/calendar.svg",  desc: "Reserve your table or place an order in seconds, online or through your favourite delivery app." },
            { t: "Fast Delivery",  icon: "/icons/clock2.svg",    desc: "Hot, fresh food at your door within 30 minutes — every time, without compromise." },
          ].map((f) => (
            <div key={f.t} className="ab-feat-card">
              <div className="ab-feat-icon">
                <Image src={f.icon} alt={f.t} width={26} height={26} className="object-contain" />
              </div>
              <div>
                <div className="ab-feat-title">{f.t}</div>
                <p className="ab-feat-text">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────
          DETAILS + STATS
      ───────────────────────────────────────── */}
      <section id="about-details" className="ab-details" style={{ scrollMarginTop: '6rem' }}>
        <div className="ab-details-inner">

          {/* text + stats */}
          <div className="ab-details-text">
            <div className="ab-eyebrow">By the Numbers</div>
            <h2 className="ab-sec-title">
              A little information<br />for our <em>valued guests</em>
            </h2>
            <p className="ab-body-text" style={{ marginTop: '1rem' }}>
              At Bistro Bliss, we believe that dining is not just about food, but
              also about the overall experience. Our staff strives to make every
              visit an unforgettable event.
            </p>

            <div className="ab-stats-grid">
              {[
                { num: "3",    label: "Locations"           },
                { num: "1995", label: "Founded"             },
                { num: "65+",  label: "Staff Members"       },
                { num: "100%", label: "Satisfied Customers" },
              ].map(({ num, label }) => (
                <div key={label} className="ab-stat-card">
                  <div className="ab-stat-num">{num}</div>
                  <div className="ab-stat-label">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* image */}
          <div className="ab-details-img">
            <Image
              src="/images/guy-making-salad.jpg"
              alt="Restaurant team"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
            <div className="ab-details-img-overlay" />
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          TESTIMONIALS
      ───────────────────────────────────────── */}
      <section className="ab-testi">
        <div className="ab-testi-inner">
          <div className="ab-testi-header">
            <div className="ab-eyebrow" style={{ justifyContent: 'center' }}>
              <span style={{ display:'inline-block', width:22, height:1, background:'var(--gold)', marginRight:'.55rem' }} />
              Guest Reviews
            </div>
            <h2 className="ab-sec-title">
              What Our <em>Customers</em> Say
            </h2>
          </div>

          <div className="ab-testi-grid">
            {[
              {
                q: "The best restaurant",
                n: "Sophie Robson", c: "Los Angeles, CA", img: "/images/sophie.jpg",
                review: "An absolutely exceptional dining experience. Every dish was crafted with care, and the ambiance made the evening truly special. We'll be back.",
              },
              {
                q: "Simply delicious",
                n: "Matt Cannon", c: "San Diego, CA", img: "/images/matt.jpg",
                review: "The flavors were extraordinary — each bite felt like a story told with passion. The staff was warm, attentive, and genuinely delightful.",
              },
              {
                q: "One of a kind",
                n: "Andy Smith", c: "San Francisco, CA", img: "/images/andy.jpg",
                review: "Nowhere else in the city matches the care put into every plate. Bistro Bliss has raised the bar for what a restaurant experience should feel like.",
              },
            ].map((t, i) => (
              <div key={t.n} className="ab-testi-card">
                <div className="ab-testi-stars">
                  {"★★★★★".split("").map((s, j) => <span key={j} className="ab-star">{s}</span>)}
                </div>
                <div className="ab-testi-quote">{t.q}</div>
                <p className="ab-testi-text">{t.review}</p>
                <div className="ab-testi-author">
                  <div className="ab-testi-avatar">
                    <Image src={t.img} alt={t.n} width={42} height={42} className="object-cover w-full h-full" />
                  </div>
                  <div>
                    <div className="ab-testi-name">{t.n}</div>
                    <div className="ab-testi-loc">{t.c}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}