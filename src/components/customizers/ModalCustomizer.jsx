'use client';
import { buildGlassStyle } from '../../lib/glassState';
import { BACKGROUNDS } from '../../lib/glassState';
import { CodeBlock, StatCard } from '../ui';
import { useState } from 'react';
import { X } from 'lucide-react';

function buildModalCode(state) {
  const a = (state.opacity / 100).toFixed(2);
  const ba = (state.borderOp / 100).toFixed(2);
  const sa = (state.shadow / 100 * 0.5).toFixed(2);
  const bFilter = `blur(${state.blur}px) saturate(${state.saturation}%)`;

  if (state.tab === 'css') return `.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center;
  padding: 1rem;
  z-index: 50;
}

.modal {
  background: rgba(${state.color}, ${a});
  backdrop-filter: ${bFilter};
  -webkit-backdrop-filter: ${bFilter};
  border: 1px solid rgba(${state.color}, ${ba});
  border-radius: ${state.radius}px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, ${sa});
  padding: 1.25rem;
  width: 100%;
  max-width: 100%;
}

.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.modal-header h2 { color: #fff; font-weight: 700; font-size: 0.95rem; }
.modal-body { color: rgba(255,255,255,0.6); font-size: 0.82rem; line-height: 1.6; }
.modal-close { background: none; border: none; color: rgba(255,255,255,0.5); cursor: pointer; font-size: 1.15rem; }
.modal-close:hover { color: #fff; }

.modal-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.btn-cancel {
  flex: 1; padding: 0.5rem;
  border-radius: 0.5rem;
  background: rgba(255,255,255,0.08);
  color: #fff; border: 1px solid rgba(${state.color}, ${ba});
  font-weight: 600; cursor: pointer;
  font-size: 0.82rem;
}

.btn-confirm {
  flex: 1; padding: 0.5rem;
  border-radius: 0.5rem;
  background: #e4ff3c;
  color: #000; border: none;
  font-weight: 700; cursor: pointer;
  font-size: 0.82rem;
}

/* ── Tablet (≥768px) ── */
@media (min-width: 768px) {
  .modal {
    padding: 1.5rem;
    max-width: 420px;
  }
  .modal-header h2 { font-size: 1rem; }
  .modal-body { font-size: 0.85rem; }
}

/* ── PC (≥1024px) ── */
@media (min-width: 1024px) {
  .modal {
    padding: 1.75rem;
    max-width: 480px;
  }
  .modal-header h2 { font-size: 1.1rem; }
  .modal-body { font-size: 0.875rem; }
}

<!-- HTML Markup -->
<div class="modal-overlay">
  <div class="modal">
    <div class="modal-header">
      <h2>Confirm Action</h2>
      <button class="modal-close">&times;</button>
    </div>
    <p class="modal-body">Are you sure you want to proceed? This action cannot be undone.</p>
    <div class="modal-actions">
      <button class="btn-cancel">Cancel</button>
      <button class="btn-confirm">Confirm</button>
    </div>
  </div>
</div>`;

  if (state.tab === 'tailwind') return `<!-- Tailwind CSS Markup (Mobile-first responsive) -->

<!-- Overlay -->
<div class="fixed inset-0 bg-black/60 backdrop-blur-sm
  flex items-center justify-center z-50 p-4">

  <!-- Modal -->
  <div class="w-full max-w-full p-5
    md:max-w-[420px] md:p-6
    lg:max-w-lg lg:p-7
    bg-white/${Math.round(state.opacity)}
    backdrop-blur-[${state.blur}px]
    backdrop-saturate-[${state.saturation}%]
    border border-white/${Math.round(state.borderOp)}
    rounded-[${state.radius}px]
    shadow-[0_24px_64px_rgba(0,0,0,${sa})]">

    <!-- Header -->
    <div class="flex items-start justify-between mb-3 md:mb-4">
      <div>
        <h2 class="text-[0.95rem] md:text-base lg:text-lg
          font-bold text-white">
          Confirm Action
        </h2>
        <p class="text-xs md:text-sm text-white/60 mt-1">
          Are you sure you want to proceed?
        </p>
      </div>
      <button class="p-1.5 rounded-lg text-white/50
        hover:bg-white/10 transition-colors">
        &times;
      </button>
    </div>

    <!-- Body -->
    <p class="text-xs md:text-sm text-white/60 leading-relaxed mb-4 md:mb-5">
      This action cannot be undone.
    </p>

    <!-- Actions -->
    <div class="flex gap-2">
      <button class="flex-1 py-2 rounded-lg
        bg-white/10 text-white text-xs md:text-sm
        font-semibold hover:-translate-y-0.5 transition-all">
        Cancel
      </button>
      <button class="flex-1 py-2 rounded-lg
        bg-[#e4ff3c] text-black text-xs md:text-sm
        font-bold hover:-translate-y-0.5 transition-all">
        Confirm
      </button>
    </div>
  </div>
</div>`;

  if (state.tab === 'vars') return `:root {
  --glass-bg: rgba(${state.color}, ${a});
  --glass-blur: ${state.blur}px;
  --glass-saturation: ${state.saturation}%;
  --glass-border: rgba(${state.color}, ${ba});
  --glass-radius: ${state.radius}px;
  --glass-shadow: 0 24px 64px rgba(0, 0, 0, ${sa});
  --modal-padding: 1.25rem;
  --modal-max-w: 100%;
  --modal-title-size: 0.95rem;
  --modal-text-size: 0.82rem;
}

/* ── Tablet ── */
@media (min-width: 768px) {
  :root {
    --modal-padding: 1.5rem;
    --modal-max-w: 420px;
    --modal-title-size: 1rem;
    --modal-text-size: 0.85rem;
  }
}

/* ── PC ── */
@media (min-width: 1024px) {
  :root {
    --modal-padding: 1.75rem;
    --modal-max-w: 480px;
    --modal-title-size: 1.1rem;
    --modal-text-size: 0.875rem;
  }
}

.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center;
  padding: 1rem;
}

.modal {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturation));
  border: 1px solid var(--glass-border);
  border-radius: var(--glass-radius);
  box-shadow: var(--glass-shadow);
  padding: var(--modal-padding);
  width: 100%;
  max-width: var(--modal-max-w);
}

.modal h2 { font-size: var(--modal-title-size); color: #fff; font-weight: 700; }
.modal p  { font-size: var(--modal-text-size); color: rgba(255,255,255,0.6); line-height: 1.6; }

<!-- HTML Markup -->
<div class="modal-overlay">
  <div class="modal">
    <h2>Confirm Action</h2>
    <p>Are you sure you want to proceed?</p>
    <div style="display:flex;gap:0.5rem;margin-top:1.25rem">
      <button class="btn-cancel">Cancel</button>
      <button class="btn-confirm">Confirm</button>
    </div>
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

const sizes = {
  mobile:  { padding: '1.25rem', maxWidth: '100%',  titleSize: '0.95rem', textSize: '0.82rem' },
  tablet:  { padding: '1.5rem',  maxWidth: '420px', titleSize: '1rem',    textSize: '0.85rem' },
  pc:      { padding: '1.75rem', maxWidth: '480px', titleSize: '1.1rem',  textSize: '0.875rem' },
};

const overlayStyle = {
  position: 'fixed', inset: 0,
  background: 'rgba(0,0,0,0.6)',
  backdropFilter: 'blur(4px)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  padding: '1rem',
  zIndex: 50,
};

export const GlassModal = ({ open, onClose, title, children }) => {
  const bp = useBreakpoint();
  const s = sizes[bp];

  if (!open) return null;

  const modalStyle = {
    background: \`rgba(${state.color}, ${a})\`,
    backdropFilter: \`${bFilter}\`,
    WebkitBackdropFilter: \`${bFilter}\`,
    border: \`1px solid rgba(${state.color}, ${ba})\`,
    borderRadius: \`${state.radius}px\`,
    boxShadow: \`0 24px 64px rgba(0,0,0,${sa})\`,
    padding: s.padding,
    width: '100%',
    maxWidth: s.maxWidth,
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h2 style={{ color: '#fff', fontWeight: 700, fontSize: s.titleSize }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '1.15rem' }}>✕</button>
        </div>
        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: s.textSize, lineHeight: 1.6 }}>{children}</div>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem' }}>
          <button onClick={onClose} style={{ flex: 1, padding: '0.5rem', borderRadius: '0.5rem', background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
          <button onClick={onClose} style={{ flex: 1, padding: '0.5rem', borderRadius: '0.5rem', background: '#e4ff3c', color: '#000', border: 'none', cursor: 'pointer', fontWeight: 700 }}>Confirm</button>
        </div>
      </div>
    </div>
  );
};`;
}

