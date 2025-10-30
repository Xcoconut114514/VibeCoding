'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { Search, Music2, Users, Podcast } from 'lucide-react'
import EpisodeCard from '@/components/EpisodeCard'
import podcastData from '../podcast.json'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest')

  // 解析数据
  const podcast = podcastData.props.pageProps.podcast
  const episodes = podcast.episodes

  // 搜索和排序
  const filteredEpisodes = useMemo(() => {
    let filtered = [...episodes]

    // 搜索过滤
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(ep =>
        ep.title.toLowerCase().includes(query) ||
        ep.description.toLowerCase().includes(query)
      )
    }

    // 排序
    if (sortBy === 'latest') {
      filtered.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
    } else if (sortBy === 'popular') {
      filtered.sort((a, b) => ((b as any).playCount || 0) - ((a as any).playCount || 0))
    }

    return filtered
  }, [episodes, searchQuery, sortBy])

  return (
    <main className="min-h-screen pb-32">
      {/* 头部横幅 */}
      <header className="gradient-bg text-white">
        <div className="container-custom py-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* 播客封面 */}
            <div className="relative w-48 h-48 rounded-3xl overflow-hidden shadow-2xl flex-shrink-0">
              <Image
                src={(podcast.image as any).largePicUrl || (podcast.image as any).picUrl}
                alt={podcast.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* 播客信息 */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                <Podcast className="w-5 h-5" />
                <span className="text-sm font-medium opacity-90">播客</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {podcast.title}
              </h1>
              
              <p className="text-lg opacity-90 mb-6 max-w-2xl">
                {podcast.description}
              </p>

              {/* 统计数据 */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Music2 className="w-4 h-4" />
                  <span>{podcast.episodeCount} 集节目</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{podcast.subscriptionCount.toLocaleString()} 订阅</span>
                </div>
                <div className="px-4 py-1.5 bg-white/20 rounded-full backdrop-blur-sm">
                  主播: {podcast.author}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 搜索和过滤栏 */}
      <div className="sticky top-0 bg-secondary/95 backdrop-blur-sm border-b border-gray-200 z-40">
        <div className="container-custom py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* 搜索框 */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索节目标题或内容..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            {/* 排序按钮 */}
            <div className="flex gap-2">
              <button
                onClick={() => setSortBy('latest')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  sortBy === 'latest'
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                最新发布
              </button>
              <button
                onClick={() => setSortBy('popular')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  sortBy === 'popular'
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                最多播放
              </button>
            </div>
          </div>

          {/* 结果统计 */}
          {searchQuery && (
            <div className="mt-3 text-sm text-gray-600">
              找到 <span className="font-semibold text-primary">{filteredEpisodes.length}</span> 个结果
            </div>
          )}
        </div>
      </div>

      {/* 节目列表 */}
      <div className="container-custom py-8">
        {filteredEpisodes.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">未找到匹配的节目</h3>
            <p className="text-gray-500">试试其他关键词吧</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredEpisodes.map((episode, index) => (
              <div
                key={episode.eid}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <EpisodeCard episode={episode} podcastImage={(podcast.image as any).largePicUrl} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 底部信息 */}
      <footer className="bg-dark text-white py-8 mt-20">
        <div className="container-custom text-center">
          <p className="text-sm opacity-80">
            © 2025 {podcast.title} | 主播: {podcast.author}
          </p>
          <p className="text-xs opacity-60 mt-2">
            Powered by Next.js
          </p>
        </div>
      </footer>
    </main>
  )
}
