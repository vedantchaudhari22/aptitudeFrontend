import React from 'react';

const EmptyState = ({ topic, onRefresh }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-center transition-colors duration-300">
      <div className="text-5xl mb-4 opacity-80">🔍</div>

      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
        No Questions Found
      </h3>

      <p className="text-slate-500 dark:text-slate-400 max-w-sm">
        We couldn't find any questions for <span className="font-bold text-blue-600 dark:text-blue-400">"{topic}"</span>.
        Try selecting another topic or check back later!
      </p>

      {/* Optional: Add a button to clear filters or go back */}
      <button
        onClick={onRefresh || (() => window.location.reload())}
        className="mt-6 px-6 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all"
      >
        Refresh Page
      </button>
    </div>
  );
};

export default EmptyState;