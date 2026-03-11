export interface Post {
  slug: string;
  date: string;
  title: string;
  tags: string[];
  content: string;
}

export const posts: Post[] = [
  {
    slug: 'optimizing-nextjs-performance',
    date: '10 September 2024',
    title: 'Best Practices for Optimizing Nextjs Performance',
    tags: ['Frontend Development', 'Next.js', 'Performance'],
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    slug: 'react-server-components',
    date: '10 September 2024',
    title: 'Best Practices for Optimizing Nextjs Performance',
    tags: ['Frontend Development', 'React', 'RSC'],
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    slug: 'typescript-patterns',
    date: '10 September 2024',
    title: 'Best Practices for Optimizing Nextjs Performance',
    tags: ['Frontend Development', 'TypeScript', 'Patterns'],
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    slug: 'css-architecture',
    date: '5 August 2024',
    title: 'Best Practices for Optimizing Nextjs Performance',
    tags: ['CSS', 'Architecture', 'Tailwind'],
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    slug: 'testing-strategies',
    date: '20 July 2024',
    title: 'Best Practices for Optimizing Nextjs Performance',
    tags: ['Testing', 'Frontend Development', 'CI/CD'],
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    slug: 'api-design-principles',
    date: '1 June 2024',
    title: 'Best Practices for Optimizing Nextjs Performance',
    tags: ['API', 'Backend', 'REST'],
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
];
