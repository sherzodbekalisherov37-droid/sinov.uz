import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, Headphones } from 'lucide-react';

interface AudioListeningPlayerProps {
  audioUrl?: string;
  sectionTitle?: string;
}

export const AudioListeningPlayer: React.FC<AudioListeningPlayerProps> = ({
  audioUrl,
  sectionTitle = "IELTS Academic Listening Track",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(154); // default ~2:34 audio track length
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, duration]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-4.5 shadow-md mb-6 border border-slate-800">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-blue-600/30 text-blue-400 border border-blue-500/30">
            <Headphones className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-100">{sectionTitle}</h4>
            <p className="text-[11px] text-slate-400">
              {isPlaying ? "Audio ijro etilmoqda..." : "Savollarga javob berish uchun audioni tinglang"}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1 font-mono text-xs font-bold text-slate-300">
          <span>{formatTime(currentTime)}</span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-500">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Progress scrub bar */}
      <div className="w-full bg-slate-800 rounded-full h-2 mb-3 overflow-hidden cursor-pointer">
        <div 
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={togglePlay}
            className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs inline-flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isPlaying ? "Pauza" : "Tinglash"}</span>
          </button>

          <button
            type="button"
            onClick={handleRestart}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
            title="Boshidan tinglash"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center space-x-2 text-slate-400 text-xs">
          <Volume2 className="w-3.5 h-3.5" />
          <span className="text-[11px]">Audio Simulyatsiyasi</span>
        </div>
      </div>
    </div>
  );
};
