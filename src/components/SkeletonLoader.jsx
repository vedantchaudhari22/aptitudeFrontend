import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {[1, 2, 3, 4].map((n) => (
        <div 
          key={n} 
          className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-center justify-between transition-colors duration-300"
        >
          <div className="flex items-start gap-5 w-full">
            {/* Index Number Skeleton */}
            <div className="w-12 h-12 rounded-2xl bg-slate-200 dark:bg-slate-800"></div>
            
            <div className="flex-1 space-y-3">
              {/* Question Text Skeleton */}
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
              
              {/* Badges Skeleton */}
              <div className="flex gap-3">
                <div className="h-3 bg-slate-100 dark:bg-slate-800/50 rounded w-16"></div>
                <div className="h-3 bg-slate-100 dark:bg-slate-800/50 rounded w-16"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;