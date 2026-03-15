import { useRef, useState, useEffect } from 'react';
import { cn } from '../../lib/utils';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
}

export function Image({ src, alt, className, ...props }: ImageProps) {
  const [visible, setVisible] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    if (img.complete) {
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }

    const onLoad = () => setVisible(true);
    img.addEventListener('load', onLoad);
    return () => img.removeEventListener('load', onLoad);
  }, [src]);

  return (
    <div className="relative w-full h-full">
      {!visible && (
        <div className="absolute inset-0 bg-secondary animate-pulse rounded-[inherit]" />
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 700ms ease-out',
        }}
        className={cn(className)}
        {...props}
      />
    </div>
  );
}
