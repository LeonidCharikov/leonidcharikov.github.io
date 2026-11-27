import {
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Layers,
  Maximize2,
  Search,
  X,
} from 'lucide-react';
import {AnimatePresence, motion, useReducedMotion} from 'motion/react';
import {useEffect, useMemo, useState} from 'react';
import {LanguageSwitcher} from '../components/LanguageSwitcher';
import {MediaFrame} from '../components/MediaFrame';
import {OmniDeskLogo} from '../components/OmniDeskLogo';
import {
  INDUSTRIAL_EASE,
  RevealText,
  ScrollProgressBar,
  ScrollReveal,
  VIEWPORT_CONFIG,
} from '../components/OmniDeskMotion';
import {EXTERNAL_LINKS, MEDIA_ASSETS} from '../data/links';
import {useI18n} from '../i18n/context';
import type {OmniDeskScreenshotItem} from '../i18n/types';

const VIDEO_SRC_REGEX = /\.(webm|mp4|ogg)(\?.*)?$/i;

const SCREENSHOT_SRC: Record<OmniDeskScreenshotItem['id'], string> = {
  dashboard: MEDIA_ASSETS.omnideskScreens.dashboard,
  charts: MEDIA_ASSETS.omnideskScreens.charts,
  diagram: MEDIA_ASSETS.omnideskScreens.diagram,
  systemMonitor: MEDIA_ASSETS.omnideskScreens.systemMonitor,
  crosshair: MEDIA_ASSETS.omnideskScreens.crosshair,
  pdfEditor: MEDIA_ASSETS.omnideskScreens.pdfEditor,
  calendar: MEDIA_ASSETS.omnideskScreens.calendar,
  currency: MEDIA_ASSETS.omnideskScreens.currency,
  graph2d: MEDIA_ASSETS.omnideskScreens.graph2d,
  chemistry: MEDIA_ASSETS.omnideskScreens.chemistry,
  colorPicker: MEDIA_ASSETS.omnideskScreens.colorPicker,
  themes: MEDIA_ASSETS.omnideskScreens.themes,
  config: MEDIA_ASSETS.omnideskScreens.config,
};

const SCREENSHOT_POSTER: Record<OmniDeskScreenshotItem['id'], string> = {
  dashboard: MEDIA_ASSETS.omnideskPosters.dashboard,
  charts: MEDIA_ASSETS.omnideskPosters.charts,
  diagram: MEDIA_ASSETS.omnideskPosters.diagram,
  systemMonitor: MEDIA_ASSETS.omnideskPosters.systemMonitor,
  crosshair: MEDIA_ASSETS.omnideskPosters.crosshair,
  pdfEditor: MEDIA_ASSETS.omnideskPosters.pdfEditor,
  calendar: MEDIA_ASSETS.omnideskPosters.calendar,
  currency: MEDIA_ASSETS.omnideskPosters.currency,
  graph2d: MEDIA_ASSETS.omnideskPosters.graph2d,
  chemistry: MEDIA_ASSETS.omnideskPosters.chemistry,
  colorPicker: MEDIA_ASSETS.omnideskPosters.colorPicker,
  themes: MEDIA_ASSETS.omnideskPosters.themes,
  config: MEDIA_ASSETS.omnideskPosters.config,
};

const FLAGSHIP_DEMO_IDS: readonly OmniDeskScreenshotItem['id'][] = [
  'dashboard',
  'pdfEditor',
  'graph2d',
  'themes',
];

const HERO_CYCLE_MS = 4800;

const HERO_TOOL_GROUPS: readonly {categoryId: string; toolIds: readonly string[]}[] = [
  {
    categoryId: 'files',
    toolIds: ['pdf-studio', 'multi-converter', 'csv-editor', 'audio-editor'],
  },
  {
    categoryId: 'code',
    toolIds: ['hash-suite', 'aes-studio', 'sql-playground', 'regex-builder'],
  },
  {
    categoryId: 'math',
    toolIds: ['function-grapher', 'chart-graph-studio', 'calculus-workbench', 'linear-programming'],
  },
  {
    categoryId: 'design',
    toolIds: ['diagram-editor', 'color-studio', 'svg-optimizer', 'css-visual-studio'],
  },
  {
    categoryId: 'finance',
    toolIds: ['currency-crypto', 'options-black-scholes', 'invoice-generator', 'fire-simulator'],
  },
  {
    categoryId: 'desktop',
    toolIds: ['system-monitor', 'port-process-manager', 'crosshair-overlay', 'network-diagnostics'],
  },
];

type CatalogFilter = 'basics' | string;

interface HeroToolSlide {
  categoryId: string;
  categoryTitle: string;
  tools: {
    id: string;
    title: string;
    description: string;
    categoryId: string;
    runtime: string;
  }[];
}

