import React, { useState, useEffect } from 'react';
import { PlayCircle, Search, ArrowLeft, BookOpen, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Learn = () => {
    const navigate = useNavigate();
    const [lectures, setLectures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    // const BASE_URL = "http://localhost:5000";
    const BASE_URL = "https://aptitude-test-backend.vercel.app";

    // 1. Fetch Lectures from Backend
    useEffect(() => {
        const fetchLectures = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/api/learn`);
                setLectures(res.data);
            } catch (err) {
                toast.error("Failed to load lectures from vault");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchLectures();
    }, []);

    // 2. Filter logic for real-time search using API data
    const filteredLectures = lectures.filter(v =>
        v.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-6 transition-colors duration-500">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
                    <div>
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2 text-blue-600 font-black text-sm uppercase tracking-tighter mb-2 hover:-translate-x-1 transition-transform"
                        >
                            <ArrowLeft size={16} /> Back to Hub
                        </button>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                            Lecture <span className="text-slate-500">Vault</span>
                        </h1>
                        <p className="text-slate-500 font-medium mt-1">
                            Curated video lectures for placement preparation mastery.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="relative group w-full md:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search concepts or topics..."
                            className="w-full pl-11 pr-4 py-4 bg-white rounded-2xl border border-slate-200 text-slate-900 text-sm font-bold focus:ring-4 focus:ring-slate-200 outline-none transition-all shadow-sm"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Video Table Container */}
                <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-40 gap-4">
                            <Loader2 className="animate-spin text-slate-900" size={48} />
                            <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Unlocking the Vault...</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-100">
                                        <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Topic / Concept</th>
                                        <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Learning Summary</th>
                                        <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] text-center">Duration</th>
                                        <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {filteredLectures.length > 0 ? filteredLectures.map((video) => (
                                        <tr key={video._id} className="group hover:bg-slate-50 transition-all">
                                            <td className="p-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-900 transition-transform group-hover:scale-110">
                                                        <BookOpen size={22} />
                                                    </div>
                                                    <div>
                                                        <span className="font-black text-slate-800 text-lg block">{video.topic}</span>
                                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">{video.category}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <p className="text-sm text-slate-500 font-medium max-w-sm leading-relaxed">
                                                    {video.description}
                                                </p>
                                            </td>
                                            <td className="p-6 text-center text-sm font-black text-slate-400 tabular-nums">
                                                {video.duration}
                                            </td>
                                            <td className="p-6 text-center">
                                                <a
                                                    href={video.videoUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-black text-white rounded-xl font-black text-xs transition-all hover:shadow-lg hover:shadow-slate-200 active:scale-95 shadow-md shadow-slate-200/50"
                                                >
                                                    <PlayCircle size={16} /> Watch Now
                                                </a>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={4} className="py-0.6 text-center">
                                                <div className="flex flex-col items-center gap-4 opacity-40">
                                                    <BookOpen size={64} className="text-slate-300" />
                                                    <p className="text-slate-900 font-black uppercase tracking-widest text-xs">No matching lectures found</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {/* Table Footer */}
                    <div className="p-4 bg-slate-50 text-center">
                        <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em]">
                            ZenCode Video Bank • Knowledge Base
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Learn;