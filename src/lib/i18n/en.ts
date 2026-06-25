const en = {
  nav: {
    work: 'Work',
    process: 'Process',
    contact: 'Contact',
    startProject: 'Start a project',
  },
  hero: {
    headline: 'We design and build\nwebsites that win attention.',
    sub: 'From idea to live — design, development & deployment for founders and businesses.',
    cta: 'Start a project',
    ctaSecondary: 'See our work',
  },
  services: {
    eyebrow: 'What we do',
    heading: 'Full-cycle studio,\none roof.',
    items: [
      {
        title: 'Design',
        desc: '[TODO] We craft UI/UX that converts — pixel-perfect interfaces grounded in brand and user intent.',
      },
      {
        title: 'Development',
        desc: '[TODO] Fast, accessible, and maintainable code built with modern stacks for scale.',
      },
      {
        title: 'Deployment',
        desc: '[TODO] From staging to production — we configure, ship, and monitor so you stay live.',
      },
    ],
  },
  tech: {
    eyebrow: 'Tech we use',
    heading: 'Expert on these technologies',
  },
  work: {
    eyebrow: 'Selected work',
    heading: 'Projects we\'re proud of',
    view: 'View',
    live: 'Live',
  },
  process: {
    eyebrow: 'Our process',
    heading: 'How we work',
    steps: [
      { number: '01', title: 'Initiation', desc: '[TODO] We align on goals, audience, and scope before a single pixel is drawn.' },
      { number: '02', title: 'Planning', desc: '[TODO] Sitemap, wireframes, content strategy, and a clear project timeline.' },
      { number: '03', title: 'Execution', desc: '[TODO] Design and development run in tight loops — you review, we iterate.' },
      { number: '04', title: 'Testing', desc: '[TODO] Cross-browser, cross-device, performance, and accessibility checks.' },
      { number: '05', title: 'Delivery', desc: '[TODO] Launch, handover, and post-launch support — done right the first time.' },
    ],
  },
  whyUs: {
    eyebrow: 'Why Arses',
    heading: 'Numbers that speak',
    credibility: '[TODO] A studio where senior craft meets studio speed.',
    stats: [
      { value: 40, suffix: '+', label: 'Projects delivered' },
      { value: 5, suffix: '+', label: 'Years of experience' },
      { value: 30, suffix: '+', label: 'Happy clients' },
      { value: 4, suffix: ' wks', label: 'Avg. delivery time' },
    ],
  },
  contact: {
    eyebrow: 'Contact',
    heading: 'Ready to build\nsomething great?',
    sub: '[TODO] Tell us about your project — we respond within 24 hours.',
    telegram: 'Message on Telegram',
    phone: '[TODO: +1 234 567 8900]',
    handle: '@[TODO-handle]',
  },
  footer: {
    copyright: '© Arses',
    domain: 'arses.it.com',
    tagline: 'Web design, development & deployment.',
  },
  lang: {
    en: 'EN',
    fa: 'FA',
  },
} as const

export default en
export type Translations = typeof en
