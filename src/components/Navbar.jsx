import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';

const Navbar = ({ onMenuClick }) => {
  return (
    <nav className="h-16 bg-white border-b border-slate-200 flex justify-between items-center px-4 md:px-8 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <button
          onClick={() => { console.log("Navbar Button Clicked"); onMenuClick(); }}
          className="p-2 md:hidden rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all border-2 border-red-500"
        >
          <Menu size={20} />
        </button>
        <span className="text-xl font-bold tracking-tight text-slate-900">
          Zen<span className="text-slate-500">Code</span> Hub
        </span>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <Link to="/" className="text-slate-600 hover:text-slate-900 font-bold text-sm uppercase tracking-tighter transition-colors">Home</Link>
      </div>
    </nav>
  );
};

export default Navbar;