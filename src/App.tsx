/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {useCallback, useEffect, useState} from 'react';
import {Footer} from './components/Footer';
import {Navbar} from './components/Navbar';
import {OMNIDESK_FAVICON_DATA_URI} from './components/OmniDeskLogo';
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

function setMetaTag(selector: string, attribute: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function setCanonicalLink(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

function setFavicon(href: string) {
  const rels = ['icon', 'shortcut icon'] as const;
  for (const rel of rels) {
    let link = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', rel);
      link.setAttribute('type', 'image/svg+xml');
      document.head.appendChild(link);
    }
    link.setAttribute('type', 'image/svg+xml');
    link.setAttribute('href', href);
  }
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
    const seo =
      route === 'omnidesk'
        ? {
            title: t.meta.omnideskTitle,
            description: t.meta.omnideskDescription,
            keywords: t.meta.omnideskKeywords,
          }
        : route === 'rate-everything'
          ? {
              title: t.meta.rateEverythingTitle,
              description: t.meta.rateEverythingDescription,
              keywords: t.meta.rateEverythingKeywords,
            }
          : {
              title: t.meta.homeTitle,
              description: t.meta.homeDescription,
              keywords: t.meta.homeKeywords,
            };

    const canonicalUrl = `${window.location.origin}${window.location.pathname}`;

    document.title = seo.title;
    setFavicon(OMNIDESK_FAVICON_DATA_URI);
    setMetaTag('meta[name="description"]', 'name', 'description', seo.description);
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', seo.keywords);
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', seo.title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', seo.description);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', seo.title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', seo.description);
    setCanonicalLink(canonicalUrl);
  }, [
    route,
    t.meta.homeTitle,
    t.meta.homeDescription,
    t.meta.homeKeywords,
    t.meta.omnideskTitle,
    t.meta.omnideskDescription,
    t.meta.omnideskKeywords,
    t.meta.rateEverythingTitle,
    t.meta.rateEverythingDescription,
    t.meta.rateEverythingKeywords,
  ]);

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
    <div
      className={`min-h-screen flex flex-col ${
        route === 'omnidesk'
          ? 'bg-[#0A0D16] text-[#F8FAFC]'
          : route === 'rate-everything'
            ? 'bg-[#0B0D10] text-zinc-100'
            : 'bg-[#09090B] text-zinc-100'
      }`}
    >
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
