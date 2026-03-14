import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container, Section } from '../components/layout';
import { BlogCard } from '../components/BlogCard';
import { posts } from '../data/posts';

export function BlogPage() {
  return (
    <Section className="py-10">
      <Container>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-foreground-secondary hover:text-foreground transition-colors mb-8 md:mb-12"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-10 md:mb-16 animate-fade-in">
          All Posts
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {posts.map((post, index) => (
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
