import { motion } from 'framer-motion'
import { useState } from 'react'

const VideoCard = ({ video, onClick }) => {
  const [isHovered, setIsHovered] = useState(false)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Get video category badge
  const getCategoryBadge = () => {
    if (video.category === 'shorts') {
      return { text: 'SHORT', color: 'bg-yellow-500' }
    } else if (video.category === 'longVideos') {
      return { text: 'VIDEO', color: 'bg-red-600' }
    }
    return { text: 'VIDEO', color: 'bg-blue-600' }
  }

  const badge = getCategoryBadge()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05, y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onClick(video)}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer group hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="relative">
        <img
          src={video.snippet.thumbnails.high.url}
          alt={video.snippet.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Duration overlay */}
        {video.formattedDuration && (
          <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
            {video.formattedDuration}
          </div>
        )}

        {/* Category badge */}
        <div className={`absolute top-2 right-2 ${badge.color} text-white px-2 py-1 rounded text-xs font-medium`}>
          {badge.text}
        </div>

        {/* Hover overlay with title */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="font-semibold text-sm line-clamp-2 mb-1">{video.snippet.title}</h3>
          <div className="flex items-center gap-2 text-xs">
            <span>{formatDate(video.snippet.publishedAt)}</span>
            {video.formattedDuration && (
              <>
                <span>•</span>
                <span>{video.formattedDuration}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {video.snippet.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
          {video.snippet.description}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Published: {formatDate(video.snippet.publishedAt)}</span>
          {video.formattedDuration && (
            <span className="font-medium">{video.formattedDuration}</span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default VideoCard
