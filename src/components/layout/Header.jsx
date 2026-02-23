'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Github, Zap } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <header className="sticky top-0 z-50 border-b border-[#1e1e1e] bg-black/85 backdrop-blur-xl">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-2.5 flex-shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#e4ff3c] flex items-center justify-center text-black font-black text-base leading-none transition-all duration-300 group-hover:rotate-[15deg] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(228,255,60,0.5)]">
            ◈
          </div>
          <span className="text-base sm:text-lg font-extrabold tracking-tight">
            Glass<span className="text-[#e4ff3c]">Forge</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <Link href="/" className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${isHome ? 'text-[#e4ff3c] bg-[rgba(228,255,60,0.07)]' : 'text-[#888] hover:text-[#f0f0f0]'}`}>
            Home
          </Link>
          <Link href="/customize/card" className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${pathname.startsWith('/customize') ? 'text-[#e4ff3c] bg-[rgba(228,255,60,0.07)]' : 'text-[#888] hover:text-[#f0f0f0]'}`}>
            Customize
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden sm:block font-mono text-[0.6rem] tracking-widest uppercase text-[#555] border border-[#282828] px-2.5 py-1 rounded-full">
            v2.0
          </span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[0.75rem] font-semibold text-[#888] bg-[#0a0a0a] border border-[#282828] px-3 py-1.5 rounded-lg transition-all hover:text-white hover:border-[#444] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
          >
            <Github size={13} />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
