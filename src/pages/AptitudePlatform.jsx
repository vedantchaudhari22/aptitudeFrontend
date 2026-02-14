import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import QuestionCard from '../components/QuestionCard';
import Breadcrumbs from '../components/Breadcrumbs';
import SkeletonLoader from '../components/SkeletonLoader';
import EmptyState from '../components/EmptyState';

const AptitudePlatform = () => {
  const [activeTopic, setActiveTopic] = useState(""); // "" fetches all questions
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // Add state to force re-fetch

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        // const url = activeTopic 
        //   ? `http://localhost:5000/api/questions?topic=${activeTopic}` 
        //   : `http://localhost:5000/api/questions`;
        const url = activeTopic
          ? `https://aptitude-backend.vercel.app/api/questions?topic=${activeTopic}`
          : `https://aptitude-backend.vercel.app/api/questions`;
        const res = await axios.get(url);
        setQuestions(res.data);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [activeTopic, refreshKey]); // Add refreshKey directly to dependency array

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    // Added transition-colors for a smooth theme shift
    <div className="flex h-[calc(100vh-64px)] overflow-hidden transition-colors duration-300">
      <Sidebar onSelectTopic={setActiveTopic} activeTopic={activeTopic} />

      {/* Updated main background to support dark:bg-slate-950 */}
      <main className="flex-1 bg-slate-50 dark:bg-slate-950 p-8 overflow-y-auto transition-colors duration-300">
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs activeTopic={activeTopic} />

          <div className="mb-8">
            {/* Updated title and subtitle text for dark mode visibility */}
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white italic">
              {activeTopic || "All Questions"}
            </h2>
            <p className="text-slate-400 dark:text-slate-500 font-medium">
              {questions.length} questions found
            </p>
          </div>

          {loading ? (
            <SkeletonLoader />
          ) : questions.length > 0 ? (
            <div className="grid gap-4">
              {questions.map((q, i) => (
                <QuestionCard key={q._id} question={q} index={i} />
              ))}
            </div>
          ) : (
            <EmptyState topic={activeTopic} onRefresh={handleRefresh} />
          )}
        </div>
      </main>
    </div>
  );
};

export default AptitudePlatform;