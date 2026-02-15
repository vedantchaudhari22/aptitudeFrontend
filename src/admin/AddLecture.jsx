import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Video, ArrowLeft, Send } from 'lucide-react';

const AddLecture = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        topic: '', category: 'Quantitative', videoUrl: '', description: '', duration: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // await axios.post('http://localhost:5000/api/learn', formData);
            await axios.post('https://aptitude-backend.vercel.app/api/learn', formData);
            toast.success("New Lecture added to Vault!", {
                duration: 4000,
                style: {
                    borderRadius: '15px',
                    background: '#1e293b',
                    color: '#fff',
                    border: '1px solid #334155'
                },
            });
            navigate('/admin');
        } catch (err) {
            toast.error("Failed to upload lecture: " + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 flex items-center justify-center">
            <div className="w-full max-w-2xl bg-white rounded-[2.5rem] p-10 border border-slate-200 shadow-2xl">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 font-black text-xs uppercase mb-6"><ArrowLeft size={14} /> Back</button>
                <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-3"><Video className="text-slate-900" /> New Master Lecture</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Topic Name</label>
                            <input required className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 text-slate-900 font-bold outline-none focus:border-slate-900" value={formData.topic} onChange={(e) => setFormData({ ...formData, topic: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Duration (Min)</label>
                            <input required placeholder="e.g. 15:20" className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 text-slate-900 font-bold outline-none focus:border-slate-900" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-2">YouTube Video URL</label>
                        <input required className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 text-slate-900 font-bold outline-none focus:border-slate-900" value={formData.videoUrl} onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })} />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Concept Description</label>
                        <textarea required className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 text-slate-900 font-bold outline-none focus:border-slate-900 h-32" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                    </div>

                    <button type="submit" className="w-full py-4 bg-slate-900 hover:bg-black text-white rounded-2xl font-black shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-3 uppercase text-sm tracking-widest"><Send size={18} /> Push to Platform</button>
                </form>
            </div>
        </div>
    );
};

export default AddLecture;