import { motion } from 'framer-motion'

// FilterBar component for video filtering
const FilterBar = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: 'all', label: 'All Videos', icon: '🎥' },
    { id: 'shorts', label: 'Shorts', icon: '⚡' },
    { id: 'longVideos', label: 'Long Videos', icon: '🎬' },
    { id: 'posts', label: 'Posts', icon: '📝' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8"
    >
      {filters.map((filter) => (
        <motion.button
          key={filter.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onFilterChange(filter.id)}
          className={`px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
            activeFilter === filter.id
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          <span className="text-lg">{filter.icon}</span>
          <span className="hidden sm:inline">{filter.label}</span>
          <span className="sm:hidden">{filter.label.split(' ')[0]}</span>
        </motion.button>
      ))}
    </motion.div>
  )
}

export default FilterBar
