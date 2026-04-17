"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Home, Clock, BarChart2, Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/timeline", label: "Timeline", icon: Clock },
  { href: "/stats", label: "Stats", icon: BarChart2 },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E9E9E9]">
      <nav className="w-full px-4 sm:px-6 lg:px-10 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center select-none">
          <Image
            src="/assets/logo.png"
            alt="KeenKeeper"
            width={124}
            height={28}
            className="h-7 w-auto object-contain"
            priority
          />
        </Link>

        <ul className="hidden md:flex items-center gap-0.5">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const active = isActive(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-150 ${
                    active
                      ? "bg-[#244D3F] text-white"
                      : "text-[#7A8794] hover:text-[#244D3F] hover:bg-[#244D3F]/10"
                  }`}
                >
                  <Icon size={11} strokeWidth={2.2} />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          className="md:hidden p-1.5 rounded-md text-[#64748B] hover:bg-gray-100"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-[#E9E9E9] px-4 pb-3 pt-2">
          <ul className="flex flex-col gap-1">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const active = isActive(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      active
                        ? "bg-[#244D3F] text-white"
                        : "text-[#64748B] hover:bg-gray-50"
                    }`}
                  >
                    <Icon size={15} />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
