import { useState, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { CardPreview } from './components/CardPreview';
import { EditorPanel } from './components/EditorPanel';
import { HypeWall } from './components/HypeWall';
import { DEFAULT_BADGE, BUILDER_CLASSES, ROLES, BEACH_ITEMS_PRESETS } from './constants/presets';
import type { BuilderBadgeData, CardTemplate } from './types';
import { exportCardAsPng, shareCardToX } from './utils/exportCard';
import { Terminal, Rocket, Palmtree, Heart, TrainFront, Ticket, MapPinned } from 'lucide-react';

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

        {/* Showcase Hype Wall */}
        <div ref={hypeRef} className="w-full flex justify-center">
          <HypeWall onSelectPreset={(preset) => handleUpdateData(preset)} />
        </div>
      </main>

      {/* Big Tech Footer */}
      <footer className="w-full border-b border-white-10 py-8 px-6 text-xs text-white-50">
        <div className="max-w-7xl mx-auto flex flex-col md-flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">HACKER HOUSE GOA 2026</span>
            <span>•</span>
            <span>Made with <Heart className="w-3.5 h-3.5 text-pink inline" /> for Paradise Builders</span>
          </div>

          <div className="flex items-center gap-6 text-white-60">
            <a href="https://hhgoa.com" target="_blank" rel="noopener noreferrer" className="hover-text-yellow">hhgoa.com</a>
            <a href="https://x.com/247pmstudio" target="_blank" rel="noopener noreferrer" className="hover-text-yellow">@247pmstudio</a>
            <span>#FrameInGoa</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
