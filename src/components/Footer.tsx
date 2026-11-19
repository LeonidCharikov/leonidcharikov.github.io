import {EXTERNAL_LINKS} from '../data/links';
import {useI18n} from '../i18n/context';
import type {PageRoute} from '../i18n/types';
import {LanguageSwitcher} from './LanguageSwitcher';

interface FooterProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute, hash?: string) => void;
}

export function Footer({currentRoute, onNavigate}: FooterProps) {
  const {t} = useI18n();

  const handleLink = (event: React.MouseEvent<HTMLAnchorElement>, route: PageRoute) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    event.preventDefault();
    onNavigate(route);
  };

  const isRateEverything = currentRoute === 'rate-everything';
  const isOmniDesk = currentRoute === 'omnidesk';

  const footerBg = isRateEverything
    ? 'bg-[#0B0D10] border-[#1E232D]'
    : 'bg-[#09090B] border-zinc-800/75';

  const tone = isOmniDesk ? 'indigo' : isRateEverything ? 'teal' : 'neutral';
  const mutedText = 'text-zinc-400';
  const linkHover = isRateEverything
    ? 'hover:text-teal-300'
    : isOmniDesk
      ? 'hover:text-indigo-300'
      : 'hover:text-zinc-100';

  return (
    <footer className={`border-t ${footerBg}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-9 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm ${mutedText}`}>
          <span className="font-medium text-zinc-200">{t.footer.copyright}</span>
          <span className="text-zinc-700" aria-hidden="true">
            ·
          </span>
          <span>{t.footer.basedIn}</span>
        </div>

        <nav className={`flex flex-wrap items-center gap-x-6 gap-y-3 text-xs sm:text-sm ${mutedText}`}>
          <a
            href="./index.html"
            onClick={(e) => handleLink(e, 'home')}
            className={`${linkHover} transition-colors duration-150 whitespace-nowrap`}
          >
            {t.footer.homeLink}
          </a>
          <a
            href="./omnidesk.html"
            onClick={(e) => handleLink(e, 'omnidesk')}
            className={`${linkHover} transition-colors duration-150 whitespace-nowrap`}
          >
            {t.footer.omnideskLink}
          </a>
          <a
            href="./rate-everything.html"
            onClick={(e) => handleLink(e, 'rate-everything')}
            className={`${linkHover} transition-colors duration-150 whitespace-nowrap`}
          >
            {t.footer.rateEverythingLink}
          </a>
          <a
            href={EXTERNAL_LINKS.githubProfile}
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkHover} transition-colors duration-150 whitespace-nowrap`}
          >
            {t.footer.githubLink}
          </a>
          <a
            href={EXTERNAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkHover} transition-colors duration-150 whitespace-nowrap`}
          >
            {t.footer.linkedinLink}
          </a>
        </nav>

        <LanguageSwitcher tone={tone} />
      </div>
    </footer>
  );
}
