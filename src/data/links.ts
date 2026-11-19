import darkWorkspaceHeroImg from '../assets/images/dark_workspace_hero_1794578515981.jpg';

export const EXTERNAL_LINKS = {
  githubProfile: 'https://github.com/LeonidCharikov',
  omnideskRepo: 'https://github.com/LeonidCharikov/OmniDesk',
  omnideskLive: 'https://leonidcharikov.github.io/OmniDesk/',
  rateEverythingRepo: 'https://github.com/LeonidCharikov/RateEverything',
  rateEverythingLive: 'https://rate-everything-omega.vercel.app/',
  linkedin: 'https://www.linkedin.com/in/leonid-charikov/',
  email: 'leonidcharikov@gmail.com',
} as const;

export const MEDIA_ASSETS = {
  darkWorkspaceHero: darkWorkspaceHeroImg,
  omnideskLogo: '/assets/aistudio/icon_25b02343.svg',
  omnideskScreens: {
    mainMenu: '/assets/aistudio/all-tools_29ed4027.webm',
    dashboard: '/assets/aistudio/all-tools_29ed4027.webm',
    pdfEditor: '/assets/aistudio/pdf-editor_cdb0140c.webm',
    calendar: '/assets/aistudio/Calendar_33884140.webm',
    currency: '/assets/aistudio/currency-convertor_3e6372c0.webm',
    graph2d: '/assets/aistudio/Graph_46331e83.webm',
    chemistry: '/assets/aistudio/periodic-table_decd888f.webm',
    colorPicker: '/assets/aistudio/color-picker_b0071647.webm',
    themes: '/assets/aistudio/themes_ce441e5b.webm',
    config: '/assets/aistudio/settings_52d0ca0e.webm',
  },
  rateEverythingScreens: {
    main: '/assets/aistudio/rate-main-page_3d8dad1d.png',
    detail: '/assets/aistudio/rate-rating-window_c141b999.png',
    add: '/assets/aistudio/rate-add_45929b18.png',
  },
} as const;
