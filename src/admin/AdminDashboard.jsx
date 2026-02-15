import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import {
  Plus,
  Search,
  Trash2,
  Edit3,
  LayoutGrid,
  Loader2,
  Video,
  PlayCircle,
  Building2
} from "lucide-react";

const AdminDashboard = () => {
  const [questions, setQuestions] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [viewMode, setViewMode] = useState("questions");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const BASE_URL = "https://aptitude-new-backend.vercel.app";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [qRes, lRes] = await Promise.all([
        axios.get(`${BASE_URL}/api/questions`),
        axios.get(`${BASE_URL}/api/learn`)
      ]);
      setQuestions(qRes.data);
      setLectures(lRes.data);
    } catch {
      toast.error("Failed to sync database");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuestion = async (id) => {
    if (!window.confirm("Delete this question?")) return;
    await axios.delete(`${BASE_URL}/api/questions/${id}`);
    setQuestions(questions.filter((q) => q._id !== id));
    toast.success("Question deleted");
  };

  const handleDeleteLecture = async (id) => {
    if (!window.confirm("Delete this lecture?")) return;
    await axios.delete(`${BASE_URL}/api/learn/${id}`);
    setLectures(lectures.filter((l) => l._id !== id));
    toast.success("Lecture deleted");
  };

  const filteredQuestions = questions.filter(
    (q) =>
      q.questionText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (q.company &&
        q.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredLectures = lectures.filter(
    (l) =>
      l.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-3">
      <div className="max-w-[1400px] mx-auto">

        {/* HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">

          <div>
            <h1 className="text-2xl font-black text-slate-900">
              Command Center
            </h1>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => {
                  setViewMode("questions");
                  setSearchTerm("");
                }}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition ${
                  viewMode === "questions"
                    ? "bg-slate-900 text-white"
                    : "bg-slate-200 text-slate-700"
                }`}
              >
                Questions ({questions.length})
              </button>

              <button
                onClick={() => {
                  setViewMode("lectures");
                  setSearchTerm("");
                }}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition ${
                  viewMode === "lectures"
                    ? "bg-white border text-slate-900"
                    : "bg-slate-200 text-slate-700"
                }`}
              >
                Lectures ({lectures.length})
              </button>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-2">

            <Link
              to="/admin/add-lecture"
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-900 hover:bg-slate-100 transition"
            >
              <Video size={16} /> Lecture
            </Link>

            <Link
              to="/admin/add"
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-black transition"
            >
              <Plus size={16} /> Question
            </Link>

          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 mb-3">

          <div className="lg:col-span-3 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />

            <input
              type="text"
              placeholder={`Search ${
                viewMode === "questions"
                  ? "questions, topics, companies..."
                  : "lectures..."
              }`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-slate-300 bg-white text-sm font-semibold text-slate-900 placeholder-slate-500 outline-none focus:ring-2 focus:ring-slate-300"
            />
          </div>

          <div className="bg-white rounded-lg border border-slate-300 p-2 flex items-center justify-center gap-2 text-sm font-bold text-slate-900">
            <LayoutGrid size={18} />
            {viewMode === "questions"
              ? filteredQuestions.length
              : filteredLectures.length}{" "}
            Matches
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl border border-slate-300 overflow-hidden">

          {loading ? (
            <div className="py-16 flex flex-col items-center gap-3">
              <Loader2 className="animate-spin text-slate-900" size={30} />
              <p className="text-xs font-bold text-slate-500">
                Loading Data...
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">

                <thead className="bg-slate-100 text-xs uppercase text-slate-600">
                  {viewMode === "questions" ? (
                    <tr>
                      <th className="p-3 text-left">Question</th>
                      <th className="p-3 text-left">Topic</th>
                      <th className="p-3 text-left">Company</th>
                      <th className="p-3 text-center">Actions</th>
                    </tr>
                  ) : (
                    <tr>
                      <th className="p-3 text-left">Lecture</th>
                      <th className="p-3 text-left">Description</th>
                      <th className="p-3 text-center">Duration</th>
                      <th className="p-3 text-center">Action</th>
                    </tr>
                  )}
                </thead>

                <tbody className="divide-y">

                  {viewMode === "questions"
                    ? filteredQuestions.map((q) => (
                        <tr key={q._id} className="hover:bg-slate-50">

                          <td className="p-3 max-w-md align-middle">
                            <p className="font-semibold text-slate-900 line-clamp-2">
                              {q.questionText}
                            </p>
                          </td>

                          <td className="p-3 align-middle">
                            <span className="px-2 py-1 bg-slate-100 rounded text-xs font-bold text-slate-900">
                              {q.topic}
                            </span>
                          </td>

                          <td className="p-3 align-middle text-sm font-semibold text-slate-700">
                            <Building2 size={14} className="inline mr-1" />
                            {q.company || "General"}
                          </td>

                          <td className="p-3 text-center align-middle">
                            <div className="flex justify-center gap-2">
                              <Link
                                to={`/admin/edit/${q._id}`}
                                className="p-1.5 border border-slate-300 rounded text-slate-900 hover:bg-slate-900 hover:text-white transition"
                              >
                                <Edit3 size={14} />
                              </Link>

                              <button
                                onClick={() =>
                                  handleDeleteQuestion(q._id)
                                }
                                className="p-1.5 border border-slate-300 rounded text-slate-900 hover:bg-slate-900 hover:text-white transition"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    : filteredLectures.map((l) => (
                        <tr key={l._id} className="hover:bg-slate-50">

                          <td className="p-3 align-middle">
                            <div className="flex items-center gap-2 text-slate-900 font-semibold">
                              <PlayCircle size={18} />
                              {l.topic}
                            </div>
                          </td>

                          <td className="p-3 text-xs italic text-slate-600 line-clamp-2 align-middle">
                            {l.description}
                          </td>

                          <td className="p-3 text-center font-bold text-slate-700 align-middle">
                            {l.duration}
                          </td>

                          <td className="p-3 text-center align-middle">
                            <button
                              onClick={() =>
                                handleDeleteLecture(l._id)
                              }
                              className="p-1.5 border border-slate-300 rounded text-slate-900 hover:bg-slate-900 hover:text-white transition"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}

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
