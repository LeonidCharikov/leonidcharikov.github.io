import {Menu, X} from 'lucide-react';
import {useState} from 'react';
import {useI18n} from '../i18n/context';
import type {PageRoute} from '../i18n/types';
import {LanguageSwitcher} from './LanguageSwitcher';

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute, hash?: string) => void;
}

export function Navbar({currentRoute, onNavigate}: NavbarProps) {
  const {t} = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    route: PageRoute,
    hash?: string,
  ) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    event.preventDefault();
    setMobileOpen(false);
    onNavigate(route, hash);
  };

  const navLinkClass = (isActive: boolean) =>
    `text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 py-2 border-b focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-400 ${
      isActive
        ? 'text-zinc-100 border-zinc-100'
        : 'text-zinc-400 border-transparent hover:text-zinc-100 hover:border-zinc-700'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-[#09090B]/90 backdrop-blur-md border-b border-zinc-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element Brand Wordmark */}
        <a
          href="./index.html"
          onClick={(e) => handleLinkClick(e, 'home')}
          className="font-display text-base sm:text-lg font-semibold tracking-tight text-zinc-100 whitespace-nowrap shrink-0 py-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-400"
        >
          {t.nav.brand}
        </a>

        {/* Zone 2: 4 concise single-line text nav links */}
        <nav className="hidden md:flex items-center gap-7" aria-label={t.nav.projects}>
          <a
            href="./index.html#about"
            onClick={(e) => handleLinkClick(e, 'home', 'about')}
            className={navLinkClass(false)}
          >
            {t.nav.about}
          </a>
          <a
            href="./index.html#projects"
            onClick={(e) => handleLinkClick(e, 'home', 'projects')}
            className={navLinkClass(currentRoute === 'home')}
          >
            {t.nav.projects}
          </a>
          <a
            href="./omnidesk.html"
            onClick={(e) => handleLinkClick(e, 'omnidesk')}
            className={navLinkClass(currentRoute === 'omnidesk')}
          >
            {t.nav.omnidesk}
          </a>
          <a
            href="./rate-everything.html"
            onClick={(e) => handleLinkClick(e, 'rate-everything')}
            className={navLinkClass(currentRoute === 'rate-everything')}
          >
            {t.nav.rateEverything}
          </a>
        </nav>

        {/* Zone 3: 1 primary action + mobile drawer toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="./index.html#contact"
            onClick={(e) => handleLinkClick(e, 'home', 'contact')}
            className="hidden md:inline-flex items-center justify-center px-4 py-2 min-h-[38px] text-xs font-semibold text-zinc-950 bg-zinc-100 rounded-lg hover:bg-white transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400"
          >
            {t.nav.contact}
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? t.nav.menuCloseLabel : t.nav.menuOpenLabel}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-200 hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-[#09090B] px-4 py-5 space-y-4">
          <nav className="flex flex-col space-y-1">
            <a
              href="./index.html#about"
              onClick={(e) => handleLinkClick(e, 'home', 'about')}
              className="px-3 py-3 text-base font-medium text-zinc-300 hover:bg-zinc-900 rounded-lg"
            >
              {t.nav.about}
            </a>
            <a
              href="./index.html#projects"
              onClick={(e) => handleLinkClick(e, 'home', 'projects')}
              className="px-3 py-3 text-base font-medium text-zinc-300 hover:bg-zinc-900 rounded-lg"
            >
              {t.nav.projects}
            </a>
            <a
              href="./omnidesk.html"
              onClick={(e) => handleLinkClick(e, 'omnidesk')}
              className="px-3 py-3 text-base font-medium text-zinc-300 hover:bg-zinc-900 rounded-lg"
            >
              {t.nav.omnidesk}
            </a>
            <a
              href="./rate-everything.html"
              onClick={(e) => handleLinkClick(e, 'rate-everything')}
              className="px-3 py-3 text-base font-medium text-zinc-300 hover:bg-zinc-900 rounded-lg"
            >
              {t.nav.rateEverything}
            </a>
            <a
              href="./index.html#contact"
              onClick={(e) => handleLinkClick(e, 'home', 'contact')}
              className="mt-2 inline-flex items-center justify-center px-4 py-3 min-h-[44px] text-sm font-semibold text-zinc-950 bg-zinc-100 rounded-lg"
            >
              {t.nav.contact}
            </a>
          </nav>

          <div className="pt-3 border-t border-zinc-800 flex items-center justify-between gap-4">
            <span className="text-xs font-medium text-zinc-500">{t.nav.languageLabel}</span>
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  );
}
