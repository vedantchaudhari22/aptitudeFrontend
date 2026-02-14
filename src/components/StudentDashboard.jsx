import React, { useState, useEffect } from 'react';
import { 
    CheckCircle2, 
    Calendar as CalendarIcon, 
    Trophy, 
    Zap,
    BarChart3,
    ArrowUpRight,
    Search,
    Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
    const [solvedData, setSolvedData] = useState([]);
    const [stats, setStats] = useState({ Easy: 0, Medium: 0, Hard: 0 });
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const loadProgress = () => {
        const progress = JSON.parse(localStorage.getItem('zencode_progress') || "[]");
        setSolvedData(progress);

        const counts = progress.reduce((acc, item) => {
            acc[item.difficulty] = (acc[item.difficulty] || 0) + 1;
            return acc;
        }, { Easy: 0, Medium: 0, Hard: 0 });
        setStats(counts);
    };

    useEffect(() => {
        loadProgress();
        window.addEventListener('storage', loadProgress);
        return () => window.removeEventListener('storage', loadProgress);
    }, []);

    const totalSolved = solvedData.length;
    const progressPercentage = Math.min((totalSolved / 100) * 100, 100);

    // Get time-based greeting
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 17) return "Good Afternoon";
        return "Good Evening";
    };

    const filteredSolved = solvedData.filter(item => 
        item.topic.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 md:p-10 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-500">
            <div className="max-w-7xl mx-auto space-y-10">
                
                {/* --- HEADER SECTION --- */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-3 bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="flex items-center gap-10">
                            <div className="relative w-40 h-40 flex items-center justify-center">
                                <svg className="w-full h-full -rotate-90">
                                    <circle cx="80" cy="80" r="72" fill="transparent" stroke="currentColor" strokeWidth="14" className="text-slate-100 dark:text-slate-800" />
                                    <circle cx="80" cy="80" r="72" fill="transparent" stroke="currentColor" strokeWidth="14" strokeDasharray="452" strokeDashoffset={452 - (452 * progressPercentage) / 100} strokeLinecap="round" className="text-blue-600 transition-all duration-1000 ease-out" />
                                </svg>
                                <div className="absolute flex flex-col items-center">
                                    <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">{totalSolved}</span>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mastered</span>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-3xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">Performance<br/>Index</h3>
                                <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full font-black text-[10px] uppercase border border-blue-100 dark:border-blue-800">
                                    <Trophy size={14} /> 
                                    <span>{totalSolved >= 20 ? 'Zen Master' : 'Scholar'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6 w-full md:w-auto pr-4">
                            <StatBar label="Easy" count={stats.Easy} color="text-emerald-500" progress={(stats.Easy / 50) * 100} />
                            <StatBar label="Moderate" count={stats.Medium} color="text-amber-500" progress={(stats.Medium / 30) * 100} />
                            <StatBar label="Hard" count={stats.Hard} color="text-red-500" progress={(stats.Hard / 20) * 100} />
                        </div>
                    </div>

                    {/* --- WELCOME WELCOME MESSAGE CARD --- */}
                    <div className="bg-blue-600 p-8 rounded-[3rem] shadow-xl shadow-blue-500/20 flex flex-col justify-center relative overflow-hidden group">
                        {/* Decorative Sparkle Icons */}
                        <Sparkles className="absolute -top-4 -right-4 text-blue-400/30 w-24 h-24 rotate-12 group-hover:scale-110 transition-transform duration-700" />
                        
                        <div className="relative z-10">
                            <p className="text-blue-100 font-bold uppercase text-[10px] tracking-[0.2em] mb-2">
                                {getGreeting()}
                            </p>
                            <h4 className="text-2xl font-black text-white leading-tight">
                                Welcome to your <span className="text-blue-200">Statistics</span>
                            </h4>
                            <div className="h-1 w-12 bg-white/30 rounded-full mt-4 mb-4" />
                            <p className="text-blue-50/80 text-xs leading-relaxed font-medium">
                                Track your mastery, review solved challenges, and scale your potential.
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- PROFESSIONAL SOLVED TABLE --- */}
                <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
                    <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div>
                            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                                <CheckCircle2 size={24} className="text-emerald-500" /> Mastery Log
                            </h3>
                            <p className="text-slate-400 text-xs font-bold mt-1 uppercase tracking-widest">History of solved challenges</p>
                        </div>
                        
                        <div className="relative group w-full md:w-72">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                            <input 
                                type="text" 
                                placeholder="Search solved topics..." 
                                className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 text-sm font-bold focus:ring-4 focus:ring-blue-500/10 outline-none transition-all dark:text-white"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 dark:bg-slate-800/20">
                                    <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] border-b border-slate-50 dark:border-slate-800">Challenge Details</th>
                                    <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] border-b border-slate-50 dark:border-slate-800">Difficulty</th>
                                    <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] border-b border-slate-50 dark:border-slate-800 text-center">Mastery Date</th>
                                    <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] border-b border-slate-50 dark:border-slate-800 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                                {filteredSolved.length > 0 ? [...filteredSolved].reverse().map((item, idx) => (
                                    <tr key={idx} className="group hover:bg-slate-50/80 dark:hover:bg-blue-900/10 transition-colors">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 transition-transform group-hover:scale-110">
                                                    <Zap size={22} />
                                                </div>
                                                <div>
                                                    <span className="font-black text-slate-800 dark:text-slate-100 text-base leading-tight block truncate max-w-[250px] md:max-w-md">
                                                        {item.questionText}
                                                    </span>
                                                    {/* <span className="text-[10px] text-slate-400 font-black uppercase tracking-tighter mt-1 block">Log ID: {item.questionId.slice(-8)}</span> */}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase border shadow-sm ${
                                                item.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800/50' : 
                                                item.difficulty === 'Medium' ? 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/20 dark:border-amber-800/50' : 
                                                'bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20 dark:border-red-800/50'
                                            }`}>
                                                <div className={`w-1.5 h-1.5 rounded-full ${item.difficulty === 'Easy' ? 'bg-emerald-500' : item.difficulty === 'Medium' ? 'bg-amber-500' : 'bg-red-500'}`} />
                                                {item.difficulty}
                                            </span>
                                        </td>
                                        <td className="p-6 text-center">
                                            <div className="flex flex-col items-center">
                                                <span className="text-sm font-bold text-slate-600 dark:text-slate-300">{item.solvedDate}</span>
                                                <span className="text-[9px] font-black text-slate-400 uppercase mt-0.5 tracking-tighter flex items-center gap-1">
                                                    <CalendarIcon size={10} /> Solved
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-6 text-center">
                                            <button 
                                                onClick={() => navigate(`/question/${item.questionId}`)}
                                                className="p-3 bg-white dark:bg-slate-800 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-lg active:scale-90"
                                            >
                                                <ArrowUpRight size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={4} className="py-32 text-center">
                                            <div className="flex flex-col items-center gap-4">
                                                <BarChart3 size={64} className="text-slate-100 dark:text-slate-800 animate-pulse" />
                                                <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-xs">No entries found in your log</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-6 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-50 dark:border-slate-800 text-center">
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">End of session log</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatBar = ({ label, count, color, progress }) => (
    <div className="flex items-center justify-between min-w-[220px] gap-8">
        <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.15em]">{label}</span>
        <div className="flex items-center gap-4">
            <span className={`text-xl font-black ${color}`}>{count}</span>
            <div className="w-32 h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                <div className={`h-full bg-current ${color} transition-all duration-1000 ease-out`} style={{ width: `${Math.min(progress, 100)}%` }}></div>
            </div>
        </div>
    </div>
);

export default StudentDashboard;