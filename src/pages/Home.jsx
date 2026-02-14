import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopicCard from '../components/TopicCard';
import { PlayCircle, GraduationCap, Building2, LayoutGrid } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const sections = [
    { 
      title: "Practice Aptitude", 
      description: "Solve topic-wise questions in Quantitative, Logical, and Verbal reasoning.", 
      icon: <GraduationCap size={32} />, 
      colorClass: "bg-blue-600 text-white",
      path: "/platform"
    },
    { 
      title: "Learn Aptitude", 
      description: "Watch curated video lectures to master shortcuts and advanced concepts.", 
      icon: <PlayCircle size={32} />, 
      colorClass: "bg-emerald-600 text-white",
      path: "/learn"
    },
    { 
      title: "Company Specific", 
      description: "Practice questions asked in top tech companies like TCS, Infosys, and Amazon.", 
      icon: <Building2 size={32} />, 
      colorClass: "bg-orange-600 text-white",
      path: "/company"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 md:p-12 transition-colors duration-500">
      
      {/* Brand Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-3 bg-blue-600/10 rounded-2xl mb-4">
           <LayoutGrid className="text-blue-600" size={28} />
        </div>
        <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
          Zen<span className="text-blue-600">Code</span> Hub
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium max-w-lg mx-auto">
          Your all-in-one placement preparation engine. Choose your pathway to success.
        </p>
      </div>
      
      {/* Main Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl w-full">
        {sections.map((sec, i) => (
          <TopicCard 
            key={i}
            title={sec.title}
            description={sec.description}
            // Passing the Lucide icon directly
            icon={sec.icon}
            colorClass={sec.colorClass}
            onClick={() => navigate(sec.path)}
          />
        ))}
      </div>

      {/* Subtle Footer info */}
      <div className="mt-16 text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 dark:text-slate-800">
        Placement Preparation Engine • 2026
      </div>
    </div>
  );
};

export default Home;