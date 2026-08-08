import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import type { BuilderBadgeData } from '../../types';

interface DarkPosterTemplateProps {
  data: BuilderBadgeData;
  cardRef?: React.RefObject<HTMLDivElement | null>;
}

export const DarkPosterTemplate: React.FC<DarkPosterTemplateProps> = ({ data, cardRef }) => {
  const {
    fullName,
    role,
    builderClass,
    shipping,
    builderId,
    beachBag,
    socialHandle,
    avatarUrl,
    avatarScale,
    avatarOffsetX,
    avatarOffsetY,
    avatarFilter,
  } = data;

  const qrValue = socialHandle.startsWith('http')
    ? socialHandle
    : `https://x.com/${socialHandle.replace('@', '')}`;

  return (
    <div
      ref={cardRef}
      id="dark-poster-card"
      style={{
        width: '540px',
        minHeight: '840px',
        backgroundColor: '#012b17',
        backgroundImage: `
          radial-gradient(circle at 50% 0%, rgba(2, 71, 38, 0.9) 0%, transparent 70%),
          radial-gradient(circle at 100% 100%, rgba(255, 0, 122, 0.15) 0%, transparent 50%)
        `,
        color: '#F6F2E7',
        borderRadius: '28px',
        border: '6px solid #FFE500',
        boxShadow: '0 30px 70px rgba(0, 0, 0, 0.6)',
        position: 'relative',
        overflow: 'hidden',
        padding: '24px 24px 20px 24px',
        fontFamily: "'Outfit', sans-serif",
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Palm leaf background accents */}
      <div
        style={{
          position: 'absolute',
          top: '-30px',
          left: '-30px',
          fontSize: '4rem',
          opacity: 0.15,
          pointerEvents: 'none',
        }}
      >
        🌴
      </div>
      <div
        style={{
          position: 'absolute',
          top: '-30px',
          right: '-30px',
          fontSize: '4rem',
          opacity: 0.15,
          pointerEvents: 'none',
        }}
      >
        🌴
      </div>

      {/* Top Brand Banner */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 5 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.7rem',
            fontFamily: "'JetBrains Mono', monospace",
            color: '#FFE500',
            letterSpacing: '1px',
            marginBottom: '4px',
          }}
        >
          <span>GOA, INDIA</span>
          <span>28 - 31 OCT 2026</span>
          <span>2:47 PM STUDIO</span>
        </div>

        {/* Poster Header Title */}
        <div style={{ position: 'relative', margin: '4px 0 2px 0' }}>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '3.2rem',
              fontWeight: 900,
              color: '#FFE500',
              letterSpacing: '2px',
              lineHeight: 0.9,
              margin: 0,
              textTransform: 'uppercase',
              textShadow: '0 4px 12px rgba(0,0,0,0.5)',
            }}
          >
            HACKER HOUSE
          </h1>

          {/* Devanagari Script Overlay */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -55%) rotate(-6deg)',
              fontFamily: "'Yatra One', cursive",
              fontSize: '2.8rem',
              color: '#FF007A',
              textShadow: '3px 3px 0 #FFE500, -2px -2px 0 #000',
              zIndex: 10,
              pointerEvents: 'none',
            }}
          >
            गोवा
          </div>
        </div>

        <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '3px', marginTop: '6px' }}>
          HH GOA 2026
        </div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#FF007A', letterSpacing: '1px' }}>
          ONE FRAME, WHOLE CREW
        </div>
      </div>

      {/* Main Avatar Showcase Frame */}
      <div
        style={{
          position: 'relative',
          margin: '16px 0',
          borderRadius: '20px',
          border: '3px solid #FF007A',
          outline: '2px solid #FFE500',
          padding: '8px',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.5)',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '240px',
            borderRadius: '14px',
            overflow: 'hidden',
            backgroundColor: '#011e10',
            position: 'relative',
          }}
        >
          <img
            src={avatarUrl}
            alt={fullName}
            className={`filter-${avatarFilter}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: `scale(${avatarScale}) translate(${avatarOffsetX}px, ${avatarOffsetY}px)`,
              transition: 'transform 0.1s ease-out',
            }}
          />

          {/* Overlay Badge */}
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              backgroundColor: 'rgba(1, 43, 23, 0.9)',
              backdropFilter: 'blur(8px)',
              border: '1px solid #FFE500',
              padding: '6px 14px',
              borderRadius: '10px',
              color: '#FFE500',
              fontWeight: 800,
              fontSize: '0.8rem',
              letterSpacing: '1px',
            }}
          >
            ⚡ {builderClass}
          </div>
        </div>
      </div>

      {/* Builder Name Callout */}
      <div style={{ textAlign: 'center', marginBottom: '12px' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FFE500', letterSpacing: '2px' }}>
          BUILDER NAME
        </div>
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900,
            fontSize: '2rem',
            color: '#FFFFFF',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            textShadow: '0 2px 8px rgba(0,0,0,0.6)',
          }}
        >
          {fullName || 'YOUR NAME'}
        </div>
        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FF007A', marginTop: '2px' }}>
          {role}
        </div>
      </div>

      {/* Info & Metadata Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '12px',
          backgroundColor: 'rgba(2, 71, 38, 0.4)',
          border: '1px solid rgba(255, 229, 0, 0.3)',
          borderRadius: '16px',
          padding: '12px 16px',
          marginBottom: '12px',
        }}
      >
        <div>
          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#FFE500', letterSpacing: '1px' }}>
            CURRENTLY SHIPPING
          </div>
          <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#FFFFFF', margin: '2px 0 8px 0' }}>
            {shipping || 'CLASSIFIED BUILD'}
          </div>

          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#FFE500', letterSpacing: '1px' }}>
            BEACH ESSENTIALS
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '4px', fontSize: '0.75rem', color: '#F6F2E7' }}>
            {beachBag.map((item, idx) => (
              <span key={idx} style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)' }}>
                {item.icon} {item.label}
              </span>
            ))}
          </div>
        </div>

        {/* QR & ID Side */}
        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#FFFFFF', padding: '4px', borderRadius: '8px', display: 'inline-block' }}>
            <QRCodeSVG value={qrValue} size={64} fgColor="#012b17" bgColor="#FFFFFF" level="M" />
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: '#FFE500', marginTop: '4px', fontWeight: 700 }}>
            {builderId}
          </div>
        </div>
      </div>

      {/* Poster Footer */}
      <div
        style={{
          borderTop: '1px dashed rgba(255, 229, 0, 0.3)',
          paddingTop: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.65rem',
          fontFamily: "'JetBrains Mono', monospace",
          color: 'rgba(246, 242, 231, 0.7)',
        }}
      >
        <span>#FrameInGoa</span>
        <span>28-31 OCT 2026 • GOA, INDIA</span>
        <span>© 2026 HH-GOA</span>
      </div>
    </div>
  );
};
