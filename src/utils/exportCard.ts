import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';

const renderCardAsPng = async (cardElement: HTMLElement): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, 150));
  return toPng(cardElement, {
    pixelRatio: 3,
    quality: 0.95,
    cacheBust: true,
    filter: (node) => !(node instanceof HTMLElement && node.classList.contains('card-glare')),
  });
};

const downloadDataUrl = (dataUrl: string, fileName: string) => {
  const link = document.createElement('a');
  link.download = `${fileName.toLowerCase().replace(/\s+/g, '-')}-hhgoa-2026.png`;
  link.href = dataUrl;
  link.click();
};

export const exportCardAsPng = async (cardElement: HTMLElement, fileName: string): Promise<boolean> => {
  try {
    downloadDataUrl(await renderCardAsPng(cardElement), fileName);

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

export const shareCardToX = async (cardElement: HTMLElement, fileName: string, postText: string): Promise<boolean> => {
  try {
    const dataUrl = await renderCardAsPng(cardElement);
    
    // Directly download the card and open X/Twitter compose page
    downloadDataUrl(dataUrl, fileName);
    window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(postText)}`, '_blank', 'noopener,noreferrer');

    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 }, colors: ['#FFE500', '#FF007A', '#036737', '#FFFFFF'] });
    return true;
  } catch (error) {
    console.error('Failed to share card PNG:', error);
    alert('Could not prepare your card for sharing. Please try again.');
    return false;
  }
};
