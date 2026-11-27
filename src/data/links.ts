import darkWorkspaceHeroImg from '../assets/images/dark_workspace_hero_1794578515981.jpg';
import calendarPosterImg from '../assets/screenshots/omnidesk/calendar.png';
import chemistryPosterImg from '../assets/screenshots/omnidesk/function-chemistry.png';
import configPosterImg from '../assets/screenshots/omnidesk/config.png';
import cryptoRatesPosterImg from '../assets/screenshots/omnidesk/crypto-rates.png';
import dashboardPosterImg from '../assets/screenshots/omnidesk/dashboard.png';
import grapherPosterImg from '../assets/screenshots/omnidesk/function-grapher.png';
import pdfEditorPosterImg from '../assets/screenshots/omnidesk/pdf-editor.png';

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
    mainMenu: '/assets/aistudio/all-tools_4f73a838.webm',
    dashboard: '/assets/aistudio/all-tools_4f73a838.webm',
    charts: '/assets/aistudio/charts_a1063675.webm',
    diagram: '/assets/aistudio/diagram_52157272.webm',
    systemMonitor: '/assets/aistudio/system-monitor_0ae430da.webm',
    crosshair: '/assets/aistudio/crosshair_7d1c279a.png',
    pdfEditor: '/assets/aistudio/pdf-editor_cdb0140c.webm',
    calendar: '/assets/aistudio/Calendar_33884140.webm',
    currency: '/assets/aistudio/currency-convertor_3e6372c0.webm',
    graph2d: '/assets/aistudio/Graph_46331e83.webm',
    chemistry: '/assets/aistudio/periodic-table_decd888f.webm',
    colorPicker: '/assets/aistudio/color-picker_b0071647.webm',
    themes: '/assets/aistudio/themes_58d475e2.webm',
    config: '/assets/aistudio/settings_c98e59a6.webm',
  },
  omnideskPosters: {
    dashboard: dashboardPosterImg,
    charts: grapherPosterImg,
    diagram: dashboardPosterImg,
    systemMonitor: configPosterImg,
    crosshair: '/assets/aistudio/crosshair_7d1c279a.png',
    pdfEditor: pdfEditorPosterImg,
    calendar: calendarPosterImg,
    currency: cryptoRatesPosterImg,
    graph2d: grapherPosterImg,
    chemistry: chemistryPosterImg,
    colorPicker: dashboardPosterImg,
    themes: dashboardPosterImg,
    config: configPosterImg,
  },
  rateEverythingScreens: {
    main: '/assets/aistudio/rate-main-page_3d8dad1d.png',
    detail: '/assets/aistudio/rate-rating-window_c141b999.png',
    add: '/assets/aistudio/rate-add_45929b18.png',
  },
} as const;
