import BookingForm from "../../components/Booking/BookingForm";
import Footer from "@/components/Footer";

export const metadata = { title: "Book A Table • Happy Tummy" };

export default function BookATablePage() {
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
        .bt-hero {
          background: var(--charcoal);
          padding: 9rem 1.5rem 5rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .bt-hero::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, #1C1612 0%, #3D1A12 50%, #6B1A2A 100%);
          opacity: .96;
        }
        .bt-hero-pattern {
          position: absolute; inset: 0;
          opacity: .032;
          background-image: repeating-linear-gradient(45deg,#C9965A 0,#C9965A 1px,transparent 0,transparent 50%);
          background-size: 20px 20px;
          pointer-events: none;
        }
        .bt-hero-orb {
          position: absolute;
          width: 480px; height: 480px; border-radius: 50%;
          background: radial-gradient(circle,rgba(201,150,90,.13) 0%,transparent 70%);
          top: -100px; right: -60px; pointer-events: none;
        }
        .bt-hero-orb2 {
          position: absolute;
          width: 320px; height: 320px; border-radius: 50%;
          background: radial-gradient(circle,rgba(107,26,42,.35) 0%,transparent 70%);
          bottom: -60px; left: -60px; pointer-events: none;
        }
        .bt-hero-inner {
          position: relative; z-index: 1;
          max-width: 700px; margin: 0 auto;
        }
        .bt-eyebrow {
          display: inline-flex; align-items: center; gap: .55rem;
          font-family: 'DM Sans', sans-serif;
          font-size: .72rem; font-weight: 500;
          letter-spacing: .2em; text-transform: uppercase;
          color: var(--gold); margin-bottom: .75rem;
        }
        .bt-eyebrow::before, .bt-eyebrow::after {
          content: '';
          display: inline-block; width: 22px; height: 1px;
          background: var(--gold); opacity: .65;
        }
        .bt-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.8rem, 6vw, 5rem);
          font-weight: 300; line-height: 1.05;
          color: #FAF7F2; margin-bottom: 1rem;
        }
        .bt-hero-title em { font-style: italic; color: var(--gold-lt); }
        .bt-hero-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: .98rem; font-weight: 300;
          color: rgba(250,247,242,.48);
          max-width: 440px; margin: 0 auto;
          line-height: 1.78;
        }

        /* info pills row */
        .bt-info-row {
          display: flex; align-items: center; justify-content: center;
          gap: 1.5rem; margin-top: 2.2rem; flex-wrap: wrap;
        }
        .bt-info-pill {
          display: flex; align-items: center; gap: .5rem;
          font-family: 'DM Sans', sans-serif;
          font-size: .78rem; font-weight: 400;
          color: rgba(250,247,242,.5);
          background: rgba(250,247,242,.05);
          border: 1px solid rgba(250,247,242,.1);
          padding: .45rem 1rem; border-radius: 2rem;
        }
        .bt-info-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--gold); flex-shrink: 0;
        }

        /* ── form + map section ── */
        /* map + form overlay container */
        .bt-map-section {
          position: relative;
          width: 100%;
        }

        /* map fills the full section height */
        .bt-map-wrap {
          width: 100%;
          height: 780px;
          overflow: hidden;
          line-height: 0;
        }
        .bt-map-wrap iframe {
          display: block;
          width: 100%;
          height: 100%;
          border: 0;
          filter: grayscale(25%) contrast(1.05) saturate(.85);
          transition: filter .5s;
        }
        .bt-map-wrap:hover iframe {
          filter: grayscale(0%) contrast(1) saturate(1);
        }

        /* dark gradient vignette so form reads clearly over map */
        .bt-map-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(28,22,18,.55) 0%,
            rgba(28,22,18,.35) 40%,
            rgba(28,22,18,.45) 100%
          );
          pointer-events: none;
        }

        /* form floats centred over the map */
        .bt-form-floater {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem 1.5rem;
          z-index: 10;
        }
        .bt-form-floater > * {
          width: 100%;
          max-width: 820px;
        }

        /* ── contact strip ── */
        .bt-contact-strip {
          background: var(--charcoal);
          padding: 4rem 1.5rem;
          position: relative; overflow: hidden;
        }
        .bt-contact-strip::before {
          content: '';
          position: absolute; inset: 0;
          background-image: repeating-linear-gradient(45deg,rgba(201,150,90,.025) 0,rgba(201,150,90,.025) 1px,transparent 0,transparent 50%);
          background-size: 28px 28px; pointer-events: none;
        }
        .bt-contact-inner {
          position: relative; z-index: 1;
          max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(3,1fr);
          gap: 1.5rem;
        }
        .bt-contact-card {
          background: rgba(250,247,242,.04);
          border: 1px solid rgba(250,247,242,.08);
          border-radius: 16px; padding: 1.8rem 1.6rem;
          transition: background .3s, border-color .3s, transform .3s;
          cursor: default;
        }
        .bt-contact-card:hover {
          background: rgba(201,150,90,.07);
          border-color: rgba(201,150,90,.22);
          transform: translateY(-3px);
        }
        .bt-contact-card-icon {
          font-size: 1.4rem; margin-bottom: .9rem;
          transition: transform .3s;
        }
        .bt-contact-card:hover .bt-contact-card-icon { transform: scale(1.15); }
        .bt-contact-card-label {
          font-family: 'DM Sans', sans-serif;
          font-size: .68rem; font-weight: 500;
          letter-spacing: .15em; text-transform: uppercase;
          color: var(--gold); margin-bottom: .5rem;
        }
        .bt-contact-card-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem; font-weight: 400;
          color: #FAF7F2; line-height: 1.4;
        }

        @media (max-width: 768px) {
          .bt-hero { padding-bottom: 5rem; }
          .bt-map-wrap { height: auto; min-height: 100%; }
          .bt-map-section { min-height: 900px; }
          .bt-map-wrap iframe { height: 100%; min-height: 900px; }
          .bt-form-floater { align-items: flex-start; padding: 2.5rem 1rem; }
          .bt-contact-inner { grid-template-columns: 1fr; }
          .bt-info-row { gap: .75rem; }
        }
      `}</style>

      <main style={{ background: 'var(--cream2)' }}>

        {/* ─────────────────────────────────────────
            HERO
        ───────────────────────────────────────── */}
        <section className="bt-hero">
          <div className="bt-hero-pattern" />
          <div className="bt-hero-orb" />
          <div className="bt-hero-orb2" />
          <div className="bt-hero-inner">
            <div className="bt-eyebrow">Reservations</div>
            <h1 className="bt-hero-title">
              Book <em>A Table</em>
            </h1>
            <p className="bt-hero-sub">
              Reserve your seat at Happy Tummy and let us craft an
              unforgettable dining experience just for you.
            </p>
            <div className="bt-info-row">
              {[
                "Open 7 days a week",
                "Lunch & Dinner sittings",
                "Groups welcome",
              ].map((t) => (
                <div key={t} className="bt-info-pill">
                  <span className="bt-info-dot" />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────
            MAP + FLOATING FORM OVERLAY
        ───────────────────────────────────────── */}
        <div className="bt-map-section">
          {/* map fills the full section */}
          <div className="bt-map-wrap">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3232.0256862168667!2d14.510911975697194!3d35.89738657251826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x130e455ac49e4e83%3A0xa6dcb924d0102933!2sBistro%20Bliss!5e0!3m2!1sen!2seg!4v1755341065083!5m2!1sen!2seg"
              allowFullScreen=""
              loading="eager"
              referrerPolicy="no-referrer-when-downgrade"
              title="Happy Tummy location"
            />
          </div>

          {/* dark vignette so form reads clearly */}
          <div className="bt-map-overlay" />

          {/* booking form centred over the map */}
          <div className="bt-form-floater">
            <BookingForm />
          </div>
        </div>

        {/* ─────────────────────────────────────────
            CONTACT STRIP
        ───────────────────────────────────────── */}
        <section className="bt-contact-strip">
          <div className="bt-contact-inner">
            <div className="bt-contact-card">
              <div className="bt-contact-card-icon">📞</div>
              <div className="bt-contact-card-label">Phone</div>
              <div className="bt-contact-card-value">(414) 857 – 0107</div>
            </div>
            <div className="bt-contact-card">
              <div className="bt-contact-card-icon">✉️</div>
              <div className="bt-contact-card-label">Email</div>
              <div className="bt-contact-card-value">happy.tummy@restaurant.com</div>
            </div>
            <div className="bt-contact-card">
              <div className="bt-contact-card-icon">📍</div>
              <div className="bt-contact-card-label">Address</div>
              <div className="bt-contact-card-value">837 W. Marshall Lane,<br />Los Angeles, CA</div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}