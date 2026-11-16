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

  const footerBg =
    currentRoute === 'omnidesk'
      ? 'relative z-10 bg-[#06070B]/80 backdrop-blur-xl border-white/[0.08]'
      : isRateEverything
        ? 'relative z-10 bg-[#0C0E12] border-[#232936]'
        : 'bg-[#09090B] border-zinc-800/80';

  const tone =
    currentRoute === 'omnidesk'
      ? 'indigo'
      : isRateEverything
        ? 'teal'
        : 'neutral';

  const mutedText = isRateEverything ? 'text-slate-400' : 'text-zinc-400';
  const strongText = 'text-zinc-200';
  const linkHover = isRateEverything ? 'hover:text-teal-400' : 'hover:text-zinc-100';

  return (
    <footer className={`border-t ${footerBg}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-sm ${mutedText}`}>
          <span className={`font-medium ${strongText}`}>{t.footer.copyright}</span>
          <span aria-hidden="true">·</span>
          <span>{t.footer.basedIn}</span>
        </div>

        <div className={`flex flex-wrap items-center gap-x-6 gap-y-3 text-sm ${mutedText}`}>
          <a
            href="./index.html"
            onClick={(e) => handleLink(e, 'home')}
            className={`${linkHover} transition-colors whitespace-nowrap`}
          >
            {t.footer.homeLink}
          </a>
          <a
            href="./omnidesk.html"
            onClick={(e) => handleLink(e, 'omnidesk')}
            className={`${linkHover} transition-colors whitespace-nowrap`}
          >
            {t.footer.omnideskLink}
          </a>
          <a
            href="./rate-everything.html"
            onClick={(e) => handleLink(e, 'rate-everything')}
            className={`${linkHover} transition-colors whitespace-nowrap`}
          >
            {t.footer.rateEverythingLink}
          </a>
          <a
            href={EXTERNAL_LINKS.githubProfile}
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkHover} transition-colors whitespace-nowrap`}
          >
            {t.footer.githubLink}
          </a>
          <a
            href={EXTERNAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkHover} transition-colors whitespace-nowrap`}
          >
            {t.footer.linkedinLink}
          </a>
        </div>

        <LanguageSwitcher tone={tone} />
      </div>
    </footer>
  );
}
