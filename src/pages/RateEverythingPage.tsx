import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Plus,
  Search,
  Star,
  X,
} from 'lucide-react';
import {useEffect, useMemo, useState} from 'react';
import {LanguageSwitcher} from '../components/LanguageSwitcher';
import {MediaFrame} from '../components/MediaFrame';
import {EXTERNAL_LINKS, MEDIA_ASSETS} from '../data/links';
import {useI18n} from '../i18n/context';
import type {
  PageRoute,
  RateCatalogEntry,
  RateCategoryFilter,
  RatePreviewTab,
} from '../i18n/types';

interface RateEverythingPageProps {
  onNavigate: (route: PageRoute, hash?: string) => void;
}

const COVER_ACCENT_STYLES: Record<RateCatalogEntry['accentHue'], string> = {
  crimson: 'from-red-950 via-zinc-900 to-zinc-950',
  emerald: 'from-emerald-950 via-zinc-900 to-zinc-950',
  amber: 'from-amber-950 via-zinc-900 to-zinc-950',
  slate: 'from-slate-800 via-zinc-900 to-zinc-950',
  cobalt: 'from-blue-950 via-zinc-900 to-zinc-950',
  yellow: 'from-yellow-900/70 via-zinc-900 to-zinc-950',
};

const SCREEN_IMAGE_SRC: Record<RatePreviewTab, string> = {
  main: MEDIA_ASSETS.rateEverythingScreens.main,
  detail: MEDIA_ASSETS.rateEverythingScreens.detail,
  add: MEDIA_ASSETS.rateEverythingScreens.add,
};

function sanitizeInput(value: string, maxLength = 300): string {
  return value.replace(/[<>]/g, '').trim().slice(0, maxLength);
}

