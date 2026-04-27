import { useRef, useState } from "react";

interface DemoVideoPlayerProps {
  src: string;
}

export default function DemoVideoPlayer({ src }: DemoVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    await video.play();
    setIsPlaying(true);
  };

  return (
    <div className="relative overflow-hidden rounded-[1.5rem] bg-black">
      <div className="aspect-[16/10] w-full bg-black md:aspect-video">
        <video
          ref={videoRef}
          controls
          playsInline
          preload="metadata"
          controlsList="nofullscreen noremoteplayback"
          disablePictureInPicture
          className="h-full w-full rounded-[1.5rem] bg-black object-contain"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>

      {!isPlaying && (
        <button
          type="button"
          aria-label="Play demo video"
          onClick={handlePlay}
          className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 transition hover:bg-black/25"
        >
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 text-slate-950 shadow-[0_20px_60px_rgba(0,0,0,0.35)] md:h-24 md:w-24">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="ml-1 h-9 w-9 fill-current md:h-10 md:w-10">
              <path d="M8 5.14v13.72c0 .72.78 1.17 1.4.81l10.2-6.86a.94.94 0 0 0 0-1.56L9.4 4.33A.94.94 0 0 0 8 5.14Z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
