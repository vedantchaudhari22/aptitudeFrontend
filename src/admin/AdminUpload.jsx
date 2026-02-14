import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
    ChevronLeft,
    UploadCloud,
    Image as ImageIcon,
    Building2,
    BookOpen,
    Layers,
    CheckCircle2,
    BarChart
} from 'lucide-react';

const AdminUpload = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        questionText: '',
        topic: '',
        category: 'Quantitative',
        difficulty: 'Medium',
        correctAnswer: '',
        solution: '',
        company: '',
        options: ['', '', '', '']
    });

    // const BASE_URL = "http://localhost:5000";
    const BASE_URL = "https://aptitude-backend.vercel.app";

    const handleOptionChange = (i, val) => {
        const newOpts = [...formData.options];
        newOpts[i] = val;
        setFormData({ ...formData, options: newOpts });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.options.some(opt => opt.trim() === '')) {
            return toast.error("Please fill all four options");
        }

        if (!formData.questionText.trim()) {
            return toast.error("Please enter the question text");
        }

        if (!formData.topic.trim()) {
            return toast.error("Please enter the topic");
        }

        if (!formData.correctAnswer.trim()) {
            return toast.error("Please specify the correct answer");
        }

        // Validate that correctAnswer matches one of the options
        const answerExists = formData.options.some(
            opt => opt.trim().toLowerCase() === formData.correctAnswer.trim().toLowerCase()
        );
        if (!answerExists) {
            return toast.error("Correct answer must match one of the options exactly");
        }

        const loadingToast = toast.loading("Uploading to ZenCode database...");

        const submitQuestion = async (retryCount = 0) => {
            try {
                const data = new FormData();
                
                // Append all fields from formData
                data.append('questionText', formData.questionText);
                data.append('topic', formData.topic);
                data.append('category', formData.category);
                data.append('difficulty', formData.difficulty);
                data.append('correctAnswer', formData.correctAnswer);
                data.append('solution', formData.solution);
                data.append('company', formData.company || '');
                
                // Append options as individual fields
                formData.options.forEach((option) => {
                    data.append(`options`, option);
                });

                // Append file if present
                if (file) {
                    data.append('graphImage', file);
                }

                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    timeout: 45000 // 45 second timeout
                };

                console.log(`[Attempt ${retryCount + 1}] Posting question to backend...`);
                await axios.post(`${BASE_URL}/api/questions/add`, data, config);

                toast.dismiss(loadingToast);
                toast.success("Question Added Successfully! 🚀", {
                    duration: 4000,
                    style: {
                        borderRadius: '15px',
                        background: '#1e293b',
                        color: '#fff',
                        border: '1px solid #334155'
                    },
                });

                setTimeout(() => navigate('/admin'), 1500);
            } catch (err) {
                const errorMsg = err.response?.data?.error || err.message || "Unknown error";
                const isTimeoutError = errorMsg.includes('buffering timed out') || err.code === 'ECONNABORTED' || err.code === 'ETIMEDOUT';
                
                console.error(`[Attempt ${retryCount + 1}] Error:`, errorMsg);

                if (isTimeoutError && retryCount < 2) {
                    // Retry up to 3 times (retryCount 0, 1, 2)
                    toast.dismiss(loadingToast);
                    const waitTime = 3000 + (retryCount * 2000); // 3s, then 5s, then 7s
                    const retryToast = toast.loading(`Database busy... Retrying in ${waitTime/1000}s (Attempt ${retryCount + 2}/3)`);
                    
                    setTimeout(() => {
                        toast.dismiss(retryToast);
                        submitQuestion(retryCount + 1);
                    }, waitTime);
                } else {
                    // Max retries reached or different error
                    toast.dismiss(loadingToast);
                    
                    if (isTimeoutError) {
                        toast.error("⚠️ Database Connection Failed - Backend may be down. Try again in a moment.", { duration: 6000 });
                    } else {
                        toast.error(`Error: ${errorMsg}`, { duration: 6000 });
                    }
                    
                    console.error("Final error after retries:", {
                        error: errorMsg,
                        status: err.response?.status,
                        data: err.response?.data
                    });
                }
            }
        };

        submitQuestion();
    };

    // Shared tailwind class for all text inputs to handle placeholder color
    const inputClasses = "w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-sm outline-none focus:border-blue-500 placeholder-slate-500 dark:placeholder-slate-400";

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-12 transition-colors duration-300">
            <div className="max-w-5xl mx-auto">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <button
                            onClick={() => navigate('/admin')}
                            className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors font-bold text-sm mb-2"
                        >
                            <ChevronLeft size={18} /> Back to Dashboard
                        </button>
                        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                            Add New <span className="text-blue-600">Question</span>
                        </h1>
                    </div>
                    <button
                        form="upload-form"
                        type="submit"
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-blue-500/20 transition-all active:scale-95"
                    >
                        <UploadCloud size={20} /> Upload Question
                    </button>
                </div>

                <form id="upload-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                            <label className="flex items-center gap-2 text-xs font-black uppercase text-slate-400 mb-3 tracking-widest">
                                <BookOpen size={14} /> Question Statement
                            </label>
                            <textarea
                                placeholder="Write the question here..."
                                className="w-full p-5 rounded-2xl border-2 border-slate-100 dark:border-slate-800 dark:bg-slate-950 text-slate-900 dark:text-white focus:border-blue-500 outline-none transition-all text-lg font-medium placeholder-slate-500 dark:placeholder-slate-400"
                                rows={3}
                                required
                                onChange={(e) => setFormData({ ...formData, questionText: e.target.value })}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                                {formData.options.map((opt, i) => (
                                    <div key={i} className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300 dark:text-slate-700">
                                            {String.fromCharCode(65 + i)}
                                        </span>
                                        <input
                                            type="text"
                                            placeholder={`Option ${String.fromCharCode(65 + i)}`}
                                            className="w-full pl-10 pr-4 py-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 dark:bg-slate-950 text-slate-900 dark:text-white focus:border-blue-500 outline-none transition-all font-bold placeholder-slate-500 dark:placeholder-slate-400"
                                            required
                                            onChange={(e) => handleOptionChange(i, e.target.value)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                            <label className="flex items-center gap-2 text-xs font-black uppercase text-slate-400 mb-3 tracking-widest">
                                Step-by-Step Solution
                            </label>
                            <textarea
                                placeholder="Explain the logic behind the correct answer..."
                                className="w-full p-5 rounded-2xl border-2 border-slate-100 dark:border-slate-800 dark:bg-slate-950 text-slate-900 dark:text-white focus:border-blue-500 outline-none transition-all text-sm leading-relaxed placeholder-slate-500 dark:placeholder-slate-400"
                                rows={5}
                                required
                                onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Sidebar Area */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="space-y-5">
                                <div>
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 mb-2">
                                        <Layers size={12} /> Topic
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Percentage"
                                        className={inputClasses}
                                        required
                                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 mb-2">
                                        <Building2 size={12} /> Company
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. TCS, Infosys"
                                        className={inputClasses}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 mb-2">
                                        <BarChart size={12} /> Category
                                    </label>
                                    <select
                                        className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-sm outline-none focus:border-blue-500"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option value="Quantitative">Quantitative</option>
                                        <option value="Logical">Logical</option>
                                        <option value="Verbal">Verbal</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 mb-2">
                                        <Layers size={12} /> Difficulty
                                    </label>
                                    <select
                                        className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white font-bold text-sm outline-none focus:border-blue-500"
                                        value={formData.difficulty}
                                        onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                                    >
                                        <option value="Easy">Easy</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Hard">Hard</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase text-emerald-500 mb-2">
                                        <CheckCircle2 size={12} /> Correct Answer
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Match the option exactly"
                                        className="w-full p-3 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl border border-emerald-100 dark:border-emerald-800 text-slate-900 dark:text-emerald-400 font-black text-sm outline-none focus:border-emerald-500 placeholder-emerald-600/50 dark:placeholder-emerald-400/40"
                                        required
                                        onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-600 dark:bg-blue-900/30 p-6 rounded-[2.5rem] border border-blue-500/20 shadow-lg shadow-blue-500/10">
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase text-white mb-4 tracking-widest">
                                <ImageIcon size={14} /> Attach Visual (Optional)
                            </label>
                            <div className="mb-4 bg-slate-950/50 rounded-xl p-4 border border-white/10 flex flex-col items-center justify-center text-center">
                                {file ? (
                                    <p className="text-xs text-emerald-400 font-bold truncate w-full">Selected: {file.name}</p>
                                ) : (
                                    <p className="text-[10px] text-white/50 leading-tight">Best for Graphs or Tables</p>
                                )}
                            </div>
                            <input
                                type="file"
                                className="w-full text-[10px] text-white/70 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-white file:text-blue-600 hover:file:bg-blue-50 cursor-pointer"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminUpload;