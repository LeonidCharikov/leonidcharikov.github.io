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
      <footer className="bg-[#0A0D16] border-t border-[#1E2438] text-[#F8FAFC]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#1E2438]">
            {/* Cell 1: Brand & Runtime Identity */}
            <div className="p-6 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <OmniDeskLogo className="w-6 h-6" title={t.omnideskPage.appName} />
                <span className="font-mono text-xs font-semibold tracking-wider text-[#F8FAFC]">
                  OMNIDESK
                </span>
              </div>
              <p className="font-mono text-[11px] text-[#8B95B0] leading-relaxed">
                {t.footer.copyright} · {t.footer.basedIn}
              </p>
            </div>

            {/* Cell 2: Navigation & Source */}
            <div className="p-6 space-y-2.5">
              <p className="font-mono text-[10px] tracking-widest text-[#8B95B0]">LINKS</p>
              <nav className="flex flex-col gap-1.5 font-mono text-xs">
                <a
                  href={EXTERNAL_LINKS.omnideskRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#F8FAFC] hover:text-[#6D61FF] transition-colors duration-150 industrial-ease w-fit"
                >
                  <span>GITHUB REPOSITORY</span>
                  <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                </a>
                <a
                  href="./index.html"
                  onClick={(e) => handleLink(e, 'home')}
                  className="text-[#8B95B0] hover:text-[#F8FAFC] transition-colors duration-150 industrial-ease w-fit"
                >
                  {t.footer.homeLink.toUpperCase()}
                </a>
                <a
                  href="./rate-everything.html"
                  onClick={(e) => handleLink(e, 'rate-everything')}
                  className="text-[#8B95B0] hover:text-[#F8FAFC] transition-colors duration-150 industrial-ease w-fit"
                >
                  {t.footer.rateEverythingLink.toUpperCase()}
                </a>
              </nav>
            </div>

            {/* Cell 3: Version Changelog */}
            <div className="p-6 space-y-2.5">
              <p className="font-mono text-[10px] tracking-widest text-[#8B95B0]">VERSION</p>
              <div className="font-mono text-xs space-y-1.5">
                <a
                  href={`${EXTERNAL_LINKS.omnideskRepo}/commits/main`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#8B95B0] hover:text-[#6D61FF] transition-colors duration-150 industrial-ease"
                >
                  <span>CHANGELOG &amp; COMMITS</span>
                  <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Cell 4: License & Language */}
            <div className="p-6 flex flex-col justify-between gap-4">
              <div className="space-y-1.5">
                <p className="font-mono text-[10px] tracking-widest text-[#8B95B0]">LICENSE</p>
                <p className="font-mono text-xs text-[#F8FAFC]">MIT // ZERO TELEMETRY</p>
              </div>
              <LanguageSwitcher tone="indigo" />
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
