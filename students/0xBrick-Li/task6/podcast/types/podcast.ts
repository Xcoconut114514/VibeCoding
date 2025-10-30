// 播客数据类型定义

export interface PodcastImage {
  thumbnail: string;
  small: string;
  middle: string;
  large: string;
}

export interface Episode {
  eid: string;
  title: string;
  description: string;
  enclosure: {
    url: string;
    duration: number;
    type: string;
  };
  image?: PodcastImage;
  pubDate: string;
  playedCount?: number;
  favoriteCount?: number;
  commentCount?: number;
  audio?: string;
}

export interface Podcast {
  pid: string;
  title: string;
  author: string;
  link: string;
  description: string;
  image: PodcastImage;
  color: {
    original: string;
    dark: string;
    light: string;
  };
  episodeCount: number;
  subscriptionCount: number;
  latestEpisodePubDate?: string;
  status?: string;
  episodes: Episode[];
}

export interface PodcastData {
  podcast: Podcast;
}

// 时间戳接口（用于描述解析）
export interface Timestamp {
  time: string; // 格式: "00:00"
  seconds: number; // 秒数
  text: string; // 描述文本
}

// 音频播放器状态
export interface AudioPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playbackRate: number;
  volume: number;
  isMuted: boolean;
}

// 搜索过滤器
export interface SearchFilters {
  query: string;
  sortBy: 'latest' | 'popular' | 'oldest';
  dateRange?: {
    start: Date;
    end: Date;
  };
}
