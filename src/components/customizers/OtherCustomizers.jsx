'use client';
import { buildGlassStyle } from '../../lib/glassState';
import { BACKGROUNDS } from '../../lib/glassState';
import { CodeBlock, StatCard } from '../ui';
import { useState } from 'react';
import { Check, X, ChevronDown, Info, Bell, AlertCircle, Home, Settings, User, BarChart2, Menu, Zap } from 'lucide-react';

// ── Toast ──────────────────────────────────
export function ToastCustomizer({ state, update }) {
  const [bg, setBg] = useState(0);
  const glassStyle = buildGlassStyle(state);
  const isLight = state.textColor === 'light';

  const toasts = [
    { icon: <Check size={13}/>, label: 'Changes saved successfully!', color: '#3cffa0', bg: 'rgba(60,255,160,0.12)' },
    { icon: <X size={13}/>, label: 'Something went wrong.', color: '#ff5555', bg: 'rgba(255,85,85,0.12)' },
    { icon: <Info size={13}/>, label: 'Update available — v2.1.0', color: '#3c9fff', bg: 'rgba(60,159,255,0.12)' },
    { icon: <Bell size={13}/>, label: 'New notification received', color: '#c43cff', bg: 'rgba(196,60,255,0.12)' },
  ];

  const code = `.toast {
  background: rgba(${state.color}, ${(state.opacity/100).toFixed(2)});
  backdrop-filter: blur(${state.blur}px);
  border: 1px solid rgba(${state.color}, ${(state.borderOp/100).toFixed(2)});
  border-radius: ${state.radius}px;
  padding: 0.65rem 1rem;
  display: flex; align-items: center; gap: 0.6rem;
  box-shadow: 0 8px 32px rgba(0,0,0,${(state.shadow/100*0.5).toFixed(2)});
}`;

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-[#0a0a0a] border border-[#1e1e1e] rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#1e1e1e]">
          <div className="flex items-center gap-2 font-mono text-[0.6rem] tracking-widest uppercase text-[#555]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e4ff3c]" />Live Preview
          </div>
          <div className="flex gap-1.5">{BACKGROUNDS.slice(0,5).map((b,i)=><button key={i} onClick={()=>setBg(i)} className={`w-6 h-6 rounded-md border-2 ${i===bg?'border-white':'border-transparent'}`} style={{background:b.style}}/>)}</div>
        </div>
        <div className="relative min-h-[300px] flex flex-col items-center justify-center gap-3 p-6 overflow-hidden">
          <div className="absolute inset-0" style={{ background: BACKGROUNDS[bg].style }} />
          <div className="blob-animate absolute w-40 h-40 rounded-full top-0 left-0 opacity-10" style={{ background: 'rgba(228,255,60,1)', filter:'blur(60px)' }} />
          {toasts.map((t,i) => (
            <div key={i} className="relative z-10 w-full max-w-xs flex items-center gap-2.5" style={glassStyle}>
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: t.bg, color: t.color }}>{t.icon}</div>
              <span className="text-[0.78rem] font-medium" style={{ color: isLight ? '#fff' : '#111' }}>{t.label}</span>
              <button className="ml-auto opacity-40 hover:opacity-80" style={{ color: isLight ? '#fff' : '#111' }}><X size={12}/></button>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <StatCard label="Blur" value={state.blur} unit="px" />
        <StatCard label="Opacity" value={state.opacity} unit="%" />
        <StatCard label="Radius" value={state.radius} unit="px" />
        <StatCard label="Shadow" value={state.shadow} unit="%" />
      </div>
      <CodeBlock code={code} tab={state.tab} onTabChange={v=>update('tab',v)} />
    </div>
  );
}

// ── Tooltip ────────────────────────────────
export function TooltipCustomizer({ state, update }) {
  const [bg, setBg] = useState(0);
  const glassStyle = buildGlassStyle(state);
  const isLight = state.textColor === 'light';

  const code = `.tooltip {
  background: rgba(${state.color}, ${(state.opacity/100).toFixed(2)});
  backdrop-filter: blur(${state.blur}px);
  border: 1px solid rgba(${state.color}, ${(state.borderOp/100).toFixed(2)});
  border-radius: ${state.radius}px;
  padding: 0.4rem 0.75rem;
  font-size: 0.75rem; white-space: nowrap;
  position: absolute; bottom: 110%; left: 50%;
  transform: translateX(-50%);
}`;

  const items = ['Home', 'Analytics', 'Settings', 'Profile'];
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-[#0a0a0a] border border-[#1e1e1e] rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#1e1e1e]">
          <div className="flex items-center gap-2 font-mono text-[0.6rem] tracking-widest uppercase text-[#555]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e4ff3c]" />Live Preview — Hover items
          </div>
          <div className="flex gap-1.5">{BACKGROUNDS.slice(0,5).map((b,i)=><button key={i} onClick={()=>setBg(i)} className={`w-6 h-6 rounded-md border-2 ${i===bg?'border-white':'border-transparent'}`} style={{background:b.style}}/>)}</div>
        </div>
        <div className="relative min-h-[280px] flex items-center justify-center gap-8 overflow-hidden p-6">
          <div className="absolute inset-0" style={{ background: BACKGROUNDS[bg].style }} />
          <div className="blob-animate absolute w-48 h-48 top-0 right-0 opacity-10 rounded-full" style={{ background: 'rgba(60,159,255,1)', filter:'blur(70px)' }} />
          {items.map(item => (
            <div key={item} className="group relative z-10 flex flex-col items-center gap-2 cursor-pointer">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-[rgba(255,255,255,0.1)] transition-all hover:-translate-y-1 hover:shadow-lg" style={{background:'rgba(255,255,255,0.06)'}}>
                <span className="text-xl">{item==='Home'?'🏠':item==='Analytics'?'📊':item==='Settings'?'⚙️':'👤'}</span>
              </div>
              {/* Tooltip */}
              <div className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-200 pointer-events-none z-20 px-3 py-1.5 text-[0.72rem] font-semibold whitespace-nowrap" style={{...glassStyle, color: isLight?'#fff':'#111'}}>
                {item}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 -mt-1" style={{background:`rgba(${state.color},${(state.opacity/100).toFixed(2)})`, border:`1px solid rgba(${state.color},${(state.borderOp/100).toFixed(2)})`}} />
              </div>
              <span className="text-[0.65rem] text-[#555]">{item}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <StatCard label="Blur" value={state.blur} unit="px" />
        <StatCard label="Opacity" value={state.opacity} unit="%" />
        <StatCard label="Radius" value={state.radius} unit="px" />
        <StatCard label="Shadow" value={state.shadow} unit="%" />
      </div>
      <CodeBlock code={code} tab={state.tab} onTabChange={v=>update('tab',v)} />
    </div>
  );
}

// ── Dropdown ───────────────────────────────
export function DropdownCustomizer({ state, update }) {
  const [bg, setBg] = useState(0);
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState('React');
  const glassStyle = buildGlassStyle(state);
  const isLight = state.textColor === 'light';
  const options = ['React', 'Vue', 'Svelte', 'Astro', 'Next.js'];

  const code = `.dropdown {
  background: rgba(${state.color}, ${(state.opacity/100).toFixed(2)});
  backdrop-filter: blur(${state.blur}px) saturate(${state.saturation}%);
  border: 1px solid rgba(${state.color}, ${(state.borderOp/100).toFixed(2)});
  border-radius: ${state.radius}px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,${(state.shadow/100*0.5).toFixed(2)});
}`;

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-[#0a0a0a] border border-[#1e1e1e] rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#1e1e1e]">
          <div className="flex items-center gap-2 font-mono text-[0.6rem] tracking-widest uppercase text-[#555]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e4ff3c]" />Live Preview
          </div>
          <div className="flex gap-1.5">{BACKGROUNDS.slice(0,5).map((b,i)=><button key={i} onClick={()=>setBg(i)} className={`w-6 h-6 rounded-md border-2 ${i===bg?'border-white':'border-transparent'}`} style={{background:b.style}}/>)}</div>
        </div>
        <div className="relative min-h-[320px] flex items-start justify-center pt-16 overflow-hidden p-6">
          <div className="absolute inset-0" style={{ background: BACKGROUNDS[bg].style }} />
          <div className="blob-animate absolute w-48 h-48 top-0 left-0 opacity-10 rounded-full" style={{ background: 'rgba(196,60,255,1)', filter:'blur(70px)' }} />
          <div className="relative z-10 w-64">
            <button onClick={() => setOpen(!open)}
              className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-semibold transition-all hover:scale-[1.01]"
              style={{ ...glassStyle, color: isLight?'#fff':'#111' }}>
              {selected}
              <ChevronDown size={15} className={`transition-transform duration-200 ${open?'rotate-180':''}`} />
            </button>
            {open && (
              <div className="mt-1 overflow-hidden" style={glassStyle}>
                {options.map(opt => (
                  <button key={opt} onClick={() => { setSelected(opt); }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-all hover:bg-white/10 ${selected===opt?'font-bold':''}`}
                    style={{ color: isLight?'#fff':'#111' }}>
                    {selected === opt && <span className="mr-2 text-[#e4ff3c]">✓</span>}
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <StatCard label="Blur" value={state.blur} unit="px" />
        <StatCard label="Opacity" value={state.opacity} unit="%" />
        <StatCard label="Radius" value={state.radius} unit="px" />
        <StatCard label="Shadow" value={state.shadow} unit="%" />
      </div>
      <CodeBlock code={code} tab={state.tab} onTabChange={v=>update('tab',v)} />
    </div>
  );
}

// ── Badge ──────────────────────────────────
export function BadgeCustomizer({ state, update }) {
  const [bg, setBg] = useState(0);
  const glassStyle = buildGlassStyle(state);
  const isLight = state.textColor === 'light';

  const badges = [
    { label: '● Active', c: '#3cffa0', bg: 'rgba(60,255,160,0.1)' },
    { label: '◉ Pending', c: '#e4ff3c', bg: 'rgba(228,255,60,0.1)' },
    { label: '✕ Error', c: '#ff5555', bg: 'rgba(255,85,85,0.1)' },
    { label: '◈ New', c: '#3c9fff', bg: 'rgba(60,159,255,0.1)' },
    { label: '⚡ Beta', c: '#c43cff', bg: 'rgba(196,60,255,0.1)' },
    { label: '★ Premium', c: '#ff9f3c', bg: 'rgba(255,159,60,0.1)' },
  ];
  const code = `.badge {
  background: rgba(${state.color}, ${(state.opacity/100).toFixed(2)});
  backdrop-filter: blur(${state.blur}px);
  border: 1px solid rgba(${state.color}, ${(state.borderOp/100).toFixed(2)});
  border-radius: 999px;
  padding: 0.22rem 0.65rem;
  font-size: 0.68rem; font-weight: 600;
}`;
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-[#0a0a0a] border border-[#1e1e1e] rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#1e1e1e]">
          <div className="flex items-center gap-2 font-mono text-[0.6rem] tracking-widest uppercase text-[#555]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e4ff3c]" />Live Preview
          </div>
          <div className="flex gap-1.5">{BACKGROUNDS.slice(0,5).map((b,i)=><button key={i} onClick={()=>setBg(i)} className={`w-6 h-6 rounded-md border-2 ${i===bg?'border-white':'border-transparent'}`} style={{background:b.style}}/>)}</div>
        </div>
        <div className="relative min-h-[280px] flex items-center justify-center flex-wrap gap-3 overflow-hidden p-6">
          <div className="absolute inset-0" style={{ background: BACKGROUNDS[bg].style }} />
          <div className="blob-animate absolute w-48 h-48 top-0 right-0 opacity-10 rounded-full" style={{background:'rgba(228,255,60,1)',filter:'blur(70px)'}} />
          {badges.map(b => (
            <span key={b.label}
              className="relative z-10 px-3 py-1 rounded-full text-[0.72rem] font-semibold border transition-all hover:scale-110 hover:-translate-y-1"
              style={{ background: b.bg, color: b.c, border: `1px solid ${b.c}33` }}>
              {b.label}
            </span>
          ))}
          {/* Glass styled */}
          {['CSS', 'React', 'v2.0', 'Free'].map(t => (
            <span key={t} className="relative z-10 text-[0.72rem] font-semibold transition-all hover:scale-110 hover:-translate-y-1"
              style={{ ...glassStyle, padding: '0.22rem 0.7rem', borderRadius: '999px', color: isLight?'#fff':'#111' }}>
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <StatCard label="Blur" value={state.blur} unit="px" />
        <StatCard label="Opacity" value={state.opacity} unit="%" />
        <StatCard label="Radius" value={state.radius} unit="px" />
        <StatCard label="Border" value={state.borderOp} unit="%" />
      </div>
      <CodeBlock code={code} tab={state.tab} onTabChange={v=>update('tab',v)} />
    </div>
  );
}

// ── Form ───────────────────────────────────
export function FormCustomizer({ state, update }) {
  const [bg, setBg] = useState(0);
  const glassStyle = buildGlassStyle(state);
  const isLight = state.textColor === 'light';
  const textColor = isLight ? '#fff' : '#111';
  const subColor = isLight ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
  const code = `.glass-input {
  background: rgba(${state.color}, ${(state.opacity/100).toFixed(2)});
  backdrop-filter: blur(${state.blur}px);
  border: 1px solid rgba(${state.color}, ${(state.borderOp/100).toFixed(2)});
  border-radius: ${state.radius}px;
  padding: 0.6rem 0.9rem;
  color: inherit; outline: none; width: 100%;
}
.glass-input:focus {
  border-color: rgba(228, 255, 60, 0.5);
  box-shadow: 0 0 0 3px rgba(228, 255, 60, 0.1);
}`;
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-[#0a0a0a] border border-[#1e1e1e] rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#1e1e1e]">
          <div className="flex items-center gap-2 font-mono text-[0.6rem] tracking-widest uppercase text-[#555]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e4ff3c]" />Live Preview
          </div>
          <div className="flex gap-1.5">{BACKGROUNDS.slice(0,5).map((b,i)=><button key={i} onClick={()=>setBg(i)} className={`w-6 h-6 rounded-md border-2 ${i===bg?'border-white':'border-transparent'}`} style={{background:b.style}}/>)}</div>
        </div>
        <div className="relative min-h-[360px] flex items-center justify-center overflow-hidden p-6">
          <div className="absolute inset-0" style={{ background: BACKGROUNDS[bg].style }} />
          <div className="blob-animate absolute w-48 h-48 top-0 left-0 opacity-10 rounded-full" style={{background:'rgba(60,159,255,1)',filter:'blur(70px)'}} />
          <div className="relative z-10 w-full max-w-sm p-5 sm:p-6" style={glassStyle}>
            <div className="text-base font-bold mb-4" style={{ color: textColor }}>Create Account</div>
            <div className="flex flex-col gap-3">
              <div>
                <label className="block text-[0.7rem] font-semibold mb-1" style={{ color: subColor }}>Full Name</label>
                <input className="w-full px-3.5 py-2.5 rounded-lg text-sm outline-none transition-all focus:ring-2 focus:ring-[rgba(228,255,60,0.2)]"
                  style={{ ...glassStyle, color: textColor }} placeholder="John Doe" defaultValue="" />
              </div>
              <div>
                <label className="block text-[0.7rem] font-semibold mb-1" style={{ color: subColor }}>Email</label>
                <input className="w-full px-3.5 py-2.5 rounded-lg text-sm outline-none"
                  style={{ ...glassStyle, color: textColor }} placeholder="john@example.com" defaultValue="" />
              </div>
              <div>
                <label className="block text-[0.7rem] font-semibold mb-1" style={{ color: subColor }}>Password</label>
                <input type="password" className="w-full px-3.5 py-2.5 rounded-lg text-sm outline-none"
                  style={{ ...glassStyle, color: textColor }} placeholder="••••••••" defaultValue="" />
              </div>
              <button className="w-full py-2.5 rounded-lg font-bold text-sm mt-1 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: '#e4ff3c', color: '#000' }}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <StatCard label="Blur" value={state.blur} unit="px" />
        <StatCard label="Opacity" value={state.opacity} unit="%" />
        <StatCard label="Radius" value={state.radius} unit="px" />
        <StatCard label="Shadow" value={state.shadow} unit="%" />
      </div>
      <CodeBlock code={code} tab={state.tab} onTabChange={v=>update('tab',v)} />
    </div>
  );
}

// ── Table ──────────────────────────────────
export function TableCustomizer({ state, update }) {
  const [bg, setBg] = useState(0);
  const glassStyle = buildGlassStyle(state);
  const isLight = state.textColor === 'light';
  const textColor = isLight ? '#fff' : '#111';
  const rows = [
    { name: 'GlassForge', status: 'Active', version: 'v2.0', size: '4.2kb' },
    { name: 'NextUI', status: 'Active', version: 'v2.3', size: '12kb' },
    { name: 'Radix UI', status: 'Beta', version: 'v1.8', size: '8.1kb' },
    { name: 'shadcn', status: 'Active', version: 'v0.9', size: '6.5kb' },
  ];
  const code = `.glass-table { border-radius: ${state.radius}px; overflow: hidden; }
.glass-table th {
  background: rgba(${state.color}, ${(state.opacity/100).toFixed(2)});
  backdrop-filter: blur(${state.blur}px);
  padding: 0.75rem 1rem; text-align: left;
}
.glass-table td {
  background: rgba(${state.color}, ${((state.opacity/2)/100).toFixed(2)});
  padding: 0.65rem 1rem;
  border-top: 1px solid rgba(${state.color}, ${(state.borderOp/100).toFixed(2)});
}`;
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-[#0a0a0a] border border-[#1e1e1e] rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#1e1e1e]">
          <div className="flex items-center gap-2 font-mono text-[0.6rem] tracking-widest uppercase text-[#555]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e4ff3c]" />Live Preview
          </div>
          <div className="flex gap-1.5">{BACKGROUNDS.slice(0,5).map((b,i)=><button key={i} onClick={()=>setBg(i)} className={`w-6 h-6 rounded-md border-2 ${i===bg?'border-white':'border-transparent'}`} style={{background:b.style}}/>)}</div>
        </div>
        <div className="relative min-h-[320px] flex items-center justify-center overflow-hidden p-6">
          <div className="absolute inset-0" style={{ background: BACKGROUNDS[bg].style }} />
          <div className="blob-animate absolute w-48 h-48 top-0 right-0 opacity-10 rounded-full" style={{background:'rgba(60,255,160,1)',filter:'blur(70px)'}} />
          <div className="relative z-10 w-full max-w-lg overflow-hidden" style={{ borderRadius: state.radius + 'px', border: `1px solid rgba(${state.color},${(state.borderOp/100).toFixed(2)})` }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: `rgba(${state.color}, ${(state.opacity/100).toFixed(2)})`, backdropFilter: `blur(${state.blur}px)` }}>
                  {['Name','Status','Version','Size'].map(h=><th key={h} className="px-3 py-2.5 text-left font-semibold text-[0.72rem]" style={{color:textColor}}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {rows.map((r,i) => (
                  <tr key={i} style={{ background: `rgba(${state.color}, ${((state.opacity/2)/100).toFixed(2)})`, backdropFilter: `blur(${state.blur/2}px)` }} className="transition-all hover:bg-white/10">
                    <td className="px-3 py-2.5 font-semibold text-[0.75rem]" style={{color:textColor,borderTop:`1px solid rgba(${state.color},${(state.borderOp/100).toFixed(2)})`}}>{r.name}</td>
                    <td className="px-3 py-2.5 text-[0.72rem]" style={{borderTop:`1px solid rgba(${state.color},${(state.borderOp/100).toFixed(2)})`}}>
                      <span className={`px-2 py-0.5 rounded-full text-[0.62rem] font-bold ${r.status==='Active'?'bg-[rgba(60,255,160,0.15)] text-[#3cffa0]':'bg-[rgba(228,255,60,0.15)] text-[#e4ff3c]'}`}>{r.status}</span>
                    </td>
                    <td className="px-3 py-2.5 font-mono text-[0.7rem]" style={{color:isLight?'rgba(255,255,255,0.6)':'rgba(0,0,0,0.6)',borderTop:`1px solid rgba(${state.color},${(state.borderOp/100).toFixed(2)})`}}>{r.version}</td>
                    <td className="px-3 py-2.5 font-mono text-[0.7rem]" style={{color:isLight?'rgba(255,255,255,0.6)':'rgba(0,0,0,0.6)',borderTop:`1px solid rgba(${state.color},${(state.borderOp/100).toFixed(2)})`}}>{r.size}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <StatCard label="Blur" value={state.blur} unit="px" />
        <StatCard label="Opacity" value={state.opacity} unit="%" />
        <StatCard label="Radius" value={state.radius} unit="px" />
        <StatCard label="Border" value={state.borderOp} unit="%" />
      </div>
      <CodeBlock code={code} tab={state.tab} onTabChange={v=>update('tab',v)} />
    </div>
  );
}

// ── Sidebar ────────────────────────────────
export function SidebarCustomizer({ state, update }) {
  const [bg, setBg] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const glassStyle = buildGlassStyle(state);
  const isLight = state.textColor === 'light';
  const items = [
    { icon: <Home size={16}/>, label: 'Dashboard' },
    { icon: <BarChart2 size={16}/>, label: 'Analytics' },
    { icon: <User size={16}/>, label: 'Profile' },
    { icon: <Settings size={16}/>, label: 'Settings' },
    { icon: <Zap size={16}/>, label: 'Upgrade' },
  ];
  const code = `.glass-sidebar {
  background: rgba(${state.color}, ${(state.opacity/100).toFixed(2)});
  backdrop-filter: blur(${state.blur}px) saturate(${state.saturation}%);
  border-right: 1px solid rgba(${state.color}, ${(state.borderOp/100).toFixed(2)});
  border-radius: 0 ${state.radius}px ${state.radius}px 0;
  width: 240px; height: 100vh;
  padding: 1.5rem 1rem;
}`;
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-[#0a0a0a] border border-[#1e1e1e] rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#1e1e1e]">
          <div className="flex items-center gap-2 font-mono text-[0.6rem] tracking-widest uppercase text-[#555]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e4ff3c]" />Live Preview
          </div>
          <div className="flex gap-1.5">{BACKGROUNDS.slice(0,5).map((b,i)=><button key={i} onClick={()=>setBg(i)} className={`w-6 h-6 rounded-md border-2 ${i===bg?'border-white':'border-transparent'}`} style={{background:b.style}}/>)}</div>
        </div>
        <div className="relative min-h-[340px] flex items-stretch overflow-hidden">
          <div className="absolute inset-0" style={{ background: BACKGROUNDS[bg].style }} />
          <div className="blob-animate absolute w-48 h-48 top-0 right-0 opacity-10 rounded-full" style={{background:'rgba(60,159,255,1)',filter:'blur(70px)'}} />
          {/* Sidebar */}
          <div className="relative z-10 w-48 sm:w-56 p-3 sm:p-4 flex flex-col gap-1" style={{ ...glassStyle, borderRadius: `0 ${state.radius}px ${state.radius}px 0` }}>
            <div className="flex items-center gap-2 mb-4 px-2">
              <div className="w-7 h-7 rounded-md bg-[#e4ff3c] flex items-center justify-center text-black font-black text-sm">◈</div>
              <span className="font-bold text-sm" style={{ color: isLight?'#fff':'#111' }}>GlassForge</span>
            </div>
            {items.map((item, i) => (
              <button key={i} onClick={() => setActiveIdx(i)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[0.78rem] font-semibold transition-all hover:-translate-x-0.5 text-left w-full ${activeIdx===i?'bg-[rgba(228,255,60,0.15)] text-[#e4ff3c]':''}`}
                style={{ color: activeIdx===i?'#e4ff3c':isLight?'rgba(255,255,255,0.65)':'rgba(0,0,0,0.65)' }}>
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
          {/* Main content area */}
          <div className="relative z-10 flex-1 p-4 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl mb-2">{items[activeIdx].icon}</div>
              <div className="text-sm font-semibold" style={{color:isLight?'rgba(255,255,255,0.5)':'rgba(0,0,0,0.5)'}}>
                {items[activeIdx].label}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <StatCard label="Blur" value={state.blur} unit="px" />
        <StatCard label="Opacity" value={state.opacity} unit="%" />
        <StatCard label="Radius" value={state.radius} unit="px" />
        <StatCard label="Shadow" value={state.shadow} unit="%" />
      </div>
      <CodeBlock code={code} tab={state.tab} onTabChange={v=>update('tab',v)} />
    </div>
  );
}

// ── Tabs ───────────────────────────────────
export function TabsCustomizer({ state, update }) {
  const [bg, setBg] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const glassStyle = buildGlassStyle(state);
  const isLight = state.textColor === 'light';
  const tabs = ['Overview', 'Analytics', 'Settings', 'Team'];
  const code = `.glass-tabs {
  background: rgba(${state.color}, ${(state.opacity/100).toFixed(2)});
  backdrop-filter: blur(${state.blur}px);
  border: 1px solid rgba(${state.color}, ${(state.borderOp/100).toFixed(2)});
  border-radius: ${state.radius}px;
  padding: 0.3rem; display: flex; gap: 0.2rem;
}
.tab-item { padding: 0.5rem 1rem; border-radius: ${Math.max(state.radius-4,4)}px; }
.tab-item.active {
  background: rgba(${state.color}, ${Math.min(state.opacity/50,1).toFixed(2)});
}`;
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-[#0a0a0a] border border-[#1e1e1e] rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#1e1e1e]">
          <div className="flex items-center gap-2 font-mono text-[0.6rem] tracking-widest uppercase text-[#555]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e4ff3c]" />Live Preview
          </div>
          <div className="flex gap-1.5">{BACKGROUNDS.slice(0,5).map((b,i)=><button key={i} onClick={()=>setBg(i)} className={`w-6 h-6 rounded-md border-2 ${i===bg?'border-white':'border-transparent'}`} style={{background:b.style}}/>)}</div>
        </div>
        <div className="relative min-h-[320px] flex flex-col items-center justify-center gap-4 overflow-hidden p-6">
          <div className="absolute inset-0" style={{ background: BACKGROUNDS[bg].style }} />
          <div className="blob-animate absolute w-48 h-48 top-0 left-0 opacity-10 rounded-full" style={{background:'rgba(228,255,60,1)',filter:'blur(70px)'}} />
          {/* Tab bar */}
          <div className="relative z-10 flex gap-1 p-1" style={glassStyle}>
            {tabs.map((t,i) => (
              <button key={t} onClick={()=>setActiveTab(i)}
                className="px-3.5 py-2 text-[0.78rem] font-semibold transition-all"
                style={{
                  borderRadius: Math.max(state.radius-4,4)+'px',
                  background: activeTab===i ? `rgba(${state.color}, ${Math.min(state.opacity/40,1).toFixed(2)})` : 'transparent',
                  color: activeTab===i ? (isLight?'#fff':'#111') : isLight?'rgba(255,255,255,0.5)':'rgba(0,0,0,0.5)',
                }}>
                {t}
              </button>
            ))}
          </div>
          {/* Tab content */}
          <div className="relative z-10 w-full max-w-sm px-5 py-4" style={glassStyle}>
            <div className="font-bold text-sm mb-1" style={{ color: isLight?'#fff':'#111' }}>{tabs[activeTab]}</div>
            <div className="text-[0.75rem]" style={{ color: isLight?'rgba(255,255,255,0.55)':'rgba(0,0,0,0.55)' }}>
              This is the {tabs[activeTab].toLowerCase()} tab content. Click tabs to switch between panels.
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <StatCard label="Blur" value={state.blur} unit="px" />
        <StatCard label="Opacity" value={state.opacity} unit="%" />
        <StatCard label="Radius" value={state.radius} unit="px" />
        <StatCard label="Border" value={state.borderOp} unit="%" />
      </div>
      <CodeBlock code={code} tab={state.tab} onTabChange={v=>update('tab',v)} />
    </div>
  );
}

// ── Navbar ─────────────────────────────────
export function NavbarCustomizer({ state, update }) {
  const [bg, setBg] = useState(0);
  const glassStyle = buildGlassStyle(state);
  const isLight = state.textColor === 'light';
  const code = `.glass-navbar {
  position: sticky; top: 0; z-index: 50;
  background: rgba(${state.color}, ${(state.opacity/100).toFixed(2)});
  backdrop-filter: blur(${state.blur}px) saturate(${state.saturation}%);
  -webkit-backdrop-filter: blur(${state.blur}px) saturate(${state.saturation}%);
  border-bottom: 1px solid rgba(${state.color}, ${(state.borderOp/100).toFixed(2)});
}`;
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-[#0a0a0a] border border-[#1e1e1e] rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#1e1e1e]">
          <div className="flex items-center gap-2 font-mono text-[0.6rem] tracking-widest uppercase text-[#555]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e4ff3c]" />Live Preview
          </div>
          <div className="flex gap-1.5">{BACKGROUNDS.slice(0,5).map((b,i)=><button key={i} onClick={()=>setBg(i)} className={`w-6 h-6 rounded-md border-2 ${i===bg?'border-white':'border-transparent'}`} style={{background:b.style}}/>)}</div>
        </div>
        <div className="relative min-h-[300px] overflow-hidden">
          <div className="absolute inset-0" style={{ background: BACKGROUNDS[bg].style }} />
          <div className="blob-animate absolute w-48 h-48 top-1/4 left-1/4 opacity-10 rounded-full" style={{background:'rgba(196,60,255,1)',filter:'blur(70px)'}} />
          {/* Navbar */}
          <div className="relative z-10 px-5 py-3 flex items-center justify-between" style={glassStyle}>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-[#e4ff3c] flex items-center justify-center text-black font-black text-sm">◈</div>
              <span className="font-bold text-sm" style={{color:isLight?'#fff':'#111'}}>GlassForge</span>
            </div>
            <nav className="hidden sm:flex gap-4">
              {['Home','Docs','Components','Pricing'].map(n=>(
                <a key={n} href="#" className="text-[0.78rem] font-semibold transition-all hover:opacity-100 opacity-60" style={{color:isLight?'#fff':'#111'}}>{n}</a>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <button className="px-4 py-1.5 rounded-lg text-[0.78rem] font-bold transition-all hover:-translate-y-0.5" style={{background:'#e4ff3c',color:'#000'}}>Get Started</button>
              <button className="sm:hidden" style={{color:isLight?'#fff':'#111'}}><Menu size={18}/></button>
            </div>
          </div>
          {/* Page content behind */}
          <div className="relative z-0 flex items-center justify-center h-[220px]">
            <div className="text-center">
              <div className="font-bold text-2xl sm:text-3xl mb-2" style={{color:isLight?'rgba(255,255,255,0.2)':'rgba(0,0,0,0.15)'}}>Page Content</div>
              <div className="text-sm" style={{color:isLight?'rgba(255,255,255,0.1)':'rgba(0,0,0,0.1)'}}>Scroll to see sticky effect</div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <StatCard label="Blur" value={state.blur} unit="px" />
        <StatCard label="Opacity" value={state.opacity} unit="%" />
        <StatCard label="Border" value={state.borderOp} unit="%" />
        <StatCard label="Saturation" value={state.saturation} unit="%" />
      </div>
      <CodeBlock code={code} tab={state.tab} onTabChange={v=>update('tab',v)} />
    </div>
  );
}

// ── Avatar ─────────────────────────────────
export function AvatarCustomizer({ state, update }) {
  const [bg, setBg] = useState(0);
  const glassStyle = buildGlassStyle(state);
  const isLight = state.textColor === 'light';
  const avatars = [
    { initials: 'JD', color: '#e4ff3c', status: 'online' },
    { initials: 'AK', color: '#3cffa0', status: 'away' },
    { initials: 'MR', color: '#3c9fff', status: 'busy' },
    { initials: 'SR', color: '#c43cff', status: 'offline' },
  ];
  const statusColors = { online: '#3cffa0', away: '#e4ff3c', busy: '#ff5555', offline: '#555' };
  const code = `.avatar {
  background: rgba(${state.color}, ${(state.opacity/100).toFixed(2)});
  backdrop-filter: blur(${state.blur}px);
  border: 2px solid rgba(${state.color}, ${(state.borderOp/100).toFixed(2)});
  border-radius: 50%;
  width: 48px; height: 48px;
  display: flex; align-items: center; justify-content: center;
}`;
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-[#0a0a0a] border border-[#1e1e1e] rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#1e1e1e]">
          <div className="flex items-center gap-2 font-mono text-[0.6rem] tracking-widest uppercase text-[#555]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e4ff3c]" />Live Preview
          </div>
          <div className="flex gap-1.5">{BACKGROUNDS.slice(0,5).map((b,i)=><button key={i} onClick={()=>setBg(i)} className={`w-6 h-6 rounded-md border-2 ${i===bg?'border-white':'border-transparent'}`} style={{background:b.style}}/>)}</div>
        </div>
        <div className="relative min-h-[280px] flex items-center justify-center gap-8 overflow-hidden p-6 flex-wrap">
          <div className="absolute inset-0" style={{ background: BACKGROUNDS[bg].style }} />
          <div className="blob-animate absolute w-48 h-48 top-0 right-0 opacity-10 rounded-full" style={{background:'rgba(60,255,170,1)',filter:'blur(70px)'}} />
          {/* Single avatars */}
          {avatars.map((a,i) => (
            <div key={i} className="relative z-10 flex flex-col items-center gap-2 group cursor-pointer">
              <div className="relative">
                <div className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-sm transition-all group-hover:scale-110 group-hover:-translate-y-1"
                  style={{ ...glassStyle, border: `2px solid ${a.color}44` }}>
                  <span style={{ color: isLight?'#fff':'#111' }}>{a.initials}</span>
                </div>
                <div className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full border-2 border-black" style={{ background: statusColors[a.status] }} />
              </div>
              <span className="font-mono text-[0.58rem] capitalize" style={{ color: statusColors[a.status] }}>{a.status}</span>
            </div>
          ))}
          {/* Stacked group */}
          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className="flex -space-x-3">
              {avatars.map((a,i)=>(
                <div key={i} className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-xs border-2 border-black transition-all hover:z-10 hover:scale-110"
                  style={{ ...glassStyle, border: `2px solid ${a.color}33` }}>
                  <span style={{color:isLight?'#fff':'#111'}}>{a.initials[0]}</span>
                </div>
              ))}
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-xs border-2 border-black" style={{background:'rgba(255,255,255,0.1)',color:isLight?'rgba(255,255,255,0.7)':'rgba(0,0,0,0.7)'}}>+8</div>
            </div>
            <span className="font-mono text-[0.58rem] text-[#555]">Stacked group</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <StatCard label="Blur" value={state.blur} unit="px" />
        <StatCard label="Opacity" value={state.opacity} unit="%" />
        <StatCard label="Border" value={state.borderOp} unit="%" />
        <StatCard label="Saturation" value={state.saturation} unit="%" />
      </div>
      <CodeBlock code={code} tab={state.tab} onTabChange={v=>update('tab',v)} />
    </div>
  );
}

// ── Progress ───────────────────────────────
export function ProgressCustomizer({ state, update }) {
  const [bg, setBg] = useState(0);
  const glassStyle = buildGlassStyle(state);
  const isLight = state.textColor === 'light';
  const bars = [
    { label: 'Design', pct: 85, color: '#e4ff3c' },
    { label: 'Frontend', pct: 72, color: '#3cffa0' },
    { label: 'Backend', pct: 58, color: '#3c9fff' },
    { label: 'Testing', pct: 40, color: '#c43cff' },
  ];
  const code = `.glass-progress-track {
  background: rgba(${state.color}, ${(state.opacity/100).toFixed(2)});
  backdrop-filter: blur(${state.blur}px);
  border: 1px solid rgba(${state.color}, ${(state.borderOp/100).toFixed(2)});
  border-radius: 999px; height: 8px; overflow: hidden;
}
.glass-progress-bar {
  height: 100%; border-radius: 999px;
  background: var(--accent);
  transition: width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}`;
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-[#0a0a0a] border border-[#1e1e1e] rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#1e1e1e]">
          <div className="flex items-center gap-2 font-mono text-[0.6rem] tracking-widest uppercase text-[#555]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e4ff3c]" />Live Preview
          </div>
          <div className="flex gap-1.5">{BACKGROUNDS.slice(0,5).map((b,i)=><button key={i} onClick={()=>setBg(i)} className={`w-6 h-6 rounded-md border-2 ${i===bg?'border-white':'border-transparent'}`} style={{background:b.style}}/>)}</div>
        </div>
        <div className="relative min-h-[300px] flex items-center justify-center overflow-hidden p-6">
          <div className="absolute inset-0" style={{ background: BACKGROUNDS[bg].style }} />
          <div className="blob-animate absolute w-48 h-48 top-0 left-0 opacity-10 rounded-full" style={{background:'rgba(228,255,60,1)',filter:'blur(70px)'}} />
          <div className="relative z-10 w-full max-w-sm p-5" style={glassStyle}>
            <div className="font-bold text-sm mb-4" style={{ color: isLight?'#fff':'#111' }}>Project Progress</div>
            <div className="flex flex-col gap-4">
              {bars.map(b => (
                <div key={b.label}>
                  <div className="flex justify-between text-[0.72rem] font-semibold mb-1.5">
                    <span style={{ color: isLight?'rgba(255,255,255,0.8)':'rgba(0,0,0,0.8)' }}>{b.label}</span>
                    <span style={{ color: b.color }}>{b.pct}%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: `rgba(${state.color}, ${(state.opacity/100).toFixed(2)})`, border: `1px solid rgba(${state.color}, ${(state.borderOp/100).toFixed(2)})` }}>
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: b.pct + '%', background: b.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <StatCard label="Blur" value={state.blur} unit="px" />
        <StatCard label="Opacity" value={state.opacity} unit="%" />
        <StatCard label="Radius" value={state.radius} unit="px" />
        <StatCard label="Border" value={state.borderOp} unit="%" />
      </div>
      <CodeBlock code={code} tab={state.tab} onTabChange={v=>update('tab',v)} />
    </div>
  );
}

// ── Chart ──────────────────────────────────
export function ChartCustomizer({ state, update }) {
  const [bg, setBg] = useState(0);
  const glassStyle = buildGlassStyle(state);
  const isLight = state.textColor === 'light';
  const data = [40, 65, 50, 80, 55, 90, 70, 85, 60, 95, 75, 88];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const maxV = Math.max(...data);
  const code = `.glass-chart {
  background: rgba(${state.color}, ${(state.opacity/100).toFixed(2)});
  backdrop-filter: blur(${state.blur}px) saturate(${state.saturation}%);
  border: 1px solid rgba(${state.color}, ${(state.borderOp/100).toFixed(2)});
  border-radius: ${state.radius}px;
  padding: 1.5rem;
}`;
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-[#0a0a0a] border border-[#1e1e1e] rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#1e1e1e]">
          <div className="flex items-center gap-2 font-mono text-[0.6rem] tracking-widest uppercase text-[#555]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e4ff3c]" />Live Preview
          </div>
          <div className="flex gap-1.5">{BACKGROUNDS.slice(0,5).map((b,i)=><button key={i} onClick={()=>setBg(i)} className={`w-6 h-6 rounded-md border-2 ${i===bg?'border-white':'border-transparent'}`} style={{background:b.style}}/>)}</div>
        </div>
        <div className="relative min-h-[340px] flex items-center justify-center overflow-hidden p-6">
          <div className="absolute inset-0" style={{ background: BACKGROUNDS[bg].style }} />
          <div className="blob-animate absolute w-48 h-48 top-0 right-0 opacity-10 rounded-full" style={{background:'rgba(60,159,255,1)',filter:'blur(70px)'}} />
          <div className="relative z-10 w-full max-w-md p-5" style={glassStyle}>
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="font-bold text-sm" style={{ color: isLight?'#fff':'#111' }}>Monthly Revenue</div>
                <div className="font-mono text-[0.65rem]" style={{ color: isLight?'rgba(255,255,255,0.5)':'rgba(0,0,0,0.5)' }}>2024 overview</div>
              </div>
              <span className="text-[#3cffa0] font-bold text-sm">+24.5%</span>
            </div>
            <div className="flex items-end gap-1 h-28">
              {data.map((v, i) => (
                <div key={i} className="group flex-1 flex flex-col items-center gap-1">
                  <div className="w-full rounded-sm transition-all duration-300 group-hover:opacity-100 opacity-80"
                    style={{ height: (v / maxV * 100) + '%', background: `rgba(228,255,60,${0.3 + v/maxV*0.7})`, minHeight: '4px' }} />
                </div>
              ))}
            </div>
            <div className="flex gap-1 mt-2">
              {months.map(m => (
                <div key={m} className="flex-1 text-center font-mono text-[0.45rem]" style={{ color: isLight?'rgba(255,255,255,0.35)':'rgba(0,0,0,0.35)' }}>{m}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <StatCard label="Blur" value={state.blur} unit="px" />
        <StatCard label="Opacity" value={state.opacity} unit="%" />
        <StatCard label="Radius" value={state.radius} unit="px" />
        <StatCard label="Saturation" value={state.saturation} unit="%" />
      </div>
      <CodeBlock code={code} tab={state.tab} onTabChange={v=>update('tab',v)} />
    </div>
  );
}

// ── Slider UI Component ────────────────────
export function SliderUiCustomizer({ state, update }) {
  const [bg, setBg] = useState(0);
  const [v1, setV1] = useState(65);
  const [v2, setV2] = useState(40);
  const [v3, setV3] = useState(80);
  const glassStyle = buildGlassStyle(state);
  const isLight = state.textColor === 'light';
  const code = `.glass-slider-wrap {
  background: rgba(${state.color}, ${(state.opacity/100).toFixed(2)});
  backdrop-filter: blur(${state.blur}px);
  border: 1px solid rgba(${state.color}, ${(state.borderOp/100).toFixed(2)});
  border-radius: ${state.radius}px;
  padding: 1.25rem;
}

.glass-range::-webkit-slider-thumb {
  background: var(--accent);
  box-shadow: 0 0 0 3px rgba(228, 255, 60, 0.2);
}`;
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-[#0a0a0a] border border-[#1e1e1e] rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#1e1e1e]">
          <div className="flex items-center gap-2 font-mono text-[0.6rem] tracking-widest uppercase text-[#555]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e4ff3c]" />Live Preview
          </div>
          <div className="flex gap-1.5">{BACKGROUNDS.slice(0,5).map((b,i)=><button key={i} onClick={()=>setBg(i)} className={`w-6 h-6 rounded-md border-2 ${i===bg?'border-white':'border-transparent'}`} style={{background:b.style}}/>)}</div>
        </div>
        <div className="relative min-h-[300px] flex items-center justify-center overflow-hidden p-6">
          <div className="absolute inset-0" style={{ background: BACKGROUNDS[bg].style }} />
          <div className="blob-animate absolute w-48 h-48 top-0 left-0 opacity-10 rounded-full" style={{background:'rgba(60,255,216,1)',filter:'blur(70px)'}} />
          <div className="relative z-10 w-full max-w-sm p-5 flex flex-col gap-5" style={glassStyle}>
            <div className="font-bold text-sm" style={{ color: isLight?'#fff':'#111' }}>Audio Controls</div>
            {[{ label:'Volume', val:v1, set:setV1, color:'#e4ff3c' },
              { label:'Bass', val:v2, set:setV2, color:'#3cffa0' },
              { label:'Treble', val:v3, set:setV3, color:'#3c9fff' }].map(s=>(
              <div key={s.label}>
                <div className="flex justify-between text-[0.72rem] font-semibold mb-2">
                  <span style={{color:isLight?'rgba(255,255,255,0.7)':'rgba(0,0,0,0.7)'}}>{s.label}</span>
                  <span style={{color:s.color}}>{s.val}%</span>
                </div>
                <input type="range" min={0} max={100} value={s.val}
                  onChange={e=>s.set(parseInt(e.target.value))}
                  style={{'--pct':`${s.val}%`, '--accent':s.color} as any} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <StatCard label="Blur" value={state.blur} unit="px" />
        <StatCard label="Opacity" value={state.opacity} unit="%" />
        <StatCard label="Radius" value={state.radius} unit="px" />
        <StatCard label="Border" value={state.borderOp} unit="%" />
      </div>
      <CodeBlock code={code} tab={state.tab} onTabChange={v=>update('tab',v)} />
    </div>
  );
}
