/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {useCallback, useEffect, useState} from 'react';
import {Footer} from './components/Footer';
import {Navbar} from './components/Navbar';
import {I18nProvider, useI18n} from './i18n/context';
import type {PageRoute} from './i18n/types';
import {HomePage} from './pages/HomePage';
import {OmniDeskPage} from './pages/OmniDeskPage';
import {RateEverythingPage} from './pages/RateEverythingPage';

function resolveRouteFromLocation(): PageRoute {
  const pathname = window.location.pathname.toLowerCase();
  if (pathname.endsWith('/omnidesk.html') || pathname.endsWith('/omnidesk')) {
    return 'omnidesk';
  }
  if (pathname.endsWith('/rate-everything.html') || pathname.endsWith('/rate-everything')) {
    return 'rate-everything';
  }
  const pageAttr = document.body.dataset.page;
  if (pageAttr === 'omnidesk') {
    return 'omnidesk';
  }
  if (pageAttr === 'rate-everything') {
    return 'rate-everything';
  }
  return 'home';
}

function routeToPath(route: PageRoute, hash?: string): string {
  const base =
    route === 'omnidesk'
      ? '/omnidesk.html'
      : route === 'rate-everything'
        ? '/rate-everything.html'
        : '/index.html';
  return hash ? `${base}#${hash}` : base;
}

function PortfolioShell() {
  const {t} = useI18n();
  const [route, setRoute] = useState<PageRoute>(resolveRouteFromLocation);

  useEffect(() => {
    const onPopState = () => {
      setRoute(resolveRouteFromLocation());
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    if (route === 'omnidesk') {
      document.title = t.meta.omnideskTitle;
    } else if (route === 'rate-everything') {
      document.title = t.meta.rateEverythingTitle;
    } else {
      document.title = t.meta.homeTitle;
    }
  }, [route, t.meta.homeTitle, t.meta.omnideskTitle, t.meta.rateEverythingTitle]);

  const handleNavigate = useCallback((nextRoute: PageRoute, hash?: string) => {
    const nextUrl = routeToPath(nextRoute, hash);
    window.history.pushState({}, '', nextUrl);
    setRoute(nextRoute);

    if (hash) {
      window.requestAnimationFrame(() => {
        const target = document.getElementById(hash);
        if (target) {
          target.scrollIntoView({behavior: 'smooth'});
        }
      });
    } else {
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#09090B] text-zinc-100">
      {route === 'home' && <Navbar currentRoute={route} onNavigate={handleNavigate} />}
      <div className="flex-1">
        {route === 'omnidesk' && <OmniDeskPage onNavigate={handleNavigate} />}
        {route === 'rate-everything' && <RateEverythingPage onNavigate={handleNavigate} />}
        {route === 'home' && <HomePage onNavigate={handleNavigate} />}
      </div>
      <Footer currentRoute={route} onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <PortfolioShell />
    </I18nProvider>
  );
}
