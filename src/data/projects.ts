export interface Project {
  slug: string;
  title: string;
  description: string;
  video?: string;
  links: { label: string; href: string }[];
}

export const professionalProjects: Project[] = [
  {
    slug: 'finance-tracker',
    title: 'Finance Tracker',
    description: 'An app for managing personal finances and budgeting.',
    video: '',
    links: [
      { label: 'WEBSITE', href: '#' },
      { label: 'GITHUB', href: '#' },
    ],
  },
  {
    slug: 'finance-tracker-2',
    title: 'Finance Tracker',
    description: 'An app for managing personal finances and budgeting.',
    video: '',
    links: [
      { label: 'WEBSITE', href: '#' },
      { label: 'GITHUB', href: '#' },
    ],
  },
  {
    slug: 'finance-tracker-3',
    title: 'Finance Tracker',
    description: 'An app for managing personal finances and budgeting.',
    video: '',
    links: [
      { label: 'WEBSITE', href: '#' },
      { label: 'GITHUB', href: '#' },
    ],
  },
  {
    slug: 'finance-tracker-4',
    title: 'Finance Tracker',
    description: 'An app for managing personal finances and budgeting.',
    video: '',
    links: [
      { label: 'WEBSITE', href: '#' },
      { label: 'GITHUB', href: '#' },
    ],
  },
  {
    slug: 'finance-tracker-5',
    title: 'Finance Tracker',
    description: 'An app for managing personal finances and budgeting.',
    video: '',
    links: [
      { label: 'WEBSITE', href: '#' },
      { label: 'GITHUB', href: '#' },
    ],
  },
  {
    slug: 'finance-tracker-6',
    title: 'Finance Tracker',
    description: 'An app for managing personal finances and budgeting.',
    video: '',
    links: [
      { label: 'WEBSITE', href: '#' },
      { label: 'GITHUB', href: '#' },
    ],
  },
];

export const experimentProjects: Project[] = [
  {
    slug: 'experiment-1',
    title: 'Finance Tracker',
    description: 'An app for managing personal finances and budgeting.',
    video: '',
    links: [
      { label: 'WEBSITE', href: '#' },
      { label: 'GITHUB', href: '#' },
    ],
  },
  {
    slug: 'experiment-2',
    title: 'Finance Tracker',
    description: 'An app for managing personal finances and budgeting.',
    video: '',
    links: [
      { label: 'WEBSITE', href: '#' },
      { label: 'GITHUB', href: '#' },
    ],
  },
  {
    slug: 'experiment-3',
    title: 'Finance Tracker',
    description: 'An app for managing personal finances and budgeting.',
    video: '',
    links: [
      { label: 'WEBSITE', href: '#' },
      { label: 'GITHUB', href: '#' },
    ],
  },
  {
    slug: 'experiment-4',
    title: 'Finance Tracker',
    description: 'An app for managing personal finances and budgeting.',
    video: '',
    links: [
      { label: 'WEBSITE', href: '#' },
      { label: 'GITHUB', href: '#' },
    ],
  },
];

export const allProjects = [...professionalProjects, ...experimentProjects];
