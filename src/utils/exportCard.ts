import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';

export const exportCardAsPng = async (cardElement: HTMLElement, fileName: string): Promise<boolean> => {
  try {
    // Wait briefly for images/fonts to stabilize
    await new Promise((resolve) => setTimeout(resolve, 150));

    // High resolution render (3x pixel ratio for print crispness)
    const dataUrl = await toPng(cardElement, {
      pixelRatio: 3,
      quality: 0.95,
      cacheBust: true,
      filter: (node) => {
        // Exclude interactive tilt glare overlays from download render
        if (node instanceof HTMLElement && node.classList.contains('card-glare')) {
          return false;
        }
        return true;
      },
    });

    // Create invisible download link
    const link = document.createElement('a');
    link.download = `${fileName.toLowerCase().replace(/\s+/g, '-')}-hhgoa-2026.png`;
    link.href = dataUrl;
    link.click();

    // Celebratory Confetti Burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFE500', '#FF007A', '#024726', '#FFFFFF'],
    });

    return true;
  } catch (error) {
    console.error('Failed to export ID Card PNG:', error);
    alert('Could not render high-res PNG. Please try again.');
    return false;
  }
};
