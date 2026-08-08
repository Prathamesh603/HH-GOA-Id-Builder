import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import type { BuilderBadgeData } from '../../types';

interface TrainExpressTemplateProps {
  data: BuilderBadgeData;
  cardRef?: React.RefObject<HTMLDivElement | null>;
}

export const TrainExpressTemplate: React.FC<TrainExpressTemplateProps> = ({ data, cardRef }) => {
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
      id="train-express-card"
      style={{
        width: '540px',
        minHeight: '840px',
        backgroundColor: '#FFFBEB',
        backgroundImage: `
          radial-gradient(circle at 10% 10%, rgba(234, 179, 8, 0.15) 0%, transparent 40%),
          radial-gradient(circle at 90% 90%, rgba(153, 27, 27, 0.1) 0%, transparent 40%)
        `,
        color: '#1C1917',
        borderRadius: '28px',
        border: '8px solid #991B1B',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.45)',
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
      {/* Ticket Cutout Notches on Sides */}
      <div
        style={{
          position: 'absolute',
          left: '-16px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '32px',
          height: '32px',
          backgroundColor: '#001f10',
          borderRadius: '50%',
          border: '3px solid #991B1B',
          zIndex: 10,
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: '-16px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '32px',
          height: '32px',
          backgroundColor: '#001f10',
          borderRadius: '50%',
          border: '3px solid #991B1B',
          zIndex: 10,
        }}
      />

      {/* Dashed Ticket Stub Separator Line */}
      <div
        style={{
          position: 'absolute',
          left: '20px',
          right: '20px',
          top: '50%',
          borderTop: '3px dashed #991B1B',
          pointerEvents: 'none',
          opacity: 0.3,
        }}
      />

      {/* Top Header: Indian Railways Konkan Express Branding */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#991B1B',
            color: '#FEF08A',
            padding: '4px 12px',
            borderRadius: '8px',
            fontSize: '0.7rem',
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 800,
            letterSpacing: '1px',
            marginBottom: '6px',
          }}
        >
          <span>🚂 KONKAN EXPRESS</span>
          <span>INDIAN RAILWAYS PASS</span>
          <span>MAO ➔ GOA</span>
        </div>

        {/* Title Block */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '2px' }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 900, color: '#991B1B', lineHeight: 1 }}>
            HACKER
          </span>
          <span
            style={{
              fontFamily: "'Yatra One', cursive",
              fontSize: '2.2rem',
              color: '#D97706',
              textShadow: '2px 2px 0 #991B1B, -1px -1px 0 #FFFBEB',
              lineHeight: 1,
              transform: 'rotate(-4deg)',
              display: 'inline-block',
            }}
          >
            गोवा
          </span>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 900, color: '#991B1B', lineHeight: 1 }}>
            HOUSE
          </span>
        </div>

        {/* Route Banner */}
        <div
          style={{
            backgroundColor: '#FEF08A',
            color: '#78350F',
            border: '2px solid #D97706',
            borderRadius: '20px',
            padding: '2px 12px',
            fontSize: '0.75rem',
            fontWeight: 900,
            display: 'inline-block',
            marginTop: '4px',
            letterSpacing: '0.5px',
          }}
        >
          🛺 MADGAON JN. ➔ GOA PARADISE • COACH B-4 SEAT 42 🌴
        </div>
      </div>

      {/* Avatar Showcase Container with Rickshaw & Coconut Motif */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '12px 0 6px 0',
          minHeight: '230px',
        }}
      >
        {/* Left Auto-Rickshaw Sticker */}
        <div
          style={{
            position: 'absolute',
            left: '4px',
            bottom: '20px',
            backgroundColor: '#FACC15',
            color: '#1C1917',
            border: '2px solid #78350F',
            padding: '6px 10px',
            borderRadius: '12px',
            fontWeight: 900,
            fontSize: '0.75rem',
            textAlign: 'center',
            boxShadow: '3px 3px 0 #78350F',
            transform: 'rotate(-8deg)',
            zIndex: 10,
          }}
        >
          <div style={{ fontSize: '1.4rem' }}>🛺</div>
          <div>AUTO RICKSHAW</div>
        </div>

        {/* Center Oval Photo Frame with Indian Stamp Rim */}
        <div
          style={{
            position: 'relative',
            width: '210px',
            height: '210px',
            borderRadius: '50%',
            border: '8px solid #FACC15',
            outline: '4px dashed #991B1B',
            boxShadow: '0 12px 30px rgba(153, 27, 27, 0.25)',
            overflow: 'hidden',
            backgroundColor: '#78350F',
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

        {/* Right Train Stamp Sticker */}
        <div
          style={{
            position: 'absolute',
            right: '4px',
            top: '20px',
            backgroundColor: '#991B1B',
            color: '#FEF08A',
            border: '2px solid #FACC15',
            padding: '6px 10px',
            borderRadius: '12px',
            fontWeight: 900,
            fontSize: '0.75rem',
            textAlign: 'center',
            boxShadow: '3px 3px 0 #1C1917',
            transform: 'rotate(10deg)',
            zIndex: 10,
          }}
        >
          <div style={{ fontSize: '1.4rem' }}>🚂</div>
          <div>SUPERFAST</div>
        </div>
      </div>

      {/* Name Banner */}
      <div
        style={{
          backgroundColor: '#991B1B',
          color: '#FFFFFF',
          borderRadius: '16px',
          padding: '8px 16px',
          textAlign: 'center',
          border: '3px solid #FACC15',
          boxShadow: '0 4px 0 #78350F',
          marginBottom: '6px',
          position: 'relative',
          zIndex: 5,
        }}
      >
        <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#FEF08A', letterSpacing: '1.5px' }}>
          PASSENGER / BUILDER NAME
        </div>
        <div
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 900,
            fontSize: '1.65rem',
            letterSpacing: '2px',
            color: '#FFFFFF',
            textTransform: 'uppercase',
          }}
        >
          {fullName || 'YOUR NAME'}
        </div>
      </div>

      {/* Role Pill */}
      <div
        style={{
          backgroundColor: '#FACC15',
          color: '#78350F',
          borderRadius: '10px',
          padding: '4px 12px',
          textAlign: 'center',
          fontWeight: 900,
          fontSize: '0.85rem',
          letterSpacing: '1px',
          border: '2px solid #78350F',
          marginBottom: '10px',
          textTransform: 'uppercase',
        }}
      >
        ⚡ {role} ⚡
      </div>

      {/* Railway Ticket Details Grid (3 Columns) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr 1.1fr',
          gap: '8px',
          alignItems: 'start',
          backgroundColor: 'rgba(254, 240, 138, 0.4)',
          border: '2px solid #D97706',
          borderRadius: '14px',
          padding: '10px',
          marginBottom: '8px',
        }}
      >
        {/* Column 1: Class & PNR */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.6rem', fontWeight: 800, color: '#991B1B', letterSpacing: '0.5px' }}>
            ✦ TICKET CLASS ✦
          </div>
          <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#78350F', margin: '2px 0 6px 0' }}>
            {builderClass}
          </div>

          <div
            style={{
              backgroundColor: '#FFFFFF',
              padding: '4px',
              borderRadius: '8px',
              border: '1.5px solid #991B1B',
              display: 'inline-block',
            }}
          >
            <QRCodeSVG value={qrValue} size={68} fgColor="#991B1B" bgColor="#FFFFFF" level="M" />
          </div>
        </div>

        {/* Column 2: Travel Essentials */}
        <div style={{ textAlign: 'center', borderLeft: '1px dashed rgba(120,53,15,0.2)', borderRight: '1px dashed rgba(120,53,15,0.2)', padding: '0 4px' }}>
          <div style={{ fontSize: '0.6rem', fontWeight: 800, color: '#991B1B', letterSpacing: '0.5px' }}>
            ✦ TRAVEL GEAR ✦
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
            {beachBag.map((item, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', fontWeight: 800, color: '#1C1917' }}>
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: Shipping & PNR Barcode */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.6rem', fontWeight: 800, color: '#991B1B', letterSpacing: '0.5px' }}>
            ✦ SHIPPING PROJECT ✦
          </div>
          <div style={{ fontSize: '0.8rem', fontWeight: 900, color: '#991B1B', margin: '2px 0 6px 0', lineHeight: 1.2 }}>
            {shipping || 'TRAIN HACK'}
          </div>

          <div style={{ fontSize: '0.6rem', fontWeight: 800, color: '#78350F' }}>
            PNR / BUILDER ID
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, fontSize: '0.7rem', color: '#991B1B' }}>
            {builderId}
          </div>

          {/* Barcode Graphic */}
          <div style={{ marginTop: '4px', display: 'flex', justifyContent: 'center', gap: '2px', height: '18px', alignItems: 'center' }}>
            {[3, 1, 4, 1, 2, 5, 1, 3, 2, 1, 4, 2, 1].map((w, idx) => (
              <div key={idx} style={{ width: `${w * 2}px`, height: '16px', backgroundColor: '#991B1B' }} />
            ))}
          </div>
        </div>
      </div>

      {/* Railway Ticket Stub Ribbon */}
      <div
        style={{
          backgroundColor: '#991B1B',
          color: '#FEF08A',
          textAlign: 'center',
          padding: '6px 0',
          fontWeight: 900,
          fontSize: '0.9rem',
          letterSpacing: '2px',
          borderRadius: '8px',
          border: '2px solid #FACC15',
          marginTop: 'auto',
        }}
      >
        ✦ #FRAMEINGOA • KONKAN EXPRESS ✦
      </div>
    </div>
  );
};
