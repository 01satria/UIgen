'use client';
import { buildGlassStyle, buildCode } from '../../lib/glassState';
import { BACKGROUNDS } from '../../lib/glassState';
import { CodeBlock, StatCard, SectionHeader } from '../ui';
import { useState } from 'react';

export default function CardCustomizer({ state, update }) {
  const [bg, setBg] = useState(0);
  const glassStyle = buildGlassStyle(state);
  const isLight = state.textColor === 'light';
  const code = buildCode(state);

  return (
    <div className="flex flex-col gap-4">
      {/* Preview */}
      <div className="bg-[#0a0a0a] border border-[#1e1e1e] rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-[#1e1e1e]">
          <div className="flex items-center gap-2 font-mono text-[0.6rem] tracking-widest uppercase text-[#555]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e4ff3c] animate-[pulseDot_2s_infinite]" />
            Live Preview
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[0.65rem] font-semibold text-[#3cffa0] bg-[rgba(60,255,160,0.08)] border border-[rgba(60,255,160,0.2)] px-2 py-0.5 rounded-full">● Live</span>
            <div className="flex gap-1.5">
              {BACKGROUNDS.map((b, i) => (
                <button
                  key={b.id}
                  onClick={() => setBg(i)}
                  title={b.label}
                  className={`w-6 h-6 rounded-md border-2 transition-all hover:scale-110 hover:-translate-y-0.5 ${i === bg ? 'border-white' : 'border-transparent'}`}
                  style={{ background: b.style }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="relative min-h-[340px] sm:min-h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0" style={{ background: BACKGROUNDS[bg].style }} />
          {/* Blobs */}
          <div className="blob-animate absolute w-48 h-48 rounded-full top-[5%] left-[5%] opacity-15" style={{ background: 'rgba(228,255,60,1)', filter: 'blur(60px)' }} />
          <div className="blob-animate absolute w-40 h-40 rounded-full bottom-[5%] right-[8%] opacity-15" style={{ background: 'rgba(60,159,255,1)', filter: 'blur(60px)' }} />
          <div className="blob-animate absolute w-32 h-32 rounded-full top-[40%] right-[25%] opacity-10" style={{ background: 'rgba(196,60,255,1)', filter: 'blur(60px)' }} />

          {/* Glass Card */}
          <div className="relative z-10 card-3d w-[260px] sm:w-[300px] p-5 sm:p-6 cursor-default" style={glassStyle}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#e4ff3c] to-[#7fff3c] mb-4 opacity-90 transition-transform duration-300 hover:scale-110 hover:rotate-12" />
            <div className="font-mono text-[0.55rem] tracking-[0.12em] uppercase opacity-45 mb-1" style={{ color: isLight ? '#fff' : '#000' }}>Glassmorphism UI</div>
            <div className="text-lg font-bold mb-2" style={{ color: isLight ? '#fff' : '#111' }}>Glass Card</div>
            <div className="text-[0.78rem] leading-relaxed" style={{ color: isLight ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}>
              Drag sliders to tune every property. CSS updates in real-time below.
            </div>
            <div className="flex gap-2 mt-4 flex-wrap">
              {['✦ GlassForge', 'CSS', 'Free'].map(t => (
                <span key={t} className="text-[0.65rem] font-semibold px-2.5 py-1 rounded-full transition-all hover:scale-105"
                  style={{ background: isLight ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', color: isLight ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.7)' }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
        <StatCard label="Blur" value={state.blur} unit="px" />
        <StatCard label="Opacity" value={state.opacity} unit="%" />
        <StatCard label="Radius" value={state.radius} unit="px" />
        <StatCard label="Saturation" value={state.saturation} unit="%" />
        <StatCard label="Shadow" value={state.shadow} unit="%" />
      </div>

      {/* Code */}
      <CodeBlock
        code={code}
        tab={state.tab}
        onTabChange={v => update('tab', v)}
      />
    </div>
  );
}
