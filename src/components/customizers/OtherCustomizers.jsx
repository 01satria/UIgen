'use client';
import { buildGlassStyle } from '../../lib/glassState';
import { BACKGROUNDS } from '../../lib/glassState';
import { CodeBlock, StatCard } from '../ui';
import { useState } from 'react';
import { Check, X, ChevronDown, Info, Bell, AlertCircle, Home, Settings, User, BarChart2, Menu, Zap } from 'lucide-react';

// ── Code Builders ─────────────────────────
function buildToastCode(state) {
  const a = (state.opacity/100).toFixed(2), ba = (state.borderOp/100).toFixed(2), sa = (state.shadow/100*0.5).toFixed(2);
  const bf = `blur(${state.blur}px)`;
  if (state.tab === 'css') return `.toast {
  background: rgba(${state.color}, ${a});
  backdrop-filter: ${bf};
  -webkit-backdrop-filter: ${bf};
  border: 1px solid rgba(${state.color}, ${ba});
  border-radius: ${state.radius}px;
  padding: 0.65rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, ${sa});
}

.toast-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 0.65rem;
  font-weight: 700;
}

.toast-icon.success { background: rgba(60,255,160,0.12); color: #3cffa0; }
.toast-icon.error   { background: rgba(255,85,85,0.12);  color: #ff5555; }
.toast-icon.info    { background: rgba(60,159,255,0.12); color: #3c9fff; }

<!-- HTML -->
<div class="toast">
  <div class="toast-icon success">✓</div>
  <span style="color:#fff; font-size:0.78rem; font-weight:500">Changes saved!</span>
  <button style="margin-left:auto; color:rgba(255,255,255,0.4); background:none; border:none; cursor:pointer">✕</button>
</div>`;

  if (state.tab === 'tailwind') return `<!-- Tailwind Markup -->
<div class="flex items-center gap-2.5
  bg-white/${Math.round(state.opacity)}
  backdrop-blur-[${state.blur}px]
  border border-white/${Math.round(state.borderOp)}
  rounded-[${state.radius}px]
  px-4 py-2.5
  shadow-[0_8px_32px_rgba(0,0,0,${sa})]">

  <!-- Icon -->
  <div class="w-6 h-6 rounded-full flex items-center justify-center
    bg-green-500/10 text-green-400 text-xs font-bold flex-shrink-0">
    ✓
  </div>

  <!-- Message -->
  <span class="text-white text-sm font-medium">
    Changes saved successfully!
  </span>

  <!-- Close -->
  <button class="ml-auto text-white/40 hover:text-white/80 transition-colors">
    ✕
  </button>
</div>`;

  if (state.tab === 'vars') return `:root {
  --glass-bg:     rgba(${state.color}, ${a});
  --glass-blur:   ${state.blur}px;
  --glass-border: rgba(${state.color}, ${ba});
  --glass-radius: ${state.radius}px;
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, ${sa});
}

.toast {
  background:      var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border:          1px solid var(--glass-border);
  border-radius:   var(--glass-radius);
  box-shadow:      var(--glass-shadow);
  padding:         0.65rem 1rem;
  display:         flex;
  align-items:     center;
  gap:             0.6rem;
}

<!-- HTML -->
<div class="toast">
  <div class="toast-icon success">✓</div>
  <span>Changes saved!</span>
  <button class="toast-close">✕</button>
</div>`;

  /* react */
  return `import { useState } from 'react';

const toastStyle = {
  background:          \`rgba(${state.color}, ${a})\`,
  backdropFilter:      \`${bf}\`,
  WebkitBackdropFilter:\`${bf}\`,
  border:              \`1px solid rgba(${state.color}, ${ba})\`,
  borderRadius:        \`${state.radius}px\`,
  boxShadow:           \`0 8px 32px rgba(0,0,0,${sa})\`,
  padding:             '0.65rem 1rem',
  display:             'flex',
  alignItems:          'center',
  gap:                 '0.6rem',
};

const icons = {
  success: { bg: 'rgba(60,255,160,0.12)', color: '#3cffa0', symbol: '✓' },
  error:   { bg: 'rgba(255,85,85,0.12)',  color: '#ff5555',  symbol: '✕' },
  info:    { bg: 'rgba(60,159,255,0.12)', color: '#3c9fff',  symbol: 'ℹ' },
};

export function GlassToast({ message, type = 'success', onClose }) {
  const icon = icons[type];
  return (
    <div style={toastStyle}>
      <div style={{
        width: 24, height: 24, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: icon.bg, color: icon.color,
        fontSize: '0.65rem', fontWeight: 700, flexShrink: 0,
      }}>
        {icon.symbol}
      </div>
      <span style={{ color: '#fff', fontSize: '0.78rem', fontWeight: 500 }}>
        {message}
      </span>
      <button onClick={onClose} style={{
        marginLeft: 'auto', background: 'none', border: 'none',
        color: 'rgba(255,255,255,0.4)', cursor: 'pointer',
      }}>
        ✕
      </button>
    </div>
  );
}`;
}

function buildTooltipCode(state) {
  const a = (state.opacity/100).toFixed(2), ba = (state.borderOp/100).toFixed(2);
  const bf = `blur(${state.blur}px)`;

  if (state.tab === 'css') return `.tooltip-wrap {
  position: relative;
  display: inline-block;
}

.tooltip {
  background:      rgba(${state.color}, ${a});
  backdrop-filter: ${bf};
  -webkit-backdrop-filter: ${bf};
  border:          1px solid rgba(${state.color}, ${ba});
  border-radius:   ${state.radius}px;
  color:           #fff;
  padding:         0.4rem 0.75rem;
  font-size:       0.75rem;
  white-space:     nowrap;
  /* positioning */
  position:        absolute;
  bottom:          calc(100% + 8px);
  left:            50%;
  transform:       translateX(-50%);
  opacity:         0;
  pointer-events:  none;
  transition:      opacity 0.2s, transform 0.2s;
}

.tooltip-wrap:hover .tooltip {
  opacity:   1;
  transform: translateX(-50%) translateY(-2px);
}

<!-- HTML -->
<div class="tooltip-wrap">
  <button>Hover me</button>
  <div class="tooltip">Tooltip text here</div>
</div>`;

  if (state.tab === 'tailwind') return `<!-- Tailwind Markup — hover trigger -->
<div class="relative group inline-block">

  <!-- Trigger -->
  <button class="px-4 py-2 bg-white/10 rounded-lg text-white text-sm">
    Hover me
  </button>

  <!-- Tooltip -->
  <div class="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2
    opacity-0 group-hover:opacity-100
    -translate-y-2 group-hover:translate-y-0
    transition-all duration-200 pointer-events-none z-20
    bg-white/${Math.round(state.opacity)}
    backdrop-blur-[${state.blur}px]
    border border-white/${Math.round(state.borderOp)}
    rounded-[${state.radius}px]
    px-3 py-1.5 text-xs font-semibold text-white whitespace-nowrap">
    Tooltip text
    <!-- Arrow -->
    <div class="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2
      rotate-45 -mt-1
      bg-white/${Math.round(state.opacity)}
      border-r border-b border-white/${Math.round(state.borderOp)}">
    </div>
  </div>

</div>`;

  if (state.tab === 'vars') return `:root {
  --glass-bg:     rgba(${state.color}, ${a});
  --glass-blur:   ${state.blur}px;
  --glass-border: rgba(${state.color}, ${ba});
  --glass-radius: ${state.radius}px;
}

.tooltip-wrap { position: relative; display: inline-block; }

.tooltip {
  background:      var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border:          1px solid var(--glass-border);
  border-radius:   var(--glass-radius);
  color:           #fff;
  padding:         0.4rem 0.75rem;
  font-size:       0.75rem;
  white-space:     nowrap;
  position:        absolute;
  bottom:          calc(100% + 8px);
  left:            50%;
  transform:       translateX(-50%);
  opacity:         0;
  transition:      opacity 0.2s;
}
.tooltip-wrap:hover .tooltip { opacity: 1; }

<!-- HTML -->
<div class="tooltip-wrap">
  <button>Hover me</button>
  <div class="tooltip">Tooltip text here</div>
</div>`;

  /* react */
  return `import { useState } from 'react';

const tooltipStyle = {
  background:          \`rgba(${state.color}, ${a})\`,
  backdropFilter:      \`${bf}\`,
  WebkitBackdropFilter:\`${bf}\`,
  border:              \`1px solid rgba(${state.color}, ${ba})\`,
  borderRadius:        \`${state.radius}px\`,
  color:               '#fff',
  padding:             '0.4rem 0.75rem',
  fontSize:            '0.75rem',
  whiteSpace:          'nowrap',
  position:            'absolute',
  bottom:              'calc(100% + 8px)',
  left:                '50%',
  transform:           'translateX(-50%)',
};

export function GlassTooltip({ text, children }) {
  const [show, setShow] = useState(false);
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div style={tooltipStyle}>{text}</div>
      )}
    </div>
  );
}

// Usage
// <GlassTooltip text="Tooltip text">
//   <button>Hover me</button>
// </GlassTooltip>`;
}

function buildDropdownCode(state) {
  const a = (state.opacity/100).toFixed(2), ba = (state.borderOp/100).toFixed(2), sa = (state.shadow/100*0.5).toFixed(2);
  const bf = `blur(${state.blur}px) saturate(${state.saturation}%)`;

  if (state.tab === 'css') return `.dropdown-wrap { position: relative; width: 16rem; }

.dropdown-trigger,
.dropdown-menu {
  background:      rgba(${state.color}, ${a});
  backdrop-filter: ${bf};
  -webkit-backdrop-filter: ${bf};
  border:          1px solid rgba(${state.color}, ${ba});
  border-radius:   ${state.radius}px;
  box-shadow:      0 8px 32px rgba(0, 0, 0, ${sa});
}

.dropdown-trigger {
  width:           100%;
  display:         flex;
  align-items:     center;
  justify-content: space-between;
  padding:         0.625rem 1rem;
  color:           #fff;
  font-weight:     600;
  font-size:       0.875rem;
  cursor:          pointer;
}

.dropdown-menu {
  position:        absolute;
  top:             calc(100% + 4px);
  left:            0;
  right:           0;
  overflow:        hidden;
  z-index:         10;
}

.dropdown-item {
  width:           100%;
  padding:         0.625rem 1rem;
  text-align:      left;
  color:           #fff;
  font-size:       0.875rem;
  cursor:          pointer;
  transition:      background 0.15s;
}
.dropdown-item:hover     { background: rgba(255,255,255,0.08); }
.dropdown-item.selected  { color: #e4ff3c; font-weight: 700; }

<!-- HTML -->
<div class="dropdown-wrap">
  <button class="dropdown-trigger">
    React <span>▾</span>
  </button>
  <div class="dropdown-menu">
    <button class="dropdown-item selected">✓ React</button>
    <button class="dropdown-item">Vue</button>
    <button class="dropdown-item">Svelte</button>
    <button class="dropdown-item">Next.js</button>
  </div>
</div>`;

  if (state.tab === 'tailwind') return `<!-- Tailwind Markup -->
<div class="relative w-64">

  <!-- Trigger -->
  <button class="w-full flex items-center justify-between
    px-4 py-2.5 text-sm font-semibold text-white
    bg-white/${Math.round(state.opacity)}
    backdrop-blur-[${state.blur}px]
    backdrop-saturate-[${state.saturation}%]
    border border-white/${Math.round(state.borderOp)}
    rounded-[${state.radius}px]
    shadow-[0_8px_32px_rgba(0,0,0,${sa})]">
    React
    <svg width="14" height="14" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  </button>

  <!-- Menu -->
  <div class="absolute top-[calc(100%+4px)] left-0 right-0 z-10 overflow-hidden
    bg-white/${Math.round(state.opacity)}
    backdrop-blur-[${state.blur}px]
    border border-white/${Math.round(state.borderOp)}
    rounded-[${state.radius}px]
    shadow-[0_8px_32px_rgba(0,0,0,${sa})]">
    <button class="w-full text-left px-4 py-2.5 text-sm font-bold text-[#e4ff3c] hover:bg-white/10">✓ React</button>
    <button class="w-full text-left px-4 py-2.5 text-sm text-white hover:bg-white/10">Vue</button>
    <button class="w-full text-left px-4 py-2.5 text-sm text-white hover:bg-white/10">Svelte</button>
    <button class="w-full text-left px-4 py-2.5 text-sm text-white hover:bg-white/10">Next.js</button>
  </div>

</div>`;

  if (state.tab === 'vars') return `:root {
  --glass-bg:     rgba(${state.color}, ${a});
  --glass-blur:   ${state.blur}px;
  --glass-saturation: ${state.saturation}%;
  --glass-border: rgba(${state.color}, ${ba});
  --glass-radius: ${state.radius}px;
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, ${sa});
}

.dropdown-wrap  { position: relative; width: 16rem; }
.dropdown-glass {
  background:      var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturation));
  border:          1px solid var(--glass-border);
  border-radius:   var(--glass-radius);
  box-shadow:      var(--glass-shadow);
}
.dropdown-trigger {
  composes: dropdown-glass;
  width: 100%; display: flex;
  align-items: center; justify-content: space-between;
  padding: 0.625rem 1rem; color: #fff;
  font-weight: 600; font-size: 0.875rem; cursor: pointer;
}
.dropdown-menu   { position: absolute; top: calc(100% + 4px); left: 0; right: 0; overflow: hidden; z-index: 10; }
.dropdown-item   { width: 100%; padding: 0.625rem 1rem; text-align: left; color: #fff; font-size: 0.875rem; cursor: pointer; }
.dropdown-item:hover   { background: rgba(255,255,255,0.08); }
.dropdown-item.selected { color: #e4ff3c; font-weight: 700; }

<!-- HTML -->
<div class="dropdown-wrap">
  <button class="dropdown-trigger dropdown-glass">React ▾</button>
  <div class="dropdown-menu dropdown-glass">
    <button class="dropdown-item selected">✓ React</button>
    <button class="dropdown-item">Vue</button>
    <button class="dropdown-item">Svelte</button>
  </div>
</div>`;

  /* react */
  return `import { useState } from 'react';

const glassStyle = {
  background:          \`rgba(${state.color}, ${a})\`,
  backdropFilter:      \`${bf}\`,
  WebkitBackdropFilter:\`${bf}\`,
  border:              \`1px solid rgba(${state.color}, ${ba})\`,
  borderRadius:        \`${state.radius}px\`,
  boxShadow:           \`0 8px 32px rgba(0,0,0,${sa})\`,
};

const options = ['React', 'Vue', 'Svelte', 'Astro', 'Next.js'];

export function GlassDropdown({ placeholder = 'Select...' }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ position: 'relative', width: '16rem' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          ...glassStyle,
          width: '100%', padding: '0.625rem 1rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          color: '#fff', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer',
        }}>
        {selected || placeholder}
        <span style={{ transform: open ? 'rotate(180deg)' : 'none', transition: '0.2s' }}>▾</span>
      </button>

      {open && (
        <div style={{ ...glassStyle, position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, overflow: 'hidden', zIndex: 10 }}>
          {options.map(opt => (
            <button key={opt}
              onClick={() => { setSelected(opt); setOpen(false); }}
              style={{
                width: '100%', padding: '0.625rem 1rem', textAlign: 'left',
                background: 'none', border: 'none', cursor: 'pointer',
                color: selected === opt ? '#e4ff3c' : '#fff',
                fontWeight: selected === opt ? 700 : 400,
                fontSize: '0.875rem',
              }}>
              {selected === opt && '✓ '}{opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}`;
}

function buildBadgeCode(state) {
  const a = (state.opacity/100).toFixed(2), ba = (state.borderOp/100).toFixed(2);
  const bf = `blur(${state.blur}px)`;

  if (state.tab === 'css') return `.badge {
  display:         inline-flex;
  align-items:     center;
  gap:             0.25rem;
  background:      rgba(${state.color}, ${a});
  backdrop-filter: ${bf};
  -webkit-backdrop-filter: ${bf};
  border:          1px solid rgba(${state.color}, ${ba});
  border-radius:   999px;
  padding:         0.22rem 0.65rem;
  font-size:       0.68rem;
  font-weight:     600;
}

/* Colored variants */
.badge-success { background: rgba(60,255,160,0.12); border-color: rgba(60,255,160,0.3);  color: #3cffa0; }
.badge-warning { background: rgba(228,255,60,0.12); border-color: rgba(228,255,60,0.3);  color: #e4ff3c; }
.badge-danger  { background: rgba(255,85,85,0.12);  border-color: rgba(255,85,85,0.3);   color: #ff5555; }
.badge-info    { background: rgba(60,159,255,0.12); border-color: rgba(60,159,255,0.3);  color: #3c9fff; }

<!-- HTML -->
<span class="badge" style="color:#fff">◈ Glass</span>
<span class="badge badge-success">● Active</span>
<span class="badge badge-warning">◉ Pending</span>
<span class="badge badge-danger">✕ Error</span>
<span class="badge badge-info">◈ New</span>`;

  if (state.tab === 'tailwind') return `<!-- Tailwind Markup -->

<!-- Glass badge -->
<span class="inline-flex items-center gap-1
  bg-white/${Math.round(state.opacity)}
  backdrop-blur-[${state.blur}px]
  border border-white/${Math.round(state.borderOp)}
  rounded-full px-3 py-0.5
  text-[0.68rem] font-semibold text-white">
  ◈ Glass
</span>

<!-- Status variants -->
<span class="inline-flex items-center gap-1 bg-green-500/10  border border-green-500/30  rounded-full px-3 py-0.5 text-[0.68rem] font-semibold text-green-400">● Active</span>
<span class="inline-flex items-center gap-1 bg-yellow-400/10 border border-yellow-400/30 rounded-full px-3 py-0.5 text-[0.68rem] font-semibold text-yellow-400">◉ Pending</span>
<span class="inline-flex items-center gap-1 bg-red-500/10   border border-red-500/30   rounded-full px-3 py-0.5 text-[0.68rem] font-semibold text-red-400">✕ Error</span>
<span class="inline-flex items-center gap-1 bg-blue-500/10  border border-blue-500/30  rounded-full px-3 py-0.5 text-[0.68rem] font-semibold text-blue-400">◈ New</span>`;

  if (state.tab === 'vars') return `:root {
  --glass-bg:     rgba(${state.color}, ${a});
  --glass-blur:   ${state.blur}px;
  --glass-border: rgba(${state.color}, ${ba});
}

.badge {
  display:         inline-flex;
  align-items:     center;
  gap:             0.25rem;
  background:      var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border:          1px solid var(--glass-border);
  border-radius:   999px;
  padding:         0.22rem 0.65rem;
  font-size:       0.68rem;
  font-weight:     600;
}

.badge-success { --glass-bg: rgba(60,255,160,0.12); --glass-border: rgba(60,255,160,0.3);  color: #3cffa0; }
.badge-warning { --glass-bg: rgba(228,255,60,0.12); --glass-border: rgba(228,255,60,0.3);  color: #e4ff3c; }
.badge-danger  { --glass-bg: rgba(255,85,85,0.12);  --glass-border: rgba(255,85,85,0.3);   color: #ff5555; }

<!-- HTML -->
<span class="badge" style="color:#fff">◈ Glass</span>
<span class="badge badge-success">● Active</span>
<span class="badge badge-warning">◉ Pending</span>
<span class="badge badge-danger">✕ Error</span>`;

  /* react */
  return `const variants = {
  glass:   { background: \`rgba(${state.color}, ${a})\`, border: \`1px solid rgba(${state.color}, ${ba})\`, color: '#fff' },
  success: { background: 'rgba(60,255,160,0.12)',  border: '1px solid rgba(60,255,160,0.3)',  color: '#3cffa0' },
  warning: { background: 'rgba(228,255,60,0.12)',  border: '1px solid rgba(228,255,60,0.3)',  color: '#e4ff3c' },
  danger:  { background: 'rgba(255,85,85,0.12)',   border: '1px solid rgba(255,85,85,0.3)',   color: '#ff5555' },
  info:    { background: 'rgba(60,159,255,0.12)',  border: '1px solid rgba(60,159,255,0.3)',  color: '#3c9fff' },
};

const baseStyle = {
  display:         'inline-flex',
  alignItems:      'center',
  gap:             '0.25rem',
  backdropFilter:  \`${bf}\`,
  WebkitBackdropFilter: \`${bf}\`,
  borderRadius:    '999px',
  padding:         '0.22rem 0.65rem',
  fontSize:        '0.68rem',
  fontWeight:      600,
};

export function GlassBadge({ label, variant = 'glass' }) {
  return (
    <span style={{ ...baseStyle, ...variants[variant] }}>
      {label}
    </span>
  );
}

// Usage
// <GlassBadge label="● Active"  variant="success" />
// <GlassBadge label="◉ Pending" variant="warning" />
// <GlassBadge label="✕ Error"   variant="danger"  />
// <GlassBadge label="◈ Glass"   variant="glass"   />`;
}

