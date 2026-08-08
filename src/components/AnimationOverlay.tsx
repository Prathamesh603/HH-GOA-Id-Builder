import React, { useState, useEffect, useRef } from 'react';
import { X, Film } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AnimationOverlayProps {
  cardImage: string;
  initialRect: DOMRect | null;
  onClose: () => void;
  fileName: string;
}

interface Spark {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export const AnimationOverlay: React.FC<AnimationOverlayProps> = ({
  cardImage,
  initialRect,
  onClose,
  fileName,
}) => {
  const [isIntroDone, setIsIntroDone] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordProgress, setRecordProgress] = useState(0);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Disable body scrolling & handle intro anim timer & sparks
  useEffect(() => {
    // Disable body scrolling while overlay is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const list: Spark[] = [];
    for (let i = 0; i < 40; i++) {
      list.push({
        id: i,
        x: Math.random() * 100,
        y: 80 + Math.random() * 20,
        size: 2 + Math.random() * 5,
        duration: 4 + Math.random() * 6,
        delay: Math.random() * -10, // negative delay for pre-warmed distribution
      });
    }
    setSparks(list);

    // End intro animation after 0.8 seconds
    const timer = setTimeout(() => {
      setIsIntroDone(true);
    }, 800);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Determine standard browser video recorder compatibility
  const getSupportedMimeType = (): { type: string; ext: string } => {
    const types = [
      { type: 'video/webm;codecs=vp9', ext: 'webm' },
      { type: 'video/webm;codecs=vp8', ext: 'webm' },
      { type: 'video/webm', ext: 'webm' },
      { type: 'video/mp4', ext: 'mp4' },
    ];
    for (const t of types) {
      if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(t.type)) {
        return t;
      }
    }
    return { type: 'video/webm', ext: 'webm' };
  };

  // Perform canvas-based high-definition 3D video recording
  const handleExportVideo = async () => {
    if (isRecording) return;
    setIsRecording(true);
    setRecordProgress(0);

    const canvas = document.createElement('canvas');
    // HD vertical format 720x1280 (perfect for social sharing)
    canvas.width = 720;
    canvas.height = 1280;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setIsRecording(false);
      return;
    }

    const { type: mimeType, ext: fileExt } = getSupportedMimeType();

    // Prepare recorded stream
    const fps = 30;
    const durationSeconds = 5;
    const totalFrames = durationSeconds * fps;
    const stream = canvas.captureStream(fps);
    const mediaRecorder = new MediaRecorder(stream, { mimeType });
    const chunks: Blob[] = [];

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${fileName.toLowerCase().replace(/\s+/g, '-')}-animation.${fileExt}`;
      link.click();
      
      setIsRecording(false);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FFE500', '#FF007A', '#036737', '#FFFFFF'],
      });
    };

    // Load the captured badge image
    const cardImg = new Image();
    cardImg.src = cardImage;
    await new Promise((resolve) => {
      cardImg.onload = resolve;
    });

    mediaRecorder.start();

    // Create array of sparks specifically for the video export
    const videoSparks = Array.from({ length: 30 }).map(() => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 100,
      size: 3 + Math.random() * 6,
      speedY: 2 + Math.random() * 4,
      speedX: -1 + Math.random() * 2,
      opacity: 0.3 + Math.random() * 0.7,
    }));

    let currentFrame = 0;

    const renderFrame = () => {
      if (currentFrame >= totalFrames) {
        mediaRecorder.stop();
        return;
      }

      // Update progress
      setRecordProgress(Math.round((currentFrame / totalFrames) * 100));

      // 1. Draw Background Vignette Gradient
      ctx.fillStyle = '#011c0f';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Ambient Blurry Green Spotlight Background
      const pulseFactor = Math.sin((currentFrame / totalFrames) * Math.PI * 2);
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        50,
        canvas.width / 2,
        canvas.height / 2,
        650
      );
      gradient.addColorStop(0, `rgba(8, 121, 70, ${0.7 + pulseFactor * 0.1})`);  // bright center green
      gradient.addColorStop(0.5, 'rgba(3, 103, 55, 0.4)');                     // soft mid green
      gradient.addColorStop(1, 'rgba(1, 28, 15, 0.98)');                        // dark vignette edge
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Draw Rising Sparks (behind card)
      videoSparks.forEach((spark) => {
        spark.y -= spark.speedY;
        spark.x += spark.speedX + Math.sin(currentFrame / 8 + spark.size) * 0.5;

        // Reset if goes off top
        if (spark.y < -10) {
          spark.y = canvas.height + Math.random() * 50;
          spark.x = Math.random() * canvas.width;
        }

        ctx.fillStyle = `rgba(255, 180 + Math.random() * 75, 0, ${spark.opacity})`;
        ctx.shadowColor = '#FFE500';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0; // reset shadow

      // 3. Draw Rotating Card with Perspective & Lighting
      const angle = (currentFrame / totalFrames) * Math.PI * 2; // complete 360 rotation
      const cosAngle = Math.cos(angle);
      
      // Calculate 3D perspective rotation (X and Y axis)
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      
      // Horizontal scale represents 3D Y-rotation
      ctx.scale(cosAngle, 1);
      
      // Skew represents X-tilt simulation
      const skew = Math.sin(angle * 2) * 0.06;
      ctx.transform(1, skew, 0, 1, 0, 0);

      // Card shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      ctx.shadowBlur = 50;
      ctx.shadowOffsetX = -cosAngle * 15;
      ctx.shadowOffsetY = 30;

      const cardW = 440;
      const cardH = 684;

      if (cosAngle < 0) {
        // Draw reverse side of card (Wanted poster paper texture)
        ctx.fillStyle = '#bd773a';
        ctx.fillRect(-cardW / 2, -cardH / 2, cardW, cardH);
        
        ctx.strokeStyle = '#1e1713';
        ctx.lineWidth = 6;
        ctx.strokeRect(-cardW / 2 + 12, -cardH / 2 + 12, cardW - 24, cardH - 24);

        ctx.fillStyle = 'rgba(30, 23, 19, 0.85)';
        ctx.font = "900 36px 'Playfair Display', serif";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('HACKER HOUSE GOA', 0, -20);
        ctx.font = "800 20px 'JetBrains Mono', monospace";
        ctx.fillText('• 2026 •', 0, 30);
      } else {
        // Draw card front
        ctx.drawImage(cardImg, -cardW / 2, -cardH / 2, cardW, cardH);

        // Clip to card boundaries for the gloss/shimmer shine sweep overlay
        ctx.beginPath();
        ctx.rect(-cardW / 2, -cardH / 2, cardW, cardH);
        ctx.clip();

        // Shimmer gradient sweep
        const sweepProgress = (currentFrame % (totalFrames / 2)) / (totalFrames / 2); // sweeps twice
        const gradientX = -cardW + (sweepProgress * cardW * 2.5);
        const shimmer = ctx.createLinearGradient(
          gradientX,
          -cardH / 2,
          gradientX + 160,
          cardH / 2
        );
        shimmer.addColorStop(0, 'rgba(255, 255, 255, 0)');
        shimmer.addColorStop(0.5, 'rgba(255, 255, 255, 0.35)');
        shimmer.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = shimmer;
        ctx.fillRect(-cardW / 2, -cardH / 2, cardW, cardH);
      }

      ctx.restore();
      currentFrame++;
      
      // Delay next frame to match standard FPS timing
      setTimeout(renderFrame, 1000 / fps);
    };

    renderFrame();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isRecording) return;
    const target = e.target as HTMLElement;
    if (
      target.closest('.showcase-card-wrapper') ||
      target.closest('.controls-panel') ||
      target.closest('.close-animation-btn')
    ) {
      return;
    }
    onClose();
  };

  return (
    <div
      ref={containerRef}
      onClick={handleBackdropClick}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#011c0f',
        overflow: 'hidden',
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {/* Central radial green glow – always visible background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 50%, rgba(8,121,70,0.72) 0%, rgba(3,103,55,0.45) 35%, rgba(1,28,15,0.98) 75%)',
      }} />
      {/* ambient pulsing spotlights */}
      <div className="ambient-spotlight color-green" />
      <div className="ambient-spotlight color-green2" />

      {/* Floating bonfire sparks */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        {sparks.map((spark) => (
          <div
            key={spark.id}
            style={{
              position: 'absolute',
              bottom: '0px',
              left: `${spark.x}%`,
              width: `${spark.size}px`,
              height: `${spark.size}px`,
              backgroundColor: '#FFE500',
              boxShadow: '0 0 10px #FFE500, 0 0 20px #087946',
              borderRadius: '50%',
              opacity: 0.8,
              animation: `riseSpark ${spark.duration}s infinite linear`,
              animationDelay: `${spark.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        disabled={isRecording}
        style={{
          position: 'absolute',
          top: '24px',
          right: '24px',
          padding: '10px 20px',
          borderRadius: '24px',
          backgroundColor: 'rgba(255,255,255,0.08)',
          border: '1.5px solid rgba(255,255,255,0.2)',
          color: '#FFFFFF',
          cursor: isRecording ? 'not-allowed' : 'pointer',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px',
          fontWeight: 700,
          transition: 'all 0.2s ease',
        }}
        className="close-animation-btn"
      >
        <X style={{ width: '18px', height: '18px' }} />
        <span>Back to Editor</span>
      </button>

      {/* Rotating 3D card showcase */}
      <div
        style={{
          perspective: '1500px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '52vh',
          zIndex: 5,
        }}
      >
        <div
          style={{
            width: 'min(310px, 72vw)',
            aspectRatio: '540/840',
            transformStyle: 'preserve-3d',
            zIndex: 100,
          }}
          className={`showcase-card-wrapper ${isIntroDone ? 'continuous' : 'intro'}`}
        >
          {/* Card Surface containing high-res rendering */}
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundImage: `url(${cardImage})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              borderRadius: '20px',
              boxShadow: '0 30px 80px rgba(0,0,0,0.8), 0 0 40px rgba(8,121,70,0.35), 0 0 15px rgba(255,229,0,0.08)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Glossy overlay sheen sweep */}
            <div className="glass-shine-sweep" />
          </div>
        </div>
      </div>

      {/* Info panel & trigger controls */}
      <div
        className="controls-panel"
        style={{
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          marginTop: '20px',
          maxWidth: '450px',
          width: '90%',
          textAlign: 'center',
        }}
      >
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#FFFFFF', margin: 0, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            Hacker House Goa Showdown
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginTop: '4px' }}>
            Watch your official badge loop in a 3D cinematic showcase. Export it as an HD story video ready to upload.
          </p>
        </div>

        {/* Video recording action state */}
        <div style={{ width: '100%' }}>
          {isRecording ? (
            <div
              style={{
                width: '100%',
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1.5px solid rgba(255,255,255,0.1)',
                padding: '16px 20px',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#FFE500', fontWeight: 700, fontSize: '0.85rem' }}>
                <Film className="animate-spin-slow" style={{ width: '18px', height: '18px' }} />
                <span>Generating High-Definition Video ({recordProgress}%)</span>
              </div>
              <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${recordProgress}%`,
                    backgroundColor: '#FF007A',
                    boxShadow: '0 0 10px #FF007A',
                    transition: 'width 0.1s ease',
                  }}
                />
              </div>
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>
                Keep this page open. We are recording a 360° spin at 30 FPS.
              </span>
            </div>
          ) : (
            <button
              onClick={handleExportVideo}
              style={{
                width: '100%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '16px 32px',
                backgroundColor: '#FFE500',
                color: '#0B1D14',
                fontWeight: 900,
                fontSize: '15px',
                borderRadius: '14px',
                cursor: 'pointer',
                border: '2px solid #FFE500',
                boxShadow: '0 10px 25px rgba(255, 229, 0, 0.35)',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="export-video-btn"
            >
              <Film style={{ width: '20px', height: '20px' }} />
              <span>Download 3D Animation Video</span>
            </button>
          )}
        </div>
      </div>

      {/* Embedded CSS animation helpers */}
      <style>{`
        .ambient-spotlight {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.5;
          pointer-events: none;
          z-index: 0;
          animation: floatSpotlight 12s infinite ease-in-out;
        }
        .ambient-spotlight.color-green {
          top: -150px;
          left: -150px;
          background-color: #087946;
          animation-delay: 0s;
        }
        .ambient-spotlight.color-green2 {
          bottom: -150px;
          right: -150px;
          background-color: #169256;
          animation-delay: -6s;
        }
        @keyframes floatSpotlight {
          0%, 100% { transform: scale(1) translate(0, 0); }
          50% { transform: scale(1.3) translate(60px, 40px); }
        }
        @keyframes riseSpark {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0.8;
          }
          50% {
            opacity: 1;
            transform: translateY(-50vh) translateX(30px) scale(1.2);
          }
          100% {
            transform: translateY(-105vh) translateX(-20px) scale(0.3);
            opacity: 0;
          }
        }
        .showcase-card-wrapper.intro {
          animation: modalIntro 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .showcase-card-wrapper.continuous {
          animation: rotate3D 8s infinite ease-in-out;
        }
        @keyframes modalIntro {
          0% {
            opacity: 0;
            transform: scale(0.6) rotateX(15deg) rotateY(-15deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotateX(0deg) rotateY(0deg);
          }
        }
        @keyframes rotate3D {
          0% { transform: rotateY(-18deg) rotateX(6deg); }
          50% { transform: rotateY(18deg) rotateX(-6deg); }
          100% { transform: rotateY(-18deg) rotateX(6deg); }
        }
        .animate-spin-slow {
          animation: spin 3s infinite linear;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .glass-shine-sweep {
          position: absolute;
          top: 0;
          left: -150%;
          width: 100%;
          height: 100%;
          background: linear-gradient(125deg, transparent 35%, rgba(255, 255, 255, 0.45) 50%, transparent 65%);
          background-size: 200% 200%;
          animation: glassShine 4.5s infinite linear;
        }
        @keyframes glassShine {
          0% { left: -150%; }
          100% { left: 150%; }
        }
        .export-video-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(255, 229, 0, 0.5);
        }
        .export-video-btn:active {
          transform: translateY(0);
        }
        .close-animation-btn:hover {
          background-color: rgba(255,255,255,0.15);
          border-color: rgba(255,255,255,0.35);
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};
