'use client';
import { buildGlassStyle } from '../../lib/glassState';
import { BACKGROUNDS } from '../../lib/glassState';
import { CodeBlock, StatCard } from '../ui';
import { useState } from 'react';

function buildButtonCode(state) {
  const s = buildGlassStyle(state);
  return `.glass-btn {
  background: rgba(${state.color}, ${(state.opacity/100).toFixed(2)});
  backdrop-filter: blur(${state.blur}px) saturate(${state.saturation}%);
  -webkit-backdrop-filter: blur(${state.blur}px) saturate(${state.saturation}%);
  border: 1px solid rgba(${state.color}, ${(state.borderOp/100).toFixed(2)});
  border-radius: ${state.radius}px;
  padding: 0.6rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.glass-btn:hover {
  transform: translateY(-2px) scale(1.04);
  box-shadow: 0 ${state.shadow/5}px ${state.shadow/2}px rgba(0,0,0,${(state.shadow/100*0.5).toFixed(2)});
}`;
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
