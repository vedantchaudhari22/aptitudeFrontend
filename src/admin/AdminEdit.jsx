import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
    ChevronLeft,
    Save,
    Image as ImageIcon,
    Building2,
    BookOpen,
    Layers,
    CheckCircle2,
    BarChart3
} from 'lucide-react';

const AdminEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState(null);
    // const BASE_URL = "http://localhost:5000";
    const BASE_URL = "https://aptitude-backend.vercel.app";

    // Fetch existing question data on load
    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/api/questions/${id}`);
                setFormData(res.data);
            } catch (err) {
                toast.error("Failed to load question data");
                console.error(err);
            }
        };
        fetchQuestion();
    }, [id]);

    const handleOptionChange = (index, value) => {
        const newOptions = [...formData.options];
        newOptions[index] = value;
        setFormData({ ...formData, options: newOptions });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loadingToast = toast.loading("Updating ZenCode database...");

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'options') {
                data.append(key, JSON.stringify(formData[key]));
            } else if (formData[key] !== null) {
                data.append(key, formData[key]);
            }
        });

        if (file) data.append('graphImage', file);

        try {
            await axios.put(`${BASE_URL}/api/questions/${id}`, data);
            toast.dismiss(loadingToast);
            toast.success("Question updated successfully! 🚀", {
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
            toast.dismiss(loadingToast);
            toast.error("Update failed. Please check the backend.");
        }
    };

    if (!formData) return (
        <div className="h-screen flex items-center justify-center bg-slate-50">
            <div className="animate-pulse font-black text-slate-900 tracking-tighter text-2xl uppercase">
                Initializing ZenCode...
            </div>
        </div>
    );

    // Shared input class to handle Light/Dark mode text visibility
    const inputClasses = "w-full p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-900 font-bold text-sm outline-none focus:border-slate-900 placeholder-slate-500";

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-12 transition-colors duration-300">
            <div className="max-w-5xl mx-auto">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <button
                            onClick={() => navigate('/admin')}
                            className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors font-bold text-sm mb-2"
                        >
                            <ChevronLeft size={18} /> Back to Dashboard
                        </button>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                            Edit <span className="text-slate-500">Question</span>
                        </h1>
                    </div>
                    <button
                        form="edit-form"
                        type="submit"
                        className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-slate-200 transition-all active:scale-95"
                    >
                        <Save size={20} /> Save Changes
                    </button>
                </div>

                <form id="edit-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <div className="lg:col-span-2 space-y-6">
                        {/* Question Text Card */}
                        <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                            <label className="flex items-center gap-2 text-xs font-black uppercase text-slate-400 mb-3 tracking-widest">
                                <BookOpen size={14} /> Question Statement
                            </label>
                            <textarea
                                value={formData.questionText}
                                className="w-full p-5 rounded-2xl border-2 border-slate-100 text-slate-900 focus:border-slate-900 outline-none transition-all text-lg font-medium"
                                rows={3}
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
                                            value={opt}
                                            className="w-full pl-10 pr-4 py-4 rounded-2xl border-2 border-slate-100 text-slate-900 focus:border-slate-900 outline-none transition-all font-bold"
                                            onChange={(e) => handleOptionChange(i, e.target.value)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Solution Card */}
                        <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                            <label className="flex items-center gap-2 text-xs font-black uppercase text-slate-400 mb-3 tracking-widest">
                                Step-by-Step Solution
                            </label>
                            <textarea
                                value={formData.solution}
                                className="w-full p-5 rounded-2xl border-2 border-slate-100 text-slate-900 focus:border-slate-900 outline-none transition-all text-sm leading-relaxed"
                                rows={5}
                                onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Metadata Details Sidebar */}
                        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm">
                            <div className="space-y-5">
                                <div>
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 mb-2">
                                        <Layers size={12} /> Topic
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.topic}
                                        className={inputClasses}
                                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 mb-2">
                                        <Building2 size={12} /> Company
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.company || ""}
                                        className={inputClasses}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                    />
                                </div>
                                {/* NEW: Category Field */}
                                <div>
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 mb-2">
                                        <BarChart3 size={12} /> Category
                                    </label>
                                    <select
                                        value={formData.category}
                                        className={inputClasses}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option value="Quantitative">Quantitative</option>
                                        <option value="Logical">Logical</option>
                                        <option value="Verbal">Verbal</option>
                                    </select>
                                </div>
                                {/* NEW: Difficulty Field */}
                                <div>
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 mb-2">
                                        <Layers size={12} /> Difficulty
                                    </label>
                                    <select
                                        value={formData.difficulty}
                                        className={inputClasses}
                                        onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                                    >
                                        <option value="Easy">Easy</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Hard">Hard</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-900 mb-2">
                                        <CheckCircle2 size={12} /> Correct Answer
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.correctAnswer}
                                        className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 font-black text-sm outline-none focus:border-slate-900"
                                        onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Image Update Card */}
                        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm">
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest">
                                <ImageIcon size={14} /> Update Visual
                            </label>

                            {formData.imageUrl && (
                                <div className="mb-4 rounded-xl overflow-hidden border border-slate-100 aspect-video bg-slate-50 flex items-center justify-center">
                                    <img
                                        src={`${BASE_URL}${formData.imageUrl}`}
                                        alt="Current graph"
                                        className="max-h-full object-contain opacity-90"
                                    />
                                </div>
                            )}

                            <input
                                type="file"
                                className="w-full text-[10px] text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-slate-900 file:text-white hover:file:bg-black cursor-pointer"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminEdit;