import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Code2,
  Database,
  Layers,
  LayoutGrid,
  Maximize2,
  X,
} from 'lucide-react';
import {AnimatePresence, motion, useReducedMotion} from 'motion/react';
import {useEffect, useMemo, useState} from 'react';
import {LanguageSwitcher} from '../components/LanguageSwitcher';
import {MediaFrame} from '../components/MediaFrame';
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

const TECH_ICONS = [Layers, LayoutGrid, Code2, Database] as const;

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
    <div className="relative min-h-screen bg-[#0C0E12] text-zinc-100">
      {/* Subtle architectural blueprint dot grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(rgba(148, 163, 184, 0.14) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage:
            'radial-gradient(ellipse 90% 70% at 50% 15%, black 35%, transparent 100%)',
        }}
      />

      {/* 3-Zone Dark Editorial Top Bar */}
      <header className="sticky top-0 z-40 h-16 bg-[#0C0E12]/90 backdrop-blur-md border-b border-[#232936]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <a
              href="./index.html"
              onClick={(e) => handleNav(e, 'home')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 min-h-[36px] text-xs font-medium text-slate-300 hover:text-white bg-[#131720] border border-[#232936] rounded-lg hover:border-slate-500 transition-colors whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">{t.rateEverythingPage.backToPortfolio}</span>
            </a>

            <div className="flex items-center gap-2 min-w-0">
              <span
                className="w-6 h-6 rounded-md bg-[#0F766E] text-white flex items-center justify-center shrink-0"
                aria-hidden="true"
              >
                <Layers className="w-3.5 h-3.5" />
              </span>
              <span className="font-display text-sm sm:text-base font-bold tracking-tight text-white truncate">
                {t.rateEverythingPage.appName}
              </span>
            </div>
          </div>

          <nav
            aria-label={t.rateEverythingPage.appName}
            className="hidden md:flex items-center gap-7 text-xs font-medium text-slate-400"
          >
            <a
              href="#overview"
              onClick={(e) => scrollToSection(e, 'overview')}
              className="hover:text-teal-400 transition-colors whitespace-nowrap"
            >
              {t.rateEverythingPage.navLinks.overview}
            </a>
            <a
              href="#screens"
              onClick={(e) => scrollToSection(e, 'screens')}
              className="hover:text-teal-400 transition-colors whitespace-nowrap"
            >
              {t.rateEverythingPage.navLinks.screens}
            </a>
            <a
              href="#stack"
              onClick={(e) => scrollToSection(e, 'stack')}
              className="hover:text-teal-400 transition-colors whitespace-nowrap"
            >
              {t.rateEverythingPage.navLinks.stack}
            </a>
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={EXTERNAL_LINKS.rateEverythingRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 min-h-[36px] text-xs font-semibold text-zinc-200 bg-[#131720] border border-[#232936] rounded-lg hover:border-teal-500/60 hover:text-teal-300 transition-colors whitespace-nowrap shrink-0"
            >
              <span>{t.rateEverythingPage.repoCta}</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
            <a
              href={EXTERNAL_LINKS.rateEverythingLive}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[36px] text-xs font-semibold text-white bg-[#0F766E] rounded-lg hover:bg-[#115E59] transition-colors whitespace-nowrap shrink-0"
            >
              <span>{t.rateEverythingPage.liveCta}</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-20">
        {/* Section 1: Dark Editorial Hero + Project Snapshot Ledger */}
        <section id="overview" className="scroll-mt-24 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-mono text-xs font-medium tracking-wide text-teal-400 uppercase">
              {t.rateEverythingPage.kicker}
            </p>
            <LanguageSwitcher tone="teal" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <motion.div
              initial={shouldReduceMotion ? false : {opacity: 0, y: 12}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.45, ease: 'easeOut'}}
              className="lg:col-span-7 space-y-6"
            >
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.35rem] font-bold tracking-tight text-white leading-[1.06] text-balance">
                {t.rateEverythingPage.title}
              </h1>
              <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl">
                {t.rateEverythingPage.lead}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href={EXTERNAL_LINKS.rateEverythingLive}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] text-sm font-semibold text-white bg-[#0F766E] rounded-lg hover:bg-[#115E59] transition-colors whitespace-nowrap"
                >
                  <span>{t.rateEverythingPage.liveCta}</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href={EXTERNAL_LINKS.rateEverythingRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] text-sm font-semibold text-zinc-100 bg-[#131720] border border-[#232936] rounded-lg hover:border-slate-500 transition-colors whitespace-nowrap"
                >
                  <span>{t.rateEverythingPage.repoCta}</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </motion.div>

            {/* Dark Architectural Ledger */}
            <motion.aside
              initial={shouldReduceMotion ? false : {opacity: 0, y: 12}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.45, delay: 0.08, ease: 'easeOut'}}
              className="lg:col-span-5 bg-[#131720] border border-[#232936] rounded-2xl p-6"
            >
              <p className="font-mono text-[11px] font-medium uppercase tracking-wider text-teal-400 pb-4 border-b border-[#232936]">
                {t.rateEverythingPage.ledgerHeading}
              </p>
              <dl className="divide-y divide-[#1E2430]">
                {t.rateEverythingPage.ledgerRows.map((row) => (
                  <div
                    key={row.label}
                    className="py-3.5 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4"
                  >
                    <dt className="font-mono text-xs text-slate-400 shrink-0">{row.label}</dt>
                    <dd className="text-sm font-medium text-zinc-100 sm:text-right">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </motion.aside>
          </div>
        </section>

        {/* Section 2: Framed Real Screenshots Showcase */}
        <section id="screens" className="scroll-mt-24 border-t border-[#232936] pt-14 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
            <div className="space-y-2 max-w-2xl">
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {t.rateEverythingPage.screensHeading}
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                {t.rateEverythingPage.screensLead}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-1 p-1 bg-[#131720] border border-[#232936] rounded-xl self-start">
              {screenItems.map((tab) => {
                const isActive = activeScreenTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveScreenTab(tab.key)}
                    aria-pressed={isActive}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-[#0F766E] text-white'
                        : 'text-slate-400 hover:text-zinc-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Framed Preview Stage */}
          <div className="bg-[#131720] border border-[#232936] rounded-2xl p-3 sm:p-4 space-y-3">
            <button
              type="button"
              onClick={() => setLightboxIndex(activeScreenIndex >= 0 ? activeScreenIndex : 0)}
              aria-label={`${activeScreen.label} — ${t.rateEverythingPage.expandPreviewLabel}`}
              className="group relative block w-full text-left bg-[#080A0D] border border-[#232936] rounded-xl overflow-hidden cursor-pointer hover:border-teal-500/60 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeScreen.key}
                  initial={shouldReduceMotion ? false : {opacity: 0.35, scale: 0.995}}
                  animate={{opacity: 1, scale: 1}}
                  exit={shouldReduceMotion ? undefined : {opacity: 0.35}}
                  transition={{duration: 0.2, ease: 'easeOut'}}
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
                className="absolute bottom-3.5 right-3.5 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0C0E12]/90 backdrop-blur-sm border border-[#2A3242] text-xs font-medium text-zinc-100 group-hover:bg-[#0F766E] group-hover:border-[#0F766E] transition-colors"
                aria-hidden="true"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t.rateEverythingPage.expandPreviewLabel}</span>
              </span>
            </button>

            <div className="px-2 py-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm">
              <p className="text-slate-300">{activeScreen.note}</p>
              <span className="font-mono text-xs text-teal-400 font-medium tabular-nums shrink-0">
                {String(activeScreenIndex + 1).padStart(2, '0')} / {String(screenItems.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* 3-Column Screen Selector Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {screenItems.map((item, idx) => {
              const isSelected = activeScreenTab === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setActiveScreenTab(item.key)}
                  onDoubleClick={() => setLightboxIndex(idx)}
                  aria-pressed={isSelected}
                  className={`group text-left bg-[#131720] border rounded-xl overflow-hidden transition-colors cursor-pointer ${
                    isSelected
                      ? 'border-teal-500 ring-1 ring-teal-500/30'
                      : 'border-[#232936] hover:border-slate-600'
                  }`}
                >
                  <MediaFrame
                    src={item.src}
                    alt={item.label}
                    fallbackTitle={item.label}
                    className="aspect-[16/9] border-0 border-b border-[#232936] rounded-none bg-[#080A0D]"
                    imgClassName="object-top"
                  />
                  <div className="p-4 space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`font-display text-sm font-bold ${
                          isSelected ? 'text-teal-400' : 'text-zinc-100 group-hover:text-white'
                        }`}
                      >
                        {item.label}
                      </span>
                      <span className="font-mono text-[11px] text-slate-400 tabular-nums shrink-0">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                      {item.note}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Section 3: Technologies Explored (HTML, CSS, TypeScript, SQL, etc.) */}
        <section id="stack" className="scroll-mt-24 border-t border-[#232936] pt-14 space-y-8">
          <div className="space-y-2 max-w-2xl">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {t.rateEverythingPage.stackHeading}
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              {t.rateEverythingPage.stackLead}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {t.rateEverythingPage.techExperiments.map((item, idx) => {
              const Icon = TECH_ICONS[idx % TECH_ICONS.length];
              return (
                <article
                  key={item.title}
                  className="bg-[#131720] border border-[#232936] rounded-2xl p-6 sm:p-7 space-y-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-xs font-medium text-teal-400">
                      {item.tag}
                    </span>
                    <span className="w-8 h-8 rounded-lg bg-[#181D27] border border-[#273041] text-teal-400 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-display text-xl font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="bg-[#131720]/80 border border-[#232936] rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="font-mono text-xs font-medium text-slate-400">
              {t.rateEverythingPage.alsoTriedLabel}
            </span>
            <p className="text-xs sm:text-sm font-medium text-zinc-200">
              {t.rateEverythingPage.alsoTriedItems.map((item, idx) => (
                <span key={item}>
                  {item}
                  {idx < t.rateEverythingPage.alsoTriedItems.length - 1 && (
                    <span className="mx-2 text-slate-600" aria-hidden="true">
                      ·
                    </span>
                  )}
                </span>
              ))}
            </p>
          </div>
        </section>

        {/* Cross-Link to OmniDesk */}
        <section className="border-t border-[#232936] pt-12">
          <div className="bg-[#131720] border border-[#232936] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <p className="font-mono text-xs font-medium text-slate-400">
                {t.rateEverythingPage.nextProjectLabel}
              </p>
              <p className="mt-1 font-display text-xl sm:text-2xl font-bold text-white">
                {t.rateEverythingPage.nextProjectTitle}
              </p>
            </div>
            <a
              href="./omnidesk.html"
              onClick={(e) => handleNav(e, 'omnidesk')}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[42px] text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto"
            >
              <span>{t.rateEverythingPage.nextProjectCta}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
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
            className="w-full max-w-5xl bg-[#131720] border border-[#232936] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-[#232936]">
              <h3 className="font-display text-base font-semibold text-white truncate">
                {activeLightboxScreen.label}
              </h3>
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-mono text-xs text-slate-400 tabular-nums mr-1">
                  {lightboxIndex + 1} / {screenItems.length}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex((lightboxIndex - 1 + screenItems.length) % screenItems.length)
                  }
                  aria-label={t.rateEverythingPage.lightboxLabels.prevScreenLabel}
                  className="p-2 text-zinc-200 hover:text-teal-400 bg-[#181D27] border border-[#273041] rounded-lg transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxIndex((lightboxIndex + 1) % screenItems.length)}
                  aria-label={t.rateEverythingPage.lightboxLabels.nextScreenLabel}
                  className="p-2 text-zinc-200 hover:text-teal-400 bg-[#181D27] border border-[#273041] rounded-lg transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  aria-label={t.rateEverythingPage.lightboxLabels.closeLabel}
                  className="p-2 text-zinc-200 hover:text-teal-400 bg-[#181D27] border border-[#273041] rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="bg-[#080A0D] p-2 sm:p-4">
              <img
                src={activeLightboxScreen.src}
                alt={activeLightboxScreen.label}
                className="w-full max-h-[75vh] object-contain mx-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
