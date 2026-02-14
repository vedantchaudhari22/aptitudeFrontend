import React from 'react';

const OptionButton = ({ option, isSelected, isSubmitted, isCorrect, isWrong, onClick }) => {
  // BASE STATE: Explicitly set text-slate-700 (light mode) and dark:text-slate-300 (dark mode)
  // Added hover:text-blue-900 to ensure text stays visible on the light blue hover background
  let styles = "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-900 dark:hover:text-white shadow-sm";

  if (isSubmitted) {
    if (isCorrect) {
      // CORRECT: Green theme
      styles = "border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 ring-2 ring-green-100 dark:ring-green-900/50";
    } else if (isWrong) {
      // WRONG: Red theme
      styles = "border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 ring-2 ring-red-100 dark:ring-red-900/50";
    } else {
      // DISABLED: Faded out
      styles = "border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 opacity-60 cursor-not-allowed";
    }
  } else if (isSelected) {
    // SELECTED: Blue theme
    styles = "border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 ring-2 ring-blue-100 dark:ring-blue-900/50";
  }

  return (
    <button
      disabled={isSubmitted}
      onClick={onClick}
      className={`w-full text-left p-3 md:p-4 rounded-xl border-2 transition-all flex items-center justify-between font-semibold text-sm group ${styles}`}
    >
      <span className="transition-colors">{option}</span>
      <div className="flex items-center">
        {/* Indicators for Correct/Wrong */}
        {isSubmitted && isCorrect && (
          <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] shadow-sm">✓</span>
        )}
        {isSubmitted && isWrong && (
          <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] shadow-sm">✕</span>
        )}
        
        {/* Radio-style indicator for active selection */}
        {!isSubmitted && (
          <div className={`w-5 h-5 rounded-full border-2 flex transition-colors ${
            isSelected 
              ? 'border-blue-600 dark:border-blue-400 bg-blue-600 dark:bg-blue-400' 
              : 'border-slate-200 dark:border-slate-700 group-hover:border-blue-400 dark:group-hover:border-blue-300'
          }`}>
            {isSelected && <div className="w-1.5 h-1.5 bg-white dark:bg-slate-900 rounded-full m-auto"></div>}
          </div>
        )}
      </div>
    </button>
  );
};

export default OptionButton;