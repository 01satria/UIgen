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

  if (tab === 'css') return `.glass {
  background: rgba(${color}, ${a});
  backdrop-filter: ${bFilter};
  -webkit-backdrop-filter: ${bFilter};
  border: 1px solid rgba(${color}, ${ba});
  border-radius: ${radius}px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, ${sa}),
              inset 0 0 0 1px rgba(${color}, ${ba});
}`;

  if (tab === 'tailwind') return `bg-white/${Math.round(opacity)} backdrop-blur-[${blur}px] backdrop-saturate-[${saturation}%] rounded-[${radius}px] border border-white/${Math.round(borderOp)} shadow-[0_8px_32px_rgba(0,0,0,${sa})]`;

  if (tab === 'vars') return `:root {
  --glass-bg: rgba(${color}, ${a});
  --glass-blur: ${blur}px;
  --glass-saturation: ${saturation}%;
  --glass-border: rgba(${color}, ${ba});
  --glass-radius: ${radius}px;
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, ${sa});
}

.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-saturation));
  border: 1px solid var(--glass-border);
  border-radius: var(--glass-radius);
  box-shadow: var(--glass-shadow);
}`;

  return `const glassStyle = {
  background: \`rgba(${color}, ${a})\`,
  backdropFilter: \`${bFilter}\`,
  WebkitBackdropFilter: \`${bFilter}\`,
  border: \`1px solid rgba(${color}, ${ba})\`,
  borderRadius: ${radius},
  boxShadow: \`0 8px 32px rgba(0,0,0,${sa})\`,
};

export const GlassCard = ({ children }) => (
  <div style={glassStyle}>{children}</div>
);`;
}
