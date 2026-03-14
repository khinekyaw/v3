import { ArrowLeft } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Container, Section } from '../components/layout';
import { RichText } from '../components/RichText';
import { posts } from '../data/posts';

export function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <Section className="py-10">
      <Container>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-foreground-secondary hover:text-foreground transition-colors mb-8 md:mb-12"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        <article className="max-w-2xl animate-fade-in">
          {/* Date */}
          <p className="text-xs font-semibold text-foreground-tertiary mb-3">
            {post.date}
          </p>

          {/* Title */}
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {post.title}
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-secondary rounded-lg text-[10px] font-medium text-foreground-secondary leading-4"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Content */}
          <RichText content={post.content} />
        </article>
      </Container>
    </Section>
  );
}
