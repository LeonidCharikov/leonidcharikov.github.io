import {Layers} from 'lucide-react';
import {useEffect, useRef, useState} from 'react';

interface MediaFrameProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  poster?: string;
  className?: string;
  imgClassName?: string;
  isPaused?: boolean;
  controls?: boolean;
  lazyPlayOnView?: boolean;
}

const VIDEO_SRC_REGEX = /\.(webm|mp4|ogg)(\?.*)?$/i;

export function MediaFrame({
  src,
  alt,
  fallbackTitle,
  poster,
  className = '',
  imgClassName = '',
  isPaused = false,
  controls = false,
  lazyPlayOnView = false,
}: MediaFrameProps) {
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(!lazyPlayOnView);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideo = VIDEO_SRC_REGEX.test(src);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  useEffect(() => {
    if (!isVideo || !lazyPlayOnView) {
      setIsInView(true);
      return;
    }

    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setIsInView(entry.isIntersecting);
        }
      },
      {threshold: 0.25, rootMargin: '40px 0px'},
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isVideo, lazyPlayOnView]);

  useEffect(() => {
    if (!isVideo || !videoRef.current) {
      return;
    }
    const videoEl = videoRef.current;
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isPaused || !isInView || (lazyPlayOnView && prefersReducedMotion)) {
      videoEl.pause();
    } else {
      const playPromise = videoEl.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          // Ignore autoplay interruption when switching views or before user gesture
        });
      }
    }
  }, [isInView, isPaused, isVideo, lazyPlayOnView, src]);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-3 bg-[#101422] border border-white/[0.06] text-[#8B95B0] p-8 text-center ${className}`}
      >
        <Layers className="w-7 h-7 text-[#8B95B0]" aria-hidden="true" />
        <span className="text-sm font-medium text-[#F8FAFC]">{fallbackTitle}</span>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`overflow-hidden bg-[#0A0D16] border border-white/[0.06] ${className}`}>
      {isVideo ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          aria-label={alt}
          autoPlay={!lazyPlayOnView && !isPaused}
          loop
          muted
          playsInline
          controls={controls}
          preload={lazyPlayOnView ? 'none' : 'metadata'}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover ${imgClassName}`}
        />
      ) : (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover ${imgClassName}`}
        />
      )}
    </div>
  );
}
