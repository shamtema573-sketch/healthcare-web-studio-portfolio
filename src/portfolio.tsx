import { useEffect, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUp, ArrowUpRight, Menu } from 'lucide-react';

type StudioLocale = 'en' | 'ru';
export type CaseSlug = 'aurelia' | 'forma' | 'clarity' | 'movewell';

type CaseCopy = {
  type: string;
  preview: string;
  lead: string;
  task: string;
  design: string;
  functions: string[];
  mobile: string;
  stack: string;
  desktopAlt: string;
  mobileAlt: string;
};

type CaseStudyData = {
  slug: CaseSlug;
  name: string;
  image: string;
  copy: Record<StudioLocale, CaseCopy>;
};

const OWNER_GITHUB = 'https://github.com/shamtema573-sketch';
const SOURCE_REPO = 'https://github.com/shamtema573-sketch/healthcare-web-studio-portfolio';
const LOCALE_KEY = 'portfolio-locale';

function readLocale(): StudioLocale {
  try {
    const saved = window.localStorage.getItem(LOCALE_KEY);
    if (saved === 'ru' || saved === 'en') return saved;
  } catch {
    // Continue with the browser language when storage is unavailable.
  }
  return navigator.language.toLowerCase().startsWith('ru') ? 'ru' : 'en';
}

function usePortfolioLocale() {
  const [locale, setLocale] = useState<StudioLocale>(readLocale);
  useEffect(() => {
    document.documentElement.lang = locale;
    try {
      window.localStorage.setItem(LOCALE_KEY, locale);
    } catch {
      // The selected language still works for this page if storage is disabled.
    }
  }, [locale]);
  return [locale, setLocale] as const;
}

function PortfolioLanguageSwitch({ locale, onChange }: { locale: StudioLocale; onChange: (value: StudioLocale) => void }) {
  const label = locale === 'ru' ? 'Язык портфолио' : 'Portfolio language';
  return (
    <div className="portfolio-language-switch" role="group" aria-label={label}>
      <button type="button" aria-pressed={locale === 'en'} onClick={() => onChange('en')}>EN</button>
      <span aria-hidden="true">/</span>
      <button type="button" aria-pressed={locale === 'ru'} onClick={() => onChange('ru')}>RU</button>
    </div>
  );
}

