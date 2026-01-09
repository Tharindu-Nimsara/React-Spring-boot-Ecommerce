// Helper function to get image URL
// In development, uses Vite proxy. In production, uses absolute URL
export const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return null; // Return null to indicate no image, use fallback in component
  }
  
  if (import.meta.env.DEV) {
    // Use proxy in development
    return `/uploads/${imagePath}`;
  }
  
  // Use absolute URL in production
  return `http://localhost:8080/uploads/${imagePath}`;
};

// Create a data URI for a simple placeholder image (1x1 transparent pixel)
// This prevents infinite loops when external placeholder services fail
export const getPlaceholderImage = () => {
  // Return a 1x1 transparent PNG as data URI - this will never fail to load
  return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzljYTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
};

