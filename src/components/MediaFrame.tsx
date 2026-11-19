import {Layers} from 'lucide-react';
import {useEffect, useRef, useState} from 'react';

interface MediaFrameProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  className?: string;
  imgClassName?: string;
  isPaused?: boolean;
  controls?: boolean;
}

const VIDEO_SRC_REGEX = /\.(webm|mp4|ogg)(\?.*)?$/i;

export function MediaFrame({
  src,
  alt,
  fallbackTitle,
  className = '',
  imgClassName = '',
  isPaused = false,
  controls = false,
}: MediaFrameProps) {
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideo = VIDEO_SRC_REGEX.test(src);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  useEffect(() => {
    if (!isVideo || !videoRef.current) {
      return;
    }
    const videoEl = videoRef.current;
    if (isPaused) {
      videoEl.pause();
    } else {
      const playPromise = videoEl.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          // Ignore autoplay interruption when switching slides or before user gesture
        });
      }
    }
  }, [isPaused, isVideo, src]);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 border border-zinc-800 text-zinc-400 p-8 text-center ${className}`}
      >
        <Layers className="w-7 h-7 text-zinc-300" aria-hidden="true" />
        <span className="text-sm font-medium text-zinc-300">{fallbackTitle}</span>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden bg-zinc-900 border border-zinc-800 ${className}`}>
      {isVideo ? (
        <video
          ref={videoRef}
          src={src}
          aria-label={alt}
          autoPlay={!isPaused}
          loop
          muted
          playsInline
          controls={controls}
          preload="metadata"
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover ${imgClassName}`}
        />
      ) : (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="eager"
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover ${imgClassName}`}
        />
      )}
    </div>
  );
}
