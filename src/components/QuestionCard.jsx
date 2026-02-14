import React from 'react';
import { Link } from 'react-router-dom';

const QuestionCard = ({ question, index }) => {
  // Difficulty colors optimized for both light and dark themes
  const difficultyColors = {
    Easy: "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800",
    Medium: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800",
    Hard: "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800"
  };

  return (
    <Link 
      to={`/question/${question._id}`}
      className="group bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/5 transition-all flex items-center justify-between"
    >
      <div className="flex items-start gap-5">
        {/* Index number container with hover transition */}
        <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 font-bold text-lg group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
          {index + 1}
        </div>
        
        <div>
          <h4 className="text-slate-800 dark:text-slate-100 font-bold text-lg leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {question.questionText.length > 85 ? question.questionText.substring(0, 85) + "..." : question.questionText}
          </h4>
          
          {/* Added flex-wrap to keep badges organized on smaller screens */}
          <div className="flex flex-wrap items-center gap-3 mt-3">
            {/* Category Badge */}
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
              {question.category}
            </span>

            {/* Topic Badge */}
            <span className="text-blue-500 dark:text-blue-400 text-xs font-bold px-2 py-1 bg-blue-50 dark:bg-blue-900/30 rounded">
              {question.topic}
            </span>

            {/* Difficulty Badge */}
            <span className={`text-[10px] font-black px-2 py-1 rounded border uppercase tracking-tighter ${difficultyColors[question.difficulty]}`}>
              {question.difficulty}
            </span>

            {/* NEW: Graph/Image Indicator - Only shows if imageUrl is present */}
            {/* {question.imageUrl && (
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded flex items-center gap-1 border border-emerald-100 dark:border-emerald-800/50">
                <span>📊</span> Graph
              </span>
            )} */}

            {/* NEW: Company Tag - Displays which company asked the question */}
            {question.company && (
              <span className="text-orange-600 dark:text-orange-400 text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-orange-50 dark:bg-orange-900/20 rounded border border-orange-100 dark:border-orange-800">
                {question.company}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="hidden md:flex flex-col items-end gap-1">
        <span className="text-blue-600 dark:text-blue-400 font-black text-xs opacity-0 group-hover:opacity-100 transition-all uppercase tracking-widest translate-x-2 group-hover:translate-x-0">
          Solve →
        </span>
      </div>
    </Link>
  );
};

export default QuestionCard;