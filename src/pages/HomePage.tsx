import {ArrowRight, ArrowUpRight, Check, Copy, Mail} from 'lucide-react';
import {useMemo, useState} from 'react';
import {LanguageSwitcher} from '../components/LanguageSwitcher';
import {MediaFrame} from '../components/MediaFrame';
import {EXTERNAL_LINKS, MEDIA_ASSETS} from '../data/links';
import {useI18n} from '../i18n/context';
import type {PageRoute, RepoFilter} from '../i18n/types';

interface HomePageProps {
  onNavigate: (route: PageRoute, hash?: string) => void;
}

export function HomePage({onNavigate}: HomePageProps) {
  const {t} = useI18n();
  const [repoFilter, setRepoFilter] = useState<RepoFilter>('all');
  const [copied, setCopied] = useState(false);

  const filteredRepos = useMemo(() => {
    if (repoFilter === 'all') {
      return t.home.archive.repos;
    }
    return t.home.archive.repos.filter((repo) => repo.category === repoFilter);
  }, [repoFilter, t.home.archive.repos]);

  const handleProjectLink = (event: React.MouseEvent<HTMLAnchorElement>, route: PageRoute) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    event.preventDefault();
    onNavigate(route);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(t.home.contact.emailValue);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const filterButtons: {key: RepoFilter; label: string}[] = [
    {key: 'all', label: t.home.archive.filterAll},
    {key: 'web', label: t.home.archive.filterWeb},
    {key: 'desktop', label: t.home.archive.filterDesktop},
    {key: 'database', label: t.home.archive.filterDatabase},
  ];

  return (
    <main className="bg-[#09090B] text-zinc-100">
      {/* Minimalistic Dark Hero */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 sm:pt-14 sm:pb-20">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs sm:text-sm font-medium text-zinc-400">{t.home.hero.locationLine}</p>
          <LanguageSwitcher />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-zinc-50 leading-[1.08] max-w-xl">
              {t.home.hero.headline}
            </h1>
            <p className="mt-5 text-base sm:text-lg text-zinc-400 leading-relaxed max-w-xl">
              {t.home.hero.lead}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] text-sm font-semibold text-zinc-950 bg-zinc-100 rounded-lg hover:bg-white transition-colors duration-150 whitespace-nowrap shrink-0"
              >
                <span>{t.home.hero.primaryCta}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={EXTERNAL_LINKS.githubProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] text-sm font-semibold text-zinc-200 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-zinc-600 transition-colors duration-150 whitespace-nowrap shrink-0"
              >
                <span>{t.home.hero.secondaryCta}</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <MediaFrame
              src={MEDIA_ASSETS.darkWorkspaceHero}
              alt={t.home.hero.imageAlt}
              fallbackTitle={t.home.hero.imageFallbackTitle}
              className="rounded-xl aspect-[4/3] lg:aspect-auto lg:h-full min-h-[260px]"
            />
          </div>
        </div>
      </section>

      {/* About Me, Work Experience & Education (Separated from Projects) */}
      <section id="about" className="border-t border-zinc-800/80 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-50">
                  {t.home.aboutSection.sectionTitle}
                </h2>
                <p className="mt-2.5 text-sm sm:text-base text-zinc-400 leading-relaxed">
                  {t.home.aboutSection.sectionSubtitle}
                </p>
              </div>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                {t.home.aboutSection.bioParagraph}
              </p>

              <div className="pt-4 border-t border-zinc-800 space-y-5">
                <h3 className="font-display text-lg font-semibold text-zinc-100">
                  {t.home.aboutSection.skillsHeading}
                </h3>
                <div className="space-y-4">
                  {t.home.aboutSection.skillGroups.map((group) => (
                    <div key={group.title} className="space-y-1">
                      <h4 className="text-xs font-semibold text-zinc-300">{group.title}</h4>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        {group.items.map((skill, idx) => (
                          <span key={skill}>
                            {skill}
                            {idx < group.items.length - 1 && (
                              <span className="mx-1.5 text-zinc-600" aria-hidden="true">
                                ·
                              </span>
                            )}
                          </span>
                        ))}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-10">
              {/* Work Experience Block */}
              <div>
                <h3 className="font-display text-lg font-semibold text-zinc-100 pb-3.5 border-b border-zinc-800">
                  {t.home.aboutSection.workExperienceHeading}
                </h3>
                <div className="divide-y divide-zinc-800/80">
                  {t.home.aboutSection.workExperiences.map((exp, index) => (
                    <div key={`${exp.organization}-${index}`} className="py-4">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h4 className="text-base font-semibold text-zinc-100">{exp.role}</h4>
                        <span className="font-mono text-xs text-zinc-500 tabular-nums">{exp.period}</span>
                      </div>
                      <p className="mt-1 text-sm text-zinc-300">
                        {exp.organization} <span className="text-zinc-600">·</span>{' '}
                        <span className="text-zinc-500">{exp.location}</span>
                      </p>
                      <p className="mt-1.5 text-sm text-zinc-400 leading-relaxed">{exp.summary}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education Block */}
              <div>
                <h3 className="font-display text-lg font-semibold text-zinc-100 pb-3.5 border-b border-zinc-800">
                  {t.home.aboutSection.educationHeading}
                </h3>
                <div className="divide-y divide-zinc-800/80">
                  {t.home.aboutSection.educationItems.map((edu, index) => (
                    <div key={`${edu.organization}-${index}`} className="py-4">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h4 className="text-base font-semibold text-zinc-100">{edu.role}</h4>
                        <span className="font-mono text-xs text-zinc-500 tabular-nums">{edu.period}</span>
                      </div>
                      <p className="mt-1 text-sm text-zinc-300">
                        {edu.organization} <span className="text-zinc-600">·</span>{' '}
                        <span className="text-zinc-500">{edu.location}</span>
                      </p>
                      <p className="mt-1.5 text-sm text-zinc-400 leading-relaxed">{edu.summary}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="border-t border-zinc-800/80 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-50">
              {t.home.featured.sectionTitle}
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-zinc-400 leading-relaxed">
              {t.home.featured.sectionSubtitle}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* OmniDesk Card (Real Main Menu Screenshot) */}
            <article className="flex flex-col bg-[#0D0E17] border border-[#1E2235] rounded-xl overflow-hidden">
              <a
                href="./omnidesk.html"
                onClick={(e) => handleProjectLink(e, 'omnidesk')}
                className="block group"
              >
                <MediaFrame
                  src={MEDIA_ASSETS.omnideskScreens.mainMenu}
                  alt={t.home.featured.omnideskImageAlt}
                  fallbackTitle={t.home.featured.omnideskTitle}
                  className="aspect-[16/9] border-0 border-b border-[#1E2235] rounded-none bg-[#080911]"
                  imgClassName="object-top transition-transform duration-200 group-hover:scale-[1.02]"
                />
              </a>
              <div className="p-6 flex flex-col flex-1 justify-between gap-6">
                <div>
                  <p className="text-xs font-medium text-indigo-400">{t.home.featured.omnideskMeta}</p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-zinc-50">
                    <a
                      href="./omnidesk.html"
                      onClick={(e) => handleProjectLink(e, 'omnidesk')}
                      className="hover:text-indigo-400 transition-colors"
                    >
                      {t.home.featured.omnideskTitle}
                    </a>
                  </h3>
                  <p className="mt-2.5 text-sm text-zinc-400 leading-relaxed">
                    {t.home.featured.omnideskSummary}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="./omnidesk.html"
                    onClick={(e) => handleProjectLink(e, 'omnidesk')}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[40px] text-xs sm:text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>{t.home.featured.readCaseStudy}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                  <a
                    href={EXTERNAL_LINKS.omnideskRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[40px] text-xs sm:text-sm font-semibold text-zinc-200 bg-transparent border border-[#262B42] rounded-lg hover:border-indigo-400 transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>{t.home.featured.viewRepository}</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>

            {/* RateEverything Card (Real Main Catalog Screenshot) */}
            <article className="flex flex-col bg-[#0D0D0D] border border-zinc-800 rounded-xl overflow-hidden">
              <a
                href="./rate-everything.html"
                onClick={(e) => handleProjectLink(e, 'rate-everything')}
                className="block group"
              >
                <MediaFrame
                  src={MEDIA_ASSETS.rateEverythingScreens.main}
                  alt={t.home.featured.rateEverythingImageAlt}
                  fallbackTitle={t.home.featured.rateEverythingTitle}
                  className="aspect-[16/9] border-0 border-b border-zinc-800 rounded-none bg-[#050505]"
                  imgClassName="object-top transition-transform duration-200 group-hover:scale-[1.02]"
                />
              </a>

              <div className="p-6 flex flex-col flex-1 justify-between gap-6">
                <div>
                  <p className="text-xs font-medium text-amber-400">{t.home.featured.rateEverythingMeta}</p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-zinc-50">
                    <a
                      href="./rate-everything.html"
                      onClick={(e) => handleProjectLink(e, 'rate-everything')}
                      className="hover:text-amber-400 transition-colors"
                    >
                      {t.home.featured.rateEverythingTitle}
                    </a>
                  </h3>
                  <p className="mt-2.5 text-sm text-zinc-400 leading-relaxed">
                    {t.home.featured.rateEverythingSummary}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="./rate-everything.html"
                    onClick={(e) => handleProjectLink(e, 'rate-everything')}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[40px] text-xs sm:text-sm font-semibold text-black bg-amber-500 rounded-lg hover:bg-amber-400 transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>{t.home.featured.readCaseStudy}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                  <a
                    href={EXTERNAL_LINKS.rateEverythingLive}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[40px] text-xs sm:text-sm font-semibold text-zinc-200 bg-transparent border border-zinc-800 rounded-lg hover:border-amber-500/60 transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>{t.home.featured.visitLiveSite}</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                  <a
                    href={EXTERNAL_LINKS.rateEverythingRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 min-h-[40px] text-xs sm:text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>{t.home.featured.viewRepository}</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Repository Archive */}
      <section className="border-t border-zinc-800/80 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-50">
                {t.home.archive.sectionTitle}
              </h2>
              <p className="mt-2 text-sm sm:text-base text-zinc-400">
                {t.home.archive.sectionSubtitle}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-lg self-start">
              {filterButtons.map((btn) => {
                const isActive = repoFilter === btn.key;
                return (
                  <button
                    key={btn.key}
                    type="button"
                    onClick={() => setRepoFilter(btn.key)}
                    aria-pressed={isActive}
                    className={`px-3 py-1.5 min-h-[36px] text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive ? 'bg-zinc-100 text-zinc-950' : 'text-zinc-400 hover:text-zinc-100'
                    }`}
                  >
                    {btn.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 border-t border-zinc-800/80 divide-y divide-zinc-800/80">
            {filteredRepos.length === 0 ? (
              <p className="py-8 text-sm text-zinc-400">{t.home.archive.emptyState}</p>
            ) : (
              filteredRepos.map((repo) => (
                <div
                  key={repo.name}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1 max-w-2xl">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="font-display text-base font-semibold text-zinc-100">{repo.name}</h3>
                      <span className="text-xs text-zinc-500">{repo.language}</span>
                      <span className="text-zinc-700" aria-hidden="true">
                        ·
                      </span>
                      <span className="font-mono text-xs text-zinc-500 tabular-nums">{repo.year}</span>
                    </div>
                    <p className="text-sm text-zinc-400">{repo.description}</p>
                  </div>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-300 hover:text-white transition-colors whitespace-nowrap shrink-0 self-start sm:self-center py-1.5"
                  >
                    <span>{t.home.archive.openRepo}</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Minimal Contact Section */}
      <section id="contact" className="border-t border-zinc-800/80 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
            <div className="max-w-md space-y-4">
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-zinc-50">
                {t.home.contact.sectionTitle}
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                {t.home.contact.sectionSubtitle}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${EXTERNAL_LINKS.email}`}
                  className="inline-flex items-center gap-2 text-base font-semibold text-zinc-100 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-zinc-400" aria-hidden="true" />
                  <span>{t.home.contact.emailValue}</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] text-xs font-medium text-zinc-300 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-zinc-600 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                      <span>{t.home.contact.copiedEmail}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{t.home.contact.copyEmail}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="w-full md:w-80 space-y-3">
              <p className="text-xs font-medium text-zinc-500">{t.home.contact.socialsHeading}</p>
              <div className="border-t border-zinc-800 divide-y divide-zinc-800">
                <a
                  href={EXTERNAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 flex items-center justify-between gap-4 text-sm text-zinc-200 hover:text-white transition-colors"
                >
                  <span className="font-semibold">{t.home.contact.linkedinLabel}</span>
                  <span className="inline-flex items-center gap-1.5 text-zinc-500">
                    <span className="font-mono text-xs">in/leonid-charikov</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </a>
                <a
                  href={EXTERNAL_LINKS.githubProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 flex items-center justify-between gap-4 text-sm text-zinc-200 hover:text-white transition-colors"
                >
                  <span className="font-semibold">{t.home.contact.githubLabel}</span>
                  <span className="inline-flex items-center gap-1.5 text-zinc-500">
                    <span className="font-mono text-xs">@LeonidCharikov</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
