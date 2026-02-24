'use client';
import { useState, useCallback } from 'react';

export const DEFAULT_STATE = {
  blur: 16,
  opacity: 15,
  borderOp: 20,
  radius: 16,
  shadow: 40,
  saturation: 180,
  brightness: 100,
  color: '255,255,255',
  textColor: 'light',
  tab: 'css',
};

export const PRESETS = [
  { name: 'Subtle',   blur: 8,  opacity: 10, borderOp: 15, radius: 12, shadow: 30, saturation: 150, brightness: 100, color: '255,255,255' },
  { name: 'Default',  blur: 16, opacity: 15, borderOp: 20, radius: 16, shadow: 40, saturation: 180, brightness: 100, color: '255,255,255' },
  { name: 'Frosted',  blur: 28, opacity: 25, borderOp: 30, radius: 20, shadow: 60, saturation: 200, brightness: 105, color: '255,255,255' },
  { name: 'Deep Ice', blur: 40, opacity: 8,  borderOp: 12, radius: 24, shadow: 80, saturation: 250, brightness: 100, color: '60,159,255'  },
  { name: 'Amber',    blur: 18, opacity: 18, borderOp: 22, radius: 14, shadow: 45, saturation: 190, brightness: 100, color: '255,159,60'  },
  { name: 'Jade',     blur: 20, opacity: 14, borderOp: 18, radius: 18, shadow: 35, saturation: 170, brightness: 100, color: '60,255,170'  },
  { name: 'Violet',   blur: 24, opacity: 20, borderOp: 25, radius: 22, shadow: 55, saturation: 220, brightness: 100, color: '196,60,255'  },
  { name: 'Crisp',    blur: 12, opacity: 30, borderOp: 35, radius: 10, shadow: 25, saturation: 140, brightness: 110, color: '255,255,255'  },
];

export const SWATCHES = [
  { bg: '#fff',     color: '255,255,255' },
  { bg: '#e4ff3c',  color: '228,255,60'  },
  { bg: '#3cffaa',  color: '60,255,170'  },
  { bg: '#3c9fff',  color: '60,159,255'  },
  { bg: '#c43cff',  color: '196,60,255'  },
  { bg: '#ff3c6e',  color: '255,60,110'  },
  { bg: '#ff9f3c',  color: '255,159,60'  },
  { bg: '#3cffd8',  color: '60,255,216'  },
];

export const BACKGROUNDS = [
  { id: 1, style: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)', label: 'Deep Space' },
  { id: 2, style: 'linear-gradient(135deg, #000, #111, #0a0a0a)',       label: 'Pure Dark'  },
  { id: 3, style: 'linear-gradient(135deg, #1a0533, #3b0764)',           label: 'Violet'     },
  { id: 4, style: 'linear-gradient(135deg, #001f10, #003320)',           label: 'Forest'     },
  { id: 5, style: 'linear-gradient(135deg, #eee, #d0d0d0)',              label: 'Light'      },
  { id: 6, style: 'linear-gradient(135deg, #1a1a00, #3a3a00)',           label: 'Olive'      },
  { id: 7, style: 'linear-gradient(135deg, #1a0a00, #3a1500)',           label: 'Ember'      },
];

export function useGlassState() {
  const [state, setState] = useState(DEFAULT_STATE);

  const update = useCallback((key, value) => {
    setState(prev => ({ ...prev, [key]: value }));
  }, []);

  const applyPreset = useCallback((preset) => {
    setState(prev => ({ ...prev, ...preset }));
  }, []);

  return { state, update, applyPreset };
}

export function buildGlassStyle(state) {
  const { blur, opacity, borderOp, radius, shadow, saturation, brightness, color } = state;
  const a  = (opacity / 100).toFixed(2);
  const ba = (borderOp / 100).toFixed(2);
  const sa = (shadow / 100 * 0.5).toFixed(2);
  return {
    backdropFilter: `blur(${blur}px) saturate(${saturation}%) brightness(${brightness}%)`,
    WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation}%) brightness(${brightness}%)`,
    background: `rgba(${color}, ${a})`,
    border: `1px solid rgba(${color}, ${ba})`,
    borderRadius: `${radius}px`,
    boxShadow: `0 8px 32px rgba(0,0,0,${sa}), inset 0 0 0 1px rgba(${color},${ba})`,
  };
}

export function buildCode(state) {
  const { blur, opacity, borderOp, radius, shadow, saturation, brightness, color, tab } = state;
  const a  = (opacity / 100).toFixed(2);
  const ba = (borderOp / 100).toFixed(2);
  const sa = (shadow / 100 * 0.5).toFixed(2);
  const bFilter = `blur(${blur}px) saturate(${saturation}%) brightness(${brightness}%)`;

  if (tab === 'css') return `.glass-card {
  background: rgba(${color}, ${a});
  backdrop-filter: ${bFilter};
  -webkit-backdrop-filter: ${bFilter};
  border: 1px solid rgba(${color}, ${ba});
  border-radius: ${radius}px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, ${sa}),
              inset 0 0 0 1px rgba(${color}, ${ba});
  padding: 1rem;
  width: 100%;
  max-width: 100%;
}

.glass-card h2 {
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.glass-card p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
  line-height: 1.6;
}

.glass-card .tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.75rem;
}

.glass-card .tag {
  font-size: 0.65rem;
  font-weight: 600;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.75);
}

/* ── Tablet (≥768px) ── */
@media (min-width: 768px) {
  .glass-card {
    padding: 1.25rem;
    max-width: 360px;
  }
  .glass-card h2 { font-size: 1.1rem; }
  .glass-card p  { font-size: 0.875rem; }
}

