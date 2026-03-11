export interface Post {
  slug: string;
  date: string;
  title: string;
  tags: string[];
  content: string;
}

export const posts: Post[] = [
  {
    slug: 'design-systems-that-ship',
    date: '15 January 2025',
    title: 'Design Systems That Actually Ship',
    tags: ['React', 'Design Systems', 'DX'],
    content: 'Most design systems die in Figma. Here\'s how we built one at Codigo that developers actually wanted to use — atomic components, clear tokens, and zero friction adoption.',
  },
  {
    slug: 'ssr-csr-isr-when-to-use-what',
    date: '20 November 2024',
    title: 'SSR, CSR, ISR — When to Use What',
    tags: ['Next.js', 'Performance', 'Architecture'],
    content: 'Rendering strategies aren\'t one-size-fits-all. I break down when each approach makes sense, with real examples from shipping Suzuki Myanmar\'s web app.',
  },
  {
    slug: 'genai-in-my-workflow',
    date: '5 September 2024',
    title: 'How I Use GenAI Without Losing My Mind',
    tags: ['AI', 'Productivity', 'DX'],
    content: 'AI tools are everywhere now. Here\'s my honest take on where they help (type generation, scaffolding) and where they get in the way.',
  },
  {
    slug: 'animations-that-feel-right',
    date: '12 July 2024',
    title: 'Web Animations That Feel Right',
    tags: ['CSS', 'Lottie', 'UX'],
    content: 'Scroll triggers, micro-interactions, Lottie — lessons from building the Chit MayMay landing page. Not every animation needs to exist, but the right ones change everything.',
  },
  {
    slug: 'tailwind-at-scale',
    date: '3 May 2024',
    title: 'Tailwind at Scale: Patterns That Survived',
    tags: ['Tailwind', 'CSS', 'Architecture'],
    content: 'Tailwind is great until your codebase grows. Here are the patterns and conventions that kept our styles maintainable across 5+ enterprise projects.',
  },
  {
    slug: 'from-python-to-frontend',
    date: '18 February 2024',
    title: 'From Python to Frontend — My Pivot Story',
    tags: ['Career', 'Python', 'Frontend'],
    content: 'I started building chatbots with Django. Now I build design systems in React. Here\'s what the switch taught me about software, craft, and finding your lane.',
  },
];
