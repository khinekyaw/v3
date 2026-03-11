import { Container, Section, SectionHeader } from '../components/layout';
import { BlogCard } from '../components/BlogCard';

const posts = [
  {
    date: '10 September 2024',
    title: 'Best Practices for Optimizing Nextjs Performance',
    tags: ['Frontend Development', 'Frontend Development', 'Frontend Development'],
  },
  {
    date: '10 September 2024',
    title: 'Best Practices for Optimizing Nextjs Performance',
    tags: ['Frontend Development', 'Frontend Development', 'Frontend Development'],
  },
  {
    date: '10 September 2024',
    title: 'Best Practices for Optimizing Nextjs Performance',
    tags: ['Frontend Development', 'Frontend Development', 'Frontend Development'],
  },
];

export function Blog() {
  return (
    <Section>
      <Container>
        <SectionHeader
          title="Blog"
          action={{ label: 'See More Blog Posts', href: '#' }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <div
              key={index}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <BlogCard
                date={post.date}
                title={post.title}
                tags={post.tags}
              />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
