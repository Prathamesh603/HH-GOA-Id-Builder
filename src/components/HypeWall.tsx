import React from 'react';
import { PRESET_BUILDERS } from '../constants/presets';
import type { BuilderBadgeData } from '../types';
import { Flame, ArrowRight, CheckCircle2 } from 'lucide-react';

interface HypeWallProps {
  onSelectPreset: (presetData: BuilderBadgeData) => void;
}

export const HypeWall: React.FC<HypeWallProps> = ({ onSelectPreset }) => {
  return (
    <section className="w-full max-w-6xl py-12 flex flex-col gap-8">
      {/* Section Header */}
      <div className="flex flex-col md-flex-row md-items-end justify-between gap-4 border-b border-white-10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-yellow font-extrabold text-sm tracking-wider uppercase" style={{ marginBottom: '4px' }}>
            <Flame className="w-4 h-4 text-pink" />
            <span>COMMUNITY HYPE & SHOWCASE</span>
          </div>
          <h2 className="text-3xl font-black text-white">
            Who's Building in Goa?
          </h2>
          <p className="text-sm text-white-60" style={{ marginTop: '4px' }}>
            Click any legend's badge below to inspect or remix their builder pass!
          </p>
        </div>

        {/* Live Counter Badge */}
        <div className="flex items-center gap-4 glass-panel px-4 py-2 border border-yellow-glow rounded-xl">
          <div className="text-center">
            <div className="text-xl font-black text-yellow">1,480+</div>
            <div className="text-xs text-white-60 font-mono">BADGES CREATED</div>
          </div>
          <div style={{ height: '32px', width: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
          <div className="text-center">
            <div className="text-xl font-black text-pink">OCT 28-31</div>
            <div className="text-xs text-white-60 font-mono">GOA, INDIA</div>
          </div>
        </div>
      </div>

      {/* Builder Cards Showcase Grid */}
      <div className="grid grid-cols-1 md-grid-cols-3 gap-6">
        {PRESET_BUILDERS.map((preset, idx) => (
          <div
            key={idx}
            onClick={() => onSelectPreset(preset)}
            className="glass-panel p-5 border border-white-10 rounded-2xl cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Header Badge */}
              <div className="flex justify-between items-center" style={{ marginBottom: '16px' }}>
                <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-black-30 text-yellow border border-yellow-glow">
                  {preset.builderId}
                </span>
                <span className="text-xs font-semibold text-white-50 flex items-center gap-1">
                  <span>Remix</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Profile Image & Title */}
              <div className="flex items-center gap-4" style={{ marginBottom: '16px' }}>
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-yellow p-1 bg-green-dark">
                  <img src={preset.avatarUrl} alt={preset.name} className="w-full h-full object-cover rounded-full" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">
                    {preset.name}
                  </h3>
                  <div className="text-xs font-semibold text-pink">{preset.builderClass}</div>
                  <div className="text-xs text-white-60">{preset.role}</div>
                </div>
              </div>

              {/* Shipping Status */}
              <div className="bg-black-30 p-3 rounded-xl border border-white-10" style={{ marginBottom: '12px' }}>
                <div className="text-xs font-mono text-white-40" style={{ marginBottom: '2px' }}>CURRENTLY SHIPPING</div>
                <div className="text-xs font-bold text-white">🚀 {preset.shipping}</div>
              </div>

              {/* Beach Bag Tags */}
              <div className="flex gap-1-5">
                {preset.beachBag.map((item, bIdx) => (
                  <span key={bIdx} className="text-xs bg-white-5 px-2 py-1 rounded-md text-white-80 border border-white-10">
                    {item.icon} {item.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Template Tag */}
            <div className="flex items-center justify-between text-xs text-white-40" style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <span>Template: <strong className="text-white" style={{ textTransform: 'capitalize' }}>{preset.template}</strong></span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
