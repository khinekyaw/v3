import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router';

interface SiteLinkProps {
  to: string;
  className?: string;
  children: ReactNode;
  'aria-current'?: 'page';
}

/**
 * Router link that also handles home-page anchors ("/#work"): on the home page
 * it is a plain in-page jump, elsewhere it navigates home and scrolls there.
 */
export function SiteLink({ to, className, children, ...rest }: SiteLinkProps) {
  const { pathname } = useLocation();

  if (to.startsWith('/#') && pathname === '/') {
    return (
      <a href={to.slice(1)} className={className} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className={className} {...rest}>
      {children}
    </Link>
  );
}