function buildFormCode(state) {
  const a = (state.opacity/100).toFixed(2), ba = (state.borderOp/100).toFixed(2);
  const bf = `blur(${state.blur}px)`;

  if (state.tab === 'css') return `.glass-form {
  background:      rgba(${state.color}, ${a});
  backdrop-filter: ${bf};
  -webkit-backdrop-filter: ${bf};
  border:          1px solid rgba(${state.color}, ${ba});
  border-radius:   ${state.radius}px;
  padding:         1.5rem;
  max-width:       24rem;
  width:           100%;
}

.glass-input {
  background:      rgba(${state.color}, ${a});
  backdrop-filter: ${bf};
  -webkit-backdrop-filter: ${bf};
  border:          1px solid rgba(${state.color}, ${ba});
  border-radius:   ${Math.max(state.radius - 4, 6)}px;
  padding:         0.6rem 0.9rem;
  color:           #fff;
  font-size:       0.875rem;
  outline:         none;
  width:           100%;
  transition:      border-color 0.2s, box-shadow 0.2s;
}
.glass-input::placeholder { color: rgba(255,255,255,0.3); }
.glass-input:focus {
  border-color: rgba(228, 255, 60, 0.5);
  box-shadow:   0 0 0 3px rgba(228, 255, 60, 0.1);
}

label {
  display:       block;
  font-size:     0.7rem;
  font-weight:   600;
  color:         rgba(255,255,255,0.5);
  margin-bottom: 0.25rem;
}

<!-- HTML -->
<form class="glass-form">
  <h2 style="color:#fff; font-weight:700; margin-bottom:1rem">Create Account</h2>

  <div style="display:flex; flex-direction:column; gap:0.75rem">
    <div>
      <label>Full Name</label>
      <input class="glass-input" type="text" placeholder="John Doe" />
    </div>
    <div>
      <label>Email</label>
      <input class="glass-input" type="email" placeholder="john@example.com" />
    </div>
    <div>
      <label>Password</label>
      <input class="glass-input" type="password" placeholder="••••••••" />
    </div>
    <button style="background:#e4ff3c; color:#000; padding:0.625rem; border-radius:0.5rem; font-weight:700; border:none; cursor:pointer; margin-top:0.25rem">
      Sign Up
    </button>
  </div>
</form>`;

  if (state.tab === 'tailwind') return `<!-- Tailwind Markup -->
<form class="bg-white/${Math.round(state.opacity)}
  backdrop-blur-[${state.blur}px]
  border border-white/${Math.round(state.borderOp)}
  rounded-[${state.radius}px]
  p-6 w-full max-w-sm">

  <h2 class="text-base font-bold text-white mb-4">Create Account</h2>

  <div class="flex flex-col gap-3">
    <!-- Name -->
    <div>
      <label class="block text-[0.7rem] font-semibold text-white/50 mb-1">Full Name</label>
      <input type="text" placeholder="John Doe"
        class="w-full bg-white/${Math.round(state.opacity)}
          backdrop-blur-[${state.blur}px]
          border border-white/${Math.round(state.borderOp)}
          rounded-[${Math.max(state.radius - 4, 6)}px]
          px-3.5 py-2.5 text-sm text-white
          placeholder:text-white/30
          outline-none
          focus:ring-2 focus:ring-yellow-400/20
          focus:border-yellow-400/50" />
    </div>

    <!-- Email -->
    <div>
      <label class="block text-[0.7rem] font-semibold text-white/50 mb-1">Email</label>
      <input type="email" placeholder="john@example.com"
        class="w-full bg-white/${Math.round(state.opacity)}
          backdrop-blur-[${state.blur}px]
          border border-white/${Math.round(state.borderOp)}
          rounded-[${Math.max(state.radius - 4, 6)}px]
          px-3.5 py-2.5 text-sm text-white
          placeholder:text-white/30 outline-none" />
    </div>

    <!-- Submit -->
    <button class="w-full py-2.5 rounded-lg bg-[#e4ff3c] text-black font-bold text-sm mt-1
      hover:-translate-y-0.5 hover:shadow-lg transition-all">
      Sign Up
    </button>
  </div>
</form>`;

  if (state.tab === 'vars') return `:root {
  --glass-bg:     rgba(${state.color}, ${a});
  --glass-blur:   ${state.blur}px;
  --glass-border: rgba(${state.color}, ${ba});
  --glass-radius: ${state.radius}px;
}

.glass-form, .glass-input {
  background:      var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border:          1px solid var(--glass-border);
  border-radius:   var(--glass-radius);
}

.glass-form  { padding: 1.5rem; max-width: 24rem; }
.glass-input { padding: 0.6rem 0.9rem; color: #fff; outline: none; width: 100%; font-size: 0.875rem; }
.glass-input:focus { border-color: rgba(228,255,60,0.5); box-shadow: 0 0 0 3px rgba(228,255,60,0.1); }
.glass-input::placeholder { color: rgba(255,255,255,0.3); }
label { display: block; font-size: 0.7rem; font-weight: 600; color: rgba(255,255,255,0.5); margin-bottom: 0.25rem; }

<!-- HTML -->
<form class="glass-form">
  <h2 style="color:#fff; font-weight:700; margin-bottom:1rem">Create Account</h2>
  <div style="display:flex; flex-direction:column; gap:0.75rem">
    <div><label>Full Name</label><input class="glass-input" type="text" placeholder="John Doe" /></div>
    <div><label>Email</label><input class="glass-input" type="email" placeholder="john@example.com" /></div>
    <div><label>Password</label><input class="glass-input" type="password" placeholder="••••••••" /></div>
    <button style="background:#e4ff3c; color:#000; padding:0.625rem; border-radius:0.5rem; font-weight:700; border:none; cursor:pointer">Sign Up</button>
  </div>
</form>`;

  /* react */
  return `import { useState } from 'react';

const glassStyle = {
  background:          \`rgba(${state.color}, ${a})\`,
  backdropFilter:      \`${bf}\`,
  WebkitBackdropFilter:\`${bf}\`,
  border:              \`1px solid rgba(${state.color}, ${ba})\`,
  borderRadius:        \`${state.radius}px\`,
};

const inputStyle = {
  ...glassStyle,
  borderRadius: \`${Math.max(state.radius - 4, 6)}px\`,
  padding:      '0.6rem 0.9rem',
  color:        '#fff',
  fontSize:     '0.875rem',
  outline:      'none',
  width:        '100%',
};

const fields = [
  { key: 'name',     type: 'text',     label: 'Full Name', placeholder: 'John Doe' },
  { key: 'email',    type: 'email',    label: 'Email',     placeholder: 'john@example.com' },
  { key: 'password', type: 'password', label: 'Password',  placeholder: '••••••••' },
];

export function GlassForm({ onSubmit }) {
  const [data, setData] = useState({ name: '', email: '', password: '' });

  return (
    <form style={{ ...glassStyle, padding: '1.5rem', maxWidth: '24rem' }}
      onSubmit={e => { e.preventDefault(); onSubmit?.(data); }}>
      <h2 style={{ color: '#fff', fontWeight: 700, marginBottom: '1rem' }}>
        Create Account
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {fields.map(({ key, type, label, placeholder }) => (
          <div key={key}>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)', marginBottom: '0.25rem' }}>
              {label}
            </label>
            <input
              type={type}
              placeholder={placeholder}
              value={data[key]}
              onChange={e => setData({ ...data, [key]: e.target.value })}
              style={inputStyle}
            />
          </div>
        ))}
        <button type="submit" style={{
          background: '#e4ff3c', color: '#000', padding: '0.625rem',
          borderRadius: '0.5rem', fontWeight: 700, border: 'none',
          cursor: 'pointer', marginTop: '0.25rem',
        }}>
          Sign Up
        </button>
      </div>
    </form>
  );
}`;
}

