'use client';
import { buildGlassStyle } from '../../lib/glassState';
import { BACKGROUNDS } from '../../lib/glassState';
import { CodeBlock, StatCard } from '../ui';
import { useState } from 'react';
import { X } from 'lucide-react';

function buildModalCode(state) {
  const a  = (state.opacity / 100).toFixed(2);
  const ba = (state.borderOp / 100).toFixed(2);
  const sa = (state.shadow / 100 * 0.5).toFixed(2);
  return `.modal-overlay {
  position: fixed; inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center;
}

.modal {
  background: rgba(${state.color}, ${a});
  backdrop-filter: blur(${state.blur}px) saturate(${state.saturation}%);
  -webkit-backdrop-filter: blur(${state.blur}px) saturate(${state.saturation}%);
  border: 1px solid rgba(${state.color}, ${ba});
  border-radius: ${state.radius}px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, ${sa});
  padding: 1.75rem; max-width: 480px; width: 90%;
}`;
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
                  style={{ background: 'rgba(255,255,255,0.08)', color: textColor, border: `1px solid rgba(${state.color}, ${(state.borderOp/100).toFixed(2)})` }}>
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
