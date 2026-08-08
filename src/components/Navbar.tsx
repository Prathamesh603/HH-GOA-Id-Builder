import React from 'react';
import { Sparkles, Calendar, MapPin, ExternalLink, TrendingUp } from 'lucide-react';

interface NavbarProps {
  onScrollToEditor: () => void;
  onScrollToHype: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollToEditor, onScrollToHype }) => {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        width: '100%',
        background: 'rgba(2,43,25,0.92)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.12)',
        padding: '12px 24px',
      }}
    >
      <div style={{ maxWidth: '80rem', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Brand Logo */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          onClick={onScrollToEditor}
        >
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900,
            color: '#0B1D14',
            fontSize: '16px',
            background: 'linear-gradient(135deg, #FFE500, #FF007A)',
            border: '1px solid rgba(255,255,255,0.2)',
            flexShrink: 0,
          }}>
            HH
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: '20px', color: '#ffffff' }}>
                HACKER
              </span>
              <span style={{ fontFamily: "'Yatra One', cursive", fontSize: '20px', color: '#FF007A', transform: 'rotate(-3deg)', display: 'inline-block' }}>
                गोवा
              </span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: '20px', color: '#ffffff' }}>
                HOUSE
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', color: '#FFE500' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <MapPin style={{ width: '12px', height: '12px', color: '#FF007A' }} /> GOA, INDIA
              </span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar style={{ width: '12px', height: '12px' }} /> 28–31 OCT 2026
              </span>
            </div>
          </div>
        </div>

        {/* Nav Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>

          {/* Check Hype button — now clearly styled */}
          <button
            onClick={onScrollToHype}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              backgroundColor: 'rgba(255,255,255,0.12)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '12px',
              fontFamily: 'Outfit, sans-serif',
              borderRadius: '10px',
              cursor: 'pointer',
              border: '1.5px solid rgba(255,255,255,0.3)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,229,0,0.15)';
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#FFE500';
              (e.currentTarget as HTMLButtonElement).style.color = '#FFE500';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.12)';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.3)';
              (e.currentTarget as HTMLButtonElement).style.color = '#ffffff';
            }}
          >
            <TrendingUp style={{ width: '14px', height: '14px' }} />
            <span>Check Hype</span>
          </button>

          {/* hhgoa.com link */}
          <a
            href="https://hhgoa.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '12px',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.7)',
              textDecoration: 'none',
              fontFamily: 'Outfit, sans-serif',
            }}
          >
            <span>hhgoa.com</span>
            <ExternalLink style={{ width: '12px', height: '12px' }} />
          </a>

          {/* Create Badge CTA */}
          <button
            onClick={onScrollToEditor}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              backgroundColor: '#FFE500',
              color: '#0B1D14',
              fontWeight: 800,
              fontSize: '12px',
              fontFamily: 'Outfit, sans-serif',
              borderRadius: '10px',
              cursor: 'pointer',
              border: '2px solid #FFE500',
              boxShadow: '0 4px 12px rgba(255,229,0,0.35)',
              transition: 'all 0.2s ease',
            }}
          >
            <Sparkles style={{ width: '14px', height: '14px' }} />
            <span>Create Badge</span>
          </button>
        </div>
      </div>
    </header>
  );
};