const cases: CaseStudyData[] = [
  {
    slug: 'aurelia',
    name: 'Aurelia',
    image: 'r09-1-aurelia-consultation-v2.jpg',
    copy: {
      en: {
        type: 'Aesthetic care · RU / EN / DE / FR',
        preview: 'Catalogue, duration and sample price',
        lead: 'A fictional aesthetic studio organized around a scannable treatment catalogue and a local booking demonstration.',
        task: 'Help visitors compare sample care formats, duration and price before choosing whether to continue to a demo appointment flow.',
        design: 'Warm mineral tones, a quiet editorial serif and open service rows give the catalogue room without turning it into a wall of cards.',
        functions: ['Four interface languages', 'Search, category filters and price sorting', 'Treatment details and a working demo basket with totals', 'Local date and time selection; no request is transmitted'],
        mobile: 'On narrow screens each treatment keeps its title and description together. Duration and sample price share a separate row, while the add control remains easy to reach.',
        stack: 'React, TypeScript, Vite and authored CSS. Static sample data; all booking and basket actions stay in the browser.',
        desktopAlt: 'Aurelia treatment catalogue captured from the running website.',
        mobileAlt: 'Aurelia treatment catalogue on a phone-width viewport.'
      },
      ru: {
        type: 'Эстетическая косметология · RU / EN / DE / FR',
        preview: 'Каталог, длительность и примерная цена',
        lead: 'Концепт вымышленной студии эстетической косметологии с каталогом процедур и локальным сценарием записи.',
        task: 'Помочь сравнить примеры услуг, длительность и стоимость до перехода к демонстрации записи.',
        design: 'Тёплая минеральная палитра, спокойная антиква и открытый список процедур — без однотипной сетки карточек.',
        functions: ['Четыре языка интерфейса', 'Поиск, фильтр по категориям и сортировка по цене', 'Подробнее о процедуре, корзина и пересчёт суммы', 'Выбор даты и времени без отправки запроса'],
        mobile: 'На узком экране название и описание остаются вместе. Длительность и пример цены занимают отдельную строку, а кнопка добавления остаётся рядом.',
        stack: 'React, TypeScript, Vite и авторский CSS. Данные демонстрационные; запись и корзина работают только в браузере.',
        desktopAlt: 'Каталог процедур Aurelia, снятый в работающем интерфейсе сайта.',
        mobileAlt: 'Каталог процедур Aurelia в мобильной ширине.'
      }
    }
  },
  {
    slug: 'forma',
    name: 'Forma Dental',
    image: 'r09-1-forma-consultation-v2.jpg',
    copy: {
      en: {
        type: 'Private dentistry · RU / EN',
        preview: 'Service discovery and appointment flow',
        lead: 'A fictional dental studio with a separate editorial identity, service list, sample team profiles and local appointment steps.',
        task: 'Make common care options easy to compare and show how a visitor could move from a service to a sample appointment.',
        design: 'Paper-like surfaces, ink-dark type and muted terracotta set a tactile tone. Services and team details use an editorial rhythm.',
        functions: ['Russian and English content', 'Service filtering and sample pricing', 'Switchable fictional profile details', 'Date and time selection, expandable FAQ and local confirmation'],
        mobile: 'The service list stacks descriptions below each title, keeps the example price visible and places the detail action at the row edge.',
        stack: 'React, TypeScript, Vite and authored CSS. Profiles, prices and booking details are fictional; no live clinic system is connected.',
        desktopAlt: 'Forma Dental service list captured from the running website.',
        mobileAlt: 'Forma Dental service list on a phone-width viewport.'
      },
      ru: {
        type: 'Частная стоматология · RU / EN',
        preview: 'Каталог услуг и сценарий записи',
        lead: 'Концепт вымышленной стоматологии с отдельным редакционным стилем, списком услуг и демонстрацией записи.',
        task: 'Помочь сравнить основные услуги и показать путь от выбора услуги к примерной записи.',
        design: 'Фактура бумаги, тёмная типографика и приглушённая терракота. Услуги и профили команды собраны в редакционном ритме.',
        functions: ['Русский и английский интерфейс', 'Фильтр услуг и примерные цены', 'Переключение вымышленных профилей', 'Выбор даты и времени, FAQ и локальное подтверждение'],
        mobile: 'Описание услуги переносится под название, пример цены остаётся виден, а действие для строки находится у её края.',
        stack: 'React, TypeScript, Vite и авторский CSS. Профили, цены и запись вымышлены; связи с клиникой нет.',
        desktopAlt: 'Список услуг Forma Dental в работающем интерфейсе сайта.',
        mobileAlt: 'Список услуг Forma Dental в мобильной ширине.'
      }
    }
  },
  {
    slug: 'clarity',
    name: 'Clarity',
    image: 'r09-1-clarity-lab-v2.jpg',
    copy: {
      en: {
        type: 'Diagnostics · RU / EN',
        preview: 'Searchable diagnostic catalogue',
        lead: 'A sample diagnostic directory designed to make test discovery clear without pretending to show clinical results.',
        task: 'Let a visitor find an example test, inspect its description and prepare a sample visit plan without collecting health information.',
        design: 'Cool white surfaces, a disciplined index and restrained blue-green accents put search and readable rows first.',
        functions: ['Russian and English labels', 'Search across sample tests and category filters', 'Test detail dialog and selected-test plan', 'Empty-state reset and local date/time visit demonstration'],
        mobile: 'Search and category controls wrap above the list. Test details stay readable, and the visit-plan action remains separate from result data.',
        stack: 'React, TypeScript, Vite and authored CSS. Test names and descriptions are sample content; no patient portal or results are present.',
        desktopAlt: 'Clarity diagnostic catalogue captured from the running website.',
        mobileAlt: 'Clarity diagnostic catalogue on a phone-width viewport.'
      },
      ru: {
        type: 'Диагностика · RU / EN',
        preview: 'Поиск по каталогу исследований',
        lead: 'Демонстрационный каталог лаборатории. Он помогает найти пример исследования, но не показывает клинические результаты.',
        task: 'Дать посетителю возможность найти исследование, прочитать описание и подготовить план визита без сбора медицинских данных.',
        design: 'Светлая холодная палитра, собранный индекс и сдержанные сине-зелёные акценты подчёркивают поиск и строки каталога.',
        functions: ['Русский и английский интерфейс', 'Поиск по примерам исследований и фильтр категорий', 'Окно подробностей и список выбранных тестов', 'Сброс пустого результата и локальная демонстрация визита'],
        mobile: 'Поиск и категории переносятся над списком. Описания остаются читаемыми; план визита отделён от любых данных результатов.',
        stack: 'React, TypeScript, Vite и авторский CSS. Названия и описания демонстрационные; личного кабинета и результатов нет.',
        desktopAlt: 'Каталог исследований Clarity в работающем интерфейсе сайта.',
        mobileAlt: 'Каталог исследований Clarity в мобильной ширине.'
      }
    }
  },
  {
    slug: 'movewell',
    name: 'MoveWell',
    image: 'r09-1-movewell-session.jpg',
    copy: {
      en: {
        type: 'Physiotherapy · EN / RU',
        preview: 'Service filter and consultation demo',
        lead: 'An English-first physiotherapy concept that explains sample services and the first-conversation flow.',
        task: 'Help a visitor understand the available service formats and what a first consultation demonstration does.',
        design: 'Natural light, generous image fields and sage-and-clay tones support an active subject without making the page feel clinical.',
        functions: ['English and Russian interface', 'Service filters, process steps and fictional profiles', 'Sample pricing and expandable questions', 'Local date/time consultation form; no data is sent'],
        mobile: 'Service filters become a horizontal strip, descriptions remain under their service names, and the booking action is reachable without side scrolling.',
        stack: 'React, TypeScript, Vite and authored CSS. The content is fictional and there is no appointment platform or health-data flow.',
        desktopAlt: 'MoveWell physiotherapy services captured from the running website.',
        mobileAlt: 'MoveWell physiotherapy services on a phone-width viewport.'
      },
      ru: {
        type: 'Физиотерапия · EN / RU',
        preview: 'Фильтр услуг и консультация',
        lead: 'Концепт студии физиотерапии с основным английским интерфейсом, примерами услуг и первым шагом консультации.',
        task: 'Объяснить посетителю форматы услуг и показать, как устроен демонстрационный сценарий первой встречи.',
        design: 'Естественный свет, крупные поля изображений и оттенки шалфея с глиной поддерживают тему движения.',
        functions: ['Английский и русский интерфейс', 'Фильтры услуг, этапы визита и вымышленные профили', 'Пример стоимости и раскрывающиеся вопросы', 'Локальная форма консультации без отправки данных'],
        mobile: 'Фильтры услуг становятся горизонтальной полосой, описание остаётся под названием, а переход к записи доступен без боковой прокрутки.',
        stack: 'React, TypeScript, Vite и авторский CSS. Содержание вымышленное; календарь и поток медицинских данных не подключены.',
        desktopAlt: 'Услуги MoveWell в работающем интерфейсе сайта.',
        mobileAlt: 'Услуги MoveWell в мобильной ширине.'
      }
    }
  }
];