export default function ModalCustomizer({ state, update }) {
  const [bg, setBg] = useState(0);
  const [open, setOpen] = useState(true);
  const glassStyle = buildGlassStyle(state);
  const isLight = state.textColor === 'light';
  const textColor = isLight ? '#fff' : '#111';
  const subColor = isLight ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)';

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-[#0a0a0a] border border-[#1e1e1e] rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#1e1e1e]">
          <div className="flex items-center gap-2 font-mono text-[0.6rem] tracking-widest uppercase text-[#555]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e4ff3c] animate-[pulseDot_2s_infinite]" />
            Live Preview
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setOpen(true)} className="text-[0.7rem] font-semibold text-[#e4ff3c] bg-[rgba(228,255,60,0.07)] border border-[rgba(228,255,60,0.18)] px-3 py-1 rounded-lg transition-all hover:bg-[rgba(228,255,60,0.12)]">
              Open Modal
            </button>
            <div className="flex gap-1.5">
              {BACKGROUNDS.slice(0, 5).map((b, i) => (
                <button key={b.id} onClick={() => setBg(i)} title={b.label}
                  className={`w-6 h-6 rounded-md border-2 transition-all hover:scale-110 ${i === bg ? 'border-white' : 'border-transparent'}`}
                  style={{ background: b.style }} />
              ))}
            </div>
          </div>
        </div>
        <div className="relative min-h-[380px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0" style={{ background: BACKGROUNDS[bg].style }} />
          <div className="blob-animate absolute w-48 h-48 rounded-full top-0 left-0 opacity-15" style={{ background: 'rgba(228,255,60,1)', filter: 'blur(70px)' }} />
          <div className="blob-animate absolute w-40 h-40 rounded-full bottom-0 right-0 opacity-15" style={{ background: 'rgba(196,60,255,1)', filter: 'blur(70px)' }} />

          {/* Background card (simulates page content) */}
          <div className="absolute inset-6 rounded-xl opacity-30 border border-white/10" style={{ background: 'rgba(255,255,255,0.03)' }} />

          {/* Modal */}
          {open && (
            <div className="relative z-10 w-[88%] max-w-sm p-5 sm:p-6 animate-[slideUp_0.4s_cubic-bezier(0.34,1.56,0.64,1)]" style={glassStyle}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-base font-bold mb-1" style={{ color: textColor }}>Confirm Action</div>
                  <div className="text-[0.75rem]" style={{ color: subColor }}>Are you sure you want to proceed with this action?</div>
                </div>
                <button onClick={() => setOpen(false)} className="ml-3 flex-shrink-0 p-1.5 rounded-lg transition-all hover:bg-white/10" style={{ color: subColor }}>
                  <X size={16} />
                </button>
              </div>
              <div className="text-[0.78rem] leading-relaxed mb-5" style={{ color: subColor }}>
                This is a glassmorphism modal dialog. It uses backdrop-filter to blur the content behind it, creating a frosted glass effect.
              </div>
              <div className="flex gap-2">
                <button onClick={() => setOpen(false)} className="flex-1 py-2 rounded-lg text-[0.8rem] font-semibold transition-all hover:-translate-y-0.5 hover:bg-white/15"
                  style={{ background: 'rgba(255,255,255,0.08)', color: textColor, border: `1px solid rgba(${state.color}, ${(state.borderOp / 100).toFixed(2)})` }}>
                  Cancel
                </button>
                <button onClick={() => setOpen(false)} className="flex-1 py-2 rounded-lg text-[0.8rem] font-bold transition-all hover:-translate-y-0.5"
                  style={{ background: '#e4ff3c', color: '#000', borderRadius: state.radius / 2 + 'px' }}>
                  Confirm
                </button>
              </div>
            </div>
          )}
          {!open && (
            <button onClick={() => setOpen(true)} className="relative z-10 text-[0.8rem] font-semibold text-[#888] border border-[#282828] px-5 py-2.5 rounded-xl transition-all hover:border-[rgba(228,255,60,0.18)] hover:text-[#e4ff3c]">
              Click "Open Modal" to preview
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <StatCard label="Blur" value={state.blur} unit="px" />
        <StatCard label="Opacity" value={state.opacity} unit="%" />
        <StatCard label="Radius" value={state.radius} unit="px" />
        <StatCard label="Shadow" value={state.shadow} unit="%" />
      </div>

      <CodeBlock code={buildModalCode(state)} tab={state.tab} onTabChange={v => update('tab', v)} />
    </div>
  );
}
