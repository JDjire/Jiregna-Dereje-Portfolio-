import { useEffect, useState } from 'react';
import { siteConfig } from '../../config/site';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function TypingText() {
  const texts = siteConfig.typingPhrases;
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState('');

  useEffect(() => {
    if (reduced) {
      setDisplay(texts[0]);
      return;
    }

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer;

    const run = () => {
      const current = texts[phraseIndex];

      if (!deleting) {
        setDisplay(current.slice(0, charIndex));
        if (charIndex < current.length) {
          charIndex += 1;
          timer = setTimeout(run, 70);
        } else {
          deleting = true;
          timer = setTimeout(run, 2200);
        }
      } else {
        setDisplay(current.slice(0, charIndex));
        if (charIndex > 0) {
          charIndex -= 1;
          timer = setTimeout(run, 35);
        } else {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % texts.length;
          timer = setTimeout(run, 450);
        }
      }
    };

    timer = setTimeout(run, 500);
    return () => clearTimeout(timer);
  }, [reduced, texts]);

  return (
    <p
      className="font-mono text-label-mono sm:text-body-lg text-on-surface-variant typing-cursor w-full max-w-[min(100%,42rem)] mx-auto px-1 break-words text-center leading-relaxed"
      aria-live="polite"
    >
      {display}
    </p>
  );
}
