export const site = {
  name: 'Khine Kyaw Tun',
  role: 'Software Engineer',
  location: 'Bangkok, Thailand',
  email: 'thekhinekyaw@gmail.com',
  phone: '+66 0660122240',
  avatar: '/images/kkt.webp',
  bio: {
    highlighted: ['React, Next.js & TypeScript', 'scalable UI systems', 'sports streaming, automotive & AI'],
    full: 'I enjoy creating engaging web experiences and exploring new technologies.',
  },
  social: {
    linkedin: 'https://linkedin.com/in/khinekyaw',
    github: 'https://github.com/khinekyaw',
  },
  skills: {
    languages: ['JavaScript', 'TypeScript', 'Python', 'PUG', 'Sass'],
    frameworks: ['React.js', 'Next.js', 'Tailwind CSS', 'Tanstack', 'React Hook Form', 'Redux', 'Zustand', 'Zod'],
    practices: ['Atomic Design', 'SOLID'],
  },
  education: {
    degree: 'Bachelor of Engineering',
    school: 'West Yangon Technological University',
    year: '2014 - 2021',
  },
  languages: [
    { name: 'English', level: 'Conversational' },
    { name: 'Burmese', level: 'Native' },
  ],
};

export const experiences = [
  {
    company: 'Codigo',
    role: 'Front End Developer',
    location: 'Remote, Singapore',
    dateRange: 'Dec 2023',
    isPresent: true,
    bullets: [
      'Shipped 5+ enterprise web apps with cross-regional teams, modern design systems and serious perf work.',
      'Co-built a React design system library with the design team — cut feature dev time by 20%.',
      'Used GenAI tools to automate type generation, scaffolding & debugging. Faster by 10%, a11y compliant.',
    ],
  },
  {
    company: 'Dkmads',
    role: 'Front End Developer',
    location: 'Yangon, Myanmar',
    dateRange: 'Jan 2023 - Nov 2023',
    isPresent: false,
    bullets: [
      'Built a pixel-perfect, mobile-first web app for Suzuki Myanmar — one of the country\'s biggest auto brands.',
      'Architected animated landing page for Chit MayMay app with scroll triggers, mouse interactions & Lottie.',
      'Boosted SEO & perf through asset optimization and smart SSR/CSR/ISR strategies.',
    ],
  },
  {
    company: 'UMG Myanmar',
    role: 'Python Developer',
    location: 'Yangon, Myanmar',
    dateRange: 'Dec 2021 - June 2022',
    isPresent: false,
    bullets: [
      'Built an AI chatbot platform with NLP & ML using Django.',
      'Integrated with Telegram, Messenger & WordPress — multi-platform reach.',
      'Deployed on Ubuntu production server with optimized performance.',
    ],
  },
];
