import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  CornerDownLeft,
  Download,
  Layers,
  Maximize2,
  Pause,
  Play,
  Search,
  Terminal,
  X,
} from 'lucide-react';
import {AnimatePresence, motion, useReducedMotion, useScroll, useTransform} from 'motion/react';
import {useEffect, useMemo, useRef, useState} from 'react';
import {LanguageSwitcher} from '../components/LanguageSwitcher';
import {MediaFrame} from '../components/MediaFrame';
import {OmniDeskLogo} from '../components/OmniDeskLogo';
import {
  INDUSTRIAL_EASE,
  ParallaxLayer,
  RevealText,
  ScrollProgressBar,
  ScrollReveal,
  VIEWPORT_CONFIG,
} from '../components/OmniDeskMotion';
import {EXTERNAL_LINKS, MEDIA_ASSETS} from '../data/links';
import {useI18n} from '../i18n/context';
import type {OmniDeskScreenshotItem, PageRoute} from '../i18n/types';

interface OmniDeskPageProps {
  onNavigate: (route: PageRoute, hash?: string) => void;
}

const SCREENSHOT_SRC: Record<OmniDeskScreenshotItem['id'], string> = {
  dashboard: MEDIA_ASSETS.omnideskScreens.dashboard,
  pdfEditor: MEDIA_ASSETS.omnideskScreens.pdfEditor,
  calendar: MEDIA_ASSETS.omnideskScreens.calendar,
  currency: MEDIA_ASSETS.omnideskScreens.currency,
  graph2d: MEDIA_ASSETS.omnideskScreens.graph2d,
  chemistry: MEDIA_ASSETS.omnideskScreens.chemistry,
  colorPicker: MEDIA_ASSETS.omnideskScreens.colorPicker,
  themes: MEDIA_ASSETS.omnideskScreens.themes,
  config: MEDIA_ASSETS.omnideskScreens.config,
};

type CatalogFilter = 'basics' | string;

interface PaletteToolEntry {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  categoryTitle: string;
  shortcut: string;
  runtime: string;
  isEverydayBasic: boolean;
}

function ArchitectureDiagrams() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const lineInitial = shouldReduceMotion ? false : {pathLength: 0, opacity: 0};
  const lineAnimate = {pathLength: 1, opacity: 1};
  const nodeInitial = shouldReduceMotion ? false : {opacity: 0, y: 8};
  const nodeAnimate = {opacity: 1, y: 0};

  return (
    <ParallaxLayer offset={18} className="space-y-6">
      <div className="space-y-6">
        {/* Diagram 01: Local-First Execution Pipeline */}
        <motion.div
          initial={shouldReduceMotion ? false : {opacity: 0, y: 26, scale: 0.985}}
          whileInView={{opacity: 1, y: 0, scale: 1}}
          viewport={VIEWPORT_CONFIG}
          transition={{duration: 0.55, ease: INDUSTRIAL_EASE}}
          className="bg-[#101422] border border-[#1E2438] hover:border-[#2D3654] transition-colors duration-200 rounded-xl p-5 space-y-4"
        >
          <div className="flex items-center justify-between gap-4 border-b border-[#1E2438] pb-3">
            <span className="font-mono text-[11px] text-[#F8FAFC] tracking-wider">
              FIG 01 // EXECUTION PIPELINE
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
              transition={{duration: 0.4, delay: 0.08, ease: INDUSTRIAL_EASE}}
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
              transition={{duration: 0.45, delay: 0.2, ease: INDUSTRIAL_EASE}}
            />
            <motion.polygon
              points="164,57 172,61 164,65"
              fill="#5B4EFF"
              initial={shouldReduceMotion ? false : {opacity: 0}}
              whileInView={{opacity: 1}}
              viewport={VIEWPORT_CONFIG}
              transition={{duration: 0.25, delay: 0.42}}
            />

            {/* Node 2: Worker / Rust IPC */}
            <motion.g
              initial={nodeInitial}
              whileInView={nodeAnimate}
              viewport={VIEWPORT_CONFIG}
              transition={{duration: 0.4, delay: 0.26, ease: INDUSTRIAL_EASE}}
            >
              <rect x="172" y="26" width="166" height="70" rx="6" fill="#0A0D16" stroke="#5B4EFF" strokeWidth="1.25" />
              <text x="184" y="46" fill="#6D61FF" fontSize="9" fontFamily="JetBrains Mono, monospace">
                02 COMPUTE // LOCAL
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
              transition={{duration: 0.45, delay: 0.38, ease: INDUSTRIAL_EASE}}
            />
            <motion.polygon
              points="384,57 392,61 384,65"
              fill="#5B4EFF"
              initial={shouldReduceMotion ? false : {opacity: 0}}
              whileInView={{opacity: 1}}
              viewport={VIEWPORT_CONFIG}
              transition={{duration: 0.25, delay: 0.58}}
            />

            {/* Node 3: Instant Output */}
            <motion.g
              initial={nodeInitial}
              whileInView={nodeAnimate}
              viewport={VIEWPORT_CONFIG}
              transition={{duration: 0.4, delay: 0.46, ease: INDUSTRIAL_EASE}}
            >
              <rect x="392" y="34" width="160" height="54" rx="6" fill="#0A0D16" stroke="#F8FAFC" strokeWidth="1" />
              <text x="404" y="54" fill="#8B95B0" fontSize="9" fontFamily="JetBrains Mono, monospace">
                03 OUTPUT // 0ms
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
              transition={{duration: 0.45, delay: 0.54, ease: INDUSTRIAL_EASE}}
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

              {/* Local storage link */}
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

        {/* Diagram 02: Dual-Runtime Core Architecture */}
        <motion.div
          initial={shouldReduceMotion ? false : {opacity: 0, y: 26, scale: 0.985}}
          whileInView={{opacity: 1, y: 0, scale: 1}}
          viewport={VIEWPORT_CONFIG}
          transition={{duration: 0.55, delay: 0.08, ease: INDUSTRIAL_EASE}}
          className="bg-[#101422] border border-[#1E2438] hover:border-[#2D3654] transition-colors duration-200 rounded-xl p-5 space-y-4"
        >
          <div className="flex items-center justify-between gap-4 border-b border-[#1E2438] pb-3">
            <span className="font-mono text-[11px] text-[#F8FAFC] tracking-wider">
              FIG 02 // DUAL-RUNTIME BOUNDARY
            </span>
            <span className="font-mono text-[10px] text-[#8B95B0] tabular-nums">
              SHARED TS CORE
            </span>
          </div>

          <svg
            viewBox="0 0 560 176"
            className="w-full h-auto block"
            role="img"
            aria-label="Dual runtime architecture diagram showing shared React and TypeScript core compiling to Tauri v2 desktop and offline PWA"
          >
            {/* Top shared core */}
            <motion.g
              initial={nodeInitial}
              whileInView={nodeAnimate}
              viewport={VIEWPORT_CONFIG}
              transition={{duration: 0.4, delay: 0.1, ease: INDUSTRIAL_EASE}}
            >
              <rect x="90" y="12" width="380" height="44" rx="6" fill="#0A0D16" stroke="#F8FAFC" strokeWidth="1" />
              <text x="106" y="30" fill="#6D61FF" fontSize="9" fontFamily="JetBrains Mono, monospace">
                SHARED WORKSPACE CORE
              </text>
              <text x="106" y="46" fill="#F8FAFC" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="600">
                REACT 19 · TYPESCRIPT 7 · PURE LOGIC MODULES
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
              transition={{duration: 0.55, delay: 0.24, ease: INDUSTRIAL_EASE}}
            />
            <motion.path
              d="M280 80 H424 V100"
              fill="none"
              stroke="#36405E"
              strokeWidth="1.25"
              initial={lineInitial}
              whileInView={lineAnimate}
              viewport={VIEWPORT_CONFIG}
              transition={{duration: 0.55, delay: 0.3, ease: INDUSTRIAL_EASE}}
            />
            <motion.circle
              cx="280"
              cy="80"
              r="3"
              fill="#5B4EFF"
              initial={shouldReduceMotion ? false : {scale: 0, opacity: 0}}
              whileInView={{scale: 1, opacity: 1}}
              viewport={VIEWPORT_CONFIG}
              transition={{duration: 0.3, delay: 0.32}}
            />

            {/* Left Branch: Tauri v2 Desktop */}
            <motion.g
              initial={nodeInitial}
              whileInView={nodeAnimate}
              viewport={VIEWPORT_CONFIG}
              transition={{duration: 0.42, delay: 0.38, ease: INDUSTRIAL_EASE}}
            >
              <rect x="12" y="100" width="248" height="64" rx="6" fill="#0A0D16" stroke="#5B4EFF" strokeWidth="1.25" />
              <text x="24" y="119" fill="#6D61FF" fontSize="9" fontFamily="JetBrains Mono, monospace">
                NATIVE DESKTOP // LOCAL
              </text>
              <text x="24" y="137" fill="#F8FAFC" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="600">
                TAURI v2 + RUST BACKEND
              </text>
              <text x="24" y="153" fill="#8B95B0" fontSize="9" fontFamily="JetBrains Mono, monospace">
                FS · OS PRINT · MCP (24) · UPDATER
              </text>
            </motion.g>

            {/* Right Branch: Web / Offline PWA */}
            <motion.g
              initial={nodeInitial}
              whileInView={nodeAnimate}
              viewport={VIEWPORT_CONFIG}
              transition={{duration: 0.42, delay: 0.46, ease: INDUSTRIAL_EASE}}
            >
              <rect x="300" y="100" width="248" height="64" rx="6" fill="#0A0D16" stroke="#2D3654" strokeWidth="1" />
              <text x="312" y="119" fill="#8B95B0" fontSize="9" fontFamily="JetBrains Mono, monospace">
                ZERO-INSTALL // SANDBOX
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

        {/* Diagram 03: Desktop MCP Bridge */}
        <motion.div
          initial={shouldReduceMotion ? false : {opacity: 0, y: 26, scale: 0.985}}
          whileInView={{opacity: 1, y: 0, scale: 1}}
          viewport={VIEWPORT_CONFIG}
          transition={{duration: 0.55, delay: 0.14, ease: INDUSTRIAL_EASE}}
          className="bg-[#101422] border border-[#1E2438] hover:border-[#2D3654] transition-colors duration-200 rounded-xl p-5 space-y-4"
        >
          <div className="flex items-center justify-between gap-4 border-b border-[#1E2438] pb-3">
            <span className="font-mono text-[11px] text-[#F8FAFC] tracking-wider">
              FIG 03 // DESKTOP MCP BRIDGE
            </span>
            <span className="font-mono text-[10px] text-[#10B981] tabular-nums">
              24 TOOLS · 4 RESOURCES
            </span>
          </div>

          <svg
            viewBox="0 0 560 176"
            className="w-full h-auto block"
            role="img"
            aria-label="Desktop MCP Bridge architecture connecting local AI clients to 24 OmniDesk tools over loopback WebSocket or native stdio IPC"
          >
            {/* Left: AI Clients */}
            <motion.g
              initial={nodeInitial}
              whileInView={nodeAnimate}
              viewport={VIEWPORT_CONFIG}
              transition={{duration: 0.4, delay: 0.08, ease: INDUSTRIAL_EASE}}
            >
              <rect x="8" y="20" width="152" height="72" rx="6" fill="#0A0D16" stroke="#2D3654" strokeWidth="1" />
              <text x="20" y="40" fill="#8B95B0" fontSize="9" fontFamily="JetBrains Mono, monospace">
                AI CLIENTS
              </text>
              <text x="20" y="59" fill="#F8FAFC" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="600">
                CLAUDE · CURSOR
              </text>
              <text x="20" y="76" fill="#8B95B0" fontSize="9" fontFamily="JetBrains Mono, monospace">
                VS CODE · WINDSURF
              </text>
            </motion.g>

            {/* Arrow 1 -> 2 */}
            <motion.line
              x1="160"
              y1="56"
              x2="196"
              y2="56"
              stroke="#5B4EFF"
              strokeWidth="1.5"
              initial={lineInitial}
              whileInView={lineAnimate}
              viewport={VIEWPORT_CONFIG}
              transition={{duration: 0.42, delay: 0.22, ease: INDUSTRIAL_EASE}}
            />
            <motion.polygon
              points="196,52 204,56 196,60"
              fill="#5B4EFF"
              initial={shouldReduceMotion ? false : {opacity: 0}}
              whileInView={{opacity: 1}}
              viewport={VIEWPORT_CONFIG}
              transition={{duration: 0.25, delay: 0.4}}
            />

            {/* Center: Transport Layer */}
            <motion.g
              initial={nodeInitial}
              whileInView={nodeAnimate}
              viewport={VIEWPORT_CONFIG}
              transition={{duration: 0.4, delay: 0.28, ease: INDUSTRIAL_EASE}}
            >
              <rect x="204" y="20" width="152" height="72" rx="6" fill="#0A0D16" stroke="#5B4EFF" strokeWidth="1.25" />
              <text x="216" y="40" fill="#6D61FF" fontSize="9" fontFamily="JetBrains Mono, monospace">
                DUAL TRANSPORT
              </text>
              <text x="216" y="59" fill="#F8FAFC" fontSize="10.5" fontFamily="JetBrains Mono, monospace" fontWeight="600">
                WS 127.0.0.1:3847
              </text>
              <text x="216" y="76" fill="#8B95B0" fontSize="9" fontFamily="JetBrains Mono, monospace">
                OR --mcp-stdio IPC
              </text>
            </motion.g>

            {/* Arrow 2 -> 3 */}
            <motion.line
              x1="356"
              y1="56"
              x2="392"
              y2="56"
              stroke="#5B4EFF"
              strokeWidth="1.5"
              initial={lineInitial}
              whileInView={lineAnimate}
              viewport={VIEWPORT_CONFIG}
              transition={{duration: 0.42, delay: 0.38, ease: INDUSTRIAL_EASE}}
            />
            <motion.polygon
              points="392,52 400,56 392,60"
              fill="#5B4EFF"
              initial={shouldReduceMotion ? false : {opacity: 0}}
              whileInView={{opacity: 1}}
              viewport={VIEWPORT_CONFIG}
              transition={{duration: 0.25, delay: 0.56}}
            />

            {/* Right: Tauri v2 Core */}
            <motion.g
              initial={nodeInitial}
              whileInView={nodeAnimate}
              viewport={VIEWPORT_CONFIG}
              transition={{duration: 0.4, delay: 0.44, ease: INDUSTRIAL_EASE}}
            >
              <rect x="400" y="20" width="152" height="72" rx="6" fill="#0A0D16" stroke="#10B981" strokeWidth="1" />
              <text x="412" y="40" fill="#10B981" fontSize="9" fontFamily="JetBrains Mono, monospace">
                TAURI v2 CORE
              </text>
              <text x="412" y="59" fill="#F8FAFC" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="600">
                24 MCP TOOLS
              </text>
              <text x="412" y="76" fill="#8B95B0" fontSize="9" fontFamily="JetBrains Mono, monospace">
                4 READ RESOURCES
              </text>
            </motion.g>

            {/* Bottom Security Guardrail Bar */}
            <motion.line
              x1="280"
              y1="92"
              x2="280"
              y2="114"
              stroke="#2D3654"
              strokeWidth="1"
              initial={lineInitial}
              whileInView={lineAnimate}
              viewport={VIEWPORT_CONFIG}
              transition={{duration: 0.3, delay: 0.5}}
            />
            <circle cx="280" cy="92" r="2.5" fill="#10B981" />
            <motion.g
              initial={nodeInitial}
              whileInView={nodeAnimate}
              viewport={VIEWPORT_CONFIG}
              transition={{duration: 0.42, delay: 0.55, ease: INDUSTRIAL_EASE}}
            >
              <rect x="8" y="114" width="544" height="44" rx="6" fill="#0A0D16" stroke="#1E2438" strokeWidth="1" />
              <text x="24" y="133" fill="#10B981" fontSize="9" fontFamily="JetBrains Mono, monospace">
                LOCAL SECURITY BOUNDARY // DESKTOP ONLY
              </text>
              <text x="24" y="149" fill="#8B95B0" fontSize="9" fontFamily="JetBrains Mono, monospace">
                LOOPBACK ONLY · OPTIONAL AUTH TOKEN · WORKSPACE SANDBOX · READONLY/RW · PIN LOCK GUARD
              </text>
            </motion.g>
          </svg>
        </motion.div>
      </div>
    </ParallaxLayer>
  );
}

