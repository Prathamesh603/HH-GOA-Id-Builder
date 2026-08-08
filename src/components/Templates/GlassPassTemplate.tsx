import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import type { BuilderBadgeData } from '../../types';

interface GlassPassTemplateProps {
  data: BuilderBadgeData;
  cardRef?: React.RefObject<HTMLDivElement | null>;
}

export const GlassPassTemplate: React.FC<GlassPassTemplateProps> = ({ data, cardRef }) => {
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
      id="glass-pass-card"
      style={{
        width: '540px',
        minHeight: '840px',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(2, 71, 38, 0.4) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        color: '#FFFFFF',
        borderRadius: '28px',
        border: '1.5px solid rgba(255, 255, 255, 0.25)',
        boxShadow: '0 30px 80px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
        position: 'relative',
        overflow: 'hidden',
        padding: '28px',
        fontFamily: "'Outfit', sans-serif",
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Subtle Holographic Specular Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(0, 255, 204, 0.25) 0%, rgba(255, 0, 122, 0.15) 50%, transparent 80%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      {/* Top Header: Security Chip & Big Tech Branding */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Holographic Chip */}
          <div
            style={{
              width: '46px',
              height: '34px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #FFE500 0%, #D6AB2A 50%, #FF007A 100%)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', inset: '4px', border: '1px solid rgba(0,0,0,0.3)', borderRadius: '4px' }} />
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.65rem', fontFamily: "'JetBrains Mono', monospace", color: '#FFE500', letterSpacing: '2px', fontWeight: 700 }}>
              VIP BUILDER PASS
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '1px' }}>
              HH GOA 2026
            </div>
          </div>
        </div>

        {/* Brand Header */}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '2.8rem',
              fontWeight: 900,
              letterSpacing: '3px',
              color: '#FFFFFF',
              margin: 0,
              textTransform: 'uppercase',
            }}
          >
            HACKER HOUSE
          </h1>
          <div style={{ fontFamily: "'Yatra One', cursive", fontSize: '2rem', color: '#FF007A', marginTop: '-10px' }}>
            गोवा
          </div>
        </div>
      </div>

      {/* Avatar Container */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <div
          style={{
            position: 'relative',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            padding: '4px',
            background: 'linear-gradient(135deg, #FFE500, #FF007A, #00FFCC)',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)',
          }}
        >
          <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#012b17' }}>
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
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#FFFFFF', letterSpacing: '1px', textTransform: 'uppercase' }}>
          {fullName || 'YOUR NAME'}
        </div>
        <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#FFE500', marginTop: '4px', textTransform: 'uppercase' }}>
          ⚡ {builderClass} ⚡
        </div>
        <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>
          {role}
        </div>
      </div>

      {/* Glass Metadata Card */}
      <div
        style={{
          background: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '12px 16px',
          margin: '16px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#FFE500', letterSpacing: '1px' }}>
            PROJECT SHIPPING
          </div>
          <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#FFFFFF', marginTop: '2px' }}>
            {shipping || 'CLASSIFIED'}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>
            🎒 {beachBag.map(b => b.icon).join(' ')}
          </div>
        </div>

        <div>
          <div style={{ backgroundColor: '#FFFFFF', padding: '4px', borderRadius: '6px' }}>
            <QRCodeSVG value={qrValue} size={58} fgColor="#012b17" bgColor="#FFFFFF" level="M" />
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.7rem',
          color: 'rgba(255, 255, 255, 0.6)',
        }}
      >
        <span>{builderId}</span>
        <span>GOA 28-31 OCT 2026</span>
        <span>#FRAMEINGOA</span>
      </div>
    </div>
  );
};
