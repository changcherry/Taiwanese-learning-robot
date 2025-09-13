import React, { useState, useEffect } from 'react';
import { AudioManager } from '../config/audioConfig';

interface AudioControlsProps {
  className?: string;
}

const AudioControls: React.FC<AudioControlsProps> = ({ className = '' }) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const audioManager = AudioManager.getInstance();

  useEffect(() => {
    // 初始化音效狀態
    setIsEnabled(audioManager.isAudioEnabled());
    setVolume(audioManager.getVolume());
  }, []);

  const toggleAudio = () => {
    const newEnabled = !isEnabled;
    setIsEnabled(newEnabled);
    audioManager.setEnabled(newEnabled);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioManager.setVolume(newVolume);
  };

  return (
    <div className={`audio-controls ${className}`}>
      <button 
        className={`audio-toggle-btn ${isEnabled ? 'enabled' : 'disabled'}`}
        onClick={toggleAudio}
        title={isEnabled ? '關閉音效' : '開啟音效'}
      >
        {isEnabled ? '🔊' : '🔇'}
      </button>
    </div>
  );
};

export default AudioControls;
