import React, { useState } from 'react';
import type { BuilderBadgeData } from '../types';
import { PhotoUploader } from './PhotoUploader';
import { BUILDER_CLASSES, ROLES, BEACH_ITEMS_PRESETS } from '../constants/presets';
import { User, Sparkles, Luggage, Camera, Shuffle } from 'lucide-react';

interface EditorPanelProps {
  data: BuilderBadgeData;
  onChange: (fields: Partial<BuilderBadgeData>) => void;
  onRandomize: () => void;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({ data, onChange, onRandomize }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'beach' | 'avatar'>('profile');

  const handleBeachItemChange = (index: number, key: 'icon' | 'label', value: string) => {
    const newBag = [...data.beachBag] as BuilderBadgeData['beachBag'];
    newBag[index] = { ...newBag[index], [key]: value };
    onChange({ beachBag: newBag });
  };

  return (
    <div className="glass-panel p-6 border border-white-20 flex flex-col gap-6 w-full max-w-xl">
      {/* Header & Quick Randomize Button */}
      <div className="flex items-center justify-between pb-4 border-b border-white-20">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <span>Badge Studio Editor</span>
            <span className="text-xs text-green-dark font-mono px-2 py-1 rounded-full font-bold" style={{ backgroundColor: '#FFE500' }}>
              v2026
            </span>
          </h2>
          <p className="text-xs text-white-60" style={{ marginTop: '2px' }}>Customize your official Hacker House Goa pass</p>
        </div>

        {/* High-visibility Surprise Me button */}
        <button
          onClick={onRandomize}
          className="btn-tech flex items-center gap-1-5"
          style={{
            backgroundColor: 'rgba(255, 229, 0, 0.15)',
            border: '1.5px solid #FFE500',
            color: '#FFE500',
            fontSize: '0.8rem',
            fontWeight: 800,
            padding: '8px 14px',
            borderRadius: '10px',
          }}
          title="Generate random funny profile"
        >
          <Shuffle className="w-3.5 h-3.5" />
          <span>Surprise Me</span>
        </button>
      </div>

      {/* Editor Navigation Tabs — High Visibility */}
      <div className="flex gap-2 p-1-5 rounded-2xl border border-white-20" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex-1 flex items-center justify-center gap-2 py-2-5 text-xs font-extrabold rounded-xl cursor-pointer transition-all`}
          style={{
            backgroundColor: activeTab === 'profile' ? '#FFE500' : 'rgba(255,255,255,0.1)',
            color: activeTab === 'profile' ? '#0B1D14' : '#E5E7EB',
            border: activeTab === 'profile' ? 'none' : '1px solid rgba(255,255,255,0.25)',
            boxShadow: activeTab === 'profile' ? '0 2px 10px rgba(255,229,0,0.4)' : 'none',
          }}
        >
          <User className="w-4 h-4" />
          <span>1. Profile</span>
        </button>

        <button
          onClick={() => setActiveTab('beach')}
          className={`flex-1 flex items-center justify-center gap-2 py-2-5 text-xs font-extrabold rounded-xl cursor-pointer transition-all`}
          style={{
            backgroundColor: activeTab === 'beach' ? '#FF007A' : 'rgba(255,255,255,0.1)',
            color: activeTab === 'beach' ? '#FFFFFF' : '#E5E7EB',
            border: activeTab === 'beach' ? 'none' : '1px solid rgba(255,255,255,0.25)',
            boxShadow: activeTab === 'beach' ? '0 2px 10px rgba(255,0,122,0.4)' : 'none',
          }}
        >
          <Luggage className="w-4 h-4" />
          <span>2. Beach Gear</span>
        </button>

        <button
          onClick={() => setActiveTab('avatar')}
          className={`flex-1 flex items-center justify-center gap-2 py-2-5 text-xs font-extrabold rounded-xl cursor-pointer transition-all`}
          style={{
            backgroundColor: activeTab === 'avatar' ? '#00FFCC' : 'rgba(255,255,255,0.1)',
            color: activeTab === 'avatar' ? '#012b17' : '#E5E7EB',
            border: activeTab === 'avatar' ? 'none' : '1px solid rgba(255,255,255,0.25)',
            boxShadow: activeTab === 'avatar' ? '0 2px 10px rgba(0,255,204,0.3)' : 'none',
          }}
        >
          <Camera className="w-4 h-4" />
          <span>3. Avatar</span>
        </button>
      </div>

      {/* TAB 1: PROFILE & CREDENTIALS */}
      {activeTab === 'profile' && (
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold text-white-80" style={{ display: 'block', marginBottom: '6px' }}>
              Full Name / Alias <span className="text-pink">*</span>
            </label>
            <input
              type="text"
              value={data.fullName}
              onChange={(e) => onChange({ fullName: e.target.value })}
              placeholder="e.g. AMIT KUMAR"
              className="input-tech font-bold text-base"
              style={{ textTransform: 'uppercase', letterSpacing: '1px' }}
              maxLength={24}
            />
          </div>

          <div>
            <label className="text-xs font-bold text-white-80" style={{ display: 'block', marginBottom: '6px' }}>
              Software Speciality Track
            </label>
            <select
              value={data.role}
              onChange={(e) => onChange({ role: e.target.value })}
              className="input-tech font-semibold cursor-pointer"
              style={{ backgroundColor: '#012b17', color: '#ffffff' }}
            >
              {ROLES.map((r, i) => (
                <option key={i} value={r} style={{ backgroundColor: '#012b17', color: '#ffffff' }}>{r}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-white-80" style={{ display: 'block', marginBottom: '6px' }}>
              Builder Class Title
            </label>
            <div className="flex gap-2">
              <select
                value={data.builderClass}
                onChange={(e) => onChange({ builderClass: e.target.value })}
                className="input-tech font-semibold cursor-pointer flex-1"
                style={{ backgroundColor: '#012b17', color: '#ffffff' }}
              >
                {BUILDER_CLASSES.map((c, i) => (
                  <option key={i} value={c} style={{ backgroundColor: '#012b17', color: '#ffffff' }}>{c}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Custom class..."
                onChange={(e) => e.target.value && onChange({ builderClass: e.target.value.toUpperCase() })}
                className="input-tech text-xs"
                style={{ width: '33%' }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-white-80" style={{ display: 'block', marginBottom: '6px' }}>
                Builder Badge ID
              </label>
              <input
                type="text"
                value={data.builderId}
                onChange={(e) => onChange({ builderId: e.target.value })}
                className="input-tech font-mono text-xs text-yellow"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-white-80" style={{ display: 'block', marginBottom: '6px' }}>
                X (Twitter) / URL
              </label>
              <input
                type="text"
                value={data.socialHandle}
                onChange={(e) => onChange({ socialHandle: e.target.value })}
                placeholder="@247pmstudio"
                className="input-tech font-mono text-xs"
              />
            </div>
          </div>

          {/* Bounty — only shown for One Piece (glass) template */}
          {data.template === 'glass' && (
            <div
              style={{
                padding: '12px 14px',
                borderRadius: '12px',
                border: '1.5px solid rgba(233,198,124,0.45)',
                background: 'rgba(233,198,124,0.06)',
              }}
            >
              <label className="text-xs font-bold" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', color: '#E9C67C' }}>
                <span>🏴‍☠️</span>
                <span>BOUNTY AMOUNT (BERRIES ₿)</span>
              </label>
              <input
                type="text"
                value={data.bounty ?? ''}
                onChange={(e) => onChange({ bounty: e.target.value })}
                placeholder="e.g. 3,000,000,000"
                className="input-tech font-mono font-extrabold"
                style={{
                  letterSpacing: '1px',
                  color: '#E9C67C',
                  fontSize: '1.05rem',
                }}
              />
              <p className="text-xs" style={{ marginTop: '6px', color: 'rgba(255,255,255,0.4)' }}>
                Appears on the Wanted poster. Leave empty to auto-calculate.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: BEACH GEAR & SHIPPING */}
      {activeTab === 'beach' && (
        <div className="flex flex-col gap-5">
          <div>
            <label className="text-xs font-bold text-yellow flex items-center gap-1-5" style={{ display: 'flex', marginBottom: '6px' }}>
              <Sparkles className="w-4 h-4" />
              <span>CURRENTLY SHIPPING PROJECT</span>
            </label>
            <input
              type="text"
              value={data.shipping}
              onChange={(e) => onChange({ shipping: e.target.value })}
              placeholder="e.g. BUILDING THE FUTURE"
              className="input-tech text-sm font-extrabold"
              style={{ color: '#FF007A' }}
              maxLength={32}
            />
          </div>

          <div>
            <label className="text-xs font-bold text-white-80" style={{ display: 'block', marginBottom: '8px' }}>
              Beach Bag Essentials (Pick 3 items)
            </label>
            <div className="flex flex-col gap-3">
              {data.beachBag.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2-5 rounded-xl border border-white-20" style={{ backgroundColor: 'rgba(0,0,0,0.35)' }}>
                  <span className="text-xs font-mono text-white-50" style={{ width: '20px' }}>#{idx + 1}</span>
                  <input
                    type="text"
                    value={item.icon}
                    onChange={(e) => handleBeachItemChange(idx, 'icon', e.target.value)}
                    className="text-center text-lg rounded-lg text-white"
                    style={{ width: '40px', height: '40px', backgroundColor: 'rgba(0,0,0,0.5)', border: '1.5px solid rgba(255,255,255,0.25)' }}
                  />
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => handleBeachItemChange(idx, 'label', e.target.value.toUpperCase())}
                    className="input-tech flex-1 text-xs font-bold"
                    maxLength={16}
                  />
                </div>
              ))}
            </div>

            <div style={{ marginTop: '16px' }}>
              <div className="text-xs font-semibold text-white-60" style={{ marginBottom: '8px' }}>Quick Add Presets:</div>
              <div className="flex flex-wrap gap-1-5">
                {BEACH_ITEMS_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      const newBag = [...data.beachBag] as BuilderBadgeData['beachBag'];
                      newBag[idx % 3] = preset;
                      onChange({ beachBag: newBag });
                    }}
                    className="px-2-5 py-1 text-xs font-semibold flex items-center gap-1 cursor-pointer rounded-lg transition-all"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      color: '#F6F2E7',
                    }}
                  >
                    <span>{preset.icon}</span>
                    <span>{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: AVATAR STUDIO */}
      {activeTab === 'avatar' && (
        <PhotoUploader data={data} onChange={onChange} />
      )}
    </div>
  );
};
