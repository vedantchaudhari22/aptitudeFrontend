import React from 'react';

const TopicCard = ({ title, description, icon, colorClass, onClick }) => {
  return (
    <div 
      onClick={onClick}
      // Added dark:bg-slate-900 and dark:border-slate-800 for the dark theme
      className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:-translate-y-2 transition-all cursor-pointer group transition-colors duration-300"
    >
      {/* Icon container with conditional dark mode shadow adjustment */}
      <div className={`w-16 h-16 rounded-2xl ${colorClass} flex items-center justify-center text-3xl mb-6 shadow-lg shadow-blue-200/50 dark:shadow-none`}>
        {icon}
      </div>

      {/* Title shifts to white in dark mode and blue on hover */}
      <h3 className="text-xl font-black text-slate-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {title}
      </h3>

      {/* Description text becomes muted slate in dark mode */}
      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
        {description}
      </p>

      {/* CTA link shifts to blue-400 for better visibility in dark mode */}
      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm uppercase tracking-wider">
        Start Practice <span>→</span>
      </div>
    </div>
  );
};

export default TopicCard;