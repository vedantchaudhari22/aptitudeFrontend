import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import OptionButton from '../components/OptionButton';
import toast from 'react-hot-toast'; // Import toast for feedback
import { CheckCircle2 } from 'lucide-react';

const QuestionDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [q, setQ] = useState(null);
    const [selected, setSelected] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(45);

    // const BASE_URL = "http://localhost:5000";
    const BASE_URL = "https://aptitude-backend.vercel.app";

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/api/questions/${id}`);
                setQ(res.data);
            } catch (err) {
                console.error("Error fetching question:", err);
            }
        };
        fetchQuestion();
    }, [id]);

    useEffect(() => {
        if (!q) return; // Wait for question to be fully loaded

        if (timeLeft <= 0) {
            handleFinalSubmission(); // Handle logic when time runs out
            return;
        }
        if (submitted) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, submitted, q]);

    // Function to handle the saving of progress
    const handleFinalSubmission = () => {
        setSubmitted(true);

        // Check if the answer is correct
        if (selected === q.correctAnswer) {
            const progress = JSON.parse(localStorage.getItem('zencode_progress') || "[]");

            // Avoid duplicate entries for the same question
            if (!progress.find(p => p.questionId === q._id)) {
                const newEntry = {
                    questionText: q.questionText,
                    questionId: q._id,
                    difficulty: q.difficulty, // From your model
                    topic: q.topic,
                    solvedDate: new Date().toLocaleDateString('en-GB', {
                        day: '2-digit', month: 'short', year: 'numeric'
                    })
                };

                const updatedProgress = [...progress, newEntry];
                localStorage.setItem('zencode_progress', JSON.stringify(updatedProgress));

                // Real-time Trigger: Notify other components (like Sidebar or Dashboard)
                window.dispatchEvent(new Event('storage'));

                toast.success("Progress Updated!");
            }
        } else {
            toast.error("Incorrect Answer. Try again!");
        }
    };

    const formatTime = (seconds) => {
        return seconds < 10 ? `0${seconds}` : seconds;
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

    if (!q) return (
        <div className="flex justify-center items-center h-screen bg-slate-50 font-bold text-slate-400 uppercase tracking-widest animate-pulse">
            Loading ZenCode...
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-3 md:px-6 lg:px-8 overflow-hidden transition-colors duration-300">
            <div className="max-w-[1200px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">

                    {/* LEFT SIDE: Question Area */}
                    <div className="lg:col-span-8 bg-white rounded-[2rem] p-6 shadow-xl border border-slate-100">
                        <button
                            onClick={() => navigate(-1)}
                            className="text-slate-500 text-sm font-black mb-6 hover:translate-x-[-4px] transition-transform flex items-center gap-2 uppercase tracking-tighter hover:text-slate-900"
                        >
                            <span>←</span> Back to Topics
                        </button>

                        <div className="mb-6">
                            <div className="flex flex-wrap items-center gap-2 mb-4">
                                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border ${getColorForString(q.topic || 'default')}`}>
                                    {q.topic}
                                </span>
                                {q.company && (
                                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border ${getColorForString(q.company)}`}>
                                        {q.company}
                                    </span>
                                )}
                                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border ${q.difficulty === 'Easy' ? 'bg-slate-50 text-slate-600 border-slate-200' :
                                    q.difficulty === 'Hard' ? 'bg-slate-900 text-white border-slate-900' :
                                        'bg-slate-100 text-slate-900 border-slate-300'
                                    }`}>
                                    {q.difficulty}
                                </span>
                            </div>

                            <h2 className="text-xl md:text-2xl font-bold text-slate-800 leading-snug">
                                {q.questionText}
                            </h2>
                        </div>

                        {q.imageUrl && (
                            <div className="mb-6 rounded-3xl overflow-hidden border border-slate-200 bg-slate-50 p-4">
                                <img
                                    src={`${BASE_URL}${q.imageUrl}`}
                                    alt="Logic Graph"
                                    className="w-full h-auto object-contain max-h-[350px] mx-auto"
                                />
                            </div>
                        )}

                        <div className="grid grid-cols-1 gap-3">
                            {q.options.map((opt, i) => (
                                <OptionButton
                                    key={i}
                                    option={opt}
                                    isSelected={selected === opt}
                                    isSubmitted={submitted}
                                    isCorrect={opt === q.correctAnswer}
                                    isWrong={selected === opt && opt !== q.correctAnswer}
                                    onClick={() => setSelected(opt)}
                                />
                            ))}
                        </div>

                        <button
                            disabled={!selected || submitted}
                            onClick={handleFinalSubmission}
                            className={`mt-8 w-full py-4 rounded-2xl font-black text-lg transition-all shadow-xl ${!selected || submitted
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                : 'bg-slate-900 text-white hover:bg-black active:scale-95 shadow-slate-500/20'
                                }`}
                        >
                            {submitted ? "Evaluation Done" : "Confirm Submission"}
                        </button>
                    </div>

                    {/* RIGHT SIDE: Sidebar */}
                    <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-4">
                        {!submitted ? (
                            <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 flex flex-col items-center">
                                <div className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Timer</div>
                                <p className={`text-5xl font-black tabular-nums ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-slate-800'}`}>
                                    00:{formatTime(timeLeft)}
                                </p>
                            </div>
                        ) : (
                            <div className="bg-white p-6 rounded-[2rem] shadow-2xl border-l-8 border-slate-900 animate-in slide-in-from-right-10 duration-500 max-h-[85vh] overflow-y-auto custom-scrollbar">
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="p-2 bg-slate-100 text-slate-900 rounded-lg">
                                        <CheckCircle2 size={20} />
                                    </div>
                                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Step-by-Step Guide</h3>
                                </div>

                                <div className="mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                                    <p className="text-[10px] text-slate-500 font-black uppercase mb-1">Key Answer</p>
                                    <p className="text-xl font-black text-slate-900">{q.correctAnswer}</p>
                                </div>

                                <div className="space-y-3">
                                    {q.solution.split(/(?=Step)/g).map((step, index) => (
                                        <div key={index} className="text-xs text-slate-600 leading-relaxed font-bold bg-slate-50 p-4 rounded-xl border border-slate-100">
                                            {step.trim()}
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => {
                                        setSelected(null);
                                        setSubmitted(false);
                                        setTimeLeft(45);
                                        window.scrollTo(0, 0);
                                    }}
                                    className="mt-6 w-full py-3 bg-slate-900 text-white rounded-xl text-sm font-black hover:scale-[0.98] transition-all"
                                >
                                    Re-attempt Problem
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default QuestionDetail;