import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { RetroBadgeTemplate } from './Templates/RetroBadgeTemplate';
import { DarkPosterTemplate } from './Templates/DarkPosterTemplate';
import { GlassPassTemplate } from './Templates/GlassPassTemplate';
import { TrainExpressTemplate } from './Templates/TrainExpressTemplate';
import type { BuilderBadgeData, CardTemplate } from '../types';
import { Sparkles, Download, Share2, Film } from 'lucide-react';
import { toPng } from 'html-to-image';
import { AnimationOverlay } from './AnimationOverlay';

interface CardPreviewProps {
  data: BuilderBadgeData;
  onUpdateTemplate: (template: CardTemplate) => void;
  onExport: () => void;
  onShare: () => void;
  cardRef: React.RefObject<HTMLDivElement | null>;
  isExporting: boolean;
}

const TEMPLATES: { id: CardTemplate; emoji: string; label: string; activeColor: string; activeTextColor: string; }[] = [
  { id: 'retro', emoji: '🏷️', label: 'Retro Stamp', activeColor: '#FFE500', activeTextColor: '#0B1D14' },
  { id: 'train', emoji: '🚂', label: 'Konkan Express', activeColor: '#991B1B', activeTextColor: '#FEF08A' },
  { id: 'dark', emoji: '🌴', label: 'Dark Poster', activeColor: '#FF007A', activeTextColor: '#FFFFFF' },
  { id: 'glass', emoji: '🏴', label: 'One Piece Wanted', activeColor: '#E9C67C', activeTextColor: '#1E1713' },
];

