import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header Skeleton */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-10 w-64 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex overflow-hidden">
        {/* Table Skeleton */}
        <div className="w-1/2 border-r border-gray-200 bg-white">
          <div className="bg-gray-50 border-b border-gray-200 p-4">
            <div className="flex items-center space-x-4">
              <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          
          <div className="p-4 space-y-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Map Skeleton */}
        <div className="w-1/2 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400 text-lg">Loading Map...</div>
        </div>
      </div>
    </div>
  );
};