function ArchitectureDiagrams() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const lineInitial = shouldReduceMotion ? false : {pathLength: 0, opacity: 0};
  const lineAnimate = {pathLength: 1, opacity: 1};
  const nodeInitial = shouldReduceMotion ? false : {opacity: 0, y: 8};
  const nodeAnimate = {opacity: 1, y: 0};

  return (
    <div className="space-y-6">
      {/* Diagram 01: Local-First Execution Pipeline */}
      <motion.div
        initial={shouldReduceMotion ? false : {opacity: 0, y: 20}}
        whileInView={{opacity: 1, y: 0}}
        viewport={VIEWPORT_CONFIG}
        transition={{duration: 0.45, ease: INDUSTRIAL_EASE}}
        className="omnidesk-glass rounded-xl p-6 space-y-5"
      >
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-[11px] text-[#F8FAFC] tracking-wider">
            FIG 01 · EXECUTION PIPELINE
          </span>
          <span className="font-mono text-[10px] text-[#10B981] tabular-nums">
            0ms NETWORK HOP
          </span>
        </div>

        <svg
          viewBox="0 0 560 190"
          className="w-full h-auto block"
          role="img"
          aria-label="Local-first execution pipeline schematic showing in-memory processing with zero cloud roundtrip"
        >
          <line x1="0" y1="95" x2="560" y2="95" stroke="#1E2438" strokeWidth="1" strokeDasharray="3 3" />

          {/* Node 1: Local File / Input */}
          <motion.g
            initial={nodeInitial}
            whileInView={nodeAnimate}
            viewport={VIEWPORT_CONFIG}
            transition={{duration: 0.38, delay: 0.06, ease: INDUSTRIAL_EASE}}
          >
            <rect x="8" y="34" width="112" height="54" rx="6" fill="#0A0D16" stroke="#2D3654" strokeWidth="1" />
            <text x="20" y="54" fill="#8B95B0" fontSize="9" fontFamily="JetBrains Mono, monospace">
              01 INPUT
            </text>
            <text x="20" y="73" fill="#F8FAFC" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="600">
              LOCAL FILE
            </text>
          </motion.g>

          {/* Arrow 1 -> 2 */}
          <motion.line
            x1="120"
            y1="61"
            x2="164"
            y2="61"
            stroke="#5B4EFF"
            strokeWidth="1.5"
            initial={lineInitial}
            whileInView={lineAnimate}
            viewport={VIEWPORT_CONFIG}
            transition={{duration: 0.4, delay: 0.16, ease: INDUSTRIAL_EASE}}
          />
          <motion.polygon
            points="164,57 172,61 164,65"
            fill="#5B4EFF"
            initial={shouldReduceMotion ? false : {opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={VIEWPORT_CONFIG}
            transition={{duration: 0.2, delay: 0.36}}
          />

          {/* Node 2: Worker / Rust IPC */}
          <motion.g
            initial={nodeInitial}
            whileInView={nodeAnimate}
            viewport={VIEWPORT_CONFIG}
            transition={{duration: 0.38, delay: 0.22, ease: INDUSTRIAL_EASE}}
          >
            <rect x="172" y="26" width="166" height="70" rx="6" fill="#0A0D16" stroke="#5B4EFF" strokeWidth="1.25" />
            <text x="184" y="46" fill="#6D61FF" fontSize="9" fontFamily="JetBrains Mono, monospace">
              02 COMPUTE · LOCAL
            </text>
            <text x="184" y="65" fill="#F8FAFC" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="600">
              WEB WORKER + RUST
            </text>
            <text x="184" y="82" fill="#8B95B0" fontSize="9" fontFamily="JetBrains Mono, monospace">
              RAM BUFFER · AES-256
            </text>
          </motion.g>

          {/* Arrow 2 -> 3 */}
          <motion.line
            x1="338"
            y1="61"
            x2="384"
            y2="61"
            stroke="#5B4EFF"
            strokeWidth="1.5"
            initial={lineInitial}
            whileInView={lineAnimate}
            viewport={VIEWPORT_CONFIG}
            transition={{duration: 0.4, delay: 0.32, ease: INDUSTRIAL_EASE}}
          />
          <motion.polygon
            points="384,57 392,61 384,65"
            fill="#5B4EFF"
            initial={shouldReduceMotion ? false : {opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={VIEWPORT_CONFIG}
            transition={{duration: 0.2, delay: 0.5}}
          />

          {/* Node 3: Instant Output */}
          <motion.g
            initial={nodeInitial}
            whileInView={nodeAnimate}
            viewport={VIEWPORT_CONFIG}
            transition={{duration: 0.38, delay: 0.4, ease: INDUSTRIAL_EASE}}
          >
            <rect x="392" y="34" width="160" height="54" rx="6" fill="#0A0D16" stroke="#F8FAFC" strokeWidth="1" />
            <text x="404" y="54" fill="#8B95B0" fontSize="9" fontFamily="JetBrains Mono, monospace">
              03 OUTPUT · 0ms
            </text>
            <text x="404" y="73" fill="#F8FAFC" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="600">
              NATIVE EXPORT
            </text>
          </motion.g>

          {/* Bottom comparison: Cloud SaaS Bloat Bypassed */}
          <motion.g
            initial={nodeInitial}
            whileInView={nodeAnimate}
            viewport={VIEWPORT_CONFIG}
            transition={{duration: 0.4, delay: 0.48, ease: INDUSTRIAL_EASE}}
          >
            <rect
              x="172"
              y="124"
              width="216"
              height="46"
              rx="6"
              fill="#0A0D16"
              stroke="#1E2438"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <text x="186" y="144" fill="#8B95B0" fontSize="9" fontFamily="JetBrains Mono, monospace">
              CLOUD UPLOAD / TRACKERS
            </text>
            <text x="186" y="160" fill="#56607C" fontSize="9" fontFamily="JetBrains Mono, monospace">
              BYPASSED · ZERO TELEMETRY
            </text>
            <line x1="178" y1="129" x2="382" y2="165" stroke="#2D3654" strokeWidth="1" />
            <line x1="382" y1="129" x2="178" y2="165" stroke="#2D3654" strokeWidth="1" />

            <line x1="255" y1="96" x2="255" y2="112" stroke="#2D3654" strokeWidth="1" />
            <circle cx="255" cy="96" r="2.5" fill="#10B981" />
            <text x="12" y="152" fill="#8B95B0" fontSize="9" fontFamily="JetBrains Mono, monospace">
              INDEXEDDB / DISK ONLY
            </text>
            <line x1="64" y1="88" x2="64" y2="136" stroke="#2D3654" strokeWidth="1" />
            <circle cx="64" cy="136" r="2.5" fill="#8B95B0" />
          </motion.g>
        </svg>
      </motion.div>

      {/* Diagram 02: Dual-Runtime Boundary */}
      <motion.div
        initial={shouldReduceMotion ? false : {opacity: 0, y: 20}}
        whileInView={{opacity: 1, y: 0}}
        viewport={VIEWPORT_CONFIG}
        transition={{duration: 0.45, delay: 0.08, ease: INDUSTRIAL_EASE}}
        className="omnidesk-glass rounded-xl p-6 space-y-5"
      >
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-[11px] text-[#F8FAFC] tracking-wider">
            FIG 02 · DUAL-RUNTIME BOUNDARY
          </span>
          <span className="font-mono text-[10px] text-[#8B95B0] tabular-nums">
            SHARED TS CORE
          </span>
        </div>

        <svg
          viewBox="0 0 560 176"
          className="w-full h-auto block"
          role="img"
          aria-label="Dual runtime architecture diagram showing shared React 19 and TypeScript 5 core compiling to Tauri v2 desktop and offline PWA"
        >
          {/* Top shared core */}
          <motion.g
            initial={nodeInitial}
            whileInView={nodeAnimate}
            viewport={VIEWPORT_CONFIG}
            transition={{duration: 0.38, delay: 0.08, ease: INDUSTRIAL_EASE}}
          >
            <rect x="90" y="12" width="380" height="44" rx="6" fill="#0A0D16" stroke="#F8FAFC" strokeWidth="1" />
            <text x="106" y="30" fill="#6D61FF" fontSize="9" fontFamily="JetBrains Mono, monospace">
              SHARED WORKSPACE CORE
            </text>
            <text x="106" y="46" fill="#F8FAFC" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="600">
              REACT 19 · TYPESCRIPT 5 · PURE LOGIC MODULES
            </text>
          </motion.g>

          {/* Branch lines */}
          <motion.path
            d="M280 56 V80 H136 V100"
            fill="none"
            stroke="#5B4EFF"
            strokeWidth="1.25"
            initial={lineInitial}
            whileInView={lineAnimate}
            viewport={VIEWPORT_CONFIG}
            transition={{duration: 0.48, delay: 0.2, ease: INDUSTRIAL_EASE}}
          />
          <motion.path
            d="M280 80 H424 V100"
            fill="none"
            stroke="#36405E"
            strokeWidth="1.25"
            initial={lineInitial}
            whileInView={lineAnimate}
            viewport={VIEWPORT_CONFIG}
            transition={{duration: 0.48, delay: 0.26, ease: INDUSTRIAL_EASE}}
          />
          <motion.circle
            cx="280"
            cy="80"
            r="3"
            fill="#5B4EFF"
            initial={shouldReduceMotion ? false : {scale: 0, opacity: 0}}
            whileInView={{scale: 1, opacity: 1}}
            viewport={VIEWPORT_CONFIG}
            transition={{duration: 0.25, delay: 0.28}}
          />

          {/* Left Branch: Tauri v2 Desktop */}
          <motion.g
            initial={nodeInitial}
            whileInView={nodeAnimate}
            viewport={VIEWPORT_CONFIG}
            transition={{duration: 0.38, delay: 0.34, ease: INDUSTRIAL_EASE}}
          >
            <rect x="12" y="100" width="248" height="64" rx="6" fill="#0A0D16" stroke="#5B4EFF" strokeWidth="1.25" />
            <text x="24" y="119" fill="#6D61FF" fontSize="9" fontFamily="JetBrains Mono, monospace">
              NATIVE DESKTOP · LOCAL
            </text>
            <text x="24" y="137" fill="#F8FAFC" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="600">
              TAURI v2 + RUST BACKEND
            </text>
            <text x="24" y="153" fill="#8B95B0" fontSize="9" fontFamily="JetBrains Mono, monospace">
              OS TOOLS (6) · MCP (24) · PRINT · UPDATER
            </text>
          </motion.g>

          {/* Right Branch: Web / Offline PWA */}
          <motion.g
            initial={nodeInitial}
            whileInView={nodeAnimate}
            viewport={VIEWPORT_CONFIG}
            transition={{duration: 0.38, delay: 0.42, ease: INDUSTRIAL_EASE}}
          >
            <rect x="300" y="100" width="248" height="64" rx="6" fill="#0A0D16" stroke="#2D3654" strokeWidth="1" />
            <text x="312" y="119" fill="#8B95B0" fontSize="9" fontFamily="JetBrains Mono, monospace">
              ZERO-INSTALL · SANDBOX
            </text>
            <text x="312" y="137" fill="#F8FAFC" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="600">
              OFFLINE WEB PWA
            </text>
            <text x="312" y="153" fill="#8B95B0" fontSize="9" fontFamily="JetBrains Mono, monospace">
              WORKERS · IDB · SERVICE WORKER
            </text>
          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
}

export function OmniDeskPage() {
  const {t} = useI18n();
  const shouldReduceMotion = useReducedMotion() ?? false;

  const firstCategoryId = t.omnideskPage.categories[0]?.id ?? 'basics';

  // Auto-cycling Hero tools showcase state
  const [heroSlideIdx, setHeroSlideIdx] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);

  // Showcase state (top 4 flagship stacked + expandable remaining grid + Lightbox)
  const [showMoreDemos, setShowMoreDemos] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Full Tool Index Matrix state — single category visible by default, optional Expand All toggle
  const [selectedFilter, setSelectedFilter] = useState<CatalogFilter>(firstCategoryId);
  const [expandAll, setExpandAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedToolId, setHighlightedToolId] = useState<string | null>(null);

  const screenshots = t.omnideskPage.screenshots;

  const {flagshipDemos, additionalDemos, screenshotIndexMap} = useMemo(() => {
    const indexMap = new Map<OmniDeskScreenshotItem['id'], number>();
    screenshots.forEach((shot, idx) => indexMap.set(shot.id, idx));

    const flagships: OmniDeskScreenshotItem[] = [];
    for (const id of FLAGSHIP_DEMO_IDS) {
      const found = screenshots.find((item) => item.id === id);
      if (found) {
        flagships.push(found);
      }
    }

    const flagshipSet = new Set(flagships.map((item) => item.id));
    const extras = screenshots.filter((item) => !flagshipSet.has(item.id));

    return {
      flagshipDemos: flagships,
      additionalDemos: extras,
      screenshotIndexMap: indexMap,
    };
  }, [screenshots]);

  // Ensure selectedFilter remains valid if locale categories ever shift
  const activeCategoryFilter = useMemo(() => {
    if (selectedFilter === 'basics') {
      return 'basics';
    }
    const exists = t.omnideskPage.categories.some((cat) => cat.id === selectedFilter);
    return exists ? selectedFilter : firstCategoryId;
  }, [firstCategoryId, selectedFilter, t.omnideskPage.categories]);

  // Build curated rotating slides from real localized OmniDesk tools
  const heroSlides: HeroToolSlide[] = useMemo(() => {
    const categoryMap = new Map(t.omnideskPage.categories.map((cat) => [cat.id, cat]));

    const resolveRuntime = (title: string, isDesktopOnly?: boolean) => {
      if (isDesktopOnly) {
        return 'Tauri Rust';
      }
      const lower = title.toLowerCase();
      if (
        lower.includes('pdf') ||
        lower.includes('audio') ||
        lower.includes('image') ||
        lower.includes('photo') ||
        lower.includes('converter') ||
        lower.includes('hash') ||
        lower.includes('aes')
      ) {
        return 'Web Worker';
      }
      if (
        lower.includes('http') ||
        lower.includes('api') ||
        lower.includes('currency') ||
        lower.includes('crypto')
      ) {
        return 'Hybrid Local';
      }
      return 'In-Memory';
    };

    return HERO_TOOL_GROUPS.map((group) => {
      const cat = categoryMap.get(group.categoryId);
      if (!cat) {
        return null;
      }
      const toolMap = new Map(cat.tools.map((tool) => [tool.id, tool]));
      const selected = group.toolIds
        .map((id) => toolMap.get(id))
        .filter((item): item is NonNullable<typeof item> => Boolean(item));
      const finalTools = (selected.length >= 4 ? selected : cat.tools.slice(0, 4)).map((tool) => ({
        id: tool.id,
        title: tool.title,
        description: tool.description,
        categoryId: cat.id,
        runtime: resolveRuntime(tool.title, tool.isDesktopOnly),
      }));

      return {
        categoryId: cat.id,
        categoryTitle: cat.title,
        tools: finalTools,
      };
    }).filter((slide): slide is HeroToolSlide => Boolean(slide && slide.tools.length > 0));
  }, [t.omnideskPage.categories]);

  const activeHeroSlide = heroSlides.length > 0 ? heroSlides[heroSlideIdx % heroSlides.length] : null;

  // Auto-cycle hero tools smoothly every HERO_CYCLE_MS unless hovered, focused, or reduced-motion
  useEffect(() => {
    if (shouldReduceMotion || isHeroPaused || heroSlides.length <= 1) {
      return;
    }
    const timer = window.setInterval(() => {
      setHeroSlideIdx((prev) => (prev + 1) % heroSlides.length);
    }, HERO_CYCLE_MS);
    return () => window.clearInterval(timer);
  }, [heroSlides.length, isHeroPaused, shouldReduceMotion]);

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

  // Clear temporary tool highlight after 2.6s
  useEffect(() => {
    if (!highlightedToolId) {
      return;
    }
    const timer = window.setTimeout(() => setHighlightedToolId(null), 2600);
    return () => window.clearTimeout(timer);
  }, [highlightedToolId]);

  // Lightbox keyboard navigation
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

  const jumpToToolInCatalog = (categoryId: string, toolId?: string) => {
    setExpandAll(false);
    setSelectedFilter(categoryId);
    setSearchQuery('');
    if (toolId) {
      setHighlightedToolId(toolId);
    }
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({behavior: shouldReduceMotion ? 'auto' : 'smooth', block: 'start'});
    }
  };

  const visibleCatalogSections = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (query) {
      return t.omnideskPage.categories
        .map((cat, idx) => ({
          id: cat.id,
          indexNumber: idx + 1,
          title: cat.title,
          subtitle: cat.subtitle,
          tools: cat.tools.filter(
            (tool) =>
              tool.title.toLowerCase().includes(query) ||
              tool.description.toLowerCase().includes(query),
          ),
        }))
        .filter((cat) => cat.tools.length > 0);
    }

    if (expandAll) {
      return t.omnideskPage.categories.map((cat, idx) => ({
        id: cat.id,
        indexNumber: idx + 1,
        title: cat.title,
        subtitle: cat.subtitle,
        tools: cat.tools,
      }));
    }

    if (activeCategoryFilter === 'basics') {
      const basicTools = t.omnideskPage.categories.flatMap((cat) =>
        cat.tools.filter((tool) => tool.isEverydayBasic),
      );
      return [
        {
          id: 'basics',
          indexNumber: 0,
          title: t.omnideskPage.everydayBasicsFilter,
          subtitle: t.omnideskPage.catalogLead,
          tools: basicTools,
        },
      ];
    }

    const foundIdx = t.omnideskPage.categories.findIndex((cat) => cat.id === activeCategoryFilter);
    const chosenCat = t.omnideskPage.categories[foundIdx >= 0 ? foundIdx : 0];
    if (!chosenCat) {
      return [];
    }
    return [
      {
        id: chosenCat.id,
        indexNumber: (foundIdx >= 0 ? foundIdx : 0) + 1,
        title: chosenCat.title,
        subtitle: chosenCat.subtitle,
        tools: chosenCat.tools,
      },
    ];
  }, [
    activeCategoryFilter,
    expandAll,
    searchQuery,
    t.omnideskPage.catalogLead,
    t.omnideskPage.categories,
    t.omnideskPage.everydayBasicsFilter,
  ]);

  const totalVisibleTools = useMemo(
    () => visibleCatalogSections.reduce((sum, cat) => sum + cat.tools.length, 0),
    [visibleCatalogSections],
  );

  const activeLightboxItem = lightboxIndex !== null ? screenshots[lightboxIndex] ?? null : null;

  const moreDemosButtonText = showMoreDemos
    ? t.omnideskPage.hideMoreDemosLabel
    : t.omnideskPage.showMoreDemosLabel.replace('{count}', String(additionalDemos.length));

  return (
    <div className="relative min-h-screen bg-transparent text-[#F8FAFC] selection:bg-[#5B4EFF] selection:text-[#F8FAFC]">
      {/* Fixed Full-Viewport Calm Futuristic Background Layer (z-0 for reliable mobile Safari/Chrome compositing) */}
      <div
        aria-hidden="true"
        className="fixed inset-0 min-h-[100lvh] z-0 pointer-events-none overflow-hidden bg-[#0A0D16]"
      >
        <div
          className="absolute -top-[10%] -left-[28%] sm:-top-[18%] sm:-left-[12%] w-[140vw] h-[140vw] sm:w-[82vw] sm:h-[82vw] max-w-[960px] max-h-[960px] rounded-full omnidesk-wave-primary"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(91, 78, 255, 0.135) 0%, rgba(91, 78, 255, 0.045) 45%, transparent 72%)',
          }}
        />
        <div
          className="absolute top-[34%] -right-[28%] sm:top-[26%] sm:-right-[14%] w-[135vw] h-[135vw] sm:w-[76vw] sm:h-[76vw] max-w-[920px] max-h-[920px] rounded-full omnidesk-wave-secondary"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(58, 108, 196, 0.11) 0%, rgba(58, 108, 196, 0.035) 46%, transparent 72%)',
          }}
        />
        <div className="absolute inset-0 omnidesk-dot-matrix" />
      </div>

      {/* 1. Sticky Frosted Navbar — Centered 1080px Container */}
      <header className="sticky top-0 z-40 h-16 omnidesk-glass border-x-0 border-t-0">
        <div className="max-w-[1080px] mx-auto px-4 sm:px-8 h-full flex items-center justify-between gap-2 sm:gap-6">
          {/* Left: Brand Wordmark */}
          <div className="flex items-center min-w-0 shrink-0">
            <a
              href="#overview"
              className="inline-flex items-center gap-2 sm:gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5B4EFF]"
            >
              <OmniDeskLogo className="w-6 h-6 shrink-0" title={t.omnideskPage.appName} />
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#F8FAFC]">
                OMNIDESK
              </span>
            </a>
          </div>

          {/* Center: Clean Section Anchor Links */}
          <nav
            aria-label="OmniDesk sections"
            className="hidden lg:flex items-center gap-8 font-mono text-[11px] tracking-wider text-[#8B95B0]"
          >
            <a
              href="#showcase"
              className="hover:text-[#F8FAFC] transition-colors duration-150 industrial-ease whitespace-nowrap shrink-0"
            >
              01 {t.omnideskPage.navLinks.showcase.toUpperCase()}
            </a>
            <a
              href="#architecture"
              className="hover:text-[#F8FAFC] transition-colors duration-150 industrial-ease whitespace-nowrap shrink-0"
            >
              02 {t.omnideskPage.navLinks.architecture.toUpperCase()}
            </a>
            <a
              href="#catalog"
              className="hover:text-[#F8FAFC] transition-colors duration-150 industrial-ease whitespace-nowrap shrink-0"
            >
              03 {t.omnideskPage.navLinks.catalog.toUpperCase()}
            </a>
          </nav>

          {/* Right: Language Switcher + Primary Download CTA */}
          <div className="flex items-center gap-2 sm:gap-5 shrink-0">
            <LanguageSwitcher tone="indigo" />

            <a
              href={`${EXTERNAL_LINKS.omnideskRepo}/releases`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 min-h-[36px] sm:min-h-[38px] font-mono text-[11px] sm:text-xs font-semibold tracking-wide text-[#F8FAFC] bg-[#5B4EFF] hover:bg-[#6D61FF] rounded-lg transition-colors duration-150 industrial-ease whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B4EFF]"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span>DOWNLOAD</span>
            </a>
          </div>
        </div>
      </header>
      <ScrollProgressBar topClass="top-16" barClass="bg-[#5B4EFF]/70" />

      <main className="relative z-10 overflow-x-clip">
        {/* 2. HERO & LIVE COMMAND PALETTE */}
        <section id="overview" className="pt-12 pb-16 sm:pt-20 sm:pb-24">
          <div className="max-w-[1080px] mx-auto px-5 sm:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                {/* Left Column: Headline, Tight 2-3 Line Copy & Unified CTAs */}
                <div className="lg:col-span-6 space-y-8">
                  <div className="space-y-5">
                    <ScrollReveal immediate direction="up" distance={10} delay={0.04}>
                      <div className="flex flex-wrap items-center gap-2.5 font-mono text-[11px] tracking-wider text-[#8B95B0] tabular-nums">
                        <span className="text-[#10B981] font-medium">OFFLINE-FIRST</span>
                        <span className="text-white/20" aria-hidden="true">
                          ·
                        </span>
                        <span>100+ TOOLS</span>
                        <span className="text-white/20" aria-hidden="true">
                          ·
                        </span>
                        <span>12 THEMES</span>
                      </div>
                    </ScrollReveal>

                    <RevealText
                      as="h1"
                      immediate
                      delay={0.08}
                      text={t.omnideskPage.title}
                      className="font-tech text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] text-[#F8FAFC] leading-[1.06] max-w-xl"
                    />

                    <ScrollReveal immediate delay={0.16} distance={12}>
                      <p className="text-[15px] sm:text-base text-[#8B95B0] leading-[1.65] max-w-lg">
                        {t.omnideskPage.lead}
                      </p>
                    </ScrollReveal>
                  </div>

                  {/* Unified Desktop Release CTA + Web PWA + Source */}
                  <ScrollReveal immediate delay={0.22} distance={12} className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={`${EXTERNAL_LINKS.omnideskRepo}/releases`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] font-mono text-xs sm:text-sm font-semibold tracking-wide text-[#F8FAFC] bg-[#5B4EFF] hover:bg-[#6D61FF] rounded-lg transition-colors duration-150 industrial-ease whitespace-nowrap shrink-0"
                      >
                        <Download className="w-4 h-4" aria-hidden="true" />
                        <span>Download Desktop</span>
                      </a>

                      <a
                        href={EXTERNAL_LINKS.omnideskLive}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] font-mono text-xs font-medium tracking-wide text-[#F8FAFC] bg-[#101422] hover:bg-[#171D31] border border-white/[0.08] rounded-lg transition-colors duration-150 industrial-ease whitespace-nowrap shrink-0"
                      >
                        <span>{t.omnideskPage.liveAppCta}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#8B95B0]" aria-hidden="true" />
                      </a>

                      <a
                        href={EXTERNAL_LINKS.omnideskRepo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-3 min-h-[44px] font-mono text-xs text-[#8B95B0] hover:text-[#F8FAFC] transition-colors duration-150 industrial-ease whitespace-nowrap shrink-0"
                      >
                        <span>GitHub</span>
                        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    </div>

                    <p className="font-mono text-[11px] text-[#8B95B0]/85 tabular-nums">
                      Windows · macOS · Linux
                    </p>
                  </ScrollReveal>
                </div>

                {/* Right Column: Smooth Auto-Cycling Tools Showcase */}
                <div className="lg:col-span-6">
                  <ScrollReveal immediate direction="up" distance={18} delay={0.14}>
                    {activeHeroSlide && (
                      <div
                        onMouseEnter={() => setIsHeroPaused(true)}
                        onMouseLeave={() => setIsHeroPaused(false)}
                        onFocus={() => setIsHeroPaused(true)}
                        onBlur={() => setIsHeroPaused(false)}
                        className="omnidesk-glass rounded-xl overflow-hidden shadow-[0_24px_60px_-24px_rgba(0,0,0,0.65)]"
                      >
                        {/* Quiet Slide Header: Current Category + Index & Prev/Next */}
                        <div className="px-5 py-3.5 flex items-center justify-between gap-3">
                          <div className="min-w-0 flex items-center gap-2.5">
                            <span className="font-mono text-[11px] text-[#6D61FF] tabular-nums shrink-0">
                              {String((heroSlideIdx % heroSlides.length) + 1).padStart(2, '0')} /{' '}
                              {String(heroSlides.length).padStart(2, '0')}
                            </span>
                            <span className="text-white/20 shrink-0" aria-hidden="true">
                              ·
                            </span>
                            <AnimatePresence mode="wait" initial={false}>
                              <motion.span
                                key={activeHeroSlide.categoryId}
                                initial={shouldReduceMotion ? false : {opacity: 0, y: 4}}
                                animate={{opacity: 1, y: 0}}
                                exit={shouldReduceMotion ? undefined : {opacity: 0, y: -4}}
                                transition={{duration: 0.25, ease: [0.22, 1, 0.36, 1]}}
                                className="font-mono text-[11px] tracking-wide text-[#F8FAFC] truncate"
                              >
                                {activeHeroSlide.categoryTitle}
                              </motion.span>
                            </AnimatePresence>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={() =>
                                setHeroSlideIdx(
                                  (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
                                )
                              }
                              aria-label={t.omnideskPage.galleryPrevLabel}
                              className="p-1.5 text-[#8B95B0] hover:text-[#F8FAFC] hover:bg-white/[0.06] rounded-lg transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B4EFF]"
                            >
                              <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setHeroSlideIdx((prev) => (prev + 1) % heroSlides.length)
                              }
                              aria-label={t.omnideskPage.galleryNextLabel}
                              className="p-1.5 text-[#8B95B0] hover:text-[#F8FAFC] hover:bg-white/[0.06] rounded-lg transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B4EFF]"
                            >
                              <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                            </button>
                          </div>
                        </div>

                        {/* Smoothly Animated Tool Rows — Borderless, Clickable to Jump to Catalog */}
                        <div className="px-3 pb-3 min-h-[312px] flex flex-col justify-center">
                          <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                              key={activeHeroSlide.categoryId}
                              initial={shouldReduceMotion ? false : {opacity: 0}}
                              animate={{opacity: 1}}
                              exit={shouldReduceMotion ? undefined : {opacity: 0}}
                              transition={{duration: 0.22, ease: [0.22, 1, 0.36, 1]}}
                              className="space-y-1.5"
                            >
                              {activeHeroSlide.tools.map((item, idx) => (
                                <motion.button
                                  key={item.id}
                                  type="button"
                                  onClick={() => jumpToToolInCatalog(item.categoryId, item.id)}
                                  initial={shouldReduceMotion ? false : {opacity: 0, y: 10}}
                                  animate={{opacity: 1, y: 0}}
                                  exit={shouldReduceMotion ? undefined : {opacity: 0, y: -6}}
                                  transition={{
                                    duration: 0.34,
                                    delay: shouldReduceMotion ? 0 : idx * 0.045,
                                    ease: [0.22, 1, 0.36, 1],
                                  }}
                                  className="group w-full text-left px-3.5 py-3 rounded-lg flex items-start justify-between gap-4 hover:bg-white/[0.05] transition-colors duration-150 industrial-ease cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B4EFF]"
                                >
                                  <div className="min-w-0 space-y-1">
                                    <p className="font-tech text-sm font-semibold text-[#F8FAFC] group-hover:text-white truncate">
                                      {item.title}
                                    </p>
                                    <p className="text-xs text-[#8B95B0] line-clamp-1 leading-relaxed">
                                      {item.description}
                                    </p>
                                  </div>
                                  <span className="font-mono text-[10px] text-[#8B95B0]/80 group-hover:text-[#6D61FF] transition-colors duration-150 whitespace-nowrap shrink-0 pt-0.5">
                                    {item.runtime}
                                  </span>
                                </motion.button>
                              ))}
                            </motion.div>
                          </AnimatePresence>
                        </div>

                        {/* Interactive Progress Segments + Quiet Catalog Shortcut */}
                        <div className="px-5 py-3.5 bg-[#0A0D16]/45 flex items-center justify-between gap-4">
                          <div
                            className="flex items-center gap-1.5 flex-1 max-w-[200px]"
                            role="tablist"
                            aria-label="Tool preview groups"
                          >
                            {heroSlides.map((slide, idx) => {
                              const isCurrent = idx === heroSlideIdx % heroSlides.length;
                              return (
                                <button
                                  key={slide.categoryId}
                                  type="button"
                                  role="tab"
                                  aria-selected={isCurrent}
                                  aria-label={slide.categoryTitle}
                                  onClick={() => setHeroSlideIdx(idx)}
                                  className="relative h-6 flex-1 flex items-center cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B4EFF] rounded"
                                >
                                  <span className="relative block w-full h-[3px] rounded-full bg-white/[0.1] overflow-hidden">
                                    {isCurrent && (
                                      <motion.span
                                        key={`${slide.categoryId}-${isHeroPaused ? 'paused' : 'run'}`}
                                        initial={{scaleX: shouldReduceMotion || isHeroPaused ? 1 : 0}}
                                        animate={{scaleX: 1}}
                                        transition={
                                          shouldReduceMotion || isHeroPaused
                                            ? {duration: 0}
                                            : {duration: HERO_CYCLE_MS / 1000, ease: 'linear'}
                                        }
                                        className="absolute inset-0 origin-left bg-[#5B4EFF] rounded-full"
                                      />
                                    )}
                                  </span>
                                </button>
                              );
                            })}
                          </div>

                          <button
                            type="button"
                            onClick={() => jumpToToolInCatalog(activeHeroSlide.categoryId)}
                            className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#8B95B0] hover:text-[#F8FAFC] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            <span>{t.omnideskPage.exploreCatalogCta}</span>
                            <ArrowUpRight className="w-3 h-3 text-[#6D61FF]" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    )}
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </section>

        {/* Subtle Gradient Divider: Hero → Stats */}
        <div className="max-w-[1080px] mx-auto px-5 sm:px-8" aria-hidden="true">
          <div className="omnidesk-section-divider" />
        </div>

        {/* Quiet 4-Column Spec Strip */}
        <section aria-label="Technical specifications" className="py-14 sm:py-16">
          <div className="max-w-[1080px] mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
              <div className="space-y-1.5">
                <p className="font-mono text-[11px] text-[#8B95B0]">Tools</p>
                <p className="font-tech text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-[#F8FAFC] tabular-nums">
                  100+
                </p>
                <p className="text-xs text-[#8B95B0]">{t.omnideskPage.metrics.toolsLabel}</p>
              </div>

              <div className="space-y-1.5">
                <p className="font-mono text-[11px] text-[#8B95B0]">Latency</p>
                <p className="font-tech text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-[#F8FAFC] tabular-nums">
                  0ms local
                </p>
                <p className="text-xs text-[#8B95B0]">In-Memory &amp; Web Worker Compute</p>
              </div>

              <div className="space-y-1.5">
                <p className="font-mono text-[11px] text-[#8B95B0]">Telemetry</p>
                <p className="font-tech text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-[#10B981]">
                  ZERO
                </p>
                <p className="text-xs text-[#8B95B0]">
                  {t.omnideskPage.metrics.securityValue} · {t.omnideskPage.metrics.securityLabel}
                </p>
              </div>

              <div className="space-y-1.5">
                <p className="font-mono text-[11px] text-[#8B95B0]">Platforms</p>
                <p className="font-tech text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-[#F8FAFC]">
                  Win / Mac / Linux
                </p>
                <p className="text-xs text-[#8B95B0]">
                  {t.omnideskPage.metrics.runtimeValue} · {t.omnideskPage.metrics.localesValue}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Subtle Gradient Divider: Stats → Showcase */}
        <div className="max-w-[1080px] mx-auto px-5 sm:px-8" aria-hidden="true">
          <div className="omnidesk-section-divider" />
        </div>

        {/* SECTION 01: SHOWCASE — Vertically Stacked Top 4 Flagship WebM Demos + Expandable Grid */}
        <section id="showcase" className="scroll-mt-16 py-24 sm:py-32">
          <div className="max-w-[1080px] mx-auto px-5 sm:px-8 space-y-20 sm:space-y-28">
              <div className="space-y-3 max-w-2xl">
                <p className="font-mono text-xs text-[#6D61FF] tracking-wider">01 Showcase</p>
                <RevealText
                  as="h2"
                  text={t.omnideskPage.showcaseHeading}
                  className="font-tech text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-[#F8FAFC]"
                />
                <p className="text-[15px] sm:text-base text-[#8B95B0] leading-relaxed">
                  {t.omnideskPage.showcaseLead}
                </p>
              </div>

              {/* Top 4 Flagship Demos — Alternating 2-Column Stack with 120px+ Vertical Spacing */}
              <div className="space-y-32 lg:space-y-40">
                {flagshipDemos.map((shot, idx) => {
                  const fullIndex = screenshotIndexMap.get(shot.id) ?? idx;
                  const isFlipped = idx % 2 === 1;
                  return (
                    <ScrollReveal
                      key={shot.id}
                      distance={20}
                      duration={0.45}
                      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
                    >
                      {/* Text Column */}
                      <div
                        className={`lg:col-span-5 space-y-4 ${
                          isFlipped ? 'lg:order-2 lg:pl-4' : 'lg:order-1 lg:pr-4'
                        }`}
                      >
                        <p className="font-mono text-xs text-[#6D61FF] tabular-nums">
                          {String(idx + 1).padStart(2, '0')}
                        </p>
                        <h3 className="font-tech text-2xl sm:text-[1.75rem] font-bold tracking-[-0.025em] text-[#F8FAFC] leading-tight">
                          {shot.title}
                        </h3>
                        <p className="text-sm sm:text-[15px] text-[#8B95B0] leading-[1.65] line-clamp-3">
                          {shot.caption}
                        </p>
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() => setLightboxIndex(fullIndex)}
                            className="inline-flex items-center gap-1.5 font-mono text-xs text-[#8B95B0] hover:text-[#F8FAFC] transition-colors duration-150 industrial-ease cursor-pointer"
                          >
                            <Maximize2 className="w-3.5 h-3.5 text-[#6D61FF]" aria-hidden="true" />
                            <span>{t.omnideskPage.expandPreviewLabel}</span>
                          </button>
                        </div>
                      </div>

                      {/* Large Clean WebM Video Frame */}
                      <div className={`lg:col-span-7 ${isFlipped ? 'lg:order-1' : 'lg:order-2'}`}>
                        <button
                          type="button"
                          onClick={() => setLightboxIndex(fullIndex)}
                          aria-label={`${shot.title} — ${t.omnideskPage.expandPreviewLabel}`}
                          className="group relative block w-full text-left rounded-xl overflow-hidden bg-[#101422] border border-white/[0.06] hover:border-white/[0.14] transition-colors duration-150 industrial-ease cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5B4EFF]"
                        >
                          <MediaFrame
                            src={SCREENSHOT_SRC[shot.id]}
                            poster={SCREENSHOT_POSTER[shot.id]}
                            alt={shot.title}
                            fallbackTitle={shot.title}
                            lazyPlayOnView
                            isPaused={lightboxIndex !== null}
                            className="aspect-video border-0 rounded-none bg-[#0A0D16]"
                            imgClassName="object-contain bg-[#0A0D16]"
                          />
                          <span
                            aria-hidden="true"
                            className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0A0D16]/80 backdrop-blur-sm border border-white/[0.08] font-mono text-[10px] text-[#F8FAFC] opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                          >
                            <Maximize2 className="w-3 h-3" />
                            <span>Full view</span>
                          </span>
                        </button>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>

              {/* Expandable Toggle for Remaining Demos */}
              {additionalDemos.length > 0 && (
                <div className="pt-4 space-y-12">
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => setShowMoreDemos((prev) => !prev)}
                      aria-expanded={showMoreDemos}
                      className="inline-flex items-center gap-2.5 px-5 py-3 min-h-[44px] font-mono text-xs font-medium text-[#F8FAFC] bg-[#101422] hover:bg-[#171D31] border border-white/[0.08] rounded-lg transition-colors duration-150 industrial-ease cursor-pointer"
                    >
                      <span>{moreDemosButtonText}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#8B95B0] transition-transform duration-200 ${
                          showMoreDemos ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </div>

                  <AnimatePresence initial={false}>
                    {showMoreDemos && (
                      <motion.div
                        initial={shouldReduceMotion ? false : {opacity: 0, y: 12}}
                        animate={{opacity: 1, y: 0}}
                        exit={shouldReduceMotion ? undefined : {opacity: 0, y: -8}}
                        transition={{duration: 0.18, ease: INDUSTRIAL_EASE}}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
                      >
                        {additionalDemos.map((shot) => {
                          const fullIndex = screenshotIndexMap.get(shot.id) ?? 0;
                          return (
                            <div key={shot.id} className="space-y-4">
                              <button
                                type="button"
                                onClick={() => setLightboxIndex(fullIndex)}
                                aria-label={`${shot.title} — ${t.omnideskPage.expandPreviewLabel}`}
                                className="group relative block w-full text-left rounded-xl overflow-hidden bg-[#101422] border border-white/[0.06] hover:border-white/[0.14] transition-colors duration-150 industrial-ease cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5B4EFF]"
                              >
                                <MediaFrame
                                  src={SCREENSHOT_SRC[shot.id]}
                                  poster={SCREENSHOT_POSTER[shot.id]}
                                  alt={shot.title}
                                  fallbackTitle={shot.title}
                                  lazyPlayOnView
                                  isPaused={lightboxIndex !== null}
                                  className="aspect-video border-0 rounded-none bg-[#0A0D16]"
                                  imgClassName="object-contain bg-[#0A0D16]"
                                />
                                <span
                                  aria-hidden="true"
                                  className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0A0D16]/80 backdrop-blur-sm border border-white/[0.08] font-mono text-[10px] text-[#F8FAFC] opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                                >
                                  <Maximize2 className="w-3 h-3" />
                                  <span>Full view</span>
                                </span>
                              </button>
                              <div className="space-y-1.5 px-1">
                                <h3 className="font-tech text-lg font-semibold tracking-[-0.02em] text-[#F8FAFC]">
                                  {shot.title}
                                </h3>
                                <p className="text-sm text-[#8B95B0] leading-relaxed line-clamp-2">
                                  {shot.caption}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
          </div>
        </section>

        {/* Subtle Gradient Divider: Showcase → Architecture */}
        <div className="max-w-[1080px] mx-auto px-5 sm:px-8" aria-hidden="true">
          <div className="omnidesk-section-divider" />
        </div>

        {/* SECTION 02: ARCHITECTURE — Borderless Points, Two Translucent Custom SVG Diagrams */}
        <section id="architecture" className="scroll-mt-16 py-24 sm:py-32">
          <div className="max-w-[1080px] mx-auto px-5 sm:px-8 space-y-20">
            <div className="space-y-3 max-w-2xl">
              <p className="font-mono text-xs text-[#6D61FF] tracking-wider">02 Architecture</p>
              <RevealText
                as="h2"
                text={t.omnideskPage.architectureHeading}
                className="font-tech text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-[#F8FAFC]"
              />
              <p className="text-[15px] sm:text-base text-[#8B95B0] leading-relaxed">
                {t.omnideskPage.architectureLead}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left Column: Numbered Architecture Points — NO Horizontal Divider Lines */}
              <div className="lg:col-span-5 space-y-9">
                {t.omnideskPage.highlights.map((item, idx) => (
                  <motion.div
                    key={item.title}
                    initial={shouldReduceMotion ? false : {opacity: 0, y: 14}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={VIEWPORT_CONFIG}
                    transition={{duration: 0.4, delay: idx * 0.05, ease: INDUSTRIAL_EASE}}
                    className="space-y-2"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs text-[#6D61FF] tabular-nums shrink-0">
                        {String(idx + 1).padStart(2, '0')}.
                      </span>
                      <h3 className="font-tech text-base sm:text-[17px] font-semibold tracking-[-0.02em] text-[#F8FAFC]">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm text-[#8B95B0] leading-[1.65] pl-7">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Right Column: Two Custom SVG Diagrams (FIG 01 & FIG 02 with TYPESCRIPT 5) */}
              <div className="lg:col-span-7">
                <ArchitectureDiagrams />
              </div>
            </div>

            {/* Quiet Open Spec Summary (Themes, Widgets & Stack — Borderless, Generous Whitespace) */}
            <div className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
              <div className="lg:col-span-4 space-y-4">
                <p className="font-mono text-xs text-[#6D61FF] tracking-wide">
                  {t.omnideskPage.themesHeading}
                </p>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-[#CBD5E1]">
                  {t.omnideskPage.themesList.map((themeName) => (
                    <li key={themeName} className="truncate text-[#8B95B0]">
                      {themeName}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-3 space-y-4">
                <p className="font-mono text-xs text-[#6D61FF] tracking-wide">
                  {t.omnideskPage.widgetsHeading}
                </p>
                <ul className="space-y-2 text-xs text-[#8B95B0]">
                  {t.omnideskPage.widgetsList.map((widget) => (
                    <li key={widget}>{widget}</li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <p className="font-mono text-xs text-[#6D61FF] tracking-wide">
                  {t.omnideskPage.stackHeading}
                </p>
                <div className="space-y-4">
                  {t.omnideskPage.stackItems.map((row) => (
                    <div key={row.layer} className="space-y-0.5">
                      <p className="text-xs font-semibold text-[#F8FAFC]">{row.layer}</p>
                      <p className="font-mono text-[11px] text-[#8B95B0]">{row.technologies}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Subtle Gradient Divider: Architecture → Catalog */}
        <div className="max-w-[1080px] mx-auto px-5 sm:px-8" aria-hidden="true">
          <div className="omnidesk-section-divider" />
        </div>

        {/* SECTION 03: CATALOG — Translucent Container + Borderless 3-Column Typographic Directory */}
        <section id="catalog" className="scroll-mt-16 py-24 sm:py-32">
          <div className="max-w-[1080px] mx-auto px-5 sm:px-8 space-y-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <p className="font-mono text-xs text-[#6D61FF] tracking-wider">03 Catalog</p>
                <RevealText
                  as="h2"
                  text={t.omnideskPage.catalogHeading}
                  className="font-tech text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-[#F8FAFC]"
                />
                <p className="text-[15px] sm:text-base text-[#8B95B0] leading-relaxed">
                  {t.omnideskPage.catalogLead}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
                <div className="relative flex-1 lg:w-60">
                  <Search
                    className="w-4 h-4 text-[#8B95B0] absolute left-3.5 top-1/2 -translate-y-1/2"
                    aria-hidden="true"
                  />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.omnideskPage.searchPlaceholder}
                    aria-label={t.omnideskPage.searchPlaceholder}
                    className="w-full pl-10 pr-9 py-2.5 min-h-[42px] bg-[#101422]/75 border border-white/[0.08] focus:border-[#5B4EFF] rounded-lg font-mono text-xs text-[#F8FAFC] placeholder:text-[#56607C] focus:outline-none transition-colors duration-150 industrial-ease"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      aria-label={t.omnideskPage.clearSearchLabel}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#8B95B0] hover:text-[#F8FAFC] transition-colors duration-150 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  )}
                </div>

                {/* Expand All / Collapse Toggle */}
                <button
                  type="button"
                  onClick={() => setExpandAll((prev) => !prev)}
                  aria-pressed={expandAll}
                  className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[42px] font-mono text-xs font-medium rounded-lg border transition-colors duration-150 industrial-ease whitespace-nowrap shrink-0 cursor-pointer ${
                    expandAll
                      ? 'bg-[#5B4EFF] text-[#F8FAFC] border-[#5B4EFF]'
                      : 'bg-[#101422]/75 text-[#F8FAFC] border-white/[0.08] hover:border-white/[0.18]'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>
                    {expandAll ? 'Collapse tabs' : `Expand all (${totalToolsCount})`}
                  </span>
                </button>
              </div>
            </div>

            {/* Translucent Catalog Container (No Divider Lines Inside) */}
            <div className="omnidesk-glass rounded-xl p-4 sm:p-8 space-y-8 sm:space-y-10">
              {/* Clean Category Tabs Bar */}
              <div
                role="tablist"
                aria-label={t.omnideskPage.catalogHeading}
                className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center justify-between gap-3 sm:gap-4"
              >
                <div className="flex flex-nowrap sm:flex-wrap items-center gap-1.5 overflow-x-auto sm:overflow-visible no-scrollbar fade-mask-right sm:mask-none pr-8 sm:pr-0 min-w-0">
                  {t.omnideskPage.categories.map((cat) => {
                    const isSelected = !expandAll && !searchQuery.trim() && activeCategoryFilter === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => {
                          setExpandAll(false);
                          setSearchQuery('');
                          setSelectedFilter(cat.id);
                        }}
                        className={`inline-flex items-center gap-2 px-3.5 py-2 min-h-[38px] text-xs rounded-lg transition-colors duration-150 industrial-ease whitespace-nowrap shrink-0 cursor-pointer ${
                          isSelected
                            ? 'bg-[#5B4EFF] text-[#F8FAFC] font-medium'
                            : 'text-[#8B95B0] hover:text-[#F8FAFC] hover:bg-white/[0.04]'
                        }`}
                      >
                        <span>{cat.title}</span>
                        <span className="font-mono text-[11px] opacity-70 tabular-nums">
                          {cat.tools.length}
                        </span>
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    role="tab"
                    aria-selected={!expandAll && !searchQuery.trim() && activeCategoryFilter === 'basics'}
                    onClick={() => {
                      setExpandAll(false);
                      setSearchQuery('');
                      setSelectedFilter('basics');
                    }}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 min-h-[38px] text-xs rounded-lg transition-colors duration-150 industrial-ease whitespace-nowrap shrink-0 cursor-pointer ${
                      !expandAll && !searchQuery.trim() && activeCategoryFilter === 'basics'
                        ? 'bg-[#5B4EFF] text-[#F8FAFC] font-medium'
                        : 'text-[#8B95B0] hover:text-[#F8FAFC] hover:bg-white/[0.04]'
                    }`}
                  >
                    <span>{t.omnideskPage.everydayBasicsFilter}</span>
                    <span className="font-mono text-[11px] opacity-70 tabular-nums">
                      {everydayBasicsCount}
                    </span>
                  </button>
                </div>

                <span className="font-mono text-xs text-[#8B95B0] tabular-nums shrink-0">
                  {t.omnideskPage.showingCountPrefix} {totalVisibleTools} / {totalToolsCount}
                </span>
              </div>

              {visibleCatalogSections.length === 0 ? (
                <div className="py-12 text-center font-mono text-xs text-[#8B95B0]">
                  {t.omnideskPage.searchEmpty}
                </div>
              ) : (
                <motion.div
                  key={`${activeCategoryFilter}-${expandAll}-${Boolean(searchQuery.trim())}`}
                  initial={shouldReduceMotion ? false : {opacity: 0, y: 8}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 0.18, ease: INDUSTRIAL_EASE}}
                  className="space-y-14"
                >
                  {visibleCatalogSections.map((category) => (
                    <div key={category.id} className="space-y-6">
                      <div className="flex flex-wrap items-baseline justify-between gap-4">
                        <div className="space-y-1">
                          <h3 className="font-tech text-xl sm:text-2xl font-bold tracking-[-0.02em] text-[#F8FAFC]">
                            {category.title}
                          </h3>
                          <p className="text-sm text-[#8B95B0]">{category.subtitle}</p>
                        </div>
                        <span className="font-mono text-xs text-[#8B95B0] tabular-nums shrink-0">
                          {category.tools.length} {t.omnideskPage.toolsUnitLabel}
                        </span>
                      </div>

                      {/* Calm Borderless 3-Column Typographic Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-4">
                        {category.tools.map((tool) => {
                          const isHighlighted = highlightedToolId === tool.id;
                          return (
                            <div
                              key={tool.id}
                              className={`p-5 rounded-xl transition-colors duration-150 industrial-ease ${
                                isHighlighted
                                  ? 'bg-[#5B4EFF]/15 ring-1 ring-[#5B4EFF]/60'
                                  : 'bg-transparent hover:bg-white/[0.04]'
                              }`}
                            >
                              <div className="flex items-baseline justify-between gap-3">
                                <h4 className="font-tech text-[15px] font-semibold tracking-[-0.01em] text-[#F8FAFC] leading-snug">
                                  {tool.title}
                                </h4>
                                {tool.isDesktopOnly && (
                                  <span className="font-mono text-[10px] text-[#10B981] shrink-0">
                                    Desktop
                                  </span>
                                )}
                              </div>
                              <p className="mt-2 text-[13px] text-[#8B95B0] leading-relaxed">
                                {tool.description}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxItem && lightboxIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={activeLightboxItem.title}
            initial={shouldReduceMotion ? false : {opacity: 0}}
            animate={{opacity: 1}}
            exit={shouldReduceMotion ? undefined : {opacity: 0}}
            transition={{duration: 0.15}}
            className="fixed inset-0 z-50 bg-[#0A0D16]/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              initial={shouldReduceMotion ? false : {opacity: 0, scale: 0.985}}
              animate={{opacity: 1, scale: 1}}
              exit={shouldReduceMotion ? undefined : {opacity: 0, scale: 0.985}}
              transition={{duration: 0.16, ease: INDUSTRIAL_EASE}}
              className="w-full max-w-5xl bg-[#101422] border border-white/[0.08] rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-white/[0.06]">
                <div className="min-w-0">
                  <h3 className="font-tech text-sm font-semibold text-[#F8FAFC] truncate">
                    {activeLightboxItem.title}
                  </h3>
                  <p className="text-xs text-[#8B95B0] truncate mt-0.5">
                    {activeLightboxItem.caption}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="font-mono text-xs text-[#8B95B0] tabular-nums mr-2">
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
                    className="p-2 text-[#8B95B0] hover:text-[#F8FAFC] bg-white/[0.04] hover:bg-white/[0.08] rounded-lg transition-colors duration-150 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex((lightboxIndex + 1) % screenshots.length)}
                    aria-label={t.omnideskPage.galleryNextLabel}
                    className="p-2 text-[#8B95B0] hover:text-[#F8FAFC] bg-white/[0.04] hover:bg-white/[0.08] rounded-lg transition-colors duration-150 cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(null)}
                    aria-label={t.omnideskPage.galleryCloseLabel}
                    className="p-2 text-[#8B95B0] hover:text-[#F8FAFC] bg-white/[0.04] hover:bg-white/[0.08] rounded-lg transition-colors duration-150 cursor-pointer"
                  >
                    <X className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="bg-[#0A0D16] p-3 sm:p-4">
                {VIDEO_SRC_REGEX.test(SCREENSHOT_SRC[activeLightboxItem.id]) ? (
                  <video
                    key={activeLightboxItem.id}
                    ref={(el) => {
                      if (el) {
                        el.muted = true;
                        el.defaultMuted = true;
                        el.playsInline = true;
                        el.setAttribute('muted', '');
                        el.setAttribute('playsinline', '');
                        el.setAttribute('webkit-playsinline', '');
                      }
                    }}
                    poster={SCREENSHOT_POSTER[activeLightboxItem.id]}
                    aria-label={activeLightboxItem.title}
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    className="w-full max-h-[75vh] object-contain mx-auto rounded-lg bg-[#0A0D16]"
                  >
                    <source
                      src={SCREENSHOT_SRC[activeLightboxItem.id].replace(/\.webm(\?.*)?$/i, '.mp4$1')}
                      type="video/mp4"
                    />
                    <source src={SCREENSHOT_SRC[activeLightboxItem.id]} type="video/webm" />
                  </video>
                ) : (
                  <img
                    key={activeLightboxItem.id}
                    src={SCREENSHOT_SRC[activeLightboxItem.id]}
                    alt={activeLightboxItem.title}
                    className="w-full max-h-[75vh] object-contain mx-auto rounded-lg bg-[#0A0D16]"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
