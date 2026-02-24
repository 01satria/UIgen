'use client';
import { buildGlassStyle } from '../../lib/glassState';
import { BACKGROUNDS } from '../../lib/glassState';
import { CodeBlock, StatCard } from '../ui';
import { useState } from 'react';

function buildButtonCode(state) {
  const a = (state.opacity / 100).toFixed(2);
  const ba = (state.borderOp / 100).toFixed(2);
  const sa = (state.shadow / 100 * 0.5).toFixed(2);
  const bFilter = `blur(${state.blur}px) saturate(${state.saturation}%)`;

  if (state.tab === 'css') return `.glass-btn {
  background: rgba(${state.color}, ${a});
  backdrop-filter: ${bFilter};
  -webkit-backdrop-filter: ${bFilter};
  border: 1px solid rgba(${state.color}, ${ba});
  border-radius: ${state.radius}px;
  padding: 0.5rem 1.2rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.glass-btn:hover {
  transform: translateY(-2px) scale(1.04);
  box-shadow: 0 ${state.shadow / 5}px ${state.shadow / 2}px rgba(0,0,0,${sa});
}

.glass-btn:active { transform: scale(0.96); }

.glass-btn-sm  { padding: 0.35rem 0.85rem; font-size: 0.72rem; }
.glass-btn-lg  { padding: 0.7rem 1.8rem;  font-size: 0.9rem; }
.glass-btn-icon { padding: 0.6rem; aspect-ratio: 1; }

.glass-btn-outline {
  background: transparent;
  border: 1px solid rgba(${state.color}, ${ba});
}

/* ── Tablet (≥768px) ── */
@media (min-width: 768px) {
  .glass-btn     { padding: 0.55rem 1.4rem; font-size: 0.85rem; }
  .glass-btn-sm  { padding: 0.4rem 0.95rem;  font-size: 0.75rem; }
  .glass-btn-lg  { padding: 0.75rem 2rem;    font-size: 0.95rem; }
}

/* ── PC (≥1024px) ── */
@media (min-width: 1024px) {
  .glass-btn     { padding: 0.6rem 1.5rem; font-size: 0.875rem; }
  .glass-btn-sm  { padding: 0.4rem 1rem;    font-size: 0.78rem; }
  .glass-btn-lg  { padding: 0.85rem 2.2rem; font-size: 1rem; }
}

<!-- HTML Markup -->
<button class="glass-btn">⚡ Primary</button>
<button class="glass-btn glass-btn-sm">• Small</button>
<button class="glass-btn glass-btn-lg">🚀 Large</button>
<button class="glass-btn glass-btn-icon">✦</button>
<button class="glass-btn glass-btn-outline">□ Outlined</button>`;

  if (state.tab === 'tailwind') return `<!-- Tailwind CSS Markup (Mobile-first responsive) -->

<!-- Primary -->
<button class="px-5 py-2 text-sm
  md:px-6 md:py-2.5 md:text-sm
  lg:px-6 lg:py-2.5 lg:text-[0.875rem]
  bg-white/${Math.round(state.opacity)}
  backdrop-blur-[${state.blur}px]
  backdrop-saturate-[${state.saturation}%]
  border border-white/${Math.round(state.borderOp)}
  rounded-[${state.radius}px]
  font-semibold text-white
  transition-all
  hover:-translate-y-0.5 hover:scale-105
  active:scale-95">
  ⚡ Primary
</button>

<!-- Small -->
<button class="px-3.5 py-1.5 text-xs
  md:px-4 md:py-1.5
  lg:px-4 lg:py-2
  bg-white/${Math.round(state.opacity)}
  backdrop-blur-[${state.blur}px]
  rounded-[${state.radius}px]
  border border-white/${Math.round(state.borderOp)}
  font-semibold text-white
  transition-all hover:-translate-y-0.5 hover:scale-105">
  • Small
</button>

<!-- Icon Only -->
<button class="p-2.5 md:p-3
  bg-white/${Math.round(state.opacity)}
  backdrop-blur-[${state.blur}px]
  rounded-[${state.radius}px]
  border border-white/${Math.round(state.borderOp)}
  text-white
  transition-all hover:-translate-y-0.5 hover:scale-105">
  ✦
</button>`;

  if (state.tab === 'vars') return `:root {
  --glass-bg: rgba(${state.color}, ${a});
  --glass-blur: ${state.blur}px;
  --glass-border: rgba(${state.color}, ${ba});
  --glass-radius: ${state.radius}px;
  --glass-shadow-sa: ${sa};
  --btn-padding: 0.5rem 1.2rem;
  --btn-font-size: 0.8rem;
}

/* ── Tablet ── */
@media (min-width: 768px) {
  :root {
    --btn-padding: 0.55rem 1.4rem;
    --btn-font-size: 0.85rem;
  }
}

/* ── PC ── */
@media (min-width: 1024px) {
  :root {
    --btn-padding: 0.6rem 1.5rem;
    --btn-font-size: 0.875rem;
  }
}

.glass-btn {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur)) saturate(${state.saturation}%);
  border: 1px solid var(--glass-border);
  border-radius: var(--glass-radius);
  padding: var(--btn-padding);
  font-size: var(--btn-font-size);
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.glass-btn:hover {
  transform: translateY(-2px) scale(1.04);
}

<!-- HTML Markup -->
<button class="glass-btn">⚡ Primary</button>
<button class="glass-btn">◈ Secondary</button>`;

  return `import { useState, useEffect } from 'react';

/* ── Responsive hook ── */
function useBreakpoint() {
  const [bp, setBp] = useState('mobile');
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setBp(w >= 1024 ? 'pc' : w >= 768 ? 'tablet' : 'mobile');
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return bp;
}

const sizes = {
  mobile:  { padding: '0.5rem 1.2rem', fontSize: '0.8rem' },
  tablet:  { padding: '0.55rem 1.4rem', fontSize: '0.85rem' },
  pc:      { padding: '0.6rem 1.5rem',  fontSize: '0.875rem' },
};

const glassBase = {
  background: \`rgba(${state.color}, ${a})\`,
  backdropFilter: \`${bFilter}\`,
  WebkitBackdropFilter: \`${bFilter}\`,
  border: \`1px solid rgba(${state.color}, ${ba})\`,
  borderRadius: \`${state.radius}px\`,
  fontWeight: 600,
  color: '#fff',
  cursor: 'pointer',
  transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
};

export const GlassButton = ({ children, onClick }) => {
  const bp = useBreakpoint();
  const s = sizes[bp];
  const [hovered, setHovered] = useState(false);

  return (
    <button
      style={{
        ...glassBase,
        padding: s.padding,
        fontSize: s.fontSize,
        ...(hovered ? {
          transform: 'translateY(-2px) scale(1.04)',
          boxShadow: \`0 8px 24px rgba(0,0,0,${sa})\`,
        } : {}),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};`;
}

