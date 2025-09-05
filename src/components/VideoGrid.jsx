import { motion } from 'framer-motion'
import VideoCard from './VideoCard'

// VideoGrid component for displaying videos in a responsive grid
const VideoGrid = ({ videos, onVideoClick, loading, loadingMore, onLoadMore, hasMore }) => {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  if (loading && videos.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400">Loading videos...</p>
        </div>
      </div>
    )
  }

  if (videos.length === 0 && !loading) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎥</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No videos found</h3>
        <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters or check back later.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {videos.map((video, index) => (
          <motion.div
            key={`${video.id.videoId}-${index}`}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <VideoCard video={video} onClick={onVideoClick} />
          </motion.div>
        ))}
      </motion.div>

      {/* Load More Button */}
      {hasMore && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center"
        >
          <button
            onClick={onLoadMore}
            disabled={loadingMore}
            className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
              loadingMore
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
            }`}
          >
            {loadingMore ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Loading...
              </div>
            ) : (
              'Load More Videos'
            )}
          </button>
        </motion.div>
      )}

      {/* Loading indicator for load more */}
      {loadingMore && videos.length > 0 && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  )
}

export default VideoGrid