const homeCopy = {
  en: {
    navWork: 'Selected work', navServices: 'Capabilities', navAbout: 'About this portfolio',
    contact: 'GITHUB PROFILE', heroKicker: 'INDEPENDENT PORTFOLIO / 2026',
    heroTitle: 'Healthcare sites', heroMid: 'with', heroAccent: 'a clear next step.',
    heroBody: 'Four independent concepts. Each has its own visual language, real interface screens and working browser interactions.',
    explore: 'EXPLORE THE WORK', sectionTitle: '01 / SELECTED CONCEPTS',
    sectionNote: 'FOUR DIRECTIONS, ONE PRACTICE', interfaceLabel: 'RUNNING INTERFACE',
    caseLink: 'CASE NOTES', demoLink: 'OPEN DEMO',
    capabilities: '02 / CAPABILITIES', capabilitiesTitle: 'Clear interfaces.', capabilitiesAccent: 'Useful systems.',
    capability1: 'Healthcare websites', capability1Body: 'Clinic sites, service catalogues and multilingual visitor journeys.',
    capability2: 'WordPress starter', capability2Body: 'Aurelia’s block-theme starter has been installed and rendered in an isolated WordPress test. Client hosting, content editing and production setup still need project-specific review.',
    capability3: 'Integrations & automation', capability3Body: 'CRM, scheduling, messaging and AI workflows are scoped separately; no such integration is presented as live here.',
    aboutLabel: '03 / TRANSPARENCY', aboutTitle: 'Concepts, with the working parts left in.',
    aboutBody1: 'These are independent portfolio concepts, not commissioned clinic projects. Names, practitioners, prices, locations and booking details are fictional. Demo interactions run in the browser and do not send or store personal or medical data.',
    aboutBody2: 'Built with React, TypeScript, Vite and authored CSS. The WordPress starter is a theme source tested in an isolated runtime, not a connected production website.',
    footerNote: 'DESIGN AND FRONTEND / 2026', back: 'BACK TO WORK',
    openNav: 'Open navigation', closeNav: 'Close navigation',
    previewAlt: 'A screenshot of the {name} website interface.'
  },
  ru: {
    navWork: 'Проекты', navServices: 'Направления', navAbout: 'О портфолио',
    contact: 'ПРОФИЛЬ GITHUB', heroKicker: 'ПОРТФОЛИО КОНЦЕПТОВ / 2026',
    heroTitle: 'Медицинские сайты', heroMid: 'с понятным', heroAccent: 'следующим шагом.',
    heroBody: 'Четыре самостоятельных концепта. У каждого свой визуальный язык, реальные скриншоты интерфейса и работающие сценарии.',
    explore: 'СМОТРЕТЬ ПРОЕКТЫ', sectionTitle: '01 / ВЫБРАННЫЕ КОНЦЕПТЫ',
    sectionNote: 'ЧЕТЫРЕ РАЗНЫХ НАПРАВЛЕНИЯ', interfaceLabel: 'РАБОТАЮЩИЙ ИНТЕРФЕЙС',
    caseLink: 'О КЕЙСЕ', demoLink: 'ОТКРЫТЬ ДЕМО',
    capabilities: '02 / НАПРАВЛЕНИЯ', capabilitiesTitle: 'Понятные интерфейсы.', capabilitiesAccent: 'Рабочие системы.',
    capability1: 'Сайты для медицины', capability1Body: 'Сайты клиник, каталоги услуг и многоязычные сценарии для посетителей.',
    capability2: 'Заготовка для WordPress', capability2Body: 'Block-theme Aurelia установлен и проверен в изолированном WordPress-тесте. Редактирование контента, хостинг клиента и боевая настройка требуют отдельной проверки.',
    capability3: 'Интеграции и автоматизация', capability3Body: 'CRM, расписание, сообщения и AI-сценарии оцениваются отдельно; здесь они не выдаются за подключённые.',
    aboutLabel: '03 / ГРАНИЦЫ ДЕМО', aboutTitle: 'Концепты с работающими сценариями.',
    aboutBody1: 'Это самостоятельные концепты для портфолио, а не заказы реальных клиник. Названия, специалисты, цены, адреса и запись вымышлены. Демонстрационные сценарии работают в браузере и не отправляют и не сохраняют личные или медицинские данные.',
    aboutBody2: 'Стек: React, TypeScript, Vite и авторский CSS. WordPress starter — исходник темы, проверенный в изолированном runtime; он не подключён к боевому сайту.',
    footerNote: 'ДИЗАЙН И FRONTEND / 2026', back: 'К ПРОЕКТАМ',
    openNav: 'Открыть навигацию', closeNav: 'Закрыть навигацию',
    previewAlt: 'Скриншот интерфейса сайта {name}.'
  }
} satisfies Record<StudioLocale, Record<string, string>>;

