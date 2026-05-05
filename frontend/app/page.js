// app/page.js
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import { articles } from ".//pages/articles";

export default function Home() {
  return (
    <>
      {/* ─── GOOGLE FONTS ─── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --cream:        #FAF7F2;
          --cream2:       #F2EDE4;
          --burgundy:     #6B1A2A;
          --burgundy-lt:  #8B2A3E;
          --burgundy-dk:  #4A1019;
          --gold:         #C9965A;
          --gold-lt:      #E8B87A;
          --charcoal:     #1C1612;
          --warm-gray:    #8C7B6B;
          --body-text:    #3D2E24;
          --card-bg:      #FFFCF8;
        }

        /* ── scroll-reveal ── */
        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity .7s cubic-bezier(.22,1,.36,1),
                      transform .7s cubic-bezier(.22,1,.36,1);
        }
        .reveal.visible { opacity: 1; transform: none; }

        /* ── section eyebrow ── */
        .eyebrow {
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
        .eyebrow::before {
          content: '';
          display: inline-block;
          width: 22px;
          height: 1px;
          background: var(--gold);
        }

        /* ── shared section title ── */
        .sec-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 400;
          line-height: 1.12;
          color: var(--charcoal);
        }
        .sec-title em { font-style: italic; color: var(--burgundy); }

        /* ── primary button ── */
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: .4rem;
          background: var(--gold);
          color: var(--charcoal);
          font-family: 'DM Sans', sans-serif;
          font-size: .85rem;
          font-weight: 500;
          letter-spacing: .05em;
          padding: .8rem 2rem;
          border-radius: 2rem;
          text-decoration: none;
          transition: background .25s, transform .25s, box-shadow .25s;
        }
        .btn-primary:hover {
          background: var(--gold-lt);
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(201,150,90,.35);
        }

        /* ── outline button (dark bg) ── */
        .btn-outline-dark {
          display: inline-flex;
          align-items: center;
          font-family: 'DM Sans', sans-serif;
          font-size: .82rem;
          font-weight: 500;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: var(--gold);
          text-decoration: none;
          border-bottom: 1px solid rgba(201,150,90,.4);
          padding-bottom: .2rem;
          transition: border-color .2s, gap .25s;
          gap: .4rem;
        }
        .btn-outline-dark:hover { border-color: var(--gold); gap: .75rem; }

        /* ── hero ghost button ── */
        .btn-hero-ghost {
          display: inline-flex;
          align-items: center;
          font-family: 'DM Sans', sans-serif;
          font-size: .9rem;
          font-weight: 400;
          color: #FAF7F2;
          border: 1px solid rgba(250,247,242,.3);
          padding: .8rem 2rem;
          border-radius: 2rem;
          text-decoration: none;
          transition: border-color .25s, background .25s, transform .25s;
        }
        .btn-hero-ghost:hover {
          border-color: #FAF7F2;
          background: rgba(250,247,242,.07);
          transform: translateY(-2px);
        }

        /* ── outline button (light bg) ── */
        .btn-outline-light {
          display: inline-flex;
          align-items: center;
          gap: .4rem;
          font-family: 'DM Sans', sans-serif;
          font-size: .82rem;
          font-weight: 500;
          letter-spacing: .06em;
          text-transform: uppercase;
          color: var(--burgundy);
          text-decoration: none;
          border: 1px solid rgba(107,26,42,.25);
          padding: .65rem 1.5rem;
          border-radius: 2rem;
          transition: border-color .2s, background .2s, transform .2s;
        }
        .btn-outline-light:hover {
          border-color: var(--burgundy);
          background: rgba(107,26,42,.04);
          transform: translateY(-1px);
        }

        /* ── stats bar ── */
        .stats-bar {
          background: var(--burgundy);
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        .stat-item {
          padding: 1.75rem 2rem;
          text-align: center;
          position: relative;
          transition: background .25s;
        }
        .stat-item + .stat-item { border-left: 1px solid rgba(255,255,255,.12); }
        .stat-item:hover { background: rgba(255,255,255,.06); }
        .stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.4rem;
          font-weight: 600;
          color: #FAF7F2;
          line-height: 1;
        }
        .stat-label {
          font-family: 'DM Sans', sans-serif;
          font-size: .7rem;
          font-weight: 400;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: rgba(250,247,242,.5);
          margin-top: .3rem;
        }

        /* ── menu cards ── */
        .menu-card {
          background: var(--card-bg);
          border: 1px solid rgba(107,26,42,.08);
          border-radius: 16px;
          padding: 2rem 1.5rem;
          text-align: center;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: border-color .35s, transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s;
        }
        .menu-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(107,26,42,.03), rgba(201,150,90,.04));
          opacity: 0;
          transition: opacity .35s;
        }
        .menu-card:hover::before { opacity: 1; }
        .menu-card:hover {
          border-color: rgba(107,26,42,.2);
          transform: translateY(-6px);
          box-shadow: 0 20px 55px rgba(107,26,42,.12);
        }
        .menu-icon-wrap {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--cream2), var(--cream));
          border: 1px solid rgba(201,150,90,.2);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.2rem;
          transition: transform .35s, border-color .35s, background .35s;
        }
        .menu-card:hover .menu-icon-wrap {
          transform: scale(1.1) rotate(5deg);
          border-color: var(--gold);
          background: linear-gradient(135deg, rgba(107,26,42,.06), rgba(201,150,90,.1));
        }
        .menu-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--charcoal);
          margin-bottom: .4rem;
        }
        .menu-card-text {
          font-family: 'DM Sans', sans-serif;
          font-size: .82rem;
          color: var(--warm-gray);
          line-height: 1.65;
          font-weight: 300;
        }
        .menu-card-link {
          display: inline-block;
          margin-top: 1rem;
          font-family: 'DM Sans', sans-serif;
          font-size: .75rem;
          font-weight: 500;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: var(--burgundy);
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: border-color .2s, color .2s;
        }
        .menu-card:hover .menu-card-link { border-color: var(--burgundy); }

        /* ── contact float card ── */
        .contact-float {
          position: absolute;
          bottom: 1.5rem;
          right: -1rem;
          width: 250px;
          background: rgba(250,247,242,.96);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 16px;
          padding: 1.4rem 1.6rem;
          box-shadow: 0 20px 60px rgba(0,0,0,.25);
          border: 1px solid rgba(201,150,90,.2);
          transition: transform .35s, box-shadow .35s;
        }
        .contact-float:hover {
          transform: translateY(-4px);
          box-shadow: 0 28px 72px rgba(0,0,0,.3);
        }
        .contact-float-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem;
          font-weight: 600;
          color: var(--charcoal);
          margin-bottom: .9rem;
        }
        .contact-row {
          display: flex;
          align-items: flex-start;
          gap: .65rem;
          margin-bottom: .6rem;
        }
        .contact-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--gold);
          flex-shrink: 0;
          margin-top: .3rem;
        }
        .contact-row-text {
          font-family: 'DM Sans', sans-serif;
          font-size: .76rem;
          color: var(--warm-gray);
          line-height: 1.5;
        }

        /* ── service cards ── */
        .service-card {
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          height: 280px;
          cursor: pointer;
          transition: transform .4s cubic-bezier(.22,1,.36,1), box-shadow .4s;
        }
        .service-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 30px 80px rgba(107,26,42,.2);
        }
        .service-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(28,22,18,.88) 0%, rgba(28,22,18,.1) 55%, transparent 100%);
        }
        .service-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.4rem;
        }
        .service-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem;
          font-weight: 600;
          color: #FAF7F2;
          margin-bottom: .2rem;
        }
        .service-text {
          font-family: 'DM Sans', sans-serif;
          font-size: .76rem;
          color: rgba(250,247,242,.55);
          font-weight: 300;
        }

        /* ── feature list (delivery) ── */
        .feature-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: .9rem 1.1rem;
          border-radius: 12px;
          background: var(--card-bg);
          border: 1px solid rgba(107,26,42,.06);
          transition: border-color .25s, box-shadow .25s, transform .25s;
          cursor: pointer;
        }
        .feature-item:hover {
          border-color: rgba(107,26,42,.18);
          box-shadow: 0 4px 18px rgba(107,26,42,.08);
          transform: translateX(4px);
        }
        .feature-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: linear-gradient(135deg, rgba(107,26,42,.06), rgba(201,150,90,.08));
          border: 1px solid rgba(201,150,90,.2);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform .25s;
        }
        .feature-item:hover .feature-icon { transform: scale(1.1) rotate(-3deg); }
        .feature-text {
          font-family: 'DM Sans', sans-serif;
          font-size: .88rem;
          color: var(--body-text);
        }

        /* ── testimonial cards ── */
        .testi-card {
          background: rgba(250,247,242,.06);
          border: 1px solid rgba(250,247,242,.1);
          border-radius: 16px;
          padding: 2rem;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          position: relative;
          overflow: hidden;
          transition: background .3s, border-color .3s, transform .3s;
          cursor: pointer;
        }
        .testi-card::before {
          content: '\u201C';
          position: absolute;
          top: -10px;
          right: 1.2rem;
          font-family: 'Cormorant Garamond', serif;
          font-size: 7rem;
          color: rgba(201,150,90,.12);
          line-height: 1;
          pointer-events: none;
        }
        .testi-card:hover {
          background: rgba(250,247,242,.1);
          border-color: rgba(201,150,90,.28);
          transform: translateY(-4px);
        }
        .testi-quote {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          font-style: italic;
          color: var(--gold-lt);
          margin-bottom: .9rem;
          line-height: 1.35;
        }
        .testi-text {
          font-family: 'DM Sans', sans-serif;
          font-size: .83rem;
          color: rgba(250,247,242,.55);
          line-height: 1.72;
          font-weight: 300;
          margin-bottom: 1.4rem;
        }
        .testi-author {
          display: flex;
          align-items: center;
          gap: .8rem;
          border-top: 1px solid rgba(250,247,242,.1);
          padding-top: 1.1rem;
        }
        .testi-avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
          border: 2px solid rgba(201,150,90,.3);
        }
        .testi-name {
          font-family: 'DM Sans', sans-serif;
          font-size: .86rem;
          font-weight: 500;
          color: #FAF7F2;
        }
        .testi-loc {
          font-family: 'DM Sans', sans-serif;
          font-size: .74rem;
          color: rgba(250,247,242,.4);
          margin-top: .1rem;
        }
        .star-row { display: flex; gap: 3px; margin-bottom: .9rem; }
        .star { color: var(--gold); font-size: .82rem; }

        /* ── blog cards ── */
        .blog-featured-card {
          background: var(--card-bg);
          border: 1px solid rgba(107,26,42,.08);
          border-radius: 20px;
          overflow: hidden;
          display: block;
          text-decoration: none;
          transition: transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s;
        }
        .blog-featured-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 65px rgba(107,26,42,.14);
        }
        .blog-small-card {
          background: var(--card-bg);
          border: 1px solid rgba(107,26,42,.08);
          border-radius: 16px;
          overflow: hidden;
          display: block;
          text-decoration: none;
          transition: transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s;
        }
        .blog-small-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(107,26,42,.12);
        }
        .blog-tag {
          display: inline-block;
          font-family: 'DM Sans', sans-serif;
          font-size: .68rem;
          font-weight: 500;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: var(--gold);
          background: rgba(201,150,90,.1);
          border: 1px solid rgba(201,150,90,.2);
          border-radius: 20px;
          padding: .18rem .65rem;
          margin-bottom: .6rem;
        }
        .blog-date {
          font-family: 'DM Sans', sans-serif;
          font-size: .74rem;
          color: var(--warm-gray);
          margin-bottom: .4rem;
        }
        .blog-title-lg {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--charcoal);
          line-height: 1.35;
        }
        .blog-excerpt {
          font-family: 'DM Sans', sans-serif;
          font-size: .81rem;
          color: var(--warm-gray);
          line-height: 1.65;
          margin-top: .45rem;
          font-weight: 300;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .blog-title-sm {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem;
          font-weight: 600;
          color: var(--charcoal);
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .stats-bar { grid-template-columns: repeat(2, 1fr); }
          .stat-item + .stat-item { border-left: none; }
          .stat-item:nth-child(3), .stat-item:nth-child(4) { border-top: 1px solid rgba(255,255,255,.12); }
          .stat-item:nth-child(2) { border-left: 1px solid rgba(255,255,255,.12); }
          .stat-item:nth-child(4) { border-left: 1px solid rgba(255,255,255,.12); }
        }
      `}</style>

      {/* ─────────────────────────────────────────
          HERO
      ───────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#1C1612]">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-main.jpg"
            alt="Hero background"
            fill
            priority
            className="object-cover opacity-40"
          />
          {/* rich dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1C1612]/80 via-[#3D1A12]/60 to-[#6B1A2A]/70" />
          {/* subtle dot pattern */}
          <div
            className="absolute inset-0 opacity-[.04]"
            style={{
              backgroundImage: "repeating-linear-gradient(45deg,#C9965A 0,#C9965A 1px,transparent 0,transparent 50%)",
              backgroundSize: "20px 20px",
            }}
          />
          {/* ambient glow orbs */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 560, height: 560,
              top: -100, right: -80,
              background: "radial-gradient(circle, rgba(201,150,90,.15) 0%, transparent 70%)",
              animation: "orbPulse 7s ease-in-out infinite",
            }}
          />
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 380, height: 380,
              bottom: -80, left: -60,
              background: "radial-gradient(circle, rgba(107,26,42,.4) 0%, transparent 70%)",
              animation: "orbPulse 9s ease-in-out infinite 2s",
            }}
          />
        </div>

        <style>{`
          @keyframes orbPulse {
            0%,100% { transform: scale(1); opacity: .6; }
            50%      { transform: scale(1.18); opacity: 1; }
          }
          @keyframes heroFadeUp {
            from { opacity: 0; transform: translateY(30px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .hero-eyebrow { animation: heroFadeUp .8s ease .15s both; }
          .hero-h1      { animation: heroFadeUp .9s ease .35s both; }
          .hero-sub     { animation: heroFadeUp .9s ease .55s both; }
          .hero-btns    { animation: heroFadeUp .9s ease .75s both; }
          .hero-scroll  { animation: heroFadeUp 1s ease 1.1s both; }
          @keyframes scrollBar {
            0%,100% { opacity: .35; transform: scaleY(.7); }
            50%     { opacity: 1;   transform: scaleY(1);  }
          }
        `}</style>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-32">
          <div
            className="hero-eyebrow inline-flex items-center gap-2 mb-5"
            style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".74rem", letterSpacing: ".2em", textTransform: "uppercase", color: "#C9965A" }}
          >
            <span style={{ display: "inline-block", width: 28, height: 1, background: "#C9965A", opacity: .7 }} />
            Est. 2018 · Los Angeles
            <span style={{ display: "inline-block", width: 28, height: 1, background: "#C9965A", opacity: .7 }} />
          </div>

          <h1
            className="hero-h1"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(3.4rem, 8vw, 8rem)",
              fontWeight: 300,
              lineHeight: 1,
              color: "#FAF7F2",
              marginBottom: "1rem",
            }}
          >
            Best food for<br />
            <em style={{ fontStyle: "italic", color: "#E8B87A" }}>your taste</em>
          </h1>

          <p
            className="hero-sub"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1.05rem",
              fontWeight: 300,
              color: "rgba(250,247,242,.58)",
              maxWidth: 420,
              lineHeight: 1.75,
              marginBottom: "2.4rem",
            }}
          >
            Discover delectable cuisine and unforgettable moments in our
            welcoming culinary haven.
          </p>

          <div className="hero-btns flex flex-col sm:flex-row gap-3">
            <Link href="/book-a-table" className="btn-primary">
              Book A Table →
            </Link>
            <Link href="/menu" className="btn-hero-ghost">
              Explore Menu
            </Link>
          </div>
        </div>

        {/* scroll indicator */}
        <div
          className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ fontFamily: "'DM Sans',sans-serif", fontSize: ".68rem", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(250,247,242,.35)" }}
        >
          <div
            style={{
              width: 1, height: 44,
              background: "linear-gradient(to bottom, rgba(250,247,242,.4), transparent)",
              animation: "scrollBar 2.2s ease-in-out infinite",
            }}
          />
          Scroll
        </div>
      </section>

      {/* ─────────────────────────────────────────
          STATS BAR
      ───────────────────────────────────────── */}
      <div className="stats-bar">
        {[
          { num: "12+", label: "Years of Excellence" },
          { num: "240+", label: "Menu Items" },
          { num: "50K+", label: "Happy Guests" },
          { num: "4.9★", label: "Average Rating" },
        ].map((s) => (
          <div key={s.label} className="stat-item">
            <div className="stat-num">{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ─────────────────────────────────────────
          BROWSE OUR MENU
      ───────────────────────────────────────── */}
      <section style={{ background: "var(--cream)", padding: "5rem 1.5rem" }}>
        <div className="mx-auto max-w-6xl">
          <div className="text-center reveal visible">
            <div className="eyebrow" style={{ justifyContent: "center" }}>Curated Selection</div>
            <h2 className="sec-title">Browse Our <em>Menu</em></h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Breakfast",   icon: "/icons/tea.svg",   desc: "Rise and shine with handcrafted morning plates, from silky eggs to artisan pastries." },
              { title: "Main Dishes", icon: "/icons/bowl.svg",  desc: "Signature mains crafted by our chefs using only the freshest seasonal ingredients." },
              { title: "Drinks",      icon: "/icons/drink.svg", desc: "From artisanal cocktails to rare teas, every sip is a carefully curated experience." },
              { title: "Desserts",    icon: "/icons/cake.svg",  desc: "House-made desserts that turn every meal into a sweet, memorable celebration." },
            ].map((x, i) => (
              <div
                key={x.title}
                className="menu-card reveal visible"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="menu-icon-wrap">
                  <Image
                    src={x.icon}
                    alt={`${x.title} icon`}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <div className="menu-card-title">{x.title}</div>
                <p className="menu-card-text">{x.desc}</p>
                <Link href="/menu" className="menu-card-link">
                  Explore Menu →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          WE PROVIDE HEALTHY FOOD
      ───────────────────────────────────────── */}
      <section style={{ background: "var(--charcoal)", padding: "5rem 1.5rem", overflow: "hidden" }}>
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* image + contact float */}
          <div className="reveal visible">
            <div className="relative rounded-3xl overflow-hidden group" style={{ height: 460 }}>
              <Image
                src="/images/healthy1.jpg"
                alt="Restaurant interior"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
              {/* gold-tinted overlay */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(107,26,42,.35) 0%, transparent 60%)" }} />

              <div className="contact-float">
                <div className="contact-float-title">Come &amp; Visit Us</div>
                {[
                  "(414) 857 – 0107",
                  "Bistrobliss@restaurant.com",
                  "837 W. Marshall Lane, Los Angeles",
                ].map((info) => (
                  <div key={info} className="contact-row">
                    <span className="contact-dot" />
                    <span className="contact-row-text">{info}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* text */}
          <div className="reveal visible" style={{ transitionDelay: ".2s" }}>
            <div className="eyebrow" style={{ color: "var(--gold-lt)" }}>
              <span style={{ display: "inline-block", width: 22, height: 1, background: "var(--gold-lt)", marginRight: ".55rem" }} />
              Our Story
            </div>
            <h2 className="sec-title" style={{ color: "#FAF7F2" }}>
              We provide <em style={{ color: "var(--gold-lt)" }}>healthy food</em><br />for your family.
            </h2>
            <p
              className="mt-4"
              style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", fontWeight: 300, color: "rgba(250,247,242,.55)", lineHeight: 1.75, maxWidth: 480 }}
            >
              Our story began with a vision to create a unique dining experience
              that merges fine dining, exceptional service, and a vibrant
              ambiance. Rooted in the city&apos;s rich culinary culture.
            </p>
            <Link href="/about" className="btn-outline-dark mt-8">
              More About Us →
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          UNIQUE SERVICES
      ───────────────────────────────────────── */}
      <section style={{ background: "var(--cream2)", padding: "5rem 1.5rem" }}>
        <div className="mx-auto max-w-6xl">
          <div className="reveal visible">
            <div className="eyebrow">What We Offer</div>
            <h2 className="sec-title">
              Unique services for<br />your <em>events</em>
            </h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Caterings", image: "/images/kebab setup.jpg",    desc: "Professional setups for any occasion" },
              { title: "Birthdays", image: "/images/birthday girl.jpg",  desc: "Make every birthday unforgettable" },
              { title: "Weddings",  image: "/images/wedding couple.jpg", desc: "Elegant dining for your special day" },
              { title: "Events",    image: "/images/friends.jpg",        desc: "Corporate & private gatherings" },
            ].map((item, i) => (
              <div
                key={item.title}
                className="service-card reveal visible"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="service-overlay" />
                <div className="service-content">
                  <div className="service-title">{item.title}</div>
                  <div className="service-text">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          DELIVERY HIGHLIGHT
      ───────────────────────────────────────── */}
      <section style={{ background: "var(--cream)", padding: "5rem 1.5rem" }}>
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

          {/* photo collage */}
          <div className="grid grid-cols-2 gap-3 reveal visible" style={{ gridTemplateRows: "1fr 1fr", height: 420 }}>
            {/* tall left cell */}
            <div className="row-span-2 rounded-2xl overflow-hidden relative group">
              <Image
                src="/images/chef.jpg"
                alt="Chef preparing food"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            {/* top right */}
            <div className="rounded-2xl overflow-hidden relative group">
              <Image
                src="/images/shrimp.jpg"
                alt="Shrimp dish"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            {/* bottom right */}
            <div className="rounded-2xl overflow-hidden relative group">
              <Image
                src="/images/kebab 2.jpg"
                alt="Kebab dish"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </div>

          {/* text + features */}
          <div className="reveal visible" style={{ transitionDelay: ".2s" }}>
            <div className="eyebrow">Fast &amp; Fresh</div>
            <h2 className="sec-title">
              Fastest Food<br /><em>Delivery</em> in City
            </h2>
            <p
              className="mt-3"
              style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "1rem", fontWeight: 300, color: "var(--warm-gray)", lineHeight: 1.75, maxWidth: 440 }}
            >
              Hot, fresh, and right on time — because great food should never
              be kept waiting.
            </p>

            <ul className="mt-6 flex flex-col gap-3">
              {[
                { text: "Delivery within 30 minutes, guaranteed", icon: "/icons/clock.svg" },
                { text: "Best offers & competitive prices",        icon: "/icons/offer.svg" },
                { text: "Online ordering — easy, fast, seamless", icon: "/icons/shopping-cart.svg" },
              ].map((item) => (
                <li key={item.text} className="feature-item">
                  <div className="feature-icon">
                    <Image src={item.icon} alt="" width={20} height={20} className="object-contain" />
                  </div>
                  <span className="feature-text">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          TESTIMONIALS
      ───────────────────────────────────────── */}
      <section
        style={{
          background: "linear-gradient(135deg, var(--burgundy-dk) 0%, var(--burgundy) 100%)",
          padding: "5rem 1.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* subtle pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, rgba(201,150,90,.025) 0, rgba(201,150,90,.025) 1px, transparent 0, transparent 50%)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative mx-auto max-w-6xl">
          <div className="text-center reveal visible">
            <div className="eyebrow" style={{ color: "var(--gold-lt)", justifyContent: "center" }}>
              <span style={{ display: "inline-block", width: 22, height: 1, background: "var(--gold-lt)", marginRight: ".55rem" }} />
              Guest Reviews
            </div>
            <h2 className="sec-title" style={{ color: "#FAF7F2" }}>
              What Our <em style={{ color: "var(--gold-lt)" }}>Customers</em> Say
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
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
              <div key={t.n} className="testi-card reveal visible" style={{ transitionDelay: `${i * 0.15}s` }}>
                <div className="star-row">
                  {"★★★★★".split("").map((s, j) => <span key={j} className="star">{s}</span>)}
                </div>
                <div className="testi-quote">{t.q}</div>
                <p className="testi-text">{t.review}</p>
                <div className="testi-author">
                  <div className="testi-avatar">
                    <Image src={t.img} alt={t.n} width={42} height={42} className="object-cover w-full h-full" />
                  </div>
                  <div>
                    <div className="testi-name">{t.n}</div>
                    <div className="testi-loc">{t.c}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          BLOG & ARTICLES
      ───────────────────────────────────────── */}
      <section style={{ background: "var(--cream2)", padding: "5rem 1.5rem" }}>
        <div className="mx-auto max-w-6xl">

          {/* header */}
          <div className="flex items-end justify-between mb-12 reveal visible">
            <div>
              <div className="eyebrow">From the Kitchen</div>
              <h2 className="sec-title">Our Blog &amp; <em>Articles</em></h2>
            </div>
            <Link href="/pages" className="btn-primary hidden md:inline-flex">
              Read All Articles →
            </Link>
          </div>

          {(() => {
            const firstFive = articles.slice(0, 5);
            const [featured, ...rest] = firstFive;

            return (
              <div className="grid gap-5 md:grid-cols-3">
                {/* Featured card */}
                <Link href={`/pages/${featured.slug}`} className="blog-featured-card reveal visible">
                  <div className="relative overflow-hidden" style={{ height: 220 }}>
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 hover:scale-[1.06]"
                      priority
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(28,22,18,.3) 0%, transparent 60%)" }} />
                  </div>
                  <div className="p-5">
                    <div className="blog-tag">Featured</div>
                    <div className="blog-date">{featured.date}</div>
                    <div className="blog-title-lg">{featured.title}</div>
                    {featured.excerpt && (
                      <p className="blog-excerpt">{featured.excerpt}</p>
                    )}
                  </div>
                </Link>

                {/* 4 small cards */}
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {rest.slice(0, 4).map((a, i) => (
                    <Link
                      key={a.slug}
                      href={`/pages/${a.slug}`}
                      className="blog-small-card reveal visible"
                      style={{ transitionDelay: `${i * 0.1}s` }}
                    >
                      <div className="relative overflow-hidden" style={{ height: 140 }}>
                        <Image
                          src={a.image}
                          alt={a.title}
                          fill
                          sizes="(min-width: 640px) 50vw, 100vw"
                          className="object-cover transition-transform duration-500 hover:scale-[1.07]"
                        />
                      </div>
                      <div className="p-4">
                        <div className="blog-date">{a.date}</div>
                        <div className="blog-title-sm">{a.title}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* ─────────────────────────────────────────
          SCROLL-REVEAL OBSERVER
      ───────────────────────────────────────── */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(){
              var io = new IntersectionObserver(function(entries){
                entries.forEach(function(e){
                  if(e.isIntersecting) e.target.classList.add('visible');
                });
              },{threshold:0.1,rootMargin:'0px 0px -40px 0px'});
              document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
            })();
          `,
        }}
      />

      <Footer />
    </>
  );
}
