import {SUPPORTED_LOCALES, useI18n} from '../i18n/context';

interface LanguageSwitcherProps {
  className?: string;
  tone?: 'neutral' | 'indigo' | 'teal';
}

export function LanguageSwitcher({className = '', tone = 'neutral'}: LanguageSwitcherProps) {
  const {locale, setLocale, t} = useI18n();

  const activeText =
    tone === 'indigo'
      ? 'text-[#6D61FF] border-[#5B4EFF]'
      : tone === 'teal'
        ? 'text-teal-300 border-teal-400'
        : 'text-zinc-100 border-zinc-200';

  const inactiveText =
    tone === 'indigo'
      ? 'text-[#8B95B0] border-transparent hover:text-[#F8FAFC]'
      : 'text-zinc-500 border-transparent hover:text-zinc-100';

  const dividerColor = tone === 'indigo' ? 'text-[#1E2438]' : 'text-zinc-700';

  const focusRing =
    tone === 'indigo' ? 'focus-visible:outline-[#5B4EFF]' : 'focus-visible:outline-zinc-400';

  return (
    <div
      role="group"
      aria-label={t.nav.languageLabel}
      className={`inline-flex items-center gap-1 ${className}`}
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
              className={`px-2 py-1.5 min-h-[36px] font-mono text-xs font-medium border-b transition-colors duration-150 industrial-ease whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 ${focusRing} ${
                isActive ? activeText : inactiveText
              }`}
            >
              {item.label}
            </button>
            {idx < SUPPORTED_LOCALES.length - 1 && (
              <span className={`${dividerColor} select-none text-xs`} aria-hidden="true">
                /
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
