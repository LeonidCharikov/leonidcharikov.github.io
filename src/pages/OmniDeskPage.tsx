import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Search,
  X,
} from 'lucide-react';
import {AnimatePresence, motion, useReducedMotion} from 'motion/react';
import {useEffect, useMemo, useState} from 'react';
import {LanguageSwitcher} from '../components/LanguageSwitcher';
import {MediaFrame} from '../components/MediaFrame';
import {EXTERNAL_LINKS, MEDIA_ASSETS} from '../data/links';
import {useI18n} from '../i18n/context';
import type {OmniDeskScreenshotItem, PageRoute} from '../i18n/types';

interface OmniDeskPageProps {
  onNavigate: (route: PageRoute, hash?: string) => void;
}

const SCREENSHOT_SRC: Record<OmniDeskScreenshotItem['id'], string> = {
  dashboard: MEDIA_ASSETS.omnideskScreens.dashboard,
  pdfEditor: MEDIA_ASSETS.omnideskScreens.pdfEditor,
  audioEditor: MEDIA_ASSETS.omnideskScreens.audioEditor,
  hashSuite: MEDIA_ASSETS.omnideskScreens.hashSuite,
  calendar: MEDIA_ASSETS.omnideskScreens.calendar,
  currency: MEDIA_ASSETS.omnideskScreens.currency,
  graph2d: MEDIA_ASSETS.omnideskScreens.graph2d,
  chemistry: MEDIA_ASSETS.omnideskScreens.chemistry,
  randomPicker: MEDIA_ASSETS.omnideskScreens.randomPicker,
  config: MEDIA_ASSETS.omnideskScreens.config,
};

type CatalogFilter = 'all' | 'basics' | string;

function AtmosphericBackdrop({reducedMotion}: {reducedMotion: boolean}) {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* Subtle futuristic spatial grid */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(rgba(165, 180, 252, 0.14) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage:
            'radial-gradient(ellipse 85% 70% at 50% 25%, black 30%, transparent 100%)',
        }}
      />

      {/* Translucent drifting nebula clouds */}
      <motion.div
        animate={
          reducedMotion
            ? undefined
            : {
                x: [0, 36, -18, 0],
                y: [0, -24, 18, 0],
                scale: [1, 1.07, 0.96, 1],
              }
        }
        transition={{duration: 22, repeat: Infinity, ease: 'easeInOut'}}
        className="absolute -top-44 -left-32 w-[560px] h-[560px] rounded-full bg-indigo-600/20 blur-[120px]"
      />

      <motion.div
        animate={
          reducedMotion
            ? undefined
            : {
                x: [0, -40, 22, 0],
                y: [0, 30, -20, 0],
                scale: [1, 0.95, 1.06, 1],
              }
        }
        transition={{duration: 26, repeat: Infinity, ease: 'easeInOut'}}
        className="absolute top-[18%] -right-40 w-[520px] h-[520px] rounded-full bg-cyan-500/14 blur-[130px]"
      />

      <motion.div
        animate={
          reducedMotion
            ? undefined
            : {
                x: [0, 28, -24, 0],
                y: [0, -28, 16, 0],
              }
        }
        transition={{duration: 28, repeat: Infinity, ease: 'easeInOut'}}
        className="absolute bottom-[-12%] left-[22%] w-[600px] h-[420px] rounded-full bg-violet-600/14 blur-[140px]"
      />

      {/* Translucent glass bubbles / spheres */}
      <motion.div
        animate={reducedMotion ? undefined : {y: [0, -18, 0], x: [0, 10, 0]}}
        transition={{duration: 13, repeat: Infinity, ease: 'easeInOut'}}
        className="hidden sm:block absolute top-28 right-[11%] w-36 h-36 rounded-full border border-white/[0.09] bg-gradient-to-br from-white/[0.06] via-indigo-400/[0.03] to-transparent backdrop-blur-[2px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.18)]"
      />

      <motion.div
        animate={reducedMotion ? undefined : {y: [0, 20, 0], x: [0, -12, 0]}}
        transition={{duration: 16, repeat: Infinity, ease: 'easeInOut'}}
        className="hidden md:block absolute top-[44%] left-[5%] w-24 h-24 rounded-full border border-white/[0.08] bg-gradient-to-br from-cyan-300/[0.06] via-white/[0.015] to-transparent backdrop-blur-[2px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.16)]"
      />

      <motion.div
        animate={reducedMotion ? undefined : {y: [0, -14, 0], x: [0, -8, 0]}}
        transition={{duration: 19, repeat: Infinity, ease: 'easeInOut'}}
        className="hidden lg:block absolute top-[62%] right-[7%] w-48 h-48 rounded-full border border-white/[0.06] bg-gradient-to-tl from-indigo-400/[0.05] via-white/[0.01] to-transparent backdrop-blur-[2px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]"
      />

      <motion.div
        animate={reducedMotion ? undefined : {y: [0, 14, 0], x: [0, 8, 0]}}
        transition={{duration: 14, repeat: Infinity, ease: 'easeInOut'}}
        className="hidden sm:block absolute bottom-24 left-[14%] w-16 h-16 rounded-full border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-[2px]"
      />
    </div>
  );
}