export const CardPreview: React.FC<CardPreviewProps> = ({
  data,
  onUpdateTemplate,
  onExport,
  onShare,
  cardRef,
  isExporting,
}) => {
  const [isTiltEnabled, setIsTiltEnabled] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardInnerRef = useRef<HTMLDivElement>(null);

  const [isAnimatingOpen, setIsAnimatingOpen] = useState(false);
  const [animationImage, setAnimationImage] = useState<string | null>(null);
  const [initialCardRect, setInitialCardRect] = useState<DOMRect | null>(null);
  const [isCapturingForAnimation, setIsCapturingForAnimation] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleAnimateClick = async () => {
    if (!cardRef.current) return;
    setIsCapturingForAnimation(true);
    try {
      const rect = cardRef.current.getBoundingClientRect();
      setInitialCardRect(rect);

      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 3,
        quality: 0.95,
        cacheBust: true,
        filter: (node) => !(node instanceof HTMLElement && node.classList.contains('card-glare')),
      });

      setAnimationImage(dataUrl);
      setIsAnimatingOpen(true);
    } catch (error) {
      console.error('Failed to capture card for animation:', error);
      alert('Failed to initialize animation. Please try again.');
    } finally {
      setIsCapturingForAnimation(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isTiltEnabled || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const newRotateX = ((y - centerY) / centerY) * -12;
    const newRotateY = ((x - centerX) / centerX) * 12;
    setRotateX(newRotateX);
    setRotateY(newRotateY);
    
    if (cardInnerRef.current) {
      cardInnerRef.current.style.transform = `rotateX(${newRotateX}deg) rotateY(${newRotateY}deg)`;
    }
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    if (cardInnerRef.current) {
      cardInnerRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: '680px', gap: '20px' }}>

      {/* ── Template Selector – always visible ── */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        padding: '10px',
        background: 'rgba(2,43,25,0.9)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: '16px',
        width: '100%',
      }}>
        <div style={{ width: '100%', fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '1.5px', paddingLeft: '4px', paddingBottom: '4px', fontFamily: 'JetBrains Mono, monospace' }}>
          SELECT TEMPLATE →
        </div>
        {TEMPLATES.map((t) => {
          const isActive = data.template === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onUpdateTemplate(t.id)}
              style={{
                flex: '1 1 auto',
                minWidth: '130px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '10px 14px',
                fontSize: '12px',
                fontWeight: 800,
                fontFamily: 'Outfit, sans-serif',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.16,1,0.3,1)',
                border: isActive ? `2px solid ${t.activeColor}` : '1.5px solid rgba(255,255,255,0.3)',
                backgroundColor: isActive ? t.activeColor : 'rgba(255,255,255,0.1)',
                color: isActive ? t.activeTextColor : '#E5E7EB',
                boxShadow: isActive ? `0 4px 16px ${t.activeColor}55` : '0 2px 8px rgba(0,0,0,0.3)',
                transform: isActive ? 'scale(1.04)' : 'scale(1)',
              }}
            >
              <span style={{ fontSize: '16px' }}>{t.emoji}</span>
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── 3D Card Stage ── */}
      <div style={{ perspective: '1200px', width: '100%', display: 'flex', justifyContent: 'center', padding: '16px 0' }}>
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            position: 'relative',
            cursor: 'grab',
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.15s cubic-bezier(0.2,0,0.2,1)',
            willChange: 'transform',
          }}
        >
          {data.template === 'retro' && <RetroBadgeTemplate data={data} cardRef={cardRef} />}
          {data.template === 'train' && <TrainExpressTemplate data={data} cardRef={cardRef} />}
          {data.template === 'dark' && <DarkPosterTemplate data={data} cardRef={cardRef} />}
          {data.template === 'glass' && <GlassPassTemplate data={data} cardRef={cardRef} />}

          {/* Specular glare overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '24px',
            pointerEvents: 'none',
            opacity: isTiltEnabled ? 0.6 : 0,
            background: `radial-gradient(circle at ${50 + rotateY * 2}% ${50 - rotateX * 2}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
            mixBlendMode: 'overlay',
            transition: 'opacity 0.3s ease',
          }} />
        </div>
      </div>

      {/* ── Action Bar – always visible ── */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        padding: '14px 20px',
        background: 'rgba(2,43,25,0.9)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: '16px',
        width: '100%',
      }}>
        {/* Download button */}
        <button
          onClick={onExport}
          disabled={isExporting}
          style={{
            flex: '1 1 180px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '14px 24px',
            backgroundColor: isExporting ? '#b39f00' : '#FFE500',
            color: '#0B1D14',
            fontWeight: 800,
            fontSize: '14px',
            fontFamily: 'Outfit, sans-serif',
            borderRadius: '12px',
            cursor: isExporting ? 'not-allowed' : 'pointer',
            border: '2px solid #FFE500',
            boxShadow: '0 4px 16px rgba(255,229,0,0.4)',
            transition: 'all 0.2s ease',
          }}
        >
          <Download style={{ width: '18px', height: '18px' }} />
          <span>{isExporting ? 'Generating...' : 'Download Badge (HD)'}</span>
        </button>

        {/* Share button */}
        <button
          onClick={onShare}
          disabled={isExporting}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '14px 20px',
            backgroundColor: '#FF007A',
            color: '#FFFFFF',
            fontWeight: 800,
            fontSize: '14px',
            fontFamily: 'Outfit, sans-serif',
            borderRadius: '12px',
            cursor: isExporting ? 'not-allowed' : 'pointer',
            opacity: isExporting ? 0.7 : 1,
            border: '2px solid #FF007A',
            boxShadow: '0 4px 16px rgba(255,0,122,0.4)',
            transition: 'all 0.2s ease',
          }}
        >
          <Share2 style={{ width: '18px', height: '18px' }} />
          <span>{isExporting ? 'Preparing card...' : 'Share Card to X'}</span>
        </button>

        {/* Animate button */}
        <button
          onClick={handleAnimateClick}
          disabled={isExporting || isCapturingForAnimation}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '14px 20px',
            backgroundColor: '#036737',
            color: '#FFFFFF',
            fontWeight: 800,
            fontSize: '14px',
            fontFamily: 'Outfit, sans-serif',
            borderRadius: '12px',
            cursor: (isExporting || isCapturingForAnimation) ? 'not-allowed' : 'pointer',
            opacity: (isExporting || isCapturingForAnimation) ? 0.7 : 1,
            border: '2px solid #036737',
            boxShadow: '0 4px 16px rgba(3,103,55,0.4)',
            transition: 'all 0.2s ease',
          }}
        >
          <Film style={{ width: '18px', height: '18px' }} />
          <span>{isCapturingForAnimation ? 'Rendering...' : 'Animate Badge 🎬'}</span>
        </button>

        {/* 3D Tilt toggle button */}
        <button
          onClick={() => setIsTiltEnabled(!isTiltEnabled)}
          title={isTiltEnabled ? '3D Tilt Active – Click to Disable' : 'Enable 3D Tilt'}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            padding: '14px 16px',
            backgroundColor: isTiltEnabled ? 'rgba(255,229,0,0.15)' : 'rgba(255,255,255,0.08)',
            color: isTiltEnabled ? '#FFE500' : '#9CA3AF',
            fontWeight: 700,
            fontSize: '12px',
            fontFamily: 'Outfit, sans-serif',
            borderRadius: '12px',
            cursor: 'pointer',
            border: isTiltEnabled ? '1.5px solid #FFE500' : '1.5px solid rgba(255,255,255,0.2)',
            transition: 'all 0.2s ease',
          }}
        >
          <Sparkles style={{ width: '16px', height: '16px' }} />
          <span>3D {isTiltEnabled ? 'ON' : 'OFF'}</span>
        </button>
      </div>

      {isAnimatingOpen && animationImage && createPortal(
        <AnimationOverlay
          cardImage={animationImage}
          initialRect={initialCardRect}
          onClose={() => setIsAnimatingOpen(false)}
          fileName={data.fullName || 'builder'}
        />,
        document.body
      )}
    </div>
  );
};