function assetsBase(isCase: boolean) {
  return isCase ? '../../assets' : './assets';
}

export function Portfolio() {
  const [locale, setLocale] = usePortfolioLocale();
  const [menuOpen, setMenuOpen] = useState(false);
  const copy = homeCopy[locale];
  const root = assetsBase(false);

  return (
    <main className="portfolio">
      <div className="portfolio-rail">
        <a href="#top" className="studio-mark" aria-label="AI Digital Studio">AD<span>·</span></a>
        <span>HEALTHCARE / DIGITAL / SYSTEMS</span>
        <a href="#projects" className="rail-link">{copy.explore}<ArrowDown size={14} /></a>
      </div>
      <header className="portfolio-header" id="top">
        <a href="#top" className="portfolio-wordmark">AI DIGITAL <span>STUDIO</span></a>
        <nav id="portfolio-navigation" className={menuOpen ? 'portfolio-nav is-open' : 'portfolio-nav'}>
          <a href="#projects" onClick={() => setMenuOpen(false)}>{copy.navWork}</a>
          <a href="#capabilities" onClick={() => setMenuOpen(false)}>{copy.navServices}</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>{copy.navAbout}</a>
        </nav>
        <div className="portfolio-header-actions">
          <PortfolioLanguageSwitch locale={locale} onChange={setLocale} />
          <a className="portfolio-contact" href={OWNER_GITHUB} target="_blank" rel="noopener noreferrer">
            {copy.contact}<ArrowUpRight size={14} />
          </a>
          <button className="mobile-menu-button" type="button" aria-label={menuOpen ? copy.closeNav : copy.openNav} aria-controls="portfolio-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            <Menu />
          </button>
        </div>
      </header>
      <section className="portfolio-hero">
        <p className="portfolio-kicker"><span>{copy.heroKicker}</span><span>DESIGN × FRONTEND × AUTOMATION</span></p>
        <h1>{copy.heroTitle}<br />{copy.heroMid} <em>{copy.heroAccent}</em></h1>
        <div className="portfolio-hero-bottom">
          <p>{copy.heroBody}</p>
          <a href="#projects" className="portfolio-circle">{copy.explore}<ArrowDown /></a>
        </div>
        <span className="portfolio-hero-asterisk" aria-hidden="true">✳</span>
      </section>
      <section className="portfolio-projects" id="projects">
        <div className="portfolio-section-title"><span>{copy.sectionTitle}</span><span>{copy.sectionNote}</span></div>
        {cases.map((project, index) => {
          const projectCopy = project.copy[locale];
          const demoHref = './sites/' + project.slug + '/index.html';
          const caseHref = './cases/' + project.slug + '/index.html';
          const screenshot = root + '/screenshots/r09-1-' + project.slug + '-desktop.jpg';
          return (
            <article key={project.slug} className={'project-row portfolio-' + project.slug}>
              <div className="project-meta"><span>0{index + 1} / 04</span><span>{projectCopy.type}</span></div>
              <a className="project-image" href={demoHref}>
                <img src={root + '/images/' + project.image} alt={project.name + ' visual concept'} />
                <span className="open-project">{copy.demoLink}<ArrowUpRight /></span>
              </a>
              <div className="project-copy">
                <div className="project-copy-intro">
                  <h2>{project.name}</h2>
                  <p>{projectCopy.lead}</p>
                </div>
                <figure className="project-ui-preview">
                  <a href={caseHref} className="project-ui-link">
                    <img src={screenshot} loading="lazy" alt={locale === 'ru' ? projectCopy.desktopAlt : projectCopy.desktopAlt} />
                    <span>{copy.interfaceLabel}</span>
                  </a>
                  <figcaption>{projectCopy.preview}</figcaption>
                </figure>
                <div className="project-copy-actions">
                  <a className="project-case-link" href={caseHref}>{copy.caseLink}<ArrowRight size={15} /></a>
                  <a className="project-arrow" href={demoHref} aria-label={copy.demoLink + ': ' + project.name}><ArrowUpRight /></a>
                </div>
              </div>
            </article>
          );
        })}
      </section>
      <section className="portfolio-capabilities" id="capabilities">
        <div><span>{copy.capabilities}</span><h2>{copy.capabilitiesTitle}<br /><em>{copy.capabilitiesAccent}</em></h2></div>
        <div className="capability-list">
          <article><span>01</span><div><h3>{copy.capability1}</h3><p>{copy.capability1Body}</p></div></article>
          <article><span>02</span><div><h3>{copy.capability2}</h3><p>{copy.capability2Body}</p></div></article>
          <article><span>03</span><div><h3>{copy.capability3}</h3><p>{copy.capability3Body}</p></div></article>
        </div>
      </section>
      <section className="portfolio-about" id="about">
        <span>{copy.aboutLabel}</span>
        <div><h2>{copy.aboutTitle}</h2><p>{copy.aboutBody1}</p><p>{copy.aboutBody2}</p></div>
      </section>
      <footer className="portfolio-footer">
        <a href="#top" className="portfolio-wordmark">AI DIGITAL <span>STUDIO</span></a>
        <span>{copy.footerNote}</span>
        <a href="#projects">{copy.back}<ArrowUp /></a>
      </footer>
    </main>
  );
}

