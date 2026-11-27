import {ArrowUpRight} from 'lucide-react';
import {EXTERNAL_LINKS} from '../data/links';
import {useI18n} from '../i18n/context';
import type {PageRoute} from '../i18n/types';
import {LanguageSwitcher} from './LanguageSwitcher';
import {OmniDeskLogo} from './OmniDeskLogo';

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

  if (currentRoute === 'omnidesk') {
    return (
      <footer className="relative z-10 bg-transparent text-[#F8FAFC]">
        <div className="max-w-[1080px] mx-auto px-5 sm:px-8" aria-hidden="true">
          <div className="omnidesk-section-divider" />
        </div>
        <div className="max-w-[1080px] mx-auto px-5 sm:px-8 py-14 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <OmniDeskLogo className="w-6 h-6" title={t.omnideskPage.appName} />
                <span className="font-mono text-xs font-semibold tracking-wider text-[#F8FAFC]">
                  OMNIDESK
                </span>
              </div>
              <p className="text-xs text-[#8B95B0] leading-relaxed">
                {t.footer.copyright} · {t.footer.basedIn}
              </p>
            </div>

            <div className="space-y-3">
              <p className="font-mono text-[11px] tracking-wider text-[#8B95B0]">Links</p>
              <nav className="flex flex-col gap-2 text-xs">
                <a
                  href={EXTERNAL_LINKS.omnideskRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#F8FAFC] hover:text-[#6D61FF] transition-colors duration-150 industrial-ease w-fit"
                >
                  <span>GitHub Repository</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
                <a
                  href="./index.html"
                  onClick={(e) => handleLink(e, 'home')}
                  className="text-[#8B95B0] hover:text-[#F8FAFC] transition-colors duration-150 industrial-ease w-fit"
                >
                  {t.footer.homeLink}
                </a>
              </nav>
            </div>

            <div className="space-y-3">
              <p className="font-mono text-[11px] tracking-wider text-[#8B95B0]">Releases</p>
              <div className="text-xs space-y-2">
                <a
                  href={`${EXTERNAL_LINKS.omnideskRepo}/commits/main`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#8B95B0] hover:text-[#F8FAFC] transition-colors duration-150 industrial-ease"
                >
                  <span>Changelog &amp; Commits</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="space-y-3">
              <p className="font-mono text-[11px] tracking-wider text-[#8B95B0]">Privacy &amp; Language</p>
              <p className="text-xs text-[#8B95B0]">
                MIT · <span className="text-[#10B981]">Zero telemetry</span>
              </p>
              <div className="pt-1">
                <LanguageSwitcher tone="indigo" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  const isRateEverything = currentRoute === 'rate-everything';
  const footerBg = isRateEverything
    ? 'bg-[#0B0D10] border-[#1E232D]'
    : 'bg-[#09090B] border-zinc-800/75';
  const tone = isRateEverything ? 'teal' : 'neutral';
  const linkHover = isRateEverything ? 'hover:text-teal-300' : 'hover:text-zinc-100';

  return (
    <footer className={`border-t ${footerBg}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-9 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-zinc-400">
          <span className="font-medium text-zinc-200">{t.footer.copyright}</span>
          <span className="text-zinc-700" aria-hidden="true">
            ·
          </span>
          <span>{t.footer.basedIn}</span>
        </div>

        <nav className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs sm:text-sm text-zinc-400">
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
