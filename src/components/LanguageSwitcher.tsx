import {SUPPORTED_LOCALES, useI18n} from '../i18n/context';

interface LanguageSwitcherProps {
  className?: string;
  tone?: 'neutral' | 'indigo' | 'teal';
}

export function LanguageSwitcher({className = '', tone = 'neutral'}: LanguageSwitcherProps) {
  const {locale, setLocale, t} = useI18n();

  const activeText =
    tone === 'indigo'
      ? 'text-[#F8FAFC] font-semibold'
      : tone === 'teal'
        ? 'text-teal-300 border-b border-teal-400'
        : 'text-zinc-100 border-b border-zinc-200';

  const inactiveText =
    tone === 'indigo'
      ? 'text-[#8B95B0] hover:text-[#F8FAFC]'
      : 'text-zinc-500 border-b border-transparent hover:text-zinc-100';

  const dividerColor = tone === 'indigo' ? 'text-white/15' : 'text-zinc-700';

  const focusRing =
    tone === 'indigo' ? 'focus-visible:outline-[#5B4EFF]' : 'focus-visible:outline-zinc-400';

  return (
    <div
      role="group"
      aria-label={t.nav.languageLabel}
      className={`inline-flex items-center gap-0.5 ${className}`}
    >
      {SUPPORTED_LOCALES.map((item, idx) => {
        const isActive = item.code === locale;
        return (
          <div key={item.code} className="inline-flex items-center">
            <button
              type="button"
              onClick={() => setLocale(item.code)}
              aria-pressed={isActive}
              title={item.nativeName}
              className={`px-1.5 py-1.5 min-h-[34px] font-mono text-[11px] tracking-wide transition-colors duration-150 industrial-ease whitespace-nowrap shrink-0 cursor-pointer rounded focus-visible:outline-2 focus-visible:outline-offset-2 ${focusRing} ${
                isActive ? activeText : inactiveText
              }`}
            >
              {item.label}
            </button>
            {idx < SUPPORTED_LOCALES.length - 1 && (
              <span className={`${dividerColor} select-none text-[11px]`} aria-hidden="true">
                /
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
