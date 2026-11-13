import {SUPPORTED_LOCALES, useI18n} from '../i18n/context';

interface LanguageSwitcherProps {
  className?: string;
  tone?: 'neutral' | 'indigo' | 'amber';
}

export function LanguageSwitcher({className = '', tone = 'neutral'}: LanguageSwitcherProps) {
  const {locale, setLocale, t} = useI18n();

  const containerTone =
    tone === 'indigo'
      ? 'bg-[#10121E] border-[#1E2235]'
      : tone === 'amber'
        ? 'bg-[#111111] border-zinc-800'
        : 'bg-zinc-900 border-zinc-800';

  const activeTone =
    tone === 'indigo'
      ? 'bg-indigo-600 text-white'
      : tone === 'amber'
        ? 'bg-amber-500 text-black'
        : 'bg-zinc-100 text-zinc-950';

  return (
    <div
      role="group"
      aria-label={t.nav.languageLabel}
      className={`inline-flex items-center gap-1 p-1 border rounded-lg ${containerTone} ${className}`}
    >
      {SUPPORTED_LOCALES.map((item) => {
        const isActive = item.code === locale;
        return (
          <button
            key={item.code}
            type="button"
            onClick={() => setLocale(item.code)}
            aria-pressed={isActive}
            title={item.nativeName}
            className={`px-2.5 py-1.5 min-h-[34px] text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 ${
              isActive ? activeTone : 'text-zinc-400 hover:text-zinc-100'
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
