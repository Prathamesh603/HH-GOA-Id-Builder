import React, { useRef, useState } from 'react';
import type { BuilderBadgeData, PhotoFilter } from '../types';
import { Upload, Image as ImageIcon, Sliders, RefreshCw, ZoomIn, Move } from 'lucide-react';

interface PhotoUploaderProps {
  data: BuilderBadgeData;
  onChange: (fields: Partial<BuilderBadgeData>) => void;
}

const SAMPLE_AVATARS = [
  { label: 'Builder 1', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800' },
  { label: 'Builder 2', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800' },
  { label: 'Builder 3', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800' },
  { label: 'Builder 4', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800' },
];

const FILTERS: { id: PhotoFilter; label: string }[] = [
  { id: 'normal', label: 'Original' },
  { id: 'vintage', label: 'Vintage Warm' },
  { id: 'emerald', label: 'Cyber Green' },
  { id: 'noir', label: 'Noir B&W' },
  { id: 'sepia', label: 'Sepia Gold' },
];

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({ data, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isConverting, setIsConverting] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isHeic = file.name.toLowerCase().endsWith('.heic') || 
                     file.name.toLowerCase().endsWith('.heif') ||
                     file.type === 'image/heic' || 
                     file.type === 'image/heif';

      if (isHeic) {
        setIsConverting(true);
        try {
          // Dynamic import of heic2any for speed optimization
          const heic2any = (await import('heic2any')).default;
          const convertedBlob = await heic2any({
            blob: file,
            toType: 'image/jpeg',
            quality: 0.85
          });
          
          const blobToRead = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
          
          const reader = new FileReader();
          reader.onload = (event) => {
            if (event.target?.result) {
              onChange({
                avatarUrl: event.target.result as string,
                avatarScale: 1,
                avatarOffsetX: 0,
                avatarOffsetY: 0,
              });
            }
            setIsConverting(false);
          };
          reader.readAsDataURL(blobToRead);
        } catch (err) {
          console.error('HEIC conversion failed:', err);
          alert('Failed to convert HEIC image. Please upload a standard JPG/PNG or try another image.');
          setIsConverting(false);
        }
      } else {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            onChange({
              avatarUrl: event.target.result as string,
              avatarScale: 1,
              avatarOffsetX: 0,
              avatarOffsetY: 0,
            });
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Upload Drop Zone */}
      <div
        onClick={() => !isConverting && fileInputRef.current?.click()}
        className="flex flex-col items-center justify-center p-6 border border-dashed border-white-20 rounded-2xl bg-black-20"
        style={{
          opacity: isConverting ? 0.7 : 1,
          cursor: isConverting ? 'wait' : 'pointer',
          borderColor: isConverting ? '#00FFCC' : undefined,
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.heic,.heif"
          style={{ display: 'none' }}
          onChange={handleFileChange}
          disabled={isConverting}
        />
        <div className="w-12 h-12 rounded-full flex items-center justify-center text-yellow" style={{ backgroundColor: 'rgba(255, 229, 0, 0.1)', marginBottom: '12px' }}>
          {isConverting ? (
            <RefreshCw className="w-6 h-6 animate-spin-uploader" />
          ) : (
            <Upload className="w-6 h-6" />
          )}
        </div>
        <div className="text-sm font-semibold text-white">
          {isConverting ? 'Converting HEIC Photo...' : 'Click to Upload Avatar Photo'}
        </div>
        <div className="text-xs text-white-50" style={{ marginTop: '4px' }}>
          {isConverting ? 'Please wait, rendering iPhone HEIC format...' : 'PNG, JPG, WEBP or HEIC (iPhone) up to 10MB'}
        </div>
      </div>

      {/* Preset Avatars Bar */}
      <div>
        <div className="text-xs font-semibold text-white-60 flex items-center gap-1-5" style={{ marginBottom: '8px' }}>
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Or Choose Sample Avatar</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {SAMPLE_AVATARS.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => onChange({ avatarUrl: sample.url, avatarScale: 1, avatarOffsetX: 0, avatarOffsetY: 0 })}
              className="relative rounded-xl overflow-hidden border cursor-pointer"
              style={{
                height: '56px',
                borderColor: data.avatarUrl === sample.url ? '#FFE500' : 'rgba(255,255,255,0.1)',
                opacity: data.avatarUrl === sample.url ? 1 : 0.7,
              }}
            >
              <img src={sample.url} alt={sample.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      </div>

      {/* Photo Controls: Zoom & Pan */}
      <div className="bg-black-30 p-4 rounded-xl border border-white-10 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold text-yellow flex items-center gap-1-5">
            <Sliders className="w-4 h-4" />
            <span>PHOTO ADJUSTMENTS</span>
          </div>
          <button
            onClick={() => onChange({ avatarScale: 1, avatarOffsetX: 0, avatarOffsetY: 0, avatarFilter: 'normal' })}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.6)',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              padding: '4px 10px',
              cursor: 'pointer',
            }}
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>

        {/* Zoom Scale */}
        <div className="flex flex-col gap-1-5">
          <div className="flex justify-between text-xs text-white-70">
            <span className="flex items-center gap-1"><ZoomIn className="w-3.5 h-3.5" /> Zoom Level</span>
            <span className="font-mono text-yellow">{Math.round(data.avatarScale * 100)}%</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="2.5"
            step="0.05"
            value={data.avatarScale}
            onChange={(e) => onChange({ avatarScale: parseFloat(e.target.value) })}
            className="w-full cursor-pointer"
          />
        </div>

        {/* Pan X */}
        <div className="flex flex-col gap-1-5">
          <div className="flex justify-between text-xs text-white-70">
            <span className="flex items-center gap-1"><Move className="w-3.5 h-3.5" /> Horizontal Position</span>
            <span className="font-mono text-white">{data.avatarOffsetX}px</span>
          </div>
          <input
            type="range"
            min="-100"
            max="100"
            step="2"
            value={data.avatarOffsetX}
            onChange={(e) => onChange({ avatarOffsetX: parseInt(e.target.value) })}
            className="w-full cursor-pointer"
          />
        </div>

        {/* Pan Y */}
        <div className="flex flex-col gap-1-5">
          <div className="flex justify-between text-xs text-white-70">
            <span className="flex items-center gap-1"><Move className="w-3.5 h-3.5" /> Vertical Position</span>
            <span className="font-mono text-white">{data.avatarOffsetY}px</span>
          </div>
          <input
            type="range"
            min="-100"
            max="100"
            step="2"
            value={data.avatarOffsetY}
            onChange={(e) => onChange({ avatarOffsetY: parseInt(e.target.value) })}
            className="w-full cursor-pointer"
          />
        </div>

        {/* Photo Filters */}
        <div className="flex flex-col gap-2" style={{ marginTop: '4px' }}>
          <div className="text-xs font-semibold text-white-70">Color Filter Effect</div>
          <div className="grid grid-cols-3 gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => onChange({ avatarFilter: f.id })}
                style={{
                  padding: '6px 10px',
                  fontSize: '11px',
                  fontWeight: data.avatarFilter === f.id ? 800 : 600,
                  borderRadius: '8px',
                  border: data.avatarFilter === f.id ? '2px solid #FFE500' : '1px solid rgba(255,255,255,0.2)',
                  backgroundColor: data.avatarFilter === f.id ? '#FFE500' : 'rgba(255,255,255,0.08)',
                  color: data.avatarFilter === f.id ? '#0B1D14' : '#E5E7EB',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  fontFamily: 'Outfit, sans-serif',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes spin-uploader {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-uploader {
          animation: spin-uploader 1.2s linear infinite;
        }
      `}</style>
    </div>
  );
};
