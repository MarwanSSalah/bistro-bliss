"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import NavLink from "./NavLink";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001/api";

export default function Navbar() {
  const [user, setUser]       = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router   = useRouter();
  const pathname = usePathname();

  /* ── auth ── */
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await fetch(`${API_URL}/me`, {
          headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        });
        if (!res.ok) { localStorage.removeItem("token"); return; }
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error("Navbar auth check failed", err);
      }
    };
    fetchUser();
  }, []);

  /* ── scroll detection ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const logout = async () => {
    const token = localStorage.getItem("token");
    try {
      await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
      });
    } catch (_) {}
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  return (
    <>
      <style>{`
        :root {
          --cream:       #FAF7F2;
          --burgundy:    #6B1A2A;
          --burgundy-lt: #8B2A3E;
          --gold:        #C9965A;
          --gold-lt:     #E8B87A;
          --charcoal:    #1C1612;
          --warm-gray:   #8C7B6B;
        }

        .ht-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 2.5rem;
          transition: background .4s ease, padding .4s ease, box-shadow .4s ease;
        }
        .ht-nav.scrolled {
          background: rgba(250, 247, 242, 0.96);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          padding: .85rem 2.5rem;
          box-shadow: 0 1px 0 rgba(107, 26, 42, .08);
        }

        /* logo */
        .ht-logo {
          display: flex;
          align-items: center;
          gap: .55rem;
          text-decoration: none;
          transition: opacity .2s;
        }
        .ht-logo:hover { opacity: .8; }
        .ht-logo-icon {
          width: 34px; height: 34px;
          border-radius: 50%;
          background: rgba(107,26,42,.1);
          border: 1px solid rgba(201,150,90,.25);
          display: flex; align-items: center; justify-content: center;
          transition: background .25s, border-color .25s;
        }
        .ht-nav.scrolled .ht-logo-icon {
          background: rgba(107,26,42,.08);
        }
        .ht-logo:hover .ht-logo-icon {
          background: rgba(107,26,42,.15);
          border-color: var(--gold);
        }
        .ht-logo-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.45rem;
          font-weight: 600;
          color: #FAF7F2;
          letter-spacing: .02em;
          transition: color .4s;
        }
        .ht-nav.scrolled .ht-logo-text { color: var(--charcoal); }
        .ht-logo-text em {
          font-style: normal;
          color: var(--gold);
        }

        /* links */
        .ht-links {
          display: flex;
          align-items: center;
          gap: .25rem;
          list-style: none;
        }
        .ht-link {
          font-family: 'DM Sans', sans-serif;
          font-size: .8rem;
          font-weight: 500;
          letter-spacing: .08em;
          text-transform: uppercase;
          text-decoration: none;
          color: rgba(250,247,242,.7);
          padding: .45rem .75rem;
          border-radius: 6px;
          transition: color .25s, background .25s;
          position: relative;
        }
        .ht-nav.scrolled .ht-link { color: rgba(28,22,18,.6); }
        .ht-link:hover,
        .ht-link.active {
          color: var(--gold) !important;
          background: rgba(201,150,90,.07);
        }
        .ht-link.active::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 50%; transform: translateX(-50%);
          width: 16px; height: 2px;
          background: var(--gold);
          border-radius: 2px;
        }

        /* right-side actions */
        .ht-actions { display: flex; align-items: center; gap: .6rem; }

        .ht-greeting {
          font-family: 'DM Sans', sans-serif;
          font-size: .82rem;
          color: rgba(250,247,242,.6);
          transition: color .4s;
        }
        .ht-nav.scrolled .ht-greeting { color: var(--warm-gray); }

        /* pill buttons */
        .ht-btn-ghost {
          font-family: 'DM Sans', sans-serif;
          font-size: .78rem;
          font-weight: 500;
          letter-spacing: .06em;
          text-transform: uppercase;
          text-decoration: none;
          color: rgba(250,247,242,.75);
          border: 1px solid rgba(250,247,242,.25);
          padding: .5rem 1.2rem;
          border-radius: 2rem;
          transition: color .25s, border-color .25s, background .25s;
          background: transparent;
          cursor: pointer;
          line-height: 1;
        }
        .ht-nav.scrolled .ht-btn-ghost {
          color: rgba(28,22,18,.65);
          border-color: rgba(28,22,18,.2);
        }
        .ht-btn-ghost:hover {
          color: #FAF7F2 !important;
          border-color: var(--gold);
          background: var(--burgundy);
        }

        .ht-btn-gold {
          font-family: 'DM Sans', sans-serif;
          font-size: .78rem;
          font-weight: 500;
          letter-spacing: .06em;
          text-transform: uppercase;
          text-decoration: none;
          color: var(--charcoal);
          background: var(--gold);
          padding: .55rem 1.35rem;
          border-radius: 2rem;
          border: none;
          cursor: pointer;
          transition: background .25s, transform .2s, box-shadow .25s;
          line-height: 1;
        }
        .ht-btn-gold:hover {
          background: var(--gold-lt);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(201,150,90,.35);
        }

        .ht-btn-danger {
          font-family: 'DM Sans', sans-serif;
          font-size: .78rem;
          font-weight: 500;
          letter-spacing: .06em;
          text-transform: uppercase;
          color: #FAF7F2;
          background: var(--burgundy);
          padding: .55rem 1.35rem;
          border-radius: 2rem;
          border: none;
          cursor: pointer;
          transition: background .25s, transform .2s;
          line-height: 1;
        }
        .ht-btn-danger:hover {
          background: var(--burgundy-lt);
          transform: translateY(-1px);
        }

        .ht-btn-admin {
          font-family: 'DM Sans', sans-serif;
          font-size: .78rem;
          font-weight: 500;
          letter-spacing: .06em;
          text-transform: uppercase;
          text-decoration: none;
          color: var(--gold);
          background: rgba(201,150,90,.1);
          border: 1px solid rgba(201,150,90,.25);
          padding: .5rem 1.2rem;
          border-radius: 2rem;
          transition: background .25s, border-color .25s;
          line-height: 1;
        }
        .ht-btn-admin:hover {
          background: rgba(201,150,90,.18);
          border-color: var(--gold);
        }

        /* divider between links and actions */
        .ht-divider {
          width: 1px; height: 18px;
          background: rgba(250,247,242,.18);
          margin: 0 .35rem;
          transition: background .4s;
        }
        .ht-nav.scrolled .ht-divider { background: rgba(28,22,18,.12); }

        /* mobile hamburger */
        .ht-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: .35rem;
        }
        .ht-hamburger span {
          display: block;
          width: 22px; height: 1.5px;
          background: rgba(250,247,242,.8);
          border-radius: 2px;
          transition: background .4s, transform .3s, opacity .3s;
        }
        .ht-nav.scrolled .ht-hamburger span { background: rgba(28,22,18,.7); }
        .ht-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .ht-hamburger.open span:nth-child(2) { opacity: 0; }
        .ht-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* mobile drawer */
        .ht-drawer {
          display: none;
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          z-index: 199;
          background: rgba(28,22,18,.97);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1.2rem;
          padding: 2rem;
        }
        .ht-drawer.open { display: flex; }
        .ht-drawer .ht-link {
          font-size: 1.1rem;
          padding: .75rem 1.5rem;
          color: rgba(250,247,242,.75) !important;
        }
        .ht-drawer .ht-link:hover { color: var(--gold) !important; }

        @media (max-width: 768px) {
          .ht-links, .ht-actions, .ht-divider { display: none; }
          .ht-hamburger { display: flex; }
          .ht-nav { padding: 1rem 1.5rem; }
          .ht-nav.scrolled { padding: .8rem 1.5rem; }
        }
      `}</style>

      <nav className={`ht-nav${scrolled ? " scrolled" : ""}`}>
        {/* Logo */}
        <Link href="/" className="ht-logo">
          <div className="ht-logo-icon">
            <Image src="/icons/sushi.svg" alt="logo" width={20} height={20} />
          </div>
          <span className="ht-logo-text">
            Happy <em>Tummy</em>
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul className="ht-links">
          {[
            { href: "/",       label: "Home"    },
            { href: "/menu",   label: "Menu"    },
            { href: "/about",  label: "About"   },
            { href: "/pages",  label: "Recipes" },
          ].map(({ href, label }) => (
            <li key={href}>
              <NavLink
                href={href}
                className={`ht-link${pathname === href ? " active" : ""}`}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="ht-actions">
          {user?.role === "USER" && (
            <Link href="/profile" className="ht-btn-ghost">Profile</Link>
          )}

          {user?.role === "ADMIN" && (
            <Link href="/admin" className="ht-btn-admin">Admin Dashboard</Link>
          )}

          {user ? (
            <>
              <span className="ht-greeting">Hi, {user.name}</span>
              <div className="ht-divider" />
              <button onClick={logout} className="ht-btn-danger">Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="ht-btn-ghost">Login</Link>
              <Link href="/register" className="ht-btn-gold">Register</Link>
            </>
          )}

          <div className="ht-divider" />
          <Link href="/book-a-table" className="ht-btn-gold">Reserve →</Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`ht-hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`ht-drawer${menuOpen ? " open" : ""}`}>
        {[
          { href: "/",       label: "Home"    },
          { href: "/menu",   label: "Menu"    },
          { href: "/about",  label: "About"   },
          { href: "/pages",  label: "Recipes" },
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="ht-link"
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </Link>
        ))}

        {user ? (
          <>
            <span style={{ fontFamily: "'DM Sans',sans-serif", color: "var(--warm-gray)", fontSize: ".85rem" }}>
              Hi, {user.name}
            </span>
            <button onClick={() => { logout(); setMenuOpen(false); }} className="ht-btn-danger">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login"    className="ht-btn-ghost" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link href="/register" className="ht-btn-gold"  onClick={() => setMenuOpen(false)}>Register</Link>
          </>
        )}

        <Link href="/book-a-table" className="ht-btn-gold" onClick={() => setMenuOpen(false)}>
          Reserve a Table →
        </Link>
      </div>
    </>
  );
}
