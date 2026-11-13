import darkWorkspaceHeroImg from '../assets/images/dark_workspace_hero_1794578515981.jpg';
import omniGraphImg from '../assets/screenshots/omnidesk/2d-graph.png';
import omniChemistryImg from '../assets/screenshots/omnidesk/chemistry.png';
import omniCurrencyImg from '../assets/screenshots/omnidesk/currency-convertor.png';
import omniMainMenuImg from '../assets/screenshots/omnidesk/main-menu.png';

export const EXTERNAL_LINKS = {
  githubProfile: 'https://github.com/LeonidCharikov',
  omnideskRepo: 'https://github.com/LeonidCharikov/OmniDesk',
  rateEverythingRepo: 'https://github.com/LeonidCharikov/RateEverything',
  rateEverythingLive: 'https://rate-everything-omega.vercel.app/',
  linkedin: 'https://www.linkedin.com/in/leonid-charikov/',
  email: 'leonidcharikov@gmail.com',
} as const;

export const MEDIA_ASSETS = {
  darkWorkspaceHero: darkWorkspaceHeroImg,
  omnideskScreens: {
    mainMenu: omniMainMenuImg,
    chemistry: omniChemistryImg,
    currency: omniCurrencyImg,
    graph2d: omniGraphImg,
  },
  rateEverythingScreens: {
    main: '/assets/aistudio/rate-main-page_3d8dad1d.png',
    detail: '/assets/aistudio/rate-rating-window_c141b999.png',
    add: '/assets/aistudio/rate-add_45929b18.png',
  },
} as const;
