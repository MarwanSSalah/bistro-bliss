"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children, className = "" }) {
  const pathname = usePathname();

  // Mark as active if:
  // - exact match ("/", "/about", "/menu", "/contact")
  // - or we're inside a subtree (e.g. "/pages" and "/pages/anything")
  const isActive =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(href + "/");

  const base =
    "px-3 py-1 rounded-full transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500";
  const hover = "hover:bg-neutral-100";
  const pressed = "active:bg-neutral-200";
  const active = "bg-neutral-900 text-white"; // active page style
  const inactive = "text-inherit";

  return (
    <Link
      href={href}
      className={`${base} ${hover} ${pressed} ${isActive ? active : inactive} ${className}`}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
}