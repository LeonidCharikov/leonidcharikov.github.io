export type Locale = 'en' | 'cs' | 'ru';

export type PageRoute = 'home' | 'omnidesk' | 'rate-everything';

export type RepoFilter = 'all' | 'web' | 'desktop' | 'database';

export type RatePreviewTab = 'main' | 'detail' | 'add';

export interface ExperienceItem {
  period: string;
  role: string;
  organization: string;
  location: string;
  summary: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface ArchiveRepoItem {
  name: string;
  category: Exclude<RepoFilter, 'all'>;
  language: string;
  description: string;
  url: string;
  year: string;
}

export interface OmniDeskToolCard {
  id: string;
  title: string;
  description: string;
  isEverydayBasic?: boolean;
  isDesktopOnly?: boolean;
}

export interface OmniDeskModuleCategory {
  id: string;
  title: string;
  subtitle: string;
  count: number;
  tools: OmniDeskToolCard[];
}

export interface OmniDeskScreenshotItem {
  id:
    | 'dashboard'
    | 'charts'
    | 'diagram'
    | 'systemMonitor'
    | 'crosshair'
    | 'pdfEditor'
    | 'calendar'
    | 'currency'
    | 'graph2d'
    | 'chemistry'
    | 'colorPicker'
    | 'themes'
    | 'config';
  title: string;
  caption: string;
}


export interface TranslationDictionary {
  meta: {
    homeTitle: string;
    homeDescription: string;
    homeKeywords: string;
    omnideskTitle: string;
    omnideskDescription: string;
    omnideskKeywords: string;
    rateEverythingTitle: string;
    rateEverythingDescription: string;
    rateEverythingKeywords: string;
  };
  nav: {
    brand: string;
    about: string;
    projects: string;
    omnidesk: string;
    rateEverything: string;
    contact: string;
    menuOpenLabel: string;
    menuCloseLabel: string;
    languageLabel: string;
  };
  home: {
    hero: {
      locationLine: string;
      headline: string;
      lead: string;
      primaryCta: string;
      secondaryCta: string;
      imageAlt: string;
      imageFallbackTitle: string;
    };
    featured: {
      sectionTitle: string;
      sectionSubtitle: string;
      readCaseStudy: string;
      viewRepository: string;
      visitLiveSite: string;
      launchLiveApp: string;
      omnideskMeta: string;
      omnideskTitle: string;
      omnideskSummary: string;
      omnideskImageAlt: string;
      rateEverythingMeta: string;
      rateEverythingTitle: string;
      rateEverythingSummary: string;
      rateEverythingImageAlt: string;
    };
    aboutSection: {
      sectionTitle: string;
      sectionSubtitle: string;
      bioParagraph: string;
      workExperienceHeading: string;
      educationHeading: string;
      skillsHeading: string;
      workExperiences: ExperienceItem[];
      educationItems: ExperienceItem[];
      skillGroups: SkillGroup[];
    };
    archive: {
      sectionTitle: string;
      sectionSubtitle: string;
      filterAll: string;
      filterWeb: string;
      filterDesktop: string;
      filterDatabase: string;
      openRepo: string;
      emptyState: string;
      repos: ArchiveRepoItem[];
    };
    contact: {
      sectionTitle: string;
      sectionSubtitle: string;
      directLabel: string;
      copyEmail: string;
      copiedEmail: string;
      emailValue: string;
      socialsHeading: string;
      linkedinLabel: string;
      githubLabel: string;
    };
  };
  omnideskPage: {
    backToPortfolio: string;
    appName: string;
    navLinks: {
      overview: string;
      architecture: string;
      showcase: string;
      catalog: string;
    };
    liveAppCta: string;
    repoCta: string;
    metaLine: string;
    title: string;
    lead: string;
    exploreCatalogCta: string;
    heroImageAlt: string;
    metrics: {
      toolsLabel: string;
      runtimeValue: string;
      runtimeLabel: string;
      localesValue: string;
      localesLabel: string;
      securityValue: string;
      securityLabel: string;
    };
    showcaseHeading: string;
    showcaseLead: string;
    expandPreviewLabel: string;
    galleryCloseLabel: string;
    galleryPrevLabel: string;
    galleryNextLabel: string;
    showMoreDemosLabel: string;
    hideMoreDemosLabel: string;
    screenshots: OmniDeskScreenshotItem[];
    catalogHeading: string;
    catalogLead: string;
    palettePlaceholder: string;
    searchPlaceholder: string;
    clearSearchLabel: string;
    searchEmpty: string;
    toolsUnitLabel: string;
    allToolsFilter: string;
    everydayBasicsFilter: string;
    showingCountPrefix: string;
    categories: OmniDeskModuleCategory[];
    architectureHeading: string;
    architectureLead: string;
    highlights: {
      title: string;
      description: string;
    }[];
    themesHeading: string;
    themesList: string[];
    widgetsHeading: string;
    widgetsList: string[];
    mcpBridge: {
      badge: string;
      heading: string;
      lead: string;
      transportsLabel: string;
      transports: {
        name: string;
        detail: string;
      }[];
      clientsLabel: string;
      clients: string[];
      toolGroupsLabel: string;
      toolGroups: {
        group: string;
        tools: string[];
      }[];
      resourcesLabel: string;
      resources: string[];
      securityLabel: string;
      securityItems: string[];
    };
    stackHeading: string;
    stackItems: {
      layer: string;
      technologies: string;
      note: string;
    }[];
    nextProjectLabel: string;
    nextProjectTitle: string;
    nextProjectCta: string;
  };
  rateEverythingPage: {
    backToPortfolio: string;
    appName: string;
    navLinks: {
      overview: string;
      screens: string;
      stack: string;
    };
    liveCta: string;
    repoCta: string;
    kicker: string;
    title: string;
    lead: string;
    ledgerHeading: string;
    ledgerRows: {
      label: string;
      value: string;
    }[];
    screensHeading: string;
    screensLead: string;
    expandPreviewLabel: string;
    screenTabs: {
      main: string;
      detail: string;
      add: string;
    };
    screenNotes: {
      main: string;
      detail: string;
      add: string;
    };
    lightboxLabels: {
      closeLabel: string;
      prevScreenLabel: string;
      nextScreenLabel: string;
    };
    stackHeading: string;
    stackLead: string;
    techExperiments: {
      tag: string;
      title: string;
      description: string;
    }[];
    alsoTriedLabel: string;
    alsoTriedItems: string[];
    nextProjectLabel: string;
    nextProjectTitle: string;
    nextProjectCta: string;
  };
  footer: {
    copyright: string;
    basedIn: string;
    homeLink: string;
    omnideskLink: string;
    rateEverythingLink: string;
    githubLink: string;
    linkedinLink: string;
  };
}
