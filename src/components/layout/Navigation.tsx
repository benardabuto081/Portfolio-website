"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation, type NavKey } from "@/content/site";

/** The nav item for the current route: exact match for Home, prefix match for the rest. */
function activeKey(pathname: string): NavKey | null {
  if (pathname === "/") return "home";
  const item = navigation.find(
    (entry) => entry.href !== "/" && (pathname === entry.href || pathname.startsWith(`${entry.href}/`)),
  );
  return item?.key ?? null;
}

export function Navigation() {
  const pathname = usePathname();
  const active = activeKey(pathname);

  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close the menu on Escape and return focus to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Close the menu if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 48rem)");
    const onChange = () => query.matches && setOpen(false);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <nav aria-label="Primary" className="hidden md:block">
        <ul className="flex items-center gap-7 text-sm">
          {navigation.map((item) => {
            const isActive = active === item.key;
            return (
              <li key={item.key}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative py-2 transition-colors duration-200 hover:text-fg ${
                    isActive ? "text-fg" : "text-muted"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-px h-px origin-left bg-accent transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <button
        ref={toggleRef}
        type="button"
        className="meta -mr-2 inline-flex min-h-11 items-center gap-2 px-2 text-fg md:hidden"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Close" : "Menu"}
        <span aria-hidden="true" className="relative block h-2.5 w-4">
          <span
            className={`absolute left-0 h-px w-4 bg-fg transition-transform duration-200 ${
              open ? "top-1 rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 h-px w-4 bg-fg transition-transform duration-200 ${
              open ? "top-1 -rotate-45" : "top-2"
            }`}
          />
        </span>
      </button>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-line bg-canvas md:hidden"
      >
        <nav aria-label="Primary" className="page-container">
          <ul className="divide-y divide-line">
            {navigation.map((item, index) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active === item.key ? "page" : undefined}
                  className="flex min-h-14 items-baseline gap-4 py-4 font-serif text-2xl"
                >
                  <span className="meta w-6 text-muted">{String(index).padStart(2, "0")}</span>
                  <span className={active === item.key ? "underline decoration-accent underline-offset-6" : ""}>
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
