import React from 'react';
import { Link } from 'react-router-dom';

const QuestionCard = ({ question, index }) => {
  // Difficulty colors optimized for both light and dark themes
  const difficultyColors = {
    Easy: "bg-slate-50 text-slate-600 border-slate-200",
    Medium: "bg-slate-100 text-slate-900 border-slate-300",
    Hard: "bg-slate-900 text-white border-slate-900"
  };

  // Helper to generate consistent colors based on string
  const getColorForString = (str) => {
    const colors = [
      "bg-blue-50 text-blue-700 border-blue-200",
      "bg-purple-50 text-purple-700 border-purple-200",
      "bg-pink-50 text-pink-700 border-pink-200",
      "bg-orange-50 text-orange-700 border-orange-200",
      "bg-emerald-50 text-emerald-700 border-emerald-200",
      "bg-cyan-50 text-cyan-700 border-cyan-200",
      "bg-indigo-50 text-indigo-700 border-indigo-200",
      "bg-rose-50 text-rose-700 border-rose-200"
    ];
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
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
            <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded border ${getColorForString(question.category || 'default')}`}>
              {question.category}
            </span>

            {/* Topic Badge */}
            <span className={`text-xs font-bold px-2 py-1 rounded border ${getColorForString(question.topic || 'default')}`}>
              {question.topic}
            </span>

            {/* Difficulty Badge */}
            <span className={`text-[10px] font-black px-2 py-1 rounded border uppercase tracking-tighter ${difficultyColors[question.difficulty]}`}>
              {question.difficulty}
            </span>

            {/* NEW: Company Tag - Displays which company asked the question */}
            {question.company && (
              <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded border ${getColorForString(question.company)}`}>
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