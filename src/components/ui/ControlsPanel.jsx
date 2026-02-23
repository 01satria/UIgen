'use client';
import { Panel, SliderControl, ToggleGroup, SwatchPicker } from '../ui';
import { SWATCHES, PRESETS } from '../../lib/glassState';

export default function ControlsPanel({ state, update, applyPreset }) {
  return (
    <Panel label="Controls" className="lg:sticky lg:top-[84px]">

      {/* Sliders */}
      <SliderControl label="Blur" value={state.blur} min={0} max={60} unit="px" onChange={v => update('blur', v)} />
      <SliderControl label="Opacity" value={state.opacity} min={0} max={80} unit="%" onChange={v => update('opacity', v)} />
      <SliderControl label="Border Opacity" value={state.borderOp} min={0} max={80} unit="%" onChange={v => update('borderOp', v)} />
      <SliderControl label="Border Radius" value={state.radius} min={0} max={60} unit="px" onChange={v => update('radius', v)} />
      <SliderControl label="Shadow Depth" value={state.shadow} min={0} max={100} unit="%" onChange={v => update('shadow', v)} />
      <SliderControl label="Saturation" value={state.saturation} min={100} max={300} unit="%" onChange={v => update('saturation', v)} />
      <SliderControl label="Brightness" value={state.brightness} min={50} max={200} unit="%" onChange={v => update('brightness', v)} />

      <hr className="border-t border-[#1e1e1e] my-4" />

      {/* Color */}
      <div className="mb-4">
        <div className="text-[0.75rem] font-semibold text-[#777] mb-2">Tint Color</div>
        <SwatchPicker swatches={SWATCHES} value={state.color} onChange={v => update('color', v)} />
      </div>

      <hr className="border-t border-[#1e1e1e] my-4" />

      {/* Text Color */}
      <div className="mb-4">
        <div className="text-[0.75rem] font-semibold text-[#777] mb-2">Card Text</div>
        <ToggleGroup
          options={[{ label: 'Light', value: 'light' }, { label: 'Dark', value: 'dark' }]}
          value={state.textColor}
          onChange={v => update('textColor', v)}
        />
      </div>

      <hr className="border-t border-[#1e1e1e] my-4" />

      {/* Quick Presets */}
      <div>
        <div className="text-[0.75rem] font-semibold text-[#777] mb-2">Quick Presets</div>
        <div className="grid grid-cols-2 gap-1.5">
          {PRESETS.map(p => (
            <button
              key={p.name}
              onClick={() => applyPreset(p)}
              className="group relative flex flex-col items-start gap-1 p-2.5 rounded-lg border border-[#1e1e1e] bg-transparent transition-all hover:border-[rgba(228,255,60,0.18)] hover:-translate-y-0.5 hover:shadow-md overflow-hidden"
            >
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#e4ff3c] to-transparent -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              <div
                className="w-full h-4 rounded"
                style={{ background: `rgba(${p.color}, ${p.opacity/100})`, border: `1px solid rgba(${p.color}, ${p.borderOp/100})` }}
              />
              <span className="text-[0.68rem] font-semibold text-[#888] group-hover:text-[#e4ff3c] transition-colors">{p.name}</span>
              <span className="font-mono text-[0.55rem] text-[#555]">{p.blur}px · {p.opacity}%</span>
            </button>
          ))}
        </div>
      </div>
    </Panel>
  );
}
