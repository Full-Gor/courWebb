import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, Download, FileText, Video, Music } from 'lucide-react';

interface MediaPlayerProps {
  file: {
    id: string;
    name: string;
    type: 'mp3' | 'mp4' | 'pdf';
    url: string;
    size: string;
    duration?: string;
  };
  onClose: () => void;
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({ file, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);
  const mediaRef = useRef<HTMLAudioElement | HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (mediaRef.current) {
      if (isPlaying) {
        mediaRef.current.pause();
      } else {
        mediaRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (mediaRef.current) {
      setCurrentTime(mediaRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (mediaRef.current) {
      setDuration(mediaRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (mediaRef.current) {
      mediaRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (mediaRef.current) {
      mediaRef.current.volume = newVolume;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleDownload = () => {
    setIsDownloading(true);
    
    try {
      // Si c'est une URL blob (fichier uploadé), utiliser le téléchargement direct
      if (file.url.startsWith('blob:')) {
        const link = document.createElement('a');
        link.href = file.url;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Notification de succès
        setTimeout(() => {
          alert(`✅ Fichier téléchargé avec succès !\n\n📁 Emplacement : Dossier "Téléchargements"\n📄 Nom : ${file.name}`);
        }, 500);
      } else {
        // Pour les URLs externes ou locales, ouvrir dans un nouvel onglet
        window.open(file.url, '_blank');
      }
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
      alert('❌ Erreur lors du téléchargement. Veuillez réessayer.');
    } finally {
      // Réinitialiser l'état après un court délai
      setTimeout(() => setIsDownloading(false), 1000);
    }
  };

  const getFileIcon = () => {
    switch (file.type) {
      case 'mp3':
        return <Music className="text-blue-500" size={24} />;
      case 'mp4':
        return <Video className="text-red-500" size={24} />;
      case 'pdf':
        return <FileText className="text-orange-500" size={24} />;
      default:
        return <FileText className="text-gray-500" size={24} />;
    }
  };

  const renderMediaContent = () => {
    switch (file.type) {
      case 'mp3':
        return (
          <audio
            ref={mediaRef as React.RefObject<HTMLAudioElement>}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            className="w-full"
          >
            <source src={file.url} type="audio/mpeg" />
            Votre navigateur ne supporte pas l'élément audio.
          </audio>
        );
      case 'mp4':
        return (
          <video
            ref={mediaRef as React.RefObject<HTMLVideoElement>}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            className="w-full rounded-lg"
            controls
          >
            <source src={file.url} type="video/mp4" />
            Votre navigateur ne supporte pas l'élément vidéo.
          </video>
        );
      case 'pdf':
        return (
          <iframe
            src={file.url}
            className="w-full h-96 rounded-lg"
            title={file.name}
          />
        );
      default:
        return <div className="text-center text-gray-500">Type de fichier non supporté</div>;
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center gap-3">
            {getFileIcon()}
            <div>
              <h2 className="text-xl font-bold text-gray-800">{file.name}</h2>
              <p className="text-sm text-gray-600">{file.size}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                isDownloading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <Download size={16} />
              {isDownloading ? 'Téléchargement...' : 'Télécharger'}
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6">
          {file.type === 'pdf' ? (
            renderMediaContent()
          ) : (
            <div className="space-y-4">
              <div className="relative">
                {renderMediaContent()}
              </div>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePlayPause}
                  className="flex items-center justify-center w-12 h-12 bg-islamic-primary text-white rounded-full hover:bg-islamic-dark transition-colors"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                
                <div className="flex-1">
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Volume2 size={16} className="text-gray-600" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaPlayer; 