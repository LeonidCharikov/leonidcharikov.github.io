import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calculator,
  ChevronLeft,
  ChevronRight,
  Code2,
  FolderOpen,
  LayoutGrid,
  Maximize2,
  Search,
  ShieldCheck,
  Star,
  X,
} from 'lucide-react';
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
  mainMenu: MEDIA_ASSETS.omnideskScreens.mainMenu,
  chemistry: MEDIA_ASSETS.omnideskScreens.chemistry,
  currency: MEDIA_ASSETS.omnideskScreens.currency,
  graph2d: MEDIA_ASSETS.omnideskScreens.graph2d,
};

export function OmniDeskPage({onNavigate}: OmniDeskPageProps) {
  const {t} = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [starredIds, setStarredIds] = useState<string[]>(['txt-editor', 'docx-pdf']);
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const screenshots = t.omnideskPage.screenshots;

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

  const toggleStar = (id: string) => {
    setStarredIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const visibleCategories = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return t.omnideskPage.categories
      .filter((cat) => selectedCategory === 'all' || cat.id === selectedCategory)
      .map((cat) => ({
        ...cat,
        tools: query
          ? cat.tools.filter(
              (tool) =>
                tool.title.toLowerCase().includes(query) ||
                tool.description.toLowerCase().includes(query),
            )
          : cat.tools,
      }))
      .filter((cat) => cat.tools.length > 0);
  }, [searchQuery, selectedCategory, t.omnideskPage.categories]);

  const railIcons = [
    {id: 'all', label: t.omnideskPage.allToolsFilter, icon: LayoutGrid},
    {id: 'files', label: t.omnideskPage.categories[0]?.title ?? '', icon: FolderOpen},
    {id: 'code', label: t.omnideskPage.categories[1]?.title ?? '', icon: Code2},
    {id: 'science', label: t.omnideskPage.categories[2]?.title ?? '', icon: Calculator},
  ];

  const activeLightboxItem = lightboxIndex !== null ? screenshots[lightboxIndex] ?? null : null;

  return (
    <div className="min-h-screen bg-[#080911] text-slate-100">
      {/* OmniDesk App-Style Top Bar */}
      <header className="sticky top-0 z-40 h-16 bg-[#0A0B14]/95 backdrop-blur-md border-b border-[#1E2235]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <a
              href="./index.html"
              onClick={(e) => handleNav(e, 'home')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 min-h-[36px] text-xs font-medium text-slate-400 hover:text-white border border-[#1E2235] rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">{t.omnideskPage.backToPortfolio}</span>
            </a>

            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
                <LayoutGrid className="w-4 h-4 text-white" aria-hidden="true" />
              </div>
              <span className="font-display text-sm sm:text-base font-semibold text-white whitespace-nowrap">
                {t.omnideskPage.appName}
              </span>
              <span className="hidden md:inline text-slate-600">/</span>
              <span className="hidden md:inline text-xs text-slate-400 truncate">
                {t.omnideskPage.sectionPath}
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.omnideskPage.searchPlaceholder}
                aria-label={t.omnideskPage.searchPlaceholder}
                className="w-full pl-9 pr-3 py-1.5 min-h-[36px] text-xs text-slate-100 placeholder:text-slate-500 bg-[#10121E] border border-[#1E2235] rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 rounded-lg whitespace-nowrap">
              <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.omnideskPage.localSandboxLabel}</span>
            </span>
            <a
              href={EXTERNAL_LINKS.omnideskRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[36px] text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors whitespace-nowrap shrink-0"
            >
              <span>{t.omnideskPage.repoCta}</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Layout with Slim OmniDesk Left Rail */}
      <div className="max-w-7xl mx-auto flex">
        <aside className="hidden lg:flex flex-col items-center gap-2 w-16 py-6 border-r border-[#1E2235] bg-[#0A0B14] shrink-0">
          {railIcons.map((item) => {
            const IconComponent = item.icon;
            const isSelected = selectedCategory === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedCategory(item.id)}
                title={item.label}
                aria-label={item.label}
                aria-pressed={isSelected}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-[#141726]'
                }`}
              >
                <IconComponent className="w-4 h-4" aria-hidden="true" />
              </button>
            );
          })}
        </aside>

        <main className="flex-1 min-w-0 px-4 sm:px-8 lg:px-10 py-10 sm:py-12 space-y-14">
          {/* Hero Intro */}
          <section className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs font-medium text-indigo-400">{t.omnideskPage.kicker}</p>
              <LanguageSwitcher tone="indigo" />
            </div>

            <div className="max-w-3xl space-y-4">
              <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
                {t.omnideskPage.title}
              </h1>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                {t.omnideskPage.lead}
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 border border-[#1E2235] bg-[#10121E] rounded-xl overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-[#1E2235]">
              <div className="p-4 sm:p-5">
                <p className="font-display text-xl sm:text-2xl font-bold text-white tabular-nums">
                  {t.omnideskPage.metrics.toolsValue}
                </p>
                <p className="mt-1 text-xs text-slate-400">{t.omnideskPage.metrics.toolsLabel}</p>
              </div>
              <div className="p-4 sm:p-5">
                <p className="font-display text-xl sm:text-2xl font-bold text-white">
                  {t.omnideskPage.metrics.runtimeValue}
                </p>
                <p className="mt-1 text-xs text-slate-400">{t.omnideskPage.metrics.runtimeLabel}</p>
              </div>
              <div className="p-4 sm:p-5">
                <p className="font-display text-xl sm:text-2xl font-bold text-white tabular-nums">
                  {t.omnideskPage.metrics.localesValue}
                </p>
                <p className="mt-1 text-xs text-slate-400">{t.omnideskPage.metrics.localesLabel}</p>
              </div>
              <div className="p-4 sm:p-5">
                <p className="font-display text-xl sm:text-2xl font-bold text-emerald-400 tabular-nums">
                  {t.omnideskPage.metrics.telemetryValue}
                </p>
                <p className="mt-1 text-xs text-slate-400">{t.omnideskPage.metrics.telemetryLabel}</p>
              </div>
            </div>
          </section>

          {/* Real Application Screenshots Gallery */}
          <section className="space-y-6">
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
                {t.omnideskPage.galleryHeading}
              </h2>
              <p className="mt-1 text-sm text-slate-400">{t.omnideskPage.galleryLead}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {screenshots.map((shot, idx) => (
                <button
                  key={shot.id}
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  className="group text-left bg-[#10121E] border border-[#1E2235] rounded-xl overflow-hidden hover:border-indigo-500/70 transition-colors cursor-pointer"
                >
                  <div className="relative">
                    <MediaFrame
                      src={SCREENSHOT_SRC[shot.id]}
                      alt={shot.title}
                      fallbackTitle={shot.title}
                      className="aspect-[16/9] border-0 border-b border-[#1E2235] rounded-none bg-[#080911]"
                      imgClassName="object-top transition-transform duration-200 group-hover:scale-[1.02]"
                    />
                    <span
                      className="absolute bottom-3 right-3 w-8 h-8 rounded-lg bg-[#0A0B14]/85 border border-[#232842] text-slate-300 group-hover:text-white flex items-center justify-center transition-colors"
                      aria-hidden="true"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <div className="p-4 sm:p-5 space-y-1">
                    <h3 className="font-display text-base font-semibold text-white group-hover:text-indigo-300 transition-colors">
                      {shot.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{shot.caption}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Interactive OmniDesk Tool Grid */}
          <section className="space-y-6 border-t border-[#1E2235] pt-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
                  {t.omnideskPage.explorerHeading}
                </h2>
                <p className="mt-1 text-sm text-slate-400">{t.omnideskPage.explorerLead}</p>
              </div>

              <div className="flex flex-wrap items-center gap-1 p-1 bg-[#10121E] border border-[#1E2235] rounded-lg self-start">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  aria-pressed={selectedCategory === 'all'}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t.omnideskPage.allToolsFilter}
                </button>
                {t.omnideskPage.categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    aria-pressed={selectedCategory === cat.id}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Search Input */}
            <div className="lg:hidden relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.omnideskPage.searchPlaceholder}
                aria-label={t.omnideskPage.searchPlaceholder}
                className="w-full pl-9 pr-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 bg-[#10121E] border border-[#1E2235] rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>

            {visibleCategories.length === 0 ? (
              <p className="py-10 text-sm text-slate-400 border-t border-[#1E2235]">
                {t.omnideskPage.searchEmpty}
              </p>
            ) : (
              <div className="space-y-10">
                {visibleCategories.map((category) => (
                  <div key={category.id} className="space-y-4">
                    <div className="flex items-center justify-between gap-4 pb-2">
                      <div>
                        <h3 className="font-display text-base sm:text-lg font-semibold text-white">
                          {category.title}
                        </h3>
                        <p className="text-xs text-slate-400">{category.subtitle}</p>
                      </div>
                      <span className="font-mono text-xs text-slate-300 border border-[#1E2235] bg-[#10121E] px-2.5 py-1 rounded-md tabular-nums shrink-0">
                        {category.count} {t.omnideskPage.toolsUnitLabel}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                      {category.tools.map((tool) => {
                        const isStarred = starredIds.includes(tool.id);
                        const isFocused = activeToolId === tool.id;
                        return (
                          <div
                            key={tool.id}
                            className={`flex flex-col justify-between p-4 bg-[#10121E] border rounded-xl transition-colors ${
                              isFocused
                                ? 'border-indigo-500'
                                : 'border-[#1E2235] hover:border-indigo-500/60'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-3">
                                <div className="w-8 h-8 rounded-lg bg-[#16192B] border border-[#232842] flex items-center justify-center text-indigo-400">
                                  <Code2 className="w-4 h-4" aria-hidden="true" />
                                </div>
                                <button
                                  type="button"
                                  onClick={() => toggleStar(tool.id)}
                                  aria-pressed={isStarred}
                                  aria-label={tool.title}
                                  className="p-1.5 rounded-md hover:bg-[#1A1E33] transition-colors cursor-pointer"
                                >
                                  <Star
                                    className={`w-4 h-4 ${
                                      isStarred ? 'text-amber-400 fill-amber-400' : 'text-slate-500'
                                    }`}
                                    aria-hidden="true"
                                  />
                                </button>
                              </div>

                              <h4 className="font-display text-sm font-semibold text-white">
                                {tool.title}
                              </h4>
                              <p className="mt-1.5 text-xs text-slate-400 leading-relaxed line-clamp-3">
                                {tool.description}
                              </p>
                            </div>

                            <div className="mt-4 pt-3 border-t border-[#1A1E30] flex items-center justify-between gap-2 text-[11px]">
                              <span className="text-slate-500 truncate">{tool.categoryLabel}</span>
                              <button
                                type="button"
                                onClick={() => setActiveToolId(isFocused ? null : tool.id)}
                                className="text-indigo-400 hover:text-indigo-300 font-medium whitespace-nowrap shrink-0 cursor-pointer"
                              >
                                {t.omnideskPage.openActionLabel}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Architecture & Tech Stack */}
          <section className="border-t border-[#1E2235] pt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
                {t.omnideskPage.architectureHeading}
              </h2>
              <div className="divide-y divide-[#1E2235]">
                {t.omnideskPage.highlights.map((item, idx) => (
                  <div key={item.title} className="py-4 first:pt-0 space-y-1">
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-mono text-xs text-indigo-400 tabular-nums">
                        {String(idx + 1).padStart(2, '0')}.
                      </span>
                      <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pl-6">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
                {t.omnideskPage.stackHeading}
              </h2>
              <div className="border border-[#1E2235] bg-[#10121E] rounded-xl divide-y divide-[#1E2235]">
                {t.omnideskPage.stackItems.map((row) => (
                  <div key={row.layer} className="p-4 sm:p-5 space-y-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="text-sm font-semibold text-white">{row.layer}</span>
                      <span className="font-mono text-xs text-indigo-400">{row.technologies}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400">{row.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Next Project Cross-Link */}
          <section className="border-t border-[#1E2235] pt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <p className="text-xs font-medium text-slate-400">{t.omnideskPage.nextProjectLabel}</p>
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
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeLightboxItem && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeLightboxItem.title}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="w-full max-w-5xl bg-[#0D0F1A] border border-[#1E2235] rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-[#1E2235]">
              <div className="min-w-0">
                <h3 className="font-display text-base font-semibold text-white truncate">
                  {activeLightboxItem.title}
                </h3>
                <p className="text-xs text-slate-400 truncate">{activeLightboxItem.caption}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-mono text-xs text-slate-400 tabular-nums mr-1">
                  {lightboxIndex + 1} / {screenshots.length}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex((lightboxIndex - 1 + screenshots.length) % screenshots.length)
                  }
                  aria-label={t.omnideskPage.galleryPrevLabel}
                  className="p-2 text-slate-300 hover:text-white bg-[#141726] border border-[#232842] rounded-lg transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxIndex((lightboxIndex + 1) % screenshots.length)}
                  aria-label={t.omnideskPage.galleryNextLabel}
                  className="p-2 text-slate-300 hover:text-white bg-[#141726] border border-[#232842] rounded-lg transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  aria-label={t.omnideskPage.galleryCloseLabel}
                  className="p-2 text-slate-300 hover:text-white bg-[#141726] border border-[#232842] rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="bg-[#080911] p-2 sm:p-4">
              <img
                src={SCREENSHOT_SRC[activeLightboxItem.id]}
                alt={activeLightboxItem.title}
                className="w-full max-h-[75vh] object-contain mx-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