function buildTableCode(state) {
  const a = (state.opacity/100).toFixed(2), ba = (state.borderOp/100).toFixed(2);
  const ha = (state.opacity/2/100).toFixed(2);
  const bf = `blur(${state.blur}px)`;

  if (state.tab === 'css') return `.glass-table {
  border-radius: ${state.radius}px;
  overflow:      hidden;
  border:        1px solid rgba(${state.color}, ${ba});
  width:         100%;
  border-collapse: separate;
  border-spacing: 0;
}

.glass-table th {
  background:      rgba(${state.color}, ${a});
  backdrop-filter: ${bf};
  -webkit-backdrop-filter: ${bf};
  padding:         0.75rem 1rem;
  text-align:      left;
  color:           #fff;
  font-size:       0.72rem;
  font-weight:     600;
  letter-spacing:  0.04em;
}

.glass-table td {
  background:  rgba(${state.color}, ${ha});
  padding:     0.65rem 1rem;
  border-top:  1px solid rgba(${state.color}, ${ba});
  color:       rgba(255,255,255,0.7);
  font-size:   0.75rem;
  transition:  background 0.15s;
}
.glass-table tr:hover td { background: rgba(255,255,255,0.06); }

.badge-active  { background: rgba(60,255,160,0.15); color: #3cffa0; padding: 0.15rem 0.5rem; border-radius: 999px; font-size: 0.62rem; font-weight: 700; }
.badge-beta    { background: rgba(228,255,60,0.15);  color: #e4ff3c;  padding: 0.15rem 0.5rem; border-radius: 999px; font-size: 0.62rem; font-weight: 700; }

<!-- HTML -->
<table class="glass-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Status</th>
      <th>Version</th>
      <th>Size</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="font-weight:600; color:#fff">GlassForge</td>
      <td><span class="badge-active">Active</span></td>
      <td style="font-family:monospace">v2.0</td>
      <td style="font-family:monospace">4.2kb</td>
    </tr>
    <tr>
      <td style="font-weight:600; color:#fff">NextUI</td>
      <td><span class="badge-active">Active</span></td>
      <td style="font-family:monospace">v2.3</td>
      <td style="font-family:monospace">12kb</td>
    </tr>
    <tr>
      <td style="font-weight:600; color:#fff">Radix UI</td>
      <td><span class="badge-beta">Beta</span></td>
      <td style="font-family:monospace">v1.8</td>
      <td style="font-family:monospace">8.1kb</td>
    </tr>
  </tbody>
</table>`;

  if (state.tab === 'tailwind') return `<!-- Tailwind Markup -->
<div class="rounded-[${state.radius}px] overflow-hidden border border-white/${Math.round(state.borderOp)}">
  <table class="w-full text-sm border-collapse">

    <!-- Header -->
    <thead>
      <tr class="bg-white/${Math.round(state.opacity)} backdrop-blur-[${state.blur}px]">
        <th class="px-4 py-3 text-left text-xs font-semibold text-white tracking-wide">Name</th>
        <th class="px-4 py-3 text-left text-xs font-semibold text-white tracking-wide">Status</th>
        <th class="px-4 py-3 text-left text-xs font-semibold text-white tracking-wide">Version</th>
        <th class="px-4 py-3 text-left text-xs font-semibold text-white tracking-wide">Size</th>
      </tr>
    </thead>

    <!-- Rows -->
    <tbody>
      <tr class="bg-white/${Math.round(state.opacity/2)} border-t border-white/${Math.round(state.borderOp)} hover:bg-white/10 transition-colors">
        <td class="px-4 py-2.5 font-semibold text-white text-xs">GlassForge</td>
        <td class="px-4 py-2.5"><span class="bg-green-500/15 text-green-400 px-2 py-0.5 rounded-full text-[0.62rem] font-bold">Active</span></td>
        <td class="px-4 py-2.5 text-white/60 font-mono text-xs">v2.0</td>
        <td class="px-4 py-2.5 text-white/60 font-mono text-xs">4.2kb</td>
      </tr>
      <tr class="bg-white/${Math.round(state.opacity/2)} border-t border-white/${Math.round(state.borderOp)} hover:bg-white/10 transition-colors">
        <td class="px-4 py-2.5 font-semibold text-white text-xs">Radix UI</td>
        <td class="px-4 py-2.5"><span class="bg-yellow-400/15 text-yellow-400 px-2 py-0.5 rounded-full text-[0.62rem] font-bold">Beta</span></td>
        <td class="px-4 py-2.5 text-white/60 font-mono text-xs">v1.8</td>
        <td class="px-4 py-2.5 text-white/60 font-mono text-xs">8.1kb</td>
      </tr>
    </tbody>

  </table>
</div>`;

  if (state.tab === 'vars') return `:root {
  --glass-bg:     rgba(${state.color}, ${a});
  --glass-blur:   ${state.blur}px;
  --glass-border: rgba(${state.color}, ${ba});
  --glass-radius: ${state.radius}px;
}

.glass-table { border-radius: var(--glass-radius); overflow: hidden; border: 1px solid var(--glass-border); width: 100%; border-collapse: separate; border-spacing: 0; }
.glass-table th { background: var(--glass-bg); backdrop-filter: blur(var(--glass-blur)); padding: 0.75rem 1rem; text-align: left; color: #fff; font-size: 0.72rem; font-weight: 600; }
.glass-table td { background: rgba(${state.color}, ${ha}); padding: 0.65rem 1rem; border-top: 1px solid var(--glass-border); color: rgba(255,255,255,0.7); font-size: 0.75rem; }
.glass-table tr:hover td { background: rgba(255,255,255,0.06); }

<!-- HTML -->
<table class="glass-table">
  <thead>
    <tr><th>Name</th><th>Status</th><th>Version</th><th>Size</th></tr>
  </thead>
  <tbody>
    <tr>
      <td style="font-weight:600;color:#fff">GlassForge</td>
      <td><span style="background:rgba(60,255,160,0.15);color:#3cffa0;padding:0.15rem 0.5rem;border-radius:999px;font-size:0.62rem;font-weight:700">Active</span></td>
      <td style="font-family:monospace">v2.0</td>
      <td style="font-family:monospace">4.2kb</td>
    </tr>
  </tbody>
</table>`;

  /* react */
  return `const thStyle = {
  background:      \`rgba(${state.color}, ${a})\`,
  backdropFilter:  \`${bf}\`,
  padding:         '0.75rem 1rem',
  textAlign:       'left',
  color:           '#fff',
  fontSize:        '0.72rem',
  fontWeight:      600,
  letterSpacing:   '0.04em',
};

const tdStyle = {
  background:  \`rgba(${state.color}, ${ha})\`,
  padding:     '0.65rem 1rem',
  borderTop:   \`1px solid rgba(${state.color}, ${ba})\`,
  color:       'rgba(255,255,255,0.7)',
  fontSize:    '0.75rem',
};

const rows = [
  { name: 'GlassForge', status: 'Active', version: 'v2.0', size: '4.2kb' },
  { name: 'NextUI',     status: 'Active', version: 'v2.3', size: '12kb'  },
  { name: 'Radix UI',   status: 'Beta',   version: 'v1.8', size: '8.1kb' },
];

const statusStyle = (s) => ({
  background:   s === 'Active' ? 'rgba(60,255,160,0.15)' : 'rgba(228,255,60,0.15)',
  color:        s === 'Active' ? '#3cffa0' : '#e4ff3c',
  padding:      '0.15rem 0.5rem',
  borderRadius: '999px',
  fontSize:     '0.62rem',
  fontWeight:   700,
});

export function GlassTable() {
  return (
    <div style={{ borderRadius: '${state.radius}px', overflow: 'hidden', border: \`1px solid rgba(${state.color}, ${ba})\` }}>
      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
        <thead>
          <tr>
            {['Name','Status','Version','Size'].map(h => (
              <th key={h} style={thStyle}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.name}>
              <td style={{ ...tdStyle, fontWeight: 600, color: '#fff' }}>{row.name}</td>
              <td style={tdStyle}><span style={statusStyle(row.status)}>{row.status}</span></td>
              <td style={{ ...tdStyle, fontFamily: 'monospace' }}>{row.version}</td>
              <td style={{ ...tdStyle, fontFamily: 'monospace' }}>{row.size}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}`;
}

function buildSidebarCode(state) {
  const a = (state.opacity/100).toFixed(2), ba = (state.borderOp/100).toFixed(2), sa = (state.shadow/100*0.5).toFixed(2);
  const bf = `blur(${state.blur}px) saturate(${state.saturation}%)`;

  if (state.tab === 'css') return `.glass-sidebar {
  background:      rgba(${state.color}, ${a});
  backdrop-filter: ${bf};
  -webkit-backdrop-filter: ${bf};
  border-right:    1px solid rgba(${state.color}, ${ba});
  border-radius:   0 ${state.radius}px ${state.radius}px 0;
  width:           240px;
  height:          100vh;
  padding:         1.5rem 1rem;
  display:         flex;
  flex-direction:  column;
  gap:             0.25rem;
  box-shadow:      ${sa > 0 ? `4px 0 32px rgba(0,0,0,${sa})` : 'none'};
}

.sidebar-logo {
  display:         flex;
  align-items:     center;
  gap:             0.5rem;
  padding:         0 0.5rem;
  margin-bottom:   1rem;
}

.sidebar-logo .logo-icon {
  width:           28px;
  height:          28px;
  border-radius:   6px;
  background:      #e4ff3c;
  display:         flex;
  align-items:     center;
  justify-content: center;
  color:           #000;
  font-weight:     900;
}

.sidebar-item {
  display:         flex;
  align-items:     center;
  gap:             0.625rem;
  padding:         0.5rem 0.75rem;
  border-radius:   0.5rem;
  color:           rgba(255,255,255,0.65);
  font-weight:     600;
  font-size:       0.78rem;
  text-decoration: none;
  transition:      all 0.2s;
  border:          none;
  background:      transparent;
  cursor:          pointer;
  width:           100%;
  text-align:      left;
}

.sidebar-item:hover,
.sidebar-item.active {
  color:      #e4ff3c;
  background: rgba(228, 255, 60, 0.15);
}

<!-- HTML -->
<aside class="glass-sidebar">
  <div class="sidebar-logo">
    <div class="logo-icon">◈</div>
    <span style="font-weight:700; color:#fff">GlassForge</span>
  </div>

  <a href="#" class="sidebar-item active">🏠 Dashboard</a>
  <a href="#" class="sidebar-item">📊 Analytics</a>
  <a href="#" class="sidebar-item">👤 Profile</a>
  <a href="#" class="sidebar-item">⚙️ Settings</a>
  <a href="#" class="sidebar-item">⚡ Upgrade</a>
</aside>`;

  if (state.tab === 'tailwind') return `<!-- Tailwind Markup -->
<aside class="bg-white/${Math.round(state.opacity)}
  backdrop-blur-[${state.blur}px]
  backdrop-saturate-[${state.saturation}%]
  border-r border-white/${Math.round(state.borderOp)}
  rounded-[0_${state.radius}px_${state.radius}px_0]
  w-60 h-screen p-4
  flex flex-col gap-1">

  <!-- Logo -->
  <div class="flex items-center gap-2 mb-4 px-2">
    <div class="w-7 h-7 rounded-md bg-[#e4ff3c] flex items-center justify-center text-black font-black text-sm">◈</div>
    <span class="font-bold text-sm text-white">GlassForge</span>
  </div>

  <!-- Nav items -->
  <a href="#" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-semibold
    text-[#e4ff3c] bg-[rgba(228,255,60,0.15)]">
    🏠 Dashboard
  </a>
  <a href="#" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-semibold
    text-white/65 hover:text-white hover:bg-white/10 transition-all">
    📊 Analytics
  </a>
  <a href="#" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-semibold
    text-white/65 hover:text-white hover:bg-white/10 transition-all">
    👤 Profile
  </a>
  <a href="#" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-semibold
    text-white/65 hover:text-white hover:bg-white/10 transition-all">
    ⚙️ Settings
  </a>

</aside>`;

  if (state.tab === 'vars') return `:root {
  --glass-bg:         rgba(${state.color}, ${a});
  --glass-blur:       ${state.blur}px;
  --glass-saturation: ${state.saturation}%;
  --glass-border:     rgba(${state.color}, ${ba});
  --glass-radius:     ${state.radius}px;
}

.glass-sidebar {
  background:      var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturation));
  border-right:    1px solid var(--glass-border);
  border-radius:   0 var(--glass-radius) var(--glass-radius) 0;
  width:           240px;
  height:          100vh;
  padding:         1.5rem 1rem;
  display:         flex;
  flex-direction:  column;
  gap:             0.25rem;
}

.sidebar-item {
  display: flex; align-items: center; gap: 0.625rem;
  padding: 0.5rem 0.75rem; border-radius: 0.5rem;
  color: rgba(255,255,255,0.65); font-weight: 600;
  font-size: 0.78rem; text-decoration: none; transition: all 0.2s;
}
.sidebar-item:hover,
.sidebar-item.active { color: #e4ff3c; background: rgba(228,255,60,0.15); }

<!-- HTML -->
<aside class="glass-sidebar">
  <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:1rem; padding:0 0.5rem">
    <div style="width:28px; height:28px; border-radius:6px; background:#e4ff3c; display:flex; align-items:center; justify-content:center; color:#000; font-weight:900">◈</div>
    <span style="font-weight:700; color:#fff">GlassForge</span>
  </div>
  <a href="#" class="sidebar-item active">🏠 Dashboard</a>
  <a href="#" class="sidebar-item">📊 Analytics</a>
  <a href="#" class="sidebar-item">👤 Profile</a>
  <a href="#" class="sidebar-item">⚙️ Settings</a>
</aside>`;

  /* react */
  return `import { useState } from 'react';

const sidebarStyle = {
  background:      \`rgba(${state.color}, ${a})\`,
  backdropFilter:  \`${bf}\`,
  WebkitBackdropFilter: \`${bf}\`,
  borderRight:     \`1px solid rgba(${state.color}, ${ba})\`,
  borderRadius:    \`0 ${state.radius}px ${state.radius}px 0\`,
  width:           '15rem',
  height:          '100vh',
  padding:         '1.5rem 1rem',
  display:         'flex',
  flexDirection:   'column',
  gap:             '0.25rem',
};

const navItems = [
  { icon: '🏠', label: 'Dashboard' },
  { icon: '📊', label: 'Analytics' },
  { icon: '👤', label: 'Profile'   },
  { icon: '⚙️', label: 'Settings'  },
  { icon: '⚡', label: 'Upgrade'   },
];

export function GlassSidebar() {
  const [active, setActive] = useState(0);

  return (
    <aside style={sidebarStyle}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', padding: '0 0.5rem' }}>
        <div style={{ width: 28, height: 28, borderRadius: 6, background: '#e4ff3c', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 900, fontSize: '0.875rem' }}>◈</div>
        <span style={{ fontWeight: 700, fontSize: '0.875rem', color: '#fff' }}>GlassForge</span>
      </div>

      {/* Nav */}
      {navItems.map((item, i) => (
        <button key={i} onClick={() => setActive(i)} style={{
          display: 'flex', alignItems: 'center', gap: '0.625rem',
          padding: '0.5rem 0.75rem', borderRadius: '0.5rem',
          color:      active === i ? '#e4ff3c' : 'rgba(255,255,255,0.65)',
          background: active === i ? 'rgba(228,255,60,0.15)' : 'transparent',
          fontWeight: 600, fontSize: '0.78rem',
          border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left',
          transition: 'all 0.2s',
        }}>
          {item.icon} {item.label}
        </button>
      ))}
    </aside>
  );
}`;
}