const casePageCopy = {
  en: {
    concept: 'INDEPENDENT PORTFOLIO CONCEPT · FICTIONAL CONTENT',
    allWork: 'ALL WORK', demo: 'OPEN LIVE DEMO', task: 'Task', design: 'Design',
    functions: 'Functions', mobile: 'Mobile', technology: 'Technology',
    screens: 'Interface captures', desktop: 'Desktop view', phone: 'Phone-width view',
    video: 'A short product walkthrough', videoNote: 'Screen recording of the running interface. All interactions shown are browser-only demonstrations.',
    source: 'SOURCE ON GITHUB', back: 'BACK TO ALL PROJECTS',
    playback: 'Your browser does not support this video format.'
  },
  ru: {
    concept: 'САМОСТОЯТЕЛЬНЫЙ КОНЦЕПТ · СОДЕРЖАНИЕ ВЫМЫШЛЕНО',
    allWork: 'ВСЕ ПРОЕКТЫ', demo: 'ОТКРЫТЬ ДЕМО', task: 'Задача',
    design: 'Дизайн', functions: 'Функции', mobile: 'Мобильная версия',
    technology: 'Технологии', screens: 'Скриншоты интерфейса',
    desktop: 'Широкий экран', phone: 'Экран телефона',
    video: 'Короткая демонстрация', videoNote: 'Запись работающего интерфейса в браузере. Все показанные действия остаются демонстрационными.',
    source: 'ИСХОДНИКИ НА GITHUB', back: 'К СПИСКУ ПРОЕКТОВ',
    playback: 'Браузер не поддерживает этот видеоформат.'
  }
} satisfies Record<StudioLocale, Record<string, string>>;

