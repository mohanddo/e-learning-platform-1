import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import { X } from "lucide-react";
import { Button } from "./button";

interface VideoPlayerProps {
  open: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
  subtitle?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  open,
  onClose,
  videoUrl,
  title,
  subtitle,
}) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[950] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl mx-4 rounded-xl overflow-hidden shadow-2xl bg-[#18132b] border border-gray-700"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
          <div>
            <p className="text-xs text-gray-300 font-semibold">
              Course Preview
            </p>
            <h2 className="text-lg font-bold text-white leading-tight">
              {title}
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-all duration-200 cursor-pointer"
            aria-label="Close video preview"
          >
            <X size={24} />
          </Button>
        </div>
        {/* Video */}
        <div className="bg-black flex items-center justify-center aspect-video">
          <ReactPlayer
            url={videoUrl}
            controls
            width="100%"
            height="360px"
            style={{ maxHeight: 400 }}
          />
        </div>
        {/* Subtitle / Caption */}
        {subtitle && (
          <div className="px-6 py-3 bg-black/60 border-t border-gray-700">
            <p className="text-sm text-white text-center">{subtitle}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
