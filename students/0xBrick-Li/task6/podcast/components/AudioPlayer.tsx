'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react'
import type { Episode } from '@/types/podcast'

interface AudioPlayerProps {
  episode: Episode
  onClose?: () => void
}

export default function AudioPlayer({ episode, onClose }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)

  // 加载音频元数据
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  // 播放/暂停
  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  // 调整播放速度
  const changePlaybackRate = () => {
    const rates = [0.5, 0.75, 1, 1.25, 1.5, 2]
    const currentIndex = rates.indexOf(playbackRate)
    const nextRate = rates[(currentIndex + 1) % rates.length]
    
    setPlaybackRate(nextRate)
    if (audioRef.current) {
      audioRef.current.playbackRate = nextRate
    }
  }

  // 调整音量
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
    if (newVolume === 0) {
      setIsMuted(true)
    } else {
      setIsMuted(false)
    }
  }

  // 静音切换
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  // 快进/快退
  const skip = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime += seconds
    }
  }

  // 拖动进度条
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !audioRef.current) return

    const rect = progressBarRef.current.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percentage = clickX / rect.width
    const newTime = percentage * duration

    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  // 格式化时间
  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '00:00'
    
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0
  const audioUrl = episode.enclosure.url || episode.audio

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t border-gray-200 z-50 animate-slide-up">
      {/* 音频元素 */}
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      {/* 进度条 */}
      <div
        ref={progressBarRef}
        className="h-1 bg-gray-200 cursor-pointer relative group"
        onClick={handleProgressClick}
      >
        <div
          className="h-full bg-primary transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ left: `${progress}%`, transform: 'translate(-50%, -50%)' }}
        />
      </div>

      {/* 播放器控制面板 */}
      <div className="container-custom py-4">
        <div className="flex items-center gap-6">
          {/* 左侧：歌曲信息 */}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-dark text-truncate-1">{episode.title}</h4>
            <p className="text-sm text-gray-600">思目咖啡厅</p>
          </div>

          {/* 中间：播放控制 */}
          <div className="flex items-center gap-4">
            {/* 后退15秒 */}
            <button
              onClick={() => skip(-15)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="后退15秒"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            {/* 播放/暂停 */}
            <button
              onClick={togglePlay}
              className="w-12 h-12 bg-primary hover:bg-accent rounded-full flex items-center justify-center shadow-lg transition-all active:scale-95"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white" fill="white" />
              ) : (
                <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
              )}
            </button>

            {/* 前进30秒 */}
            <button
              onClick={() => skip(30)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              title="前进30秒"
            >
              <SkipForward className="w-5 h-5" />
            </button>

            {/* 时间显示 */}
            <div className="text-sm text-gray-600 whitespace-nowrap">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>

            {/* 播放速度 */}
            <button
              onClick={changePlaybackRate}
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors"
            >
              {playbackRate}x
            </button>
          </div>

          {/* 右侧：音量控制 */}
          <div className="flex items-center gap-3">
            <button onClick={toggleMute} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              {isMuted || volume === 0 ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
            
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-24 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
