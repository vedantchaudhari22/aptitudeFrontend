import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import {
    Plus,
    Search,
    Trash2,
    Edit3,
    ExternalLink,
    Building2,
    LayoutGrid,
    Loader2,
    Video,
    PlayCircle,
    BookOpen
} from 'lucide-react';

const AdminDashboard = () => {
    const [questions, setQuestions] = useState([]);
    const [lectures, setLectures] = useState([]); // State for lectures
    const [viewMode, setViewMode] = useState("questions"); // "questions" or "lectures"
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    // const BASE_URL = "http://localhost:5000";
    const BASE_URL = "https://aptitude-backend.vercel.app";

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch both datasets simultaneously
            const [qRes, lRes] = await Promise.all([
                axios.get(`${BASE_URL}/api/questions`),
                axios.get(`${BASE_URL}/api/learn`)
            ]);
            setQuestions(qRes.data);
            setLectures(lRes.data);
        } catch (err) {
            toast.error("Failed to sync with database");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteQuestion = async (id) => {
        if (!window.confirm("Delete this question?")) return;
        try {
            await axios.delete(`${BASE_URL}/api/questions/${id}`);
            setQuestions(questions.filter(q => q._id !== id));
            toast.success("Question purged");
        } catch (err) {
            toast.error("Delete operation failed");
        }
    };

    const handleDeleteLecture = async (id) => {
        if (!window.confirm("Delete this master lecture?")) return;
        try {
            await axios.delete(`${BASE_URL}/api/learn/${id}`);
            setLectures(lectures.filter(l => l._id !== id));
            toast.success("Lecture purged from vault");
        } catch (err) {
            toast.error("Delete operation failed");
        }
    };

    // --- Dynamic Search Logic ---
    const filteredQuestions = questions.filter(q =>
        q.questionText.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (q.company && q.company.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const filteredLectures = lectures.filter(l =>
        l.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-10 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">

                {/* Upper Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                            Command <span className="text-slate-500">Center</span>
                        </h1>
                        <div className="flex gap-4 mt-3">
                            <button
                                onClick={() => { setViewMode("questions"); setSearchTerm(""); }}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'questions' ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' : 'bg-slate-200 text-slate-500'}`}
                            >
                                Questions ({questions.length})
                            </button>
                            <button
                                onClick={() => { setViewMode("lectures"); setSearchTerm(""); }}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === 'lectures' ? 'bg-white text-slate-900 border border-slate-200 shadow-sm' : 'bg-slate-200 text-slate-500'}`}
                            >
                                Lectures ({lectures.length})
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Link
                            to="/admin/add-lecture"
                            className="flex items-center justify-center gap-2 bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 px-6 py-4 rounded-2xl font-black shadow-sm transition-all active:scale-95"
                        >
                            <Video size={20} /> New Lecture
                        </Link>
                        <Link
                            to="/admin/add"
                            className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white px-6 py-4 rounded-2xl font-black shadow-xl shadow-slate-200 transition-all active:scale-95"
                        >
                            <Plus size={20} /> New Question
                        </Link>
                    </div>
                </div>

                {/* Search & Stats Bar */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                    <div className="lg:col-span-3 relative group">
                        <Search className={`absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors ${viewMode === 'questions' ? 'group-focus-within:text-slate-900' : 'group-focus-within:text-slate-500'}`} size={20} />
                        <input
                            type="text"
                            value={searchTerm}
                            placeholder={`Search ${viewMode === 'questions' ? 'questions, topics, or companies...' : 'lectures or summaries...'}`}
                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-200 text-slate-900 outline-none focus:ring-4 focus:ring-slate-200 transition-all shadow-sm font-bold"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-center gap-3 shadow-sm">
                        <LayoutGrid size={20} className={viewMode === 'questions' ? 'text-slate-900' : 'text-slate-500'} />
                        <span className="text-sm font-black text-slate-700 uppercase tracking-widest">
                            {viewMode === 'questions' ? filteredQuestions.length : filteredLectures.length} Matches
                        </span>
                    </div>
                </div>

                {/* Content Table Container */}
                <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden transition-all min-h-[400px]">
                    {loading ? (
                        <div className="py-20 flex flex-col items-center justify-center gap-4">
                            <Loader2 className="animate-spin text-slate-900" size={40} />
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Syncing Data...</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-50 border-b border-slate-100">
                                    {viewMode === "questions" ? (
                                        <tr>
                                            <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Question Details</th>
                                            <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Topic</th>
                                            <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Company</th>
                                            <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Management</th>
                                        </tr>
                                    ) : (
                                        <tr>
                                            <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Lecture Topic</th>
                                            <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Description</th>
                                            <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Duration</th>
                                            <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Action</th>
                                        </tr>
                                    )}
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {viewMode === "questions" ? (
                                        filteredQuestions.map((q) => (
                                            <tr key={q._id} className="hover:bg-slate-50/80 transition-colors group">
                                                <td className="p-6 max-w-md">
                                                    <p className="text-slate-800 font-bold leading-tight line-clamp-2">{q.questionText}</p>
                                                    <p className="text-[9px] font-black text-slate-400 mt-1 uppercase">ID: {q._id.slice(-6)}</p>
                                                </td>
                                                <td className="p-6">
                                                    <span className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase border border-slate-200">{q.topic}</span>
                                                </td>
                                                <td className="p-6 text-slate-500 text-xs font-bold uppercase tracking-tighter">
                                                    <Building2 size={14} className="inline mr-1 opacity-40" /> {q.company || "General"}
                                                </td>
                                                <td className="p-6 text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <Link to={`/admin/edit/${q._id}`} className="p-2 bg-white text-slate-600 rounded-lg border border-slate-200 hover:bg-slate-900 hover:text-white transition-all"><Edit3 size={16} /></Link>
                                                        <button onClick={() => handleDeleteQuestion(q._id)} className="p-2 bg-white text-slate-400 rounded-lg border border-slate-200 hover:bg-slate-900 hover:text-white transition-all"><Trash2 size={16} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        filteredLectures.map((l) => (
                                            <tr key={l._id} className="hover:bg-slate-50 transition-colors group">
                                                <td className="p-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-colors"><PlayCircle size={18} /></div>
                                                        <div>
                                                            <p className="font-bold text-slate-800 leading-tight">{l.topic}</p>
                                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{l.category}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-6 max-w-xs text-[11px] text-slate-500 font-medium italic line-clamp-2">"{l.description}"</td>
                                                <td className="p-6 text-center text-xs font-black text-slate-400">{l.duration}</td>
                                                <td className="p-6 text-center">
                                                    <button onClick={() => handleDeleteLecture(l._id)} className="p-2.5 bg-white text-slate-400 rounded-xl border border-slate-200 hover:bg-slate-900 hover:text-white transition-all shadow-sm"><Trash2 size={18} /></button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;