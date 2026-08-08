import { useState, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { CardPreview } from './components/CardPreview';
import { EditorPanel } from './components/EditorPanel';
import { HypeWall } from './components/HypeWall';
import { DEFAULT_BADGE, BUILDER_CLASSES, ROLES, BEACH_ITEMS_PRESETS } from './constants/presets';
import type { BuilderBadgeData, CardTemplate } from './types';
import { exportCardAsPng } from './utils/exportCard';
import { Sparkles, Terminal, Rocket, Palmtree, Heart } from 'lucide-react';

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

  const handleShareToX = () => {
    const text = encodeURIComponent(
      `Check out my official Hacker House Goa 2026 ID Badge! 🌴⚡\nBuilding in paradise this Oct 28-31.\n\nCreated with #FrameInGoa via @247pmstudio @hhgoa`
    );
    const url = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent('https://hhgoa.com')}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navigation Bar */}
      <Navbar
        onScrollToEditor={() => editorRef.current?.scrollIntoView({ behavior: 'smooth' })}
        onScrollToHype={() => hypeRef.current?.scrollIntoView({ behavior: 'smooth' })}
      />

      {/* Main Content Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md-px-8 py-8 flex flex-col items-center gap-12">
        {/* Hero Banner Header */}
        <section className="text-center max-w-3xl flex flex-col items-center gap-4 py-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-yellow-glow text-yellow text-xs font-bold font-mono tracking-wide animate-float">
            <Sparkles className="w-3.5 h-3.5 text-pink" />
            <span>OFFICIAL BADGE GENERATOR • HH GOA 2026</span>
          </div>

          <h1 className="text-4xl md-text-6xl font-black text-white">
            Build in Paradise. <br />
            <span className="text-gradient">
              Frame Your Legend.
            </span>
          </h1>

          <p className="text-base md-text-lg text-white-70 max-w-2xl">
            Customize and export your high-resolution Hacker House Goa 2026 ID Pass.
            Designed with big-tech aesthetic precision, retro-tropical nostalgia, and live 3D physics.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-xs text-white-50 font-mono mt-2">
            <span className="flex items-center gap-1-5"><Terminal className="w-4 h-4 text-yellow" /> Terminal Wizards</span>
            <span className="flex items-center gap-1-5"><Rocket className="w-4 h-4 text-pink" /> AI Sorcerers</span>
            <span className="flex items-center gap-1-5"><Palmtree className="w-4 h-4 text-emerald-400" /> Goa Hackers</span>
          </div>
        </section>

        {/* Studio Workspace: Left Editor Controls | Right 3D Badge Preview */}
        <section ref={editorRef} className="w-full flex flex-col lg-flex-row items-center lg-items-start justify-center gap-10 py-6">
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
