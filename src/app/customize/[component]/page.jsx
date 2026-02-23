'use client';
import { useParams, notFound, useRouter } from 'next/navigation';
import Header from '../../../components/layout/Header';
import Footer from '../../../components/layout/Footer';
import ControlsPanel from '../../../components/ui/ControlsPanel';
import { useGlassState } from '../../../lib/glassState';
import { COMPONENTS } from '../../../lib/components';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

// Dynamic imports for each customizer
const CUSTOMIZERS = {
  card:     dynamic(() => import('../../../components/customizers/CardCustomizer')),
  button:   dynamic(() => import('../../../components/customizers/ButtonCustomizer')),
  modal:    dynamic(() => import('../../../components/customizers/ModalCustomizer')),
  toast:    dynamic(() => import('../../../components/customizers/OtherCustomizers').then(m => ({ default: m.ToastCustomizer }))),
  tooltip:  dynamic(() => import('../../../components/customizers/OtherCustomizers').then(m => ({ default: m.TooltipCustomizer }))),
  dropdown: dynamic(() => import('../../../components/customizers/OtherCustomizers').then(m => ({ default: m.DropdownCustomizer }))),
  badge:    dynamic(() => import('../../../components/customizers/OtherCustomizers').then(m => ({ default: m.BadgeCustomizer }))),
  form:     dynamic(() => import('../../../components/customizers/OtherCustomizers').then(m => ({ default: m.FormCustomizer }))),
  table:    dynamic(() => import('../../../components/customizers/OtherCustomizers').then(m => ({ default: m.TableCustomizer }))),
  sidebar:  dynamic(() => import('../../../components/customizers/OtherCustomizers').then(m => ({ default: m.SidebarCustomizer }))),
  tabs:     dynamic(() => import('../../../components/customizers/OtherCustomizers').then(m => ({ default: m.TabsCustomizer }))),
  navbar:   dynamic(() => import('../../../components/customizers/OtherCustomizers').then(m => ({ default: m.NavbarCustomizer }))),
  avatar:   dynamic(() => import('../../../components/customizers/OtherCustomizers').then(m => ({ default: m.AvatarCustomizer }))),
  progress: dynamic(() => import('../../../components/customizers/OtherCustomizers').then(m => ({ default: m.ProgressCustomizer }))),
  chart:    dynamic(() => import('../../../components/customizers/OtherCustomizers').then(m => ({ default: m.ChartCustomizer }))),
  slider:   dynamic(() => import('../../../components/customizers/OtherCustomizers').then(m => ({ default: m.SliderUiCustomizer }))),
};

export default function CustomizePage() {
  const params = useParams();
  const componentId = params.component;
  const { state, update, applyPreset } = useGlassState();

  const comp = COMPONENTS.find(c => c.id === componentId);
  if (!comp && typeof window !== 'undefined') {
    return notFound();
  }

  const Customizer = CUSTOMIZERS[componentId];
  const currentIdx = COMPONENTS.findIndex(c => c.id === componentId);
  const prevComp = COMPONENTS[currentIdx - 1];
  const nextComp = COMPONENTS[currentIdx + 1];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-[1400px] mx-auto w-full px-4 sm:px-6 py-6 sm:py-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <Link href="/" className="flex items-center gap-1.5 text-[0.75rem] text-[#555] hover:text-[#e4ff3c] transition-colors">
            <ArrowLeft size={13} /> All Components
          </Link>
          <span className="text-[#333]">/</span>
          <span className="text-[0.75rem] font-semibold text-[#888]">{comp?.name}</span>
        </div>

        {/* Page Title */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{comp?.emoji}</span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                {comp?.name} <span className="text-[#e4ff3c]">Customizer</span>
              </h1>
              <p className="text-[0.8rem] text-[#555] mt-0.5">{comp?.desc}</p>
            </div>
          </div>
        </div>

        {/* Component navigation pills */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
          {COMPONENTS.map(c => (
            <Link
              key={c.id}
              href={`/customize/${c.id}`}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-[0.6rem] tracking-wider uppercase transition-all ${
                c.id === componentId
                  ? 'bg-[rgba(228,255,60,0.07)] border border-[rgba(228,255,60,0.18)] text-[#e4ff3c]'
                  : 'border border-[#1e1e1e] text-[#555] hover:border-[#282828] hover:text-[#888]'
              }`}
            >
              <span>{c.emoji}</span> {c.name}
            </Link>
          ))}
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 sm:gap-5 items-start">
          <ControlsPanel state={state} update={update} applyPreset={applyPreset} />

          <div className="min-w-0">
            {Customizer ? (
              <Customizer state={state} update={update} />
            ) : (
              <div className="bg-[#0a0a0a] border border-[#1e1e1e] rounded-2xl p-8 text-center">
                <div className="text-3xl mb-3">🔧</div>
                <div className="font-semibold text-[#555]">Coming Soon</div>
                <div className="text-[0.75rem] text-[#444] mt-1">This component customizer is in progress</div>
              </div>
            )}
          </div>
        </div>

        {/* Prev / Next navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-[#1e1e1e] gap-4">
          {prevComp ? (
            <Link href={`/customize/${prevComp.id}`} className="group flex items-center gap-2.5 bg-[#0a0a0a] border border-[#1e1e1e] rounded-xl px-4 py-3 transition-all hover:border-[#282828] hover:-translate-y-0.5">
              <ArrowLeft size={14} className="text-[#555] group-hover:text-[#e4ff3c] transition-colors" />
              <div>
                <div className="font-mono text-[0.55rem] uppercase tracking-wider text-[#444]">Previous</div>
                <div className="font-semibold text-[0.8rem] text-[#888] group-hover:text-white transition-colors">{prevComp.emoji} {prevComp.name}</div>
              </div>
            </Link>
          ) : <div />}

          {nextComp && (
            <Link href={`/customize/${nextComp.id}`} className="group flex items-center gap-2.5 bg-[#0a0a0a] border border-[#1e1e1e] rounded-xl px-4 py-3 transition-all hover:border-[#282828] hover:-translate-y-0.5 ml-auto">
              <div className="text-right">
                <div className="font-mono text-[0.55rem] uppercase tracking-wider text-[#444]">Next</div>
                <div className="font-semibold text-[0.8rem] text-[#888] group-hover:text-white transition-colors">{nextComp.emoji} {nextComp.name}</div>
              </div>
              <ArrowRight size={14} className="text-[#555] group-hover:text-[#e4ff3c] transition-colors" />
            </Link>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
