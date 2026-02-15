import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {[1, 2, 3, 4].map((n) => (
        <div
          key={n}
          className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center justify-between transition-colors duration-300"
        >
          <div className="flex items-start gap-5 w-full">
            {/* Index Number Skeleton */}
            <div className="w-12 h-12 rounded-2xl bg-slate-200"></div>

            <div className="flex-1 space-y-3">
              {/* Question Text Skeleton */}
              <div className="h-4 bg-slate-200 rounded w-3/4"></div>

              {/* Badges Skeleton */}
              <div className="flex gap-3">
                <div className="h-3 bg-slate-100 rounded w-16"></div>
                <div className="h-3 bg-slate-100 rounded w-16"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;