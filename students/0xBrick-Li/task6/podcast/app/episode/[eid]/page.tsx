'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Calendar, Clock, Play, Heart, Share2, MessageCircle } from 'lucide-react'
import AudioPlayer from '@/components/AudioPlayer'
import podcastData from '../../../podcast.json'
import type { Timestamp } from '@/types/podcast'

export default function EpisodePage({ params }: { params: { eid: string } }) {
  const [showPlayer, setShowPlayer] = useState(false)

  // 获取节目数据
  const podcast = podcastData.props.pageProps.podcast
  const episode = useMemo(() => {
    return podcast.episodes.find((ep: any) => ep.eid === params.eid)
  }, [params.eid])

  // 解析时间戳
  const timestamps = useMemo(() => {
    if (!episode) return []
    
    const lines = episode.description.split('\n')
    const result: Timestamp[] = []
    
    lines.forEach(line => {
      // 匹配 "00:00 描述文本" 格式
      const match = line.match(/^(\d{1,2}:\d{2})\s+(.+)$/)
      if (match) {
        const [, time, text] = match
        const [minutes, seconds] = time.split(':').map(Number)
        result.push({
          time,
          seconds: minutes * 60 + seconds,
          text: text.trim()
        })
      }
    })
    
    return result
  }, [episode])

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      weekday: 'long'
    })
  }

  // 格式化时长
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    if (hours > 0) {
      return `${hours} 小时 ${minutes} 分钟`
    }
    return `${minutes} 分钟 ${secs} 秒`
  }

  if (!episode) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">节目未找到</h2>
          <Link href="/" className="btn-primary">
            返回首页
          </Link>
        </div>
      </div>
    )
  }

  const imageUrl = (episode.image as any)?.largePicUrl || (episode.image as any)?.picUrl || (podcast.image as any).largePicUrl

  return (
    <main className="min-h-screen pb-32">
      {/* 顶部导航 */}
      <nav className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-40">
        <div className="container-custom py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-700 hover:text-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">返回列表</span>
          </Link>
        </div>
      </nav>

      {/* 节目头部 */}
      <div className="bg-gradient-to-b from-secondary to-white">
        <div className="container-custom py-12">
          <div className="flex flex-col md:flex-row gap-8">
            {/* 封面 */}
            <div className="relative w-full md:w-80 h-80 rounded-3xl overflow-hidden shadow-2xl flex-shrink-0">
              <Image
                src={imageUrl}
                alt={episode.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* 信息 */}
            <div className="flex-1">
              <div className="mb-4">
                <Link href="/" className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors">
                  {podcast.title}
                </Link>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-dark mb-4">
                {episode.title}
              </h1>

              {/* 元信息 */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(episode.pubDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{formatDuration(episode.enclosure.duration)}</span>
                </div>
                {(episode as any).playCount && (
                  <div className="flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    <span>{(episode as any).playCount.toLocaleString()} 次播放</span>
                  </div>
                )}
              </div>

              {/* 操作按钮 */}
              <div className="flex flex-wrap gap-3 mb-6">
                <button 
                  onClick={() => setShowPlayer(true)}
                  className="btn-primary flex items-center gap-2"
                >
                  <Play className="w-5 h-5" fill="white" />
                  立即播放
                </button>
                <button className="btn-secondary flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  喜欢
                </button>
                <button className="btn-secondary flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  分享
                </button>
              </div>

              {/* 主播信息 */}
              <div className="p-4 bg-white rounded-xl border border-gray-200">
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-dark">主播:</span> {podcast.author}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-medium text-dark">订阅:</span> {podcast.subscriptionCount.toLocaleString()} 人
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="container-custom py-12">
        <div className="max-w-4xl">
          {/* 时间轴 */}
          {timestamps.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-dark mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6 text-primary" />
                节目时间轴
              </h2>
              
              <div className="space-y-3">
                {timestamps.map((timestamp, index) => (
                  <button
                    key={index}
                    onClick={() => setShowPlayer(true)}
                    className="w-full text-left p-4 bg-white hover:bg-gray-50 rounded-xl border border-gray-200 hover:border-primary transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                        <span className="font-mono font-semibold">{timestamp.time}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-dark group-hover:text-primary transition-colors">
                          {timestamp.text}
                        </p>
                      </div>
                      <Play className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* 节目描述 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-dark mb-6 flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-primary" />
              节目简介
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <div className="p-6 bg-white rounded-xl border border-gray-200">
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {episode.description}
                </p>
              </div>
            </div>
          </section>

          {/* 相关推荐 */}
          <section>
            <h2 className="text-2xl font-bold text-dark mb-6">更多节目</h2>
            <div className="grid gap-4">
              {podcast.episodes.slice(0, 3).map((ep: any) => (
                ep.eid !== episode.eid && (
                  <Link
                    key={ep.eid}
                    href={`/episode/${ep.eid}`}
                    className="card p-4 hover:border-primary group"
                  >
                    <div className="flex gap-4">
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={(ep.image as any)?.largePicUrl || imageUrl}
                          alt={ep.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-dark group-hover:text-primary transition-colors text-truncate-2">
                          {ep.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {formatDuration(ep.enclosure.duration)}
                        </p>
                      </div>
                    </div>
                  </Link>
                )
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* 音频播放器 */}
      {showPlayer && (
        <AudioPlayer episode={episode} onClose={() => setShowPlayer(false)} />
      )}
    </main>
  )
}
