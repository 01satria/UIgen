'use client';
import { useState, useCallback } from 'react';

// ── Panel ─────────────────────────────────
export function Panel({ children, label, className = '' }) {
  return (
    <div className={`bg-[#0a0a0a] border border-[#1e1e1e] rounded-2xl p-4 sm:p-5 transition-colors hover:border-[#282828] ${className}`}>
      {label && (
        <div className="flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.14em] uppercase text-[#555] mb-4 pb-3 border-b border-[#1e1e1e]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e4ff3c] flex-shrink-0 animate-[pulseDot_2s_infinite]" />
          {label}
        </div>
      )}
      {children}
    </div>
  );
}

// ── SectionHeader ─────────────────────────
export function SectionHeader({ title, count }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.14em] uppercase text-[#555]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#e4ff3c]" />
        {title}
      </div>
      {count && <span className="font-mono text-[0.62rem] text-[#555]">{count}</span>}
    </div>
  );
}

// ── SliderControl ─────────────────────────
export function SliderControl({ label, value, min, max, unit, onChange }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="group mb-4 last:mb-0">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[0.75rem] font-semibold text-[#777] group-hover:text-[#999] transition-colors">{label}</span>
        <span className="font-mono text-[0.68rem] text-[#e4ff3c] bg-[rgba(228,255,60,0.07)] border border-[rgba(228,255,60,0.18)] px-2 py-0.5 rounded min-w-[44px] text-right">
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={e => onChange(parseInt(e.target.value))}
        style={{ '--pct': pct + '%' }}
      />
    </div>
  );
}