export function OmniDeskPage({onNavigate}: OmniDeskPageProps) {
  const {t} = useI18n();
  const shouldReduceMotion = useReducedMotion() ?? false;
  const [selectedFilter, setSelectedFilter] = useState<CatalogFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeShotIndex, setActiveShotIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const screenshots = t.omnideskPage.screenshots;
  const activeShot = screenshots[activeShotIndex] ?? screenshots[0];

  const {totalToolsCount, everydayBasicsCount} = useMemo(() => {
    let total = 0;
    let basics = 0;
    for (const cat of t.omnideskPage.categories) {
      total += cat.tools.length;
      for (const tool of cat.tools) {
        if (tool.isEverydayBasic) {
          basics += 1;
        }
      }
    }
    return {totalToolsCount: total, everydayBasicsCount: basics};
  }, [t.omnideskPage.categories]);

  useEffect(() => {
    if (lightboxIndex === null) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxIndex(null);
      } else if (event.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev - 1 + screenshots.length) % screenshots.length,
        );
      } else if (event.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % screenshots.length));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, screenshots.length]);

  const handleNav = (event: React.MouseEvent<HTMLAnchorElement>, route: PageRoute) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    event.preventDefault();
    onNavigate(route);
  };

  const visibleCategories = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return t.omnideskPage.categories
      .filter(
        (cat) =>
          selectedFilter === 'all' || selectedFilter === 'basics' || cat.id === selectedFilter,
      )
      .map((cat) => {
        const filteredTools = cat.tools.filter((tool) => {
          if (selectedFilter === 'basics' && !tool.isEverydayBasic) {
            return false;
          }
          if (!query) {
            return true;
          }
          return (
            tool.title.toLowerCase().includes(query) ||
            tool.description.toLowerCase().includes(query)
          );
        });
        return {
          ...cat,
          tools: filteredTools,
        };
      })
      .filter((cat) => cat.tools.length > 0);
  }, [searchQuery, selectedFilter, t.omnideskPage.categories]);

  const totalVisibleTools = useMemo(
    () => visibleCategories.reduce((sum, cat) => sum + cat.tools.length, 0),
    [visibleCategories],
  );

  const activeLightboxItem = lightboxIndex !== null ? screenshots[lightboxIndex] ?? null : null;

  return (
    <div className="relative min-h-screen bg-[#06070B] text-zinc-100 overflow-x-clip">
      <AtmosphericBackdrop reducedMotion={shouldReduceMotion} />

      {/* Clean 3-Zone Translucent Web Header */}
      <header className="sticky top-0 z-40 h-16 bg-[#06070B]/65 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-8">
          {/* Zone 1: Brand Lockup */}
          <div className="flex items-center gap-2.5 min-w-0 shrink-0">
            <a
              href="./index.html"
              onClick={(e) => handleNav(e, 'home')}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors whitespace-nowrap shrink-0 py-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.omnideskPage.backToPortfolio}</span>
            </a>
            <span className="text-zinc-700" aria-hidden="true">
              /
            </span>
            <a
              href="#overview"
              className="font-display text-base font-semibold tracking-tight text-white whitespace-nowrap shrink-0"
            >
              {t.omnideskPage.appName}
            </a>
          </div>

          {/* Zone 2: Concise Single-Line Section Links */}
          <nav className="hidden md:flex items-center gap-7" aria-label={t.omnideskPage.appName}>
            <a
              href="#overview"
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors whitespace-nowrap shrink-0 py-2"
            >
              {t.omnideskPage.navLinks.overview}
            </a>
            <a
              href="#showcase"
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors whitespace-nowrap shrink-0 py-2"
            >
              {t.omnideskPage.navLinks.showcase}
            </a>
            <a
              href="#catalog"
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors whitespace-nowrap shrink-0 py-2"
            >
              {t.omnideskPage.navLinks.catalog}
            </a>
            <a
              href="#architecture"
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors whitespace-nowrap shrink-0 py-2"
            >
              {t.omnideskPage.navLinks.architecture}
            </a>
          </nav>

          {/* Zone 3: Single Primary Action */}
          <div className="flex items-center shrink-0">
            <a
              href={EXTERNAL_LINKS.omnideskRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 min-h-[38px] text-xs font-semibold text-zinc-950 bg-zinc-100 rounded-lg hover:bg-white transition-colors whitespace-nowrap shrink-0"
            >
              <span>{t.omnideskPage.repoCta}</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section 1: Futuristic Glass Hero & Focal Workspace Stage */}
        <section id="overview" className="pt-10 pb-16 sm:pt-14 sm:pb-20 space-y-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs sm:text-sm font-medium text-zinc-400">
              {t.omnideskPage.metaLine}
            </p>
            <LanguageSwitcher />
          </div>

          <motion.div
            initial={shouldReduceMotion ? false : {opacity: 0, y: 14}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end"
          >
            <div className="lg:col-span-8 space-y-5">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.06] max-w-3xl">
                {t.omnideskPage.title}
              </h1>
              <p className="text-base sm:text-lg text-zinc-300/90 leading-relaxed max-w-2xl">
                {t.omnideskPage.lead}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-wrap lg:justify-end items-center gap-3">
              <a
                href="#catalog"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] text-sm font-semibold text-white bg-indigo-600/90 hover:bg-indigo-500 border border-indigo-400/30 rounded-lg shadow-[0_8px_30px_-8px_rgba(99,102,241,0.55)] transition-all duration-150 whitespace-nowrap shrink-0"
              >
                <span>{t.omnideskPage.exploreCatalogCta}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={EXTERNAL_LINKS.omnideskRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-5 py-3 min-h-[44px] text-sm font-semibold text-zinc-100 bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/[0.12] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0"
              >
                <span>{t.omnideskPage.repoCta}</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </motion.div>

          {/* Translucent Glass Hero Workspace Frame */}
          <motion.div
            initial={shouldReduceMotion ? false : {opacity: 0, y: 18}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1]}}
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(0)}
              aria-label={t.omnideskPage.expandPreviewLabel}
              className="group relative block w-full text-left rounded-2xl p-1.5 bg-white/[0.03] backdrop-blur-xl border border-white/[0.1] hover:border-indigo-400/40 shadow-[0_24px_80px_-20px_rgba(79,70,229,0.28)] transition-colors duration-200 cursor-pointer"
            >
              <div className="relative rounded-[11px] overflow-hidden bg-[#06070B]">
                <MediaFrame
                  src={SCREENSHOT_SRC.dashboard}
                  alt={t.omnideskPage.heroImageAlt}
                  fallbackTitle={t.omnideskPage.appName}
                  className="aspect-[16/9] border-0 rounded-none bg-[#06070B]"
                  imgClassName="object-top transition-transform duration-300 group-hover:scale-[1.01]"
                />
                <span
                  className="absolute bottom-3.5 right-3.5 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/65 backdrop-blur-md border border-white/[0.12] text-xs font-medium text-zinc-200 group-hover:text-white transition-colors"
                  aria-hidden="true"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>{t.omnideskPage.expandPreviewLabel}</span>
                </span>
              </div>
            </button>
          </motion.div>

          {/* Dynamic Glass Specification Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 rounded-2xl bg-white/[0.025] backdrop-blur-xl border border-white/[0.08] divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08]">
            <div className="p-5 sm:p-6">
              <p className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums">
                {totalToolsCount}+
              </p>
              <p className="mt-1 text-xs text-zinc-400">{t.omnideskPage.metrics.toolsLabel}</p>
            </div>
            <div className="p-5 sm:p-6">
              <p className="font-display text-2xl sm:text-3xl font-bold text-white">
                {t.omnideskPage.metrics.runtimeValue}
              </p>
              <p className="mt-1 text-xs text-zinc-400">{t.omnideskPage.metrics.runtimeLabel}</p>
            </div>
            <div className="p-5 sm:p-6">
              <p className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums">
                {t.omnideskPage.metrics.localesValue}
              </p>
              <p className="mt-1 text-xs text-zinc-400">{t.omnideskPage.metrics.localesLabel}</p>
            </div>
            <div className="p-5 sm:p-6">
              <p className="font-display text-2xl sm:text-3xl font-bold text-indigo-300 font-mono">
                {t.omnideskPage.metrics.securityValue}
              </p>
              <p className="mt-1 text-xs text-zinc-400">{t.omnideskPage.metrics.securityLabel}</p>
            </div>
          </div>
        </section>

        {/* Section 2: Interactive 10-Screen Module Showcase */}
        <section id="showcase" className="py-16 sm:py-20 border-t border-white/[0.08] space-y-10">
          <div className="max-w-2xl space-y-2">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {t.omnideskPage.showcaseHeading}
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              {t.omnideskPage.showcaseLead}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Selector Index with Smooth Sliding Glass Indicator */}
            <div className="lg:col-span-5 space-y-1">
              {screenshots.map((shot, idx) => {
                const isSelected = idx === activeShotIndex;
                return (
                  <button
                    key={shot.id}
                    type="button"
                    onClick={() => setActiveShotIndex(idx)}
                    aria-pressed={isSelected}
                    className={`relative w-full text-left py-3 px-3.5 rounded-xl transition-colors duration-150 cursor-pointer flex items-start gap-3 ${
                      isSelected ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="showcase-active-bg"
                        transition={{type: 'spring', stiffness: 380, damping: 32}}
                        className="absolute inset-0 rounded-xl bg-white/[0.05] backdrop-blur-md border border-white/[0.12] -z-10"
                      />
                    )}
                    <span
                      className={`font-mono text-xs tabular-nums pt-0.5 shrink-0 ${
                        isSelected ? 'text-indigo-300' : 'text-zinc-600'
                      }`}
                    >
                      {String(idx + 1).padStart(2, '0')}.
                    </span>
                    <div className="min-w-0 space-y-1">
                      <p className="text-sm font-semibold leading-snug">{shot.title}</p>
                      {isSelected && (
                        <p className="text-xs text-zinc-400 leading-relaxed">{shot.caption}</p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Sticky Translucent Glass Stage */}
            <div className="lg:col-span-7 lg:sticky lg:top-24">
              {activeShot && (
                <div className="rounded-2xl p-1.5 bg-white/[0.03] backdrop-blur-xl border border-white/[0.1] shadow-[0_24px_70px_-24px_rgba(6,182,212,0.18)]">
                  <div className="rounded-[11px] overflow-hidden bg-[#06070B]">
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(activeShotIndex)}
                      aria-label={activeShot.title}
                      className="group relative block w-full text-left cursor-pointer"
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeShot.id}
                          initial={shouldReduceMotion ? false : {opacity: 0, y: 6}}
                          animate={{opacity: 1, y: 0}}
                          exit={shouldReduceMotion ? undefined : {opacity: 0, y: -6}}
                          transition={{duration: 0.18, ease: 'easeOut'}}
                        >
                          <MediaFrame
                            src={SCREENSHOT_SRC[activeShot.id]}
                            alt={activeShot.title}
                            fallbackTitle={activeShot.title}
                            className="aspect-[16/10] border-0 rounded-none bg-[#06070B]"
                            imgClassName="object-top transition-transform duration-300 group-hover:scale-[1.01]"
                          />
                        </motion.div>
                      </AnimatePresence>
                    </button>

                    <div className="px-5 py-4 border-t border-white/[0.08] flex items-center justify-between gap-4 bg-white/[0.02] backdrop-blur-md">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate">
                          {activeShot.title}
                        </p>
                        <p className="text-xs text-zinc-400 truncate mt-0.5">{activeShot.caption}</p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="font-mono text-xs text-zinc-400 tabular-nums mr-1.5">
                          {activeShotIndex + 1} / {screenshots.length}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setActiveShotIndex(
                              (activeShotIndex - 1 + screenshots.length) % screenshots.length,
                            )
                          }
                          aria-label={t.omnideskPage.galleryPrevLabel}
                          className="p-2 text-zinc-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.1] rounded-lg transition-colors cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setActiveShotIndex((activeShotIndex + 1) % screenshots.length)
                          }
                          aria-label={t.omnideskPage.galleryNextLabel}
                          className="p-2 text-zinc-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.1] rounded-lg transition-colors cursor-pointer"
                        >
                          <ChevronRight className="w-4 h-4" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setLightboxIndex(activeShotIndex)}
                          aria-label={t.omnideskPage.expandPreviewLabel}
                          className="p-2 text-zinc-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.1] rounded-lg transition-colors cursor-pointer"
                        >
                          <Maximize2 className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Section 3: Extensible Modular Tool Directory */}
        <section id="catalog" className="py-16 sm:py-20 border-t border-white/[0.08] space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {t.omnideskPage.catalogHeading}
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                {t.omnideskPage.catalogLead}
              </p>
            </div>

            <div className="relative w-full lg:w-80 shrink-0">
              <Search
                className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.omnideskPage.searchPlaceholder}
                aria-label={t.omnideskPage.searchPlaceholder}
                className="w-full pl-10 pr-9 py-2.5 min-h-[42px] text-sm text-white placeholder:text-zinc-500 bg-white/[0.04] backdrop-blur-md border border-white/[0.1] rounded-lg focus:outline-none focus:border-indigo-400/60 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label={t.omnideskPage.clearSearchLabel}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-white cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          {/* Translucent Segmented Filter Bar with Dynamic Counts */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedFilter('all')}
                aria-pressed={selectedFilter === 'all'}
                className={`relative px-3 py-1.5 min-h-[36px] text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedFilter === 'all' ? 'text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {selectedFilter === 'all' && (
                  <motion.span
                    layoutId="catalog-tab-active"
                    transition={{type: 'spring', stiffness: 400, damping: 32}}
                    className="absolute inset-0 rounded-md bg-indigo-500/25 border border-indigo-400/40 -z-10"
                  />
                )}
                <span>{t.omnideskPage.allToolsFilter}</span>
                <span className="ml-1.5 font-mono opacity-75 tabular-nums">({totalToolsCount})</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedFilter('basics')}
                aria-pressed={selectedFilter === 'basics'}
                className={`relative px-3 py-1.5 min-h-[36px] text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedFilter === 'basics' ? 'text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {selectedFilter === 'basics' && (
                  <motion.span
                    layoutId="catalog-tab-active"
                    transition={{type: 'spring', stiffness: 400, damping: 32}}
                    className="absolute inset-0 rounded-md bg-indigo-500/25 border border-indigo-400/40 -z-10"
                  />
                )}
                <span>{t.omnideskPage.everydayBasicsFilter}</span>
                <span className="ml-1.5 font-mono opacity-75 tabular-nums">
                  ({everydayBasicsCount})
                </span>
              </button>

              {t.omnideskPage.categories.map((cat) => {
                const isSelected = selectedFilter === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedFilter(cat.id)}
                    aria-pressed={isSelected}
                    className={`relative px-3 py-1.5 min-h-[36px] text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isSelected ? 'text-white' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="catalog-tab-active"
                        transition={{type: 'spring', stiffness: 400, damping: 32}}
                        className="absolute inset-0 rounded-md bg-indigo-500/25 border border-indigo-400/40 -z-10"
                      />
                    )}
                    <span>{cat.title}</span>
                    <span className="ml-1.5 font-mono opacity-75 tabular-nums">
                      ({cat.tools.length})
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="font-mono text-xs text-zinc-400 tabular-nums shrink-0">
              {t.omnideskPage.showingCountPrefix} {totalVisibleTools} {t.omnideskPage.toolsUnitLabel}
            </p>
          </div>

          {visibleCategories.length === 0 ? (
            <p className="py-12 text-sm text-zinc-400">{t.omnideskPage.searchEmpty}</p>
          ) : (
            <div className="space-y-12">
              {visibleCategories.map((category, catIdx) => (
                <div key={category.id} className="space-y-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="font-display text-lg sm:text-xl font-semibold text-white">
                        <span className="font-mono text-xs text-indigo-300 mr-2.5 tabular-nums">
                          {String(catIdx + 1).padStart(2, '0')}.
                        </span>
                        {category.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-400">{category.subtitle}</p>
                    </div>
                    <span className="font-mono text-xs text-zinc-400 tabular-nums shrink-0">
                      {category.tools.length} {t.omnideskPage.toolsUnitLabel}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {category.tools.map((tool, toolIdx) => (
                      <div
                        key={tool.id}
                        className="p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.045] backdrop-blur-sm border border-white/[0.07] hover:border-white/[0.15] transition-colors duration-150 flex items-baseline gap-3.5"
                      >
                        <span className="font-mono text-xs text-zinc-500 tabular-nums w-5 shrink-0">
                          {String(toolIdx + 1).padStart(2, '0')}
                        </span>
                        <div className="min-w-0 space-y-1">
                          <h4 className="text-sm font-semibold text-zinc-100 leading-snug">
                            {tool.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                            {tool.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Section 4: System Architecture, Themes, Adaptive Widgets & Stack */}
        <section
          id="architecture"
          className="py-16 sm:py-20 border-t border-white/[0.08] space-y-12"
        >
          <div className="max-w-2xl space-y-2">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {t.omnideskPage.architectureHeading}
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              {t.omnideskPage.architectureLead}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Highlights + Themes + Widgets */}
            <div className="lg:col-span-6 space-y-8">
              <div className="rounded-2xl bg-white/[0.025] backdrop-blur-xl border border-white/[0.08] divide-y divide-white/[0.08]">
                {t.omnideskPage.highlights.map((item, idx) => (
                  <div key={item.title} className="p-5 space-y-1.5">
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-mono text-xs text-indigo-300 tabular-nums">
                        {String(idx + 1).padStart(2, '0')}.
                      </span>
                      <h3 className="text-sm sm:text-base font-semibold text-white">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed pl-6">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl p-6 bg-white/[0.025] backdrop-blur-xl border border-white/[0.08] space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-zinc-300">
                    {t.omnideskPage.themesHeading}
                  </h3>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {t.omnideskPage.themesList.map((themeName, idx) => (
                      <span key={themeName}>
                        {themeName}
                        {idx < t.omnideskPage.themesList.length - 1 && (
                          <span className="mx-2 text-zinc-600" aria-hidden="true">
                            ·
                          </span>
                        )}
                      </span>
                    ))}
                  </p>
                </div>

                <div className="pt-5 border-t border-white/[0.08] space-y-2.5">
                  <h3 className="text-xs font-semibold text-zinc-300">
                    {t.omnideskPage.widgetsHeading}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                    {t.omnideskPage.widgetsList.map((widget, idx) => (
                      <div key={widget} className="flex items-baseline gap-2 text-sm text-zinc-300">
                        <span className="font-mono text-xs text-zinc-500 tabular-nums">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span>{widget}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Technical Stack Glass Panel */}
            <div className="lg:col-span-6 space-y-4">
              <h3 className="font-display text-lg font-semibold text-white">
                {t.omnideskPage.stackHeading}
              </h3>
              <div className="rounded-2xl bg-white/[0.025] backdrop-blur-xl border border-white/[0.08] divide-y divide-white/[0.08]">
                {t.omnideskPage.stackItems.map((row) => (
                  <div key={row.layer} className="p-5 sm:p-6 space-y-1.5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="text-sm font-semibold text-white">{row.layer}</span>
                      <span className="font-mono text-xs text-indigo-300">{row.technologies}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{row.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Next Project Cross-Link */}
        <section className="py-12 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-medium text-zinc-500">{t.omnideskPage.nextProjectLabel}</p>
            <p className="mt-1 font-display text-xl font-bold text-white">
              {t.omnideskPage.nextProjectTitle}
            </p>
          </div>
          <a
            href="./rate-everything.html"
            onClick={(e) => handleNav(e, 'rate-everything')}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[42px] text-sm font-semibold text-black bg-amber-500 rounded-lg hover:bg-amber-400 transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto"
          >
            <span>{t.omnideskPage.nextProjectCta}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </section>
      </main>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxItem && lightboxIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={activeLightboxItem.title}
            initial={shouldReduceMotion ? false : {opacity: 0}}
            animate={{opacity: 1}}
            exit={shouldReduceMotion ? undefined : {opacity: 0}}
            transition={{duration: 0.16}}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              initial={shouldReduceMotion ? false : {opacity: 0, scale: 0.98}}
              animate={{opacity: 1, scale: 1}}
              exit={shouldReduceMotion ? undefined : {opacity: 0, scale: 0.98}}
              transition={{duration: 0.18, ease: [0.16, 1, 0.3, 1]}}
              className="w-full max-w-5xl bg-[#090B12]/90 backdrop-blur-2xl border border-white/[0.12] rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-white/[0.08]">
                <div className="min-w-0">
                  <h3 className="font-display text-base font-semibold text-white truncate">
                    {activeLightboxItem.title}
                  </h3>
                  <p className="text-xs text-zinc-400 truncate">{activeLightboxItem.caption}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-xs text-zinc-400 tabular-nums mr-1">
                    {lightboxIndex + 1} / {screenshots.length}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex((lightboxIndex - 1 + screenshots.length) % screenshots.length)
                    }
                    aria-label={t.omnideskPage.galleryPrevLabel}
                    className="p-2 text-zinc-300 hover:text-white bg-white/[0.05] border border-white/[0.1] rounded-lg transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex((lightboxIndex + 1) % screenshots.length)}
                    aria-label={t.omnideskPage.galleryNextLabel}
                    className="p-2 text-zinc-300 hover:text-white bg-white/[0.05] border border-white/[0.1] rounded-lg transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(null)}
                    aria-label={t.omnideskPage.galleryCloseLabel}
                    className="p-2 text-zinc-300 hover:text-white bg-white/[0.05] border border-white/[0.1] rounded-lg transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="bg-[#06070B] p-2 sm:p-4">
                <img
                  src={SCREENSHOT_SRC[activeLightboxItem.id]}
                  alt={activeLightboxItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full max-h-[75vh] object-contain mx-auto rounded-lg"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
