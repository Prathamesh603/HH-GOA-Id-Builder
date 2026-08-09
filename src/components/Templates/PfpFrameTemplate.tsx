import React from 'react';
import type { BuilderBadgeData } from '../../types';

interface PfpFrameTemplateProps {
  data: BuilderBadgeData;
  cardRef?: React.RefObject<HTMLDivElement | null>;
}

export const PfpFrameTemplate: React.FC<PfpFrameTemplateProps> = ({ data, cardRef }) => {
  const {
    fullName,
    role,
    builderClass,
    builderId,
    avatarUrl,
    avatarScale,
    avatarOffsetX,
    avatarOffsetY,
    avatarFilter,
  } = data;

  return (
    <div
      ref={cardRef}
      id="pfp-frame-card"
      style={{
        width: '540px',
        height: '540px',
        backgroundColor: '#011E10',
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: "'Outfit', sans-serif",
        boxSizing: 'border-box',
        boxShadow: '0 25px 65px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* 1. Main Background User Image (Interactive) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          backgroundColor: '#01150B',
          overflow: 'hidden',
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
            transition: 'transform 0.15s ease-out',
          }}
        />
      </div>

      {/* 2. Glassy Neon Outer Border Frame */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          border: '14px solid transparent',
          borderImage: 'linear-gradient(135deg, #FFE500 0%, #FF007A 50%, #00FFCC 100%) 1',
          zIndex: 10,
          pointerEvents: 'none',
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.6)',
        }}
      />

      {/* Inner thin black overlay frame for neon contrast */}
      <div
        style={{
          position: 'absolute',
          inset: '14px',
          border: '2px solid rgba(0, 0, 0, 0.8)',
          zIndex: 11,
          pointerEvents: 'none',
        }}
      />

      {/* 3. Top Branding Ribbon */}
      <div
        style={{
          position: 'absolute',
          top: '24px',
          left: '24px',
          right: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 15,
          pointerEvents: 'none',
        }}
      >
        {/* Event Label Stamp */}
        <div
          style={{
            backgroundColor: 'rgba(1, 30, 16, 0.85)',
            backdropFilter: 'blur(8px)',
            border: '1.5px solid #FFE500',
            borderRadius: '8px',
            padding: '4px 10px',
            color: '#FFE500',
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 800,
            fontSize: '9px',
            letterSpacing: '1.5px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          }}
        >
          🌴 HH GOA 2026
        </div>

        {/* Date Stamp */}
        <div
          style={{
            backgroundColor: 'rgba(255, 0, 122, 0.9)',
            border: '1.5px solid #FFFFFF',
            borderRadius: '8px',
            padding: '4px 10px',
            color: '#FFFFFF',
            fontWeight: 800,
            fontSize: '9px',
            letterSpacing: '1px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          }}
        >
          OCT 28–31
        </div>
      </div>

      {/* 4. Center-Right Floating Stamp: "BUILDER" */}
      <div
        style={{
          position: 'absolute',
          right: '28px',
          top: '80px',
          backgroundColor: '#00FFCC',
          color: '#012b17',
          border: '2px solid #012b17',
          padding: '6px 12px',
          borderRadius: '10px',
          fontWeight: 900,
          fontSize: '11px',
          letterSpacing: '1px',
          textAlign: 'center',
          boxShadow: '3px 3px 0 #012b17',
          transform: 'rotate(8deg)',
          zIndex: 15,
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        ⚡ {builderClass.replace(' BUILDER', '').replace(' ENGINEER', '')}
      </div>

      {/* 5. Left Circular Stamp: "ARRIVALS" */}
      <div
        style={{
          position: 'absolute',
          left: '26px',
          bottom: '120px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: 'rgba(1, 30, 16, 0.8)',
          backdropFilter: 'blur(8px)',
          border: '2px dashed #FFE500',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          transform: 'rotate(-10deg)',
          zIndex: 15,
          color: '#FFE500',
        }}
      >
        <span style={{ fontSize: '7px', fontWeight: 900, letterSpacing: '0.5px' }}>GOA</span>
        <span style={{ fontSize: '10px', margin: '-1px 0' }}>🏝️</span>
        <span style={{ fontSize: '6px', fontWeight: 700 }}>2.47 PM</span>
      </div>

      {/* 6. Bottom Banner Plate with Branding & Personalization */}
      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '24px',
          right: '24px',
          backgroundColor: 'rgba(1, 30, 16, 0.9)',
          backdropFilter: 'blur(12px)',
          border: '2.5px solid #FFE500',
          borderRadius: '16px',
          padding: '12px 16px',
          zIndex: 20,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
        }}
      >
        {/* Name and Dev Title */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontSize: '15px',
                fontWeight: 950,
                color: '#FFFFFF',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              {fullName || 'YOUR NAME'}
            </span>
            <span
              style={{
                fontSize: '9px',
                fontWeight: 700,
                color: '#00FFCC',
                letterSpacing: '0.5px',
                marginTop: '1px',
                textTransform: 'uppercase',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {role}
            </span>
          </div>

          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              fontWeight: 800,
              color: '#FFE500',
              backgroundColor: 'rgba(0,0,0,0.3)',
              padding: '2px 8px',
              borderRadius: '6px',
              border: '1px solid rgba(255,229,0,0.3)',
            }}
          >
            {builderId}
          </div>
        </div>

        {/* Separator */}
        <div style={{ height: '1.5px', backgroundColor: 'rgba(255,255,255,0.15)' }} />

        {/* Event Logo Text & Hashtag */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '2px' }}>
          {/* Main Title: HACKER गोवा HOUSE */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: '12px', color: '#FFFFFF', letterSpacing: '-0.5px' }}>
              HACKER
            </span>
            <span
              style={{
                fontFamily: "'Yatra One', cursive",
                fontSize: '11px',
                color: '#FF007A',
                transform: 'rotate(-4deg)',
                display: 'inline-block',
                textShadow: '1px 1px 0px #FFE500',
              }}
            >
              गोवा
            </span>
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: '12px', color: '#FFFFFF', letterSpacing: '-0.5px' }}>
              HOUSE
            </span>
          </div>

          {/* Hashtag Sticker */}
          <div
            style={{
              backgroundColor: '#FF007A',
              color: '#FFE500',
              fontWeight: 900,
              fontSize: '10px',
              fontFamily: "'JetBrains Mono', monospace",
              padding: '3px 8px',
              borderRadius: '6px',
              boxShadow: '0 2px 8px rgba(255,0,122,0.3)',
              letterSpacing: '1px',
            }}
          >
            #FRAMEINGOA
          </div>
        </div>
      </div>
    </div>
  );
};
