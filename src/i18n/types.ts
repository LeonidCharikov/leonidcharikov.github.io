export type Locale = 'en' | 'cs' | 'ru';

export type PageRoute = 'home' | 'omnidesk' | 'rate-everything';

export type RepoFilter = 'all' | 'web' | 'desktop' | 'database';

export type RateCategoryFilter = 'all' | 'games' | 'movies' | 'websites';

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
  categoryLabel: string;
  modeLabel: string;
}

export interface OmniDeskModuleCategory {
  id: string;
  title: string;
  subtitle: string;
  count: number;
  tools: OmniDeskToolCard[];
}

export interface OmniDeskScreenshotItem {
  id: 'mainMenu' | 'chemistry' | 'currency' | 'graph2d';
  title: string;
  caption: string;
}

export interface RateCatalogEntry {
  id: string;
  category: Exclude<RateCategoryFilter, 'all'>;
  categoryLabel: string;
  title: string;
  score: number;
  description: string;
  thoughts: string;
  updatedAt: string;
  originalUrl: string;
  specs: {label: string; value: string}[];
  tags: string[];
  accentHue: 'crimson' | 'emerald' | 'amber' | 'slate' | 'cobalt' | 'yellow';
}

export interface TranslationDictionary {
  meta: {
    homeTitle: string;
    omnideskTitle: string;
    rateEverythingTitle: string;
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
    sectionPath: string;
    localSandboxLabel: string;
    searchPlaceholder: string;
    searchEmpty: string;
    kicker: string;
    title: string;
    lead: string;
    repoCta: string;
    metrics: {
      toolsValue: string;
      toolsLabel: string;
      runtimeValue: string;
      runtimeLabel: string;
      localesValue: string;
      localesLabel: string;
      telemetryValue: string;
      telemetryLabel: string;
    };
    galleryHeading: string;
    galleryLead: string;
    galleryCloseLabel: string;
    galleryPrevLabel: string;
    galleryNextLabel: string;
    screenshots: OmniDeskScreenshotItem[];
    explorerHeading: string;
    explorerLead: string;
    toolsUnitLabel: string;
    allToolsFilter: string;
    openActionLabel: string;
    categories: OmniDeskModuleCategory[];
    architectureHeading: string;
    highlights: {
      title: string;
      description: string;
    }[];
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
    liveCta: string;
    repoCta: string;
    kicker: string;
    title: string;
    lead: string;
    screensHeading: string;
    screensLead: string;
    screenTabs: {
      main: string;
      detail: string;
      add: string;
    };
    catalogHeading: string;
    catalogCountSuffix: string;
    searchPlaceholder: string;
    emptyState: string;
    addButtonLabel: string;
    filters: {
      all: string;
      games: string;
      movies: string;
      websites: string;
    };
    modalLabels: {
      about: string;
      myThoughts: string;
      details: string;
      openOriginal: string;
      updatedPrefix: string;
      closeLabel: string;
      addTitle: string;
      categoryField: string;
      ratingField: string;
      nameField: string;
      namePlaceholder: string;
      authorField: string;
      pagesField: string;
      originalLinkField: string;
      descriptionField: string;
      thoughtsField: string;
      tagsField: string;
      tagsPlaceholder: string;
      submitAdd: string;
      prevScreenLabel: string;
      nextScreenLabel: string;
    };
    entries: RateCatalogEntry[];
    pillarsHeading: string;
    pillars: {
      title: string;
      description: string;
    }[];
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
