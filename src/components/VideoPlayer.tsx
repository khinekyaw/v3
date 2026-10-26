import { useRef, useState, useEffect } from 'react';
import { Maximize2, Minimize2, Volume2, VolumeOff } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  className?: string;
}

export function VideoPlayer({ src, className = '' }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
    };
  }, []);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === containerRef.current);
    };

    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const container = containerRef.current;
    if (!container) return;

    if (document.fullscreenElement === container) {
      await document.exitFullscreen();
    } else {
      await container.requestFullscreen();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative group cursor-pixel-pointer ${className}`}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />

      {/* Play/pause overlay */}
      <div
        className={`absolute inset-0 z-2 flex items-center justify-center transition-opacity duration-200 ${
          isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
        }`}
      >
        <div className="w-12 h-12 bg-night/70 text-night-foreground flex items-center justify-center">
          {isPlaying ? (
            <svg width="16" height="18" viewBox="0 0 16 18" fill="currentColor">
              <rect x="1" y="0" width="5" height="18" />
              <rect x="10" y="0" width="5" height="18" />
            </svg>
          ) : (
            <svg width="16" height="18" viewBox="0 0 16 18" fill="currentColor">
              <path d="M2 1.5v15l13-7.5z" />
            </svg>
          )}
        </div>
      </div>

      <div className="absolute bottom-3 right-3 z-2 flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          className="w-11 h-11 border-[3px] border-border bg-background text-foreground flex items-center justify-center hover:bg-pixel-yellow hover:text-night"
        >
          {isMuted ? <VolumeOff size={16} /> : <Volume2 size={16} />}
        </button>

        <button
          type="button"
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          className="w-11 h-11 border-[3px] border-border bg-background text-foreground flex items-center justify-center hover:bg-pixel-yellow hover:text-night"
        >
          {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>
      </div>
    </div>
  );
}