export function RateEverythingPage({onNavigate}: RateEverythingPageProps) {
  const {t} = useI18n();
  const [categoryFilter, setCategoryFilter] = useState<RateCategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeScreenTab, setActiveScreenTab] = useState<RatePreviewTab>('main');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<RateCatalogEntry | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [customEntries, setCustomEntries] = useState<RateCatalogEntry[]>([]);

  // Controlled state for the Add Rating modal
  const [formCategory, setFormCategory] = useState<Exclude<RateCategoryFilter, 'all'>>('games');
  const [formScore, setFormScore] = useState('9');
  const [formName, setFormName] = useState('');
  const [formAuthor, setFormAuthor] = useState('');
  const [formPages, setFormPages] = useState('');
  const [formOriginalUrl, setFormOriginalUrl] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formThoughts, setFormThoughts] = useState('');
  const [formTags, setFormTags] = useState('');

  const screenItems: {key: RatePreviewTab; label: string; src: string}[] = useMemo(
    () => [
      {key: 'main', label: t.rateEverythingPage.screenTabs.main, src: SCREEN_IMAGE_SRC.main},
      {key: 'detail', label: t.rateEverythingPage.screenTabs.detail, src: SCREEN_IMAGE_SRC.detail},
      {key: 'add', label: t.rateEverythingPage.screenTabs.add, src: SCREEN_IMAGE_SRC.add},
    ],
    [
      t.rateEverythingPage.screenTabs.add,
      t.rateEverythingPage.screenTabs.detail,
      t.rateEverythingPage.screenTabs.main,
    ],
  );

  const activeScreenIndex = screenItems.findIndex((item) => item.key === activeScreenTab);
  const activeScreen = screenItems[activeScreenIndex] ?? screenItems[0];

  const allEntries = useMemo(
    () => [...customEntries, ...t.rateEverythingPage.entries],
    [customEntries, t.rateEverythingPage.entries],
  );

  useEffect(() => {
    if (!selectedEntry && !isAddModalOpen && lightboxIndex === null) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedEntry(null);
        setIsAddModalOpen(false);
        setLightboxIndex(null);
      } else if (lightboxIndex !== null && event.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev - 1 + screenItems.length) % screenItems.length,
        );
      } else if (lightboxIndex !== null && event.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % screenItems.length));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedEntry, isAddModalOpen, lightboxIndex, screenItems.length]);

  const handleNav = (event: React.MouseEvent<HTMLAnchorElement>, route: PageRoute) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    event.preventDefault();
    onNavigate(route);
  };

  const filteredEntries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return allEntries.filter((entry) => {
      const matchesCat = categoryFilter === 'all' || entry.category === categoryFilter;
      if (!matchesCat) {
        return false;
      }
      if (!query) {
        return true;
      }
      return (
        entry.title.toLowerCase().includes(query) ||
        entry.description.toLowerCase().includes(query) ||
        entry.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    });
  }, [allEntries, categoryFilter, searchQuery]);

  const filterOptions: {key: RateCategoryFilter; label: string}[] = [
    {key: 'all', label: t.rateEverythingPage.filters.all},
    {key: 'games', label: t.rateEverythingPage.filters.games},
    {key: 'movies', label: t.rateEverythingPage.filters.movies},
    {key: 'websites', label: t.rateEverythingPage.filters.websites},
  ];

  const activeHeading =
    categoryFilter === 'all'
      ? t.rateEverythingPage.catalogHeading
      : filterOptions.find((f) => f.key === categoryFilter)?.label.toUpperCase() ??
        t.rateEverythingPage.catalogHeading;

  const activeLightboxScreen = lightboxIndex !== null ? screenItems[lightboxIndex] ?? null : null;

  const handleAddSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanName = sanitizeInput(formName, 80);
    if (!cleanName) {
      return;
    }
    const parsedScore = Math.min(10, Math.max(1, Number(formScore) || 5));
    const cleanDescription = sanitizeInput(formDescription, 240);
    const cleanThoughts = sanitizeInput(formThoughts, 280);
    const cleanAuthor = sanitizeInput(formAuthor, 80);
    const cleanPages = sanitizeInput(formPages, 40);
    const cleanTags = formTags
      .split(',')
      .map((tag) => sanitizeInput(tag, 24).toUpperCase())
      .filter(Boolean);

    let safeUrl: string = EXTERNAL_LINKS.rateEverythingLive;
    const rawUrl = sanitizeInput(formOriginalUrl, 200);
    if (rawUrl.startsWith('https://') || rawUrl.startsWith('http://')) {
      safeUrl = rawUrl;
    }

    const catLabel =
      filterOptions.find((f) => f.key === formCategory)?.label.toUpperCase() ??
      formCategory.toUpperCase();

    const newEntry: RateCatalogEntry = {
      id: `custom-${Date.now()}`,
      category: formCategory,
      categoryLabel: catLabel,
      title: cleanName,
      score: parsedScore,
      description: cleanDescription || t.rateEverythingPage.entries[0].description,
      thoughts: cleanThoughts ? `"${cleanThoughts}"` : t.rateEverythingPage.entries[0].thoughts,
      updatedAt: '01.08.2026',
      originalUrl: safeUrl,
      specs: [
        ...(cleanAuthor
          ? [{label: t.rateEverythingPage.modalLabels.authorField, value: cleanAuthor}]
          : []),
        ...(cleanPages
          ? [{label: t.rateEverythingPage.modalLabels.pagesField, value: cleanPages}]
          : []),
      ],
      tags: cleanTags.length > 0 ? cleanTags : [catLabel],
      accentHue: 'amber',
    };

    setCustomEntries((prev) => [newEntry, ...prev]);
    setFormName('');
    setFormAuthor('');
    setFormPages('');
    setFormOriginalUrl('');
    setFormDescription('');
    setFormThoughts('');
    setFormTags('');
    setIsAddModalOpen(false);
    setSelectedEntry(newEntry);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100">
      {/* RateEverything App-Style Header */}
      <header className="sticky top-0 z-40 h-16 bg-[#050505]/95 backdrop-blur-md border-b border-zinc-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <a
              href="./index.html"
              onClick={(e) => handleNav(e, 'home')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 min-h-[36px] text-xs font-medium text-zinc-400 hover:text-white border border-zinc-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">{t.rateEverythingPage.backToPortfolio}</span>
            </a>

            <div className="flex items-center gap-2.5">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500 shrink-0" aria-hidden="true" />
              <span className="font-display text-sm sm:text-base font-bold text-white whitespace-nowrap">
                {t.rateEverythingPage.appName}
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center flex-1 max-w-sm mx-4">
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.rateEverythingPage.searchPlaceholder}
                aria-label={t.rateEverythingPage.searchPlaceholder}
                className="w-full pl-9 pr-3 py-1.5 min-h-[36px] text-xs text-zinc-100 placeholder:text-zinc-500 bg-[#111111] border border-zinc-800 rounded-lg focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[36px] text-xs font-semibold text-zinc-100 bg-[#111111] border border-zinc-800 rounded-lg hover:border-amber-500/70 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Plus className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
              <span className="hidden sm:inline">{t.rateEverythingPage.addButtonLabel}</span>
            </button>
            <a
              href={EXTERNAL_LINKS.rateEverythingLive}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[36px] text-xs font-bold text-black bg-amber-500 rounded-lg hover:bg-amber-400 transition-colors whitespace-nowrap shrink-0"
            >
              <span>{t.rateEverythingPage.liveCta}</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
            <a
              href={EXTERNAL_LINKS.rateEverythingRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 min-h-[36px] text-xs font-semibold text-zinc-200 border border-zinc-800 rounded-lg hover:border-zinc-600 transition-colors whitespace-nowrap shrink-0"
            >
              <span>{t.rateEverythingPage.repoCta}</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-14">
        {/* Hero Intro */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs font-semibold tracking-wider text-amber-500 uppercase">
              {t.rateEverythingPage.kicker}
            </p>
            <LanguageSwitcher tone="amber" />
          </div>

          <div className="max-w-3xl space-y-4">
            <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white">
              {t.rateEverythingPage.title}
            </h1>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              {t.rateEverythingPage.lead}
            </p>
          </div>
        </section>

        {/* Interface Views — Real Screenshots from RateEverything */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
                {t.rateEverythingPage.screensHeading}
              </h2>
              <p className="mt-1 text-sm text-zinc-400">{t.rateEverythingPage.screensLead}</p>
            </div>

            <div className="flex flex-wrap items-center gap-1 p-1 bg-[#111111] border border-zinc-800 rounded-lg self-start">
              {screenItems.map((tab) => {
                const isActive = activeScreenTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveScreenTab(tab.key)}
                    aria-pressed={isActive}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      isActive ? 'bg-amber-500 text-black font-semibold' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Primary Active Real Screenshot + Lightbox Trigger */}
          <button
            type="button"
            onClick={() => setLightboxIndex(activeScreenIndex >= 0 ? activeScreenIndex : 0)}
            className="group relative block w-full text-left bg-[#0B0B0B] border border-zinc-800 rounded-xl overflow-hidden hover:border-amber-500/70 transition-colors cursor-pointer"
          >
            <MediaFrame
              src={activeScreen.src}
              alt={activeScreen.label}
              fallbackTitle={activeScreen.label}
              className="aspect-[16/9] border-0 rounded-none bg-[#050505]"
              imgClassName="object-top transition-transform duration-200 group-hover:scale-[1.01]"
            />
            <span
              className="absolute bottom-3.5 right-3.5 w-9 h-9 rounded-lg bg-black/80 border border-zinc-800 text-zinc-300 group-hover:text-white flex items-center justify-center transition-colors"
              aria-hidden="true"
            >
              <Maximize2 className="w-4 h-4" />
            </span>
          </button>

          {/* All 3 Real Screenshots Thumbnail Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {screenItems.map((item, idx) => {
              const isSelected = activeScreenTab === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setActiveScreenTab(item.key)}
                  onDoubleClick={() => setLightboxIndex(idx)}
                  aria-pressed={isSelected}
                  className={`group text-left bg-[#111111] border rounded-xl overflow-hidden transition-colors cursor-pointer ${
                    isSelected
                      ? 'border-amber-500'
                      : 'border-zinc-800/90 hover:border-zinc-700'
                  }`}
                >
                  <MediaFrame
                    src={item.src}
                    alt={item.label}
                    fallbackTitle={item.label}
                    className="aspect-[16/9] border-0 border-b border-zinc-800/80 rounded-none bg-[#050505]"
                    imgClassName="object-top"
                  />
                  <div className="px-3.5 py-2.5 flex items-center justify-between gap-2">
                    <span
                      className={`font-display text-xs sm:text-sm font-semibold truncate ${
                        isSelected ? 'text-amber-400' : 'text-zinc-200 group-hover:text-white'
                      }`}
                    >
                      {item.label}
                    </span>
                    <span className="font-mono text-[11px] text-zinc-500 tabular-nums shrink-0">
                      0{idx + 1}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Interactive RateEverything Catalog Grid */}
        <section className="space-y-6 border-t border-zinc-900 pt-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {activeHeading}
              </h2>
              <p className="mt-1 font-mono text-xs text-zinc-500 tabular-nums">
                {filteredEntries.length} {t.rateEverythingPage.catalogCountSuffix}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-1 p-1 bg-[#111111] border border-zinc-800 rounded-lg self-start">
              {filterOptions.map((opt) => {
                const isActive = categoryFilter === opt.key;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setCategoryFilter(opt.key)}
                    aria-pressed={isActive}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      isActive ? 'bg-amber-500 text-black font-semibold' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden relative">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.rateEverythingPage.searchPlaceholder}
              aria-label={t.rateEverythingPage.searchPlaceholder}
              className="w-full pl-9 pr-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 bg-[#111111] border border-zinc-800 rounded-lg focus:outline-none focus:border-amber-500"
            />
          </div>

          {filteredEntries.length === 0 ? (
            <p className="py-10 text-sm text-zinc-400 border-t border-zinc-900">
              {t.rateEverythingPage.emptyState}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredEntries.map((entry) => (
                <article
                  key={entry.id}
                  className="flex flex-col bg-[#111111] border border-zinc-800/90 rounded-xl overflow-hidden hover:border-amber-500/60 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedEntry(entry)}
                    className="flex flex-col flex-1 text-left cursor-pointer"
                  >
                    {/* Visual Header Banner */}
                    <div
                      className={`w-full h-36 bg-gradient-to-br ${COVER_ACCENT_STYLES[entry.accentHue]} p-5 flex flex-col justify-between border-b border-zinc-800/80`}
                    >
                      <span className="font-mono text-[11px] font-semibold tracking-wider text-amber-400">
                        {entry.categoryLabel}
                      </span>
                      <span className="font-display text-2xl font-bold tracking-tight text-white/90">
                        {entry.title}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex flex-col flex-1 justify-between gap-5 w-full">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-mono text-[11px] text-amber-500">{entry.categoryLabel}</p>
                            <h3 className="mt-0.5 font-display text-lg font-bold text-white">
                              {entry.title}
                            </h3>
                          </div>

                          <div className="px-2.5 py-1 bg-[#080808] border border-zinc-800 rounded-md font-mono text-sm font-bold text-white tabular-nums shrink-0">
                            {entry.score}
                            <span className="text-xs font-normal text-zinc-500">/10</span>
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-2">
                          {entry.description}
                        </p>
                      </div>

                      <div className="space-y-4">
                        {entry.specs.length > 0 && (
                          <div className="border-t border-zinc-800/80 pt-3 space-y-1.5">
                            {entry.specs.map((spec) => (
                              <div
                                key={spec.label}
                                className="flex items-baseline justify-between gap-3 text-xs"
                              >
                                <span className="text-zinc-500">{spec.label}</span>
                                <span className="font-mono text-zinc-200 tabular-nums truncate">
                                  {spec.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        <p className="font-mono text-[11px] text-zinc-500 pt-1">
                          {entry.tags.map((tag, idx) => (
                            <span key={tag}>
                              {tag}
                              {idx < entry.tags.length - 1 && (
                                <span className="mx-1.5 text-zinc-700" aria-hidden="true">
                                  ·
                                </span>
                              )}
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Architecture Pillars */}
        <section className="border-t border-zinc-900 pt-12 space-y-8">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
            {t.rateEverythingPage.pillarsHeading}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.rateEverythingPage.pillars.map((pillar, idx) => (
              <div key={pillar.title} className="space-y-1.5">
                <p className="font-mono text-xs text-amber-500 tabular-nums">
                  {String(idx + 1).padStart(2, '0')}.
                </p>
                <h3 className="font-display text-base font-bold text-white">{pillar.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Previous Project Cross-Link */}
        <section className="border-t border-zinc-900 pt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-medium text-zinc-500">{t.rateEverythingPage.nextProjectLabel}</p>
            <p className="mt-1 font-display text-xl font-bold text-white">
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
            className="w-full max-w-5xl bg-[#0D0D0D] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-zinc-800">
              <h3 className="font-display text-base font-semibold text-white truncate">
                {activeLightboxScreen.label}
              </h3>
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-mono text-xs text-zinc-400 tabular-nums mr-1">
                  {lightboxIndex + 1} / {screenItems.length}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex((lightboxIndex - 1 + screenItems.length) % screenItems.length)
                  }
                  aria-label={t.rateEverythingPage.modalLabels.prevScreenLabel}
                  className="p-2 text-zinc-300 hover:text-white bg-[#161616] border border-zinc-800 rounded-lg transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxIndex((lightboxIndex + 1) % screenItems.length)}
                  aria-label={t.rateEverythingPage.modalLabels.nextScreenLabel}
                  className="p-2 text-zinc-300 hover:text-white bg-[#161616] border border-zinc-800 rounded-lg transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  aria-label={t.rateEverythingPage.modalLabels.closeLabel}
                  className="p-2 text-zinc-300 hover:text-white bg-[#161616] border border-zinc-800 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="bg-[#050505] p-2 sm:p-4">
              <img
                src={activeLightboxScreen.src}
                alt={activeLightboxScreen.label}
                className="w-full max-h-[75vh] object-contain mx-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

      {/* Interactive Rating Detail Window Modal */}
      {selectedEntry && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedEntry.title}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setSelectedEntry(null)}
        >
          <div
            className="w-full max-w-3xl bg-[#0F0F0F] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`relative h-48 sm:h-56 bg-gradient-to-br ${COVER_ACCENT_STYLES[selectedEntry.accentHue]} p-6 flex flex-col justify-between border-b border-zinc-800`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 text-[11px] font-mono font-bold text-black bg-amber-500 rounded-full">
                    {selectedEntry.categoryLabel}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-mono font-bold text-amber-400 bg-black/80 border border-zinc-800 rounded-full tabular-nums">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" aria-hidden="true" />
                    {selectedEntry.score}/10
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedEntry(null)}
                  aria-label={t.rateEverythingPage.modalLabels.closeLabel}
                  className="p-2 rounded-full bg-black/75 border border-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight">
                  {selectedEntry.title}
                </h2>
                <p className="mt-1 font-mono text-[11px] text-zinc-400">
                  {selectedEntry.tags.map((tag, idx) => (
                    <span key={tag}>
                      {tag}
                      {idx < selectedEntry.tags.length - 1 && (
                        <span className="mx-1.5 text-zinc-600" aria-hidden="true">
                          ·
                        </span>
                      )}
                    </span>
                  ))}
                </p>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-7 space-y-5">
                <div className="space-y-1.5">
                  <p className="font-mono text-[11px] font-semibold tracking-wider text-amber-500">
                    {t.rateEverythingPage.modalLabels.about}
                  </p>
                  <p className="text-sm text-zinc-300 leading-relaxed">{selectedEntry.description}</p>
                </div>

                <div className="space-y-2">
                  <p className="font-mono text-[11px] font-semibold tracking-wider text-zinc-400">
                    {t.rateEverythingPage.modalLabels.myThoughts}
                  </p>
                  <div className="p-4 bg-[#161616] border border-zinc-800 rounded-lg">
                    <p className="text-sm italic text-zinc-200 leading-relaxed">
                      {selectedEntry.thoughts}
                    </p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 space-y-4">
                <div className="p-4 bg-[#141414] border border-zinc-800 rounded-lg space-y-3">
                  <p className="font-mono text-[11px] font-semibold tracking-wider text-zinc-500">
                    {t.rateEverythingPage.modalLabels.details}
                  </p>
                  <div className="space-y-2.5">
                    {selectedEntry.specs.map((spec) => (
                      <div key={spec.label} className="space-y-0.5">
                        <p className="font-mono text-[10px] uppercase text-zinc-500">{spec.label}</p>
                        <p className="text-sm font-medium text-zinc-100">{spec.value}</p>
                      </div>
                    ))}
                  </div>
                  <a
                    href={selectedEntry.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-black bg-amber-500 rounded-lg hover:bg-amber-400 transition-colors"
                  >
                    <span>{t.rateEverythingPage.modalLabels.openOriginal}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
                <p className="font-mono text-[10px] text-center text-zinc-600 tabular-nums">
                  {t.rateEverythingPage.modalLabels.updatedPrefix} {selectedEntry.updatedAt}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Add Rating Modal */}
      {isAddModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.rateEverythingPage.modalLabels.addTitle}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-[#0F0F0F] border border-zinc-800 rounded-xl p-6 space-y-5 shadow-2xl my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h2 className="font-display text-base font-bold text-white">
                {t.rateEverythingPage.modalLabels.addTitle}
              </h2>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                aria-label={t.rateEverythingPage.modalLabels.closeLabel}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <label className="space-y-1.5 block">
                  <span className="font-mono text-[10px] text-zinc-500 block">
                    {t.rateEverythingPage.modalLabels.categoryField}
                  </span>
                  <select
                    value={formCategory}
                    onChange={(e) =>
                      setFormCategory(e.target.value as Exclude<RateCategoryFilter, 'all'>)
                    }
                    className="w-full px-3 py-2 bg-[#161616] border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value="games">{t.rateEverythingPage.filters.games}</option>
                    <option value="movies">{t.rateEverythingPage.filters.movies}</option>
                    <option value="websites">{t.rateEverythingPage.filters.websites}</option>
                  </select>
                </label>

                <label className="space-y-1.5 block">
                  <span className="font-mono text-[10px] text-zinc-500 block">
                    {t.rateEverythingPage.modalLabels.ratingField}
                  </span>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={formScore}
                    onChange={(e) => setFormScore(e.target.value)}
                    className="w-full px-3 py-2 bg-[#161616] border border-zinc-800 rounded-lg text-zinc-100 font-mono tabular-nums focus:outline-none focus:border-amber-500"
                  />
                </label>
              </div>

              <label className="space-y-1.5 block">
                <span className="font-mono text-[10px] text-zinc-500 block">
                  {t.rateEverythingPage.modalLabels.nameField}
                </span>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder={t.rateEverythingPage.modalLabels.namePlaceholder}
                  className="w-full px-3 py-2 bg-[#161616] border border-zinc-800 rounded-lg text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500"
                />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="space-y-1.5 block">
                  <span className="font-mono text-[10px] text-zinc-500 block">
                    {t.rateEverythingPage.modalLabels.authorField}
                  </span>
                  <input
                    type="text"
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    className="w-full px-3 py-2 bg-[#161616] border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-amber-500"
                  />
                </label>
                <label className="space-y-1.5 block">
                  <span className="font-mono text-[10px] text-zinc-500 block">
                    {t.rateEverythingPage.modalLabels.pagesField}
                  </span>
                  <input
                    type="text"
                    value={formPages}
                    onChange={(e) => setFormPages(e.target.value)}
                    className="w-full px-3 py-2 bg-[#161616] border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-amber-500"
                  />
                </label>
              </div>

              <label className="space-y-1.5 block">
                <span className="font-mono text-[10px] text-zinc-500 block">
                  {t.rateEverythingPage.modalLabels.originalLinkField}
                </span>
                <input
                  type="url"
                  value={formOriginalUrl}
                  onChange={(e) => setFormOriginalUrl(e.target.value)}
                  placeholder="https://"
                  className="w-full px-3 py-2 bg-[#161616] border border-zinc-800 rounded-lg text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500"
                />
              </label>

              <label className="space-y-1.5 block">
                <span className="font-mono text-[10px] text-zinc-500 block">
                  {t.rateEverythingPage.modalLabels.descriptionField}
                </span>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-[#161616] border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-amber-500 resize-none"
                />
              </label>

              <label className="space-y-1.5 block">
                <span className="font-mono text-[10px] text-zinc-500 block">
                  {t.rateEverythingPage.modalLabels.thoughtsField}
                </span>
                <textarea
                  rows={2}
                  value={formThoughts}
                  onChange={(e) => setFormThoughts(e.target.value)}
                  className="w-full px-3 py-2 bg-[#161616] border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-amber-500 resize-none"
                />
              </label>

              <label className="space-y-1.5 block">
                <span className="font-mono text-[10px] text-zinc-500 block">
                  {t.rateEverythingPage.modalLabels.tagsField}
                </span>
                <input
                  type="text"
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                  placeholder={t.rateEverythingPage.modalLabels.tagsPlaceholder}
                  className="w-full px-3 py-2 bg-[#161616] border border-zinc-800 rounded-lg text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500"
                />
              </label>

              <button
                type="submit"
                className="w-full py-2.5 bg-zinc-100 text-zinc-950 font-bold rounded-lg hover:bg-white transition-colors cursor-pointer"
              >
                {t.rateEverythingPage.modalLabels.submitAdd}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
