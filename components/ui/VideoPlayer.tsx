import React, { use, useState } from "react";
import ReactPlayer from "react-player";
import { X } from "lucide-react";
import { Button } from "./button";
import { formatSecondsToMMSS } from "@/utils";
import { Video as VideoType } from "@/components/types/types";

interface VideoPlayerProps {
  open: boolean;
  onClose: () => void;
  freeVideos: VideoType[];
  onSelectVideo: (video: VideoType) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  open,
  onClose,
  freeVideos,
  onSelectVideo,
}) => {
  const [currentVideo, setCurrentVideo] = useState(freeVideos[0]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[950] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl mx-4 rounded-xl overflow-hidden shadow-2xl bg-[#18132b] border border-gray-700 max-h-[90vh] overflow-y-auto hide-scrollbar"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <p className="text-xs text-white font-semibold">Course preview</p>
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
          <h2 className="text-lg font-bold text-white leading-tight mt-1">
            {currentVideo.title}
          </h2>
        </div>
        {/* Video */}
        <div className="bg-black flex items-center justify-center aspect-video">
          <ReactPlayer
            url={currentVideo.downloadUrl}
            controls
            width="100%"
            height="360px"
            style={{ maxHeight: 400 }}
          />
        </div>
        {/* Free video samples list */}
        <div className="bg-[#18132b] px-6 py-4">
          <p className="text-white font-bold mb-2 text-base">Free videos :</p>
          <div className="flex flex-col gap-2">
            {freeVideos.map((video, index) => (
              <button
                key={index}
                className={`flex items-center justify-between w-full rounded-lg px-2 py-2 transition-all duration-150 text-left cursor-pointer
                  ${
                    video.id === currentVideo.id
                      ? "bg-[var(--addi-color-500)]/30 border-l-4 border-[var(--addi-color-500)]"
                      : "hover:bg-white/10"
                  }
                `}
                onClick={() => {
                  setCurrentVideo(video);
                  onSelectVideo(video);
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`text-sm truncate ${
                      video.id === currentVideo.id
                        ? "font-bold text-white"
                        : "text-gray-200"
                    }`}
                  >
                    {video.title}
                  </span>
                </div>
                {index != 0 && (
                  <span className="text-xs text-gray-300 font-semibold min-w-[40px] text-right">
                    {formatSecondsToMMSS(video.duration)}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
