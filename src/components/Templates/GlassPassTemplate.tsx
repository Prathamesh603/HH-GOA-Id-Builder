import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import type { BuilderBadgeData } from '../../types';

interface GlassPassTemplateProps {
  data: BuilderBadgeData;
  cardRef?: React.RefObject<HTMLDivElement | null>;
}

/** A pirate-era bounty sheet, keeping the user's own photo as the wanted hero. */
export const GlassPassTemplate: React.FC<GlassPassTemplateProps> = ({ data, cardRef }) => {
  const { fullName, role, builderClass, shipping, builderId, beachBag, socialHandle, avatarUrl, avatarScale, avatarOffsetX, avatarOffsetY, avatarFilter } = data;
  const qrValue = socialHandle.startsWith('http') ? socialHandle : `https://x.com/${socialHandle.replace('@', '')}`;
  const bounty = `${(Math.max(12, (fullName || 'GOA').length) * 3).toLocaleString('en-IN')},000`;
  const ink = '#1e1713';

  return (
    <div ref={cardRef} id="wanted-poster-card" style={{
      width: '540px', minHeight: '840px', position: 'relative', overflow: 'hidden', boxSizing: 'border-box',
      padding: '32px 35px 27px', display: 'flex', flexDirection: 'column', color: ink,
      backgroundColor: '#e8c982', backgroundImage: 'radial-gradient(ellipse at 18% 8%, rgba(255,250,214,.85), transparent 40%), radial-gradient(ellipse at 100% 100%, rgba(105,55,16,.22), transparent 43%), repeating-linear-gradient(92deg, rgba(92,48,15,.06) 0 1px, transparent 1px 5px), repeating-linear-gradient(0deg, rgba(255,250,205,.08) 0 2px, transparent 2px 8px)',
      border: 'none', borderRadius: 0, boxShadow: 'none',
      clipPath: 'polygon(0 1%, 1% 0, 6% .5%, 12% 0, 19% .7%, 26% 0, 34% .5%, 41% 0, 48% .4%, 55% 0, 64% .6%, 72% 0, 80% .7%, 88% 0, 95% .4%, 100% 1%, 99.3% 8%, 100% 15%, 99.2% 23%, 100% 31%, 99.4% 39%, 100% 48%, 99.1% 57%, 100% 66%, 99.3% 75%, 100% 84%, 99.2% 94%, 100% 99%, 94% 99.4%, 88% 100%, 81% 99.3%, 73% 100%, 65% 99.4%, 57% 100%, 50% 99.2%, 43% 100%, 35% 99.4%, 27% 100%, 20% 99.2%, 12% 100%, 5% 99.3%, 0 100%, .6% 92%, 0 84%, .7% 76%, 0 68%, .6% 59%, 0 51%, .7% 43%, 0 35%, .6% 27%, 0 18%, .6% 10%)',
      fontFamily: "'Playfair Display', Georgia, serif",
    }}>
      <div style={{ position: 'absolute', inset: '15px', border: '1px solid rgba(65,36,14,.25)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 17, left: 0, right: 0, height: 7, opacity: .25, background: 'repeating-linear-gradient(90deg, transparent 0 12px, #6e3e16 13px 14px)' }} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', boxShadow: 'inset 0 0 28px rgba(89,45,12,.34), inset 0 0 70px rgba(111,58,16,.18)' }} />
      {/* Straight railway engraving: rails, sleepers and ballast stay physically aligned as one 2D print. */}
      <svg aria-hidden="true" viewBox="0 0 540 840" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, opacity: .26, pointerEvents: 'none' }}>
        <g transform="rotate(-38 270 420)">
          <path d="M205 -220 L335 -220 L335 1060 L205 1060 Z" fill={ink} opacity=".11" />
          <path d="M220 -220 L320 -220 L320 1060 L220 1060 Z" fill="none" stroke={ink} strokeWidth="1.5" opacity=".52" />
          <g stroke={ink} strokeWidth="8" strokeLinecap="square">
            {Array.from({ length: 23 }).map((_, index) => <path key={index} d={`M211 ${-170 + index * 55} H329`} />)}
          </g>
          <g stroke={ink} strokeWidth="6" fill="none">
            <path d="M237 -230 V1070" /><path d="M303 -230 V1070" />
          </g>
          <g stroke="#f4d991" strokeWidth="1.3" opacity=".9">
            <path d="M238 -230 V1070" /><path d="M304 -230 V1070" />
          </g>
          <g fill={ink} opacity=".86">
            {Array.from({ length: 18 }).flatMap((_, index) => [
              <circle key={`${index}-a`} cx="246" cy={-145 + index * 66} r="2.2" />,
              <circle key={`${index}-b`} cx="294" cy={-145 + index * 66} r="2.2" />,
            ])}
          </g>
        </g>
      </svg>
      {/* Flat Konkan coast and railway illustration — deliberately printed, not 3D. */}
      <svg aria-hidden="true" viewBox="0 0 540 155" preserveAspectRatio="none" style={{ position: 'absolute', left: 0, right: 0, bottom: 11, width: '100%', height: 150, zIndex: 0, opacity: .4, pointerEvents: 'none' }}>
        <g fill="none" stroke={ink} strokeWidth="2.4">
          <path d="M0 102 C31 92 56 112 84 102 S137 92 168 102 S218 112 252 101 S304 91 339 102 S396 111 426 100 S485 91 540 102" />
          <path d="M0 115 C31 105 56 125 84 115 S137 105 168 115 S218 125 252 114 S304 104 339 115 S396 124 426 113 S485 104 540 115" strokeWidth="1.5" />
          <path d="M0 128 L540 128 M0 143 L540 143" strokeWidth="3" />
          {Array.from({ length: 17 }).map((_, index) => <path key={index} d={`M${index * 34 - 8} 126 L${index * 34 + 8} 145`} strokeWidth="2" />)}
        </g>
        <g fill={ink}>
          <path d="M43 108 L49 53 L54 108 L51 108 L48 76 L46 108Z" />
          <path d="M49 57 C28 45 17 50 4 58 C23 58 32 63 46 63 M49 57 C63 37 75 37 90 40 C78 48 72 55 55 62 M49 58 C31 31 26 22 26 12 C39 22 48 30 52 53 M50 58 C71 23 83 18 98 20 C86 35 79 46 56 61" />
          <path d="M492 107 L498 48 L503 107 L500 107 L498 70 L495 107Z" />
          <path d="M498 53 C475 40 463 46 449 55 C468 55 479 61 495 59 M498 52 C516 32 530 35 539 40 C527 50 518 56 503 59 M498 52 C482 29 476 18 479 7 C491 22 498 31 501 49" />
          <path d="M224 124 h82 v-18 h-12 v-8 h-44 v8 h-14 v18 h-12Z" />
          <rect x="244" y="102" width="11" height="8" fill="#e8c982" /><rect x="260" y="102" width="11" height="8" fill="#e8c982" /><rect x="276" y="102" width="11" height="8" fill="#e8c982" />
          <circle cx="245" cy="125" r="5" fill="#e8c982" stroke={ink} strokeWidth="3" /><circle cx="288" cy="125" r="5" fill="#e8c982" stroke={ink} strokeWidth="3" />
        </g>
      </svg>

      <header style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '2px', marginBottom: '8px' }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', fontWeight: 900, color: ink, lineHeight: 1 }}>
            HACKER
          </span>
          <span
            style={{
              fontFamily: "'Yatra One', cursive",
              fontSize: '2rem',
              color: '#FF007A',
              textShadow: `2px 2px 0px #FFE500, -1px -1px 0px ${ink}, 1px -1px 0px ${ink}`,
              lineHeight: 1,
              transform: 'rotate(-4deg)',
              display: 'inline-block',
            }}
          >
            गोवा
          </span>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', fontWeight: 900, color: ink, lineHeight: 1 }}>
            HOUSE
          </span>
        </div>
        <h1 style={{ margin: 0, fontSize: '5rem', lineHeight: .78, letterSpacing: '-6px', fontWeight: 900, fontFamily: "'Cinzel', 'Playfair Display', serif" }}>WANTED</h1>
      </header>

      <div style={{ margin: '14px 8px 12px', position: 'relative', zIndex: 1, height: '294px', overflow: 'hidden', background: '#bd773a' }}>
        <img src={avatarUrl} alt={fullName} className={`filter-${avatarFilter}`} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${avatarScale}) translate(${avatarOffsetX}px, ${avatarOffsetY}px)`, transition: 'transform .1s ease-out' }} />
        <div style={{ position: 'absolute', left: 10, bottom: 10, padding: '4px 6px', color: '#f8df9b', background: 'rgba(30,23,19,.82)', fontFamily: "'JetBrains Mono', monospace", fontSize: '.56rem', fontWeight: 800, letterSpacing: '1px' }}>LAST SEEN: MADGAON JN.</div>
        <div style={{ position: 'absolute', right: 11, top: 10, width: 50, height: 50, border: '3px double #f8df9b', color: '#f8df9b', background: 'rgba(30,23,19,.82)', display: 'grid', placeItems: 'center', borderRadius: '50%', font: '900 .64rem/1 Georgia,serif', textAlign: 'center', transform: 'rotate(12deg)' }}>GOA<br/>CREW</div>
      </div>

      <section style={{ position: 'relative', zIndex: 1, marginTop: 3, textAlign: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '28px 1fr 28px', alignItems: 'center' }}>
          <span style={{ fontSize: '3.8rem', lineHeight: .5, transform: 'rotate(180deg)' }}>❧</span>
          <div>
            <div style={{ fontSize: '1.08rem', lineHeight: 1, fontWeight: 900, letterSpacing: '1px' }}>DEAD OR ALIVE</div>
            <div style={{ fontSize: '2.82rem', lineHeight: .95, letterSpacing: '-2px', fontWeight: 900, textTransform: 'uppercase', overflowWrap: 'anywhere' }}>{fullName || 'YOUR NAME'}</div>
          </div>
          <span style={{ fontSize: '3.8rem', lineHeight: .5 }}>❧</span>
        </div>
        <div style={{ fontSize: '2.55rem', lineHeight: 1, fontWeight: 900, letterSpacing: '1px', marginTop: 4 }}>₿ {bounty} —</div>
        <div style={{ margin: '10px 9px 0', padding: '7px 0 6px', borderTop: '1px solid rgba(30,23,19,.72)', borderBottom: '1px solid rgba(30,23,19,.72)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4, fontFamily: "'JetBrains Mono', monospace", textAlign: 'center' }}>
          <div><div style={{ fontSize: '.45rem', letterSpacing: '1px', fontWeight: 800 }}>STATUS</div><div style={{ fontSize: '.63rem', fontWeight: 900 }}>AT LARGE</div></div>
          <div style={{ borderLeft: '1px solid rgba(30,23,19,.45)', borderRight: '1px solid rgba(30,23,19,.45)' }}><div style={{ fontSize: '.45rem', letterSpacing: '1px', fontWeight: 800 }}>ROUTE</div><div style={{ fontSize: '.63rem', fontWeight: 900 }}>MAO → GOA</div></div>
          <div><div style={{ fontSize: '.45rem', letterSpacing: '1px', fontWeight: 800 }}>CREW</div><div style={{ fontSize: '.63rem', fontWeight: 900 }}>HH 2026</div></div>
        </div>
        <div style={{ margin: '11px 20px 0', padding: '9px 12px 10px', border: '2px solid rgba(30,23,19,.72)', background: 'rgba(255,240,181,.27)', fontFamily: "'JetBrains Mono', monospace", textAlign: 'left' }}>
          <div style={{ textAlign: 'center', fontSize: '.61rem', letterSpacing: '2px', fontWeight: 900, paddingBottom: 5, borderBottom: '1px solid rgba(30,23,19,.5)' }}>✦ HACKER HOUSE CREW MANIFEST ✦</div>
          <div style={{ paddingTop: 6, fontSize: '.64rem', lineHeight: 1.7, fontWeight: 800, textTransform: 'uppercase' }}>
            <div><span style={{ display: 'inline-block', width: 82, letterSpacing: '.7px' }}>CHARGES</span> : {shipping || 'BUILDING THE FUTURE'}</div>
            <div><span style={{ display: 'inline-block', width: 82, letterSpacing: '.7px' }}>SPECIALTY</span> : {builderClass} • {role}</div>
            <div><span style={{ display: 'inline-block', width: 82, letterSpacing: '.7px' }}>EQUIPPED</span> : {beachBag.map(item => item.icon).join(' ')} • {builderId}</div>
            <div><span style={{ display: 'inline-block', width: 82, letterSpacing: '.7px' }}>CALLING</span> : BUILD • SHIP • REPEAT AT GOA</div>
          </div>
        </div>
      </section>

      <footer style={{ position: 'relative', zIndex: 1, marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'end', paddingTop: 9 }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '.53rem', fontWeight: 900, letterSpacing: '1px' }}>#FRAMEINGOA • PIRATE CREW</div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <div style={{ padding: 2, background: '#f6df9e' }}><QRCodeSVG value={qrValue} size={39} fgColor={ink} bgColor="#f6df9e" level="M" /></div>
          <div style={{ fontSize: '1.7rem', lineHeight: .9, letterSpacing: '1px', fontWeight: 900 }}>MARINE</div>
        </div>
      </footer>
    </div>
  );
};