export function CaseStudy({ slug }: { slug: CaseSlug }) {
  const [locale, setLocale] = usePortfolioLocale();
  const project = cases.find(item => item.slug === slug);
  if (!project) return <main className="portfolio"><p>Case study not found.</p></main>;
  const copy = project.copy[locale];
  const labels = casePageCopy[locale];
  const root = assetsBase(true);
  const demoHref = '../../sites/' + slug + '/index.html';
  const desktopShot = root + '/screenshots/r09-1-' + slug + '-desktop.jpg';
  const mobileShot = root + '/screenshots/r09-1-' + slug + '-mobile.jpg';
  const video = root + '/videos/' + slug + '-demo.mp4';

  return (
    <main className="portfolio case-study">
      <div className="portfolio-rail">
        <a href="../../index.html" className="studio-mark" aria-label="AI Digital Studio">AD<span>·</span></a>
        <span>HEALTHCARE / DIGITAL / CASE NOTES</span>
        <a href="../../index.html#projects" className="rail-link">{labels.allWork}<ArrowDown size={14} /></a>
      </div>
      <header className="portfolio-header case-header">
        <a href="../../index.html#projects" className="portfolio-wordmark">AI DIGITAL <span>STUDIO</span></a>
        <span className="case-header-label">{project.name} / {labels.technology}</span>
        <div className="portfolio-header-actions">
          <PortfolioLanguageSwitch locale={locale} onChange={setLocale} />
          <a className="portfolio-contact" href={demoHref}>{labels.demo}<ArrowUpRight size={14} /></a>
        </div>
      </header>
      <section className="case-hero">
        <p className="portfolio-kicker"><span>{labels.concept}</span><span>{copy.type}</span></p>
        <h1>{project.name}<br /><em>{copy.preview}</em></h1>
        <p className="case-lead">{copy.lead}</p>
        <div className="case-techline"><span>{labels.technology}</span><strong>{copy.stack}</strong></div>
      </section>
      <section className="case-screens" aria-labelledby="case-screens-title">
        <h2 id="case-screens-title">{labels.screens}</h2>
        <figure className="case-desktop-shot">
          <img src={desktopShot} alt={copy.desktopAlt} />
          <figcaption>{labels.desktop} · {project.name}</figcaption>
        </figure>
        <figure className="case-mobile-shot">
          <img src={mobileShot} alt={copy.mobileAlt} />
          <figcaption>{labels.phone} · {project.name}</figcaption>
        </figure>
      </section>
      <section className="case-story">
        <div className="case-story-aside">
          <span>R09.1 / {project.slug.toUpperCase()}</span>
          <p>{labels.concept}</p>
        </div>
        <div className="case-story-content">
          <article><span>01 / {labels.task}</span><p>{copy.task}</p></article>
          <article><span>02 / {labels.design}</span><p>{copy.design}</p></article>
          <article><span>03 / {labels.functions}</span><ul>{copy.functions.map(item => <li key={item}>{item}</li>)}</ul></article>
          <article><span>04 / {labels.mobile}</span><p>{copy.mobile}</p></article>
        </div>
      </section>
      <section className="case-video">
        <div><span>05 / {labels.video}</span><h2>{labels.video}</h2><p>{labels.videoNote}</p></div>
        <video controls playsInline preload="metadata" poster={desktopShot}>
          <source src={video} type="video/mp4" />
          {labels.playback}
        </video>
      </section>
      <footer className="case-footer">
        <a className="case-live-link" href={demoHref}>{labels.demo}<ArrowUpRight /></a>
        <a href={SOURCE_REPO} target="_blank" rel="noopener noreferrer">{labels.source}<ArrowUpRight /></a>
        <a href="../../index.html#projects">{labels.back}<ArrowUp /></a>
      </footer>
    </main>
  );
}

