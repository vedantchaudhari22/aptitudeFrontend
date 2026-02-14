import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
    ArrowDown01, Banknote, BarChart3, BookOpenText, Brain, BrainCircuit,
    Calculator, Calendar, CheckCircle2, Clock, CoinsIcon, Database,
    Dice5, DollarSign, FileText, FunctionSquare, HeartPulse, LetterText,
    Lock, MessageSquareText, Network, Percent, RatioIcon, Speech, Star,
    Timer, TrendingUp, Users, Zap, ShieldCheck, X, Eye, EyeOff, LayoutDashboard
} from 'lucide-react';

const menuData = {
    Quantitative: {
        icon: <Calculator />,
        topics: [
            { name: "Percentage", icon: <Percent /> },
            { name: "Ratio and Proportion", icon: <RatioIcon /> },
            { name: "Profit and Loss", icon: <CoinsIcon /> },
            { name: "Simple Interest", icon: <Banknote /> },
            { name: "Compound Interest", icon: <DollarSign /> },
            { name: "Time and Work", icon: <Zap /> },
            { name: "Time and Distance", icon: <TrendingUp /> },
            { name: "Averages", icon: <BarChart3 /> },
            { name: "Permutation & Combination", icon: <Network /> },
            { name: "Probability", icon: <Dice5 /> },
            { name: "Arithmetic Aptitude", icon: <FunctionSquare /> },
            { name: "Data Interpretation", icon: <FileText /> },
        ]
    },
    Logical: {
        icon: <Brain />,
        topics: [
            { name: "Number Series", icon: <ArrowDown01 /> },
            { name: "Blood Relations", icon: <HeartPulse color='red' /> },
            { name: "Syllogism", icon: <BrainCircuit /> },
            { name: "Coding-Decoding", icon: <Lock /> },
            { name: "Seating Arrangement", icon: <Users /> },
            { name: "Data Sufficiency", icon: <Database /> },
            { name: "Clocks and Calendars", icon: <Calendar /> }
        ]
    },
    Verbal: {
        icon: <Speech />,
        topics: [
            { name: "Synonyms", icon: <LetterText /> },
            { name: "Antonyms", icon: <LetterText /> },
            { name: "Fill in the blanks", icon: <Star fill="currentColor" strokeWidth={0} /> },
            { name: "Reading Comprehension", icon: <BookOpenText /> },
            { name: "Sentence Correction", icon: <CheckCircle2 /> },
            { name: "Idioms and Phrases", icon: <MessageSquareText /> }
        ]
    }
};

const Sidebar = ({ onSelectTopic, activeTopic }) => {
    const [expandedSection, setExpandedSection] = useState("Quantitative");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [passcode, setPasscode] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // Trigger the Custom Modal instead of the browser prompt
    const handleAdminAccess = () => {
        setIsModalOpen(true);
    };

    const handleVerify = (e) => {
        e.preventDefault();
        const secretCode = import.meta.env.VITE_ADMIN_SECRET;

        if (passcode === secretCode) {
            sessionStorage.setItem("adminToken", "zencode_authenticated");
            toast.success("Access Granted! Welcome Admin.");
            setIsModalOpen(false);
            setPasscode("");
            navigate('/admin');
        } else {
            toast.error("Incorrect Secret Key");
        }
    };

    return (
        <>
            <aside className="w-72 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 h-full overflow-y-auto flex-shrink-0 transition-colors duration-300 flex flex-col">
                
                {/* Scrollable Topics Section */}
                <div className="p-6 flex-grow">
                    
                    {/* --- STUDENT DASHBOARD BUTTON --- */}
                    <button
                        onClick={() => {
                            onSelectTopic('dashboard');
                            navigate('/dashboard');
                        }}
                        className={`w-full flex items-center gap-3 p-4 rounded-2xl font-black transition-all mb-8 border ${
                            activeTopic === 'dashboard' 
                            ? "bg-blue-600 text-white border-transparent shadow-lg shadow-blue-500/20" 
                            : "bg-slate-50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 border-slate-100 dark:border-slate-800 hover:border-blue-500/50"
                        }`}
                    >
                        <LayoutDashboard size={20} />
                        <span className="text-sm uppercase tracking-widest">My Progress</span>
                    </button>

                    <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-6">
                        Menu Categories
                    </h3>

                    <div className="space-y-3">
                        {Object.keys(menuData).map((section) => (
                            <div key={section} className="space-y-1">
                                <button
                                    onClick={() => setExpandedSection(expandedSection === section ? "" : section)}
                                    className={`w-full flex justify-between items-center p-3.5 rounded-2xl font-bold transition-all ${expandedSection === section
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-none"
                                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-lg opacity-90">{menuData[section].icon}</span>
                                        <span>{section}</span>
                                    </div>
                                    <span className={`text-xs transform transition-transform ${expandedSection === section ? "rotate-180" : ""}`}>
                                        ▼
                                    </span>
                                </button>

                                {expandedSection === section && (
                                    <div className="mt-2 ml-3 pl-4 border-l-2 border-slate-100 dark:border-slate-800 space-y-1">
                                        {menuData[section].topics.map((topic) => (
                                            <button
                                                key={topic.name}
                                                onClick={() => onSelectTopic(topic.name)}
                                                className={`w-full flex items-center gap-3 text-left p-2.5 rounded-xl text-sm transition-all font-medium ${activeTopic === topic.name
                                                    ? "text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20 shadow-sm"
                                                    : "text-slate-500 dark:text-slate-500 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-900/50"
                                                    }`}
                                            >
                                                <span className="opacity-70 dark:opacity-50">{topic.icon}</span>
                                                <span>{topic.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- ADMIN SECTION --- */}
                <div className="p-6 border-t border-slate-100 dark:border-slate-900 mt-auto bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm">
                    <button
                        onClick={handleAdminAccess}
                        className="w-full group flex items-center justify-between p-4 rounded-2xl 
                                   bg-slate-50 dark:bg-slate-900/50 
                                   hover:bg-blue-50 dark:hover:bg-blue-900/30 
                                   transition-all border border-transparent 
                                   hover:border-blue-100 dark:hover:border-blue-800/50"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm 
                                          group-hover:text-blue-600 dark:group-hover:text-blue-400 
                                          text-slate-400 dark:text-slate-500 transition-colors">
                                <ShieldCheck size={18} />
                            </div>
                            <span className="text-sm font-bold text-slate-600 dark:text-slate-400 
                                           group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                Admin Portal
                            </span>
                        </div>
                        <Lock size={14} className="text-slate-500 dark:text-slate-400" />
                    </button>
                </div>
            </aside>

            {/* --- CUSTOM PASSWORD MODAL --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm transition-all duration-300">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-6">
                                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl">
                                    <ShieldCheck size={24} />
                                </div>
                                <button 
                                    onClick={() => { setIsModalOpen(false); setPasscode(""); }} 
                                    className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            
                            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Security Check</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 font-medium">Enter secret key to access the admin dashboard.</p>
                            
                            <form onSubmit={handleVerify} className="space-y-4">
                                <div className="relative">
                                    <input 
                                        autoFocus
                                        type={showPassword ? "text" : "password"} 
                                        placeholder="Enter key..." 
                                        className="w-full p-4 pr-12 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700"
                                        value={passcode}
                                        onChange={(e) => setPasscode(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-500 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                <button 
                                    type="submit"
                                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black shadow-xl shadow-blue-500/20 transition-all active:scale-95"
                                >
                                    Authorize Access
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;