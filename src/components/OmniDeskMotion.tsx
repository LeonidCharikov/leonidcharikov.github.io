import {motion, useReducedMotion, useScroll, useSpring, useTransform} from 'motion/react';
import {type ReactNode, useRef} from 'react';

export const INDUSTRIAL_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const VIEWPORT_CONFIG = {
  once: true,
  amount: 'some' as const,
};

interface ScrollProgressBarProps {
  topClass?: string;
  barClass?: string;
}

export function ScrollProgressBar({
  topClass = 'top-14',
  barClass = 'bg-gradient-to-r from-[#5B4EFF] via-[#6D61FF] to-[#10B981]',
}: ScrollProgressBarProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const {scrollYProgress} = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    restDelta: 0.001,
  });

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      style={{scaleX}}
      className={`fixed ${topClass} left-0 right-0 h-[2px] ${barClass} origin-left z-50 pointer-events-none`}
    />
  );
}

interface RevealTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  delay?: number;
  immediate?: boolean;
}

export function RevealText({
  text,
  as = 'h2',
  className = '',
  delay = 0,
  immediate = false,
}: RevealTextProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const words = text.split(' ');

  const Tag = as;

  if (shouldReduceMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden align-bottom py-[0.06em] -my-[0.06em]"
        >
          <motion.span
            className="inline-block will-change-transform"
            initial={{y: '105%', opacity: 0}}
            animate={immediate ? {y: '0%', opacity: 1} : undefined}
            whileInView={immediate ? undefined : {y: '0%', opacity: 1}}
            viewport={immediate ? undefined : VIEWPORT_CONFIG}
            transition={{
              duration: 0.52,
              delay: delay + Math.min(index * 0.04, 0.36),
              ease: INDUSTRIAL_EASE,
            }}
          >
            {word}
            {index < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  scale?: number;
  immediate?: boolean;
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
  direction = 'up',
  distance = 22,
  scale = 1,
  immediate = false,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const offset = {
    x: direction === 'left' ? -distance : direction === 'right' ? distance : 0,
    y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
  };

  return (
    <motion.div
      className={className}
      initial={{opacity: 0, x: offset.x, y: offset.y, scale}}
      animate={immediate ? {opacity: 1, x: 0, y: 0, scale: 1} : undefined}
      whileInView={immediate ? undefined : {opacity: 1, x: 0, y: 0, scale: 1}}
      viewport={immediate ? undefined : VIEWPORT_CONFIG}
      transition={{
        duration,
        delay,
        ease: INDUSTRIAL_EASE,
      }}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxLayerProps {
  children: ReactNode;
  className?: string;
  offset?: number;
}

export function ParallaxLayer({children, className = '', offset = 24}: ParallaxLayerProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{y}} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
