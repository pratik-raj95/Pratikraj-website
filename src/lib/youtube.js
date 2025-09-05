import axios from 'axios';
import { API_KEY, CHANNEL_ID } from '../config';

const BASE_URL = 'https://www.googleapis.com/youtube/v3';
const CACHE_KEY = 'youtube_videos_cache';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Helper function to parse ISO 8601 duration to seconds
function parseDuration(duration) {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = match[1] ? parseInt(match[1]) : 0;
  const minutes = match[2] ? parseInt(match[2]) : 0;
  const seconds = match[3] ? parseInt(match[3]) : 0;
  return hours * 3600 + minutes * 60 + seconds;
}

// Format duration from seconds to readable format
function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Get cached videos from localStorage
function getCachedVideos() {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_EXPIRY) {
        return data;
      }
    }
  } catch (error) {
    console.warn('Error reading from cache:', error);
  }
  return null;
}

// Save videos to localStorage cache
function setCachedVideos(data) {
  try {
    const cacheData = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.warn('Error saving to cache:', error);
  }
}

// Fetch videos with improved caching and error handling
export async function fetchVideos(pageToken = '', maxResults = 12, forceRefresh = false) {
  try {
    // Check cache first (unless force refresh is requested)
    if (!forceRefresh) {
      const cached = getCachedVideos();
      if (cached) {
        console.log('Loading videos from cache');
        return {
          videos: pageToken ? cached.videos.slice(maxResults) : cached.videos.slice(0, maxResults),
          nextPageToken: cached.nextPageToken,
          totalResults: cached.totalResults,
          hasMore: cached.videos.length > maxResults,
          fromCache: true
        };
      }
    }

    console.log('Fetching fresh videos from YouTube API');

    // Fetch from API if cache is empty or expired
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        key: API_KEY,
        channelId: CHANNEL_ID,
        part: 'snippet,id',
        order: 'date',
        maxResults: maxResults,
        pageToken: pageToken || undefined,
        type: 'video',
      },
    });

    const videoIds = response.data.items.map((video) => video.id.videoId).join(',');

    // Fetch video details for duration
    const detailsResponse = await axios.get(`${BASE_URL}/videos`, {
      params: {
        key: API_KEY,
        id: videoIds,
        part: 'contentDetails,snippet',
      },
    });

    // Combine search results with details
    const videosWithDetails = response.data.items.map((video) => {
      const details = detailsResponse.data.items.find((detail) => detail.id === video.id.videoId);
      if (details) {
        const durationSeconds = parseDuration(details.contentDetails.duration);
        return {
          ...video,
          contentDetails: details.contentDetails,
          duration: durationSeconds,
          formattedDuration: formatDuration(durationSeconds),
          category: durationSeconds < 60 ? 'shorts' : 'longVideos'
        };
      }
      return video;
    });

    // Cache the results (only for first page to avoid cache pollution)
    if (!pageToken) {
      setCachedVideos({
        videos: videosWithDetails,
        nextPageToken: response.data.nextPageToken,
        totalResults: response.data.pageInfo.totalResults
      });
    }

    return {
      videos: videosWithDetails,
      nextPageToken: response.data.nextPageToken,
      totalResults: response.data.pageInfo.totalResults,
      hasMore: !!response.data.nextPageToken,
      fromCache: false
    };
  } catch (error) {
    console.error('Error fetching videos:', error);

    // If API fails and we have cache, return cached data as fallback
    if (!forceRefresh) {
      const cached = getCachedVideos();
      if (cached) {
        console.log('API failed, falling back to cached data');
        return {
          videos: pageToken ? cached.videos.slice(maxResults) : cached.videos.slice(0, maxResults),
          nextPageToken: cached.nextPageToken,
          totalResults: cached.totalResults,
          hasMore: cached.videos.length > maxResults,
          fromCache: true,
          error: true
        };
      }
    }

    throw new Error('Failed to fetch videos. Please check your API key and try again.');
  }
}

// Get filtered videos from cache
export function getFilteredVideos(filter = 'all') {
  const cached = getCachedVideos();
  if (!cached) return [];

  switch (filter) {
    case 'shorts':
      return cached.videos.filter(video => video.category === 'shorts');
    case 'longVideos':
      return cached.videos.filter(video => video.category === 'longVideos');
    case 'posts':
      // YouTube API doesn't provide community posts in search results
      // This would require additional API calls to community posts endpoint
      return [];
    default:
      return cached.videos;
  }
}

// Get cache information
export function getCacheInfo() {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { timestamp } = JSON.parse(cached);
      const age = Date.now() - timestamp;
      const isExpired = age >= CACHE_EXPIRY;
      const timeUntilExpiry = CACHE_EXPIRY - age;

      return {
        exists: true,
        isExpired,
        age: age,
        timeUntilExpiry: timeUntilExpiry > 0 ? timeUntilExpiry : 0,
        lastUpdated: new Date(timestamp).toLocaleString()
      };
    }
  } catch (error) {
    console.warn('Error reading cache info:', error);
  }

  return {
    exists: false,
    isExpired: true,
    age: 0,
    timeUntilExpiry: 0,
    lastUpdated: null
  };
}

// Force refresh cache
export async function refreshCache() {
  console.log('Forcing cache refresh...');
  try {
    const result = await fetchVideos('', 50, true); // Fetch more videos for better cache
    return result;
  } catch (error) {
    console.error('Failed to refresh cache:', error);
    throw error;
  }
}

// Auto-refresh cache if expired (can be called on app load)
export async function autoRefreshCacheIfNeeded() {
  const cacheInfo = getCacheInfo();

  if (!cacheInfo.exists || cacheInfo.isExpired) {
    console.log('Cache expired or missing, auto-refreshing...');
    try {
      await refreshCache();
      console.log('Cache refreshed successfully');
    } catch (error) {
      console.warn('Auto-refresh failed:', error);
    }
  } else {
    console.log(`Cache is still valid (${Math.round(cacheInfo.timeUntilExpiry / (1000 * 60 * 60))} hours remaining)`);
  }
}
