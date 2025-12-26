import { Search, MapPin } from 'lucide-react';

const tags = ["UI/UX", "Web Development", "Human Resources", "Business Analyst"];

export const SearchHero = () => (
  <div className="w-full max-w-2xl space-y-6">
    <div className="flex flex-col md:flex-row items-center bg-white p-2 rounded-xl border shadow-sm gap-2">
      <div className="flex items-center flex-1 px-3 gap-2 w-full">
        <Search className="text-blue-500 w-5 h-5" />
        <input 
          placeholder="Job title, keyword..." 
          className="w-full outline-none text-slate-600 py-2"
        />
      </div>
      <div className="hidden md:block w-px h-8 bg-slate-200" />
      <div className="flex items-center flex-1 px-3 gap-2 w-full">
        <MapPin className="text-blue-500 w-5 h-5" />
        <input 
          placeholder="Location" 
          className="w-full outline-none text-slate-600 py-2"
        />
      </div>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors w-full md:w-auto">
        Find Job
      </button>
    </div>
    
    <div className="flex flex-wrap gap-3">
      {tags.map((tag) => (
        <span 
          key={tag} 
          className="px-4 py-1.5 bg-blue-50/50 text-blue-600 text-sm rounded-md cursor-pointer hover:bg-blue-100 transition-colors"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
);