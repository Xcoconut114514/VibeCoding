'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Play, Clock, Calendar } from 'lucide-react'
import type { Episode } from '@/types/podcast'

interface EpisodeCardProps {
  episode: Episode
  podcastImage?: string
}

export default function EpisodeCard({ episode, podcastImage }: EpisodeCardProps) {
  // 格式化时长
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`
    }
    return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`
  }

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return '今天'
    if (diffDays === 1) return '昨天'
    if (diffDays < 7) return `${diffDays}天前`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}周前`
    
    return date.toLocaleDateString('zh-CN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  // 获取简短描述（不含时间戳）
  const getShortDescription = (desc: string) => {
    // 移除时间戳格式的内容 (例如: 00:00 开场白)
    const cleanDesc = desc.replace(/\d{1,2}:\d{2}\s+[^\n]+\n?/g, '')
    return cleanDesc.slice(0, 120) + (cleanDesc.length > 120 ? '...' : '')
  }

  const imageUrl = (episode.image as any)?.largePicUrl || (episode.image as any)?.picUrl || podcastImage || '/placeholder.jpg'

  return (
    <Link href={`/episode/${episode.eid}`}>
      <div className="card card-hover p-4 group cursor-pointer animate-fade-in">
        <div className="flex gap-4">
          {/* 封面图片 */}
          <div className="image-container flex-shrink-0 w-32 h-32 relative">
            <Image
              src={imageUrl}
              alt={episode.title}
              fill
              className="object-cover"
              sizes="128px"
            />
            {/* 播放按钮悬浮效果 */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
                  <Play className="w-6 h-6 text-white ml-1" fill="white" />
                </div>
              </div>
            </div>
          </div>

          {/* 内容信息 */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-dark group-hover:text-primary transition-colors duration-300 text-truncate-2 mb-2">
              {episode.title}
            </h3>
            
            <p className="text-sm text-gray-600 text-truncate-3 mb-3">
              {getShortDescription(episode.description)}
            </p>

            {/* 元信息 */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formatDate(episode.pubDate)}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatDuration(episode.enclosure.duration)}</span>
              </div>

              {(episode as any).playCount && (
                <div className="flex items-center gap-1">
                  <Play className="w-3.5 h-3.5" />
                  <span>{(episode as any).playCount.toLocaleString()} 次播放</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
