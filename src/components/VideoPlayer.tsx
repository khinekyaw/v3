import { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeOff } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  className?: string;
}

export function VideoPlayer({ src, className = '' }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

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

  return (
    <div
      className={`relative group cursor-pointer ${className}`}
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
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
          isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
        }`}
      >
        <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
          {isPlaying ? (
            <svg width="16" height="18" viewBox="0 0 16 18" fill="white">
              <rect x="1" y="0" width="5" height="18" rx="1" />
              <rect x="10" y="0" width="5" height="18" rx="1" />
            </svg>
          ) : (
            <svg width="16" height="18" viewBox="0 0 16 18" fill="white">
              <path d="M2 1.5v15l13-7.5z" />
            </svg>
          )}
        </div>
      </div>

      {/* Mute/unmute button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/70"
      >
        {isMuted ? (
          <VolumeOff size={14} className="text-white" />
        ) : (
          <Volume2 size={14} className="text-white" />
        )}
      </button>
    </div>
  );
}
