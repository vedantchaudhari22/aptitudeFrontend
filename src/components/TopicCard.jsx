import React from 'react';

const TopicCard = ({ title, description, icon, colorClass, onClick }) => {
  return (
    <div
      onClick={onClick}
      // Added dark:bg-slate-900 and dark:border-slate-800 for the dark theme
      className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition-all cursor-pointer group transition-colors duration-300"
    >
      {/* Icon container with conditional dark mode shadow adjustment */}
      <div className={`w-16 h-16 rounded-2xl ${colorClass} flex items-center justify-center text-3xl mb-6 shadow-lg shadow-blue-200/50`}>
        {icon}
      </div>

      {/* Title shifts to white in dark mode and blue on hover */}
      <h3 className="text-xl font-black text-slate-800 mb-2 group-hover:text-slate-900 transition-colors">
        {title}
      </h3>

      {/* Description text becomes muted slate in dark mode */}
      <p className="text-slate-500 text-sm leading-relaxed mb-6">
        {description}
      </p>

      {/* CTA link shifts to blue-400 for better visibility in dark mode */}
      <div className="flex items-center gap-2 text-slate-900 font-bold text-sm uppercase tracking-wider group-hover:underline decoration-2 underline-offset-4">
        Start Practice <span>→</span>
      </div>
    </div>
  );
};

export default TopicCard;