import { useRef, useCallback } from 'react';

interface AudioOptions {
  volume?: number;
  loop?: boolean;
}

export const useAudio = () => {
  const audioRefs = useRef<{[key: string]: HTMLAudioElement}>({});

  const playAudio = useCallback((audioPath: string, options: AudioOptions = {}) => {
    try {
      // 如果已經有這個音效的引用，直接播放
      if (audioRefs.current[audioPath]) {
        audioRefs.current[audioPath].currentTime = 0; // 重設到開始
        audioRefs.current[audioPath].volume = options.volume || 0.5;
        audioRefs.current[audioPath].loop = options.loop || false;
        audioRefs.current[audioPath].play();
        return;
      }

      // 創建新的音效實例
      const audio = new Audio(audioPath);
      audio.volume = options.volume || 0.5;
      audio.loop = options.loop || false;
      
      // 儲存引用
      audioRefs.current[audioPath] = audio;
      
      // 播放音效
      audio.play();
    } catch (error) {
      console.error('播放音效失敗:', error);
    }
  }, []);

  const stopAudio = useCallback((audioPath: string) => {
    if (audioRefs.current[audioPath]) {
      audioRefs.current[audioPath].pause();
      audioRefs.current[audioPath].currentTime = 0;
    }
  }, []);

  const stopAllAudio = useCallback(() => {
    Object.values(audioRefs.current).forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
  }, []);

  return {
    playAudio,
    stopAudio,
    stopAllAudio
  };
};