/* ── PC (≥1024px) ── */
@media (min-width: 1024px) {
  .glass-card {
    padding: 1.5rem;
    max-width: 420px;
  }
  .glass-card h2 { font-size: 1.25rem; }
  .glass-card p  { font-size: 0.9rem; }
}

<!-- HTML Markup -->
<div class="glass-card">
  <h2>Glass Card</h2>
  <p>Beautiful glassmorphism card with responsive layout across all devices.</p>
  <div class="tags">
    <span class="tag">✦ GlassForge</span>
    <span class="tag">CSS</span>
    <span class="tag">Free</span>
  </div>
</div>`;

  if (tab === 'tailwind') return `<!-- Tailwind CSS Markup (Mobile-first responsive) -->
<div class="w-full max-w-full p-4
  md:max-w-[360px] md:p-5
  lg:max-w-[420px] lg:p-6
  bg-white/${Math.round(opacity)}
  backdrop-blur-[${blur}px]
  backdrop-saturate-[${saturation}%]
  brightness-[${brightness}%]
  rounded-[${radius}px]
  border border-white/${Math.round(borderOp)}
  shadow-[0_8px_32px_rgba(0,0,0,${sa})]">

  <h2 class="text-base md:text-lg lg:text-xl
    font-bold text-white mb-2">
    Glass Card
  </h2>

  <p class="text-sm md:text-sm lg:text-base
    text-white/60 leading-relaxed">
    Beautiful glassmorphism card with responsive layout.
  </p>

  <div class="flex flex-wrap gap-1.5 mt-3">
    <span class="text-[0.65rem] font-semibold px-2.5 py-1
      rounded-full bg-white/10 text-white/75">
      ✦ GlassForge
    </span>
    <span class="text-[0.65rem] font-semibold px-2.5 py-1
      rounded-full bg-white/10 text-white/75">
      CSS
    </span>
    <span class="text-[0.65rem] font-semibold px-2.5 py-1
      rounded-full bg-white/10 text-white/75">
      Free
    </span>
  </div>
</div>`;

  if (tab === 'vars') return `:root {
  --glass-bg: rgba(${color}, ${a});
  --glass-blur: ${blur}px;
  --glass-saturation: ${saturation}%;
  --glass-border: rgba(${color}, ${ba});
  --glass-radius: ${radius}px;
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, ${sa});
  --glass-padding: 1rem;
  --glass-max-w: 100%;
  --glass-title-size: 1rem;
  --glass-text-size: 0.85rem;
}

/* ── Tablet ── */
@media (min-width: 768px) {
  :root {
    --glass-padding: 1.25rem;
    --glass-max-w: 360px;
    --glass-title-size: 1.1rem;
    --glass-text-size: 0.875rem;
  }
}

/* ── PC ── */
@media (min-width: 1024px) {
  :root {
    --glass-padding: 1.5rem;
    --glass-max-w: 420px;
    --glass-title-size: 1.25rem;
    --glass-text-size: 0.9rem;
  }
}

.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturation));
  border: 1px solid var(--glass-border);
  border-radius: var(--glass-radius);
  box-shadow: var(--glass-shadow);
  padding: var(--glass-padding);
  width: 100%;
  max-width: var(--glass-max-w);
}

.glass-card h2 { color: #fff; font-weight: 700; font-size: var(--glass-title-size); }
.glass-card p  { color: rgba(255,255,255,0.6); font-size: var(--glass-text-size); line-height: 1.6; }

<!-- HTML Markup -->
<div class="glass-card">
  <h2>Glass Card</h2>
  <p>Beautiful glassmorphism card with responsive layout.</p>
  <div style="display:flex; flex-wrap:wrap; gap:0.4rem; margin-top:0.75rem">
    <span class="tag">✦ GlassForge</span>
    <span class="tag">CSS</span>
    <span class="tag">Free</span>
  </div>
</div>`;

  return `import { useEffect, useState } from 'react';

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

/* ── Responsive sizes ── */
const sizes = {
  mobile:  { padding: '1rem',    maxWidth: '100%',  titleSize: '1rem',    textSize: '0.85rem' },
  tablet:  { padding: '1.25rem', maxWidth: '360px', titleSize: '1.1rem',  textSize: '0.875rem' },
  pc:      { padding: '1.5rem',  maxWidth: '420px', titleSize: '1.25rem', textSize: '0.9rem' },
};

export const GlassCard = ({ children }) => {
  const bp = useBreakpoint();
  const s = sizes[bp];

  const glassStyle = {
    background: \`rgba(${color}, ${a})\`,
    backdropFilter: \`${bFilter}\`,
    WebkitBackdropFilter: \`${bFilter}\`,
    border: \`1px solid rgba(${color}, ${ba})\`,
    borderRadius: \`${radius}px\`,
    boxShadow: \`0 8px 32px rgba(0,0,0,${sa})\`,
    padding: s.padding,
    width: '100%',
    maxWidth: s.maxWidth,
  };

  return (
    <div style={glassStyle}>
      <h2 style={{ color: '#fff', fontWeight: 700, fontSize: s.titleSize, marginBottom: '0.5rem' }}>
        Glass Card
      </h2>
      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: s.textSize, lineHeight: 1.6 }}>
        {children || 'Beautiful glassmorphism card with responsive layout.'}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.75rem' }}>
        {['✦ GlassForge', 'CSS', 'Free'].map(t => (
          <span key={t} style={{
            fontSize: '0.65rem', fontWeight: 600, padding: '0.2rem 0.55rem',
            borderRadius: '999px', background: 'rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.75)',
          }}>{t}</span>
        ))}
      </div>
    </div>
  );
};`;
}
