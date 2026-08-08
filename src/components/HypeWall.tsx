import React from 'react';
import { PRESET_BUILDERS } from '../constants/presets';
import type { BuilderBadgeData } from '../types';
import { Flame, ArrowRight } from 'lucide-react';
import { RetroBadgeTemplate } from './Templates/RetroBadgeTemplate';
import { DarkPosterTemplate } from './Templates/DarkPosterTemplate';
import { GlassPassTemplate } from './Templates/GlassPassTemplate';
import { TrainExpressTemplate } from './Templates/TrainExpressTemplate';

interface HypeWallProps {
  onSelectPreset: (presetData: BuilderBadgeData) => void;
}

function TemplateCard({ data }: { data: BuilderBadgeData }) {
  switch (data.template) {
    case 'glass': return <GlassPassTemplate data={data} />;
    case 'train': return <TrainExpressTemplate data={data} />;
    case 'retro': return <RetroBadgeTemplate data={data} />;
    case 'dark':  return <DarkPosterTemplate data={data} />;
    default:      return null;
  }
}

export const HypeWall: React.FC<HypeWallProps> = ({ onSelectPreset }) => {
  return (
    <section className="w-full max-w-6xl py-12 flex flex-col gap-8">
      {/* Section Header */}
      <div className="flex flex-col md-flex-row md-items-end justify-between gap-4 border-b border-white-10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-yellow font-extrabold text-sm tracking-wider uppercase" style={{ marginBottom: '4px' }}>
            <Flame className="w-4 h-4 text-pink" />
            <span>COMMUNITY HYPE &amp; SHOWCASE</span>
          </div>
          <h2 className="text-3xl font-black text-white">
            Who's Building in Goa?
          </h2>
          <p className="text-sm text-white-60" style={{ marginTop: '4px' }}>
            Click any legend's badge to load their pass into the editor and remix it!
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

      {/* Builder Card Grid — actual themed card previews */}
      <div className="grid grid-cols-1 md-grid-cols-2 gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        {PRESET_BUILDERS.map((preset, idx) => (
          <div
            key={idx}
            onClick={() => onSelectPreset(preset)}
            style={{
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
              position: 'relative',
            }}
          >
            {/* Scaled-down card preview */}
            <div
              style={{
                width: '270px',
                height: '420px',
                overflow: 'hidden',
                borderRadius: '16px',
                position: 'relative',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease',
                flexShrink: 0,
              }}
              className="hype-card-hover"
            >
              {/* Scale container — card is 540px wide, we want 270px display = scale 0.5 */}
              <div style={{
                width: '540px',
                transformOrigin: 'top left',
                transform: 'scale(0.5)',
                pointerEvents: 'none',
                userSelect: 'none',
              }}>
                <TemplateCard data={preset} />
              </div>

              {/* Hover overlay with "Remix" CTA */}
              <div
                className="hype-card-overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(1,30,16,0.92) 0%, transparent 50%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  paddingBottom: '20px',
                  opacity: 0,
                  transition: 'opacity 0.25s ease',
                  borderRadius: '16px',
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#FFE500',
                  color: '#0B1D14',
                  fontWeight: 900,
                  fontSize: '13px',
                  fontFamily: "'Outfit', sans-serif",
                  padding: '10px 20px',
                  borderRadius: '24px',
                  boxShadow: '0 4px 20px rgba(255,229,0,0.4)',
                }}>
                  <span>Remix this Badge</span>
                  <ArrowRight style={{ width: '16px', height: '16px' }} />
                </div>
              </div>
            </div>

            {/* Builder name tag below card */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 900, fontSize: '1rem', color: '#FFFFFF', fontFamily: "'Outfit', sans-serif" }}>
                {preset.name}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '1px' }}>
                {preset.title} · {preset.builderId}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .hype-card-hover {
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease;
        }
        .hype-card-hover:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 30px 70px rgba(0,0,0,0.65), 0 0 30px rgba(255,229,0,0.12);
        }
        .hype-card-hover .hype-card-overlay {
          opacity: 0;
          transition: opacity 0.25s ease;
        }
        .hype-card-hover:hover .hype-card-overlay {
          opacity: 1;
        }
      `}</style>
    </section>
  );
};