function buildTabsCode(state) {
  const a = (state.opacity/100).toFixed(2), ba = (state.borderOp/100).toFixed(2);
  const activeA = Math.min(state.opacity/50, 1).toFixed(2);
  const bf = `blur(${state.blur}px)`;
  const innerR = Math.max(state.radius - 4, 4);

  if (state.tab === 'css') return `.glass-tabs {
  display:         inline-flex;
  gap:             0.2rem;
  padding:         0.3rem;
  background:      rgba(${state.color}, ${a});
  backdrop-filter: ${bf};
  -webkit-backdrop-filter: ${bf};
  border:          1px solid rgba(${state.color}, ${ba});
  border-radius:   ${state.radius}px;
}

.tab-item {
  padding:       0.5rem 1rem;
  border-radius: ${innerR}px;
  font-size:     0.875rem;
  font-weight:   600;
  color:         rgba(255,255,255,0.65);
  cursor:        pointer;
  border:        none;
  background:    transparent;
  transition:    all 0.2s;
}

.tab-item:hover { color: #fff; background: rgba(255,255,255,0.08); }

.tab-item.active {
  background: rgba(${state.color}, ${activeA});
  color:      #e4ff3c;
}

.tab-panel {
  margin-top: 1rem;
  color:      rgba(255,255,255,0.6);
  font-size:  0.875rem;
}

<!-- HTML -->
<div class="glass-tabs">
  <button class="tab-item active">Overview</button>
  <button class="tab-item">Analytics</button>
  <button class="tab-item">Settings</button>
  <button class="tab-item">Team</button>
</div>
<div class="tab-panel">
  Content for the active tab goes here...
</div>`;

  if (state.tab === 'tailwind') return `<!-- Tailwind Markup -->
<div>
  <!-- Tab bar -->
  <div class="inline-flex gap-1 p-1.5
    bg-white/${Math.round(state.opacity)}
    backdrop-blur-[${state.blur}px]
    border border-white/${Math.round(state.borderOp)}
    rounded-[${state.radius}px]">

    <!-- Active tab -->
    <button class="px-4 py-2 rounded-[${innerR}px] text-sm font-semibold
      bg-white/${Math.round(state.opacity * 2)}
      text-[#e4ff3c]">
      Overview
    </button>

    <!-- Inactive tabs -->
    <button class="px-4 py-2 rounded-[${innerR}px] text-sm font-semibold
      text-white/65 hover:text-white hover:bg-white/10 transition-all">
      Analytics
    </button>
    <button class="px-4 py-2 rounded-[${innerR}px] text-sm font-semibold
      text-white/65 hover:text-white hover:bg-white/10 transition-all">
      Settings
    </button>
    <button class="px-4 py-2 rounded-[${innerR}px] text-sm font-semibold
      text-white/65 hover:text-white hover:bg-white/10 transition-all">
      Team
    </button>
  </div>

  <!-- Tab content -->
  <div class="mt-4 text-white/60 text-sm">
    Content for the active tab goes here...
  </div>
</div>`;

  if (state.tab === 'vars') return `:root {
  --glass-bg:       rgba(${state.color}, ${a});
  --glass-blur:     ${state.blur}px;
  --glass-border:   rgba(${state.color}, ${ba});
  --glass-radius:   ${state.radius}px;
  --tab-active-bg:  rgba(${state.color}, ${activeA});
}

.glass-tabs {
  display:         inline-flex;
  gap:             0.2rem;
  padding:         0.3rem;
  background:      var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border:          1px solid var(--glass-border);
  border-radius:   var(--glass-radius);
}

.tab-item {
  padding: 0.5rem 1rem; border-radius: ${innerR}px;
  font-size: 0.875rem; font-weight: 600;
  color: rgba(255,255,255,0.65);
  border: none; background: transparent; cursor: pointer; transition: all 0.2s;
}
.tab-item:hover  { color: #fff; background: rgba(255,255,255,0.08); }
.tab-item.active { background: var(--tab-active-bg); color: #e4ff3c; }

<!-- HTML -->
<div class="glass-tabs">
  <button class="tab-item active">Overview</button>
  <button class="tab-item">Analytics</button>
  <button class="tab-item">Settings</button>
  <button class="tab-item">Team</button>
</div>
<p style="margin-top:1rem; color:rgba(255,255,255,0.6); font-size:0.875rem">
  Tab content here...
</p>`;

  /* react */
  return `import { useState } from 'react';

const wrapStyle = {
  background:      \`rgba(${state.color}, ${a})\`,
  backdropFilter:  \`${bf}\`,
  WebkitBackdropFilter: \`${bf}\`,
  border:          \`1px solid rgba(${state.color}, ${ba})\`,
  borderRadius:    \`${state.radius}px\`,
  display:         'inline-flex',
  gap:             '0.2rem',
  padding:         '0.3rem',
};

const tabs = ['Overview', 'Analytics', 'Settings', 'Team'];

export function GlassTabs({ panels }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div style={wrapStyle}>
        {tabs.map((tab, i) => (
          <button key={tab} onClick={() => setActive(i)} style={{
            padding:      '0.5rem 1rem',
            borderRadius: \`${innerR}px\`,
            fontSize:     '0.875rem',
            fontWeight:   600,
            cursor:       'pointer',
            border:       'none',
            transition:   'all 0.2s',
            background:   active === i ? \`rgba(${state.color}, ${activeA})\` : 'transparent',
            color:        active === i ? '#e4ff3c' : 'rgba(255,255,255,0.65)',
          }}>
            {tab}
          </button>
        ))}
      </div>
      <div style={{ marginTop: '1rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>
        {panels?.[active] ?? \`Content for \${tabs[active]}\`}
      </div>
    </div>
  );
}`;
}

function buildNavbarCode(state) {
  const a = (state.opacity/100).toFixed(2), ba = (state.borderOp/100).toFixed(2);
  const bf = `blur(${state.blur}px) saturate(${state.saturation}%)`;

  if (state.tab === 'css') return `.glass-navbar {
  position:        sticky;
  top:             0;
  z-index:         50;
  background:      rgba(${state.color}, ${a});
  backdrop-filter: ${bf};
  -webkit-backdrop-filter: ${bf};
  border-bottom:   1px solid rgba(${state.color}, ${ba});
  padding:         0.75rem 1.25rem;
  display:         flex;
  align-items:     center;
  justify-content: space-between;
}

.nav-brand {
  display:     flex;
  align-items: center;
  gap:         0.5rem;
  font-weight: 700;
  color:       #fff;
  font-size:   0.875rem;
}

.nav-logo {
  width:           28px;
  height:          28px;
  border-radius:   6px;
  background:      #e4ff3c;
  display:         flex;
  align-items:     center;
  justify-content: center;
  color:           #000;
  font-weight:     900;
}

.nav-links { display: flex; gap: 1.5rem; }
.nav-links a {
  color:           rgba(255,255,255,0.6);
  font-weight:     600;
  font-size:       0.78rem;
  text-decoration: none;
  transition:      color 0.2s;
}
.nav-links a:hover,
.nav-links a.active { color: #fff; }

.nav-cta {
  background:    #e4ff3c;
  color:         #000;
  padding:       0.375rem 1rem;
  border-radius: 0.5rem;
  font-weight:   700;
  font-size:     0.78rem;
  border:        none;
  cursor:        pointer;
  transition:    transform 0.2s;
}
.nav-cta:hover { transform: translateY(-1px); }

<!-- HTML -->
<header class="glass-navbar">
  <div class="nav-brand">
    <div class="nav-logo">◈</div>
    GlassForge
  </div>

  <nav class="nav-links">
    <a href="#" class="active">Home</a>
    <a href="#">Docs</a>
    <a href="#">Components</a>
    <a href="#">Pricing</a>
  </nav>

  <button class="nav-cta">Get Started</button>
</header>`;

  if (state.tab === 'tailwind') return `<!-- Tailwind Markup -->
<header class="sticky top-0 z-50
  bg-white/${Math.round(state.opacity)}
  backdrop-blur-[${state.blur}px]
  backdrop-saturate-[${state.saturation}%]
  border-b border-white/${Math.round(state.borderOp)}
  px-5 py-3
  flex items-center justify-between">

  <!-- Brand -->
  <div class="flex items-center gap-2">
    <div class="w-7 h-7 rounded-md bg-[#e4ff3c] flex items-center justify-center text-black font-black text-sm">◈</div>
    <span class="font-bold text-sm text-white">GlassForge</span>
  </div>

  <!-- Nav links -->
  <nav class="hidden sm:flex gap-6">
    <a href="#" class="text-sm font-semibold text-white hover:text-[#e4ff3c] transition-colors">Home</a>
    <a href="#" class="text-sm font-semibold text-white/60 hover:text-white transition-colors">Docs</a>
    <a href="#" class="text-sm font-semibold text-white/60 hover:text-white transition-colors">Components</a>
    <a href="#" class="text-sm font-semibold text-white/60 hover:text-white transition-colors">Pricing</a>
  </nav>

  <!-- CTA -->
  <button class="px-4 py-1.5 rounded-lg text-sm font-bold
    bg-[#e4ff3c] text-black
    hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(228,255,60,0.3)]
    transition-all">
    Get Started
  </button>

</header>`;

  if (state.tab === 'vars') return `:root {
  --glass-bg:         rgba(${state.color}, ${a});
  --glass-blur:       ${state.blur}px;
  --glass-saturation: ${state.saturation}%;
  --glass-border:     rgba(${state.color}, ${ba});
}

.glass-navbar {
  position:        sticky;
  top:             0;
  z-index:         50;
  background:      var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturation));
  border-bottom:   1px solid var(--glass-border);
  padding:         0.75rem 1.25rem;
  display:         flex;
  align-items:     center;
  justify-content: space-between;
}

<!-- HTML -->
<header class="glass-navbar">
  <div class="nav-brand">
    <div class="nav-logo">◈</div>
    GlassForge
  </div>
  <nav style="display:flex; gap:1.5rem">
    <a href="#" style="color:#fff; font-weight:600; font-size:0.78rem; text-decoration:none">Home</a>
    <a href="#" style="color:rgba(255,255,255,0.6); font-weight:600; font-size:0.78rem; text-decoration:none">Docs</a>
    <a href="#" style="color:rgba(255,255,255,0.6); font-weight:600; font-size:0.78rem; text-decoration:none">Components</a>
  </nav>
  <button style="background:#e4ff3c; color:#000; padding:0.375rem 1rem; border-radius:0.5rem; font-weight:700; font-size:0.78rem; border:none; cursor:pointer">Get Started</button>
</header>`;

  /* react */
  return `const navStyle = {
  position:        'sticky',
  top:             0,
  zIndex:          50,
  background:      \`rgba(${state.color}, ${a})\`,
  backdropFilter:  \`${bf}\`,
  WebkitBackdropFilter: \`${bf}\`,
  borderBottom:    \`1px solid rgba(${state.color}, ${ba})\`,
  padding:         '0.75rem 1.25rem',
  display:         'flex',
  alignItems:      'center',
  justifyContent:  'space-between',
};

const links = ['Home', 'Docs', 'Components', 'Pricing'];

export function GlassNavbar() {
  return (
    <header style={navStyle}>
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ width: 28, height: 28, borderRadius: 6, background: '#e4ff3c', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 900, fontSize: '0.875rem' }}>◈</div>
        <span style={{ fontWeight: 700, fontSize: '0.875rem', color: '#fff' }}>GlassForge</span>
      </div>

      {/* Links */}
      <nav style={{ display: 'flex', gap: '1.5rem' }}>
        {links.map((link, i) => (
          <a key={link} href="#" style={{ color: i === 0 ? '#fff' : 'rgba(255,255,255,0.6)', fontWeight: 600, fontSize: '0.78rem', textDecoration: 'none' }}>
            {link}
          </a>
        ))}
      </nav>

      {/* CTA */}
      <button style={{ background: '#e4ff3c', color: '#000', padding: '0.375rem 1rem', borderRadius: '0.5rem', fontWeight: 700, fontSize: '0.78rem', border: 'none', cursor: 'pointer' }}>
        Get Started
      </button>
    </header>
  );
}`;
}

