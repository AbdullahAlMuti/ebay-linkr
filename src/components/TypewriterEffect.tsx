import { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface TypewriterEffectProps {
  words: string[];
  className?: string;
  speed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
  loop?: boolean;
}

export const TypewriterEffect = ({ 
  words, 
  className = '', 
  speed = 100, 
  deleteSpeed = 50, 
  pauseTime = 2000,
  loop = true 
}: TypewriterEffectProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isPaused) return;

    const currentWord = words[currentWordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.substring(0, currentText.length + 1));
        } else {
          // Finished typing, pause then start deleting
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        } else {
          // Finished deleting, move to next word
          setIsDeleting(false);
          if (loop) {
            setCurrentWordIndex((prev) => (prev + 1) % words.length);
          } else {
            setCurrentWordIndex((prev) => Math.min(prev + 1, words.length - 1));
          }
        }
      }
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words, speed, deleteSpeed, pauseTime, loop]);

  // Cursor blinking animation
  useGSAP(() => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }
  }, []);

  // Text reveal animation
  useGSAP(() => {
    if (textRef.current) {
      gsap.fromTo(textRef.current, 
        { 
          opacity: 0,
          y: 20,
          scale: 0.95
        },
        { 
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        }
      );
    }
  }, [currentText]);

  return (
    <span className={`inline-block ${className}`}>
      <span ref={textRef} className="inline-block">
        {currentText}
      </span>
      <span 
        ref={cursorRef}
        className="inline-block w-0.5 h-[1em] bg-current ml-1 animate-pulse"
        style={{ animation: 'none' }}
      />
    </span>
  );
};
