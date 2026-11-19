import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
} from 'lucide-react';
import {AnimatePresence, motion, useReducedMotion} from 'motion/react';
import {useEffect, useMemo, useState} from 'react';
import {LanguageSwitcher} from '../components/LanguageSwitcher';
import {MediaFrame} from '../components/MediaFrame';
import {OmniDeskLogo} from '../components/OmniDeskLogo';
import {EXTERNAL_LINKS, MEDIA_ASSETS} from '../data/links';
import {useI18n} from '../i18n/context';
import type {PageRoute, RatePreviewTab} from '../i18n/types';

interface RateEverythingPageProps {
  onNavigate: (route: PageRoute, hash?: string) => void;
}

const SCREEN_IMAGE_SRC: Record<RatePreviewTab, string> = {
  main: MEDIA_ASSETS.rateEverythingScreens.main,
  detail: MEDIA_ASSETS.rateEverythingScreens.detail,
  add: MEDIA_ASSETS.rateEverythingScreens.add,
};

export function RateEverythingPage({onNavigate}: RateEverythingPageProps) {
  const {t} = useI18n();
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [activeScreenTab, setActiveScreenTab] = useState<RatePreviewTab>('main');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const screenItems: {key: RatePreviewTab; label: string; note: string; src: string}[] = useMemo(
    () => [
      {
        key: 'main',
        label: t.rateEverythingPage.screenTabs.main,
        note: t.rateEverythingPage.screenNotes.main,
        src: SCREEN_IMAGE_SRC.main,
      },
      {
        key: 'detail',
        label: t.rateEverythingPage.screenTabs.detail,
        note: t.rateEverythingPage.screenNotes.detail,
        src: SCREEN_IMAGE_SRC.detail,
      },
      {
        key: 'add',
        label: t.rateEverythingPage.screenTabs.add,
        note: t.rateEverythingPage.screenNotes.add,
        src: SCREEN_IMAGE_SRC.add,
      },
    ],
    [
      t.rateEverythingPage.screenNotes.add,
      t.rateEverythingPage.screenNotes.detail,
      t.rateEverythingPage.screenNotes.main,
      t.rateEverythingPage.screenTabs.add,
      t.rateEverythingPage.screenTabs.detail,
      t.rateEverythingPage.screenTabs.main,
    ],
  );

  const activeScreenIndex = screenItems.findIndex((item) => item.key === activeScreenTab);
  const activeScreen = screenItems[activeScreenIndex] ?? screenItems[0];
  const activeLightboxScreen = lightboxIndex !== null ? screenItems[lightboxIndex] ?? null : null;

  useEffect(() => {
    if (lightboxIndex === null) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxIndex(null);
      } else if (event.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev - 1 + screenItems.length) % screenItems.length,
        );
      } else if (event.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % screenItems.length));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, screenItems.length]);

  const handleNav = (event: React.MouseEvent<HTMLAnchorElement>, route: PageRoute) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    event.preventDefault();
    onNavigate(route);
  };

  const scrollToSection = (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({behavior: shouldReduceMotion ? 'auto' : 'smooth', block: 'start'});
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D10] text-zinc-100">
      {/* Strict 3-Zone Editorial Top Bar */}
      <header className="sticky top-0 z-40 h-16 bg-[#0B0D10]/95 backdrop-blur-sm border-b border-[#1E232D]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-8">
          {/* Zone 1: Single-Line Brand Wordmark */}
          <a
            href="#overview"
            onClick={(e) => scrollToSection(e, 'overview')}
            className="font-display text-base font-semibold tracking-tight text-zinc-50 hover:text-white transition-colors whitespace-nowrap shrink-0 py-1.5"
          >
            {t.rateEverythingPage.appName}
          </a>

          {/* Zone 2: Clean Single-Line Nav Links */}
          <nav
            aria-label={t.rateEverythingPage.appName}
            className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-400"
          >
            <a
              href="#overview"
              onClick={(e) => scrollToSection(e, 'overview')}
              className="hover:text-zinc-100 transition-colors duration-150 whitespace-nowrap py-1.5"
            >
              {t.rateEverythingPage.navLinks.overview}
            </a>
            <a
              href="#screens"
              onClick={(e) => scrollToSection(e, 'screens')}
              className="hover:text-zinc-100 transition-colors duration-150 whitespace-nowrap py-1.5"
            >
              {t.rateEverythingPage.navLinks.screens}
            </a>
            <a
              href="#stack"
              onClick={(e) => scrollToSection(e, 'stack')}
              className="hover:text-zinc-100 transition-colors duration-150 whitespace-nowrap py-1.5"
            >
              {t.rateEverythingPage.navLinks.stack}
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center shrink-0">
            <a
              href={EXTERNAL_LINKS.rateEverythingLive}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[38px] text-xs font-semibold text-white bg-[#0F766E] hover:bg-[#115E59] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0"
            >
              <span>{t.rateEverythingPage.liveCta}</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section 1: Minimalist Editorial Hero + Specification Ledger */}
        <section id="overview" className="scroll-mt-20 pt-8 pb-16 sm:pt-12 sm:pb-24 space-y-12">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#1E232D]">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm">
              <a
                href="./index.html"
                onClick={(e) => handleNav(e, 'home')}
                className="inline-flex items-center gap-1.5 font-medium text-zinc-400 hover:text-zinc-100 transition-colors duration-150 whitespace-nowrap"
              >
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t.rateEverythingPage.backToPortfolio}</span>
              </a>
              <span className="text-zinc-700" aria-hidden="true">
                /
              </span>
              <span className="text-teal-400 font-medium">{t.rateEverythingPage.kicker}</span>
            </div>
            <LanguageSwitcher tone="teal" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <motion.div
              initial={shouldReduceMotion ? false : {opacity: 0, y: 10}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.34, ease: [0.16, 1, 0.3, 1]}}
              className="lg:col-span-7 space-y-6"
            >
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-bold tracking-tight text-zinc-50 leading-[1.06] text-balance">
                {t.rateEverythingPage.title}
              </h1>
              <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl">
                {t.rateEverythingPage.lead}
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2">
                <a
                  href={EXTERNAL_LINKS.rateEverythingLive}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 min-h-[44px] text-sm font-semibold text-white bg-[#0F766E] hover:bg-[#115E59] rounded-md transition-colors duration-150 whitespace-nowrap"
                >
                  <span>{t.rateEverythingPage.liveCta}</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href={EXTERNAL_LINKS.rateEverythingRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 py-2 text-sm font-medium text-zinc-300 hover:text-white border-b border-zinc-700 hover:border-zinc-300 transition-colors duration-150 whitespace-nowrap"
                >
                  <span>{t.rateEverythingPage.repoCta}</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </motion.div>

            {/* Unboxed Architectural Ledger */}
            <motion.aside
              initial={shouldReduceMotion ? false : {opacity: 0, y: 10}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.34, delay: 0.06, ease: [0.16, 1, 0.3, 1]}}
              className="lg:col-span-5"
            >
              <p className="text-xs font-medium text-teal-400 pb-4 border-b border-[#1E232D]">
                {t.rateEverythingPage.ledgerHeading}
              </p>
              <dl className="divide-y divide-[#1E232D]">
                {t.rateEverythingPage.ledgerRows.map((row) => (
                  <div
                    key={row.label}
                    className="py-3.5 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4"
                  >
                    <dt className="font-mono text-xs text-zinc-500 shrink-0">{row.label}</dt>
                    <dd className="text-sm font-medium text-zinc-200 sm:text-right">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </motion.aside>
          </div>
        </section>

        {/* Section 2: Single-Elevation Screenshots Showcase */}
        <section
          id="screens"
          className="scroll-mt-20 border-t border-[#1E232D] py-16 sm:py-24 space-y-10"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-50">
                {t.rateEverythingPage.screensHeading}
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                {t.rateEverythingPage.screensLead}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-5 border-b border-[#1E232D] self-start">
              {screenItems.map((tab) => {
                const isActive = activeScreenTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveScreenTab(tab.key)}
                    aria-pressed={isActive}
                    className={`py-2 min-h-[38px] text-xs sm:text-sm font-medium border-b-2 -mb-px transition-colors duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'text-zinc-50 border-teal-400'
                        : 'text-zinc-500 border-transparent hover:text-zinc-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Single-Elevation Preview Frame */}
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => setLightboxIndex(activeScreenIndex >= 0 ? activeScreenIndex : 0)}
              aria-label={`${activeScreen.label} — ${t.rateEverythingPage.expandPreviewLabel}`}
              className="group relative block w-full text-left bg-[#080A0D] border border-[#1E232D] hover:border-teal-500/60 rounded-xl overflow-hidden cursor-pointer transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeScreen.key}
                  initial={shouldReduceMotion ? false : {opacity: 0.35, scale: 0.995}}
                  animate={{opacity: 1, scale: 1}}
                  exit={shouldReduceMotion ? undefined : {opacity: 0.35}}
                  transition={{duration: 0.18, ease: [0.16, 1, 0.3, 1]}}
                >
                  <MediaFrame
                    src={activeScreen.src}
                    alt={activeScreen.label}
                    fallbackTitle={activeScreen.label}
                    className="aspect-[16/9] border-0 rounded-none bg-[#080A0D]"
                    imgClassName="object-top transition-transform duration-300 group-hover:scale-[1.01]"
                  />
                </motion.div>
              </AnimatePresence>

              <span
                className="absolute bottom-3.5 right-3.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#0B0D10]/90 border border-[#232A36] text-xs font-medium text-zinc-200 group-hover:text-white transition-colors"
                aria-hidden="true"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.rateEverythingPage.expandPreviewLabel}</span>
              </span>
            </button>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm">
              <p className="text-zinc-400">{activeScreen.note}</p>
              <span className="font-mono text-xs text-teal-400 font-medium tabular-nums shrink-0">
                {String(activeScreenIndex + 1).padStart(2, '0')} /{' '}
                {String(screenItems.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* 3-Column Hairline Screen Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {screenItems.map((item, idx) => {
              const isSelected = activeScreenTab === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setActiveScreenTab(item.key)}
                  onDoubleClick={() => setLightboxIndex(idx)}
                  aria-pressed={isSelected}
                  className="group text-left space-y-3 cursor-pointer"
                >
                  <div
                    className={`rounded-lg overflow-hidden border transition-colors duration-150 ${
                      isSelected
                        ? 'border-teal-500/80'
                        : 'border-[#1E232D] group-hover:border-zinc-600'
                    }`}
                  >
                    <MediaFrame
                      src={item.src}
                      alt={item.label}
                      fallbackTitle={item.label}
                      className="aspect-[16/9] border-0 rounded-none bg-[#080A0D]"
                      imgClassName="object-top"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span
                        className={`font-display text-sm font-semibold ${
                          isSelected ? 'text-teal-300' : 'text-zinc-200 group-hover:text-white'
                        }`}
                      >
                        {item.label}
                      </span>
                      <span className="font-mono text-xs text-zinc-600 tabular-nums shrink-0">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">
                      {item.note}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Section 3: Technologies Explored — Hairline Architectural Grid */}
        <section
          id="stack"
          className="scroll-mt-20 border-t border-[#1E232D] py-16 sm:py-24 space-y-12"
        >
          <div className="space-y-3 max-w-2xl">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-50">
              {t.rateEverythingPage.stackHeading}
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              {t.rateEverythingPage.stackLead}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-[#1E232D]">
            {t.rateEverythingPage.techExperiments.map((item, idx) => (
              <article
                key={item.title}
                className="py-7 md:odd:pr-10 md:even:pl-10 border-b border-[#1E232D] md:even:border-l md:even:border-[#1E232D] space-y-3"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-mono text-xs text-teal-400 tabular-nums">
                    {String(idx + 1).padStart(2, '0')}.
                  </span>
                  <span className="font-mono text-xs text-zinc-500">{item.tag}</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-zinc-100">{item.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
              </article>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pt-2">
            <span className="font-mono text-xs text-zinc-500 shrink-0">
              {t.rateEverythingPage.alsoTriedLabel}
            </span>
            <p className="text-xs sm:text-sm text-zinc-300">
              {t.rateEverythingPage.alsoTriedItems.map((item, idx) => (
                <span key={item}>
                  {item}
                  {idx < t.rateEverythingPage.alsoTriedItems.length - 1 && (
                    <span className="mx-2 text-zinc-700" aria-hidden="true">
                      ·
                    </span>
                  )}
                </span>
              ))}
            </p>
          </div>
        </section>

        {/* Cross-Link to OmniDesk with Inline SVG Logo */}
        <section className="border-t border-[#1E232D] py-14 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <OmniDeskLogo className="w-11 h-11" title={t.omnideskPage.appName} />
            <div>
              <p className="text-xs font-medium text-zinc-500">
                {t.rateEverythingPage.nextProjectLabel}
              </p>
              <p className="mt-0.5 font-display text-xl sm:text-2xl font-bold text-zinc-100">
                {t.rateEverythingPage.nextProjectTitle}
              </p>
            </div>
          </div>
          <a
            href="./omnidesk.html"
            onClick={(e) => handleNav(e, 'omnidesk')}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[42px] text-sm font-semibold text-[#F8FAFC] bg-[#5B4EFF] hover:bg-[#6D61FF] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 self-start sm:self-auto"
          >
            <span>{t.rateEverythingPage.nextProjectCta}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </section>
      </main>

      {/* Fullscreen Screenshot Lightbox Modal */}
      {activeLightboxScreen && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeLightboxScreen.label}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="w-full max-w-5xl bg-[#0F1218] border border-[#1E232D] rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-[#1E232D]">
              <h3 className="font-display text-base font-semibold text-zinc-100 truncate">
                {activeLightboxScreen.label}
              </h3>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="font-mono text-xs text-zinc-500 tabular-nums mr-1.5">
                  {String(lightboxIndex + 1).padStart(2, '0')} /{' '}
                  {String(screenItems.length).padStart(2, '0')}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex((lightboxIndex - 1 + screenItems.length) % screenItems.length)
                  }
                  aria-label={t.rateEverythingPage.lightboxLabels.prevScreenLabel}
                  className="p-2 text-zinc-300 hover:text-teal-300 border border-[#1E232D] hover:border-zinc-600 rounded-md transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxIndex((lightboxIndex + 1) % screenItems.length)}
                  aria-label={t.rateEverythingPage.lightboxLabels.nextScreenLabel}
                  className="p-2 text-zinc-300 hover:text-teal-300 border border-[#1E232D] hover:border-zinc-600 rounded-md transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  aria-label={t.rateEverythingPage.lightboxLabels.closeLabel}
                  className="p-2 text-zinc-300 hover:text-teal-300 border border-[#1E232D] hover:border-zinc-600 rounded-md transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="bg-[#080A0D] p-2 sm:p-4">
              <img
                src={activeLightboxScreen.src}
                alt={activeLightboxScreen.label}
                referrerPolicy="no-referrer"
                className="w-full max-h-[75vh] object-contain mx-auto rounded-md"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
