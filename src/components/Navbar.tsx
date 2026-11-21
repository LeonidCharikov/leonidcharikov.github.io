import {Menu, X} from 'lucide-react';
import {useEffect, useState} from 'react';
import {useI18n} from '../i18n/context';
import type {PageRoute} from '../i18n/types';
import {LanguageSwitcher} from './LanguageSwitcher';
import {ScrollProgressBar} from './OmniDeskMotion';

type HomeSection = 'top' | 'about' | 'projects' | 'contact';

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute, hash?: string) => void;
}

export function Navbar({currentRoute, onNavigate}: NavbarProps) {
  const {t} = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<HomeSection>('top');

  // Scroll-spy for the Home page so About / Projects / Contact reflect real scroll position
  useEffect(() => {
    if (currentRoute !== 'home') {
      return;
    }

    let frameId = 0;

    const computeActiveSection = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollY < 80) {
        setActiveSection('top');
        return;
      }

      if (scrollY + viewportHeight >= docHeight - 48) {
        setActiveSection('contact');
        return;
      }

      const triggerOffset = 150;
      const contactEl = document.getElementById('contact');
      const projectsEl = document.getElementById('projects');
      const aboutEl = document.getElementById('about');

      if (contactEl && contactEl.getBoundingClientRect().top <= triggerOffset) {
        setActiveSection('contact');
      } else if (projectsEl && projectsEl.getBoundingClientRect().top <= triggerOffset) {
        setActiveSection('projects');
      } else if (aboutEl && aboutEl.getBoundingClientRect().top <= triggerOffset) {
        setActiveSection('about');
      } else {
        setActiveSection('top');
      }
    };

    const handleScroll = () => {
      if (frameId) {
        return;
      }
      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        computeActiveSection();
      });
    };

    computeActiveSection();
    window.addEventListener('scroll', handleScroll, {passive: true});
    window.addEventListener('resize', handleScroll, {passive: true});
    window.addEventListener('hashchange', computeActiveSection);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      window.removeEventListener('hashchange', computeActiveSection);
    };
  }, [currentRoute]);

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
    if (route === 'home') {
      if (hash === 'about' || hash === 'projects' || hash === 'contact') {
        setActiveSection(hash);
      } else {
        setActiveSection('top');
      }
    }
    onNavigate(route, hash);
  };

  const navLinkClass = (isActive: boolean) =>
    `text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 py-1.5 border-b focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-400 ${
      isActive
        ? 'text-zinc-100 border-zinc-200'
        : 'text-zinc-400 border-transparent hover:text-zinc-100'
    }`;

  const mobileNavLinkClass = (isActive: boolean) =>
    `px-3 py-3 text-base font-medium rounded-md transition-colors ${
      isActive ? 'text-white bg-zinc-900/90' : 'text-zinc-300 hover:text-white'
    }`;

  const isAboutActive = currentRoute === 'home' && activeSection === 'about';
  const isProjectsActive = currentRoute === 'home' && activeSection === 'projects';
  const isContactActive = currentRoute === 'home' && activeSection === 'contact';

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#09090B]/95 backdrop-blur-sm border-b border-zinc-800/70">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-element Brand Wordmark */}
          <a
            href="./index.html"
            onClick={(e) => handleLinkClick(e, 'home')}
            className="font-display text-base font-semibold tracking-tight text-zinc-100 hover:text-white transition-colors whitespace-nowrap shrink-0 py-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-400"
          >
            {t.nav.brand}
          </a>

          {/* Zone 2: 4 concise single-line text nav links */}
          <nav className="hidden md:flex items-center gap-7" aria-label={t.nav.projects}>
            <a
              href="./index.html#about"
              onClick={(e) => handleLinkClick(e, 'home', 'about')}
              aria-current={isAboutActive ? 'location' : undefined}
              className={navLinkClass(isAboutActive)}
            >
              {t.nav.about}
            </a>
            <a
              href="./index.html#projects"
              onClick={(e) => handleLinkClick(e, 'home', 'projects')}
              aria-current={isProjectsActive ? 'location' : undefined}
              className={navLinkClass(isProjectsActive)}
            >
              {t.nav.projects}
            </a>
            <a
              href="./omnidesk.html"
              onClick={(e) => handleLinkClick(e, 'omnidesk')}
              aria-current={currentRoute === 'omnidesk' ? 'page' : undefined}
              className={navLinkClass(currentRoute === 'omnidesk')}
            >
              {t.nav.omnidesk}
            </a>
            <a
              href="./rate-everything.html"
              onClick={(e) => handleLinkClick(e, 'rate-everything')}
              aria-current={currentRoute === 'rate-everything' ? 'page' : undefined}
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
              aria-current={isContactActive ? 'location' : undefined}
              className={`hidden md:inline-flex items-center justify-center px-4 py-2 min-h-[38px] text-xs font-semibold rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 ${
                isContactActive
                  ? 'text-zinc-950 bg-white ring-2 ring-zinc-400/50'
                  : 'text-zinc-950 bg-zinc-100 hover:bg-white'
              }`}
            >
              {t.nav.contact}
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? t.nav.menuCloseLabel : t.nav.menuOpenLabel}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-md border border-zinc-800 text-zinc-200 hover:bg-zinc-900 transition-colors cursor-pointer"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-zinc-800/80 bg-[#09090B] px-4 py-5 space-y-4">
            <nav className="flex flex-col space-y-1">
              <a
                href="./index.html#about"
                onClick={(e) => handleLinkClick(e, 'home', 'about')}
                className={mobileNavLinkClass(isAboutActive)}
              >
                {t.nav.about}
              </a>
              <a
                href="./index.html#projects"
                onClick={(e) => handleLinkClick(e, 'home', 'projects')}
                className={mobileNavLinkClass(isProjectsActive)}
              >
                {t.nav.projects}
              </a>
              <a
                href="./omnidesk.html"
                onClick={(e) => handleLinkClick(e, 'omnidesk')}
                className={mobileNavLinkClass(currentRoute === 'omnidesk')}
              >
                {t.nav.omnidesk}
              </a>
              <a
                href="./rate-everything.html"
                onClick={(e) => handleLinkClick(e, 'rate-everything')}
                className={mobileNavLinkClass(currentRoute === 'rate-everything')}
              >
                {t.nav.rateEverything}
              </a>
              <a
                href="./index.html#contact"
                onClick={(e) => handleLinkClick(e, 'home', 'contact')}
                className="mt-2 inline-flex items-center justify-center px-4 py-3 min-h-[44px] text-sm font-semibold text-zinc-950 bg-zinc-100 rounded-md"
              >
                {t.nav.contact}
              </a>
            </nav>

            <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-4">
              <span className="text-xs font-medium text-zinc-500">{t.nav.languageLabel}</span>
              <LanguageSwitcher />
            </div>
          </div>
        )}
      </header>
      <ScrollProgressBar
        topClass="top-16"
        barClass="bg-gradient-to-r from-zinc-500 via-zinc-200 to-white"
      />
    </>
  );
}
