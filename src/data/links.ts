import darkWorkspaceHeroImg from '../assets/images/dark_workspace_hero_1794578515981.jpg';
import omniAudioEditorImg from '../assets/screenshots/omnidesk/audio-editor.png';
import omniCalendarImg from '../assets/screenshots/omnidesk/calendar.png';
import omniConfigImg from '../assets/screenshots/omnidesk/config.png';
import omniChemistryImg from '../assets/screenshots/omnidesk/function-chemistry.png';
import omniGraphImg from '../assets/screenshots/omnidesk/function-grapher.png';
import omniHashSuiteImg from '../assets/screenshots/omnidesk/hash-suite.png';
import omniMainMenuImg from '../assets/screenshots/omnidesk/dashboard.png';
import omniPdfEditorImg from '../assets/screenshots/omnidesk/pdf-editor.png';
import omniCurrencyImg from '../assets/screenshots/omnidesk/crypto-rates.png';
import omniRandomPickerImg from '../assets/screenshots/omnidesk/random-picker.png';

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
  omnideskScreens: {
    mainMenu: omniMainMenuImg,
    dashboard: omniMainMenuImg,
    pdfEditor: omniPdfEditorImg,
    audioEditor: omniAudioEditorImg,
    calendar: omniCalendarImg,
    currency: omniCurrencyImg,
    graph2d: omniGraphImg,
    chemistry: omniChemistryImg,
    hashSuite: omniHashSuiteImg,
    randomPicker: omniRandomPickerImg,
    config: omniConfigImg,
  },
  rateEverythingScreens: {
    main: '/assets/aistudio/rate-main-page_3d8dad1d.png',
    detail: '/assets/aistudio/rate-rating-window_c141b999.png',
    add: '/assets/aistudio/rate-add_45929b18.png',
  },
} as const;
