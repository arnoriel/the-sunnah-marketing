import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

interface VideoCardProps {
  src: string;
  label: string;
  poster?: string;
  className?: string;
}

export default function VideoCard({ src, label, poster, className = "" }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activated, setActivated] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleActivate = useCallback(() => {
    if (!activated) {
      setActivated(true);
      setTimeout(() => {
        videoRef.current?.play();
        setIsPlaying(true);
      }, 50);
      return;
    }
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play();
      setIsPlaying(true);
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  }, [activated]);

  return (
    <div
      className={`relative overflow-hidden border border-white/8 group cursor-pointer hover:border-[#1a6bff]/40 transition-all duration-300 ${className}`}
      style={{ aspectRatio: "9/16" }}
      onClick={handleActivate}
    >
      <div className="absolute inset-0 bg-[#0d0d18]" />

      {activated && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={src}
          playsInline
          preload="auto"
          onEnded={() => setIsPlaying(false)}
        />
      )}

      {poster && !isPlaying && (
        <img
          src={poster}
          alt={label}
          width={360}
          height={640}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      )}

      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
        }`}
        style={{ background: isPlaying ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.45)" }}
      >
        <motion.div
          whileTap={{ scale: 0.93 }}
          className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#1a6bff]/80 border-2 border-white/30 flex items-center justify-center shadow-[0_0_30px_rgba(26,107,255,0.5)]"
        >
          {isPlaying ? (
            <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <Play className="w-5 h-5 md:w-6 md:h-6 text-white fill-white ml-0.5" />
          )}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="font-dm text-xs text-white/70">{label}</p>
      </div>
    </div>
  );
}