export function OmniDeskPage({onNavigate}: OmniDeskPageProps) {
  const {t} = useI18n();
  const shouldReduceMotion = useReducedMotion() ?? false;

  // Scroll-linked subtle depth for the Hero section
  const heroRef = useRef<HTMLElement>(null);
  const {scrollYProgress: heroScrollProgress} = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroTextY = useTransform(heroScrollProgress, [0, 1], [0, shouldReduceMotion ? 0 : -24]);
  const heroPaletteY = useTransform(heroScrollProgress, [0, 1], [0, shouldReduceMotion ? 0 : 28]);

  const firstCategoryId = t.omnideskPage.categories[0]?.id ?? 'basics';

  // Interactive Hero Command Palette state
  const [paletteQuery, setPaletteQuery] = useState('');
  const [paletteCategory, setPaletteCategory] = useState<string>('all');
  const [paletteActiveIdx, setPaletteActiveIdx] = useState(0);
  const [inspectedToolId, setInspectedToolId] = useState<string | null>(null);
  const paletteInputRef = useRef<HTMLInputElement>(null);

  // Full Tool Index Matrix state — single category visible by default, optional Expand All toggle
  const [selectedFilter, setSelectedFilter] = useState<CatalogFilter>(firstCategoryId);
  const [expandAll, setExpandAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedToolId, setHighlightedToolId] = useState<string | null>(null);

  // Interface Capture Showcase & Lightbox state
  const [activeShotIndex, setActiveShotIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isVideoPaused, setIsVideoPaused] = useState(false);

  const screenshots = t.omnideskPage.screenshots;
  const activeShot = screenshots[activeShotIndex] ?? screenshots[0];

  // Ensure selectedFilter remains valid if locale categories ever shift
  const activeCategoryFilter = useMemo(() => {
    if (selectedFilter === 'basics') {
      return 'basics';
    }
    const exists = t.omnideskPage.categories.some((cat) => cat.id === selectedFilter);
    return exists ? selectedFilter : firstCategoryId;
  }, [firstCategoryId, selectedFilter, t.omnideskPage.categories]);

  // Flatten all real OmniDesk tools for the Live Command Palette
  const allPaletteTools: PaletteToolEntry[] = useMemo(() => {
    const entries: PaletteToolEntry[] = [];
    t.omnideskPage.categories.forEach((cat, catIndex) => {
      cat.tools.forEach((tool, toolIndex) => {
        const lowerTitle = tool.title.toLowerCase();
        const runtime =
          lowerTitle.includes('pdf') ||
          lowerTitle.includes('audio') ||
          lowerTitle.includes('image') ||
          lowerTitle.includes('photo') ||
          lowerTitle.includes('converter') ||
          lowerTitle.includes('hash') ||
          lowerTitle.includes('aes')
            ? 'WEB WORKER'
            : lowerTitle.includes('http') ||
                lowerTitle.includes('api') ||
                lowerTitle.includes('currency') ||
                lowerTitle.includes('crypto')
              ? 'HYBRID LOCAL'
              : 'IN-MEMORY';

        entries.push({
          id: tool.id,
          title: tool.title,
          description: tool.description,
          categoryId: cat.id,
          categoryTitle: cat.title,
          shortcut: `#${catIndex + 1}-${String(toolIndex + 1).padStart(2, '0')}`,
          runtime,
          isEverydayBasic: Boolean(tool.isEverydayBasic),
        });
      });
    });
    return entries;
  }, [t.omnideskPage.categories]);

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

  const paletteResults = useMemo(() => {
    const q = paletteQuery.trim().toLowerCase();
    return allPaletteTools
      .filter((entry) => {
        if (paletteCategory === 'basics' && !entry.isEverydayBasic) {
          return false;
        }
        if (
          paletteCategory !== 'all' &&
          paletteCategory !== 'basics' &&
          entry.categoryId !== paletteCategory
        ) {
          return false;
        }
        if (!q) {
          return true;
        }
        return (
          entry.title.toLowerCase().includes(q) ||
          entry.description.toLowerCase().includes(q) ||
          entry.categoryTitle.toLowerCase().includes(q)
        );
      })
      .slice(0, 7);
  }, [allPaletteTools, paletteCategory, paletteQuery]);

  const clampedPaletteIdx =
    paletteResults.length > 0 ? Math.min(paletteActiveIdx, paletteResults.length - 1) : 0;

  const inspectedTool = useMemo(() => {
    if (inspectedToolId) {
      const found = allPaletteTools.find((item) => item.id === inspectedToolId);
      if (found) {
        return found;
      }
    }
    return paletteResults[clampedPaletteIdx] ?? allPaletteTools[0] ?? null;
  }, [allPaletteTools, clampedPaletteIdx, inspectedToolId, paletteResults]);

  // Clear temporary tool highlight after 2.6s
  useEffect(() => {
    if (!highlightedToolId) {
      return;
    }
    const timer = window.setTimeout(() => setHighlightedToolId(null), 2600);
    return () => window.clearTimeout(timer);
  }, [highlightedToolId]);

  // Global keyboard shortcuts (Ctrl+K / Cmd+K focuses command palette, lightbox keys)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (event.key === 'Escape') {
          setLightboxIndex(null);
        } else if (event.key === 'ArrowLeft') {
          setLightboxIndex((prev) =>
            prev === null ? null : (prev - 1 + screenshots.length) % screenshots.length,
          );
        } else if (event.key === 'ArrowRight') {
          setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % screenshots.length));
        }
        return;
      }

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        paletteInputRef.current?.focus();
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

  const handlePaletteKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (paletteResults.length === 0) {
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const next = (clampedPaletteIdx + 1) % paletteResults.length;
      setPaletteActiveIdx(next);
      setInspectedToolId(paletteResults[next].id);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const prev = (clampedPaletteIdx - 1 + paletteResults.length) % paletteResults.length;
      setPaletteActiveIdx(prev);
      setInspectedToolId(paletteResults[prev].id);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const chosen = paletteResults[clampedPaletteIdx];
      if (chosen) {
        setInspectedToolId(chosen.id);
        jumpToToolInCatalog(chosen.categoryId, chosen.id);
      }
    } else if (event.key === 'Escape') {
      setPaletteQuery('');
      setPaletteCategory('all');
      setPaletteActiveIdx(0);
    }
  };

  const handleNav = (event: React.MouseEvent<HTMLAnchorElement>, route: PageRoute) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    event.preventDefault();
    onNavigate(route);
  };

  // Compute displayed catalog sections:
  // - If user is typing a search query: search across ALL categories so nothing is hidden
  // - Else if Expand All is toggled ON: render all categories
  // - Else if Everyday Basics tab is selected: render a single compact Everyday Basics matrix
  // - Else: render strictly the single selected app category
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

  return (
    <div className="min-h-screen bg-[#0A0D16] text-[#F8FAFC] selection:bg-[#5B4EFF] selection:text-[#F8FAFC]">
      {/* 1. Industrial Top Bar — Updated Nav Indices: 01 SHOWCASE, 02 ARCHITECTURE, 03 CATALOG */}
      <header className="sticky top-0 z-40 h-14 bg-[#0A0D16] border-b border-[#1E2438]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4">
          {/* Left: Inline SVG Logo + Monospace Brand Wordmark */}
          <div className="flex items-center gap-3 min-w-0 shrink-0">
            <a
              href="#overview"
              className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5B4EFF]"
            >
              <OmniDeskLogo className="w-6 h-6" title={t.omnideskPage.appName} />
              <span className="font-mono text-sm font-semibold tracking-wider text-[#F8FAFC]">
                OMNIDESK
              </span>
            </a>

            <span className="hidden sm:inline text-[#1E2438]" aria-hidden="true">
              |
            </span>

            <a
              href="./index.html"
              onClick={(e) => handleNav(e, 'home')}
              className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[11px] text-[#8B95B0] hover:text-[#F8FAFC] transition-colors duration-150 industrial-ease whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="w-3 h-3" aria-hidden="true" />
              <span>{t.omnideskPage.backToPortfolio.toUpperCase()}</span>
            </a>
          </div>

          {/* Center: Emerald Local Runtime Status + Reordered Anchor Links */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-wider text-[#8B95B0] whitespace-nowrap">
              <span
                className="w-2 h-2 rounded-full bg-[#10B981] inline-block shrink-0"
                aria-hidden="true"
              />
              <span className="text-[#10B981]">OFFLINE-FIRST</span>
              <span className="text-[#2D3654]">//</span>
              <span className="text-[#F8FAFC]">LOCAL RUNTIME</span>
            </div>

            <nav className="flex items-center gap-6 font-mono text-[11px] text-[#8B95B0]">
              <a
                href="#showcase"
                className="hover:text-[#F8FAFC] transition-colors duration-150 industrial-ease whitespace-nowrap"
              >
                01 {t.omnideskPage.navLinks.showcase.toUpperCase()}
              </a>
              <a
                href="#architecture"
                className="hover:text-[#F8FAFC] transition-colors duration-150 industrial-ease whitespace-nowrap"
              >
                02 {t.omnideskPage.navLinks.architecture.toUpperCase()}
              </a>
              <a
                href="#catalog"
                className="hover:text-[#F8FAFC] transition-colors duration-150 industrial-ease whitespace-nowrap"
              >
                03 {t.omnideskPage.navLinks.catalog.toUpperCase()}
              </a>
            </nav>
          </div>

          {/* Right: Sharp Flat Electric Indigo Download / Launch CTA */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={EXTERNAL_LINKS.omnideskLive}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 min-h-[36px] font-mono text-xs font-semibold tracking-wide text-[#F8FAFC] bg-[#5B4EFF] hover:bg-[#6D61FF] rounded-lg transition-colors duration-150 industrial-ease whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B4EFF]"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span>DOWNLOAD / PWA</span>
            </a>
          </div>
        </div>
      </header>
      <ScrollProgressBar />

      <main>
        {/* 2. Asymmetric Industrial Hero */}
        <section ref={heroRef} id="overview" className="border-b border-[#1E2438] overflow-x-clip">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Utility Sub-Bar: Back on mobile + Version + Language Switcher */}
            <ScrollReveal immediate direction="down" distance={10} duration={0.4}>
              <div className="py-3 border-b border-[#1E2438] flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] text-[#8B95B0]">
                  <a
                    href="./index.html"
                    onClick={(e) => handleNav(e, 'home')}
                    className="sm:hidden inline-flex items-center gap-1 text-[#F8FAFC]"
                  >
                    <ArrowLeft className="w-3 h-3" aria-hidden="true" />
                    <span>{t.omnideskPage.backToPortfolio.toUpperCase()}</span>
                  </a>
                  <span>TAURI v2 + REACT 19 + RUST</span>
                  <span className="hidden md:inline text-[#1E2438]" aria-hidden="true">
                    /
                  </span>
                  <span className="hidden md:inline">AES-256-GCM LOCAL VAULT</span>
                </div>
                <LanguageSwitcher tone="indigo" />
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-12 lg:divide-x divide-[#1E2438]">
              {/* Left Column: Headline, Utilitarian Copy & Unified CTAs */}
              <motion.div
                style={{y: heroTextY}}
                className="lg:col-span-6 py-10 sm:py-14 lg:pr-10 flex flex-col justify-between gap-10 will-change-transform"
              >
                <div className="space-y-6">
                  <ScrollReveal immediate direction="left" distance={16} delay={0.05}>
                    <div className="inline-flex items-center gap-3">
                      <OmniDeskLogo className="w-11 h-11" title={t.omnideskPage.appName} />
                      <div className="font-mono text-[11px] leading-tight">
                        <p className="text-[#F8FAFC] font-semibold tracking-wider">
                          OMNIDESK WORKSTATION
                        </p>
                        <p className="text-[#8B95B0] mt-0.5 tabular-nums">
                          99+ MODULES · 12 THEMES · 0ms LOCAL
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>

                  <RevealText
                    as="h1"
                    immediate
                    delay={0.1}
                    text={t.omnideskPage.title}
                    className="font-tech text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-[-0.03em] text-[#F8FAFC] leading-[1.03] max-w-xl"
                  />

                  <ScrollReveal immediate delay={0.22} distance={16}>
                    <p className="text-sm sm:text-base text-[#8B95B0] leading-relaxed max-w-lg">
                      {t.omnideskPage.lead}
                    </p>
                  </ScrollReveal>
                </div>

                {/* Unified Desktop Release CTA + Web PWA + Source */}
                <ScrollReveal immediate delay={0.3} distance={16} className="space-y-4">
                  <div className="flex flex-wrap items-stretch gap-3">
                    <a
                      href={`${EXTERNAL_LINKS.omnideskRepo}/releases`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 min-h-[46px] font-mono text-xs sm:text-sm font-semibold tracking-wide text-[#F8FAFC] bg-[#5B4EFF] hover:bg-[#6D61FF] rounded-lg transition-colors duration-150 industrial-ease whitespace-nowrap shrink-0"
                    >
                      <Download className="w-4 h-4" aria-hidden="true" />
                      <span>DOWNLOAD DESKTOP</span>
                    </a>

                    <a
                      href={EXTERNAL_LINKS.omnideskLive}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3.5 min-h-[46px] font-mono text-xs font-medium tracking-wide text-[#F8FAFC] bg-[#101422] hover:bg-[#161C2F] border border-[#1E2438] hover:border-[#344063] rounded-lg transition-colors duration-150 industrial-ease whitespace-nowrap shrink-0"
                    >
                      <span>{t.omnideskPage.liveAppCta.toUpperCase()}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#8B95B0]" aria-hidden="true" />
                    </a>

                    <a
                      href={EXTERNAL_LINKS.omnideskRepo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 min-h-[46px] font-mono text-xs text-[#8B95B0] hover:text-[#F8FAFC] border border-[#1E2438] hover:border-[#344063] rounded-lg transition-colors duration-150 industrial-ease whitespace-nowrap shrink-0"
                    >
                      <span>SOURCE</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-[#8B95B0] tabular-nums">
                    <span>WIN (.MSI/.EXE) · MAC (.DMG) · LINUX (.APPIMAGE/.DEB)</span>
                    <span className="text-[#1E2438]">|</span>
                    <span>Tauri v2 · Offline Web PWA</span>
                  </div>
                </ScrollReveal>
              </motion.div>

              {/* Right Column: Interactive Live Command Palette Demo (12px radius container) */}
              <motion.div
                style={{y: heroPaletteY}}
                className="lg:col-span-6 py-10 sm:py-14 lg:pl-10 flex flex-col justify-center will-change-transform"
              >
                <ScrollReveal immediate direction="up" distance={24} scale={0.985} delay={0.18}>
                <div className="bg-[#101422] border border-[#1E2438] rounded-xl overflow-hidden">
                  {/* Palette Header Bar */}
                  <div className="px-4 py-2.5 border-b border-[#1E2438] bg-[#0D101C] flex items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-2 font-mono text-[11px] text-[#F8FAFC]">
                      <Terminal className="w-3.5 h-3.5 text-[#5B4EFF]" aria-hidden="true" />
                      <span>LIVE COMMAND PALETTE</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#8B95B0]">
                      <kbd className="px-1.5 py-0.5 border border-[#1E2438] bg-[#101422] text-[#F8FAFC] rounded-lg">
                        ⌘K
                      </kbd>
                      <span>TYPE TO FILTER</span>
                    </div>
                  </div>

                  {/* Interactive Search Input */}
                  <div className="relative border-b border-[#1E2438] bg-[#0A0D16]">
                    <Search
                      className="w-4 h-4 text-[#5B4EFF] absolute left-4 top-1/2 -translate-y-1/2"
                      aria-hidden="true"
                    />
                    <input
                      ref={paletteInputRef}
                      type="text"
                      value={paletteQuery}
                      onChange={(e) => {
                        setPaletteQuery(e.target.value);
                        setPaletteActiveIdx(0);
                      }}
                      onKeyDown={handlePaletteKeyDown}
                      placeholder={t.omnideskPage.palettePlaceholder}
                      aria-label="Live Command Palette search"
                      className="w-full pl-11 pr-10 py-3.5 bg-transparent font-mono text-xs sm:text-sm text-[#F8FAFC] placeholder:text-[#56607C] focus:outline-none"
                    />
                    {paletteQuery && (
                      <button
                        type="button"
                        onClick={() => {
                          setPaletteQuery('');
                          setPaletteActiveIdx(0);
                        }}
                        aria-label={t.omnideskPage.clearSearchLabel}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#8B95B0] hover:text-[#F8FAFC] cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    )}
                  </div>

                  {/* Quick Category Tabs inside Palette */}
                  <div className="px-3 py-2 border-b border-[#1E2438] flex items-center gap-1.5 overflow-x-auto bg-[#0D101C]">
                    <button
                      type="button"
                      onClick={() => {
                        setPaletteCategory('all');
                        setPaletteActiveIdx(0);
                      }}
                      className={`px-2.5 py-1 font-mono text-[10px] tracking-wider border rounded-lg transition-colors duration-150 industrial-ease whitespace-nowrap shrink-0 cursor-pointer ${
                        paletteCategory === 'all'
                          ? 'bg-[#5B4EFF] text-[#F8FAFC] border-[#5B4EFF] font-semibold'
                          : 'text-[#8B95B0] border-[#1E2438] hover:text-[#F8FAFC] hover:border-[#344063]'
                      }`}
                    >
                      ALL ({totalToolsCount})
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPaletteCategory('basics');
                        setPaletteActiveIdx(0);
                      }}
                      className={`px-2.5 py-1 font-mono text-[10px] tracking-wider border rounded-lg transition-colors duration-150 industrial-ease whitespace-nowrap shrink-0 cursor-pointer ${
                        paletteCategory === 'basics'
                          ? 'bg-[#5B4EFF] text-[#F8FAFC] border-[#5B4EFF] font-semibold'
                          : 'text-[#8B95B0] border-[#1E2438] hover:text-[#F8FAFC] hover:border-[#344063]'
                      }`}
                    >
                      BASICS ({everydayBasicsCount})
                    </button>
                    {t.omnideskPage.categories.map((cat, idx) => {
                      const active = paletteCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            setPaletteCategory(cat.id);
                            setPaletteActiveIdx(0);
                          }}
                          className={`px-2.5 py-1 font-mono text-[10px] tracking-wider border rounded-lg transition-colors duration-150 industrial-ease whitespace-nowrap shrink-0 cursor-pointer ${
                            active
                              ? 'bg-[#5B4EFF] text-[#F8FAFC] border-[#5B4EFF] font-semibold'
                              : 'text-[#8B95B0] border-[#1E2438] hover:text-[#F8FAFC] hover:border-[#344063]'
                          }`}
                        >
                          0{idx + 1} {cat.title.split(' ')[0].toUpperCase()}
                        </button>
                      );
                    })}
                  </div>

                  {/* Interactive Results List */}
                  <div className="divide-y divide-[#1E2438] min-h-[268px] bg-[#0A0D16]">
                    {paletteResults.length === 0 ? (
                      <div className="p-8 text-center font-mono text-xs text-[#8B95B0]">
                        NO MODULE MATCHES &ldquo;{paletteQuery}&rdquo; — TRY &ldquo;PDF&rdquo;,
                        &ldquo;HASH&rdquo;, OR &ldquo;AUDIO&rdquo;
                      </div>
                    ) : (
                      paletteResults.map((item, idx) => {
                        const isSelected = idx === clampedPaletteIdx;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onMouseEnter={() => {
                              setPaletteActiveIdx(idx);
                              setInspectedToolId(item.id);
                            }}
                            onClick={() => {
                              setPaletteActiveIdx(idx);
                              setInspectedToolId(item.id);
                            }}
                            className={`w-full text-left px-4 py-2.5 flex items-center justify-between gap-3 transition-colors duration-120 industrial-ease cursor-pointer ${
                              isSelected
                                ? 'bg-[#14192B] text-[#F8FAFC]'
                                : 'text-[#8B95B0] hover:bg-[#101422]'
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <span
                                className={`font-mono text-[10px] w-2 shrink-0 ${
                                  isSelected ? 'text-[#6D61FF]' : 'text-transparent'
                                }`}
                                aria-hidden="true"
                              >
                                ›
                              </span>
                              <div className="min-w-0">
                                <p
                                  className={`text-xs sm:text-sm font-medium truncate ${
                                    isSelected ? 'text-[#F8FAFC]' : 'text-[#CBD5E1]'
                                  }`}
                                >
                                  {item.title}
                                </p>
                                <p className="font-mono text-[10px] text-[#8B95B0] truncate">
                                  {item.categoryTitle.toUpperCase()} · {item.runtime}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <kbd className="font-mono text-[10px] px-2 py-0.5 border border-[#1E2438] bg-[#101422] text-[#8B95B0] rounded-lg tabular-nums">
                                {item.shortcut}
                              </kbd>
                            </div>
                          </button>
                        );
                      })
                    )}
                  </div>

                  {/* Active Selection Inspector Bar */}
                  {inspectedTool && (
                    <div className="px-4 py-3 border-t border-[#1E2438] bg-[#101422] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="min-w-0 space-y-0.5">
                        <p className="font-mono text-[10px] text-[#6D61FF] tracking-wider">
                          SELECTED // {inspectedTool.runtime} · 0ms LOCAL
                        </p>
                        <p className="text-xs text-[#CBD5E1] truncate">
                          {inspectedTool.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                        <button
                          type="button"
                          onClick={() =>
                            jumpToToolInCatalog(inspectedTool.categoryId, inspectedTool.id)
                          }
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-[10px] font-semibold text-[#F8FAFC] bg-[#5B4EFF] hover:bg-[#6D61FF] rounded-lg transition-colors duration-150 industrial-ease whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <CornerDownLeft className="w-3 h-3" aria-hidden="true" />
                          <span>OPEN IN INDEX</span>
                        </button>
                        <a
                          href={EXTERNAL_LINKS.omnideskLive}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 font-mono text-[10px] font-medium text-[#8B95B0] hover:text-[#F8FAFC] border border-[#1E2438] hover:border-[#344063] rounded-lg transition-colors duration-150 industrial-ease whitespace-nowrap shrink-0"
                        >
                          <span>PWA</span>
                          <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
                </ScrollReveal>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 3. Full-Width Hairline Spec Strip */}
        <section aria-label="Technical specifications" className="border-b border-[#1E2438] bg-[#0D101C]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#1E2438]">
              <motion.div
                initial={shouldReduceMotion ? false : {opacity: 0, y: 18}}
                whileInView={{opacity: 1, y: 0}}
                viewport={VIEWPORT_CONFIG}
                transition={{duration: 0.48, delay: 0, ease: INDUSTRIAL_EASE}}
                className="group relative p-5 sm:p-7 hover:bg-[#101422] transition-colors duration-150 industrial-ease"
              >
                <span
                  className="absolute top-2 right-2.5 font-mono text-[10px] text-[#6D61FF] opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                  aria-hidden="true"
                >
                  +
                </span>
                <p className="font-mono text-[10px] tracking-widest text-[#8B95B0]">
                  01 // TOOL COUNT
                </p>
                <p className="mt-2 font-tech text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-[#F8FAFC] tabular-nums">
                  99+
                </p>
                <p className="mt-1 font-mono text-[11px] text-[#8B95B0]">
                  {t.omnideskPage.metrics.toolsLabel}
                </p>
              </motion.div>

              <motion.div
                initial={shouldReduceMotion ? false : {opacity: 0, y: 18}}
                whileInView={{opacity: 1, y: 0}}
                viewport={VIEWPORT_CONFIG}
                transition={{duration: 0.48, delay: 0.08, ease: INDUSTRIAL_EASE}}
                className="group relative p-5 sm:p-7 hover:bg-[#101422] transition-colors duration-150 industrial-ease"
              >
                <span
                  className="absolute top-2 right-2.5 font-mono text-[10px] text-[#6D61FF] opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                  aria-hidden="true"
                >
                  +
                </span>
                <p className="font-mono text-[10px] tracking-widest text-[#8B95B0]">
                  02 // LATENCY
                </p>
                <p className="mt-2 font-tech text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-[#6D61FF] tabular-nums">
                  0ms LOCAL
                </p>
                <p className="mt-1 font-mono text-[11px] text-[#8B95B0]">
                  In-Memory &amp; Web Worker Compute
                </p>
              </motion.div>

              <motion.div
                initial={shouldReduceMotion ? false : {opacity: 0, y: 18}}
                whileInView={{opacity: 1, y: 0}}
                viewport={VIEWPORT_CONFIG}
                transition={{duration: 0.48, delay: 0.16, ease: INDUSTRIAL_EASE}}
                className="group relative p-5 sm:p-7 hover:bg-[#101422] transition-colors duration-150 industrial-ease"
              >
                <span
                  className="absolute top-2 right-2.5 font-mono text-[10px] text-[#6D61FF] opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                  aria-hidden="true"
                >
                  +
                </span>
                <p className="font-mono text-[10px] tracking-widest text-[#8B95B0]">
                  03 // TELEMETRY
                </p>
                <p className="mt-2 font-tech text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-[#10B981]">
                  ZERO
                </p>
                <p className="mt-1 font-mono text-[11px] text-[#8B95B0]">
                  {t.omnideskPage.metrics.securityValue} · {t.omnideskPage.metrics.securityLabel}
                </p>
              </motion.div>

              <motion.div
                initial={shouldReduceMotion ? false : {opacity: 0, y: 18}}
                whileInView={{opacity: 1, y: 0}}
                viewport={VIEWPORT_CONFIG}
                transition={{duration: 0.48, delay: 0.24, ease: INDUSTRIAL_EASE}}
                className="group relative p-5 sm:p-7 hover:bg-[#101422] transition-colors duration-150 industrial-ease"
              >
                <span
                  className="absolute top-2 right-2.5 font-mono text-[10px] text-[#6D61FF] opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                  aria-hidden="true"
                >
                  +
                </span>
                <p className="font-mono text-[10px] tracking-widest text-[#8B95B0]">
                  04 // SUPPORTED OS
                </p>
                <p className="mt-2 font-tech text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-[#F8FAFC]">
                  WIN / MAC / LINUX
                </p>
                <p className="mt-1 font-mono text-[11px] text-[#8B95B0]">
                  {t.omnideskPage.metrics.runtimeValue} · {t.omnideskPage.metrics.localesValue}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 01: SHOWCASE — Visual Proof First (Right Below Hero & Spec Strip) */}
        <section id="showcase" className="scroll-mt-14 border-b border-[#1E2438] py-16 sm:py-20 bg-[#0A0D16]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="space-y-2 max-w-2xl">
              <ScrollReveal direction="left" distance={14} duration={0.42}>
                <p className="font-mono text-xs text-[#6D61FF] tracking-wider">
                  01 // SHOWCASE
                </p>
              </ScrollReveal>
              <RevealText
                as="h2"
                text={t.omnideskPage.showcaseHeading}
                delay={0.05}
                className="font-tech text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-[#F8FAFC]"
              />
              <ScrollReveal delay={0.14} distance={14}>
                <p className="text-sm sm:text-base text-[#8B95B0] leading-relaxed">
                  {t.omnideskPage.showcaseLead}
                </p>
              </ScrollReveal>
            </div>

            <ScrollReveal distance={26} scale={0.985} duration={0.58}>
            <div className="grid grid-cols-1 lg:grid-cols-12 border border-[#1E2438] rounded-xl overflow-hidden bg-[#0D101C] lg:divide-x divide-y lg:divide-y-0 divide-[#1E2438]">
              {/* Selector Index */}
              <div className="lg:col-span-4 divide-y divide-[#1E2438]">
                {screenshots.map((shot, idx) => {
                  const isSelected = idx === activeShotIndex;
                  return (
                    <motion.button
                      key={shot.id}
                      type="button"
                      initial={shouldReduceMotion ? false : {opacity: 0, x: -12}}
                      whileInView={{opacity: 1, x: 0}}
                      viewport={VIEWPORT_CONFIG}
                      transition={{duration: 0.36, delay: idx * 0.04, ease: INDUSTRIAL_EASE}}
                      onClick={() => {
                        setActiveShotIndex(idx);
                        setIsVideoPaused(false);
                      }}
                      aria-pressed={isSelected}
                      className={`w-full text-left px-4 py-3.5 transition-colors duration-150 industrial-ease cursor-pointer flex items-start gap-3 ${
                        isSelected
                          ? 'bg-[#101422] text-[#F8FAFC]'
                          : 'text-[#8B95B0] hover:text-[#F8FAFC] hover:bg-[#101422]/60'
                      }`}
                    >
                      <span
                        className={`font-mono text-[11px] tabular-nums pt-0.5 shrink-0 ${
                          isSelected ? 'text-[#6D61FF] font-semibold' : 'text-[#56607C]'
                        }`}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0 space-y-1">
                        <p className="text-xs sm:text-sm font-medium leading-snug">{shot.title}</p>
                        {isSelected && (
                          <p className="text-xs text-[#8B95B0] leading-relaxed">{shot.caption}</p>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Viewport Frame */}
              <div className="lg:col-span-8 flex flex-col justify-between bg-[#101422]">
                {activeShot && (
                  <>
                    <div className="px-4 py-2.5 border-b border-[#1E2438] bg-[#0A0D16] flex items-center justify-between gap-4">
                      <span className="font-mono text-[11px] text-[#F8FAFC] truncate">
                        DEMO_{String(activeShotIndex + 1).padStart(2, '0')} //{' '}
                        {activeShot.title.toUpperCase()}
                      </span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="font-mono text-[11px] text-[#8B95B0] tabular-nums mr-1">
                          {String(activeShotIndex + 1).padStart(2, '0')}/
                          {String(screenshots.length).padStart(2, '0')}
                        </span>
                        <button
                          type="button"
                          onClick={() => setIsVideoPaused((prev) => !prev)}
                          aria-label={isVideoPaused ? 'Play demo video' : 'Pause demo video'}
                          className="p-1.5 text-[#8B95B0] hover:text-[#F8FAFC] border border-[#1E2438] hover:border-[#5B4EFF] rounded-lg transition-colors duration-150 industrial-ease cursor-pointer"
                        >
                          {isVideoPaused ? (
                            <Play className="w-3.5 h-3.5" aria-hidden="true" />
                          ) : (
                            <Pause className="w-3.5 h-3.5" aria-hidden="true" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveShotIndex(
                              (activeShotIndex - 1 + screenshots.length) % screenshots.length,
                            );
                            setIsVideoPaused(false);
                          }}
                          aria-label={t.omnideskPage.galleryPrevLabel}
                          className="p-1.5 text-[#8B95B0] hover:text-[#F8FAFC] border border-[#1E2438] hover:border-[#5B4EFF] rounded-lg transition-colors duration-150 industrial-ease cursor-pointer"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveShotIndex((activeShotIndex + 1) % screenshots.length);
                            setIsVideoPaused(false);
                          }}
                          aria-label={t.omnideskPage.galleryNextLabel}
                          className="p-1.5 text-[#8B95B0] hover:text-[#F8FAFC] border border-[#1E2438] hover:border-[#5B4EFF] rounded-lg transition-colors duration-150 industrial-ease cursor-pointer"
                        >
                          <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setLightboxIndex(activeShotIndex)}
                          aria-label={t.omnideskPage.expandPreviewLabel}
                          className="p-1.5 text-[#8B95B0] hover:text-[#6D61FF] border border-[#1E2438] hover:border-[#5B4EFF] rounded-lg transition-colors duration-150 industrial-ease cursor-pointer"
                        >
                          <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setLightboxIndex(activeShotIndex)}
                      aria-label={activeShot.title}
                      className="group relative block w-full text-left cursor-pointer bg-[#0A0D16] flex-1"
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeShot.id}
                          initial={shouldReduceMotion ? false : {opacity: 0}}
                          animate={{opacity: 1}}
                          exit={shouldReduceMotion ? undefined : {opacity: 0}}
                          transition={{duration: 0.14, ease: [0.2, 0, 0, 1]}}
                        >
                          <MediaFrame
                            src={SCREENSHOT_SRC[activeShot.id]}
                            alt={activeShot.title}
                            fallbackTitle={activeShot.title}
                            isPaused={isVideoPaused || lightboxIndex !== null}
                            className="aspect-video border-0 rounded-none bg-[#0A0D16]"
                            imgClassName="object-contain bg-[#0A0D16]"
                          />
                        </motion.div>
                      </AnimatePresence>
                    </button>

                    <div className="px-4 py-3 border-t border-[#1E2438] bg-[#0A0D16] flex items-center justify-between gap-4">
                      <p className="text-xs text-[#8B95B0] truncate">{activeShot.caption}</p>
                      <button
                        type="button"
                        onClick={() => setLightboxIndex(activeShotIndex)}
                        className="font-mono text-[10px] text-[#6D61FF] hover:text-[#F8FAFC] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        FULL VIEW ↗
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
            </ScrollReveal>
          </div>
        </section>

        {/* SECTION 02: ARCHITECTURE — Two-Column Breakdown + Minimal SVG Line Diagrams */}
        <section id="architecture" className="scroll-mt-14 border-b border-[#1E2438] py-16 sm:py-20 bg-[#0D101C] overflow-x-clip">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="space-y-2 max-w-2xl">
              <ScrollReveal direction="left" distance={14} duration={0.42}>
                <p className="font-mono text-xs text-[#6D61FF] tracking-wider">
                  02 // ARCHITECTURE
                </p>
              </ScrollReveal>
              <RevealText
                as="h2"
                text={t.omnideskPage.architectureHeading}
                delay={0.05}
                className="font-tech text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-[#F8FAFC]"
              />
              <ScrollReveal delay={0.14} distance={14}>
                <p className="text-sm sm:text-base text-[#8B95B0] leading-relaxed">
                  {t.omnideskPage.architectureLead}
                </p>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left Column: Why Local-First Desktop Beats Browser Bloat */}
              <div className="lg:col-span-6 space-y-8">
                <div className="border-t border-[#1E2438] divide-y divide-[#1E2438]">
                  {t.omnideskPage.highlights.map((item, idx) => (
                    <motion.div
                      key={item.title}
                      initial={shouldReduceMotion ? false : {opacity: 0, x: -16}}
                      whileInView={{opacity: 1, x: 0}}
                      viewport={VIEWPORT_CONFIG}
                      transition={{duration: 0.46, delay: idx * 0.06, ease: INDUSTRIAL_EASE}}
                      className="py-5 space-y-1.5"
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-xs text-[#6D61FF] tabular-nums shrink-0">
                          {String(idx + 1).padStart(2, '0')} //
                        </span>
                        <h3 className="font-tech text-base font-semibold tracking-[-0.02em] text-[#F8FAFC]">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-sm text-[#8B95B0] leading-relaxed pl-10">
                        {item.description}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Compact 12 Themes & Native Widgets Spec Box */}
                <ScrollReveal distance={22} scale={0.985}>
                  <div className="grid grid-cols-1 sm:grid-cols-12 border border-[#1E2438] rounded-xl overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-[#1E2438] bg-[#101422]">
                    <div className="sm:col-span-7 p-5 space-y-2.5">
                      <p className="font-mono text-[10px] tracking-widest text-[#6D61FF]">
                        {t.omnideskPage.themesHeading.toUpperCase()}
                      </p>
                      <ul className="grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-xs text-[#CBD5E1]">
                        {t.omnideskPage.themesList.map((themeName, idx) => (
                          <motion.li
                            key={themeName}
                            initial={shouldReduceMotion ? false : {opacity: 0, y: 8}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={VIEWPORT_CONFIG}
                            transition={{duration: 0.34, delay: idx * 0.03, ease: INDUSTRIAL_EASE}}
                            className="flex items-center gap-2 min-w-0"
                          >
                            <span className="text-[#56607C] tabular-nums shrink-0">
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                            <span className="truncate">{themeName}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="sm:col-span-5 p-5 space-y-2.5">
                      <p className="font-mono text-[10px] tracking-widest text-[#6D61FF]">
                        {t.omnideskPage.widgetsHeading.toUpperCase()}
                      </p>
                      <ul className="space-y-1 font-mono text-xs text-[#CBD5E1]">
                        {t.omnideskPage.widgetsList.map((widget, idx) => (
                          <motion.li
                            key={widget}
                            initial={shouldReduceMotion ? false : {opacity: 0, y: 8}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={VIEWPORT_CONFIG}
                            transition={{duration: 0.34, delay: 0.1 + idx * 0.04, ease: INDUSTRIAL_EASE}}
                            className="flex items-center gap-2"
                          >
                            <span className="text-[#56607C] tabular-nums shrink-0">
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                            <span>{widget}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Right Column: Minimal Technical SVG Line Diagrams */}
              <div className="lg:col-span-6">
                <ArchitectureDiagrams />
              </div>
            </div>

            {/* Dedicated Desktop MCP Bridge Specification Panel */}
            <ScrollReveal distance={28} scale={0.985} duration={0.58}>
              <div className="border border-[#1E2438] rounded-xl overflow-hidden bg-[#0A0D16]">
                {/* Top Header Strip */}
                <div className="px-5 py-3 border-b border-[#1E2438] bg-[#101422] flex flex-wrap items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-wider text-[#F8FAFC]">
                    <span
                      className="w-2 h-2 rounded-full bg-[#10B981] inline-block shrink-0"
                      aria-hidden="true"
                    />
                    <span>{t.omnideskPage.mcpBridge.badge.toUpperCase()}</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#6D61FF] tracking-wider tabular-nums">
                    24 TOOLS · 4 RESOURCES · LOOPBACK ONLY
                  </span>
                </div>

                {/* Overview + Transports & Clients */}
                <div className="p-5 sm:p-6 border-b border-[#1E2438] grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-6 space-y-2">
                    <RevealText
                      as="h3"
                      text={t.omnideskPage.mcpBridge.heading}
                      className="font-tech text-xl sm:text-2xl font-bold tracking-[-0.02em] text-[#F8FAFC]"
                    />
                    <ScrollReveal delay={0.12} distance={12}>
                      <p className="text-sm text-[#8B95B0] leading-relaxed">
                        {t.omnideskPage.mcpBridge.lead}
                      </p>
                    </ScrollReveal>
                  </div>

                  <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <ScrollReveal delay={0.1} distance={16} className="bg-[#101422] border border-[#1E2438] rounded-lg p-4 space-y-2.5">
                      <p className="font-mono text-[10px] tracking-widest text-[#6D61FF]">
                        {t.omnideskPage.mcpBridge.transportsLabel.toUpperCase()}
                      </p>
                      <ul className="space-y-2">
                        {t.omnideskPage.mcpBridge.transports.map((tr) => (
                          <li key={tr.name} className="space-y-0.5">
                            <p className="font-mono text-xs text-[#F8FAFC] font-medium">{tr.name}</p>
                            <p className="text-[11px] text-[#8B95B0] leading-snug">{tr.detail}</p>
                          </li>
                        ))}
                      </ul>
                    </ScrollReveal>

                    <ScrollReveal delay={0.18} distance={16} className="bg-[#101422] border border-[#1E2438] rounded-lg p-4 space-y-2.5">
                      <p className="font-mono text-[10px] tracking-widest text-[#6D61FF]">
                        {t.omnideskPage.mcpBridge.clientsLabel.toUpperCase()}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {t.omnideskPage.mcpBridge.clients.map((client, idx) => (
                          <motion.span
                            key={client}
                            initial={shouldReduceMotion ? false : {opacity: 0, scale: 0.92}}
                            whileInView={{opacity: 1, scale: 1}}
                            viewport={VIEWPORT_CONFIG}
                            transition={{duration: 0.3, delay: 0.16 + idx * 0.05, ease: INDUSTRIAL_EASE}}
                            className="px-2.5 py-1 font-mono text-[11px] text-[#CBD5E1] bg-[#0A0D16] border border-[#1E2438] rounded-md"
                          >
                            {client}
                          </motion.span>
                        ))}
                      </div>
                    </ScrollReveal>
                  </div>
                </div>

                {/* 4 MCP Tool Groups Matrix */}
                <div className="border-b border-[#1E2438]">
                  <div className="px-5 py-2.5 border-b border-[#1E2438] bg-[#0D101C]">
                    <p className="font-mono text-[10px] tracking-widest text-[#8B95B0]">
                      {t.omnideskPage.mcpBridge.toolGroupsLabel.toUpperCase()}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1E2438]">
                    {t.omnideskPage.mcpBridge.toolGroups.map((group, idx) => (
                      <motion.div
                        key={group.group}
                        initial={shouldReduceMotion ? false : {opacity: 0, y: 16}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={VIEWPORT_CONFIG}
                        transition={{duration: 0.44, delay: idx * 0.07, ease: INDUSTRIAL_EASE}}
                        className="p-5 space-y-3 bg-[#0A0D16]"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-tech text-sm font-semibold text-[#F8FAFC]">
                            <span className="font-mono text-[11px] text-[#6D61FF] mr-2 tabular-nums">
                              0{idx + 1} //
                            </span>
                            {group.group}
                          </span>
                          <span className="font-mono text-[10px] text-[#8B95B0] tabular-nums">
                            {group.tools.length} TOOLS
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {group.tools.map((toolName, toolIdx) => (
                            <motion.code
                              key={toolName}
                              initial={shouldReduceMotion ? false : {opacity: 0, scale: 0.94}}
                              whileInView={{opacity: 1, scale: 1}}
                              viewport={VIEWPORT_CONFIG}
                              transition={{
                                duration: 0.28,
                                delay: idx * 0.06 + toolIdx * 0.025,
                                ease: INDUSTRIAL_EASE,
                              }}
                              className="px-2 py-0.5 font-mono text-[11px] text-[#CBD5E1] bg-[#101422] border border-[#1E2438] hover:border-[#5B4EFF]/70 transition-colors duration-150 rounded"
                            >
                              {toolName}
                            </motion.code>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Bottom Strip: Read-Only Resources + Security Guardrails */}
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#1E2438] bg-[#0D101C]">
                  <div className="p-5 space-y-2.5">
                    <p className="font-mono text-[10px] tracking-widest text-[#6D61FF]">
                      {t.omnideskPage.mcpBridge.resourcesLabel.toUpperCase()}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {t.omnideskPage.mcpBridge.resources.map((uri, idx) => (
                        <motion.code
                          key={uri}
                          initial={shouldReduceMotion ? false : {opacity: 0, y: 8}}
                          whileInView={{opacity: 1, y: 0}}
                          viewport={VIEWPORT_CONFIG}
                          transition={{duration: 0.34, delay: idx * 0.05, ease: INDUSTRIAL_EASE}}
                          className="px-2.5 py-1 font-mono text-[11px] text-[#10B981] bg-[#0A0D16] border border-[#1E2438] rounded"
                        >
                          {uri}
                        </motion.code>
                      ))}
                    </div>
                  </div>

                  <div className="p-5 space-y-2.5">
                    <p className="font-mono text-[10px] tracking-widest text-[#10B981]">
                      {t.omnideskPage.mcpBridge.securityLabel.toUpperCase()}
                    </p>
                    <ul className="space-y-1.5 text-xs text-[#CBD5E1]">
                      {t.omnideskPage.mcpBridge.securityItems.map((rule, idx) => (
                        <motion.li
                          key={rule}
                          initial={shouldReduceMotion ? false : {opacity: 0, x: -10}}
                          whileInView={{opacity: 1, x: 0}}
                          viewport={VIEWPORT_CONFIG}
                          transition={{duration: 0.34, delay: idx * 0.045, ease: INDUSTRIAL_EASE}}
                          className="flex items-start gap-2"
                        >
                          <span className="font-mono text-[#10B981] shrink-0" aria-hidden="true">
                            ›
                          </span>
                          <span>{rule}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Technical Stack Specification Table */}
            <div className="space-y-4 pt-4">
              <ScrollReveal direction="left" distance={14} duration={0.4}>
                <p className="font-mono text-xs text-[#8B95B0] tracking-wider">
                  STACK SPECIFICATION // {t.omnideskPage.stackHeading.toUpperCase()}
                </p>
              </ScrollReveal>
              <div className="border border-[#1E2438] rounded-xl overflow-hidden divide-y divide-[#1E2438]">
                {t.omnideskPage.stackItems.map((row, idx) => (
                  <motion.div
                    key={row.layer}
                    initial={shouldReduceMotion ? false : {opacity: 0, y: 16}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={VIEWPORT_CONFIG}
                    transition={{duration: 0.44, delay: idx * 0.06, ease: INDUSTRIAL_EASE}}
                    className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 px-5 py-4 bg-[#0A0D16] hover:bg-[#101422] transition-colors duration-150 industrial-ease items-baseline"
                  >
                    <div className="md:col-span-3 flex items-baseline gap-2.5">
                      <span className="font-mono text-[10px] text-[#56607C] tabular-nums">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="font-tech text-sm font-semibold text-[#F8FAFC]">
                        {row.layer}
                      </span>
                    </div>
                    <div className="md:col-span-4 font-mono text-xs text-[#6D61FF]">
                      {row.technologies}
                    </div>
                    <div className="md:col-span-5 text-xs sm:text-sm text-[#8B95B0]">
                      {row.note}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 03: CATALOG — Clean Single-Category Tabbed Matrix + Expand All Toggle */}
        <section id="catalog" className="scroll-mt-14 border-b border-[#1E2438] py-16 sm:py-20 bg-[#0A0D16]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <ScrollReveal direction="left" distance={14} duration={0.42}>
                  <p className="font-mono text-xs text-[#6D61FF] tracking-wider">
                    03 // CATALOG
                  </p>
                </ScrollReveal>
                <RevealText
                  as="h2"
                  text={t.omnideskPage.catalogHeading}
                  delay={0.05}
                  className="font-tech text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-[#F8FAFC]"
                />
                <ScrollReveal delay={0.14} distance={14}>
                  <p className="text-sm sm:text-base text-[#8B95B0] leading-relaxed">
                    {t.omnideskPage.catalogLead}
                  </p>
                </ScrollReveal>
              </div>

              <ScrollReveal direction="right" distance={16} delay={0.1} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
                <div className="relative flex-1 lg:w-72">
                  <Search
                    className="w-4 h-4 text-[#8B95B0] absolute left-3 top-1/2 -translate-y-1/2"
                    aria-hidden="true"
                  />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.omnideskPage.searchPlaceholder}
                    aria-label={t.omnideskPage.searchPlaceholder}
                    className="w-full pl-9 pr-9 py-2.5 min-h-[42px] bg-[#101422] border border-[#1E2438] focus:border-[#5B4EFF] rounded-lg font-mono text-xs text-[#F8FAFC] placeholder:text-[#56607C] focus:outline-none transition-colors duration-150 industrial-ease"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      aria-label={t.omnideskPage.clearSearchLabel}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#8B95B0] hover:text-[#F8FAFC] cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  )}
                </div>

                {/* Expand All / Collapse to Single Tab Toggle */}
                <button
                  type="button"
                  onClick={() => setExpandAll((prev) => !prev)}
                  aria-pressed={expandAll}
                  className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[42px] font-mono text-xs font-semibold rounded-lg border transition-colors duration-150 industrial-ease whitespace-nowrap shrink-0 cursor-pointer ${
                    expandAll
                      ? 'bg-[#5B4EFF] text-[#F8FAFC] border-[#5B4EFF]'
                      : 'bg-[#101422] text-[#F8FAFC] border-[#1E2438] hover:border-[#5B4EFF] hover:text-[#6D61FF]'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>
                    {expandAll ? 'COLLAPSE TABS' : `EXPAND ALL (${totalToolsCount})`}
                  </span>
                </button>
              </ScrollReveal>
            </div>

            {/* Clean Category Tabs Bar (Single Category Active by Default) */}
            <ScrollReveal distance={16} delay={0.12}>
              <div
                role="tablist"
                aria-label={t.omnideskPage.catalogHeading}
                className="border border-[#1E2438] bg-[#101422] rounded-xl flex flex-wrap items-center justify-between gap-2 p-1.5"
              >
                <div className="flex flex-wrap items-center gap-1">
                  {t.omnideskPage.categories.map((cat, idx) => {
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
                        className={`inline-flex items-center gap-2 px-3 py-2 min-h-[36px] font-mono text-[11px] rounded-lg border transition-colors duration-150 industrial-ease whitespace-nowrap shrink-0 cursor-pointer ${
                          isSelected
                            ? 'bg-[#5B4EFF] text-[#F8FAFC] border-[#5B4EFF] font-semibold'
                            : 'text-[#8B95B0] border-transparent hover:text-[#F8FAFC] hover:bg-[#161C2F]'
                        }`}
                      >
                        <span
                          className={`px-1.5 py-0.5 text-[9px] border rounded-lg tabular-nums ${
                            isSelected
                              ? 'border-[#F8FAFC]/30 bg-[#F8FAFC]/15 text-[#F8FAFC]'
                              : 'border-[#1E2438] bg-[#0A0D16] text-[#8B95B0]'
                          }`}
                        >
                          ⌘{idx + 1}
                        </span>
                        <span>{cat.title.toUpperCase()}</span>
                        <span className="opacity-75 tabular-nums">{cat.tools.length}</span>
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
                    className={`inline-flex items-center gap-2 px-3 py-2 min-h-[36px] font-mono text-[11px] rounded-lg border transition-colors duration-150 industrial-ease whitespace-nowrap shrink-0 cursor-pointer ${
                      !expandAll && !searchQuery.trim() && activeCategoryFilter === 'basics'
                        ? 'bg-[#5B4EFF] text-[#F8FAFC] border-[#5B4EFF] font-semibold'
                        : 'text-[#8B95B0] border-transparent hover:text-[#F8FAFC] hover:bg-[#161C2F]'
                    }`}
                  >
                    <span
                      className={`px-1.5 py-0.5 text-[9px] border rounded-lg ${
                        !expandAll && !searchQuery.trim() && activeCategoryFilter === 'basics'
                          ? 'border-[#F8FAFC]/30 bg-[#F8FAFC]/15 text-[#F8FAFC]'
                          : 'border-[#1E2438] bg-[#0A0D16] text-[#8B95B0]'
                      }`}
                    >
                      ⌘B
                    </span>
                    <span>{t.omnideskPage.everydayBasicsFilter.toUpperCase()}</span>
                    <span className="opacity-75 tabular-nums">{everydayBasicsCount}</span>
                  </button>
                </div>

                <span className="px-3 py-1.5 font-mono text-[11px] text-[#8B95B0] tabular-nums shrink-0">
                  {t.omnideskPage.showingCountPrefix.toUpperCase()} {totalVisibleTools} /{' '}
                  {totalToolsCount}
                </span>
              </div>
            </ScrollReveal>

            {visibleCatalogSections.length === 0 ? (
              <div className="border border-[#1E2438] bg-[#101422] rounded-xl p-12 text-center font-mono text-xs text-[#8B95B0]">
                {t.omnideskPage.searchEmpty}
              </div>
            ) : (
              <motion.div
                key={`${activeCategoryFilter}-${expandAll}-${Boolean(searchQuery.trim())}`}
                initial={shouldReduceMotion ? false : {opacity: 0, y: 12}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.28, ease: INDUSTRIAL_EASE}}
                className="space-y-12"
              >
                {visibleCatalogSections.map((category) => (
                  <div key={category.id} className="space-y-3">
                    <div className="relative pb-2">
                      <div className="flex flex-wrap items-baseline justify-between gap-4">
                        <div className="flex flex-wrap items-baseline gap-3">
                          <span className="font-mono text-xs text-[#6D61FF] tabular-nums">
                            {category.indexNumber === 0
                              ? '00 //'
                              : `${String(category.indexNumber).padStart(2, '0')} //`}
                          </span>
                          <h3 className="font-tech text-xl font-bold tracking-[-0.02em] text-[#F8FAFC]">
                            {category.title}
                          </h3>
                          <span className="text-xs text-[#8B95B0] hidden sm:inline">
                            — {category.subtitle}
                          </span>
                        </div>
                        <span className="font-mono text-[11px] text-[#8B95B0] tabular-nums shrink-0">
                          {category.tools.length} {t.omnideskPage.toolsUnitLabel.toUpperCase()}
                        </span>
                      </div>
                      <motion.div
                        aria-hidden="true"
                        initial={shouldReduceMotion ? false : {scaleX: 0}}
                        whileInView={{scaleX: 1}}
                        viewport={VIEWPORT_CONFIG}
                        transition={{duration: 0.55, ease: INDUSTRIAL_EASE}}
                        className="absolute bottom-0 left-0 right-0 h-px bg-[#1E2438] origin-left"
                      />
                    </div>

                    {/* Crisp 1px Structural Hairline Directory Matrix */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-t border-[#1E2438]">
                      {category.tools.map((tool, toolIdx) => {
                        const isHighlighted = highlightedToolId === tool.id;
                        return (
                          <motion.div
                            key={tool.id}
                            initial={shouldReduceMotion ? false : {opacity: 0, y: 14}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={VIEWPORT_CONFIG}
                            transition={{
                              duration: 0.36,
                              delay: Math.min((toolIdx % 9) * 0.03, 0.24),
                              ease: INDUSTRIAL_EASE,
                            }}
                            className={`group relative p-4 sm:p-5 border-r border-b transition-colors duration-150 industrial-ease flex flex-col justify-between gap-3 ${
                              isHighlighted
                                ? 'bg-[#141A30] border-[#5B4EFF]'
                                : 'bg-[#0A0D16] hover:bg-[#101422] border-[#1E2438]'
                            }`}
                          >
                            {/* Subtle crosshair registration corner highlight */}
                            <span
                              className={`absolute top-2 right-2.5 font-mono text-[10px] text-[#6D61FF] transition-opacity duration-150 ${
                                isHighlighted
                                  ? 'opacity-100'
                                  : 'opacity-0 group-hover:opacity-100'
                              }`}
                              aria-hidden="true"
                            >
                              +
                            </span>

                            <div className="space-y-1.5 transition-transform duration-150 industrial-ease group-hover:-translate-y-0.5">
                              <div className="flex items-center justify-between gap-2 pr-4">
                                <span
                                  className={`font-mono text-[10px] transition-colors duration-150 tabular-nums ${
                                    isHighlighted
                                      ? 'text-[#6D61FF] font-semibold'
                                      : 'text-[#8B95B0] group-hover:text-[#6D61FF]'
                                  }`}
                                >
                                  #{category.indexNumber}-{String(toolIdx + 1).padStart(2, '0')}
                                </span>
                                <kbd
                                  className={`font-mono text-[9px] px-2 py-0.5 border rounded-lg tabular-nums ${
                                    isHighlighted
                                      ? 'border-[#5B4EFF] bg-[#5B4EFF] text-[#F8FAFC]'
                                      : 'border-[#1E2438] bg-[#101422] text-[#8B95B0]'
                                  }`}
                                >
                                  {tool.isEverydayBasic
                                    ? 'BASIC'
                                    : category.indexNumber === 0
                                      ? '⌘B'
                                      : `⌘${category.indexNumber}`}
                                </kbd>
                              </div>
                              <h4 className="font-tech text-sm sm:text-[15px] font-semibold tracking-[-0.01em] text-[#F8FAFC]">
                                {tool.title}
                              </h4>
                              <p className="text-xs text-[#8B95B0] leading-relaxed">
                                {tool.description}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* Cross-Link Strip to Next Project */}
        <section className="py-12 bg-[#0A0D16] overflow-x-clip">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <ScrollReveal direction="left" distance={18} className="space-y-1">
              <p className="font-mono text-[10px] tracking-widest text-[#8B95B0]">
                {t.omnideskPage.nextProjectLabel.toUpperCase()}
              </p>
              <RevealText
                as="p"
                text={t.omnideskPage.nextProjectTitle}
                delay={0.05}
                className="font-tech text-xl sm:text-2xl font-bold tracking-[-0.02em] text-[#F8FAFC]"
              />
            </ScrollReveal>
            <ScrollReveal direction="right" distance={18} delay={0.08}>
              <a
                href="./rate-everything.html"
                onClick={(e) => handleNav(e, 'rate-everything')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[42px] font-mono text-xs font-semibold tracking-wider text-[#F8FAFC] bg-[#101422] hover:bg-[#161C2F] border border-[#1E2438] hover:border-[#5B4EFF] rounded-lg transition-colors duration-150 industrial-ease whitespace-nowrap shrink-0 self-start sm:self-auto"
              >
                <span>{t.omnideskPage.nextProjectCta.toUpperCase()}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#6D61FF]" aria-hidden="true" />
              </a>
            </ScrollReveal>
          </div>
        </section>
      </main>

      {/* Crisp 1px-Bordered Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxItem && lightboxIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={activeLightboxItem.title}
            initial={shouldReduceMotion ? false : {opacity: 0}}
            animate={{opacity: 1}}
            exit={shouldReduceMotion ? undefined : {opacity: 0}}
            transition={{duration: 0.14}}
            className="fixed inset-0 z-50 bg-[#0A0D16]/92 flex items-center justify-center p-4 sm:p-6"
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              initial={shouldReduceMotion ? false : {opacity: 0, scale: 0.99}}
              animate={{opacity: 1, scale: 1}}
              exit={shouldReduceMotion ? undefined : {opacity: 0, scale: 0.99}}
              transition={{duration: 0.15, ease: [0.2, 0, 0, 1]}}
              className="w-full max-w-5xl bg-[#101422] border border-[#1E2438] rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-4 px-4 py-3 border-b border-[#1E2438] bg-[#0A0D16]">
                <div className="min-w-0">
                  <h3 className="font-mono text-xs font-semibold text-[#F8FAFC] truncate">
                    DEMO_{String(lightboxIndex + 1).padStart(2, '0')} //{' '}
                    {activeLightboxItem.title.toUpperCase()}
                  </h3>
                  <p className="text-xs text-[#8B95B0] truncate mt-0.5">
                    {activeLightboxItem.caption}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="font-mono text-xs text-[#8B95B0] tabular-nums mr-1.5">
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
                    className="p-2 text-[#8B95B0] hover:text-[#F8FAFC] border border-[#1E2438] hover:border-[#5B4EFF] rounded-lg transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex((lightboxIndex + 1) % screenshots.length)}
                    aria-label={t.omnideskPage.galleryNextLabel}
                    className="p-2 text-[#8B95B0] hover:text-[#F8FAFC] border border-[#1E2438] hover:border-[#5B4EFF] rounded-lg transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(null)}
                    aria-label={t.omnideskPage.galleryCloseLabel}
                    className="p-2 text-[#8B95B0] hover:text-[#6D61FF] border border-[#1E2438] hover:border-[#5B4EFF] rounded-lg transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="bg-[#0A0D16] p-2 sm:p-4">
                <video
                  key={activeLightboxItem.id}
                  src={SCREENSHOT_SRC[activeLightboxItem.id]}
                  aria-label={activeLightboxItem.title}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  className="w-full max-h-[75vh] object-contain mx-auto rounded-lg bg-[#0A0D16]"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