function buildAvatarCode(state) {
  const a = (state.opacity/100).toFixed(2), ba = (state.borderOp/100).toFixed(2);
  const bf = `blur(${state.blur}px)`;

  if (state.tab === 'css') return `.avatar {
  background:      rgba(${state.color}, ${a});
  backdrop-filter: ${bf};
  -webkit-backdrop-filter: ${bf};
  border:          2px solid rgba(${state.color}, ${ba});
  border-radius:   50%;
  width:           48px;
  height:          48px;
  display:         flex;
  align-items:     center;
  justify-content: center;
  font-weight:     700;
  color:           #fff;
  font-size:       0.875rem;
  transition:      transform 0.2s;
}
.avatar:hover { transform: scale(1.1) translateY(-2px); }

.avatar-wrap { position: relative; display: inline-block; }

.avatar-status {
  position:      absolute;
  bottom:        2px;
  right:         2px;
  width:         12px;
  height:        12px;
  border-radius: 50%;
  border:        2px solid #000;
}

/* Status colors */
.status-online  { background: #3cffa0; }
.status-away    { background: #e4ff3c; }
.status-busy    { background: #ff5555; }
.status-offline { background: #555555; }

/* Stacked group */
.avatar-group { display: flex; }
.avatar-group .avatar { margin-left: -12px; border: 2px solid #000; }
.avatar-group .avatar:first-child { margin-left: 0; }

<!-- HTML -->
<!-- Single Avatar -->
<div class="avatar-wrap">
  <div class="avatar">JD</div>
  <div class="avatar-status status-online"></div>
</div>

<!-- Stacked Group -->
<div class="avatar-group">
  <div class="avatar" style="border-color:rgba(228,255,60,0.3)">JD</div>
  <div class="avatar" style="border-color:rgba(60,255,160,0.3)">AK</div>
  <div class="avatar" style="border-color:rgba(60,159,255,0.3)">MR</div>
  <div class="avatar" style="background:rgba(255,255,255,0.1); color:rgba(255,255,255,0.7)">+8</div>
</div>`;

  if (state.tab === 'tailwind') return `<!-- Tailwind Markup -->

<!-- Single Avatar with Status -->
<div class="relative inline-block">
  <div class="w-14 h-14 rounded-full flex items-center justify-center
    font-bold text-sm text-white
    bg-white/${Math.round(state.opacity)}
    backdrop-blur-[${state.blur}px]
    border-2 border-[#e4ff3c44]
    hover:scale-110 hover:-translate-y-1 transition-all cursor-pointer">
    JD
  </div>
  <div class="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full border-2 border-black bg-green-400"></div>
</div>

<!-- Stacked Group -->
<div class="flex -space-x-3">
  <div class="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-xs text-white
    bg-white/${Math.round(state.opacity)} backdrop-blur-[${state.blur}px]
    border-2 border-black hover:z-10 hover:scale-110 transition-all cursor-pointer">JD</div>
  <div class="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-xs text-white
    bg-white/${Math.round(state.opacity)} backdrop-blur-[${state.blur}px]
    border-2 border-black hover:z-10 hover:scale-110 transition-all cursor-pointer">AK</div>
  <div class="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-xs text-white
    bg-white/${Math.round(state.opacity)} backdrop-blur-[${state.blur}px]
    border-2 border-black hover:z-10 hover:scale-110 transition-all cursor-pointer">MR</div>
  <div class="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-xs
    bg-white/10 text-white/70 border-2 border-black">+8</div>
</div>`;

  if (state.tab === 'vars') return `:root {
  --glass-bg:     rgba(${state.color}, ${a});
  --glass-blur:   ${state.blur}px;
  --glass-border: rgba(${state.color}, ${ba});
}

.avatar {
  background:      var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border:          2px solid var(--glass-border);
  border-radius:   50%;
  width:           48px; height: 48px;
  display:         flex; align-items: center; justify-content: center;
  font-weight:     700; color: #fff; font-size: 0.875rem;
  transition:      transform 0.2s;
}
.avatar:hover { transform: scale(1.1) translateY(-2px); }
.avatar-wrap  { position: relative; display: inline-block; }
.avatar-status { position: absolute; bottom: 2px; right: 2px; width: 12px; height: 12px; border-radius: 50%; border: 2px solid #000; }

<!-- HTML -->
<div class="avatar-wrap">
  <div class="avatar">JD</div>
  <div class="avatar-status" style="background:#3cffa0"></div>
</div>

<!-- Stacked -->
<div style="display:flex">
  <div class="avatar" style="margin-left:0">JD</div>
  <div class="avatar" style="margin-left:-12px">AK</div>
  <div class="avatar" style="margin-left:-12px">MR</div>
</div>`;

  /* react */
  return `const avatarBase = {
  background:          \`rgba(${state.color}, ${a})\`,
  backdropFilter:      \`${bf}\`,
  WebkitBackdropFilter:\`${bf}\`,
  borderRadius:        '50%',
  display:             'flex',
  alignItems:          'center',
  justifyContent:      'center',
  fontWeight:          700,
  color:               '#fff',
  fontSize:            '0.875rem',
  transition:          'transform 0.2s',
};

const statusColors = {
  online: '#3cffa0', away: '#e4ff3c', busy: '#ff5555', offline: '#555',
};

export function GlassAvatar({ initials, status = 'online', accentColor, size = 48 }) {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div style={{
        ...avatarBase,
        width:  size,
        height: size,
        border: \`2px solid \${accentColor || statusColors[status]}44\`,
      }}>
        {initials}
      </div>
      <div style={{
        position:     'absolute', bottom: 2, right: 2,
        width:        12, height: 12, borderRadius: '50%',
        background:   statusColors[status],
        border:       '2px solid #000',
      }} />
    </div>
  );
}

export function GlassAvatarGroup({ users }) {
  return (
    <div style={{ display: 'flex' }}>
      {users.map((u, i) => (
        <div key={i} style={{
          ...avatarBase,
          width: 40, height: 40, fontSize: '0.75rem',
          border: \`2px solid \${u.color || '#ffffff22'}\`,
          marginLeft: i === 0 ? 0 : -12,
        }}>
          {u.initials}
        </div>
      ))}
    </div>
  );
}

// Usage
// <GlassAvatar initials="JD" status="online" accentColor="#e4ff3c" />
// <GlassAvatarGroup users={[{ initials: 'JD', color: '#e4ff3c33' }, { initials: 'AK' }]} />`;
}

