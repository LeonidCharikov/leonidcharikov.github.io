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
    | 'pdfEditor'
    | 'audioEditor'
    | 'calendar'
    | 'currency'
    | 'graph2d'
    | 'chemistry'
    | 'hashSuite'
    | 'randomPicker'
    | 'config';
  title: string;
  caption: string;
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
    navLinks: {
      overview: string;
      showcase: string;
      catalog: string;
      architecture: string;
    };
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
    screenshots: OmniDeskScreenshotItem[];
    catalogHeading: string;
    catalogLead: string;
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