export default function ButtonCustomizer({ state, update }) {
  const [bg, setBg] = useState(0);
  const glassStyle = buildGlassStyle(state);
  const isLight = state.textColor === 'light';
  const textColor = isLight ? '#fff' : '#111';
  const [clicked, setClicked] = useState(null);

  const handleClick = (label) => {
    setClicked(label);
    setTimeout(() => setClicked(null), 1000);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-[#0a0a0a] border border-[#1e1e1e] rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#1e1e1e]">
          <div className="flex items-center gap-2 font-mono text-[0.6rem] tracking-widest uppercase text-[#555]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e4ff3c] animate-[pulseDot_2s_infinite]" />
            Live Preview
          </div>
          <div className="flex gap-1.5">
            {BACKGROUNDS.map((b, i) => (
              <button key={b.id} onClick={() => setBg(i)} title={b.label}
                className={`w-6 h-6 rounded-md border-2 transition-all hover:scale-110 ${i === bg ? 'border-white' : 'border-transparent'}`}
                style={{ background: b.style }} />
            ))}
          </div>
        </div>
        <div className="relative min-h-[320px] sm:min-h-[380px] flex items-center justify-center gap-4 flex-wrap px-6 overflow-hidden">
          <div className="absolute inset-0" style={{ background: BACKGROUNDS[bg].style }} />
          <div className="blob-animate absolute w-40 h-40 rounded-full top-[10%] left-[5%] opacity-15" style={{ background: 'rgba(228,255,60,1)', filter: 'blur(60px)' }} />
          <div className="blob-animate absolute w-36 h-36 rounded-full bottom-[10%] right-[8%] opacity-15" style={{ background: 'rgba(60,159,255,1)', filter: 'blur(60px)' }} />

          {/* Button variants */}
          {[
            { label: 'Primary', size: 'px-6 py-2.5', icon: '⚡' },
            { label: 'Secondary', size: 'px-5 py-2', icon: '◈', extraStyle: { opacity: 0.7 } },
            { label: 'Icon', size: 'p-3', icon: '✦', iconOnly: true },
            { label: 'Large', size: 'px-8 py-3.5 text-base', icon: '🚀' },
            { label: 'Small', size: 'px-3.5 py-1.5 text-xs', icon: '•' },
            { label: 'Outlined', size: 'px-5 py-2', icon: '□', extraStyle: { background: 'transparent' } },
          ].map(btn => (
            <button
              key={btn.label}
              onClick={() => handleClick(btn.label)}
              className={`relative z-10 font-semibold text-sm transition-all duration-200 hover:-translate-y-1 hover:scale-105 active:scale-95 ${btn.size}`}
              style={{ ...glassStyle, ...btn.extraStyle, color: textColor, borderRadius: state.radius + 'px' }}
            >
              {clicked === btn.label ? '✓' : btn.iconOnly ? btn.icon : `${btn.icon} ${btn.label}`}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        <StatCard label="Blur" value={state.blur} unit="px" />
        <StatCard label="Opacity" value={state.opacity} unit="%" />
        <StatCard label="Radius" value={state.radius} unit="px" />
        <StatCard label="Shadow" value={state.shadow} unit="%" />
      </div>

      <CodeBlock code={buildButtonCode(state)} tab={state.tab} onTabChange={v => update('tab', v)} />
    </div>
  );
}