function buildProgressCode(state) {
  const a = (state.opacity/100).toFixed(2), ba = (state.borderOp/100).toFixed(2);
  const bf = `blur(${state.blur}px)`;

  if (state.tab === 'css') return `.glass-card {
  background:      rgba(${state.color}, ${a});
  backdrop-filter: ${bf};
  -webkit-backdrop-filter: ${bf};
  border:          1px solid rgba(${state.color}, ${ba});
  border-radius:   ${state.radius}px;
  padding:         1.25rem;
}

.progress-label {
  display:         flex;
  justify-content: space-between;
  align-items:     center;
  font-size:       0.72rem;
  font-weight:     600;
  margin-bottom:   0.375rem;
}

.progress-track {
  background:      rgba(${state.color}, ${a});
  backdrop-filter: ${bf};
  border:          1px solid rgba(${state.color}, ${ba});
  border-radius:   999px;
  height:          8px;
  overflow:        hidden;
}

.progress-bar {
  height:          100%;
  border-radius:   999px;
  transition:      width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

<!-- HTML -->
<div class="glass-card">
  <h3 style="color:#fff; font-weight:700; font-size:0.875rem; margin-bottom:1rem">
    Project Progress
  </h3>

  <div style="display:flex; flex-direction:column; gap:1rem">
    <div>
      <div class="progress-label">
        <span style="color:rgba(255,255,255,0.8)">Design</span>
        <span style="color:#e4ff3c">85%</span>
      </div>
      <div class="progress-track">
        <div class="progress-bar" style="width:85%; background:#e4ff3c"></div>
      </div>
    </div>

    <div>
      <div class="progress-label">
        <span style="color:rgba(255,255,255,0.8)">Frontend</span>
        <span style="color:#3cffa0">72%</span>
      </div>
      <div class="progress-track">
        <div class="progress-bar" style="width:72%; background:#3cffa0"></div>
      </div>
    </div>

    <div>
      <div class="progress-label">
        <span style="color:rgba(255,255,255,0.8)">Backend</span>
        <span style="color:#3c9fff">58%</span>
      </div>
      <div class="progress-track">
        <div class="progress-bar" style="width:58%; background:#3c9fff"></div>
      </div>
    </div>
  </div>
</div>`;

  if (state.tab === 'tailwind') return `<!-- Tailwind Markup -->
<div class="bg-white/${Math.round(state.opacity)}
  backdrop-blur-[${state.blur}px]
  border border-white/${Math.round(state.borderOp)}
  rounded-[${state.radius}px] p-5">

  <h3 class="font-bold text-sm text-white mb-4">Project Progress</h3>

  <div class="flex flex-col gap-4">
    <!-- Bar 1 -->
    <div>
      <div class="flex justify-between text-[0.72rem] font-semibold mb-1.5">
        <span class="text-white/80">Design</span>
        <span class="text-[#e4ff3c]">85%</span>
      </div>
      <div class="h-2 rounded-full overflow-hidden
        bg-white/${Math.round(state.opacity)}
        border border-white/${Math.round(state.borderOp)}">
        <div class="h-full rounded-full bg-[#e4ff3c] transition-all duration-700" style="width:85%"></div>
      </div>
    </div>

    <!-- Bar 2 -->
    <div>
      <div class="flex justify-between text-[0.72rem] font-semibold mb-1.5">
        <span class="text-white/80">Frontend</span>
        <span class="text-[#3cffa0]">72%</span>
      </div>
      <div class="h-2 rounded-full overflow-hidden
        bg-white/${Math.round(state.opacity)}
        border border-white/${Math.round(state.borderOp)}">
        <div class="h-full rounded-full bg-[#3cffa0] transition-all duration-700" style="width:72%"></div>
      </div>
    </div>

    <!-- Bar 3 -->
    <div>
      <div class="flex justify-between text-[0.72rem] font-semibold mb-1.5">
        <span class="text-white/80">Backend</span>
        <span class="text-[#3c9fff]">58%</span>
      </div>
      <div class="h-2 rounded-full overflow-hidden
        bg-white/${Math.round(state.opacity)}
        border border-white/${Math.round(state.borderOp)}">
        <div class="h-full rounded-full bg-[#3c9fff] transition-all duration-700" style="width:58%"></div>
      </div>
    </div>
  </div>
</div>`;

  if (state.tab === 'vars') return `:root {
  --glass-bg:     rgba(${state.color}, ${a});
  --glass-blur:   ${state.blur}px;
  --glass-border: rgba(${state.color}, ${ba});
  --glass-radius: ${state.radius}px;
}

.glass-card {
  background:      var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border:          1px solid var(--glass-border);
  border-radius:   var(--glass-radius);
  padding:         1.25rem;
}

.progress-track {
  background:   var(--glass-bg);
  border:       1px solid var(--glass-border);
  border-radius: 999px;
  height:        8px;
  overflow:      hidden;
}

.progress-bar {
  height:        100%;
  border-radius: 999px;
  transition:    width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

<!-- HTML -->
<div class="glass-card">
  <h3 style="color:#fff; font-weight:700; margin-bottom:1rem">Project Progress</h3>

  <div style="display:flex; flex-direction:column; gap:1rem">
    <div>
      <div style="display:flex; justify-content:space-between; font-size:0.72rem; font-weight:600; margin-bottom:6px">
        <span style="color:rgba(255,255,255,0.8)">Design</span>
        <span style="color:#e4ff3c">85%</span>
      </div>
      <div class="progress-track">
        <div class="progress-bar" style="width:85%; background:#e4ff3c"></div>
      </div>
    </div>

    <div>
      <div style="display:flex; justify-content:space-between; font-size:0.72rem; font-weight:600; margin-bottom:6px">
        <span style="color:rgba(255,255,255,0.8)">Frontend</span>
        <span style="color:#3cffa0">72%</span>
      </div>
      <div class="progress-track">
        <div class="progress-bar" style="width:72%; background:#3cffa0"></div>
      </div>
    </div>
  </div>
</div>`;

  /* react */
  return `const trackStyle = {
  background:      \`rgba(${state.color}, ${a})\`,
  backdropFilter:  \`${bf}\`,
  border:          \`1px solid rgba(${state.color}, ${ba})\`,
  borderRadius:    '999px',
  height:          8,
  overflow:        'hidden',
};

const bars = [
  { label: 'Design',   pct: 85, color: '#e4ff3c' },
  { label: 'Frontend', pct: 72, color: '#3cffa0' },
  { label: 'Backend',  pct: 58, color: '#3c9fff' },
  { label: 'Testing',  pct: 40, color: '#c43cff' },
];

export function GlassProgress() {
  return (
    <div style={{
      background:      \`rgba(${state.color}, ${a})\`,
      backdropFilter:  \`${bf}\`,
      WebkitBackdropFilter: \`${bf}\`,
      border:          \`1px solid rgba(${state.color}, ${ba})\`,
      borderRadius:    \`${state.radius}px\`,
      padding:         '1.25rem',
    }}>
      <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '0.875rem', marginBottom: '1rem' }}>
        Project Progress
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {bars.map(bar => (
          <div key={bar.label}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', fontWeight: 600, marginBottom: 6 }}>
              <span style={{ color: 'rgba(255,255,255,0.8)' }}>{bar.label}</span>
              <span style={{ color: bar.color }}>{bar.pct}%</span>
            </div>
            <div style={trackStyle}>
              <div style={{
                height: '100%', borderRadius: '999px',
                width:  bar.pct + '%', background: bar.color,
                transition: 'width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`;
}

function buildChartCode(state) {
  const a = (state.opacity/100).toFixed(2), ba = (state.borderOp/100).toFixed(2);
  const bf = `blur(${state.blur}px) saturate(${state.saturation}%)`;

  if (state.tab === 'css') return `.glass-chart {
  background:      rgba(${state.color}, ${a});
  backdrop-filter: ${bf};
  -webkit-backdrop-filter: ${bf};
  border:          1px solid rgba(${state.color}, ${ba});
  border-radius:   ${state.radius}px;
  padding:         1.5rem;
}

.chart-header {
  display:         flex;
  justify-content: space-between;
  align-items:     center;
  margin-bottom:   1rem;
}

.chart-bars {
  display:     flex;
  align-items: flex-end;
  gap:         4px;
  height:      7rem;
}

.chart-bar {
  flex:          1;
  border-radius: 2px;
  min-height:    4px;
  opacity:       0.8;
  transition:    opacity 0.2s, transform 0.2s;
}
.chart-bar:hover { opacity: 1; transform: scaleY(1.04); }

.chart-labels {
  display:    flex;
  gap:        4px;
  margin-top: 0.5rem;
}

.chart-label {
  flex:        1;
  text-align:  center;
  font-family: monospace;
  font-size:   0.45rem;
  color:       rgba(255,255,255,0.35);
}

<!-- HTML -->
<div class="glass-chart">
  <div class="chart-header">
    <div>
      <div style="font-weight:700; color:#fff">Monthly Revenue</div>
      <div style="font-size:0.65rem; color:rgba(255,255,255,0.5); font-family:monospace">2024 overview</div>
    </div>
    <span style="color:#3cffa0; font-weight:700">+24.5%</span>
  </div>

  <div class="chart-bars">
    <div class="chart-bar" style="height:42%; background:rgba(228,255,60,0.35)"></div>
    <div class="chart-bar" style="height:68%; background:rgba(228,255,60,0.68)"></div>
    <div class="chart-bar" style="height:53%; background:rgba(228,255,60,0.53)"></div>
    <div class="chart-bar" style="height:84%; background:rgba(228,255,60,0.84)"></div>
    <div class="chart-bar" style="height:58%; background:rgba(228,255,60,0.58)"></div>
    <div class="chart-bar" style="height:95%; background:rgba(228,255,60,0.95)"></div>
    <div class="chart-bar" style="height:74%; background:rgba(228,255,60,0.74)"></div>
  </div>

  <div class="chart-labels">
    <span class="chart-label">Jan</span>
    <span class="chart-label">Feb</span>
    <span class="chart-label">Mar</span>
    <span class="chart-label">Apr</span>
    <span class="chart-label">May</span>
    <span class="chart-label">Jun</span>
    <span class="chart-label">Jul</span>
  </div>
</div>`;

  if (state.tab === 'tailwind') return `<!-- Tailwind Markup -->
<div class="bg-white/${Math.round(state.opacity)}
  backdrop-blur-[${state.blur}px]
  backdrop-saturate-[${state.saturation}%]
  border border-white/${Math.round(state.borderOp)}
  rounded-[${state.radius}px] p-5">

  <!-- Header -->
  <div class="flex justify-between items-center mb-4">
    <div>
      <div class="font-bold text-sm text-white">Monthly Revenue</div>
      <div class="font-mono text-[0.65rem] text-white/50">2024 overview</div>
    </div>
    <span class="text-[#3cffa0] font-bold text-sm">+24.5%</span>
  </div>

  <!-- Bars -->
  <div class="flex items-end gap-1 h-28">
    <div class="flex-1 rounded-sm min-h-[4px] opacity-80 hover:opacity-100 transition-opacity" style="height:42%; background:rgba(228,255,60,0.35)"></div>
    <div class="flex-1 rounded-sm min-h-[4px] opacity-80 hover:opacity-100 transition-opacity" style="height:68%; background:rgba(228,255,60,0.68)"></div>
    <div class="flex-1 rounded-sm min-h-[4px] opacity-80 hover:opacity-100 transition-opacity" style="height:53%; background:rgba(228,255,60,0.53)"></div>
    <div class="flex-1 rounded-sm min-h-[4px] opacity-80 hover:opacity-100 transition-opacity" style="height:84%; background:rgba(228,255,60,0.84)"></div>
    <div class="flex-1 rounded-sm min-h-[4px] opacity-80 hover:opacity-100 transition-opacity" style="height:58%; background:rgba(228,255,60,0.58)"></div>
    <div class="flex-1 rounded-sm min-h-[4px] opacity-80 hover:opacity-100 transition-opacity" style="height:95%; background:rgba(228,255,60,0.95)"></div>
    <div class="flex-1 rounded-sm min-h-[4px] opacity-80 hover:opacity-100 transition-opacity" style="height:74%; background:rgba(228,255,60,0.74)"></div>
  </div>

  <!-- Labels -->
  <div class="flex gap-1 mt-2">
    <div class="flex-1 text-center font-mono text-[0.45rem] text-white/35">Jan</div>
    <div class="flex-1 text-center font-mono text-[0.45rem] text-white/35">Feb</div>
    <div class="flex-1 text-center font-mono text-[0.45rem] text-white/35">Mar</div>
    <div class="flex-1 text-center font-mono text-[0.45rem] text-white/35">Apr</div>
    <div class="flex-1 text-center font-mono text-[0.45rem] text-white/35">May</div>
    <div class="flex-1 text-center font-mono text-[0.45rem] text-white/35">Jun</div>
    <div class="flex-1 text-center font-mono text-[0.45rem] text-white/35">Jul</div>
  </div>
</div>`;

  if (state.tab === 'vars') return `:root {
  --glass-bg:         rgba(${state.color}, ${a});
  --glass-blur:       ${state.blur}px;
  --glass-saturation: ${state.saturation}%;
  --glass-border:     rgba(${state.color}, ${ba});
  --glass-radius:     ${state.radius}px;
}

.glass-chart {
  background:      var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturation));
  border:          1px solid var(--glass-border);
  border-radius:   var(--glass-radius);
  padding:         1.5rem;
}

.chart-bars { display: flex; align-items: flex-end; gap: 4px; height: 7rem; }
.chart-bar  { flex: 1; border-radius: 2px; min-height: 4px; opacity: 0.8; transition: opacity 0.2s; }
.chart-bar:hover { opacity: 1; }

<!-- HTML -->
<div class="glass-chart">
  <div style="display:flex; justify-content:space-between; margin-bottom:1rem">
    <div>
      <div style="font-weight:700; color:#fff">Monthly Revenue</div>
      <div style="font-size:0.65rem; color:rgba(255,255,255,0.5); font-family:monospace">2024 overview</div>
    </div>
    <span style="color:#3cffa0; font-weight:700">+24.5%</span>
  </div>
  <div class="chart-bars">
    <div class="chart-bar" style="height:42%; background:rgba(228,255,60,0.35)"></div>
    <div class="chart-bar" style="height:68%; background:rgba(228,255,60,0.68)"></div>
    <div class="chart-bar" style="height:84%; background:rgba(228,255,60,0.84)"></div>
    <div class="chart-bar" style="height:95%; background:rgba(228,255,60,0.95)"></div>
  </div>
</div>`;

  /* react */
  return `const data = [40, 65, 50, 80, 55, 90, 70, 85, 60, 95, 75, 88];
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const maxV = Math.max(...data);

export function GlassChart() {
  return (
    <div style={{
      background:          \`rgba(${state.color}, ${a})\`,
      backdropFilter:      \`${bf}\`,
      WebkitBackdropFilter:\`${bf}\`,
      border:              \`1px solid rgba(${state.color}, ${ba})\`,
      borderRadius:        \`${state.radius}px\`,
      padding:             '1.5rem',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#fff' }}>Monthly Revenue</div>
          <div style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)' }}>2024 overview</div>
        </div>
        <span style={{ color: '#3cffa0', fontWeight: 700, fontSize: '0.875rem' }}>+24.5%</span>
      </div>

      {/* Bars */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: '7rem' }}>
        {data.map((v, i) => (
          <div key={i} style={{
            flex:          1,
            height:        (v / maxV * 100) + '%',
            background:    \`rgba(228, 255, 60, \${0.3 + v/maxV * 0.7})\`,
            borderRadius:  2,
            minHeight:     4,
            opacity:       0.8,
            transition:    'opacity 0.2s',
          }} />
        ))}
      </div>

      {/* Month labels */}
      <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
        {months.map(m => (
          <div key={m} style={{ flex: 1, textAlign: 'center', fontFamily: 'monospace', fontSize: '0.45rem', color: 'rgba(255,255,255,0.35)' }}>{m}</div>
        ))}
      </div>
    </div>
  );
}`;
}