// ── ToggleGroup ───────────────────────────
export function ToggleGroup({ options, value, onChange }) {
  return (
    <div className="flex gap-1.5">
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`flex-1 py-2 px-2 rounded-lg border text-[0.73rem] font-semibold transition-all ${
            value === opt.value
              ? 'bg-[rgba(228,255,60,0.07)] border-[rgba(228,255,60,0.18)] text-[#e4ff3c]'
              : 'bg-transparent border-[#1e1e1e] text-[#555] hover:border-[#282828] hover:text-[#888] hover:-translate-y-0.5'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// ── SwatchPicker ──────────────────────────
export function SwatchPicker({ swatches, value, onChange }) {
  return (
    <div className="flex gap-1.5 flex-wrap">
      {swatches.map((sw) => (
        <button
          key={sw.color}
          onClick={() => onChange(sw.color)}
          className={`w-7 h-7 rounded-md border-2 transition-all duration-200 hover:scale-125 hover:-translate-y-0.5 hover:shadow-lg ${
            value === sw.color ? 'border-white scale-110' : 'border-transparent'
          }`}
          style={{ background: sw.bg }}
          title={sw.bg}
        />
      ))}
      <label className="w-7 h-7 rounded-md border-2 border-transparent cursor-pointer overflow-hidden transition-all hover:scale-125 hover:-translate-y-0.5"
        style={{ background: 'conic-gradient(red,yellow,lime,aqua,blue,magenta,red)' }}>
        <input
          type="color"
          className="opacity-0 w-full h-full cursor-pointer"
          onChange={e => {
            const h = e.target.value;
            onChange(`${parseInt(h.slice(1,3),16)},${parseInt(h.slice(3,5),16)},${parseInt(h.slice(5,7),16)}`);
          }}
        />
      </label>
    </div>
  );
}

// ── CodeBlock ─────────────────────────────
export function CodeBlock({ code, tab, onTabChange, tabs = ['css','tailwind','react','vars'] }) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_) {}
  }, [code]);

  const highlight = (c) => {
    return c
      .replace(/\/\*[\s\S]*?\*\//g, m => `<span class="t-comment">${m}</span>`)
      .replace(/\/\/.*/g, m => `<span class="t-comment">${m}</span>`)
      .replace(/([.#]?[\w-]+)(?=\s*\{)/g, m => `<span class="t-selector">${m}</span>`)
      .replace(/([\w-]+)(?=\s*:(?!:))/g, m => `<span class="t-prop">${m}</span>`)
      .replace(/\b(rgba?|blur|saturate|brightness|linear-gradient|var)\b/g, m => `<span class="t-fn">${m}</span>`)
      .replace(/\b(const|let|export|import|return|from)\b/g, m => `<span class="t-kw">${m}</span>`)
      .replace(/'[^']*'/g, m => `<span class="t-str">${m}</span>`)
      .replace(/`[^`]*`/g, m => `<span class="t-str">${m}</span>`)
      .replace(/\b(\d+(?:px|%|rem|em|vh|vw)?)\b/g, m => `<span class="t-num">${m}</span>`);
  };

  const tabLabels = { css: 'CSS', tailwind: 'Tailwind', react: 'React', vars: 'Variables' };

  return (
    <div className="bg-[#0a0a0a] border border-[#1e1e1e] rounded-2xl overflow-hidden transition-colors hover:border-[#282828]">
      <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-[#1e1e1e]">
        <div className="flex gap-1">
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => onTabChange(t)}
              className={`px-2.5 py-1 rounded-md border font-mono text-[0.65rem] transition-all ${
                tab === t
                  ? 'bg-[rgba(228,255,60,0.07)] border-[rgba(228,255,60,0.18)] text-[#e4ff3c]'
                  : 'bg-transparent border-transparent text-[#555] hover:text-[#888]'
              }`}
            >
              {tabLabels[t] || t}
            </button>
          ))}
        </div>
        <button
          onClick={copy}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold text-[0.72rem] transition-all ${
            copied
              ? 'border-[rgba(60,255,160,0.25)] text-[#3cffa0] bg-[rgba(60,255,160,0.06)]'
              : 'border-[#282828] bg-[#111] text-[#888] hover:border-[rgba(228,255,60,0.18)] hover:text-[#e4ff3c] hover:bg-[rgba(228,255,60,0.07)] hover:-translate-y-0.5'
          }`}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            {copied ? <path d="M20 6L9 17l-5-5" /> : <><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></>}
          </svg>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre
        className="p-4 sm:p-5 font-mono text-[0.73rem] leading-[1.85] text-[#aaa] overflow-x-auto bg-[#030303] min-h-[140px] whitespace-pre"
        dangerouslySetInnerHTML={{ __html: highlight(code) }}
      />
    </div>
  );
}

// ── StatCard ──────────────────────────────
export function StatCard({ label, value, unit }) {
  return (
    <div className="bg-[#0a0a0a] border border-[#1e1e1e] rounded-xl p-3 sm:p-4 transition-all hover:border-[rgba(228,255,60,0.18)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.3)] cursor-default group">
      <div>
        <span className="text-xl sm:text-2xl font-black text-[#e4ff3c] tracking-tight leading-none group-hover:text-[#f0ff60] transition-colors">
          {value}
        </span>
        <span className="font-mono text-[0.6rem] text-[#555] ml-0.5">{unit}</span>
      </div>
      <div className="font-mono text-[0.6rem] text-[#555] mt-1 uppercase tracking-wider">{label}</div>
    </div>
  );
}

// ── Toast Provider ─────────────────────────
export function Toast({ message, type = 'success', onDone }) {
  return (
    <div className={`toast-in flex items-center gap-2.5 px-4 py-2.5 bg-[#141414] border rounded-xl text-[0.8rem] font-medium text-white shadow-[0_16px_48px_rgba(0,0,0,0.7)] min-w-[200px] ${
      type === 'success' ? 'border-[rgba(60,255,160,0.25)]' : 'border-[rgba(255,85,85,0.25)]'
    }`}>
      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[0.65rem] font-black flex-shrink-0 ${
        type === 'success' ? 'bg-[rgba(60,255,160,0.14)] text-[#3cffa0]' : 'bg-[rgba(255,85,85,0.14)] text-[#ff5555]'
      }`}>
        {type === 'success' ? '✓' : '✕'}
      </div>
      <span>{message}</span>
    </div>
  );
}
