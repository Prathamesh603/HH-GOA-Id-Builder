import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import type { BuilderBadgeData } from '../../types';

interface RetroBadgeTemplateProps {
  data: BuilderBadgeData;
  cardRef?: React.RefObject<HTMLDivElement | null>;
}

export const RetroBadgeTemplate: React.FC<RetroBadgeTemplateProps> = ({ data, cardRef }) => {
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
      id="retro-badge-card"
      style={{
        width: '540px',
        minHeight: '840px',
        backgroundColor: '#F7F2E7',
        color: '#0B1D14',
        borderRadius: '28px',
        border: '10px solid #01371D',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)',
        position: 'relative',
        overflow: 'hidden',
        padding: '20px 24px 16px 24px',
        fontFamily: "'Outfit', sans-serif",
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Outer Stamp Pattern Border */}
      <div
        style={{
          position: 'absolute',
          inset: '6px',
          border: '2px dashed #D6AB2A',
          borderRadius: '20px',
          pointerEvents: 'none',
        }}
      />

      {/* Top Header Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
        {/* Left Stamp Badge */}
        <div
          style={{
            width: '90px',
            height: '110px',
            backgroundColor: '#01371D',
            border: '2px solid #D6AB2A',
            borderRadius: '8px',
            padding: '6px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '2px 4px 10px rgba(0,0,0,0.15)',
          }}
        >
          <div style={{ color: '#FFE500', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '1px' }}>
            GOA INDIA
          </div>
          {/* Sunset Palm SVG */}
          <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="28" fill="#FFE500" opacity="0.3" />
            <path d="M12 48C20 44 44 44 52 48" stroke="#F7F2E7" strokeWidth="2" strokeLinecap="round" />
            <circle cx="32" cy="26" r="10" fill="#FF007A" />
            <path d="M32 20V46M32 26L22 18M32 26L42 18M32 30L20 28M32 30L44 28" stroke="#01371D" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <div style={{ color: '#FF007A', fontSize: '0.6rem', fontWeight: 700 }}>
            28-31 OCT 2026
          </div>
        </div>

        {/* Center Tag Header */}
        <div style={{ textAlign: 'center', flex: 1, padding: '0 8px' }}>
          <div
            style={{
              backgroundColor: '#FF007A',
              color: '#FFE500',
              fontWeight: 900,
              fontSize: '0.75rem',
              letterSpacing: '1px',
              padding: '4px 14px',
              borderRadius: '20px',
              display: 'inline-block',
              border: '2px solid #01371D',
              boxShadow: '0 3px 0 #01371D',
              marginBottom: '4px',
            }}
          >
            🌴 HH GOA 2026 🌴
          </div>
          {/* Main Title: HACKER गोवा HOUSE */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              marginTop: '2px',
            }}
          >
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontSize: '2.5rem',
                color: '#01371D',
                letterSpacing: '-1px',
                lineHeight: 1,
              }}
            >
              HACKER
            </span>
            <span
              style={{
                fontFamily: "'Yatra One', cursive",
                fontSize: '2.2rem',
                color: '#FF007A',
                textShadow: '2px 2px 0px #FFE500, -1px -1px 0px #01371D, 1px -1px 0px #01371D',
                lineHeight: 1,
                transform: 'rotate(-4deg)',
                display: 'inline-block',
              }}
            >
              गोवा
            </span>
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontSize: '2.5rem',
                color: '#01371D',
                letterSpacing: '-1px',
                lineHeight: 1,
              }}
            >
              HOUSE
            </span>
          </div>
        </div>

        {/* Right Circular Stamp Badge */}
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            border: '2px dashed #01371D',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '4px',
            color: '#01371D',
            transform: 'rotate(8deg)',
          }}
        >
          <div style={{ fontSize: '0.55rem', fontWeight: 800, letterSpacing: '0.5px' }}>BUILD IN GOA</div>
          <div style={{ fontSize: '1.2rem', margin: '-2px 0' }}>🌴</div>
          <div style={{ fontSize: '0.5rem', fontWeight: 700 }}>SHIP PARADISE</div>
        </div>
      </div>

      {/* Center Avatar Section with Signposts & House Accents */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '12px 0 8px 0',
          minHeight: '260px',
        }}
      >
        {/* Left Signpost Graphic */}
        <div
          style={{
            position: 'absolute',
            left: '0px',
            bottom: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 10,
          }}
        >
          <div
            style={{
              backgroundColor: '#FFE500',
              color: '#01371D',
              fontWeight: 800,
              fontSize: '0.7rem',
              padding: '3px 10px',
              borderRadius: '4px',
              border: '2px solid #01371D',
              boxShadow: '2px 2px 0 #01371D',
              transform: 'rotate(-5deg)',
              marginBottom: '4px',
            }}
          >
            BUILD
          </div>
          <div
            style={{
              backgroundColor: '#FF007A',
              color: '#FFF',
              fontWeight: 800,
              fontSize: '0.7rem',
              padding: '3px 10px',
              borderRadius: '4px',
              border: '2px solid #01371D',
              boxShadow: '2px 2px 0 #01371D',
              transform: 'rotate(3deg)',
              marginBottom: '4px',
            }}
          >
            SHIP
          </div>
          <div
            style={{
              backgroundColor: '#01371D',
              color: '#FFE500',
              fontWeight: 800,
              fontSize: '0.7rem',
              padding: '3px 10px',
              borderRadius: '4px',
              border: '2px solid #01371D',
              boxShadow: '2px 2px 0 #01371D',
              transform: 'rotate(-2deg)',
            }}
          >
            REPEAT
          </div>
        </div>

        {/* Circular Avatar Frame */}
        <div
          style={{
            position: 'relative',
            width: '230px',
            height: '230px',
            borderRadius: '50%',
            border: '8px solid #FFE500',
            outline: '4px solid #01371D',
            boxShadow: '0 12px 30px rgba(1, 55, 29, 0.3)',
            overflow: 'hidden',
            backgroundColor: '#01371D',
            zIndex: 5,
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
        </div>

        {/* Right Starburst Sticker: LET'S BUILD! */}
        <div
          style={{
            position: 'absolute',
            right: '8px',
            top: '20px',
            backgroundColor: '#FFE500',
            color: '#01371D',
            border: '2px solid #01371D',
            padding: '8px 12px',
            borderRadius: '12px',
            fontWeight: 900,
            fontSize: '0.85rem',
            textAlign: 'center',
            boxShadow: '3px 3px 0 #01371D',
            transform: 'rotate(12deg)',
            zIndex: 10,
            lineHeight: 1.2,
          }}
        >
          LET'S<br />BUILD!
        </div>
      </div>

      {/* Name Banner */}
      <div
        style={{
          backgroundColor: '#01371D',
          color: '#FFFFFF',
          borderRadius: '16px',
          padding: '10px 16px',
          textAlign: 'center',
          border: '3px solid #FFE500',
          boxShadow: '0 6px 0 #001F10',
          marginBottom: '8px',
          position: 'relative',
          zIndex: 5,
        }}
      >
        <div
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 900,
            fontSize: '1.75rem',
            letterSpacing: '2px',
            color: '#FFFFFF',
            textTransform: 'uppercase',
          }}
        >
          ✨ {fullName || 'YOUR NAME'} ✨
        </div>
      </div>

      {/* Role Pill */}
      <div
        style={{
          backgroundColor: '#FFE500',
          color: '#01371D',
          borderRadius: '12px',
          padding: '6px 14px',
          textAlign: 'center',
          fontWeight: 900,
          fontSize: '0.9rem',
          letterSpacing: '1px',
          border: '2px solid #01371D',
          marginBottom: '12px',
          textTransform: 'uppercase',
        }}
      >
        ⚡ {role} ⚡
      </div>

      {/* Details Grid (3 Columns) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr 1.1fr',
          gap: '10px',
          alignItems: 'start',
          borderTop: '2px dashed rgba(1, 55, 29, 0.3)',
          paddingTop: '12px',
          marginBottom: '8px',
        }}
      >
        {/* Column 1: Builder Class & QR Code */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#FF007A', letterSpacing: '0.5px' }}>
            ✦ BUILDER CLASS ✦
          </div>
          <div style={{ fontSize: '0.9rem', fontWeight: 900, color: '#01371D', margin: '4px 0 8px 0' }}>
            {builderClass}
          </div>

          <div
            style={{
              backgroundColor: '#FFFFFF',
              padding: '6px',
              borderRadius: '10px',
              border: '2px solid #01371D',
              display: 'inline-block',
              boxShadow: '2px 2px 0 rgba(0,0,0,0.1)',
            }}
          >
            <QRCodeSVG value={qrValue} size={76} fgColor="#01371D" bgColor="#FFFFFF" level="M" />
          </div>
        </div>

        {/* Column 2: Beach Bag Essentials */}
        <div style={{ textAlign: 'center', borderLeft: '1px dashed rgba(1,55,29,0.2)', borderRight: '1px dashed rgba(1,55,29,0.2)', padding: '0 6px' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#FF007A', letterSpacing: '0.5px' }}>
            ✦ BEACH BAG ✦
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
            {beachBag.map((item, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 800, color: '#01371D' }}>
                <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: Currently Shipping & Barcode */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#FF007A', letterSpacing: '0.5px' }}>
            ✦ CURRENTLY SHIPPING ✦
          </div>
          <div
            style={{
              fontSize: '0.85rem',
              fontWeight: 900,
              color: '#FF007A',
              margin: '4px 0 8px 0',
              lineHeight: 1.2,
              textTransform: 'uppercase',
            }}
          >
            {shipping || 'SECRET PROJECT'}
          </div>

          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#01371D' }}>
            BUILDER ID
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: '0.75rem', color: '#01371D' }}>
            {builderId}
          </div>

          {/* Barcode Graphic */}
          <div
            style={{
              marginTop: '4px',
              display: 'flex',
              justifyContent: 'center',
              gap: '2px',
              height: '24px',
              alignItems: 'center',
            }}
          >
            {[3, 1, 4, 1, 2, 5, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2].map((width, idx) => (
              <div
                key={idx}
                style={{
                  width: `${width * 2}px`,
                  height: '20px',
                  backgroundColor: '#01371D',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Hashtag Ribbon */}
      <div
        style={{
          backgroundColor: '#FF007A',
          color: '#FFE500',
          textAlign: 'center',
          padding: '6px 0',
          fontWeight: 900,
          fontSize: '1rem',
          letterSpacing: '3px',
          borderRadius: '8px',
          border: '2px solid #01371D',
          boxShadow: '0 3px 0 #01371D',
          marginTop: 'auto',
        }}
      >
        ✦ #FRAMEINGOA ✦
      </div>
    </div>
  );
};
