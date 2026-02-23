'use client';
import Link from 'next/link';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { COMPONENTS, COLOR_MAP } from '../lib/components';
import { useState } from 'react';
import { Search, ArrowRight, Zap, Code, Package, Star } from 'lucide-react';

const FILTERS = ['All', 'layout', 'interactive', 'overlay', 'input', 'data', 'navigation', 'media', 'feedback', 'label', 'status'];

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = COMPONENTS.filter(c => {
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.desc.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === 'All' || c.tags.includes(activeFilter);
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
          {/* Background orbs */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="orb-float absolute w-[400px] h-[400px] rounded-full top-[-100px] left-[-100px] opacity-[0.06]" style={{ background: '#e4ff3c', filter: 'blur(80px)' }} />
            <div className="orb-float absolute w-[300px] h-[300px] rounded-full top-0 right-[10%] opacity-[0.06]" style={{ background: '#3c9fff', filter: 'blur(80px)' }} />
            <div className="orb-float absolute w-[250px] h-[250px] rounded-full bottom-0 left-[30%] opacity-[0.05]" style={{ background: '#c43cff', filter: 'blur(80px)' }} />
          </div>

          <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 text-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.14em] uppercase text-[#555] border border-[#282828] px-3 py-1.5 rounded-full mb-6 sm:mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e4ff3c] animate-[pulseDot_2s_infinite]" />
              CSS Glassmorphism Generator v2.0
            </div>

            <h1 className="text-[2.8rem] sm:text-[4.5rem] lg:text-[6rem] font-black tracking-[-0.06em] leading-[0.9] text-white mb-6">
              Build Glass UI<br />
              <span className="text-[#e4ff3c]">Instantly.</span>
            </h1>

            <p className="text-[0.95rem] sm:text-[1.05rem] text-[#888] max-w-xl mx-auto leading-relaxed mb-8 sm:mb-12">
              Generate pixel-perfect glassmorphism CSS in real-time. Choose any UI component, customize every property, and export as CSS, Tailwind, or React — zero dependencies.
            </p>

            {/* Pills */}
            <div className="flex items-center justify-center gap-2 flex-wrap mb-10 sm:mb-16">
              {['backdrop-filter', 'CSS Variables', 'Zero Deps', 'React Ready', 'Tailwind JIT', 'Live Preview'].map(p => (
                <span key={p} className="flex items-center gap-1.5 font-mono text-[0.65rem] tracking-wider uppercase text-[#555] border border-[#282828] px-3 py-1.5 rounded-full transition-all hover:border-[rgba(228,255,60,0.18)] hover:text-[#e4ff3c] hover:bg-[rgba(228,255,60,0.05)] hover:-translate-y-1 hover:scale-105 cursor-default">
                  <span className="w-1 h-1 rounded-full bg-current" />
                  {p}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link href="/customize/card" className="group flex items-center gap-2 bg-[#e4ff3c] text-black font-bold px-6 py-3 rounded-xl transition-all hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(228,255,60,0.3)] text-sm">
                Start Customizing <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a href="https://github.com" target="_blank" className="flex items-center gap-2 bg-[#0a0a0a] border border-[#282828] text-[#888] font-semibold px-6 py-3 rounded-xl transition-all hover:border-[#444] hover:text-white hover:-translate-y-1 text-sm">
                <Star size={14} /> Star on GitHub
              </a>
            </div>
          </div>
        </section>

        {/* Stats Banner */}
        <section className="border-t border-b border-[#1e1e1e] py-6">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: <Package size={18}/>, stat: '16+', label: 'Components' },
              { icon: <Code size={18}/>, stat: '4', label: 'Export Formats' },
              { icon: <Zap size={18}/>, stat: '0', label: 'Dependencies' },
              { icon: <Star size={18}/>, stat: '100%', label: 'Free & Open' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-3 group">
                <div className="w-9 h-9 rounded-lg bg-[rgba(228,255,60,0.07)] border border-[rgba(228,255,60,0.12)] flex items-center justify-center text-[#e4ff3c] transition-all group-hover:scale-110 group-hover:bg-[rgba(228,255,60,0.12)]">
                  {item.icon}
                </div>
                <div>
                  <div className="text-lg sm:text-2xl font-black text-[#e4ff3c] tracking-tight leading-none">{item.stat}</div>
                  <div className="font-mono text-[0.6rem] text-[#555] uppercase tracking-wider mt-0.5">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Component Gallery */}
        <section className="py-12 sm:py-20">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
            {/* Section header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.14em] uppercase text-[#555] mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e4ff3c]" />
                  Choose a Component
                </div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                  What would you like to <span className="text-[#e4ff3c]">customize?</span>
                </h2>
              </div>
              <div className="font-mono text-[0.65rem] text-[#555]">{filtered.length} components</div>
            </div>

            {/* Search + Filter */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <div className="relative flex-1 max-w-md">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#555]" />
                <input
                  type="text"
                  placeholder="Search components..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-[#1e1e1e] rounded-xl pl-9 pr-4 py-2.5 text-[0.82rem] text-[#f0f0f0] placeholder-[#555] outline-none transition-all focus:border-[rgba(228,255,60,0.3)] focus:ring-1 focus:ring-[rgba(228,255,60,0.1)]"
                />
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {FILTERS.slice(0, 8).map(f => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`px-3 py-1.5 rounded-lg font-mono text-[0.6rem] tracking-wider uppercase transition-all ${
                      activeFilter === f
                        ? 'bg-[rgba(228,255,60,0.07)] border border-[rgba(228,255,60,0.18)] text-[#e4ff3c]'
                        : 'border border-[#1e1e1e] text-[#555] hover:border-[#282828] hover:text-[#888]'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {filtered.map(comp => {
                const colors = COLOR_MAP[comp.color];
                return (
                  <Link
                    key={comp.id}
                    href={`/customize/${comp.id}`}
                    className="group relative bg-[#0a0a0a] border border-[#1e1e1e] rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:border-[#282828] hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)] overflow-hidden"
                  >
                    {/* Hover glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{ background: 'radial-gradient(circle at 50% 0%, rgba(228,255,60,0.04) 0%, transparent 60%)' }} />

                    {/* Bottom shimmer */}
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(228,255,60,0.3)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-3xl transition-all duration-300 group-hover:scale-125 group-hover:-translate-y-1 group-hover:rotate-[-5deg]">
                          {comp.emoji}
                        </div>
                        <span className={`font-mono text-[0.55rem] tracking-wider uppercase px-2 py-0.5 rounded border ${colors.text} ${colors.border} ${colors.bg}`}>
                          {comp.badge}
                        </span>
                      </div>

                      <h3 className="font-bold text-base text-[#f0f0f0] mb-1.5 group-hover:text-white transition-colors">
                        {comp.name}
                      </h3>
                      <p className="text-[0.72rem] text-[#555] leading-relaxed mb-4 group-hover:text-[#777] transition-colors">
                        {comp.desc}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          {comp.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="font-mono text-[0.55rem] uppercase tracking-wider text-[#444] border border-[#1a1a1a] px-1.5 py-0.5 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-1 font-mono text-[0.65rem] text-[#444] group-hover:text-[#e4ff3c] transition-all group-hover:gap-2">
                          Customize <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <div className="text-3xl mb-3">🔍</div>
                <div className="font-semibold text-[#555]">No components found</div>
                <div className="text-[0.75rem] text-[#444] mt-1">Try a different search or filter</div>
              </div>
            )}
          </div>
        </section>

        {/* Browser Compat */}
        <section className="border-t border-[#1e1e1e] py-12">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.14em] uppercase text-[#555] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e4ff3c]" />
              Browser Support
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {[
                { icon: '🟠', name: 'Chrome', ver: 'v76+' },
                { icon: '🔵', name: 'Firefox', ver: 'v103+' },
                { icon: '⚪', name: 'Safari', ver: 'v9+' },
                { icon: '🔷', name: 'Edge', ver: 'v79+' },
                { icon: '📱', name: 'Mobile', ver: 'Full' },
              ].map(b => (
                <div key={b.name} className="group bg-[#0a0a0a] border border-[#1e1e1e] rounded-xl p-3.5 text-center transition-all hover:border-[rgba(60,255,160,0.25)] hover:-translate-y-1 cursor-default">
                  <div className="text-2xl mb-2 transition-transform group-hover:scale-125 group-hover:-translate-y-1">{b.icon}</div>
                  <div className="font-mono text-[0.62rem] text-[#555]">{b.name}</div>
                  <div className="font-mono text-[0.6rem] text-[#3cffa0] font-bold mt-0.5">{b.ver}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
