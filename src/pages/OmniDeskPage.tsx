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
    <div className="min-h-screen bg-[#09090B] text-zinc-100">
      {/* Strict 3-Zone Header */}
      <header className="sticky top-0 z-40 h-16 bg-[#09090B]/95 backdrop-blur-sm border-b border-zinc-800/75">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-8">
          {/* Zone 1: Brand Lockup with Uploaded OmniDesk Logo */}
          <a
            href="#overview"
            className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 py-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-400"
          >
            <img
              src={MEDIA_ASSETS.omnideskLogo}
              alt={t.omnideskPage.appName}
              referrerPolicy="no-referrer"
              className="w-7 h-7 rounded-[7px] shrink-0"
            />
            <span className="font-display text-base font-semibold tracking-tight text-zinc-50">
              {t.omnideskPage.appName}
            </span>
          </a>

          {/* Zone 2: 4 Clean Single-Line Nav Links */}
          <nav className="hidden md:flex items-center gap-7" aria-label={t.omnideskPage.appName}>
            <a
              href="#overview"
              className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors duration-150 whitespace-nowrap shrink-0 py-1.5"
            >
              {t.omnideskPage.navLinks.overview}
            </a>
            <a
              href="#architecture"
              className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors duration-150 whitespace-nowrap shrink-0 py-1.5"
            >
              {t.omnideskPage.navLinks.architecture}
            </a>
            <a
              href="#showcase"
              className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors duration-150 whitespace-nowrap shrink-0 py-1.5"
            >
              {t.omnideskPage.navLinks.showcase}
            </a>
            <a
              href="#catalog"
              className="text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors duration-150 whitespace-nowrap shrink-0 py-1.5"
            >
              {t.omnideskPage.navLinks.catalog}
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center shrink-0">
            <a
              href={EXTERNAL_LINKS.omnideskLive}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 min-h-[38px] text-xs font-semibold text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
            >
              <span>{t.omnideskPage.liveAppCta}</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section 1: Minimal Editorial Hero & Workspace Frame */}
        <section id="overview" className="pt-8 pb-16 sm:pt-12 sm:pb-24 space-y-12">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-800/70">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm">
              <a
                href="./index.html"
                onClick={(e) => handleNav(e, 'home')}
                className="inline-flex items-center gap-1.5 font-medium text-zinc-400 hover:text-zinc-100 transition-colors duration-150 whitespace-nowrap"
              >
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{t.omnideskPage.backToPortfolio}</span>
              </a>
              <span className="text-zinc-700" aria-hidden="true">
                /
              </span>
              <span className="text-zinc-500">{t.omnideskPage.metaLine}</span>
            </div>
            <LanguageSwitcher tone="indigo" />
          </div>

          <motion.div
            initial={shouldReduceMotion ? false : {opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.32, ease: [0.16, 1, 0.3, 1]}}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end"
          >
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-4">
                <img
                  src={MEDIA_ASSETS.omnideskLogo}
                  alt={t.omnideskPage.appName}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-[14px] shrink-0"
                />
                <div className="min-w-0">
                  <p className="font-display text-lg sm:text-xl font-semibold text-zinc-100 leading-tight">
                    {t.omnideskPage.appName}
                  </p>
                  <p className="mt-0.5 text-xs sm:text-sm text-zinc-500">
                    {t.omnideskPage.metrics.runtimeValue} · {t.omnideskPage.metrics.securityValue}
                  </p>
                </div>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-zinc-50 leading-[1.06] max-w-3xl text-balance">
                {t.omnideskPage.title}
              </h1>
              <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl">
                {t.omnideskPage.lead}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-wrap lg:flex-col lg:items-end gap-3">
              <a
                href={EXTERNAL_LINKS.omnideskLive}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] text-sm font-semibold text-white bg-[#4F46E5] hover:bg-[#4338CA] rounded-md transition-colors duration-150 whitespace-nowrap shrink-0"
              >
                <span>{t.omnideskPage.liveAppCta}</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <div className="flex items-center gap-5 pt-1">
                <a
                  href="#catalog"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-300 hover:text-white transition-colors duration-150 whitespace-nowrap"
                >
                  <span>{t.omnideskPage.exploreCatalogCta}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
                <a
                  href={EXTERNAL_LINKS.omnideskRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors duration-150 whitespace-nowrap"
                >
                  <span>{t.omnideskPage.repoCta}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Single-Elevation Architectural Screenshot Frame */}
          <motion.div
            initial={shouldReduceMotion ? false : {opacity: 0, y: 12}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.36, delay: 0.05, ease: [0.16, 1, 0.3, 1]}}
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(0)}
              aria-label={t.omnideskPage.expandPreviewLabel}
              className="group relative block w-full text-left rounded-xl overflow-hidden border border-zinc-800 hover:border-zinc-600 bg-[#0D0E12] transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
            >
              <MediaFrame
                src={SCREENSHOT_SRC.dashboard}
                alt={t.omnideskPage.heroImageAlt}
                fallbackTitle={t.omnideskPage.appName}
                className="aspect-[16/9] border-0 rounded-none bg-[#0D0E12]"
                imgClassName="object-top transition-transform duration-300 group-hover:scale-[1.01]"
              />
              <span
                className="absolute bottom-3.5 right-3.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#09090B]/90 border border-zinc-800 text-xs font-medium text-zinc-200 group-hover:text-white transition-colors"
                aria-hidden="true"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>{t.omnideskPage.expandPreviewLabel}</span>
              </span>
            </button>
          </motion.div>

          {/* Unboxed Architectural Specification Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 border-y border-zinc-800/80 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800/80">
            <div className="py-6 pr-6">
              <p className="font-display text-2xl sm:text-3xl font-bold text-zinc-50 tabular-nums">
                {totalToolsCount}+
              </p>
              <p className="mt-1 text-xs text-zinc-400">{t.omnideskPage.metrics.toolsLabel}</p>
            </div>
            <div className="py-6 lg:px-6">
              <p className="font-display text-2xl sm:text-3xl font-bold text-zinc-50">
                {t.omnideskPage.metrics.runtimeValue}
              </p>
              <p className="mt-1 text-xs text-zinc-400">{t.omnideskPage.metrics.runtimeLabel}</p>
            </div>
            <div className="py-6 pr-6 lg:px-6">
              <p className="font-display text-2xl sm:text-3xl font-bold text-zinc-50 tabular-nums">
                {t.omnideskPage.metrics.localesValue}
              </p>
              <p className="mt-1 text-xs text-zinc-400">{t.omnideskPage.metrics.localesLabel}</p>
            </div>
            <div className="py-6 lg:pl-6">
              <p className="font-mono text-xl sm:text-2xl font-semibold text-indigo-400 pt-0.5">
                {t.omnideskPage.metrics.securityValue}
              </p>
              <p className="mt-1 text-xs text-zinc-400">{t.omnideskPage.metrics.securityLabel}</p>
            </div>
          </div>
        </section>

        {/* Section 2: System Architecture, Themes, Widgets & Stack */}
        <section
          id="architecture"
          className="scroll-mt-20 py-16 sm:py-24 border-t border-zinc-800/75 space-y-14"
        >
          <div className="max-w-2xl space-y-3">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-50 text-balance">
              {t.omnideskPage.architectureHeading}
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              {t.omnideskPage.architectureLead}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
            {/* Left Column: Hairline Architectural Principles + Themes & Widgets */}
            <div className="lg:col-span-6 space-y-12">
              <div className="border-t border-zinc-800/80 divide-y divide-zinc-800/80">
                {t.omnideskPage.highlights.map((item, idx) => (
                  <div key={item.title} className="py-5 space-y-1.5">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs text-indigo-400 tabular-nums shrink-0">
                        {String(idx + 1).padStart(2, '0')}.
                      </span>
                      <h3 className="text-sm sm:text-base font-semibold text-zinc-100">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed pl-7">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-8 pt-2">
                <div className="space-y-2.5">
                  <h3 className="text-xs font-medium text-zinc-500">
                    {t.omnideskPage.themesHeading}
                  </h3>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {t.omnideskPage.themesList.map((themeName, idx) => (
                      <span key={themeName}>
                        {themeName}
                        {idx < t.omnideskPage.themesList.length - 1 && (
                          <span className="mx-2 text-zinc-700" aria-hidden="true">
                            ·
                          </span>
                        )}
                      </span>
                    ))}
                  </p>
                </div>

                <div className="pt-6 border-t border-zinc-800/80 space-y-3">
                  <h3 className="text-xs font-medium text-zinc-500">
                    {t.omnideskPage.widgetsHeading}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                    {t.omnideskPage.widgetsList.map((widget, idx) => (
                      <div key={widget} className="flex items-baseline gap-2.5 text-sm text-zinc-300">
                        <span className="font-mono text-xs text-zinc-600 tabular-nums">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span>{widget}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Technical Stack Specification Ledger */}
            <div className="lg:col-span-6 space-y-4">
              <h3 className="font-display text-lg font-semibold text-zinc-100">
                {t.omnideskPage.stackHeading}
              </h3>
              <dl className="border-t border-zinc-800/80 divide-y divide-zinc-800/80">
                {t.omnideskPage.stackItems.map((row) => (
                  <div key={row.layer} className="py-5 space-y-1.5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <dt className="text-sm font-semibold text-zinc-100">{row.layer}</dt>
                      <dd className="font-mono text-xs text-indigo-400">{row.technologies}</dd>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed">{row.note}</p>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Section 3: Interactive 10-Screen Module Showcase */}
        <section
          id="showcase"
          className="scroll-mt-20 py-16 sm:py-24 border-t border-zinc-800/75 space-y-12"
        >
          <div className="max-w-2xl space-y-3">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-50 text-balance">
              {t.omnideskPage.showcaseHeading}
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              {t.omnideskPage.showcaseLead}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5 border-t border-zinc-800/80 divide-y divide-zinc-800/70">
              {screenshots.map((shot, idx) => {
                const isSelected = idx === activeShotIndex;
                return (
                  <button
                    key={shot.id}
                    type="button"
                    onClick={() => setActiveShotIndex(idx)}
                    aria-pressed={isSelected}
                    className={`w-full text-left py-3.5 px-2 transition-colors duration-150 cursor-pointer flex items-start gap-3.5 ${
                      isSelected
                        ? 'text-zinc-50 bg-zinc-900/55'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/25'
                    }`}
                  >
                    <span
                      className={`font-mono text-xs tabular-nums pt-0.5 shrink-0 ${
                        isSelected ? 'text-indigo-400' : 'text-zinc-600'
                      }`}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0 space-y-1">
                      <p className="text-sm font-medium leading-snug">{shot.title}</p>
                      {isSelected && (
                        <p className="text-xs text-zinc-400 leading-relaxed">{shot.caption}</p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-7 lg:sticky lg:top-24 space-y-4">
              {activeShot && (
                <>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(activeShotIndex)}
                    aria-label={activeShot.title}
                    className="group relative block w-full text-left rounded-xl overflow-hidden border border-zinc-800 hover:border-zinc-600 bg-[#0D0E12] transition-colors duration-150 cursor-pointer"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeShot.id}
                        initial={shouldReduceMotion ? false : {opacity: 0, y: 4}}
                        animate={{opacity: 1, y: 0}}
                        exit={shouldReduceMotion ? undefined : {opacity: 0, y: -4}}
                        transition={{duration: 0.16, ease: [0.16, 1, 0.3, 1]}}
                      >
                        <MediaFrame
                          src={SCREENSHOT_SRC[activeShot.id]}
                          alt={activeShot.title}
                          fallbackTitle={activeShot.title}
                          className="aspect-[16/10] border-0 rounded-none bg-[#0D0E12]"
                          imgClassName="object-top transition-transform duration-300 group-hover:scale-[1.01]"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </button>

                  <div className="flex items-center justify-between gap-4 pt-1">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-zinc-100 truncate">
                        {activeShot.title}
                      </p>
                      <p className="text-xs text-zinc-400 truncate mt-0.5">{activeShot.caption}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="font-mono text-xs text-zinc-500 tabular-nums mr-1.5">
                        {String(activeShotIndex + 1).padStart(2, '0')} /{' '}
                        {String(screenshots.length).padStart(2, '0')}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveShotIndex(
                            (activeShotIndex - 1 + screenshots.length) % screenshots.length,
                          )
                        }
                        aria-label={t.omnideskPage.galleryPrevLabel}
                        className="p-2 text-zinc-400 hover:text-zinc-100 border border-zinc-800 hover:border-zinc-600 rounded-md transition-colors cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveShotIndex((activeShotIndex + 1) % screenshots.length)
                        }
                        aria-label={t.omnideskPage.galleryNextLabel}
                        className="p-2 text-zinc-400 hover:text-zinc-100 border border-zinc-800 hover:border-zinc-600 rounded-md transition-colors cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setLightboxIndex(activeShotIndex)}
                        aria-label={t.omnideskPage.expandPreviewLabel}
                        className="p-2 text-zinc-400 hover:text-zinc-100 border border-zinc-800 hover:border-zinc-600 rounded-md transition-colors cursor-pointer"
                      >
                        <Maximize2 className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Section 4: Extensible Modular Tool Directory */}
        <section
          id="catalog"
          className="scroll-mt-20 py-16 sm:py-24 border-t border-zinc-800/75 space-y-10"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-50 text-balance">
                {t.omnideskPage.catalogHeading}
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                {t.omnideskPage.catalogLead}
              </p>
            </div>

            <div className="relative w-full lg:w-72 shrink-0">
              <Search
                className="w-4 h-4 text-zinc-500 absolute left-0 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.omnideskPage.searchPlaceholder}
                aria-label={t.omnideskPage.searchPlaceholder}
                className="w-full pl-7 pr-8 py-2.5 min-h-[42px] text-sm text-zinc-100 placeholder:text-zinc-500 bg-transparent border-b border-zinc-800 focus:outline-none focus:border-indigo-400 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label={t.omnideskPage.clearSearchLabel}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-1.5 text-zinc-400 hover:text-zinc-100 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          {/* Typographic Underline Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800/80">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
              <button
                type="button"
                onClick={() => setSelectedFilter('all')}
                aria-pressed={selectedFilter === 'all'}
                className={`py-2.5 text-xs sm:text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedFilter === 'all'
                    ? 'text-zinc-50 border-indigo-400'
                    : 'text-zinc-500 border-transparent hover:text-zinc-200'
                }`}
              >
                <span>{t.omnideskPage.allToolsFilter}</span>
                <span className="ml-1.5 font-mono text-xs opacity-70 tabular-nums">
                  {totalToolsCount}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedFilter('basics')}
                aria-pressed={selectedFilter === 'basics'}
                className={`py-2.5 text-xs sm:text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedFilter === 'basics'
                    ? 'text-zinc-50 border-indigo-400'
                    : 'text-zinc-500 border-transparent hover:text-zinc-200'
                }`}
              >
                <span>{t.omnideskPage.everydayBasicsFilter}</span>
                <span className="ml-1.5 font-mono text-xs opacity-70 tabular-nums">
                  {everydayBasicsCount}
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
                    className={`py-2.5 text-xs sm:text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isSelected
                        ? 'text-zinc-50 border-indigo-400'
                        : 'text-zinc-500 border-transparent hover:text-zinc-200'
                    }`}
                  >
                    <span>{cat.title}</span>
                    <span className="ml-1.5 font-mono text-xs opacity-70 tabular-nums">
                      {cat.tools.length}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="font-mono text-xs text-zinc-500 tabular-nums py-2 shrink-0">
              {t.omnideskPage.showingCountPrefix} {totalVisibleTools}{' '}
              {t.omnideskPage.toolsUnitLabel}
            </p>
          </div>

          {visibleCategories.length === 0 ? (
            <p className="py-12 text-sm text-zinc-400">{t.omnideskPage.searchEmpty}</p>
          ) : (
            <div className="space-y-14">
              {visibleCategories.map((category, catIdx) => (
                <div key={category.id} className="space-y-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="font-display text-lg sm:text-xl font-semibold text-zinc-100">
                        <span className="font-mono text-xs text-indigo-400 mr-2.5 tabular-nums">
                          {String(catIdx + 1).padStart(2, '0')}.
                        </span>
                        {category.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-500">{category.subtitle}</p>
                    </div>
                    <span className="font-mono text-xs text-zinc-500 tabular-nums shrink-0">
                      {category.tools.length} {t.omnideskPage.toolsUnitLabel}
                    </span>
                  </div>

                  {/* Swiss Architectural Hairline Index Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 border-t border-zinc-800/80">
                    {category.tools.map((tool, toolIdx) => (
                      <div
                        key={tool.id}
                        className="py-4 pr-4 md:odd:pr-8 md:even:pl-8 border-b border-zinc-800/70 md:even:border-l md:even:border-zinc-800/70 hover:bg-zinc-900/35 transition-colors duration-150 flex items-baseline gap-3.5"
                      >
                        <span className="font-mono text-xs text-zinc-600 tabular-nums w-5 shrink-0">
                          {String(toolIdx + 1).padStart(2, '0')}
                        </span>
                        <div className="min-w-0 space-y-1">
                          <h4 className="text-sm font-medium text-zinc-100 leading-snug">
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

        {/* Section 5: Next Project Cross-Link */}
        <section className="py-14 border-t border-zinc-800/75 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-medium text-zinc-500">{t.omnideskPage.nextProjectLabel}</p>
            <p className="mt-1 font-display text-xl sm:text-2xl font-bold text-zinc-100">
              {t.omnideskPage.nextProjectTitle}
            </p>
          </div>
          <a
            href="./rate-everything.html"
            onClick={(e) => handleNav(e, 'rate-everything')}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[42px] text-sm font-semibold text-zinc-950 bg-zinc-100 hover:bg-white rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 self-start sm:self-auto"
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
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              initial={shouldReduceMotion ? false : {opacity: 0, scale: 0.985}}
              animate={{opacity: 1, scale: 1}}
              exit={shouldReduceMotion ? undefined : {opacity: 0, scale: 0.985}}
              transition={{duration: 0.16, ease: [0.16, 1, 0.3, 1]}}
              className="w-full max-w-5xl bg-[#0D0E12] border border-zinc-800 rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-zinc-800">
                <div className="min-w-0">
                  <h3 className="font-display text-base font-semibold text-zinc-100 truncate">
                    {activeLightboxItem.title}
                  </h3>
                  <p className="text-xs text-zinc-400 truncate">{activeLightboxItem.caption}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="font-mono text-xs text-zinc-500 tabular-nums mr-1.5">
                    {String(lightboxIndex + 1).padStart(2, '0')} /{' '}
                    {String(screenshots.length).padStart(2, '0')}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex(
                        (lightboxIndex - 1 + screenshots.length) % screenshots.length,
                      )
                    }
                    aria-label={t.omnideskPage.galleryPrevLabel}
                    className="p-2 text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-600 rounded-md transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex((lightboxIndex + 1) % screenshots.length)}
                    aria-label={t.omnideskPage.galleryNextLabel}
                    className="p-2 text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-600 rounded-md transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(null)}
                    aria-label={t.omnideskPage.galleryCloseLabel}
                    className="p-2 text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-600 rounded-md transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="bg-[#09090B] p-2 sm:p-4">
                <img
                  src={SCREENSHOT_SRC[activeLightboxItem.id]}
                  alt={activeLightboxItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full max-h-[75vh] object-contain mx-auto rounded-md"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
