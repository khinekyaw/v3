import { Link } from 'react-router-dom';
import { Container, Section } from '../components/layout';
import { BlogCard } from '../components/BlogCard';
import { posts } from '../data/posts';

const featured = posts.slice(0, 3);

export function Blog() {
  return (
    <Section id="blog">
      <Container>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold text-foreground">Blog</h2>
          <Link
            to="/blog"
            className="text-foreground-secondary hover:text-foreground text-sm transition-colors cursor-pointer flex items-center gap-1"
          >
            See More Blog Posts
            <span>&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {featured.map((post, index) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <BlogCard
                date={post.date}
                title={post.title}
                tags={post.tags}
              />
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
