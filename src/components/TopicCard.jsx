import React from 'react';

const TopicCard = ({ title, description, icon, colorClass, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white/80 backdrop-blur-sm p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-200/60 hover:border-slate-200 transition-all duration-300 cursor-pointer group h-full flex flex-col items-start relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[5rem] -mr-8 -mt-8 z-0 transition-transform group-hover:scale-110 duration-500" />

      {/* Icon container */}
      <div className={`relative z-10 w-16 h-16 rounded-2xl ${colorClass} flex items-center justify-center text-3xl mb-6 shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
        {icon}
      </div>

      {/* Title */}
      <h3 className="relative z-10 text-2xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 tracking-tight">
        {title}
      </h3>

      {/* Description */}
      <p className="relative z-10 text-slate-500 text-sm font-medium leading-relaxed mb-8 flex-grow">
        {description}
      </p>

      {/* CTA link */}
      <div className="relative z-10 mt-auto flex items-center gap-2 text-slate-900 font-black text-xs uppercase tracking-widest group-hover:gap-3 transition-all">
        Start Now <span className="text-xl">→</span>
      </div>
    </div>
  );
};

export default TopicCard;