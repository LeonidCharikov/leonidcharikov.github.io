import {Layers} from 'lucide-react';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';

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
const WEBM_SRC_REGEX = /\.webm(\?.*)?$/i;

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
  const [shouldLoad, setShouldLoad] = useState(!lazyPlayOnView);
  const [isInView, setIsInView] = useState(!lazyPlayOnView);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldPlayRef = useRef(false);

  const isVideo = VIDEO_SRC_REGEX.test(src);
  const mp4FallbackSrc = useMemo(
    () => (WEBM_SRC_REGEX.test(src) ? src.replace(WEBM_SRC_REGEX, '.mp4$1') : null),
    [src],
  );

  useEffect(() => {
    setHasError(false);
  }, [src]);

  // Observe proximity to pre-warm loading & visibility to control playback
  useEffect(() => {
    if (!isVideo || !lazyPlayOnView) {
      setShouldLoad(true);
      setIsInView(true);
      return;
    }

    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      setIsInView(true);
      return;
    }

    const preloadObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoad(true);
          preloadObserver.disconnect();
        }
      },
      {rootMargin: '280px 0px', threshold: 0.01},
    );

    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          if (entry.isIntersecting) {
            setShouldLoad(true);
          }
          setIsInView(entry.isIntersecting);
        }
      },
      {threshold: 0.15, rootMargin: '60px 0px'},
    );

    preloadObserver.observe(node);
    visibilityObserver.observe(node);

    return () => {
      preloadObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, [isVideo, lazyPlayOnView]);

  const tryPlayVideo = useCallback(() => {
    const videoEl = videoRef.current;
    if (!videoEl || !shouldPlayRef.current) {
      return;
    }

    // Explicitly enforce muted + inline attributes required by iOS Safari & mobile Chrome
    videoEl.muted = true;
    videoEl.defaultMuted = true;
    videoEl.playsInline = true;
    videoEl.setAttribute('muted', '');
    videoEl.setAttribute('playsinline', '');
    videoEl.setAttribute('webkit-playsinline', '');

    if (videoEl.readyState === 0) {
      videoEl.load();
    }

    const playPromise = videoEl.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        // Mobile browsers under strict autoplay / Low Power Mode unlock on first touch/scroll
        const retryOnGesture = () => {
          window.removeEventListener('touchstart', retryOnGesture);
          window.removeEventListener('pointerdown', retryOnGesture);
          if (shouldPlayRef.current && videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => {});
          }
        };
        window.addEventListener('touchstart', retryOnGesture, {passive: true, once: true});
        window.addEventListener('pointerdown', retryOnGesture, {passive: true, once: true});
      });
    }
  }, []);

  useEffect(() => {
    if (!isVideo) {
      return;
    }
    const shouldPlay = !isPaused && isInView;
    shouldPlayRef.current = shouldPlay;

    const videoEl = videoRef.current;
    if (!videoEl) {
      return;
    }

    if (shouldPlay) {
      tryPlayVideo();
    } else {
      videoEl.pause();
    }
  }, [isInView, isPaused, isVideo, shouldLoad, src, tryPlayVideo]);

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
    <div
      ref={containerRef}
      className={`overflow-hidden bg-[#0A0D16] border border-white/[0.06] ${className}`}
    >
      {isVideo ? (
        <video
          key={src}
          ref={videoRef}
          poster={poster}
          aria-label={alt}
          autoPlay={isInView && !isPaused}
          loop
          muted
          playsInline
          disablePictureInPicture
          controls={controls}
          preload={shouldLoad ? 'auto' : 'none'}
          onLoadedMetadata={tryPlayVideo}
          onCanPlay={tryPlayVideo}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover ${imgClassName}`}
        >
          {mp4FallbackSrc && <source src={mp4FallbackSrc} type="video/mp4" />}
          <source src={src} type={WEBM_SRC_REGEX.test(src) ? 'video/webm' : undefined} />
        </video>
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
