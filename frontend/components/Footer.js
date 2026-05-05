import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#1C1612", color: "rgba(250,247,242,.55)", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        .ft-root {
          max-width: 1100px;
          margin: 0 auto;
          padding: 5rem 1.5rem 2rem;
        }
        .ft-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr 1.2fr;
          gap: 3rem;
          padding-bottom: 3.5rem;
          border-bottom: 1px solid rgba(250,247,242,.07);
        }

        /* brand col */
        .ft-brand {
          display: flex;
          align-items: center;
          gap: .55rem;
          margin-bottom: .9rem;
          text-decoration: none;
        }
        .ft-brand-icon {
          width: 34px; height: 34px;
          border-radius: 50%;
          background: rgba(107,26,42,.2);
          border: 1px solid rgba(201,150,90,.2);
          display: flex; align-items: center; justify-content: center;
          transition: background .25s, border-color .25s;
        }
        .ft-brand:hover .ft-brand-icon {
          background: rgba(107,26,42,.35);
          border-color: #C9965A;
        }
        .ft-brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.45rem;
          font-weight: 600;
          color: #FAF7F2;
          letter-spacing: .02em;
        }
        .ft-brand-name em { font-style: normal; color: #C9965A; }
        .ft-tagline {
          font-size: .84rem;
          font-weight: 300;
          line-height: 1.7;
          color: rgba(250,247,242,.45);
          max-width: 260px;
          margin-bottom: 1.4rem;
        }

        /* social */
        .ft-socials { display: flex; gap: .6rem; }
        .ft-social {
          width: 36px; height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(250,247,242,.12);
          display: flex; align-items: center; justify-content: center;
          color: rgba(250,247,242,.45);
          cursor: pointer;
          text-decoration: none;
          transition: border-color .25s, color .25s, transform .25s, background .25s;
        }
        .ft-social:hover {
          border-color: #C9965A;
          color: #C9965A;
          background: rgba(201,150,90,.07);
          transform: translateY(-2px);
        }
        .ft-social svg { width: 15px; height: 15px; fill: currentColor; }

        /* nav cols */
        .ft-col-title {
          font-size: .7rem;
          font-weight: 500;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: #C9965A;
          margin-bottom: 1.1rem;
          display: flex;
          align-items: center;
          gap: .5rem;
        }
        .ft-col-title::before {
          content: '';
          display: inline-block;
          width: 16px; height: 1px;
          background: #C9965A;
        }
        .ft-links { list-style: none; display: flex; flex-direction: column; gap: .55rem; }
        .ft-link {
          font-size: .84rem;
          font-weight: 300;
          color: rgba(250,247,242,.4);
          text-decoration: none;
          transition: color .2s, padding-left .2s;
          display: inline-block;
        }
        .ft-link:hover { color: #FAF7F2; padding-left: 4px; }

        /* instagram grid */
        .ft-insta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-top: .25rem;
        }
        .ft-insta-cell {
          aspect-ratio: 1;
          border-radius: 10px;
          overflow: hidden;
          position: relative;
          cursor: pointer;
        }
        .ft-insta-cell::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(107,26,42,.0);
          transition: background .3s;
        }
        .ft-insta-cell:hover::after { background: rgba(201,150,90,.2); }
        .ft-insta-cell img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform .45s cubic-bezier(.22,1,.36,1);
        }
        .ft-insta-cell:hover img { transform: scale(1.08); }

        /* bottom bar */
        .ft-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.75rem;
          font-size: .76rem;
          color: rgba(250,247,242,.25);
          flex-wrap: wrap;
          gap: .75rem;
        }
        .ft-bottom-links { display: flex; gap: 1.5rem; }
        .ft-bottom-link {
          color: rgba(250,247,242,.25);
          text-decoration: none;
          transition: color .2s;
        }
        .ft-bottom-link:hover { color: rgba(250,247,242,.6); }

        @media (max-width: 900px) {
          .ft-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 560px) {
          .ft-grid { grid-template-columns: 1fr; }
          .ft-bottom { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <div className="ft-root">
        <div className="ft-grid">

          {/* ── Brand column ── */}
          <div>
            <Link href="/" className="ft-brand">
              <div className="ft-brand-icon">
                <Image src="/icons/sushi.svg" alt="logo" width={20} height={20} />
              </div>
              <span className="ft-brand-name">Happy <em>Tummy</em></span>
            </Link>
            <p className="ft-tagline">
              A culinary haven in the heart of Los Angeles — where every meal is
              a memory worth keeping.
            </p>

            <div className="ft-socials">
              {/* X / Twitter */}
              <a href="#" className="ft-social" aria-label="X / Twitter">
                <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              {/* Facebook */}
              <a href="#" className="ft-social" aria-label="Facebook">
                <svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              {/* Instagram */}
              <a href="#" className="ft-social" aria-label="Instagram">
                <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              {/* GitHub */}
              <a href="#" className="ft-social" aria-label="GitHub">
                <svg viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            </div>
          </div>

          {/* ── Pages column ── */}
          <div>
            <div className="ft-col-title">Pages</div>
            <ul className="ft-links">
              {["Home","About","Menu","Pricing","Blog","Contact","Delivery"].map((x) => (
                <li key={x}>
                  <Link href={x === "Home" ? "/" : `/${x.toLowerCase()}`} className="ft-link">
                    {x}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Utility column ── */}
          <div>
            <div className="ft-col-title">Utility</div>
            <ul className="ft-links">
              {["Start Here","Styleguide","404 Not Found","Licenses","Changelog","View More"].map((x) => (
                <li key={x}>
                  <a href="#" className="ft-link">{x}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Instagram column ── */}
          <div>
            <div className="ft-col-title">On Instagram</div>
            <div className="ft-insta-grid">
              {[
                { src: "/images/fried-rice-&-eggs.jpg", alt: "Fried Rice & Eggs" },
                { src: "/images/bucket-of-fries.jpg",   alt: "Bucket of Fries"   },
                { src: "/images/fries-salad.jpg",       alt: "Fries Salad"       },
                { src: "/images/waffles-loaded.jpg",    alt: "Loaded Waffles"    },
              ].map(({ src, alt }) => (
                <a href="#" key={alt} className="ft-insta-cell">
                  <Image
                    src={src}
                    alt={alt}
                    width={150}
                    height={150}
                    unoptimized
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="ft-bottom">
          <span>© {new Date().getFullYear()} Bistro Bliss. All rights reserved.</span>
          <div className="ft-bottom-links">
            <a href="#" className="ft-bottom-link">Privacy Policy</a>
            <a href="#" className="ft-bottom-link">Terms of Use</a>
            <a href="#" className="ft-bottom-link">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
