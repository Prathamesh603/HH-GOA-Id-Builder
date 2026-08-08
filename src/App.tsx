import { useState, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { CardPreview } from './components/CardPreview';
import { EditorPanel } from './components/EditorPanel';
import { HypeWall } from './components/HypeWall';
import { DEFAULT_BADGE, BUILDER_CLASSES, ROLES, BEACH_ITEMS_PRESETS } from './constants/presets';
import type { BuilderBadgeData, CardTemplate } from './types';
import { exportCardAsPng, shareCardToX } from './utils/exportCard';
import { Terminal, Rocket, Palmtree, TrainFront, Ticket, MapPinned } from 'lucide-react';

export function App() {
  const [badgeData, setBadgeData] = useState<BuilderBadgeData>(DEFAULT_BADGE);
  const [isExporting, setIsExporting] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const hypeRef = useRef<HTMLDivElement>(null);

  const handleUpdateData = (fields: Partial<BuilderBadgeData>) => {
    setBadgeData((prev) => ({ ...prev, ...fields }));
  };

  const handleUpdateTemplate = (template: CardTemplate) => {
    setBadgeData((prev) => ({ ...prev, template }));
  };

  const handleRandomize = () => {
    const randomClass = BUILDER_CLASSES[Math.floor(Math.random() * BUILDER_CLASSES.length)];
    const randomRole = ROLES[Math.floor(Math.random() * ROLES.length)];
    const shuffledGear = [...BEACH_ITEMS_PRESETS].sort(() => 0.5 - Math.random());
    const randomId = `#HH-GOA-${Math.floor(1000 + Math.random() * 9000)}`;

    setBadgeData((prev) => ({
      ...prev,
      builderClass: randomClass,
      role: randomRole,
      builderId: randomId,
      beachBag: [shuffledGear[0], shuffledGear[1], shuffledGear[2]],
    }));
  };

  const handleExport = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);
    await exportCardAsPng(cardRef.current, badgeData.fullName || 'builder');
    setIsExporting(false);
  };

  const handleShareToX = async () => {
    if (!cardRef.current) return;
    const text =
      `Check out my official Hacker House Goa 2026 ID Badge! 🌴⚡\nBuilding in paradise this Oct 28-31.\n\nCreated with #FrameInGoa via @247pmstudio @hhgoa`
    setIsExporting(true);
    await shareCardToX(cardRef.current, badgeData.fullName || 'builder', text);
    setIsExporting(false);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans site-shell">
      {/* Navigation Bar */}
      <Navbar
        onScrollToEditor={() => editorRef.current?.scrollIntoView({ behavior: 'smooth' })}
        onScrollToHype={() => hypeRef.current?.scrollIntoView({ behavior: 'smooth' })}
      />

      {/* Main Content Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md-px-8 py-8 flex flex-col items-center gap-12 site-main">
        {/* Hero Banner Header */}
        <section className="station-hero">
          <div className="hero-route hero-route-left"><TrainFront /> KONKAN EXPRESS <span>MAO → GOA</span></div>
          <div className="hero-route hero-route-right"><Ticket /> PLATFORM 06 <span>OCT 28–31</span></div>
          <div className="station-sign">
            <span className="station-sign-top">HACKER HOUSE GOA • ARRIVALS</span>
            <h1>HACKER <i>गोवा</i> HOUSE</h1>
            <div className="station-sign-bottom"><MapPinned /> MADGAON JN. &nbsp;•&nbsp; BUILDERS ON BOARD</div>
          </div>
          <p className="station-subtitle">Build in paradise, board the Konkan Express, and frame the legend you’re bringing to Goa.</p>
          <div className="hero-tickets">
            <div className="hero-ticket"><Terminal /> TERMINAL WIZARDS</div>
            <div className="hero-ticket pink"><Rocket /> AI SORCERERS</div>
            <div className="hero-ticket"><Palmtree /> GOA HACKERS</div>
          </div>
          <div className="station-track" aria-hidden="true"><span /><span /><span /></div>
        </section>

        {/* Studio Workspace: Left Editor Controls | Right 3D Badge Preview */}
        <section ref={editorRef} className="w-full flex flex-col lg-flex-row items-center lg-items-start justify-center gap-10 py-6 studio-platform">
          {/* Left Column: Editor Controls */}
          <div className="w-full lg-w-half flex justify-center">
            <EditorPanel
              data={badgeData}
              onChange={handleUpdateData}
              onRandomize={handleRandomize}
            />
          </div>

          {/* Right Column: Interactive 3D Card Preview */}
          <div className="w-full lg-w-half flex justify-center sticky top-24">
            <CardPreview
              data={badgeData}
              onUpdateTemplate={handleUpdateTemplate}
              onExport={handleExport}
              onShare={handleShareToX}
              cardRef={cardRef}
              isExporting={isExporting}
            />
          </div>
        </section>
      </main>

      {/* Showcase Hype Wall — above background image */}
      <div ref={hypeRef} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <HypeWall onSelectPreset={(preset) => handleUpdateData(preset)} />
      </div>

      {/* Full-width Lower Background with Logo + Footer Details */}
      <div
        className="lower-bg-section"
        style={{
          width: '100%',
          height: '700px',
          backgroundImage: 'url(/lower_background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Centered SVG Logo */}
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', marginBottom: '40px' }}>
          <img src="/hacker_house_goa.svg" alt="Hacker House Goa" style={{ width: '320px', height: 'auto', filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.3))' }} />
          <div style={{ marginTop: '16px', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.95rem', color: '#FFE500', letterSpacing: '2px' }}>
            GOA, INDIA &nbsp;•&nbsp; 28 – 31 OCT 2026
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem', color: 'rgba(255,229,0,0.7)', letterSpacing: '1.5px', marginTop: '4px' }}>
            2:47 PM STUDIO
          </div>
        </div>

        {/* Footer Details overlaid */}
        <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '800px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: '0 40px', flexWrap: 'wrap', gap: '24px' }}>
          {/* Left: Social Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a href="https://x.com/247pmstudio" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: '#ffffff', fontSize: '0.95rem', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.5px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFE500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
              @247PMSTUDIO
            </a>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.5px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFE500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" /></svg>
              @TWOFOURTYSEVENPM
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.5px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFE500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
              SATAPATHYPRAVASU@GMAIL.COM
            </div>
          </div>

          {/* Right: Links + Copyright */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.5px' }}>BRAND KIT</div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.5px' }}>TERM & CONDITIONS</div>
            <div style={{ color: '#FFE500', fontSize: '0.9rem', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '1px', marginTop: '8px' }}>
              © 2026 HH-GOA. ALL RIGHTS RESERVED.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
