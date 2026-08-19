import { prizeTiers } from './prizeTiers'

export const COPY = {
  wordmark: 'ISPY',
  headline: ['Build spyware,', 'get spy gear.'],
  sub: 'Ship a working piece of surveillance tech. Get paid in cool sh*t.',
  fine: 'You can build either software or hardware :)',
  cta: 'Start building',
  ctaHref: '/api/auth/login',
  nav: [
    { label: 'What to build', href: '/#build' },
    { label: 'How it works', href: '/#how' },
    { label: 'Shop', href: '/#shop' },
    { label: 'FAQ', href: '/#faq' },
  ],
}

export const IDEAS = [
  { name: 'A keylogger', body: 'Something that reads every key pressed on a machine and sends it somewhere else' },
  { name: 'A camera on wheels', body: 'A camera that records things happens in real life, you watch it on your laptop.' },
  { name: 'A packet sniffer', body: "Sit on a network and see what's moving across it." },
  { name: 'An OSINT tool', body: 'Type in a username. It sees where this username exists on popular platforms.' },
]
export const STEPS = [
  {
    n: '01',
    title: 'Build it',
    body: 'Anything that could watch, listen to, or track something. It could be hardware or software.',
  },
  {
    n: '02',
    title: 'Log your hours',
    body: 'Software: connect Hackatime and it counts your time for you.Hardware: keep a build journal and report your own hours or use lapse!',
  },
  {
    n: '03',
    title: 'Ship it',
    body: 'A public repo, a demo link, a screenshot, and a few sentences on what it does. Hardware can send a demo video.',
  },
  {
    n: '04',
    title: 'Get rewards',
    body: 'Get nice rewards to spy more :)',
  },
]

export const FAQ = [
  {
    q: 'Can I get more than one thing?',
    a: 'Yes. It’s a cart, with quantities. The only rule is the cart can’t cost more hours than you’ve logged.',
  },
  {
    q: 'Do I have to use Hackatime?',
    a: 'For software you need to use hackatime to count your hours, for hardware, you can either journal or use lapse!',
  },
  {
    q: 'What if my cart costs more than my hours?',
    a: 'You can log more hours and submit it :)',
  },
  {
    q: 'Does it have to be finished?',
    a: 'It has to work. Hardware gets some slack on "works" because parts show up late and things catch fire.',
  },
]

export const ITEM_COUNT = prizeTiers.reduce((n, t) => n + t.items.length, 0)
export const MIN_HOURS = Math.min(...prizeTiers.map((t) => t.hours))
export const MAX_HOURS = Math.max(...prizeTiers.map((t) => t.hours))

export const imgSrc = (src) => (typeof src === 'string' ? src : src?.src)
