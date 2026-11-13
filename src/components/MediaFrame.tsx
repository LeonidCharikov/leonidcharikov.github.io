import {Layers} from 'lucide-react';
import {useState} from 'react';

interface MediaFrameProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  className?: string;
  imgClassName?: string;
}

export function MediaFrame({src, alt, fallbackTitle, className = '', imgClassName = ''}: MediaFrameProps) {
  const [hasError, setHasError] = useState(false);

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
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="eager"
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover ${imgClassName}`}
      />
    </div>
  );
}
