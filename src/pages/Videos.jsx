import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import FilterBar from '../components/FilterBar'
import VideoGrid from '../components/VideoGrid'
import VideoModal from '../components/VideoModal'
import { fetchVideos, getFilteredVideos, autoRefreshCacheIfNeeded } from '../lib/youtube'

const Videos = () => {
  const [videos, setVideos] = useState([])
  const [filteredVideos, setFilteredVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState(null)
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')
  const [nextPageToken, setNextPageToken] = useState('')
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    const loadInitialVideos = async () => {
      try {
        setLoading(true)
        setError(null)
        autoRefreshCacheIfNeeded()
        const result = await fetchVideos('', 12)
        setVideos(result.videos)
        setFilteredVideos(result.videos)
        setNextPageToken(result.nextPageToken)
        setHasMore(result.hasMore)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadInitialVideos()
  }, [])

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredVideos(videos)
    } else {
      const filtered = getFilteredVideos(activeFilter)
      setFilteredVideos(filtered.length > 0 ? filtered : videos.filter(video => video.category === activeFilter))
    }
  }, [activeFilter, videos])

  const handleFilterChange = (filter) => setActiveFilter(filter)
  const handleVideoClick = (video) => { setSelectedVideo(video); setIsModalOpen(true) }
  const closeModal = () => { setIsModalOpen(false); setSelectedVideo(null) }

  const handleLoadMore = async () => {
    if (!nextPageToken || loadingMore) return
    try {
      setLoadingMore(true)
      const result = await fetchVideos(nextPageToken, 12)
      setVideos(prev => [...prev, ...result.videos])
      setNextPageToken(result.nextPageToken)
      setHasMore(result.hasMore)
    } catch (err) {
      setError('Failed to load more videos. Please try again.')
    } finally {
      setLoadingMore(false)
    }
  }

  const handleRetry = () => window.location.reload()

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-lg text-gray-600 dark:text-gray-400">Loading videos...</p>
      </div>
    </div>
  )

  if (error) return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div className="text-center px-4">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Error Loading Videos</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">{error}</p>
        <button
          onClick={handleRetry}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Try Again
        </button>
      </div>
    </div>
  )

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-gradient-xy opacity-30"></div>
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-white rounded-full opacity-30 animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">My YouTube Videos</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Explore my collection of videos. Use the filters below to find what you're looking for.
          </p>
        </motion.div>

        {/* Filter Bar */}
        <FilterBar activeFilter={activeFilter} onFilterChange={handleFilterChange} />

        {/* Video Grid */}
        <VideoGrid
          videos={filteredVideos}
          onVideoClick={handleVideoClick}
          loading={loading}
          loadingMore={loadingMore}
          onLoadMore={handleLoadMore}
          hasMore={hasMore && activeFilter === 'all'}
        />

        {/* Video Modal */}
        <VideoModal video={selectedVideo} isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </section>
  )
}

export default Videos
