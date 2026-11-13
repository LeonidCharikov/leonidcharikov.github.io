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

  const footerBg =
    currentRoute === 'omnidesk'
      ? 'bg-[#080911] border-[#1E2235]'
      : currentRoute === 'rate-everything'
        ? 'bg-[#050505] border-zinc-900'
        : 'bg-[#09090B] border-zinc-800/80';

  const tone =
    currentRoute === 'omnidesk'
      ? 'indigo'
      : currentRoute === 'rate-everything'
        ? 'amber'
        : 'neutral';

  return (
    <footer className={`border-t ${footerBg}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-400">
          <span className="font-medium text-zinc-200">{t.footer.copyright}</span>
          <span aria-hidden="true">·</span>
          <span>{t.footer.basedIn}</span>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-zinc-400">
          <a
            href="./index.html"
            onClick={(e) => handleLink(e, 'home')}
            className="hover:text-zinc-100 transition-colors whitespace-nowrap"
          >
            {t.footer.homeLink}
          </a>
          <a
            href="./omnidesk.html"
            onClick={(e) => handleLink(e, 'omnidesk')}
            className="hover:text-zinc-100 transition-colors whitespace-nowrap"
          >
            {t.footer.omnideskLink}
          </a>
          <a
            href="./rate-everything.html"
            onClick={(e) => handleLink(e, 'rate-everything')}
            className="hover:text-zinc-100 transition-colors whitespace-nowrap"
          >
            {t.footer.rateEverythingLink}
          </a>
          <a
            href={EXTERNAL_LINKS.githubProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-100 transition-colors whitespace-nowrap"
          >
            {t.footer.githubLink}
          </a>
          <a
            href={EXTERNAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-100 transition-colors whitespace-nowrap"
          >
            {t.footer.linkedinLink}
          </a>
        </div>

        <LanguageSwitcher tone={tone} />
      </div>
    </footer>
  );
}
