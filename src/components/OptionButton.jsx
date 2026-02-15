import React from 'react';

const OptionButton = ({ option, isSelected, isSubmitted, isCorrect, isWrong, onClick }) => {
  // BASE STATE: Monochrome
  let styles = "border-slate-200 bg-white text-slate-700 hover:border-slate-900 hover:bg-slate-50 hover:text-slate-900 shadow-sm";

  if (isSubmitted) {
    if (isCorrect) {
      // CORRECT: Dark Slate / White
      styles = "border-slate-800 bg-slate-800 text-white ring-2 ring-slate-100";
    } else if (isWrong) {
      // WRONG: White / Slate Text / Thick Slate Border
      styles = "border-slate-900 bg-white text-slate-900 ring-2 ring-slate-200";
    } else {
      // DISABLED: Faded out
      styles = "border-slate-100 bg-slate-50 text-slate-900 opacity-60 cursor-not-allowed";
    }
  } else if (isSelected) {
    // SELECTED: Black / White
    styles = "border-slate-900 bg-slate-900 text-white ring-2 ring-slate-200";
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
          <span className="bg-white text-slate-900 rounded-full w-5 h-5 flex items-center justify-center text-[10px] shadow-sm font-bold">✓</span>
        )}
        {isSubmitted && isWrong && (
          <span className="bg-slate-900 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] shadow-sm font-bold">✕</span>
        )}

        {/* Radio-style indicator for active selection */}
        {!isSubmitted && (
          <div className={`w-5 h-5 rounded-full border-2 flex transition-colors ${isSelected
            ? 'border-white bg-white' // White border/bg since parent is black
            : 'border-slate-200 group-hover:border-slate-400'
            }`}>
            {isSelected && <div className="w-1.5 h-1.5 bg-slate-900 rounded-full m-auto"></div>}
          </div>
        )}
      </div>
    </button>
  );
};

export default OptionButton;