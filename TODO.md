# TODO for YouTube Channel Website Update

## Step 1: Update src/lib/youtube.js
- Implement pagination with "Load More" functionality
- Add localStorage caching with 6-hour expiration
- Add video filtering by duration (Shorts <60s, Longs >=60s)
- Handle Posts/Community posts gracefully
- Return structured data for filters

## Step 2: Create src/components/FilterBar.jsx
- Add filter buttons: All, Shorts, Longs, Posts
- Handle filter state changes
- Use Tailwind CSS for responsive design
- Add smooth animations with framer-motion

## Step 3: Create src/components/VideoGrid.jsx
- Display videos in responsive grid layout
- Handle pagination with "Load More" button
- Show loading states and error handling
- Use framer-motion for animations

## Step 4: Update src/pages/Videos.jsx
- Integrate FilterBar and VideoGrid components
- Implement video fetching with pagination
- Add caching logic
- Handle filter state and video display
- Maintain modal functionality

## Step 5: Update src/components/VideoCard.jsx
- Add video duration display
- Improve hover effects and animations
- Ensure responsive design

## Step 6: Testing and Final Checks
- Test video loading and pagination
- Test filtering functionality
- Test caching mechanism
- Test dark/light mode toggle
- Test responsiveness on different screen sizes
- Test error handling
