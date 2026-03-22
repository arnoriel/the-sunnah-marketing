import { useState } from "react";
import { Play } from "lucide-react";

interface YouTubeFacadeProps {
  videoId: string;
  title: string;
  /** Pass true for the above-the-fold hero instance so LCP image gets priority */
  priority?: boolean;
}

export default function YouTubeFacade({ videoId, title, priority = false }: YouTubeFacadeProps) {
  const [activated, setActivated] = useState(false);
  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  if (activated) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
        style={{ border: 0 }}
      />
    );
  }

  return (
    <button
      onClick={() => setActivated(true)}
      className="absolute inset-0 w-full h-full group cursor-pointer"
      aria-label={`Play ${title}`}
    >
      <img
        src={thumbnailUrl}
        alt={title}
        width={1280}
        height={720}
        className="absolute inset-0 w-full h-full object-cover"
        /* Hero LCP image: eager + high priority; below-fold: lazy */
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        // fetchPriority is a valid HTML attribute for LCP boost
        fetchPriority={priority ? "high" : "auto"}
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#1a6bff]/90 border-2 border-white/40 flex items-center justify-center shadow-[0_0_40px_rgba(26,107,255,0.6)] group-hover:scale-110 transition-transform duration-300">
          <Play className="w-6 h-6 md:w-8 md:h-8 text-white fill-white ml-1" />
        </div>
      </div>
      <div className="absolute bottom-3 left-3 right-3">
        <p className="font-dm text-xs text-white/70 bg-black/50 backdrop-blur-sm px-2 py-1 rounded inline-block">
          ▶ Watch — Scale The Halal Way
        </p>
      </div>
    </button>
  );
}