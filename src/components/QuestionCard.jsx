import React from 'react';
import { Link } from 'react-router-dom';

const QuestionCard = ({ question, index }) => {
  // Difficulty colors optimized for both light and dark themes
  const difficultyColors = {
    Easy: "bg-slate-50 text-slate-600 border-slate-200",
    Medium: "bg-slate-100 text-slate-900 border-slate-300",
    Hard: "bg-slate-900 text-white border-slate-900"
  };

  return (
    <Link
      to={`/question/${question._id}`}
      className="group bg-white p-6 rounded-3xl border border-slate-200 hover:border-slate-400 hover:shadow-xl hover:shadow-slate-200/50 transition-all flex items-center justify-between"
    >
      <div className="flex items-start gap-5">
        {/* Index number container with hover transition */}
        <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 font-bold text-lg group-hover:bg-slate-900 group-hover:text-white transition-colors">
          {index + 1}
        </div>

        <div>
          <h4 className="text-slate-800 font-bold text-lg leading-snug group-hover:text-slate-900 transition-colors">
            {question.questionText.length > 85 ? question.questionText.substring(0, 85) + "..." : question.questionText}
          </h4>

          {/* Added flex-wrap to keep badges organized on smaller screens */}
          <div className="flex flex-wrap items-center gap-3 mt-3">
            {/* Category Badge */}
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 px-2 py-1 rounded">
              {question.category}
            </span>

            {/* Topic Badge */}
            <span className="text-slate-900 text-xs font-bold px-2 py-1 bg-slate-100 rounded border border-slate-200">
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
              <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-slate-50 rounded border border-slate-200">
                {question.company}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="hidden md:flex flex-col items-end gap-1">
        <span className="text-slate-900 font-black text-xs opacity-0 group-hover:opacity-100 transition-all uppercase tracking-widest translate-x-2 group-hover:translate-x-0">
          Solve →
        </span>
      </div>
    </Link>
  );
};

export default QuestionCard;