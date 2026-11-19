import {useId} from 'react';

export const OMNIDESK_FAVICON_DATA_URI =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 512 512'%3E%3Cdefs%3E%3ClinearGradient id='bg' x1='0%25' y1='100%25' x2='100%25' y2='0%25'%3E%3Cstop offset='0%25' stop-color='%234f46e5'/%3E%3Cstop offset='100%25' stop-color='%23818cf8'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='512' height='512' rx='112' fill='url(%23bg)'/%3E%3Crect x='92' y='108' width='328' height='296' rx='44' fill='none' stroke='%23ffffff' stroke-width='28'/%3E%3Cpath d='M92 302h328' fill='none' stroke='%23ffffff' stroke-width='28'/%3E%3Ccircle cx='354' cy='352' r='14' fill='%23ffffff'/%3E%3Ccircle cx='302' cy='352' r='14' fill='%23ffffff'/%3E%3C/svg%3E";

interface OmniDeskLogoProps {
  className?: string;
  variant?: 'original' | 'industrial';
  title?: string;
}

export function OmniDeskLogo({
  className = 'w-7 h-7',
  variant = 'original',
  title = 'OmniDesk',
}: OmniDeskLogoProps) {
  const gradientId = useId();

  if (variant === 'industrial') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        role="img"
        aria-label={title}
        className={`shrink-0 ${className}`}
      >
        <rect width="512" height="512" rx="36" fill="#111113" stroke="#222226" strokeWidth="18" />
        <rect
          x="92"
          y="108"
          width="328"
          height="296"
          rx="28"
          fill="none"
          stroke="#F4F4F5"
          strokeWidth="28"
        />
        <path d="M92 302h328" fill="none" stroke="#F4F4F5" strokeWidth="28" />
        <circle cx="354" cy="352" r="16" fill="#FF4D00" />
        <circle cx="302" cy="352" r="14" fill="#F4F4F5" />
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      role="img"
      aria-label={title}
      className={`shrink-0 ${className}`}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4f46e5" />
          <stop offset="100%" stopColor="#818cf8" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="112" fill={`url(#${gradientId})`} />
      <rect
        x="92"
        y="108"
        width="328"
        height="296"
        rx="44"
        fill="none"
        stroke="#ffffff"
        strokeWidth="28"
      />
      <path d="M92 302h328" fill="none" stroke="#ffffff" strokeWidth="28" />
      <circle cx="354" cy="352" r="14" fill="#ffffff" />
      <circle cx="302" cy="352" r="14" fill="#ffffff" />
    </svg>
  );
}
