export const site = {
  name: 'Khine Kyaw Tun',
  role: 'Frontend Engineer',
  location: 'Bangkok, Thailand',
  email: 'hello@khinekyaw.com',
  phone: '+66 0660122240',
  avatar: '/images/kkt.webp',
  bio: {
    intro: "I've spent 4+ years building web apps with React, Next.js and TypeScript.",
    more: 'Most of my days go into design systems, page speed and accessible UI. When a project needs it, I also work on the backend with PostgreSQL and Python.',
  },
  social: {
    linkedin: 'https://linkedin.com/in/khinekyaw',
    github: 'https://github.com/khinekyaw',
  },
  skills: {
    languages: ['TypeScript', 'JavaScript', 'HTML', 'CSS', 'Python'],
    frameworks: ['React', 'Next.js', 'Tailwind CSS', 'Sass', 'Django'],
    data: ['Zustand', 'Redux Toolkit', 'TanStack Query', 'React Hook Form', 'Zod'],
    testing: ['Vitest', 'React Testing Library', 'Playwright', 'Jest'],
    tooling: ['Git', 'GitHub Actions', 'Storybook', 'Vite', 'Vercel', 'Docker'],
    practices: ['WCAG 2.1', 'Core Web Vitals', 'Design systems', 'Agile', 'REST APIs'],
  },
  education: {
    degree: 'B.Eng (Electronics)',
    school: 'West Yangon Technological University',
    year: '2021',
  },
  languages: [
    { name: 'English', level: 'Professional' },
    { name: 'Burmese', level: 'Native' },
  ],
};

export const experiences = [
  {
    company: 'Codigo',
    role: 'Senior Front-end Developer',
    location: 'Remote, Singapore',
    dateRange: 'Dec 2023',
    isPresent: true,
    summary:
      "I lead a three-person frontend team and have shipped 5+ client apps with people across two countries. I also built our Asana-style task platform end to end (Next.js, PostgreSQL, 300+ Playwright tests) and co-built the Storybook design system our projects now share.",
  },
  {
    company: 'Dkmads',
    role: 'Front-end Developer',
    location: 'Yangon, Myanmar',
    dateRange: 'Jan 2023 - Nov 2023',
    isPresent: false,
    summary:
      "I built Suzuki Myanmar's national website, mobile first and loading in under 2 seconds on 3G, plus an animated landing page for the Chit MayMay app.",
  },
  {
    company: 'UMG Myanmar',
    role: 'Python Developer',
    location: 'Yangon, Myanmar',
    dateRange: 'Dec 2021 - June 2022',
    isPresent: false,
    summary:
      'I built a Django chatbot that answered customers on Telegram, Messenger and WordPress, and deployed it on Ubuntu with Nginx and Gunicorn.',
  },
];
