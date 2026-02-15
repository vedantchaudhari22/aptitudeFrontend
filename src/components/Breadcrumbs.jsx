import React from 'react';

const Breadcrumbs = ({ activeTopic }) => {
  return (
    <div className="flex items-center gap-3 mb-8 transition-colors duration-300">
      {/* Container adapts to dark:bg-slate-900 and dark:border-slate-800 */}
      <div className="px-4 py-2 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">

        <span className="text-slate-400 text-sm font-medium">Dashboard</span>
        <span className="text-slate-300 text-xs">/</span>

        <span className="text-slate-400 text-sm font-medium">Aptitude</span>
        <span className="text-slate-300 text-xs">/</span>

        {/* Active topic glows slightly more in dark mode with text-blue-400 */}
        <span className="text-slate-900 text-sm font-bold uppercase tracking-wide">
          {activeTopic || "All Questions"}
        </span>
      </div>
    </div>
  );
};

export default Breadcrumbs;