function buildSliderCode(state) {
  const a = (state.opacity/100).toFixed(2), ba = (state.borderOp/100).toFixed(2);
  const bf = `blur(${state.blur}px)`;

  if (state.tab === 'css') return `.glass-panel {
  background:      rgba(${state.color}, ${a});
  backdrop-filter: ${bf};
  -webkit-backdrop-filter: ${bf};
  border:          1px solid rgba(${state.color}, ${ba});
  border-radius:   ${state.radius}px;
  padding:         1.25rem;
}

.slider-row { margin-bottom: 1.25rem; }
.slider-row:last-child { margin-bottom: 0; }

.slider-label {
  display:         flex;
  justify-content: space-between;
  font-size:       0.72rem;
  font-weight:     600;
  margin-bottom:   0.5rem;
}

.glass-range {
  -webkit-appearance: none;
  appearance:         none;
  width:              100%;
  height:             4px;
  border-radius:      999px;
  background:         rgba(${state.color}, ${a});
  border:             1px solid rgba(${state.color}, ${ba});
  outline:            none;
  cursor:             pointer;
}
.glass-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width:              14px;
  height:             14px;
  border-radius:      50%;
  background:         #e4ff3c;
  border:             2px solid #000;
  box-shadow:         0 0 0 3px rgba(228, 255, 60, 0.2);
  cursor:             pointer;
  transition:         transform 0.15s;
}
.glass-range::-webkit-slider-thumb:hover { transform: scale(1.4); }

<!-- HTML -->
<div class="glass-panel">
  <h3 style="color:#fff; font-weight:700; font-size:0.875rem; margin-bottom:1.25rem">
    Audio Controls
  </h3>

  <div class="slider-row">
    <div class="slider-label">
      <span style="color:rgba(255,255,255,0.7)">Volume</span>
      <span style="color:#e4ff3c" id="vol-val">65%</span>
    </div>
    <input class="glass-range" type="range" min="0" max="100" value="65"
      oninput="document.getElementById('vol-val').textContent = this.value + '%'" />
  </div>

  <div class="slider-row">
    <div class="slider-label">
      <span style="color:rgba(255,255,255,0.7)">Bass</span>
      <span style="color:#3cffa0" id="bass-val">40%</span>
    </div>
    <input class="glass-range" type="range" min="0" max="100" value="40"
      style="accent-color:#3cffa0"
      oninput="document.getElementById('bass-val').textContent = this.value + '%'" />
  </div>

  <div class="slider-row">
    <div class="slider-label">
      <span style="color:rgba(255,255,255,0.7)">Treble</span>
      <span style="color:#3c9fff" id="treble-val">80%</span>
    </div>
    <input class="glass-range" type="range" min="0" max="100" value="80"
      style="accent-color:#3c9fff"
      oninput="document.getElementById('treble-val').textContent = this.value + '%'" />
  </div>
</div>`;

  if (state.tab === 'tailwind') return `<!-- Tailwind Markup -->
<div class="bg-white/${Math.round(state.opacity)}
  backdrop-blur-[${state.blur}px]
  border border-white/${Math.round(state.borderOp)}
  rounded-[${state.radius}px] p-5
  flex flex-col gap-5">

  <h3 class="font-bold text-sm text-white">Audio Controls</h3>

  <!-- Volume -->
  <div>
    <div class="flex justify-between text-[0.72rem] font-semibold mb-2">
      <span class="text-white/70">Volume</span>
      <span class="text-[#e4ff3c]">65%</span>
    </div>
    <input type="range" min="0" max="100" value="65"
      class="w-full h-1 rounded-full appearance-none cursor-pointer
        accent-[#e4ff3c]
        bg-white/${Math.round(state.opacity)}" />
  </div>

  <!-- Bass -->
  <div>
    <div class="flex justify-between text-[0.72rem] font-semibold mb-2">
      <span class="text-white/70">Bass</span>
      <span class="text-[#3cffa0]">40%</span>
    </div>
    <input type="range" min="0" max="100" value="40"
      class="w-full h-1 rounded-full appearance-none cursor-pointer
        accent-[#3cffa0]
        bg-white/${Math.round(state.opacity)}" />
  </div>

  <!-- Treble -->
  <div>
    <div class="flex justify-between text-[0.72rem] font-semibold mb-2">
      <span class="text-white/70">Treble</span>
      <span class="text-[#3c9fff]">80%</span>
    </div>
    <input type="range" min="0" max="100" value="80"
      class="w-full h-1 rounded-full appearance-none cursor-pointer
        accent-[#3c9fff]
        bg-white/${Math.round(state.opacity)}" />
  </div>

</div>`;

  if (state.tab === 'vars') return `:root {
  --glass-bg:     rgba(${state.color}, ${a});
  --glass-blur:   ${state.blur}px;
  --glass-border: rgba(${state.color}, ${ba});
  --glass-radius: ${state.radius}px;
}

.glass-panel {
  background:      var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border:          1px solid var(--glass-border);
  border-radius:   var(--glass-radius);
  padding:         1.25rem;
}

.glass-range {
  -webkit-appearance: none;
  width: 100%; height: 4px; border-radius: 999px; outline: none; cursor: pointer;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
}
.glass-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 14px; height: 14px; border-radius: 50%;
  background: var(--accent, #e4ff3c);
  box-shadow: 0 0 0 3px rgba(228,255,60,0.2);
  cursor: pointer;
}

<!-- HTML -->
<div class="glass-panel">
  <h3 style="color:#fff; font-weight:700; font-size:0.875rem; margin-bottom:1.25rem">Audio Controls</h3>

  <div style="display:flex; flex-direction:column; gap:1.25rem">
    <div>
      <div style="display:flex; justify-content:space-between; font-size:0.72rem; font-weight:600; margin-bottom:0.5rem">
        <span style="color:rgba(255,255,255,0.7)">Volume</span>
        <span style="color:#e4ff3c" id="v1">65%</span>
      </div>
      <input class="glass-range" type="range" min="0" max="100" value="65"
        oninput="document.getElementById('v1').textContent=this.value+'%'" />
    </div>

    <div>
      <div style="display:flex; justify-content:space-between; font-size:0.72rem; font-weight:600; margin-bottom:0.5rem">
        <span style="color:rgba(255,255,255,0.7)">Bass</span>
        <span style="color:#3cffa0" id="v2">40%</span>
      </div>
      <input class="glass-range" type="range" min="0" max="100" value="40"
        style="--accent:#3cffa0"
        oninput="document.getElementById('v2').textContent=this.value+'%'" />
    </div>
  </div>
</div>`;

  /* react */
  return `import { useState } from 'react';

const panelStyle = {
  background:          \`rgba(${state.color}, ${a})\`,
  backdropFilter:      \`${bf}\`,
  WebkitBackdropFilter:\`${bf}\`,
  border:              \`1px solid rgba(${state.color}, ${ba})\`,
  borderRadius:        \`${state.radius}px\`,
  padding:             '1.25rem',
};

const controls = [
  { label: 'Volume', color: '#e4ff3c', defaultValue: 65 },
  { label: 'Bass',   color: '#3cffa0', defaultValue: 40 },
  { label: 'Treble', color: '#3c9fff', defaultValue: 80 },
];

export function GlassSlider() {
  const [values, setValues] = useState(controls.map(c => c.defaultValue));

  const update = (i, val) =>
    setValues(prev => prev.map((v, j) => j === i ? val : v));

  return (
    <div style={panelStyle}>
      <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '0.875rem', marginBottom: '1.25rem' }}>
        Audio Controls
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {controls.map((ctrl, i) => (
          <div key={ctrl.label}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>{ctrl.label}</span>
              <span style={{ color: ctrl.color }}>{values[i]}%</span>
            </div>
            <input
              type="range" min={0} max={100} value={values[i]}
              onChange={e => update(i, parseInt(e.target.value))}
              style={{ width: '100%', accentColor: ctrl.color, cursor: 'pointer' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}`;
}




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

  const code = buildToastCode(state);

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

  const code = buildTooltipCode(state);

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

  const code = buildDropdownCode(state);

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
  const code = buildBadgeCode(state);
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
  const code = buildFormCode(state);
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
  const code = buildTableCode(state);
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
  const code = buildSidebarCode(state);
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
  const code = buildTabsCode(state);
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
  const code = buildNavbarCode(state);
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
  const code = buildAvatarCode(state);
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
  const code = buildProgressCode(state);
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
  const code = buildChartCode(state);
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
  const code = buildSliderCode(state);
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
                  style={{'--pct':`${s.val}%`, '--accent':s.color}} />
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