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

function AtmosphericBackdrop() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 contain-strict"
      aria-hidden="true"
    >
      {/* Minimalist coordinate dot-matrix grid */}
      <div
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage: 'radial-gradient(rgba(165, 180, 252, 0.16) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 85% 65% at 50% 20%, black 25%, transparent 100%)',
        }}
      />

      {/* Baked radial ambient gradients (no expensive CSS blur filter) */}
      <div
        className="omnidesk-float-a absolute -top-48 -left-36 w-[640px] h-[640px] rounded-full opacity-70"
        style={{
          background:
            'radial-gradient(circle at center, rgba(79, 70, 229, 0.18) 0%, rgba(79, 70, 229, 0.05) 45%, transparent 72%)',
        }}
      />

      <div
        className="omnidesk-float-b absolute top-[18%] -right-44 w-[580px] h-[580px] rounded-full opacity-65"
        style={{
          background:
            'radial-gradient(circle at center, rgba(34, 211, 238, 0.12) 0%, rgba(56, 189, 248, 0.03) 48%, transparent 72%)',
        }}
      />

      <div
        className="omnidesk-float-c absolute -bottom-44 left-[22%] w-[620px] h-[480px] rounded-full opacity-55"
        style={{
          background:
            'radial-gradient(circle at center, rgba(124, 58, 237, 0.12) 0%, rgba(99, 102, 241, 0.03) 48%, transparent 72%)',
        }}
      />

      {/* Minimalist futuristic orbital spheres (pure compositor transform, zero backdrop-blur) */}
      <div
        className="omnidesk-float-a hidden sm:block absolute top-28 right-[10%] w-36 h-36 rounded-full border border-white/[0.08]"
        style={{
          background:
            'radial-gradient(120% 120% at 28% 25%, rgba(255,255,255,0.08) 0%, rgba(99,102,241,0.04) 45%, rgba(255,255,255,0.005) 100%)',
          boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.14)',
        }}
      />

      <div
        className="omnidesk-float-b hidden md:block absolute top-[46%] left-[5%] w-24 h-24 rounded-full border border-white/[0.07]"
        style={{
          background:
            'radial-gradient(120% 120% at 30% 25%, rgba(34,211,238,0.08) 0%, rgba(255,255,255,0.015) 55%, transparent 100%)',
          boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.12)',
        }}
      />

      <div
        className="omnidesk-float-c hidden lg:block absolute bottom-20 right-[12%] w-44 h-44 rounded-full border border-white/[0.05]"
        style={{
          background:
            'radial-gradient(120% 120% at 70% 25%, rgba(129,140,248,0.06) 0%, rgba(255,255,255,0.01) 50%, transparent 100%)',
        }}
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
    <div className="relative min-h-screen bg-[#05060A] text-zinc-100 overflow-x-clip">
      <AtmosphericBackdrop />

      {/* Minimalist 3-Zone Header */}
      <header className="sticky top-0 z-40 h-16 bg-[#05060A]/80 backdrop-blur-md border-b border-white/[0.08]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-8">
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

          <nav className="hidden md:flex items-center gap-7" aria-label={t.omnideskPage.appName}>
            <a
              href="#overview"
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors whitespace-nowrap shrink-0 py-2"
            >
              {t.omnideskPage.navLinks.overview}
            </a>
            <a
              href="#architecture"
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors whitespace-nowrap shrink-0 py-2"
            >
              {t.omnideskPage.navLinks.architecture}
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
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={EXTERNAL_LINKS.omnideskRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center gap-1.5 px-3 py-2 min-h-[38px] text-xs font-semibold text-zinc-300 hover:text-white border border-white/[0.1] hover:border-white/[0.2] rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <span>{t.omnideskPage.repoCta}</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
            <a
              href={EXTERNAL_LINKS.omnideskLive}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 min-h-[38px] text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 border border-indigo-400/30 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <span>{t.omnideskPage.liveAppCta}</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section 1: Futuristic Minimal Hero & Workspace Frame */}
        <section id="overview" className="pt-10 pb-16 sm:pt-14 sm:pb-20 space-y-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs sm:text-sm font-medium text-zinc-400">
              {t.omnideskPage.metaLine}
            </p>
            <LanguageSwitcher />
          </div>

          <motion.div
            initial={shouldReduceMotion ? false : {opacity: 0, y: 12}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.38, ease: [0.16, 1, 0.3, 1]}}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end"
          >
            <div className="lg:col-span-8 space-y-5">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-white leading-[1.06] max-w-3xl text-balance">
                {t.omnideskPage.title}
              </h1>
              <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl">
                {t.omnideskPage.lead}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-wrap lg:justify-end items-center gap-3">
              <a
                href={EXTERNAL_LINKS.omnideskLive}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 border border-indigo-400/30 rounded-lg shadow-[0_8px_28px_-8px_rgba(99,102,241,0.5)] transition-colors duration-150 whitespace-nowrap shrink-0"
              >
                <span>{t.omnideskPage.liveAppCta}</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="#catalog"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] text-sm font-semibold text-zinc-100 bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.1] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0"
              >
                <span>{t.omnideskPage.exploreCatalogCta}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </motion.div>

          {/* Minimalist Specular Hero Workspace Frame */}
          <motion.div
            initial={shouldReduceMotion ? false : {opacity: 0, y: 14}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.44, delay: 0.06, ease: [0.16, 1, 0.3, 1]}}
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(0)}
              aria-label={t.omnideskPage.expandPreviewLabel}
              className="group relative block w-full text-left rounded-2xl p-1 bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.015] border border-white/[0.1] hover:border-indigo-400/40 shadow-[0_24px_70px_-24px_rgba(79,70,229,0.28)] transition-colors duration-200 cursor-pointer"
            >
              <div className="relative rounded-[12px] overflow-hidden bg-[#05060A]">
                <MediaFrame
                  src={SCREENSHOT_SRC.dashboard}
                  alt={t.omnideskPage.heroImageAlt}
                  fallbackTitle={t.omnideskPage.appName}
                  className="aspect-[16/9] border-0 rounded-none bg-[#05060A]"
                  imgClassName="object-top transition-transform duration-300 group-hover:scale-[1.01]"
                />
                <span
                  className="absolute bottom-3.5 right-3.5 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#05060A]/85 border border-white/[0.12] text-xs font-medium text-zinc-200 group-hover:text-white transition-colors"
                  aria-hidden="true"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>{t.omnideskPage.expandPreviewLabel}</span>
                </span>
              </div>
            </button>
          </motion.div>

          {/* Hairline Specification Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 rounded-xl bg-white/[0.02] border border-white/[0.08] divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08]">
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

        {/* Section 2: System Architecture, Themes, Widgets & Stack (Before Showcase & Catalog) */}
        <section
          id="architecture"
          className="scroll-mt-20 py-16 sm:py-20 border-t border-white/[0.08] space-y-12"
        >
          <div className="max-w-2xl space-y-2">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white text-balance">
              {t.omnideskPage.architectureHeading}
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              {t.omnideskPage.architectureLead}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Architectural Capabilities + Themes + Widgets */}
            <div className="lg:col-span-6 space-y-8">
              <div className="rounded-xl bg-white/[0.015] border border-white/[0.08] divide-y divide-white/[0.08]">
                {t.omnideskPage.highlights.map((item, idx) => (
                  <div key={item.title} className="p-5 sm:p-6 space-y-1.5">
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-mono text-xs text-indigo-400 tabular-nums">
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

              <div className="rounded-xl p-6 bg-white/[0.015] border border-white/[0.08] space-y-6">
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

            {/* Right Column: Technical Stack Specification */}
            <div className="lg:col-span-6 space-y-4">
              <h3 className="font-display text-lg font-semibold text-white">
                {t.omnideskPage.stackHeading}
              </h3>
              <div className="rounded-xl bg-white/[0.015] border border-white/[0.08] divide-y divide-white/[0.08]">
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

        {/* Section 3: Interactive 10-Screen Module Showcase */}
        <section
          id="showcase"
          className="scroll-mt-20 py-16 sm:py-20 border-t border-white/[0.08] space-y-10"
        >
          <div className="max-w-2xl space-y-2">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white text-balance">
              {t.omnideskPage.showcaseHeading}
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              {t.omnideskPage.showcaseLead}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-5 space-y-1">
              {screenshots.map((shot, idx) => {
                const isSelected = idx === activeShotIndex;
                return (
                  <button
                    key={shot.id}
                    type="button"
                    onClick={() => setActiveShotIndex(idx)}
                    aria-pressed={isSelected}
                    className={`relative w-full text-left py-3 px-3.5 rounded-xl border transition-colors duration-150 cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? 'text-white bg-white/[0.04] border-white/[0.12]'
                        : 'text-zinc-400 border-transparent hover:text-zinc-200 hover:bg-white/[0.02]'
                    }`}
                  >
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

            <div className="lg:col-span-7 lg:sticky lg:top-24">
              {activeShot && (
                <div className="rounded-2xl p-1 bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.01] border border-white/[0.1] shadow-[0_24px_64px_-24px_rgba(34,211,238,0.16)]">
                  <div className="rounded-[12px] overflow-hidden bg-[#05060A]">
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(activeShotIndex)}
                      aria-label={activeShot.title}
                      className="group relative block w-full text-left cursor-pointer"
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
                            className="aspect-[16/10] border-0 rounded-none bg-[#05060A]"
                            imgClassName="object-top transition-transform duration-300 group-hover:scale-[1.01]"
                          />
                        </motion.div>
                      </AnimatePresence>
                    </button>

                    <div className="px-5 py-4 border-t border-white/[0.08] flex items-center justify-between gap-4 bg-white/[0.015]">
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
                          className="p-2 text-zinc-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] rounded-lg transition-colors cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setActiveShotIndex((activeShotIndex + 1) % screenshots.length)
                          }
                          aria-label={t.omnideskPage.galleryNextLabel}
                          className="p-2 text-zinc-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] rounded-lg transition-colors cursor-pointer"
                        >
                          <ChevronRight className="w-4 h-4" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setLightboxIndex(activeShotIndex)}
                          aria-label={t.omnideskPage.expandPreviewLabel}
                          className="p-2 text-zinc-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] rounded-lg transition-colors cursor-pointer"
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

        {/* Section 4: Extensible Modular Tool Directory */}
        <section
          id="catalog"
          className="scroll-mt-20 py-16 sm:py-20 border-t border-white/[0.08] space-y-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white text-balance">
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
                className="w-full pl-10 pr-9 py-2.5 min-h-[42px] text-sm text-white placeholder:text-zinc-500 bg-white/[0.03] border border-white/[0.1] rounded-lg focus:outline-none focus:border-indigo-400/60 transition-colors"
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

          {/* Segmented Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedFilter('all')}
                aria-pressed={selectedFilter === 'all'}
                className={`px-3 py-1.5 min-h-[36px] text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedFilter === 'all'
                    ? 'text-white bg-indigo-500/20 border-indigo-400/40'
                    : 'text-zinc-400 border-transparent hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <span>{t.omnideskPage.allToolsFilter}</span>
                <span className="ml-1.5 font-mono opacity-75 tabular-nums">({totalToolsCount})</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedFilter('basics')}
                aria-pressed={selectedFilter === 'basics'}
                className={`px-3 py-1.5 min-h-[36px] text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedFilter === 'basics'
                    ? 'text-white bg-indigo-500/20 border-indigo-400/40'
                    : 'text-zinc-400 border-transparent hover:text-white hover:bg-white/[0.04]'
                }`}
              >
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
                    className={`px-3 py-1.5 min-h-[36px] text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isSelected
                        ? 'text-white bg-indigo-500/20 border-indigo-400/40'
                        : 'text-zinc-400 border-transparent hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
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
                        <span className="font-mono text-xs text-indigo-400 mr-2.5 tabular-nums">
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
                        className="p-4 rounded-xl bg-white/[0.015] hover:bg-white/[0.04] border border-white/[0.07] hover:border-white/[0.15] transition-colors duration-150 flex items-baseline gap-3.5"
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
              className="w-full max-w-5xl bg-[#090B12]/95 border border-white/[0.12] rounded-2xl overflow-hidden shadow-2xl"
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

              <div className="bg-[#05060A] p-2 sm:p-4">
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
